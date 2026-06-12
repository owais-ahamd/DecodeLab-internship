/**
 * chatbot.js — AI Chatbot
 * Clean, professional, fully working.
 */

(function () {
  'use strict';

  // ── DOM refs ────────────────────────────────────────────────
  const chat      = document.getElementById('chat');
  const userInput = document.getElementById('userInput');
  const sendBtn   = document.getElementById('sendBtn');
  const quickBtns = document.getElementById('quickBtns');
  const clearBtn  = document.getElementById('clearBtn');
  const sidebar   = document.getElementById('sidebar');
  const menuToggle = document.getElementById('menuToggle');
  const sidebarClose = document.getElementById('sidebarClose');
  const overlay   = document.getElementById('overlay');

  // ── Helpers ─────────────────────────────────────────────────
  function normalize(text) {
    return (text || '').trim().toLowerCase();
  }

  function timestamp() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // ── Reply engine ────────────────────────────────────────────
  function botReply(rawText) {
    const msg = normalize(rawText);
    if (!msg) return '';

    if (['exit', 'quit', 'bye', 'stop'].includes(msg)) {
      return 'Goodbye! Feel free to come back anytime.';
    }

    if (['hi', 'hello', 'hey', 'hii', 'greetings'].includes(msg)) {
      return "Hello! I'm your AI Chatbot. How can I assist you today?";
    }

    if (['help', 'commands', 'what can you do', 'how to use'].includes(msg)) {
      return (
        "Here's what I can help with:\n" +
        '\u2022 hi / hello \u2014 start a conversation\n' +
        '\u2022 how are you \u2014 check my status\n' +
        '\u2022 your name \u2014 learn about me\n' +
        '\u2022 hours \u2014 office hours\n' +
        '\u2022 location \u2014 find us\n' +
        '\u2022 exit \u2014 end the session'
      );
    }

    if (['your name', 'name', 'who are you', 'what is your name'].includes(msg)) {
      return "I'm AI Chatbot \u2014 a rule-based assistant powered by structured logic. Fast, predictable, and always available.";
    }

    if (['how are you', 'how r u', 'how are u'].includes(msg)) {
      return 'All systems operational. Running on rules and logic, ready to help.';
    }

    if (['thanks', 'thank you', 'thx'].includes(msg)) {
      return "You're welcome! Let me know if there's anything else.";
    }

    if (['hours', 'working hours', 'office hours'].includes(msg)) {
      return 'We are open daily from 9\u202FAM to 5\u202FPM.';
    }

    if (['address', 'location', 'your address', 'your location'].includes(msg)) {
      return 'Greater Peshawar, Pakistan.';
    }

    return "I didn't catch that. Type 'help' to see available commands, or say 'hi' to start.";
  }

  // ── Render helpers ──────────────────────────────────────────
  function addMessage(text, role) {
    const row = document.createElement('div');
    row.className = `msg-row ${role}`;

    if (role === 'bot') {
      const icon = document.createElement('div');
      icon.className = 'bot-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 17.93V18a1 1 0 0 0-2 0v1.93A8 8 0 0 1 4.07 13H6a1 1 0 0 0 0-2H4.07A8 8 0 0 1 11 4.07V6a1 1 0 0 0 2 0V4.07A8 8 0 0 1 19.93 11H18a1 1 0 0 0 0 2h1.93A8 8 0 0 1 13 19.93z"/></svg>';
      row.appendChild(icon);
    }

    const bubble = document.createElement('div');
    bubble.className = `bubble ${role}`;
    bubble.textContent = text;

    const meta = document.createElement('span');
    meta.className = 'msg-meta';
    meta.setAttribute('aria-label', `Sent at ${timestamp()}`);
    meta.textContent = timestamp();

    bubble.appendChild(meta);
    row.appendChild(bubble);
    chat.appendChild(row);
    chat.scrollTop = chat.scrollHeight;
  }

  // Typing indicator
  let typingRow = null;

  function showTyping() {
    if (typingRow) return;
    typingRow = document.createElement('div');
    typingRow.className = 'msg-row bot';
    typingRow.setAttribute('aria-label', 'AI Chatbot is typing');

    const icon = document.createElement('div');
    icon.className = 'bot-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 17.93V18a1 1 0 0 0-2 0v1.93A8 8 0 0 1 4.07 13H6a1 1 0 0 0 0-2H4.07A8 8 0 0 1 11 4.07V6a1 1 0 0 0 2 0V4.07A8 8 0 0 1 19.93 11H18a1 1 0 0 0 0 2h1.93A8 8 0 0 1 13 19.93z"/></svg>';

    const bubble = document.createElement('div');
    bubble.className = 'typing-bubble';
    bubble.innerHTML = '<span class="dots"><span></span><span></span><span></span></span>';

    typingRow.appendChild(icon);
    typingRow.appendChild(bubble);
    chat.appendChild(typingRow);
    chat.scrollTop = chat.scrollHeight;
  }

  function hideTyping() {
    if (typingRow) {
      typingRow.remove();
      typingRow = null;
    }
  }

  // ── Session control ─────────────────────────────────────────
  function setDisabled(value) {
    userInput.disabled = value;
    sendBtn.disabled   = value;
    quickBtns.style.display = value ? 'none' : '';
  }

  // ── Clear conversation ──────────────────────────────────────
  function clearConversation() {
    chat.innerHTML = '';
    setDisabled(false);
    addMessage("Conversation cleared. How can I assist you?", 'bot');
  }

  // ── Core send flow ──────────────────────────────────────────
  function sendMessage(overrideText) {
    if (sendBtn.disabled) return;

    const raw     = overrideText !== undefined ? overrideText : userInput.value;
    const trimmed = (raw || '').trim();
    if (!trimmed) return;

    addMessage(trimmed, 'user');
    userInput.value = '';

    showTyping();

    const delay = 850 + Math.random() * 350;

    setTimeout(function () {
      hideTyping();
      const reply = botReply(trimmed);
      if (reply) addMessage(reply, 'bot');

      if (['exit', 'quit', 'bye', 'stop'].includes(normalize(trimmed))) {
        setDisabled(true);
      }
    }, delay);
  }

  // ── Sidebar toggle ──────────────────────────────────────────
  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('visible');
    overlay.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    sidebarClose.focus();
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
    overlay.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.focus();
  }

  // ── Event listeners ─────────────────────────────────────────
  sendBtn.addEventListener('click', function () { sendMessage(); });

  userInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  quickBtns.addEventListener('click', function (e) {
    const chip = e.target.closest('.chip');
    if (chip) sendMessage(chip.dataset.msg);
  });

  clearBtn.addEventListener('click', clearConversation);

  menuToggle.addEventListener('click', openSidebar);
  sidebarClose.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);

  // Close sidebar on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });

  // ── Boot ────────────────────────────────────────────────────
  addMessage("Hello! I'm your AI Chatbot. Type 'help' to see what I can do, or choose a quick reply below.", 'bot');

}());
