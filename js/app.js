/* ═══════════════════════════════════════════
   APP BOOT — TradeBaby Pro v4
   SayMy Tech Developers
   ═══════════════════════════════════════════ */

// ── SPLASH & BOOT ──
const SPLASH_MSGS = [
  'Loading lessons...', 'Preparing charts...', 'Setting up mentor...',
  'Building strategy library...', 'Almost ready...'
];

function bootApp() {
  loadState();

  // Animate splash progress bar
  const fill = document.getElementById('splash-fill');
  const msg  = document.getElementById('splash-msg');
  let pct = 0, mi = 0;

  const tick = setInterval(() => {
    pct = Math.min(pct + Math.random() * 22 + 8, 100);
    if (fill) fill.style.width = pct + '%';
    if (msg && mi < SPLASH_MSGS.length) msg.textContent = SPLASH_MSGS[mi++];
    if (pct >= 100) {
      clearInterval(tick);
      launchApp();
    }
  }, 380);

  // Draw particle stars on splash canvas
  const canvas = document.getElementById('splash-canvas');
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawSplashStars(canvas);
  }
}

function drawSplashStars(canvas) {
  const ctx = canvas.getContext('2d');
  const stars = Array.from({length: 60}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + 0.3,
    a: Math.random() * Math.PI * 2,
    speed: Math.random() * .008 + .003,
    base: Math.random() * .5 + .15,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.a += s.speed;
      const opacity = s.base + Math.sin(s.a) * 0.2;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,76,${opacity.toFixed(2)})`;
      ctx.fill();
    });
    if (document.getElementById('splash')?.style.display !== 'none') {
      requestAnimationFrame(draw);
    }
  }
  draw();
}

function launchApp() {
  setTimeout(() => {
    const splash = document.getElementById('splash');
    const app    = document.getElementById('app');
    if (splash) {
      splash.style.transition = 'opacity .5s ease';
      splash.style.opacity = '0';
      setTimeout(() => { if (splash) splash.style.display = 'none'; }, 500);
    }
    if (app) app.style.display = 'flex';

    if (!STATE.user.onboarded) {
      showOnboarding();
    } else {
      navigate('home');
      if (!STATE.user.toured) setTimeout(startTour, 1200);
    }

    initNotifications();
    checkInstallPrompt();
  }, 300);
}

// ── ONBOARDING ──
let _obStep = 0;

const OB_STEPS = [
  {
    id: 'name', type: 'text', icon: '✨',
    title: 'Welcome to TradeBaby Pro!',
    sub: "I'm your personal trading academy. Let's set up your personalized experience in 6 quick steps.",
    placeholder: 'What should I call you?', field: 'name',
  },
  {
    id: 'experience', type: 'choice', icon: '📊',
    title: "What's your trading experience?",
    sub: "Be honest — I'll tailor your curriculum perfectly.",
    field: 'experience',
    options: [
      {value:'complete-beginner', icon:'🌱', title:'Complete Beginner',  sub:'Never traded before'},
      {value:'some-knowledge',    icon:'📖', title:'Some Knowledge',      sub:"Read about it, haven't traded"},
      {value:'demo-traded',       icon:'📊', title:'Demo Trader',         sub:'Practiced on demo accounts'},
      {value:'live-trader',       icon:'💰', title:'Live Trader',         sub:'Trading with real money'},
    ]
  },
  {
    id: 'goal', type: 'choice', icon: '🎯',
    title: "What's your main trading goal?",
    sub: "This shapes what I focus on teaching you first.",
    field: 'goal',
    options: [
      {value:'extra-income',       icon:'💵', title:'Extra Income',        sub:'Supplement my salary'},
      {value:'full-time',          icon:'🏆', title:'Full-Time Trading',   sub:'Replace my job'},
      {value:'financial-freedom',  icon:'🌍', title:'Financial Freedom',   sub:'Long-term wealth'},
      {value:'just-learning',      icon:'📚', title:'Just Curious',        sub:'Understand markets'},
    ]
  },
  {
    id: 'schedule', type: 'choice', icon: '🕐',
    title: "How much time can you commit daily?",
    sub: "I'll recommend strategies that fit your lifestyle.",
    field: 'schedule',
    options: [
      {value:'15min',  icon:'⚡', title:'15-30 Minutes',  sub:'Very limited time'},
      {value:'1hour',  icon:'🕐', title:'1-2 Hours',      sub:'After work/school'},
      {value:'4hours', icon:'🕓', title:'4+ Hours',       sub:'Part-time focus'},
      {value:'fullday',icon:'🌅', title:'Full Day',       sub:'Full-time attention'},
    ]
  },
  {
    id: 'risk', type: 'choice', icon: '🛡️',
    title: "How do you handle risk?",
    sub: "Honest answers give you better personalized guidance.",
    field: 'riskStyle',
    options: [
      {value:'conservative', icon:'🛡️', title:'Conservative',    sub:'Protect capital above all'},
      {value:'moderate',     icon:'⚖️', title:'Moderate',         sub:'Balanced risk/reward'},
      {value:'aggressive',   icon:'🚀', title:'Growth-Focused',   sub:'Higher risk for returns'},
    ]
  },
  {
    id: 'style', type: 'choice', icon: '🧠',
    title: "How do you learn best?",
    sub: "I'll adapt my teaching style just for you.",
    field: 'learningStyle',
    options: [
      {value:'visual',     icon:'👁️', title:'Visual',         sub:'Charts, diagrams, patterns'},
      {value:'analytical', icon:'🔢', title:'Analytical',      sub:'Numbers, formulas, data'},
      {value:'practical',  icon:'🎮', title:'Hands-On',        sub:'Practice and doing'},
      {value:'reading',    icon:'📖', title:'Deep Reader',     sub:'Detailed explanations'},
    ]
  },
];

function showOnboarding() {
  _obStep = 0;
  document.getElementById('onboarding').style.display = 'block';
  renderObStep();
}

function renderObStep() {
  const step = OB_STEPS[_obStep];
  const total = OB_STEPS.length;
  const pct = Math.round((_obStep / total) * 100);
  document.getElementById('ob-progress').style.width = pct + '%';

  let html = `<div style="animation:fadeUp .4s cubic-bezier(.16,1,.3,1) both">
    <div style="font-size:52px;text-align:center;margin-bottom:16px">${step.icon}</div>
    <h1 style="font-family:var(--display);font-weight:800;font-size:24px;text-align:center;margin-bottom:8px;line-height:1.2">${step.title}</h1>
    <p style="font-size:14px;color:var(--txt2);text-align:center;margin-bottom:24px;line-height:1.55">${step.sub}</p>`;

  if (step.type === 'text') {
    html += `<div class="inp-wrap">
      <input class="inp" id="ob-inp" placeholder="${step.placeholder}" value="${STATE.user[step.field] || ''}"
        style="font-size:16px;padding:16px;text-align:center;border-radius:var(--r)"
        oninput="this.style.borderColor='var(--gold)'">
    </div>`;
  } else {
    html += step.options.map(o => `
      <div class="ob-option ${STATE.user[step.field] === o.value ? 'selected' : ''}" onclick="selectOb('${step.field}','${o.value}')">
        <div class="ob-opt-icon">${o.icon}</div>
        <div style="flex:1">
          <div style="font-family:var(--display);font-weight:700;font-size:14px">${o.title}</div>
          <div style="font-size:12px;color:var(--txt2);margin-top:2px">${o.sub}</div>
        </div>
        <div class="ob-radio ${STATE.user[step.field] === o.value ? 'selected' : ''}">
          ${STATE.user[step.field] === o.value ? '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
        </div>
      </div>`).join('');
  }

  html += `<div style="display:flex;gap:10px;margin-top:24px">
    ${_obStep > 0 ? `<button class="btn btn-outline" style="width:auto;padding:12px 20px" onclick="obBack()">← Back</button>` : ''}
    <button class="btn btn-gold" onclick="obNext()">
      ${_obStep === total - 1 ? 'Start Trading Journey 🚀' : 'Continue →'}
    </button>
  </div>
  <div style="text-align:center;margin-top:14px;font-size:11px;color:var(--txt3);font-family:var(--display)">${_obStep + 1} of ${total}</div>
  </div>`;

  document.getElementById('ob-body').innerHTML = html;
}

function selectOb(field, value) {
  STATE.user[field] = value;
  renderObStep();
}

function obBack() {
  if (_obStep > 0) { _obStep--; renderObStep(); }
}

function obNext() {
  const step = OB_STEPS[_obStep];
  if (step.type === 'text') {
    const val = document.getElementById('ob-inp')?.value?.trim();
    if (!val || val.length < 2) { showToast('Please enter your name 👋'); return; }
    STATE.user[step.field] = val;
  } else {
    if (!STATE.user[step.field]) { showToast('Please select an option'); return; }
  }
  _obStep++;
  if (_obStep >= OB_STEPS.length) finishOnboarding();
  else renderObStep();
}

function finishOnboarding() {
  STATE.user.onboarded = true;
  STATE.user.joinDate = new Date().toISOString();
  STATE.dailyStreak = 1;
  STATE.lastActive = new Date().toDateString();
  addXP(100);
  saveState();
  document.getElementById('onboarding').style.display = 'none';
  navigate('home');
  setTimeout(() => {
    showToast(`🎉 Welcome, ${STATE.user.name}! You earned 100 XP for joining.`, 4000);
    setTimeout(startTour, 1200);
  }, 600);
}

// ── APP TOUR ──
const TOUR_STEPS = [
  {target:'ni-home',    title:'Home Dashboard',   text:'Your personalized hub. Live prices, session clock, smart insights, and daily progress — all here.'},
  {target:'ni-learn',   title:'Trading Academy',   text:'40+ lessons from zero to advanced. Complete the curriculum in order for the best learning experience.'},
  {target:'ni-trade',   title:'Practice Trading',  text:'Simulate real trades with $10,000 virtual money. Real live prices, zero real risk.'},
  {target:'ni-journal', title:'Trade Journal',     text:'Log every trade with emotions and outcomes. This habit separates profitable traders from the rest.'},
  {target:'ni-mentor',  title:'AI Mentor',         text:'Your 24/7 trading coach. Ask anything — concepts, strategies, psychology, calculations. It knows everything.'},
  {target:'ni-profile', title:'Your Profile',      text:'Track XP, achievements, level up, and customize your app experience.'},
];

let _tourStep = 0, _tourHighlight = null, _tourTooltip = null;

function startTour() {
  if (STATE.user.toured) return;
  _tourStep = 0;
  renderTourStep();
}

function renderTourStep() {
  cleanupTour();
  if (_tourStep >= TOUR_STEPS.length) { endTour(); return; }
  const step = TOUR_STEPS[_tourStep];
  const target = document.getElementById(step.target);
  if (!target) { _tourStep++; renderTourStep(); return; }

  const rect = target.getBoundingClientRect();
  _tourHighlight = document.createElement('div');
  _tourHighlight.className = 'tour-highlight';
  _tourHighlight.style.cssText = `top:${rect.top-4}px;left:${rect.left-4}px;width:${rect.width+8}px;height:${rect.height+8}px`;
  document.body.appendChild(_tourHighlight);

  _tourTooltip = document.createElement('div');
  _tourTooltip.className = 'tour-tooltip';
  const tipTop = rect.top - 130;
  const tipLeft = Math.min(Math.max(rect.left - 20, 8), window.innerWidth - 294);
  _tourTooltip.style.cssText = `top:${Math.max(tipTop, 12)}px;left:${tipLeft}px;width:280px`;
  _tourTooltip.innerHTML = `
    <div style="font-size:10px;color:var(--txt3);font-family:var(--display);letter-spacing:1px;margin-bottom:6px">${_tourStep+1} of ${TOUR_STEPS.length}</div>
    <div style="font-family:var(--display);font-weight:700;font-size:15px;margin-bottom:6px;color:var(--txt)">${step.title}</div>
    <div style="font-size:13px;color:var(--txt2);line-height:1.55;margin-bottom:12px">${step.text}</div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-outline btn-sm" onclick="endTour()">Skip</button>
      <button class="btn btn-gold btn-sm" onclick="nextTourStep()">${_tourStep === TOUR_STEPS.length - 1 ? 'Done ✓' : 'Next →'}</button>
    </div>`;
  document.body.appendChild(_tourTooltip);
}

function nextTourStep() { _tourStep++; renderTourStep(); }

function cleanupTour() {
  if (_tourHighlight) _tourHighlight.remove();
  if (_tourTooltip)   _tourTooltip.remove();
  _tourHighlight = _tourTooltip = null;
}

function endTour() {
  cleanupTour();
  STATE.user.toured = true;
  saveState();
  showToast('Tour complete! Explore freely. 🎓');
}

// ── PWA INSTALL PROMPT ──
let _deferredInstall = null;

function checkInstallPrompt() {
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    _deferredInstall = e;
    setTimeout(() => showInstallBanner(), 5000);
  });
  window.addEventListener('appinstalled', () => {
    const banner = document.getElementById('install-banner');
    if (banner) banner.style.display = 'none';
    showToast('📱 TradeBaby Pro installed successfully!');
  });
}

function showInstallBanner() {
  const banner = document.getElementById('install-banner');
  if (banner && _deferredInstall) banner.style.display = 'flex';
}

document.getElementById('install-btn')?.addEventListener('click', async () => {
  if (!_deferredInstall) return;
  _deferredInstall.prompt();
  const { outcome } = await _deferredInstall.userChoice;
  if (outcome === 'accepted') showToast('Installing TradeBaby Pro...');
  _deferredInstall = null;
  document.getElementById('install-banner').style.display = 'none';
});

// ── SERVICE WORKER ──
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log('✅ TradeBaby SW registered'))
    .catch(e => console.log('SW reg failed:', e));
}

// ── BOOT ──
document.addEventListener('DOMContentLoaded', bootApp);

// Prevent double-tap zoom
let _lastTap = 0;
document.addEventListener('touchend', e => {
  const now = Date.now();
  if (now - _lastTap < 280) e.preventDefault();
  _lastTap = now;
}, { passive: false });

console.log('🚀 TradeBaby Pro v4 by SayMy Tech — loaded');
