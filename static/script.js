document.getElementById('chat-container').innerHTML = '';
document.getElementById('user-input').value = localStorage.getItem('userInput') || '';

function generateContent() {
    var userInput = document.getElementById('user-input').value;

    if (userInput.trim() === '') {
        return;  // 빈 입력은 무시
    }

    // 사용자 질문 추가
    const userMessage = createMessage('user', userInput);
    document.getElementById('chat-container').appendChild(userMessage);

    // 서버에 POST 요청 보내기
    fetch('/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'user-input': userInput }),
    })
    .then(response => response.json())
    .then(data => {
        // 챗봇 대답 추가
        const generatedContent = data.generated_output;
        const assistantMessage = createMessage('assistant', generatedContent);
        document.getElementById('chat-container').appendChild(assistantMessage);

        localStorage.setItem('userInput', userInput);

        // 스크롤을 가장 아래로 이동
        document.getElementById('chat-container').scrollTop = document.getElementById('chat-container').scrollHeight;
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // 입력창 초기화
    document.getElementById('user-input').value = '';
}

function createMessage(role, content) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message', role + '-message', 'full-width'); // full-width 클래스 추가
    messageContainer.innerHTML = '<p>' + role + '</p>' +
                                  '<div class="message-content">' + content + '</div>';

    return messageContainer;
}
