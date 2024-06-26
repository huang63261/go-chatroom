let ws = new WebSocket("ws://localhost:8080/ws");

ws.onopen = function(event) {
    console.log("Connection established");
};

ws.onmessage = function(event) {
    let msg = JSON.parse(event.data);
    let messages = document.getElementById('messages');

    // 創建一個新的 message 元素
    const messageElement = document.createElement('div');
    messageElement.className = 'message';

    // 創建 username 元素
    const usernameElement = document.createElement('span');
    usernameElement.className = 'username';
    usernameElement.textContent = msg.username + ": ";

    // 創建 message-text 元素
    const messageTextElement = document.createElement('span');
    messageTextElement.className = 'message-text';
    messageTextElement.textContent = msg.content;

    // 將 username 和 message-text 元素添加到 message 元素
    messageElement.appendChild(usernameElement);
    messageElement.appendChild(messageTextElement);

    // 將 message 元素添加到 messages 容器
    messages.appendChild(messageElement);
};

ws.onclose = function(event) {
    console.log("Connection closed");
};

ws.onerror = function(event) {
    console.error("Error occurred: ", event);
};

function sendMessage() {
    let username = document.getElementById('username').value;
    let content = document.getElementById('message').value;
    if (username === "" || content === "") {
        alert("Username and message cannot be empty");
        return;
    }
    ws.send(JSON.stringify({ username: username, content: content }));
    document.getElementById('message').value = '';
}