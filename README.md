# Knowledge Gate – Book Recommendation Chatbot

## Project Overview

**Knowledge Gate** is a web-based chatbot that recommends books based on user input.
The chatbot allows users to type a topic or keyword and receive book recommendations fetched from the **Open Library API** in real time.

This project demonstrates how to use **JavaScript, the DOM, and external APIs** to build an interactive and dynamic user experience.

---

## Features

* Interactive chat interface
* User and bot message bubbles
* Fetches real book data from Open Library
* Displays book title, author, publication year, and reading links
* Typing indicator while data is being fetched
* Supports sending messages via button click or Enter key
* Smooth message animations for better UX

---

## Technologies Used

* **HTML** – Page structure
* **CSS** – Layout, styling, animations
* **JavaScript** – DOM manipulation, event handling, API requests
* **Open Library API** – Book data source

---

## How the Chatbot Works

1. The user types a keyword (e.g. *Adventure*, *History*, *AI*)
2. The message is displayed in the chat as a user bubble
3. The chatbot shows a typing indicator while fetching data
4. JavaScript sends a request to the Open Library API using `fetch`
5. The API returns a list of books related to the keyword
6. The chatbot displays formatted recommendations with links to Open Library

---

## API Used

### Open Library Search API

* Endpoint:

```
https://openlibrary.org/search.json?q=QUERY&limit=5
```

* No API key required
* Returns book titles, authors, publication years, and work IDs
* Each result links to Open Library where books can be read or borrowed if available

---

## Project Structure

```
knowledge-gate/
│
├── knowledge-gate.html   # Chatbot structure
├── knowledge-gate.css    # Styling and animations
└── knowledge-gate.js     # Logic, DOM handling, API calls
```

---

## Example Keywords to Test

* Adventure
* Mathematics
* Artificial Intelligence
* Fantasy
* History

---

## Team Collaboration

This project was developed as a **team project**. Work was divided as follows:

* **HTML & Structure** – Chat layout and elements
* **CSS & UX** – Styling, message bubbles, animations
* **JavaScript & API Logic** – Message handling, fetch requests, typing indicator

All team members collaborated to understand APIs, JavaScript functions, and DOM manipulation.

---

## Learning Outcomes

Through this project, we learned:

* What an API is and how it works
* How to use `fetch` to get data from the internet
* How to manipulate the DOM dynamically
* How to handle asynchronous JavaScript with `async/await`
* How to improve user experience with animations and loading indicators

---

## Future Improvements

* Add support for movies or music APIs
* Improve error handling and fallback messages
* Display book covers
* Add conversation history storage
* Improve accessibility

---

## Author(s)
 - Sheila Fana
 - Victor Arony
 - Stephen Kisengese

---
