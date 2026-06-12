# AI Chatbot (Web + CLI)

A simple **rule-based** AI chatbot implemented without any external AI API.

This project includes:
- **Web UI** (HTML/CSS/JS): `chatbot.html`, `chatbot.css`, `chatbot.js`
- **CLI version** (Python): `project-1.py`

---

## Features

- Deterministic responses using structured `if/else` logic
- Web chat UI with:
  - Quick-reply suggestion chips
  - Typing indicator
  - Clear conversation button
  - Responsive sidebar
- Supported commands / intents:
  - `hi/hello/hey` (greeting)
  - `help` (list commands)
  - `your name` (about the bot)
  - `how are you` (status)
  - `thanks` (thanks)
  - `hours` (office hours)
  - `location` / `address` (location)
  - `exit/quit/bye/stop` (end session)

---

## Web Chat

### Files
- `chatbot.html`
- `chatbot.css`
- `chatbot.js`

### Run
1. Open `chatbot.html` in any modern browser (Chrome / Edge).
2. Type a message and press **Enter**, or click a quick-reply chip.
3. Try `help` to see available commands.

---

## CLI Chat (Python)

### File
- `project-1.py`

### Run
```bash
python project-1.py
```

### How to use
- Type messages like: `hi`, `help`, `hours`, `location`, etc.
- Type `exit`, `quit`, `bye`, or `stop` to end.

---

## Notes

- This chatbot is **not** connected to an LLM.
- If you want true “AI” responses, you can integrate an LLM API (e.g., OpenAI/others) and replace the `botReply()` rule engine.

