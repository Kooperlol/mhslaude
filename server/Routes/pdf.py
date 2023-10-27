from flask import Blueprint, request, jsonify
from PyPDF2 import PdfReader

pdf_bp = Blueprint('pdf', __name__)

@pdf_bp.route('/extract-text', methods=['POST'])
def extract_text():
    pdf_file = request.files['pdf']

    if not pdf_file:
        return jsonify({'error': 'No PDF file provided'}), 400

    try:
        pdf = PdfReader(pdf_file)
        text = ""
        for page in pdf.pages:
            text += page.extract_text()

        return jsonify({'text': text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500