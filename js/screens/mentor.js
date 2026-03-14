/* ═══════════════════════════════════════════
   MENTOR / CHAT SCREEN
   ═══════════════════════════════════════════ */

function renderMentor() {
  const name = STATE.user.name || 'Trader';
  const history = STATE.chatHistory;

  return `<div class="chat-outer">
    <!-- Header -->
    <div class="chat-header">
      <div>
        <div style="font-family:var(--display);font-weight:800;font-size:18px">Trading Mentor</div>
        <div style="font-size:11px;color:var(--txt2)">Your 24/7 AI trading coach</div>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <span class="live-dot"></span>
        <span style="font-size:12px;color:var(--green)">Online</span>
        <button class="btn-icon btn-sm" onclick="clearChat()" title="Clear chat">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.15"/></svg>
        </button>
      </div>
    </div>

    <!-- Quick questions -->
    <div class="chat-qs">
      ${[
        'What is a pip?','Explain leverage','Best time to trade','Position sizing formula',
        'What is RSI?','Trading psychology tips','SMC explained','How to journal?',
        'My progress','Motivate me','London Breakout strategy','What is support & resistance?',
        'Candlestick patterns','Risk management rules','What is a carry trade?'
      ].map(q => `<div class="chat-q" onclick="sendQuickQuestion('${q.replace(/'/g,"\\'")}'">${q}</div>`).join('')}
    </div>

    <!-- Messages -->
    <div class="chat-messages" id="chat-messages">
      ${history.length === 0 ? `
        <div class="chat-msg system">Chat started — ask me anything about trading!</div>
        <div class="chat-msg bot">
          Hey ${name}! 👋 I'm your personal trading mentor. I know everything in TradeBaby Pro — all 40+ lessons, 10 strategies, patterns, calculations, and more.<br><br>
          ${STATE.user.experience ? `Based on your profile (${STATE.user.experience.replace(/-/g,' ')}, goal: ${STATE.user.goal ? STATE.user.goal.replace(/-/g,' ') : 'learning'}), I'll give you targeted advice.<br><br>` : ''}
          What would you like to explore today? Ask me about any trading concept, strategy, or tap a quick question above! 🎯
        </div>
      ` : history.map(m => `<div class="chat-msg ${m.role}">${m.text}</div>`).join('')}
      <div id="chat-end" style="height:1px"></div>
    </div>

    <!-- Input bar -->
    <div class="chat-bar">
      <input class="chat-inp" id="chat-inp"
        placeholder="Ask anything about trading..."
        onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();submitChat()}">
      <button class="chat-send" onclick="submitChat()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="22" y1="2" x2="11" y2="13"/>
          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      </button>
    </div>
  </div>`;
}

function scrollChatToBottom() {
  const end = document.getElementById('chat-end');
  if (end) setTimeout(() => end.scrollIntoView({ behavior: 'smooth' }), 50);
}

function appendChatMessage(role, text) {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  const end = document.getElementById('chat-end');
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  div.innerHTML = text;
  if (end) container.insertBefore(div, end);
  else container.appendChild(div);
  scrollChatToBottom();
}

function sendQuickQuestion(q) {
  const inp = document.getElementById('chat-inp');
  if (inp) inp.value = q;
  submitChat();
}

function submitChat() {
  const inp = document.getElementById('chat-inp');
  if (!inp) return;
  const text = inp.value.trim();
  if (!text) return;
  inp.value = '';

  // Add user message
  STATE.chatHistory.push({ role: 'user', text });
  appendChatMessage('user', text);

  // Show typing indicator
  const typId = 'typing-' + Date.now();
  const container = document.getElementById('chat-messages');
  const end = document.getElementById('chat-end');
  if (container) {
    const typDiv = document.createElement('div');
    typDiv.id = typId;
    typDiv.className = 'chat-msg bot';
    typDiv.innerHTML = '<div class="chat-typing"><span></span><span></span><span></span></div>';
    if (end) container.insertBefore(typDiv, end);
    else container.appendChild(typDiv);
    scrollChatToBottom();
  }

  const delay = 400 + Math.random() * 800;
  setTimeout(() => {
    const typEl = document.getElementById(typId);
    if (typEl) typEl.remove();
    const response = generateResponse(text);
    STATE.chatHistory.push({ role: 'bot', text: response });
    appendChatMessage('bot', response);
    addXP(2);
    saveState();
  }, delay);
}

function clearChat() {
  if (confirm('Clear chat history?')) {
    STATE.chatHistory = [];
    saveState();
    navigate('mentor');
  }
}

// All responses handled in chatbot.js
