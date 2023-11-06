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
                is_laude_class = is_laude(segments)
                if (is_laude_class and is_two_trimesters(segments)) or is_half_laude_class(line):
                    points += 0.5
                    classes[get_class_name(segments)] = 0.5
                elif is_laude_class:
                    points += 1.0
                    classes[get_class_name(segments)] = 1.0
                
        return jsonify({'points': points, 'classes': classes, 'name': get_name(pdf.pages[0])})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def is_laude(segments):
    for segment in segments:
        if segment == 'L':
            return True
    return False

def get_class_name(segments):
    name = ''
    for segment in segments:
        if segment.find('0.') != -1:
            return ' '.join(name.split())
        name += segment + ' '

def is_two_trimesters(segments):
    for segment in segments:
        if segment.find('0.') != -1:
            return False
        if segment == 'A' or segment == 'B':
            return True
    return False

half_laude_classes = [
    'Advanced Drawing',
    'Advanced Painting',
    'Shop Math I',
    'Shop Math II'
]

def is_half_laude_class(line):
    for half_class in half_laude_classes:
        if line.find(half_class) != -1:
            return True
    return False

def get_name(page):
    lines = page.extract_text().split('\n')
    for i, line in enumerate(lines):
        if (line.find('PHONE') != -1 and lines[i + 1].find('ACCREDITED') == -1) or line.find('ACCREDITED') != -1:
            name = re.search(r'(.+?)\s+GRD', lines[i + 1])
            return name.group(1)
