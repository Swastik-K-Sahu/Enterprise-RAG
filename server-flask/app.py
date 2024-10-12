from flask import Flask, render_template, request, jsonify
from chatbot import chatbot_response  # Import the chatbot_response function
from flask_cors import CORS
try:
    
    app = Flask(__name__)

    # Enable CORS for all routes
    CORS(app)

    # API route for chatbot interaction
    @app.post('/chat')
    def chat():
        user_input = request.json.get("message")
        if user_input:
            bot_response = chatbot_response(user_input)  # Get response from chatbot
            return jsonify({"response": bot_response})
        else:
            return jsonify({"response": "Please provide a valid input."})

    if __name__ == '__main__':
        try:
            print("Starting Flask app...")
            app.run(debug=True, host='0.0.0.0', port=5000)
        except Exception as e:
            print(f"Error starting Flask app: {e}")

except Exception as e:
    print(f"An error occurred: {e}")
    
''' venv activate:  python -m venv venv
venv\Scripts\activate '''
# pip install -r requirements.txt
# then run python app.py
