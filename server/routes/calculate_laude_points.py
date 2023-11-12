from flask import Blueprint, request, jsonify
from PyPDF2 import PdfReader
import pytesseract
import tempfile
import fitz
import os
import json
import numpy as np
import re
import cv2

laude_bp = Blueprint('laude-points', __name__)  # Fixed the Blueprint declaration.

@laude_bp.route('/calculate', methods=['POST'])
def calculate_laude_points():
    pdf_file = request.files['transcript']

    if not pdf_file:
        return jsonify({'error': 'No PDF file provided'}), 400

    try:
        # Create a temporary file for PDF processing
        with tempfile.NamedTemporaryFile(suffix='.pdf', delete=False) as temp_file:
            temp_file.write(pdf_file.read())

        # Open the temporary PDF file with PyMuPDF
        doc = fitz.open(temp_file.name)
        
        if (has_readable_text(doc)):
            text = extract_text(pdf_file)
        else:
            text = perform_ocr(temp_file.name)
        
        if not text:
            return jsonify({'error': 'No text found'}), 400
        
        print(text)

        points = 0
        classes = {}
        flag = False

        for line in text.split('\n'):
            print(line)
            # Check for markers indicating start/end of relevant content
            if 'TOTAL EARNED CREDITS' in line:
                break
            if 'SUBJECT EARNED' in line:
                flag = True
            if not flag:
                continue

            segments = line.split(' ')
            is_laude_class = is_laude(segments)

            if is_laude_class:
                # Calculate the weight based on certain conditions
                name = get_class_name(segments)
                weight = 0.5 if is_two_trimesters(name) or is_half_laude_class(line) else 1.0
                points += weight
                classes[name] = weight

        return jsonify({'points': points, 'classes': classes, 'name': get_name(text)})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

def has_readable_text(doc):
    text = ''
    for page in doc:
        text += page.get_text()
    return text != ''

# Function to extract text from a PDF document
def extract_text(pdf):
    text = ''
    pdf = PdfReader(pdf)
    for page in pdf.pages:
        text += page.extract_text()
    return text
        

# Function to perform OCR on a PDF document
def perform_ocr(pdf_file_path):
    # Convert PDF to images using PyMuPDF
    images = convert_pdf_to_images(pdf_file_path)

    # Perform OCR on each image using pytesseract
    ocr_text = ''
    for image in images:
        ocr_text += pytesseract.image_to_string(image)

    return ocr_text

# Function to convert a PDF to a list of images
def convert_pdf_to_images(pdf_file_path):
    images = []
    pdf_reader = PdfReader(pdf_file_path)

    for page_num, page in enumerate(pdf_reader.pages):
        xObject = page['/Resources']['/XObject'].get_object()
        for obj in xObject:
            if xObject[obj]['/Subtype'] == '/Image':
                image_data = xObject[obj].get_data()
                image = process_image_data(image_data)
                images.append(image)

    return images

# Function to process image data
def process_image_data(image_data):
    # Convert the image_data to a NumPy array
    nparr = np.frombuffer(image_data, dtype=np.uint8)

    # Decode the image using cv2.imdecode
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    return image


# Function to check if 'L' is present in segments
def is_laude(segments):
    return 'L' in segments

# Function to extract and join class name segments containing '0'
def get_class_name(segments):
    result = []
    found_zero = False
    
    for segment in segments:
        if '0' in segment:
            found_zero = True
            break
        result.append(segment)
    
    if found_zero:
        return ' '.join(result)
    else:
        return ' '.join(segments)

# Function to check if 'A' or 'B' are present
def is_two_trimesters(name):
    return any(segment in {'A', 'B'} for segment in name)

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

# Function to extract student's name from the text
def get_name(text):
    lines = text.split('\n')
    for i, line in enumerate(lines):
        # Check for markers indicating the name section
        if (line.find('PHONE') != -1 and lines[i + 1].find('ACCREDITED') == -1) or line.find('ACCREDITED') != -1:
            name_match = re.search(r'(.+?)\s+GRD', lines[i + 1])
            if name_match:
                return name_match.group(1)
    return 'Name Not Found'  # Return a default value or handle the case when the name is not found