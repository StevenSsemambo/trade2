/* ═══ PROFILE SCREEN ═══ */

function renderProfile() {
  const wins = STATE.simTrades.filter(t => t.pnl > 0).length;
  const totalPnl = STATE.simTrades.reduce((a, t) => a + (t.pnl || 0), 0);
  const winRate = STATE.simTrades.length > 0 ? Math.round(wins / STATE.simTrades.length * 100) : 0;
  const xpPct = Math.round(STATE.user.xp / STATE.user.xpNext * 100);

  const BADGES = [
    {id:'first-lesson',   emoji:'📚', name:'First Step'},
    {id:'five-lessons',   emoji:'🎯', name:'Getting Going'},
    {id:'ten-lessons',    emoji:'💪', name:'Committed'},
    {id:'twenty-lessons', emoji:'🔥', name:'On Fire'},
    {id:'all-lessons',    emoji:'🏆', name:'Graduate'},
    {id:'first-trade',    emoji:'📈', name:'First Trade'},
    {id:'ten-trades',     emoji:'💼', name:'Active Trader'},
    {id:'first-journal',  emoji:'📓', name:'First Entry'},
    {id:'ten-journal',    emoji:'✍️', name:'Chronicler'},
    {id:'streak-3',       emoji:'🔥', name:'3-Day Streak'},
    {id:'streak-7',       emoji:'⚡', name:'Week Streak'},
    {id:'streak-30',      emoji:'🌟', name:'Month Legend'},
    {id:'level-5',        emoji:'⭐', name:'Rising Star'},
    {id:'level-10',       emoji:'💫', name:'Pro Trader'},
    {id:'profitable',     emoji:'💰', name:'In Profit'},
    {id:'flashcard-20',   emoji:'🃏', name:'Card Shark'},
    {id:'pattern-10',     emoji:'🔍', name:'Pattern Spotter'},
    {id:'pattern-50',     emoji:'🎯', name:'Pattern Master'},
  ];

  const earnedCount = BADGES.filter(b => STATE.achievements.includes(b.id)).length;

  return `<div class="screen-pad">
    <div class="a-fadeup" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
      <h1 class="pg-title">My Profile</h1>
      <div style="display:flex;gap:6px">
        <button class="btn btn-ghost btn-sm" onclick="navigate('analytics')">📊 Stats</button>
        <button class="btn-icon" onclick="navigate('settings')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg></button>
      </div>
    </div>

    <!-- Profile card -->
    <div class="card card-gold a-fadeup2" style="padding:20px;margin-bottom:14px;text-align:center;position:relative;overflow:hidden">
      <div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 0%,rgba(201,168,76,.12),transparent 70%);pointer-events:none"></div>
      <div style="width:76px;height:76px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--gold-d));display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:32px;font-family:var(--display);font-weight:800;color:#0A0A0F;box-shadow:0 4px 20px var(--gold-glow)">
        ${(STATE.user.name || 'T').charAt(0).toUpperCase()}
      </div>
      <div style="font-family:var(--display);font-weight:800;font-size:22px">${STATE.user.name || 'Trader'}</div>
      <div style="color:var(--gold);font-size:13px;margin-top:3px;font-family:var(--display)">Level ${STATE.user.level} Trader</div>
      ${STATE.user.goal ? `<div style="font-size:11px;color:var(--txt3);margin-top:4px">Goal: ${STATE.user.goal.replace(/-/g,' ')}</div>` : ''}
      <div style="display:flex;justify-content:center;gap:20px;margin-top:14px;padding-top:14px;border-top:1px solid var(--bdr2)">
        <div><div style="font-family:var(--display);font-weight:800;font-size:20px;color:var(--gold)">${STATE.dailyStreak}🔥</div><div style="font-size:10px;color:var(--txt3);font-family:var(--display)">STREAK</div></div>
        <div style="width:1px;background:var(--bdr2)"></div>
        <div><div style="font-family:var(--display);font-weight:800;font-size:20px;color:var(--gold)">${completedCount()}</div><div style="font-size:10px;color:var(--txt3);font-family:var(--display)">LESSONS</div></div>
        <div style="width:1px;background:var(--bdr2)"></div>
        <div><div style="font-family:var(--display);font-weight:800;font-size:20px;color:var(--gold)">${STATE.user.xp}</div><div style="font-size:10px;color:var(--txt3);font-family:var(--display)">XP</div></div>
      </div>
    </div>

    <!-- XP bar -->
    <div class="xp-wrap a-fadeup3" style="margin-bottom:14px">
      <div class="xp-row">
        <div class="xp-level">Level ${STATE.user.level}</div>
        <div class="xp-pts">${STATE.user.xp} / ${STATE.user.xpNext} XP</div>
      </div>
      <div class="prog-bar lg"><div class="prog-fill" style="width:${xpPct}%"></div></div>
      <div style="font-size:11px;color:var(--txt3);margin-top:5px">${STATE.user.xpNext - STATE.user.xp} XP to Level ${STATE.user.level + 1}</div>
    </div>

    <!-- Sim stats -->
    <div class="a-fadeup3" style="margin-bottom:14px">
      <div class="section-lbl">Simulation Account</div>
      <div class="stat-grid">
        <div class="stat-box"><div class="stat-val" style="color:${totalPnl>=0?'var(--green)':'var(--red)'}">${totalPnl>=0?'+':''}$${Math.abs(totalPnl).toFixed(0)}</div><div class="stat-lbl">Net P&L</div></div>
        <div class="stat-box"><div class="stat-val">${winRate}%</div><div class="stat-lbl">Win Rate</div></div>
        <div class="stat-box"><div class="stat-val">${STATE.simTrades.length}</div><div class="stat-lbl">Trades</div></div>
        <div class="stat-box"><div class="stat-val">${fmtCurrency(STATE.simEquity).replace('$','')}</div><div class="stat-lbl">Equity</div></div>
      </div>
    </div>

    <!-- Streak Calendar -->
    <div class="a-fadeup4" style="margin-bottom:14px">
      <div class="section-lbl">Activity (Last 28 Days)</div>
      <div class="card" style="padding:12px">
        <div class="streak-grid">
          ${Array.from({length:28},(_,i)=>{
            const isToday=i===27;
            const active=isToday||Math.random()>.45;
            return `<div class="streak-day ${isToday?'today':active?'active':''}"></div>`;
          }).join('')}
        </div>
        <div style="font-size:10px;color:var(--txt3);margin-top:8px">
          <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:var(--gold);vertical-align:middle;margin-right:4px"></span>Today
          &nbsp;
          <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:rgba(34,197,94,.6);vertical-align:middle;margin-right:4px"></span>Active
        </div>
      </div>
    </div>

    <!-- Achievements -->
    <div class="a-fadeup5">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <div class="section-lbl" style="margin-bottom:0">Achievements</div>
        <span style="font-size:12px;color:var(--txt2)">${earnedCount}/${BADGES.length} earned</span>
      </div>
      <div class="badge-grid">
        ${BADGES.map(b => {
          const earned = STATE.achievements.includes(b.id);
          return `<div class="badge ${earned?'earned':'locked'}" onclick="showToast('${earned?'🏅':'🔒'} ${b.name}')">
            <div class="badge-icon">${b.emoji}</div>
            <div class="badge-name">${b.name}</div>
          </div>`;
        }).join('')}
      </div>
    </div>

    <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--bdr2)">
      <button class="btn btn-danger btn-sm" onclick="if(confirm('Reset sim to $10,000?')){STATE.simBalance=10000;STATE.simEquity=10000;STATE.simTrades=[];saveState();showToast('🔄 Sim reset');navigate('profile')}">Reset Sim Account</button>
    </div>
  </div>`;
}

/* ═══ ANALYTICS ═══ */
function renderAnalytics() {
  return `<div class="screen-pad">
    <div class="pg-header a-fadeup" style="padding:0 0 14px">
      <div style="display:flex;gap:10px;align-items:center">
        <button class="back-btn" onclick="navigate('profile')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>
        <h1 class="pg-title">Analytics</h1>
      </div>
    </div>

    <div class="section-lbl a-fadeup2">Equity Curve</div>
    <div class="equity-wrap a-fadeup2" style="height:160px;margin-bottom:14px">
      <canvas id="equity-chart" style="width:100%;height:160px"></canvas>
    </div>

    ${renderAnalyticsSummary()}

    <div class="section-lbl a-fadeup4" style="margin-top:16px">Course Progress</div>
    <div class="card a-fadeup4" style="padding:14px;margin-bottom:12px">
      ${CURRICULUM.map(cat => {
        const done = cat.lessons.filter(l => STATE.progress[l.id]).length;
        const pct = Math.round(done / cat.lessons.length * 100);
        return `<div style="margin-bottom:10px">
          <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px">
            <span>${cat.emoji} ${cat.title}</span>
            <span style="color:var(--gold);font-family:var(--mono)">${done}/${cat.lessons.length}</span>
          </div>
          <div class="prog-bar"><div class="prog-fill" style="width:${pct}%"></div></div>
        </div>`;
      }).join('')}
    </div>

    <div class="section-lbl a-fadeup5">Activity</div>
    <div class="stat-grid a-fadeup5">
      <div class="stat-box"><div class="stat-val">${STATE.dailyStreak}🔥</div><div class="stat-lbl">Streak</div></div>
      <div class="stat-box"><div class="stat-val">${STATE.user.level}</div><div class="stat-lbl">Level</div></div>
      <div class="stat-box"><div class="stat-val">${STATE.user.xp}</div><div class="stat-lbl">XP</div></div>
      <div class="stat-box"><div class="stat-val">${STATE.journal.length}</div><div class="stat-lbl">Journal</div></div>
    </div>
  </div>`;
}

function renderAnalyticsSummary() {
  const trades = STATE.simTrades;
  if (!trades.length) return `<div class="card a-fadeup3" style="padding:14px;text-align:center;color:var(--txt3);margin-bottom:12px">Complete sim trades to see analytics</div>`;
  const wins = trades.filter(t => t.pnl > 0);
  const losses = trades.filter(t => t.pnl <= 0);
  const totalPnl = trades.reduce((a, t) => a + t.pnl, 0);
  const wr = Math.round(wins.length / trades.length * 100);
  const avgW = wins.length ? wins.reduce((a,t)=>a+t.pnl,0)/wins.length : 0;
  const avgL = losses.length ? Math.abs(losses.reduce((a,t)=>a+t.pnl,0)/losses.length) : 0;
  const pf = avgL > 0 ? ((avgW*wins.length)/(avgL*losses.length)).toFixed(2) : '∞';
  return `<div class="stat-grid a-fadeup3" style="margin-bottom:12px">
    <div class="stat-box"><div class="stat-val" style="color:${totalPnl>=0?'var(--green)':'var(--red)'}">${totalPnl>=0?'+':''}$${Math.abs(totalPnl).toFixed(0)}</div><div class="stat-lbl">Total P&L</div></div>
    <div class="stat-box"><div class="stat-val">${wr}%</div><div class="stat-lbl">Win Rate</div></div>
    <div class="stat-box"><div class="stat-val">${trades.length}</div><div class="stat-lbl">Trades</div></div>
    <div class="stat-box"><div class="stat-val" style="color:${parseFloat(pf)>=1?'var(--green)':'var(--red)'}">${pf}</div><div class="stat-lbl">P Factor</div></div>
  </div>`;
}

function initEquityChart() {
  const canvas = document.getElementById('equity-chart');
  if (!canvas) return;
  canvas.width = canvas.offsetWidth || 340;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');
  let eq = [10000];
  STATE.simTrades.forEach(t => eq.push(eq[eq.length-1] + t.pnl));
  const w = canvas.width, h = canvas.height;
  const minE = Math.min(...eq) * .996, maxE = Math.max(...eq) * 1.004;
  const range = maxE - minE || 1;
  const sy = v => h - ((v-minE)/range)*(h-20) - 10;
  const sx = i => (i/Math.max(eq.length-1,1))*w;
  ctx.clearRect(0,0,w,h);
  const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg3').trim() || '#18181F';
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  if (eq.length < 2) {
    ctx.fillStyle='#5A5855'; ctx.font='12px sans-serif'; ctx.textAlign='center';
    ctx.fillText('Make sim trades to see equity curve', w/2, h/2); return;
  }
  const color = eq[eq.length-1] >= 10000 ? '#22C55E' : '#EF4444';
  ctx.beginPath(); ctx.moveTo(sx(0), sy(eq[0]));
  eq.forEach((v,i) => ctx.lineTo(sx(i), sy(v)));
  ctx.lineTo(w,h); ctx.lineTo(0,h); ctx.closePath();
  const grad = ctx.createLinearGradient(0,0,0,h);
  grad.addColorStop(0, color+'44'); grad.addColorStop(1, color+'00');
  ctx.fillStyle=grad; ctx.fill();
  ctx.beginPath(); ctx.moveTo(sx(0), sy(eq[0]));
  eq.forEach((v,i) => ctx.lineTo(sx(i), sy(v)));
  ctx.strokeStyle=color; ctx.lineWidth=2.5; ctx.stroke();
  ctx.fillStyle='#C9A84C'; ctx.font='bold 10px monospace'; ctx.textAlign='right';
  ctx.fillText('$'+eq[eq.length-1].toFixed(0), w-4, sy(eq[eq.length-1])-4);
}

/* ═══ CALCULATOR ═══ */
let _calcTab = 'position';

function renderCalculator() {
  return `<div class="screen-pad">
    <div class="pg-header a-fadeup" style="padding:0 0 12px">
      <div style="display:flex;gap:10px;align-items:center">
        <button class="back-btn" onclick="navigate('trade')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>
        <h1 class="pg-title">Calculator</h1>
      </div>
    </div>
    <div class="tab-bar a-fadeup2">
      ${['position','pip','profit'].map(t => `<div class="tab-btn ${_calcTab===t?'active':''}" onclick="_calcTab='${t}';document.getElementById('calc-body').innerHTML=renderCalcBody()">${t.charAt(0).toUpperCase()+t.slice(1)}</div>`).join('')}
    </div>
    <div id="calc-body" class="a-fadeup3">${renderCalcBody()}</div>
  </div>`;
}

function renderCalcBody() {
  if (_calcTab === 'pip') return `
    <div class="section-lbl">Pip Value Calculator</div>
    <p style="font-size:12px;color:var(--txt2);margin-bottom:12px">Calculate the dollar value of each pip movement</p>
    <div class="inp-wrap"><label class="inp-label">Lot Size</label><input class="inp" id="pv-lots" type="number" value="0.10" step="0.01"></div>
    <div class="inp-wrap"><label class="inp-label">Pair Type</label>
      <select class="inp" id="pv-pair">
        <option value="usd-quote">USD-quoted (EUR/USD, GBP/USD, AUD/USD)</option>
        <option value="jpy">JPY pairs (USD/JPY, EUR/JPY, GBP/JPY)</option>
        <option value="usd-base">USD-base (USD/CHF, USD/CAD)</option>
        <option value="gold">Gold (XAU/USD)</option>
      </select>
    </div>
    <div class="inp-wrap"><label class="inp-label">Current Exchange Rate</label><input class="inp" id="pv-rate" type="number" value="1.0850" step="0.0001"></div>
    <button class="btn btn-gold" onclick="calcPipValue()">Calculate Pip Value</button>
    <div id="pv-result" style="margin-top:12px"></div>`;

  if (_calcTab === 'profit') return `
    <div class="section-lbl">Profit / Loss Calculator</div>
    <div class="inp-wrap"><label class="inp-label">Direction</label>
      <select class="inp" id="pl-dir"><option value="1">BUY (Long)</option><option value="-1">SELL (Short)</option></select>
    </div>
    <div class="inp-row">
      <div class="inp-wrap"><label class="inp-label">Lot Size</label><input class="inp" id="pl-lots" type="number" value="0.10" step="0.01"></div>
      <div class="inp-wrap"><label class="inp-label">Pip Value ($/pip)</label><input class="inp" id="pl-pv" type="number" value="0.10" step="0.01"></div>
    </div>
    <div class="inp-row">
      <div class="inp-wrap"><label class="inp-label">Entry Price</label><input class="inp" id="pl-entry" type="number" value="1.0800" step="0.0001"></div>
      <div class="inp-wrap"><label class="inp-label">Exit Price</label><input class="inp" id="pl-exit" type="number" value="1.0860" step="0.0001"></div>
    </div>
    <button class="btn btn-gold" onclick="calcProfitLoss()">Calculate P&L</button>
    <div id="pl-result" style="margin-top:12px"></div>`;

  return `
    <div class="section-lbl">Position Size Calculator</div>
    <p style="font-size:12px;color:var(--txt2);margin-bottom:12px">Find the exact lot size for your account and risk tolerance</p>
    <div class="inp-row">
      <div class="inp-wrap"><label class="inp-label">Account Balance ($)</label><input class="inp" id="c-bal" type="number" value="10000"></div>
      <div class="inp-wrap"><label class="inp-label">Risk Percentage (%)</label><input class="inp" id="c-risk" type="number" value="1" step="0.5" min="0.1" max="10"></div>
    </div>
    <div class="inp-row">
      <div class="inp-wrap"><label class="inp-label">Stop Loss (pips)</label><input class="inp" id="c-sl" type="number" value="30"></div>
      <div class="inp-wrap"><label class="inp-label">Pip Value Type</label>
        <select class="inp" id="c-pv">
          <option value="10">Majors (std lot $10/pip)</option>
          <option value="6.67">JPY pairs (std lot $6.67)</option>
          <option value="1">Mini lot ($1/pip)</option>
          <option value="0.10">Micro lot ($0.10/pip)</option>
        </select>
      </div>
    </div>
    <button class="btn btn-gold" onclick="calcPositionSize()">Calculate Position Size</button>
    <div id="c-result" style="margin-top:12px"></div>`;
}

function calcPositionSize() {
  const bal = parseFloat(document.getElementById('c-bal').value) || 10000;
  const risk = parseFloat(document.getElementById('c-risk').value) || 1;
  const sl = parseFloat(document.getElementById('c-sl').value) || 30;
  const pv = parseFloat(document.getElementById('c-pv').value) || 10;
  const riskAmt = bal * (risk / 100);
  const lots = riskAmt / (sl * pv);
  const rr2 = (riskAmt * 2).toFixed(2);
  const rr3 = (riskAmt * 3).toFixed(2);
  document.getElementById('c-result').innerHTML = `
    <div class="card card-gold" style="padding:14px">
      <div class="section-lbl">Result</div>
      <div class="stat-grid3" style="margin-bottom:10px">
        <div class="calc-res"><div class="calc-res-val">${lots.toFixed(2)}</div><div class="calc-res-lbl">Lot Size</div></div>
        <div class="calc-res"><div class="calc-res-val">$${riskAmt.toFixed(2)}</div><div class="calc-res-lbl">Max Risk</div></div>
        <div class="calc-res"><div class="calc-res-val">${risk}%</div><div class="calc-res-lbl">Account %</div></div>
      </div>
      <div style="font-size:12px;color:var(--txt2)">
        At 1:2 R:R → target profit: <strong style="color:var(--green)">$${rr2}</strong><br>
        At 1:3 R:R → target profit: <strong style="color:var(--green)">$${rr3}</strong>
      </div>
    </div>`;
}

function calcPipValue() {
  const lots = parseFloat(document.getElementById('pv-lots').value) || 0.1;
  const pair = document.getElementById('pv-pair').value;
  const rate = parseFloat(document.getElementById('pv-rate').value) || 1.085;
  const units = lots * 100000;
  let pv;
  if (pair === 'usd-quote') pv = units * 0.0001;
  else if (pair === 'jpy') pv = (units * 0.01) / rate;
  else if (pair === 'gold') pv = units * 0.01;
  else pv = (units * 0.0001) / rate;
  document.getElementById('pv-result').innerHTML = `
    <div class="card card-gold" style="padding:14px">
      <div class="inp-row">
        <div class="calc-res"><div class="calc-res-val">$${pv.toFixed(2)}</div><div class="calc-res-lbl">Per 1 Pip</div></div>
        <div class="calc-res"><div class="calc-res-val">$${(pv*10).toFixed(2)}</div><div class="calc-res-lbl">Per 10 Pips</div></div>
        <div class="calc-res"><div class="calc-res-val">$${(pv*50).toFixed(2)}</div><div class="calc-res-lbl">Per 50 Pips</div></div>
        <div class="calc-res"><div class="calc-res-val">$${(pv*100).toFixed(2)}</div><div class="calc-res-lbl">Per 100 Pips</div></div>
      </div>
    </div>`;
}

function calcProfitLoss() {
  const dir = parseInt(document.getElementById('pl-dir').value);
  const entry = parseFloat(document.getElementById('pl-entry').value) || 1.08;
  const exit = parseFloat(document.getElementById('pl-exit').value) || 1.086;
  const pv = parseFloat(document.getElementById('pl-pv').value) || 0.1;
  const lots = parseFloat(document.getElementById('pl-lots').value) || 0.1;
  const pips = Math.abs(exit - entry) / 0.0001;
  const pnl = dir * (exit - entry) * lots * 100000 * pv / 10;
  const up = pnl >= 0;
  document.getElementById('pl-result').innerHTML = `
    <div class="card ${up?'card-green':'card-red'}" style="padding:14px;text-align:center">
      <div style="font-family:var(--display);font-weight:800;font-size:28px;color:${up?'var(--green)':'var(--red)'}">${up?'+':''}$${Math.abs(pnl).toFixed(2)}</div>
      <div style="font-size:13px;color:var(--txt2);margin-top:4px">${pips.toFixed(1)} pips · ${up?'PROFIT':'LOSS'}</div>
    </div>`;
}

/* ═══ SETTINGS ═══ */
function renderSettings() {
  const themes = [
    {key:'dark',    label:'🌙 Dark Gold',  desc:'Default'},
    {key:'light',   label:'☀️ Light',      desc:'Clean mode'},
    {key:'slate',   label:'🔷 Slate',      desc:'Blue-gray'},
    {key:'matrix',  label:'💚 Matrix',     desc:'Green dark'},
    {key:'ocean',   label:'🌊 Ocean',      desc:'Deep blue'},
    {key:'crimson', label:'🔴 Crimson',    desc:'Red accent'},
    {key:'forest',  label:'🌿 Forest',     desc:'Nature green'},
  ];

  return `<div class="screen-pad">
    <div class="pg-header a-fadeup" style="padding:0 0 14px">
      <div style="display:flex;gap:10px;align-items:center">
        <button class="back-btn" onclick="navigate('profile')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>
        <h1 class="pg-title">Settings</h1>
      </div>
    </div>

    <!-- Theme -->
    <div class="section-lbl a-fadeup2">App Theme</div>
    <div class="card a-fadeup2" style="padding:12px;margin-bottom:14px">
      <div class="theme-grid">
        ${themes.map(t => `
          <div class="theme-opt ${STATE.user.theme === t.key ? 'active' : ''}" onclick="applyTheme('${t.key}');saveState();renderScreen('settings')">
            <div class="theme-opt-label">${t.label}</div>
            <div class="theme-opt-desc">${t.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Brightness -->
    <div class="section-lbl a-fadeup3">Display</div>
    <div class="card a-fadeup3" style="padding:14px;margin-bottom:14px">
      <div style="margin-bottom:12px">
        <div style="font-size:13px;font-weight:600;font-family:var(--display);margin-bottom:8px">Brightness</div>
        <div class="slider-wrap">
          <span style="font-size:14px">🌑</span>
          <input type="range" min="30" max="120" value="${STATE.user.brightness || 100}" 
            oninput="applyBrightness(this.value);document.getElementById('bright-val').textContent=this.value+'%'">
          <span style="font-size:14px">☀️</span>
          <span class="slider-label" id="bright-val">${STATE.user.brightness || 100}%</span>
        </div>
      </div>
      <div>
        <div style="font-size:13px;font-weight:600;font-family:var(--display);margin-bottom:8px">Text Size</div>
        <div style="display:flex;gap:8px">
          ${['small','medium','large'].map(s => `
            <div onclick="applyFontSize('${s}');saveState();renderScreen('settings')" style="flex:1;padding:10px;border-radius:var(--rs);border:2px solid ${STATE.user.fontSize===s?'var(--gold)':'var(--bdr2)'};cursor:pointer;text-align:center;font-size:${s==='small'?'12px':s==='large'?'16px':'14px'};background:${STATE.user.fontSize===s?'var(--gold-bg)':'var(--bg4)'};font-family:var(--display);font-weight:600;transition:all .15s">
              ${s.charAt(0).toUpperCase()+s.slice(1)}
            </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Notifications -->
    <div class="section-lbl a-fadeup4">Notifications</div>
    <div class="card a-fadeup4" style="padding:14px;margin-bottom:14px">
      ${STATE.user.notificationsEnabled ? `
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
          <span style="font-size:20px">✅</span>
          <div style="flex:1;font-size:13px;color:var(--txt2)">Push notifications are <strong style="color:var(--green)">enabled</strong></div>
          <button class="btn btn-ghost btn-xs" onclick="disableNotifications()">Disable</button>
        </div>
      ` : `
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
          <span style="font-size:20px">🔔</span>
          <div style="flex:1">
            <div style="font-size:13px;font-weight:600">Enable Notifications</div>
            <div style="font-size:11px;color:var(--txt2)">Daily reminders, session alerts, achievements</div>
          </div>
          <button class="btn btn-gold btn-sm" onclick="requestNotificationPermission()">Enable</button>
        </div>
      `}
      <div style="font-size:12px;color:var(--txt3)">
        You'll receive: morning reminders, London/NY session alerts, weekly review prompts, and achievement notifications.
      </div>
    </div>

    <!-- Account -->
    <div class="section-lbl a-fadeup5">Account</div>
    <div class="card a-fadeup5" style="padding:14px;margin-bottom:14px">
      <div class="inp-wrap">
        <label class="inp-label">Display Name</label>
        <input class="inp" id="s-name" value="${STATE.user.name}">
      </div>
      <button class="btn btn-gold btn-sm" onclick="const n=document.getElementById('s-name').value.trim();if(n){STATE.user.name=n;saveState();showToast('✅ Name saved!')}">Save Name</button>
    </div>

    <!-- About -->
    <div class="section-lbl a-fadeup5">About TradeBaby Pro</div>
    <div class="card a-fadeup5" style="padding:14px;margin-bottom:14px">
      <div style="display:flex;flex-direction:column;gap:8px;font-size:13px">
        <div style="display:flex;justify-content:space-between"><span style="color:var(--txt2)">Version</span><strong>4.0.0</strong></div>
        <div style="display:flex;justify-content:space-between"><span style="color:var(--txt2)">Developer</span><strong>SayMy Tech</strong></div>
        <div style="display:flex;justify-content:space-between"><span style="color:var(--txt2)">Lessons</span><span>${totalLessons()} available</span></div>
        <div style="display:flex;justify-content:space-between"><span style="color:var(--txt2)">Strategies</span><span>${STRATEGIES.length} strategies</span></div>
        <div style="display:flex;justify-content:space-between"><span style="color:var(--txt2)">Flashcards</span><span>${FLASHCARDS.length} cards</span></div>
        <div style="display:flex;justify-content:space-between"><span style="color:var(--txt2)">Offline</span><span style="color:var(--green)">✅ Full PWA</span></div>
        <div style="display:flex;justify-content:space-between"><span style="color:var(--txt2)">Your Level</span><span style="color:var(--gold)">Level ${STATE.user.level} (${STATE.user.xp} XP)</span></div>
      </div>
    </div>

    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px">
      <button class="btn btn-ghost btn-sm" onclick="STATE.user.toured=false;saveState();showToast('Tour restarted!')">🗺️ Restart Tour</button>
      <button class="btn btn-ghost btn-sm" onclick="exportUserData()">📤 Export Data</button>
      <button class="btn btn-danger btn-sm" onclick="if(confirm('Reset ALL data?')){localStorage.removeItem('tb4');location.reload()}">🗑️ Reset All</button>
    </div>
  </div>`;
}

function exportUserData() {
  const data = JSON.stringify({
    exportDate: new Date().toISOString(),
    user: STATE.user, progress: STATE.progress, journal: STATE.journal,
    simTrades: STATE.simTrades, achievements: STATE.achievements
  }, null, 2);
  const blob = new Blob([data], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `tradebaby-backup-${new Date().toISOString().slice(0,10)}.json`;
  a.click(); URL.revokeObjectURL(url);
  showToast('📤 Data exported!');
}
