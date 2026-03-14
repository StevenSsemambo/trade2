/* ═══════════════════════════════════════════
   STATE MANAGEMENT & NAVIGATION
   TradeBaby Pro v4 — SayMy Tech
   ═══════════════════════════════════════════ */

const STATE = {
  screen: 'home',
  user: {
    name: '', level: 1, xp: 0, xpNext: 500,
    goal: '', experience: '', schedule: '', riskStyle: '', learningStyle: '',
    joinDate: null, theme: 'dark', fontSize: 'medium',
    brightness: 100, onboarded: false, toured: false,
    notificationsEnabled: false,
  },
  progress: {},
  journal: [],
  chatHistory: [],
  simTrades: [], simBalance: 10000, simEquity: 10000,
  achievements: [],
  dailyStreak: 0, lastActive: null,
  dailyMood: null, dailyCheckIn: null,
  flashProgress: {},
  patternScore: { correct: 0, total: 0 },
  quizResults: {},
  alerts: [],
  notifications: [],
};

// ── PERSIST ──
function loadState() {
  try {
    const raw = localStorage.getItem('tb4');
    if (!raw) return;
    const p = JSON.parse(raw);
    if (p.user) Object.assign(STATE.user, p.user);
    if (p.progress) STATE.progress = p.progress;
    if (p.journal) STATE.journal = p.journal;
    if (p.chatHistory) STATE.chatHistory = p.chatHistory.slice(-80);
    if (p.simTrades) STATE.simTrades = p.simTrades;
    if (p.simBalance !== undefined) STATE.simBalance = p.simBalance;
    if (p.simEquity  !== undefined) STATE.simEquity  = p.simEquity;
    if (p.achievements) STATE.achievements = p.achievements;
    if (p.dailyStreak !== undefined) STATE.dailyStreak = p.dailyStreak;
    if (p.lastActive) STATE.lastActive = p.lastActive;
    if (p.dailyMood) STATE.dailyMood = p.dailyMood;
    if (p.dailyCheckIn) STATE.dailyCheckIn = p.dailyCheckIn;
    if (p.flashProgress) STATE.flashProgress = p.flashProgress;
    if (p.patternScore) STATE.patternScore = p.patternScore;
    if (p.quizResults) STATE.quizResults = p.quizResults;
    if (p.alerts) STATE.alerts = p.alerts;
    if (p.notifications) STATE.notifications = p.notifications;
    updateStreak();
    applyTheme(STATE.user.theme || 'dark');
    applyFontSize(STATE.user.fontSize || 'medium');
    applyBrightness(STATE.user.brightness || 100);
  } catch(e) { console.warn('Load state error', e); }
}

function saveState() {
  try {
    localStorage.setItem('tb4', JSON.stringify({
      user: STATE.user,
      progress: STATE.progress,
      journal: STATE.journal,
      chatHistory: STATE.chatHistory.slice(-80),
      simTrades: STATE.simTrades.slice(-300),
      simBalance: STATE.simBalance,
      simEquity: STATE.simEquity,
      achievements: STATE.achievements,
      dailyStreak: STATE.dailyStreak,
      lastActive: STATE.lastActive,
      dailyMood: STATE.dailyMood,
      dailyCheckIn: STATE.dailyCheckIn,
      flashProgress: STATE.flashProgress,
      patternScore: STATE.patternScore,
      quizResults: STATE.quizResults,
      alerts: STATE.alerts,
      notifications: STATE.notifications,
    }));
  } catch(e) { console.warn('Save state error', e); }
}

function updateStreak() {
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (!STATE.lastActive) { STATE.dailyStreak = 1; STATE.lastActive = today; return; }
  if (STATE.lastActive === today) return;
  STATE.dailyStreak = STATE.lastActive === yesterday ? STATE.dailyStreak + 1 : 1;
  STATE.lastActive = today;
}

// ── THEME ──
function applyTheme(t) {
  STATE.user.theme = t;
  const themes = ['dark','light','slate','matrix','ocean','crimson','forest'];
  if (t === 'dark') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', t);
  const metaColors = {
    dark:'#0A0A0F', light:'#F7F4EE', slate:'#0D1117',
    matrix:'#020A04', ocean:'#040810', crimson:'#0F0508', forest:'#050F08'
  };
  const meta = document.getElementById('theme-color-meta');
  if (meta) meta.content = metaColors[t] || '#0A0A0F';
}

function applyFontSize(s) {
  STATE.user.fontSize = s;
  document.body.style.fontSize = {small:'13px', medium:'15px', large:'17px'}[s] || '15px';
}

function applyBrightness(v) {
  STATE.user.brightness = v;
  document.documentElement.style.setProperty('--brightness', v / 100);
}

// ── NAVIGATION ──
const NAV_ORDER = ['home','learn','trade','journal','mentor','profile'];

let _simPriceInterval = null;
let _clockInterval = null;

function navigate(screen, opts = {}) {
  // Stop background intervals
  if (_simPriceInterval) { clearInterval(_simPriceInterval); _simPriceInterval = null; }
  if (_clockInterval && screen !== 'home') { clearInterval(_clockInterval); _clockInterval = null; }

  STATE.screen = screen;

  // Update nav highlight
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  const navMap = { home:'ni-home', learn:'ni-learn', trade:'ni-trade', journal:'ni-journal', mentor:'ni-mentor', profile:'ni-profile' };
  const navId = navMap[screen];
  if (navId) { const nb = document.getElementById(navId); if (nb) nb.classList.add('active'); }

  // Render with direction animation
  renderScreen(screen);

  // Scroll to top
  const sw = document.getElementById('screen-wrap');
  if (sw) sw.scrollTop = 0;
}

function renderScreen(screen) {
  const el = document.getElementById('screen');
  if (!el) return;

  const renderers = {
    home:       renderHome,
    learn:      renderLearn,
    lesson:     renderLesson,
    trade:      renderTrade,
    journal:    renderJournal,
    mentor:     renderMentor,
    profile:    renderProfile,
    strategies: renderStrategies,
    calculator: renderCalculator,
    analytics:  renderAnalytics,
    settings:   renderSettings,
    flashcards: renderFlashcards,
    patterns:   renderPatternGame,
    candlebible:renderCandleBible,
    skillmap:   renderSkillMap,
    curriculum: renderCurriculum,
    notifications: renderNotifications,
  };

  const fn = renderers[screen];
  if (fn) {
    el.innerHTML = '';
    el.innerHTML = fn();
    // Post-render hooks
    if (screen === 'trade') initSimChart();
    if (screen === 'analytics') initEquityChart();
    if (screen === 'home') { initForexClock(); }
    if (screen === 'patterns') drawPatternCanvas();
    if (screen === 'mentor') scrollChatToBottom();
  } else {
    el.innerHTML = renderHome();
  }
}

// ── XP & LEVELS ──
function addXP(amt) {
  STATE.user.xp += amt;
  let leveled = false;
  while (STATE.user.xp >= STATE.user.xpNext) {
    STATE.user.xp -= STATE.user.xpNext;
    STATE.user.level++;
    STATE.user.xpNext = Math.floor(STATE.user.xpNext * 1.35 + 100);
    leveled = true;
  }
  if (leveled) showLevelUp(STATE.user.level);
  saveState();
  checkAchievements();
  return leveled;
}

function showLevelUp(lvl) {
  const overlay = document.getElementById('levelup-screen');
  if (!overlay) return;
  document.getElementById('lu-title').textContent = `LEVEL ${lvl}!`;
  document.getElementById('lu-level').textContent = `You're now a Level ${lvl} Trader`;
  const msgs = [
    'Keep grinding! 🔥', 'Strategy Library unlocked! 📊', 'You\'re getting serious! 💪',
    'Pro mindset developing! 🧠', 'Real trader energy! ⚡', 'Elite territory! 🏆',
    'Institutional level! 🏛️', 'Market master! 🌍', 'Legendary status! 🌟'
  ];
  document.getElementById('lu-msg').textContent = msgs[Math.min(lvl - 2, msgs.length - 1)] || 'Trading legend!';
  overlay.classList.add('show');
  launchConfetti();
}

function closeLevelUp() {
  const o = document.getElementById('levelup-screen');
  if (o) o.classList.remove('show');
}

function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  const COLORS = ['#C9A84C','#E8C97A','#22C55E','#60A5FA','#A78BFA','#F97316','#F472B6'];
  const pieces = Array.from({ length: 90 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 7 + 3,
    c: COLORS[Math.floor(Math.random() * COLORS.length)],
    v: Math.random() * 3 + 2,
    a: Math.random() * Math.PI * 2,
    spin: (Math.random() - .5) * .12,
    w: Math.random() * 12 + 4,
    h: Math.random() * 6 + 3,
  }));
  let frame = 0;
  const draw = () => {
    if (frame++ > 200) { ctx.clearRect(0, 0, canvas.width, canvas.height); return; }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a);
      ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
      p.y += p.v; p.x += Math.sin(p.a * 2) * 1.5; p.a += p.spin;
    });
    requestAnimationFrame(draw);
  };
  draw();
}

// ── ACHIEVEMENTS ──
function checkAchievements() {
  const defs = [
    { id: 'first-lesson',   check: () => completedCount() >= 1 },
    { id: 'five-lessons',   check: () => completedCount() >= 5 },
    { id: 'ten-lessons',    check: () => completedCount() >= 10 },
    { id: 'twenty-lessons', check: () => completedCount() >= 20 },
    { id: 'all-lessons',    check: () => completedCount() >= totalLessons() },
    { id: 'first-trade',    check: () => STATE.simTrades.length >= 1 },
    { id: 'ten-trades',     check: () => STATE.simTrades.length >= 10 },
    { id: 'first-journal',  check: () => STATE.journal.length >= 1 },
    { id: 'ten-journal',    check: () => STATE.journal.length >= 10 },
    { id: 'streak-3',       check: () => STATE.dailyStreak >= 3 },
    { id: 'streak-7',       check: () => STATE.dailyStreak >= 7 },
    { id: 'streak-30',      check: () => STATE.dailyStreak >= 30 },
    { id: 'level-5',        check: () => STATE.user.level >= 5 },
    { id: 'level-10',       check: () => STATE.user.level >= 10 },
    { id: 'profitable',     check: () => STATE.simEquity >= 11000 },
    { id: 'flashcard-20',   check: () => Object.keys(STATE.flashProgress).length >= 20 },
    { id: 'pattern-10',     check: () => STATE.patternScore.correct >= 10 },
    { id: 'pattern-50',     check: () => STATE.patternScore.correct >= 50 },
  ];
  const labels = {
    'first-lesson':'📚 First Step!','five-lessons':'🎯 Getting Serious','ten-lessons':'💪 Committed',
    'twenty-lessons':'🔥 Scholar','all-lessons':'🏆 Graduate!','first-trade':'📈 First Trade',
    'ten-trades':'💼 Active Trader','first-journal':'📓 First Entry','ten-journal':'✍️ Chronicler',
    'streak-3':'🔥 3-Day Streak','streak-7':'⚡ Week Streak!','streak-30':'🌟 Month Legend!',
    'level-5':'⭐ Rising Star','level-10':'💫 Pro Trader','profitable':'💰 Profitable!',
    'flashcard-20':'🃏 Card Shark','pattern-10':'🔍 Pattern Spotter','pattern-50':'🎯 Pattern Master',
  };
  defs.forEach(d => {
    if (!STATE.achievements.includes(d.id) && d.check()) {
      STATE.achievements.push(d.id);
      showToast(`🏅 Achievement: ${labels[d.id] || d.id}`, 3500);
      addNotification(`Achievement unlocked: ${labels[d.id]}`, '🏅');
    }
  });
}

// ── NOTIFICATIONS (in-app) ──
function addNotification(text, icon = '📢') {
  STATE.notifications.unshift({
    id: Date.now(), text, icon,
    time: new Date().toISOString(), read: false
  });
  if (STATE.notifications.length > 50) STATE.notifications = STATE.notifications.slice(0, 50);
  const dot = document.getElementById('mentor-dot');
  const unread = STATE.notifications.filter(n => !n.read).length;
  if (dot) dot.style.display = unread > 0 ? 'block' : 'none';
  saveState();
}

// ── TOAST ──
function showToast(msg, duration = 2800) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const item = document.createElement('div');
  item.className = 'toast-item';
  item.innerHTML = msg;
  container.appendChild(item);
  setTimeout(() => { item.style.opacity = '0'; item.style.transition = 'opacity .3s'; }, duration - 300);
  setTimeout(() => item.remove(), duration);
}

// ── MODAL ──
function showModal(html) {
  closeModal();
  const backdrop = document.getElementById('modal-backdrop');
  const box = document.getElementById('modal-box');
  if (!backdrop || !box) return;
  box.innerHTML = html;
  backdrop.style.display = 'flex';
  const sw = document.getElementById('screen-wrap');
  let startY = 0;
  box.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, { passive: true });
  box.addEventListener('touchend', e => { if (e.changedTouches[0].clientY - startY > 80) closeModal(); });
}

function closeModal() {
  const backdrop = document.getElementById('modal-backdrop');
  if (backdrop) backdrop.style.display = 'none';
}

// ── HELPERS ──
function completedCount() { return Object.keys(STATE.progress).length; }
function totalLessons() { return (typeof CURRICULUM !== 'undefined') ? CURRICULUM.reduce((a, c) => a + c.lessons.length, 0) : 0; }
function progressPct() { const t = totalLessons(); return t > 0 ? Math.round(completedCount() / t * 100) : 0; }
function getLessonById(id) {
  if (typeof CURRICULUM === 'undefined') return null;
  for (const cat of CURRICULUM) { for (const l of cat.lessons) { if (l.id === id) return { lesson: l, category: cat }; } }
  return null;
}
function fmtCurrency(n) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(n); }
function fmtDate(iso) { try { return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); } catch { return ''; } }
function el(id) { return document.getElementById(id); }

// ── SWIPE GESTURES ──
(function initSwipe() {
  let tx = 0, ty = 0;
  document.addEventListener('touchstart', e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  document.addEventListener('touchend', e => {
    if (document.getElementById('modal-backdrop')?.style.display !== 'none') return;
    if (STATE.screen === 'mentor') return; // don't swipe on chat
    const dx = e.changedTouches[0].clientX - tx;
    const dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.8) {
      const cur = NAV_ORDER.indexOf(STATE.screen);
      if (cur !== -1) {
        if (dx < 0 && cur < NAV_ORDER.length - 1) navigate(NAV_ORDER[cur + 1]);
        else if (dx > 0 && cur > 0) navigate(NAV_ORDER[cur - 1]);
      }
    }
  }, { passive: true });
})();

// Ripple on buttons
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn-gold, .btn-outline, .btn-success, .btn-ghost');
  if (!btn) return;
  const r = document.createElement('span');
  r.className = 'btn-ripple';
  const rect = btn.getBoundingClientRect();
  r.style.left = (e.clientX - rect.left - 5) + 'px';
  r.style.top  = (e.clientY - rect.top  - 5) + 'px';
  btn.style.position = 'relative'; btn.style.overflow = 'hidden';
  btn.appendChild(r);
  setTimeout(() => r.remove(), 600);
});

// Auto-save every 30s
setInterval(saveState, 30000);
