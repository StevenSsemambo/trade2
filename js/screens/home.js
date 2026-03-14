/* ═══════════════════════════════════════════
   HOME SCREEN
   ═══════════════════════════════════════════ */



function renderHome() {
  const name = STATE.user.name || 'Trader';
  const hr = new Date().getHours();
  const greeting = hr < 12 ? 'Good morning' : hr < 17 ? 'Good afternoon' : 'Good evening';
  const xpPct = Math.round((STATE.user.xp / STATE.user.xpNext) * 100);
  const insight = getSmartInsight();
  const totalPnl = STATE.simTrades.reduce((a, t) => a + (t.pnl || 0), 0);
  const winRate = STATE.simTrades.length > 0
    ? Math.round(STATE.simTrades.filter(t => t.pnl > 0).length / STATE.simTrades.length * 100)
    : 0;

  return `
    ${renderTickerBar()}

    <div class="screen-pad">
      <!-- Greeting -->
      <div class="a-fadeup" style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px">
        <div>
          <div style="font-size:12px;color:var(--txt3);font-family:var(--display);font-weight:600;letter-spacing:.5px">${greeting},</div>
          <h1 style="font-size:24px;margin-top:2px">${name} 👋</h1>
          <div style="display:flex;align-items:center;gap:8px;margin-top:6px">
            <span class="pill pill-gold">⭐ Lvl ${STATE.user.level}</span>
            <span style="font-size:12px;color:var(--txt3)">${STATE.dailyStreak}🔥 streak</span>
          </div>
        </div>
        <div style="display:flex;gap:6px;align-items:center;margin-top:4px">
          <button class="btn-icon" onclick="navigate('notifications')" style="position:relative">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
            ${STATE.notifications.filter(n=>!n.read).length > 0 ? '<span style="position:absolute;top:2px;right:2px;width:8px;height:8px;background:var(--red);border-radius:50%;border:2px solid var(--bg)"></span>' : ''}
          </button>
          <button class="btn-icon" onclick="navigate('settings')">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
          </button>
        </div>
      </div>

      <!-- XP Progress -->
      <div class="xp-wrap a-fadeup2" style="margin-bottom:12px">
        <div class="xp-row">
          <div class="xp-level">Level ${STATE.user.level} Trader</div>
          <div class="xp-pts">${STATE.user.xp} / ${STATE.user.xpNext} XP</div>
        </div>
        <div class="prog-bar lg"><div class="prog-fill" style="width:${xpPct}%"></div></div>
        <div style="font-size:10px;color:var(--txt3);margin-top:5px">${STATE.user.xpNext - STATE.user.xp} XP to Level ${STATE.user.level + 1}</div>
      </div>

      <!-- Smart Insight -->
      <div class="insight-card a-fadeup2" onclick="navigate('${insight.action}')" style="margin-bottom:14px">
        <div style="font-size:28px;flex-shrink:0">${insight.icon}</div>
        <div style="flex:1">
          <div style="font-size:13px;color:var(--txt2);line-height:1.5">${insight.text}</div>
        </div>
        <span class="pill pill-gold" style="font-size:10px;flex-shrink:0">${insight.cta} →</span>
      </div>

      <!-- Forex Clock -->
      <div class="a-fadeup3" style="margin-bottom:14px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <div class="section-lbl" style="margin-bottom:0">Live Sessions</div>
          <div id="utc-time" class="utc-display">—</div>
        </div>
        <div class="forex-clock" id="forex-clock"></div>
      </div>

      <!-- Stats Grid -->
      <div class="stat-grid a-fadeup3" style="margin-bottom:14px">
        <div class="stat-box card-tappable" onclick="navigate('learn')" style="cursor:pointer">
          <div class="stat-val">${progressPct()}%</div>
          <div class="stat-lbl">Course Progress</div>
        </div>
        <div class="stat-box card-tappable" onclick="navigate('analytics')" style="cursor:pointer">
          <div class="stat-val" style="color:${totalPnl >= 0 ? 'var(--green)' : 'var(--red)'}">
            ${totalPnl >= 0 ? '+' : ''}$${Math.abs(totalPnl).toFixed(0)}
          </div>
          <div class="stat-lbl">Sim P&L</div>
        </div>
        <div class="stat-box card-tappable" onclick="navigate('journal')" style="cursor:pointer">
          <div class="stat-val">${STATE.journal.length}</div>
          <div class="stat-lbl">Journal Entries</div>
        </div>
        <div class="stat-box card-tappable" onclick="navigate('analytics')" style="cursor:pointer">
          <div class="stat-val">${winRate > 0 ? winRate + '%' : '—'}</div>
          <div class="stat-lbl">Win Rate</div>
        </div>
      </div>

      <!-- Quick Access -->
      <div class="section-lbl a-fadeup4">Quick Access</div>
      <div class="h-scroll a-fadeup4" style="margin-bottom:16px">
        ${[
          {icon:'📚', label:'Lessons', sub:completedCount()+'/'+totalLessons(), action:'learn'},
          {icon:'📈', label:'Practice', sub:'Sim trade', action:'trade'},
          {icon:'🤖', label:'Mentor', sub:'Ask anything', action:'mentor'},
          {icon:'⚔️', label:'Strategies', sub:STRATEGIES.length+' setups', action:'strategies'},
          {icon:'🧮', label:'Calculator', sub:'Position size', action:'calculator'},
          {icon:'🃏', label:'Flashcards', sub:FLASHCARDS.length+' cards', action:'flashcards'},
          {icon:'🎮', label:'Pattern Game', sub:'Earn XP', action:'patterns'},
          {icon:'🕯️', label:'Candle Bible', sub:CANDLE_PATTERNS.length+' patterns', action:'candlebible'},
          {icon:'🗺️', label:'Skill Map', sub:'Your journey', action:'skillmap'},
          {icon:'📖', label:'Curriculum', sub:'Full syllabus', action:'curriculum'},
        ].map(a => `
          <div class="card card-tappable" onclick="navigate('${a.action}')" style="flex-shrink:0;width:98px;padding:12px 8px;text-align:center">
            <div style="font-size:26px;margin-bottom:6px">${a.icon}</div>
            <div style="font-size:12px;font-weight:700;font-family:var(--display)">${a.label}</div>
            <div style="font-size:10px;color:var(--txt3);margin-top:2px">${a.sub}</div>
          </div>
        `).join('')}
      </div>

      <!-- Continue Learning -->
      ${renderNextLesson()}

      <!-- Mood Check-in -->
      ${renderMoodCheckin()}

      <!-- Market Snapshot -->
      <div class="section-lbl a-fadeup5" style="margin-top:14px">Market Snapshot</div>
      <div class="card a-fadeup5" style="padding:0;overflow:hidden;margin-bottom:14px">
        ${MARKET_DATA.tickers.slice(0, 10).map((t, i) => {
          const up = t.change >= 0;
          const price = t.price > 100
            ? t.price.toLocaleString('en-US', {minimumFractionDigits: 2})
            : t.price.toFixed(4);
          return `<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;${i < 9 ? 'border-bottom:1px solid var(--bdr2)' : ''}"
            class="card-tappable" onclick="showToast('${t.pair}: ${price} (${up ? '+' : ''}${t.pct.toFixed(2)}%)')">
            <div style="font-weight:600;font-size:13px;font-family:var(--display)">${t.pair}</div>
            <div style="text-align:right">
              <div class="t-mono" style="font-size:13px">${price}</div>
              <div style="font-size:11px;color:${up ? 'var(--green)' : 'var(--red)'}">${up ? '▲' : '▼'} ${Math.abs(t.pct).toFixed(2)}%</div>
            </div>
          </div>`;
        }).join('')}
      </div>

      <!-- Daily Tip -->
      <div class="a-fadeup5" style="margin-bottom:8px">
        <div class="section-lbl">Daily Wisdom</div>
        <div class="card card-gold" style="padding:14px">
          <div style="font-size:15px;font-style:italic;line-height:1.6;color:var(--txt);margin-bottom:10px">
            "${DAILY_TIPS[new Date().getDate() % DAILY_TIPS.length].tip}"
          </div>
          <div style="font-size:12px;color:var(--gold);font-family:var(--display);font-weight:700">
            — ${DAILY_TIPS[new Date().getDate() % DAILY_TIPS.length].by}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderTickerBar() {
  const items = MARKET_DATA.tickers.map(t => {
    const up = t.change >= 0;
    const price = t.price > 100
      ? t.price.toLocaleString('en-US', {minimumFractionDigits: 2})
      : t.price.toFixed(4);
    return `<div class="ticker-item">
      <span style="font-family:var(--display);font-weight:600;color:var(--txt2)">${t.pair}</span>
      <span class="t-mono">${price}</span>
      <span style="color:${up ? 'var(--green)' : 'var(--red)'}">${up ? '▲' : '▼'} ${Math.abs(t.pct).toFixed(2)}%</span>
    </div>`;
  }).join('');
  return `<div class="ticker-outer"><div class="ticker-inner">${items}${items}</div></div>`;
}

function getSmartInsight() {
  const now = new Date();
  const hr = now.getHours();
  const sessions = getSessionStatus();
  const soonSession = sessions.find(s => s.soon);
  const openSessions = sessions.filter(s => s.isOpen);
  const daysSinceJournal = STATE.journal.length > 0
    ? Math.round((now - new Date(STATE.journal[STATE.journal.length - 1].date)) / 86400000)
    : 999;
  const winRate = STATE.simTrades.length >= 10
    ? Math.round(STATE.simTrades.filter(t => t.pnl > 0).length / STATE.simTrades.length * 100)
    : null;

  if (daysSinceJournal >= 3 && STATE.simTrades.length > 0)
    return {icon:'📓', text:`You haven't journaled in ${daysSinceJournal} days. Your improvement depends on recording trades.`, action:'journal', cta:'Log Trade'};
  if (soonSession)
    return {icon:'⏰', text:`${soonSession.name} session opens in ~${soonSession.minsTill} minutes. Good time to prepare your analysis.`, action:'trade', cta:'Open Charts'};
  if (openSessions.length > 0 && hr >= 8 && hr <= 20)
    return {icon:'📈', text:`${openSessions.map(s=>s.name).join(' + ')} ${openSessions.length > 1 ? 'sessions are' : 'session is'} active. Peak trading window.`, action:'trade', cta:'Practice Now'};
  if (completedCount() < 5)
    return {icon:'📚', text:`${5 - completedCount()} more lessons to unlock the Strategy Library. Keep learning!`, action:'learn', cta:'Study Now'};
  if (winRate !== null && winRate < 40)
    return {icon:'🎯', text:`Your sim win rate is ${winRate}%. Your journal might reveal why. Review and improve.`, action:'analytics', cta:'View Analytics'};
  if (STATE.dailyCheckIn !== now.toDateString())
    return {icon:'☀️', text:`Good ${hr < 12 ? 'morning' : hr < 17 ? 'afternoon' : 'evening'}! Check in with your mood and start today's session.`, action:'home', cta:'Check In'};
  return {icon:'💡', text:`Consistent daily practice builds real skill. One lesson + one sim trade + one journal entry.`, action:'learn', cta:'Start Learning'};
}

function renderNextLesson() {
  if (typeof CURRICULUM === 'undefined') return '';
  for (const cat of CURRICULUM) {
    for (const l of cat.lessons) {
      if (!STATE.progress[l.id]) {
        return `<div class="section-lbl a-fadeup4">Continue Learning</div>
          <div class="card card-gold a-fadeup4 card-tappable" onclick="openLesson('${l.id}')" style="padding:14px;margin-bottom:14px">
            <div style="display:flex;align-items:center;gap:12px">
              <div style="font-size:30px;flex-shrink:0">${l.emoji}</div>
              <div style="flex:1;min-width:0">
                <div style="font-size:10px;color:var(--gold);font-family:var(--display);font-weight:700;letter-spacing:1px">${cat.title.toUpperCase()}</div>
                <div style="font-weight:700;font-family:var(--display);font-size:15px;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${l.title}</div>
                <div style="font-size:11px;color:var(--txt2);margin-top:3px">⏱ ${l.mins} min · +${l.xp || 50} XP</div>
              </div>
              <div style="color:var(--gold);flex-shrink:0;font-size:18px">→</div>
            </div>
          </div>`;
      }
    }
  }
  return `<div class="card card-gold a-fadeup4" style="padding:14px;margin-bottom:14px;text-align:center">
    <div style="font-size:32px;margin-bottom:8px">🏆</div>
    <div style="font-family:var(--display);font-weight:800">All Lessons Complete!</div>
    <div style="font-size:13px;color:var(--txt2);margin-top:4px">Focus on practice, journaling, and strategy mastery.</div>
  </div>`;
}

function renderMoodCheckin() {
  const today = new Date().toDateString();
  if (STATE.dailyCheckIn === today) return '';
  return `<div class="card a-fadeup4" style="margin-bottom:14px;padding:14px">
    <div style="font-family:var(--display);font-weight:700;font-size:14px;margin-bottom:10px">How are you feeling today?</div>
    <div class="mood-grid">
      ${[['😊','Great'],['😐','Okay'],['😟','Off'],['🔥','Fired up'],['😴','Tired']].map(([e,l]) => `
        <div class="mood-btn" onclick="logMood('${l}','${e}')">
          ${e}<span>${l}</span>
        </div>`).join('')}
    </div>
  </div>`;
}

function logMood(mood, emoji) {
  STATE.dailyCheckIn = new Date().toDateString();
  STATE.dailyMood = mood;
  addXP(10);
  saveState();
  const tips = {
    'Great': 'Amazing energy! Channel it into focused learning 💪',
    'Okay': 'Steady is good. Consistency beats intensity every time.',
    'Off': 'Rest is part of the process. Maybe study today instead of trading.',
    'Fired up': 'Love the energy! Make sure it doesn\'t lead to overtrading.',
    'Tired': 'Fatigue causes trading mistakes. Consider a lighter session today.',
  };
  showToast(`${emoji} ${tips[mood] || 'Thanks for checking in!'} +10 XP`);
  const el = document.querySelector('.card:has(.mood-grid)');
  if (el) el.style.display = 'none';
}

// ── FOREX CLOCK ──
function getSessionStatus() {
  const now = new Date();
  const utcMins = now.getUTCHours() * 60 + now.getUTCMinutes();
  const sessions = [
    {name:'Sydney', flag:'🇦🇺', open:22*60, close:7*60, pairs:'AUD NZD'},
    {name:'Tokyo',  flag:'🇯🇵', open:0,     close:9*60, pairs:'JPY AUD'},
    {name:'London', flag:'🇬🇧', open:8*60,  close:17*60, pairs:'EUR GBP'},
    {name:'New York',flag:'🇺🇸',open:13*60, close:22*60, pairs:'USD CAD'},
  ];
  return sessions.map(s => {
    const isOpen = s.open > s.close
      ? utcMins >= s.open || utcMins < s.close
      : utcMins >= s.open && utcMins < s.close;
    const minsToOpen = s.open > utcMins ? s.open - utcMins : s.open + 1440 - utcMins;
    const soon = !isOpen && minsToOpen <= 60;
    return {...s, isOpen, soon, minsTill: minsToOpen};
  });
}

function initForexClock() {
  renderForexClock();
  if (_clockInterval) clearInterval(_clockInterval);
  _clockInterval = setInterval(renderForexClock, 30000);
}

function renderForexClock() {
  const clockEl = document.getElementById('forex-clock');
  const utcEl = document.getElementById('utc-time');
  if (!clockEl) return;

  const sessions = getSessionStatus();
  const now = new Date();
  if (utcEl) {
    utcEl.textContent = now.toUTCString().split(' ')[4] + ' UTC';
  }

  clockEl.innerHTML = sessions.map(s => `
    <div class="clk-session ${s.isOpen ? 'open' : s.soon ? 'soon' : ''}">
      <div class="clk-name">${s.flag} ${s.name}</div>
      <div class="clk-pairs">${s.pairs}</div>
      <div class="clk-status" style="color:${s.isOpen ? 'var(--green)' : s.soon ? 'var(--gold)' : 'var(--txt3)'}">
        ${s.isOpen ? '● OPEN' : s.soon ? `~${s.minsTill}m` : 'Closed'}
      </div>
    </div>
  `).join('');
}
