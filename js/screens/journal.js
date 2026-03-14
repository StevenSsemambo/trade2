/* ═══════════════════════════════════════════
   JOURNAL SCREEN
   ═══════════════════════════════════════════ */

let _journalView = 'list';

function renderJournal() {
  return `<div class="screen-pad">
    <div class="pg-header a-fadeup" style="padding:0 0 12px">
      <h1 class="pg-title">Trade Journal</h1>
      <button class="btn btn-gold btn-sm" onclick="_journalView='add';renderJournalBody()">+ Log Trade</button>
    </div>

    <div class="tab-bar a-fadeup2">
      <div class="tab-btn ${_journalView === 'list'  ? 'active' : ''}" onclick="_journalView='list';renderJournalBody()">Entries</div>
      <div class="tab-btn ${_journalView === 'stats' ? 'active' : ''}" onclick="_journalView='stats';renderJournalBody()">Stats</div>
      <div class="tab-btn ${_journalView === 'add'   ? 'active' : ''}" onclick="_journalView='add';renderJournalBody()">+ New</div>
    </div>

    <div id="journal-body" class="a-fadeup3">${journalBodyHTML()}</div>
  </div>`;
}

function renderJournalBody() {
  const el = document.getElementById('journal-body');
  if (el) el.innerHTML = journalBodyHTML();
}

function journalBodyHTML() {
  if (_journalView === 'stats') return renderJournalStats();
  if (_journalView === 'add')   return renderJournalForm();
  return renderJournalList();
}

function renderJournalList() {
  if (!STATE.journal.length) {
    return `<div style="text-align:center;padding:50px 0;color:var(--txt3)">
      <div style="font-size:52px;margin-bottom:12px">📓</div>
      <div style="font-family:var(--display);font-weight:700;font-size:16px;color:var(--txt2);margin-bottom:8px">No trades logged yet</div>
      <div style="font-size:13px;margin-bottom:20px">Journaling is the #1 habit of profitable traders</div>
      <button class="btn btn-gold" style="width:auto;padding:12px 24px" onclick="_journalView='add';renderJournalBody()">Log Your First Trade</button>
    </div>`;
  }

  return STATE.journal.slice().reverse().map((t, i) => {
    const pnl = parseFloat(t.pnl) || 0;
    const cls = pnl > 0 ? 'win' : pnl < 0 ? 'loss' : 'be';
    const idx = STATE.journal.length - 1 - i;
    return `<div class="j-entry ${cls}" onclick="viewJournalEntry(${idx})">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div>
          <div style="font-size:11px;color:var(--txt3);font-family:var(--mono);margin-bottom:4px">${fmtDate(t.date)}</div>
          <div style="display:flex;align-items:center;gap:6px">
            <strong style="font-family:var(--display);font-size:15px">${t.pair}</strong>
            <span class="pill ${t.direction === 'BUY' ? 'pill-green' : 'pill-red'}" style="font-size:9px">${t.direction}</span>
            ${t.setup ? `<span class="pill pill-blue" style="font-size:9px">${t.setup}</span>` : ''}
          </div>
          <div style="font-size:11px;color:var(--txt3);margin-top:3px">${t.tf || ''} &nbsp;${t.lots ? t.lots+' lots' : ''}</div>
        </div>
        <div style="text-align:right">
          <div class="t-mono" style="font-size:17px;font-weight:600;color:${pnl >= 0 ? 'var(--green)' : 'var(--red)'}">
            ${pnl >= 0 ? '+' : ''}${fmtCurrency(pnl)}
          </div>
          <div style="font-size:10px;color:var(--txt3);margin-top:2px">${t.plan === 'yes' ? '✅ Plan followed' : t.plan === 'no' ? '❌ Deviated' : ''}</div>
        </div>
      </div>
      ${t.notes ? `<div style="font-size:12px;color:var(--txt2);margin-top:8px;padding-top:8px;border-top:1px solid var(--bdr2);line-height:1.5">${t.notes.substring(0, 90)}${t.notes.length > 90 ? '…' : ''}</div>` : ''}
    </div>`;
  }).join('');
}

function renderJournalStats() {
  const trades = STATE.journal;
  if (!trades.length) return `<div style="text-align:center;padding:40px 0;color:var(--txt3)">Log trades to see statistics</div>`;

  const wins   = trades.filter(t => parseFloat(t.pnl) > 0);
  const losses = trades.filter(t => parseFloat(t.pnl) <= 0);
  const totalPnl = trades.reduce((a, t) => a + (parseFloat(t.pnl) || 0), 0);
  const wr  = Math.round((wins.length / trades.length) * 100);
  const avgW = wins.length   ? wins.reduce((a,t)=>a+(parseFloat(t.pnl)||0),0)/wins.length : 0;
  const avgL = losses.length ? Math.abs(losses.reduce((a,t)=>a+(parseFloat(t.pnl)||0),0)/losses.length) : 0;
  const pf   = avgL > 0 ? ((avgW * wins.length) / (avgL * losses.length)).toFixed(2) : '∞';

  const moodCounts = {};
  trades.forEach(t => { if (t.mood) moodCounts[t.mood] = (moodCounts[t.mood] || 0) + 1; });
  const topMood = Object.entries(moodCounts).sort((a,b)=>b[1]-a[1])[0];

  const byPair = {};
  trades.forEach(t => {
    if (!byPair[t.pair]) byPair[t.pair] = { count: 0, pnl: 0, wins: 0 };
    byPair[t.pair].count++;
    byPair[t.pair].pnl += parseFloat(t.pnl) || 0;
    if (parseFloat(t.pnl) > 0) byPair[t.pair].wins++;
  });

  return `
    <div class="stat-grid" style="margin-bottom:12px">
      <div class="stat-box"><div class="stat-val">${trades.length}</div><div class="stat-lbl">Total Trades</div></div>
      <div class="stat-box"><div class="stat-val">${wr}%</div><div class="stat-lbl">Win Rate</div></div>
      <div class="stat-box"><div class="stat-val" style="color:${totalPnl>=0?'var(--green)':'var(--red)'}">${totalPnl>=0?'+':''}$${Math.abs(totalPnl).toFixed(0)}</div><div class="stat-lbl">Net P&L</div></div>
      <div class="stat-box"><div class="stat-val" style="color:${parseFloat(pf)>=1?'var(--green)':'var(--red)'}">${pf}</div><div class="stat-lbl">Profit Factor</div></div>
    </div>

    <div class="card" style="padding:14px;margin-bottom:12px">
      <div class="section-lbl">Win/Loss Analysis</div>
      <div style="display:flex;gap:3px;height:8px;border-radius:4px;overflow:hidden;margin-bottom:10px">
        <div style="width:${wr}%;background:var(--green);transition:width .6s"></div>
        <div style="flex:1;background:var(--red)"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:12px">
        <span style="color:var(--green)">✓ ${wins.length} wins — avg +$${avgW.toFixed(2)}</span>
        <span style="color:var(--red)">✗ ${losses.length} losses — avg -$${avgL.toFixed(2)}</span>
      </div>
    </div>

    ${Object.keys(byPair).length > 0 ? `
    <div class="card" style="padding:14px;margin-bottom:12px">
      <div class="section-lbl">By Instrument</div>
      ${Object.entries(byPair).sort((a,b) => b[1].pnl - a[1].pnl).map(([pair, d]) => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid var(--bdr2)">
          <div>
            <strong style="font-size:13px">${pair}</strong>
            <span style="font-size:11px;color:var(--txt3);margin-left:6px">${d.count} trades · ${Math.round(d.wins/d.count*100)}% WR</span>
          </div>
          <span class="t-mono" style="color:${d.pnl>=0?'var(--green)':'var(--red)'}">${d.pnl>=0?'+':''}$${d.pnl.toFixed(2)}</span>
        </div>
      `).join('')}
    </div>` : ''}

    ${topMood ? `<div class="card" style="padding:14px;margin-bottom:12px">
      <div class="section-lbl">Emotional Patterns</div>
      <div style="font-size:13px;color:var(--txt2)">Most common mood: <strong style="color:var(--txt)">${topMood[0]}</strong> (${topMood[1]} times)</div>
      ${wr < 50 && moodCounts['revenge'] > 2 ? '<div style="margin-top:8px;font-size:12px;color:var(--red)">⚠️ Revenge trading detected in your journal. Review those entries.</div>' : ''}
    </div>` : ''}

    <div class="card" style="padding:12px;background:var(--gold-bg);border-color:var(--bdr)">
      <div style="font-size:12px;color:var(--txt2)">
        ${wr >= 60 ? '🟢 Win rate above 60% — strong execution' : wr >= 45 ? '🟡 Win rate in acceptable range — focus on R:R' : '🔴 Win rate below 45% — review entry criteria'}
        <br>
        ${parseFloat(pf) >= 1.5 ? '🟢 Excellent profit factor above 1.5' : parseFloat(pf) >= 1 ? '🟡 Profitable but improve exits' : '🔴 Negative expectancy — system review needed'}
      </div>
    </div>
  `;
}

function renderJournalForm() {
  const pairs   = ['EUR/USD','GBP/USD','USD/JPY','AUD/USD','USD/CHF','USD/CAD','GBP/JPY','EUR/JPY','NZD/USD','XAU/USD','BTC/USD','NAS100','Other'];
  const setups  = ['Support Bounce','Resistance Reject','Trend Pullback','Breakout Retest','London Breakout','RSI Divergence','SMC Order Block','Pin Bar','Inside Bar','Scalp','News Trade','Other'];
  const tframes = ['M1','M5','M15','M30','H1','H4','D1','W1'];

  return `
    <div class="section-lbl">Log New Trade</div>

    <div class="inp-row">
      <div class="inp-wrap">
        <label class="inp-label">Pair / Instrument</label>
        <select class="inp" id="j-pair">${pairs.map(p=>`<option>${p}</option>`).join('')}</select>
      </div>
      <div class="inp-wrap">
        <label class="inp-label">Direction</label>
        <select class="inp" id="j-dir">
          <option value="BUY">🟢 BUY (Long)</option>
          <option value="SELL">🔴 SELL (Short)</option>
        </select>
      </div>
    </div>

    <div class="inp-row">
      <div class="inp-wrap">
        <label class="inp-label">Entry Price</label>
        <input class="inp" id="j-entry" type="number" step="0.0001" placeholder="1.0850">
      </div>
      <div class="inp-wrap">
        <label class="inp-label">Exit Price</label>
        <input class="inp" id="j-exit" type="number" step="0.0001" placeholder="1.0910">
      </div>
    </div>

    <div class="inp-row">
      <div class="inp-wrap">
        <label class="inp-label">P&L ($)</label>
        <input class="inp" id="j-pnl" type="number" step="0.01" placeholder="60.00">
      </div>
      <div class="inp-wrap">
        <label class="inp-label">Lot Size</label>
        <input class="inp" id="j-lots" type="number" step="0.01" value="0.10" placeholder="0.10">
      </div>
    </div>

    <div class="inp-row">
      <div class="inp-wrap">
        <label class="inp-label">Setup Type</label>
        <select class="inp" id="j-setup">
          <option value="">-- Select --</option>
          ${setups.map(s=>`<option>${s}</option>`).join('')}
        </select>
      </div>
      <div class="inp-wrap">
        <label class="inp-label">Timeframe</label>
        <select class="inp" id="j-tf">${tframes.map(t=>`<option>${t}</option>`).join('')}</select>
      </div>
    </div>

    <div class="inp-wrap">
      <label class="inp-label">Emotional State</label>
      <select class="inp" id="j-mood">
        <option value="neutral">😐 Calm / Neutral</option>
        <option value="confident">😊 Confident</option>
        <option value="fearful">😰 Fearful / Hesitant</option>
        <option value="greedy">🤑 Greedy / Over-excited</option>
        <option value="frustrated">😤 Frustrated</option>
        <option value="revenge">😠 Revenge trading</option>
      </select>
    </div>

    <div class="inp-wrap">
      <label class="inp-label">Followed Trading Plan?</label>
      <select class="inp" id="j-plan">
        <option value="yes">✅ Yes — followed perfectly</option>
        <option value="mostly">🟡 Mostly followed</option>
        <option value="no">❌ No — deviated from plan</option>
      </select>
    </div>

    <div class="inp-wrap">
      <label class="inp-label">Notes & Observations</label>
      <textarea class="inp" id="j-notes" placeholder="What went well? What could improve? Any patterns you noticed? Key lesson from this trade?"></textarea>
    </div>

    <button class="btn btn-gold" onclick="saveJournalEntry()">Save Journal Entry</button>
    <button class="btn btn-ghost btn-sm" style="margin-top:8px" onclick="_journalView='list';renderJournalBody()">Cancel</button>
  `;
}

function saveJournalEntry() {
  const entry = {
    date: new Date().toISOString(),
    pair: document.getElementById('j-pair').value,
    direction: document.getElementById('j-dir').value,
    entry: document.getElementById('j-entry').value,
    exit: document.getElementById('j-exit').value,
    pnl: document.getElementById('j-pnl').value,
    lots: document.getElementById('j-lots').value,
    setup: document.getElementById('j-setup').value,
    tf: document.getElementById('j-tf').value,
    mood: document.getElementById('j-mood').value,
    plan: document.getElementById('j-plan').value,
    notes: document.getElementById('j-notes').value,
  };

  STATE.journal.push(entry);
  addXP(20);
  saveState();
  _journalView = 'list';
  showToast('📓 Trade logged! +20 XP');
  navigate('journal');
}

function viewJournalEntry(idx) {
  const t = STATE.journal[idx];
  if (!t) return;
  const pnl = parseFloat(t.pnl) || 0;
  showModal(`
    <div class="modal-handle"></div>
    <div style="font-family:var(--display);font-weight:800;font-size:20px;margin-bottom:4px">${t.pair} ${t.direction}</div>
    <div style="font-size:12px;color:var(--txt3);margin-bottom:16px">${fmtDate(t.date)}</div>

    <div class="inp-row3" style="margin-bottom:14px">
      <div class="calc-res"><div class="calc-res-val" style="color:${pnl>=0?'var(--green)':'var(--red)'}">${pnl>=0?'+':''}$${Math.abs(pnl).toFixed(2)}</div><div class="calc-res-lbl">P&L</div></div>
      <div class="calc-res"><div class="calc-res-val">${t.entry||'—'}</div><div class="calc-res-lbl">Entry</div></div>
      <div class="calc-res"><div class="calc-res-val">${t.exit||'—'}</div><div class="calc-res-lbl">Exit</div></div>
    </div>

    ${t.setup?`<div style="margin-bottom:10px"><div class="section-lbl">Setup</div><span class="pill pill-blue">${t.setup}</span></div>`:''}
    ${t.mood?`<div style="margin-bottom:10px"><div class="section-lbl">Emotional State</div><div style="font-size:13px;color:var(--txt2);margin-top:4px">${t.mood}</div></div>`:''}
    ${t.plan?`<div style="margin-bottom:10px"><div class="section-lbl">Followed Plan</div><div style="font-size:13px;color:var(--txt2);margin-top:4px">${t.plan}</div></div>`:''}
    ${t.notes?`<div style="margin-bottom:14px"><div class="section-lbl">Notes</div><div style="font-size:13px;color:var(--txt2);line-height:1.6;margin-top:4px">${t.notes}</div></div>`:''}

    <div style="display:flex;gap:8px">
      <button class="btn btn-danger btn-sm" onclick="deleteJournalEntry(${idx})">Delete</button>
      <button class="btn btn-outline btn-sm" onclick="closeModal()">Close</button>
    </div>
  `);
}

function deleteJournalEntry(idx) {
  if (confirm('Delete this journal entry?')) {
    STATE.journal.splice(idx, 1);
    saveState();
    closeModal();
    showToast('🗑️ Entry deleted');
    navigate('journal');
  }
}
