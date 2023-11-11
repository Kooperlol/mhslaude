from flask import Blueprint, request, jsonify, current_app
from PyPDF2 import PdfReader
import re
from io import BytesIO
import subprocess
import uuid
import os

laude_bp = Blueprint('/laude-points', __name__)

@laude_bp.route('/calculate', methods=['POST'])
def calculate_laude_points():
    pdf_file = request.files['transcript']

    if not pdf_file:
        return jsonify({'error': 'No PDF file provided'}), 400

    try:
        root_path = os.path.dirname(__file__)

        # Save the uploaded PDF to a temporary file
        pdf_uuid = uuid.uuid1()
        pdf_filename = os.path.join(root_path, str(pdf_uuid) + '.pdf')
        pdf_save = os.path.join(root_path, str(pdf_uuid) + '_ocr.pdf')
        pdf_file.save(pdf_filename)

        # Attempt to extract text from the original PDF
        text = extract_text(pdf_filename)

        if not text:
            # If no text is found, perform OCR
            ocr_output_data = perform_ocr(pdf_filename, pdf_save)
            text = ocr_output_data
            
        points = 0
        classes = {}
        flag = False

        for line in text.split('\n'):
            # Check for markers indicating start/end of relevant content
            if 'TOTAL EARNED CREDITS' in line:
                break
            if 'SUBJECT EARNED' in line:
                flag = True
            if not flag:
                continue

            segments = line.split(' ')
            is_laude_class = 'L' in segments

            if is_laude_class:
                # Calculate the weight based on certain conditions
                weight = 0.5 if is_two_trimesters(segments) or is_half_laude_class(line) else 1.0
                points += weight
                classes[get_class_name(segments)] = weight

        # Clean up the temporary PDF file
        os.remove(pdf_filename)
        
        return jsonify({'points': points, 'classes': classes, 'name': get_name(pdf.pages[0])})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Function to extract text from a PDF file
def extract_text(pdf_file):
    pdf = PdfReader(pdf_file)
    text = ''
    for page in pdf.pages:
        text += page.extract_text()
    return text

# Function to perform OCR with PyMuPDF on PDF data
def perform_ocr(pdf_file, save_file):
    subprocess.run(['ocrmypdf', pdf_file, save_file], shell=True)
    return extract_text(open(save_file))

# Function to check if 'L' is present in segments
def is_laude(segments):
    return 'L' in segments

# Function to extract and join class name segments containing '0.'
def get_class_name(segments):
    return ' '.join(segment for segment in segments if '0.' in segment)

# Function to check if 'A' or 'B' are present in segments and '0.' is not
def is_two_trimesters(segments):
    return any(segment in {'A', 'B'} for segment in segments) and not any('0.' in segment for segment in segments)

# List of classes that count as half laude
half_laude_classes = [
    'Advanced Drawing',
    'Advanced Painting',
    'Shop Math I',
    'Shop Math II'
]

# Function to check if the line contains any half laude class
def is_half_laude_class(line):
    return any(half_class in line for half_class in half_laude_classes)

# Function to extract student's name from the first page
def get_name(page):
    lines = page.extract_text().split('\n')
    for i, line in enumerate(lines):
        # Check for markers indicating the name section
        if (line.find('PHONE') != -1 and lines[i + 1].find('ACCREDITED') == -1) or line.find('ACCREDITED') != -1:
            name = re.search(r'(.+?)\s+GRD', lines[i + 1])
            return name.group(1)