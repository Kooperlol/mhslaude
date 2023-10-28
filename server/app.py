from flask import Flask, jsonify
from flask_cors import CORS
from Routes.pdf import pdf_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(pdf_bp, url_prefix='/pdf') 

if __name__ == "__main__":
    app.run(debug=True)