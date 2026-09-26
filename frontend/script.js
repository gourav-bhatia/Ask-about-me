const chatBox = document.getElementById("chatBox");
const questionInput = document.getElementById("question");

function addMessage(message, type) {
    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message");

    if (type === "user") {
        messageDiv.classList.add("user-message");
    } else {
        messageDiv.classList.add("ai-message");
    }

    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    if (type === "ai") {
        // Convert Markdown to HTML
        bubble.innerHTML = marked.parse(message);
    } else {
        bubble.textContent = message;
    }

    messageDiv.appendChild(bubble);
    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    const question = questionInput.value.trim();

    if (!question) {
        return;
    }

    // Show user's question
    addMessage(question, "user");

    questionInput.value = "";

const aiMessage = document.createElement("div");
    aiMessage.classList.add("message", "ai-message");

    const bubble = document.createElement("div");
    bubble.classList.add("bubble", "loader");

    bubble.innerHTML = `
     <span></span>
     <span></span>
     <span></span>
    `;

    aiMessage.appendChild(bubble);
    chatBox.appendChild(aiMessage);

    try {
        const response = await fetch("https://ask-about-me.onrender.com/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question
            })
        });

        const data = await response.json();

        // Remove loader and show answer
        bubble.classList.remove("loader");
        bubble.innerHTML = marked.parse(data.answer);

    } catch (error) {
        bubble.classList.remove("loader");
        bubble.textContent = "Something went wrong. Please try again.";

        console.error(error);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleEnter(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function newChat() {
    chatBox.innerHTML = `
        <div class="welcome">
            <h2>How can I help you?</h2>
            <p>Ask anything about my skills, projects, education or experience.</p>
        </div>
    `;
}