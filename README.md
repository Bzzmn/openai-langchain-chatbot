
# OpenAI & LangChain-Powered Chatbot Support System with Socket.io

![Chatbot](/src/public/images/chatbot.png)

## Overview

This project is a real-time chatbot support system powered by **OpenAI** and **LangChain**, built using **Node.js**, **Express**, and **Socket.io**. The system allows users to interact with a chatbot in a web-based interface, where their questions are processed and answered in real-time. The application leverages an interactive chat UI that dynamically updates as messages are exchanged between the user and the AI-powered chatbot.

## Technologies Used

- **OpenAI**: AI-powered language model used to generate responses.
- **LangChain**: Framework to chain together language models, prompts, and other utilities.
- **Node.js**: Backend server that powers the chatbot application.
- **Express**: Web framework for handling HTTP requests and serving static files.
- **Socket.io**: Real-time communication library for sending and receiving messages between the client and server.
- **JavaScript (ES6)**: Programming language used for both frontend and backend logic.
- **HTML/CSS**: Markup and styling for the chat interface.

## Features

- Real-time communication between users and the chatbot.
- Dynamic message handling and UI updates using Socket.io.
- Customizable and extensible chatbot logic.
- Simple and intuitive user interface.

## Installation

1. **Clone the repository:**

   \`\`\`bash
   git clone https://github.com/Bzzmn/openai-langchain-chatbot.git
   cd openai-langchain-chatbot
   \`\`\`

2. **Install the dependencies:**

   \`\`\`bash
   npm install
   \`\`\`

3. **Create a \`.env\` file in the root directory with your OpenAI API key:**

   \`\`\`bash
   OPENAI_API_KEY=your-openai-api-key
   \`\`\`

4. **Run the server:**

   \`\`\`bash
   npm start
   \`\`\`

5. **Open your browser and navigate to:**

   \`\`\`
   http://localhost:3000
   \`\`\`

## Endpoints

- **GET /**: Serves the main chatbot interface (\`home.html\`).

## Usage

- Enter your message in the chat input box and press "Send".
- The chatbot will respond in real-time.
- The conversation history is maintained within the session.

## Project Structure

![Structure](/src/public/images/file_structure.png)

## Incremental Stages

The files named 1_* to 6_* under the src/utils directory represent incremental stages of the project's development. Each stage introduces new functionality or improvements. Only the final stage (6_agent.js) is needed for the project to work.

- 1_supabase-uploader.js: Handles uploading data to Supabase.
- 2_stndalone-question.js: Processes standalone questions.
- 3_retrieval.js: Manages data retrieval.
- 4_runnableseq.js: Implements runnable sequences.
- 5_addrunnableseqchallenge.js: Adds runnable sequence challenges.
- 6_agent.js: Integrates an AI agent for generating responses.

## Future Enhancements

- Integrate a more advanced AI model for chatbot responses using OpenAI or another AI service.
- Add authentication for multiple users to maintain individual conversation history.
- Implement a database for storing conversations and user data.
- Enhance the UI with more interactive elements and themes.

## Tutorial

This project is inspired by the FreeCodeCamp tutorial. You can watch the tutorial on YouTube here: [How to Build a Chatbot with LangChain and OpenAI](https://www.youtube.com/watch?v=HSZ_uaif57o).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributors

- **Alvaro Acevedo** - [@Bzzmn](https://github.com/Bzzmn)
