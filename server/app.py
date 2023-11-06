from flask import Flask, jsonify
from flask_cors import CORS
from routes.calculate_laude_points import laude_bp
from routes.create_pdf_summary import summary_bp

app = Flask(__name__)
CORS(app)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

app.register_blueprint(laude_bp, url_prefix='/laude-points')
app.register_blueprint(summary_bp, url_prefix='/pdf') 

if __name__ == "__main__":
    app.run(debug=True)