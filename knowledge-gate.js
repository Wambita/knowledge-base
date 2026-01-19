// ----------------------------
// Function: addMessage
// Purpose: Adds a chat message bubble for user or bot
// Features:
// - Supports multi-line text
// - Automatically scrolls to the bottom
// ----------------------------
function addMessage(messageText, senderType) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", senderType);

  // Replace new lines with <br> for proper formatting
  messageDiv.innerHTML = messageText.replace(/\n/g, "<br>");

  const messagesContainer = document.getElementById("messages");
  messagesContainer.appendChild(messageDiv);

  // Auto scroll to newest message
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// ----------------------------
// Welcome Message
// Feature: Shows instructions and example keyword when page loads
// ----------------------------
document.addEventListener("DOMContentLoaded", function () {
  addMessage(
     'Hello, I am your book recommendation chatbot!\nGive me a topic!\n\nExample: Adventure',
    "bot"
  );
});

// ----------------------------
// Send Button Handler
// Feature: Sends user message when clicking the button
// ----------------------------
document.getElementById("send-button").addEventListener("click", sendMessage);

// ----------------------------
// Function: sendMessage
// Purpose: Handles user input, displays it, and fetches recommendations
// Features:
// - Clears input after sending
// - Shows typing indicator while fetching
// - Displays response from Open Library API
// ----------------------------
function sendMessage() {
  const userInput = document.getElementById("user-input").value.trim();
  if (userInput) {
    addMessage(userInput, "user"); // Show what the user typed
    document.getElementById("user-input").value = "";

    // Fetch book recommendations based on user query
    getBookRecommendation(userInput).then((response) => {
      addMessage(response, "bot"); // Show recommendations or errors
    });
  }
}

// ----------------------------
// Function: getBookRecommendation
// Purpose: Fetches book data from Open Library API
// Features:
// - Echoes the search term in the bot's response
// - Shows up to 5 recommendations
// - Includes title, author, year, and link to read/borrow
// - Handles no results gracefully
// - Removes typing indicator after completion
// ----------------------------
async function getBookRecommendation(query) {
  try {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
      query
    )}&limit=5`;

    showTypingIndicator(); // Show "Thinking" while fetching
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch book data");
    }

    const data = await response.json();
    removeTypingIndicator(); // Remove "Thinking" once data arrives

    if (!data.docs || data.docs.length === 0) {
      return `No books found for <strong>${query}</strong>. Try another keyword.`;
    }

    // Build message with recommendations
    let message = `Your recommended reads for <em>${query}</em>:<br><br>`;

    data.docs.slice(0, 5).forEach((book) => {
      const title = book.title || "Unknown Title";
      const author = book.author_name
        ? book.author_name.join(", ")
        : "Unknown Author";
      const year = book.first_publish_year || "Unknown Year";
      const bookUrl = book.key
        ?  `https://openlibrary.org${book.key}`
        : null;

      message += `<strong>${title}</strong><br>`;
      message += `Author: ${author}<br>`;
      message += `Published: ${year}<br><br>`;
      
      if (bookUrl) {
        message += `<a href="${bookUrl}" target="_blank">Read / Borrow on Open Library</a><br>`;
      }

      message += `<br>`;
    });

    return message;
  } catch (error) {
    console.error(error);
    return "Something went wrong while fetching book recommendations.";
  } finally {
    removeTypingIndicator(); // Ensure typing bubble is always removed
  }
}

// ----------------------------
// Function: showTypingIndicator
// Purpose: Shows a pulse-style "Thinking..." bubble while fetching
// Feature: Improves UX by letting the user know the bot is working
// ----------------------------
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

// ----------------------------
// Function: removeTypingIndicator
// Purpose: Removes the "Thinking" bubble once data is fetched
// ----------------------------
function removeTypingIndicator() {
  const typingDiv = document.getElementById("typing-indicator");
  if (typingDiv) {
    typingDiv.remove();
  }
}

// ----------------------------
// Enter Key Support
// Feature: Allows user to press Enter to send messages
// ----------------------------
document.getElementById("user-input").addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        sendMessage();
    }
});
