# AI Workplace Productivity Assistant

A modern, responsive SaaS-style web application designed to help professionals improve workplace productivity using AI-powered tools. The application provides a centralized workspace for generating professional emails, researching and summarising information, and interacting with an AI workplace assistant.

## Project Overview

The **AI Workplace Productivity Assistant** combines several common workplace tasks into one easy-to-use platform.

Users can generate professional emails based on their purpose, context, and preferred tone, summarise research topics or articles, and interact with an AI-style workplace chatbot for everyday productivity tasks.

This project is designed as a **frontend-only prototype**. It does not require a backend, authentication system, or database. AI-style responses are generated through client-side logic and structured prompts to demonstrate the intended functionality.

## Features Implemented

### 📧 Smart Email Generator

* Generate professional workplace emails.
* Supports multiple tones:

  * Formal
  * Friendly
  * Persuasive
* Uses user-provided context and key points.
* Editable generated email output.
* Copy and regenerate functionality.
* Loading states during generation.

### 🔎 AI Research Assistant

* Enter a research topic, question, or article text.
* Generate contextual summaries.
* Provides key insights and important points.
* Suggests relevant follow-up questions.
* Editable AI-generated output.
* Copy functionality.

### 💬 AI Workplace Chatbot

* Interactive workplace AI assistant.
* Chat-style user interface.
* Responds to workplace-related prompts.
* Includes suggested prompts for common tasks.
* Maintains the conversation within the current session.

### 📊 Modern Dashboard

* SaaS-style dashboard interface.
* Sidebar navigation.
* Quick-access productivity tools.
* Recent activity section.
* Responsive design for desktop, tablet, and mobile devices.

### 🛡️ Responsible AI

* Includes a Responsible AI disclaimer.
* Reminds users to review AI-generated content before professional use.
* Highlights considerations such as accuracy, confidentiality, bias, and appropriateness.

## Technologies and Tools Used

* **React** – Frontend application framework
* **JavaScript / TypeScript** – Application logic
* **HTML5** – Application structure
* **CSS / Tailwind CSS** – Responsive styling and UI design
* **Vite** – Development and build tooling
* **Lovable** – AI-assisted application development
* **GitHub** – Source control and project hosting

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-workplace-productivity-assistant.git
```

### 2. Navigate to the project directory

```bash
cd ai-workplace-productivity-assistant
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite, usually:

```text
http://localhost:5173
```

### 5. Build for production

```bash
npm run build
```

### 6. Preview the production build

```bash
npm run preview
```

## Project Structure

```text
ai-workplace-productivity-assistant/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   ├── App.*
│   └── main.*
│
├── public/
├── package.json
├── README.md
└── vite.config.*
```

## Backend

This project currently operates as a **frontend-only prototype**.

No backend, database, authentication, or external AI API is required. AI-style functionality is demonstrated through client-side logic and structured prompts.

A future version could integrate an AI API and backend service to provide production-level AI generation, user accounts, persistent conversations, and secure data storage.

## Responsible AI

AI-generated content may contain inaccurate, incomplete, biased, or inappropriate information. Users should review and verify generated content before using it for professional, business, research, or other important purposes.

Users should also avoid entering confidential, sensitive, or personally identifiable workplace information into AI tools unless appropriate security and privacy controls are in place.

## Team Members

**Team:** [Add team member names here]

If this is an individual project:

**Developer:** [Your Name]

## Project Status

**Status:** Completed frontend prototype

Future improvements may include:

* Real AI API integration
* User authentication
* Persistent chat history
* Database integration
* Document upload and analysis
* Advanced workplace automation
* Custom AI prompt management
* User productivity analytics
