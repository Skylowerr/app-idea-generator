# 💡 App Idea Generator

An Express.js REST API that generates detailed, structured app ideas using OpenAI's GPT-4o-mini model.

---

## 🚀 Features

- Accepts a custom prompt from the user
- Generates a comprehensive app idea including name, description, target audience, features, monetization strategy, and tech stack
- Clean REST API with proper error handling
- Environment variable support via `.env`

---

## 🛠️ Tech Stack

- **Node.js** (ES Modules)
- **Express.js** v5
- **OpenAI API** (GPT-4o-mini)
- **dotenv**

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/app-idea-generator.git

# Navigate into the project directory
cd app-idea-generator

# Install dependencies
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

---

## ▶️ Usage

```bash
# Start the server
npm start

# Or with auto-restart on file changes
node --watch server.js
```

Server will run at `http://localhost:3000`

---

## 📡 API Endpoints

### `POST /generate`

Generates a structured app idea based on your prompt.

**Request Body:**
```json
{
  "customPrompt": "An app for language learners who want to practice speaking"
}
```

**Success Response:**
```json
{
  "success": true,
  "idea": "1. App Name: SpeakEasy\n2. One-line Description: ..."
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Please provide a prompt"
}
```

---

## 📁 Project Structure

```
app-idea-generator/
├── public/
├── views/
├── .env              # Environment variables (not committed)
├── .gitignore
├── package.json
├── server.js         # Main application file
└── README.md
```

---

## 📝 License

ISC
