function addMessage(messageText, senderType) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", senderType);

  // Replace new lines with <br>
  messageDiv.innerHTML = messageText.replace(/\n/g, "<br>");

  const messagesContainer = document.getElementById("messages");
  messagesContainer.appendChild(messageDiv);

  // Auto scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Welcome message when page loads
document.addEventListener("DOMContentLoaded", function () {
  addMessage(
    'Hello, I am your intelligent books recommendation chatbot "01Books".\nGive me a keyword!\n\nExample: Mathematics',
    "bot"
  );
});

// Send button click handler
document.getElementById("send-button").addEventListener("click", sendMessage);

function sendMessage() {
  const userInput = document.getElementById("user-input").value.trim();
  if (userInput) {
    addMessage(userInput, "user");
    document.getElementById("user-input").value = "";

    // Get recommendations from the internet
    getBookRecommendation(userInput).then((response) => {
      addMessage(response, "bot");
    });
  }
}

