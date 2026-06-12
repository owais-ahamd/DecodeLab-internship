"""
project-1.py — AI Chatbot (CLI version)
Rule-based chatbot using structured if/else logic.
"""


def normalize(text: str) -> str:
    """Lowercase and strip whitespace from input."""
    return (text or "").strip().lower()


def chatbot_response(user_text: str) -> str:
    """Return a reply based on simple rule matching."""
    msg = normalize(user_text)

    if msg in {"exit", "quit", "bye", "stop"}:
        return "Goodbye! Feel free to come back anytime."

    if msg in {"hi", "hello", "hey", "hii", "greetings"}:
        return "Hello! I am your AI Chatbot. How can I assist you today?"

    if msg in {"help", "commands", "what can you do", "how to use"}:
        return (
            "Here is what I can help with:\n"
            "  - hi / hello         start a conversation\n"
            "  - how are you        check my status\n"
            "  - your name          learn about me\n"
            "  - hours              office hours\n"
            "  - location           find us\n"
            "  - exit               end the session"
        )

    if msg in {"your name", "name", "who are you", "what is your name"}:
        return (
            "I am AI Chatbot — a rule-based assistant powered by structured logic. "
            "Fast, predictable, and always available."
        )

    if msg in {"how are you", "how r u", "how are u"}:
        return "All systems operational. Running on rules and logic, ready to help."

    if msg in {"thanks", "thank you", "thx"}:
        return "You're welcome! Let me know if there's anything else."

    if msg in {"hours", "working hours", "office hours"}:
        return "We are open daily from 9 AM to 5 PM."

    if msg in {"address", "location", "your address", "your location"}:
        return "Greater Peshawar, Pakistan."

    return (
        "I didn't understand that. "
        "Type 'help' to see available commands, or say 'hi' to start."
    )


def main() -> None:
    print("=" * 50)
    print("  AI Chatbot — Rule-Based Assistant")
    print("  Type 'help' for options. Type 'exit' to quit.")
    print("=" * 50)
    print()

    while True:
        try:
            user_text = input("You: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nBot: Goodbye!")
            break

        if not user_text:
            continue

        response = chatbot_response(user_text)
        print(f"Bot: {response}\n")

        if normalize(user_text) in {"exit", "quit", "bye", "stop"}:
            break


if __name__ == "__main__":
    main()
