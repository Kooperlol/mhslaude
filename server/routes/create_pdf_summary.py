from flask import Blueprint, request, jsonify, Response, render_template_string
import os
from jinja2 import Environment, FileSystemLoader
from xhtml2pdf import pisa
from io import BytesIO
from datetime import datetime

summary_bp = Blueprint('/pdf', __name__)
env = Environment(loader=FileSystemLoader("html"))

@summary_bp.route('/create-summary', methods=['POST'])
def create_pdf_summary():
    data = request.get_json()

    template = env.get_template("summary.html")

    current_date = datetime.now().strftime('%m/%d/%Y')
    class_data = data['student'][0]['classes']
    classes_list = [{"name": class_name, "points": class_points} for class_name, class_points in class_data.items()]
    tbe_class_data = data['student'][0]['to_be_earned_classes']
    tbe_classes_list = [{"name": class_name, "points": class_points} for class_name, class_points in tbe_class_data.items()]
    rendered_template = template.render(student=data['student'][0], classes=classes_list, tbe_classes=tbe_classes_list, current_date=current_date)
    pdf = create_pdf(rendered_template)

    response = Response(pdf, content_type='application/pdf')
    response.headers['Content-Disposition'] = 'inline; filename=summary.pdf'
    return response

def create_pdf(html_content):
    pdf_data = BytesIO()
    pisa.CreatePDF(BytesIO(html_content.encode("UTF-8")), dest=pdf_data)
    return pdf_data.getvalue()