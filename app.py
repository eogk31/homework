from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)

# OpenAI API 키 설정
openai.api_key = 'your openai'  # 자신의 OpenAI API 키로 바꿔주세요.

def interact_with_chatgpt(prompt):
    """
    ChatGPT 모델과 상호 작용하는 함수

    :param prompt: 사용자의 입력 문장
    :return: ChatGPT의 응답
    """
    # OpenAI API 호출
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # GPT-3.5-turbo 사용
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ],
    )

    # 응답 텍스트 추출
    reply = response['choices'][0]['message']['content'].strip()
    return reply

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    if request.method == 'POST':
        user_input = request.json.get('user-input', '')
        generated_output = interact_with_chatgpt(user_input)
        return jsonify({'generated_output': generated_output})

if __name__ == '__main__':
    app.run(debug=True, port=8080)
