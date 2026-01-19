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
     'Hello, I am your book recommendation chatbot!\nGive me a topic!\n\nExample: Adventure',
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

async function getBookRecommendation(query) {
  try {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
      query
    )}&limit=5`;

    showTypingIndicator();
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch book data");
    }

    const data = await response.json();
    removeTypingIndicator();

    if (!data.docs || data.docs.length === 0) {
      return "No books found for that topic. Try another keyword.";
    }

    let message = "Your recommended reads:<br><br>";

    data.docs.slice(0, 5).forEach((book) => {
      const title = book.title || "Unknown Title";
      const author = book.author_name
        ? book.author_name.join(", ")
        : "Unknown Author";
      const year = book.first_publish_year || "Unknown Year";

      message += `<strong>${title}</strong><br>`;
      message += `Author: ${author}<br>`;
      message += `Published: ${year}<br><br>`;
    });

    return message;
  } catch (error) {
    console.error(error);
    return "Something went wrong while fetching book recommendations.";
  } finally{
    removeTypingIndicator();
  }
}
function showTypingIndicator() {
    if (document.getElementById("typing-indicator")) return;
  const messages = document.getElementById("messages");

  const typingDiv = document.createElement("div");
  typingDiv.classList.add("typing");
  typingDiv.id = "typing-indicator";

  typingDiv.innerHTML = `
    <span>Thinking</span>
    <div class="dots">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  `;

  messages.appendChild(typingDiv);
  messages.scrollTop = messages.scrollHeight;
}
function removeTypingIndicator() {
  const typingDiv = document.getElementById("typing-indicator");
  if (typingDiv) {
    typingDiv.remove();
  }
}


document.getElementById("user-input").addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        sendMessage();
    }
});