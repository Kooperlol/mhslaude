from flask import Blueprint, request, jsonify
from PyPDF2 import PdfReader
import re

laude_bp = Blueprint('/laude-points', __name__)

@laude_bp.route('/calculate', methods=['POST'])
def calculate_laude_points():
    pdf_file = request.files['transcript']

    if not pdf_file:
        return jsonify({'error': 'No PDF file provided'}), 400

    try:
        pdf = PdfReader(pdf_file)
        points = 0
        classes = {}
        to_be_earned_classes = {}
        to_be_earned_points = 0
        for page in pdf.pages:
            lines = page.extract_text().split('\n')
            flag = False
            for line in lines:
                if line.find('TOTAL EARNED CREDITS') != -1:
                    break
                if line.find('SUBJECT EARNED') != -1:
                    flag = True
                if flag == False:
                    continue
                segments = line.split(' ')
                if (is_laude(segments)):
                    print(line)
                    credits = get_credits(segments)
                    if (is_to_be_earned(segments)):
                        to_be_earned_classes[get_class_name(segments)] = credits
                        to_be_earned_points += credits
                    else:
                        points += credits
                        classes[get_class_name(segments)] = credits
        return jsonify({'points': points, 'classes': classes, 'to_be_earned_points': to_be_earned_points, 'to_be_earned_classes': to_be_earned_classes, 'name': get_name(pdf.pages[0])})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def is_laude(segments):
    for segment in segments:
        if segment == 'L' or segment == 'TUTOR':
            return True
    return False

def get_class_name(segments):
    name = ''
    for segment in segments:
        if is_valid_double(segment) or segment == 'L':
            return ' '.join(name.split())
        name += segment + ' '
        
def get_credits(segments):
    for segment in segments:
        if (is_valid_double(segment)):
            print(float(segment))
            return float(segment)

def is_to_be_earned(segments):
    flag = False
    for segment in segments:
        if is_valid_double(segment):
            flag = True
        if segment == 'L' and flag == False:
            return True
        if segment == 'L' and flag == True:
            return False
    return False

def get_name(page):
    lines = page.extract_text().split('\n')
    for i, line in enumerate(lines):
        if (line.find('PHONE') != -1 and lines[i + 1].find('ACCREDITED') == -1) or line.find('ACCREDITED') != -1:
            name = re.search(r'(.+?)\sGRD', lines[i + 1])
            return name.group(1)

def is_valid_double(s):
    if (s.find('.') == -1):
        return False
    try:
        float_value = float(s)
        return True
    except ValueError:
        return False