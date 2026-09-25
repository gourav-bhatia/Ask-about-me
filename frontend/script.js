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

    try {
        const response = await fetch("http://127.0.0.1:8000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question
            })
        });

        const data = await response.json();

        // Show AI answer
        addMessage(data.answer, "ai");

    } catch (error) {
        addMessage("Something went wrong. Please try again.", "ai");
        console.error(error);
    }
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