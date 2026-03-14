/* ═══════════════════════════════════════════
   TRADE / PRACTICE SCREEN
   ═══════════════════════════════════════════ */

let _tradeTab = 'trade';
let _simCandles = [];
let _simCurrentPair = 'EUR/USD';
let _simCurrentPrice = 1.0847;
let _simOpenTrade = null;

const TRADE_PAIRS = [
  'EUR/USD','GBP/USD','USD/JPY','AUD/USD','USD/CHF','USD/CAD',
  'GBP/JPY','EUR/JPY','NZD/USD','EUR/GBP','XAU/USD','NAS100','SPX500','US30'
];

function renderTrade() {
  return `<div class="screen-pad">
    <div class="pg-header a-fadeup" style="padding:0 0 12px">
      <h1 class="pg-title">Practice Trading</h1>
      <div style="display:flex;gap:6px">
        <button class="btn btn-ghost btn-sm" onclick="navigate('calculator')">🧮 Calc</button>
        <button class="btn btn-ghost btn-sm" onclick="showTradeHelp()">?</button>
      </div>
    </div>

    <!-- Equity summary -->
    <div class="card card-gold a-fadeup2" style="margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div>
          <div class="t-label" style="margin-bottom:4px">Sim Equity</div>
          <div style="font-family:var(--display);font-weight:800;font-size:28px;color:var(--gold)" id="sim-equity-display">${fmtCurrency(STATE.simEquity)}</div>
        </div>
        <div style="text-align:right">
          <div class="t-label" style="margin-bottom:4px">P&L</div>
          <div id="sim-pnl-display" style="font-family:var(--display);font-weight:700;font-size:20px;color:${STATE.simEquity - 10000 >= 0 ? 'var(--green)' : 'var(--red)'}">
            ${STATE.simEquity - 10000 >= 0 ? '+' : ''}${fmtCurrency(STATE.simEquity - 10000)}
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tab-bar a-fadeup2">
      <div class="tab-btn ${_tradeTab === 'trade' ? 'active' : ''}" onclick="_tradeTab='trade';document.getElementById('trade-content').innerHTML=renderTradeTab()">Trade</div>
      <div class="tab-btn ${_tradeTab === 'open' ? 'active' : ''}" onclick="_tradeTab='open';document.getElementById('trade-content').innerHTML=renderTradeTab()">Open (${_simOpenTrade ? 1 : 0})</div>
      <div class="tab-btn ${_tradeTab === 'history' ? 'active' : ''}" onclick="_tradeTab='history';document.getElementById('trade-content').innerHTML=renderTradeTab()">History</div>
    </div>

    <div id="trade-content" class="a-fadeup3">${renderTradeTab()}</div>
  </div>`;
}

function renderTradeTab() {
  if (_tradeTab === 'open') return renderOpenPositions();
  if (_tradeTab === 'history') return renderTradeHistory();
  return renderTradeForm();
}

function renderTradeForm() {
  const t = MARKET_DATA.tickers.find(x => x.pair === _simCurrentPair) || { price: _simCurrentPrice, change: 0, pct: 0 };
  const up = t.change >= 0;

  return `
    <!-- Pair selector -->
    <div class="inp-wrap">
      <label class="inp-label">Instrument</label>
      <select class="inp" id="tp-pair" onchange="updateSimPair(this.value)">
        ${TRADE_PAIRS.map(p => `<option value="${p}" ${p === _simCurrentPair ? 'selected' : ''}>${p}</option>`).join('')}
      </select>
    </div>

    <!-- Live price display -->
    <div class="card" style="margin-bottom:12px;padding:14px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <div>
          <div class="t-label">BID (Sell)</div>
          <div id="bid-price" class="t-mono" style="font-size:24px;color:var(--red)">${_simCurrentPrice.toFixed(4)}</div>
        </div>
        <div style="text-align:center">
          <div style="display:flex;align-items:center;gap:5px;justify-content:center">
            <span class="live-dot"></span>
            <span style="font-size:10px;color:var(--txt3)">LIVE</span>
          </div>
          <div style="margin-top:4px;font-size:11px;color:${up ? 'var(--green)' : 'var(--red)'}">
            ${up ? '▲' : '▼'} ${Math.abs(t.pct).toFixed(2)}%
          </div>
        </div>
        <div style="text-align:right">
          <div class="t-label">ASK (Buy)</div>
          <div id="ask-price" class="t-mono" style="font-size:24px;color:var(--green)">${(_simCurrentPrice + 0.00012).toFixed(4)}</div>
        </div>
      </div>
    </div>

    <!-- Candle chart -->
    <div class="chart-box" style="height:190px;margin-bottom:12px">
      <canvas id="sim-candle-chart" style="width:100%;height:190px"></canvas>
    </div>

    <!-- Order parameters -->
    <div class="inp-row">
      <div class="inp-wrap">
        <label class="inp-label">Lot Size</label>
        <select class="inp" id="tp-lots">
          <option value="0.01">0.01 (Nano)</option>
          <option value="0.05">0.05</option>
          <option value="0.10" selected>0.10 (Mini)</option>
          <option value="0.25">0.25</option>
          <option value="0.50">0.50</option>
          <option value="1.00">1.00 (Standard)</option>
        </select>
      </div>
      <div class="inp-wrap">
        <label class="inp-label">Stop Loss (pips)</label>
        <input class="inp" id="tp-sl" type="number" value="30" min="5" max="500" oninput="updateRiskCalc()">
      </div>
    </div>
    <div class="inp-row" style="margin-bottom:12px">
      <div class="inp-wrap">
        <label class="inp-label">Take Profit (pips)</label>
        <input class="inp" id="tp-tp" type="number" value="60" min="5" max="1000" oninput="updateRiskCalc()">
      </div>
      <div class="calc-res">
        <div class="calc-res-val" id="risk-reward-display">2:1</div>
        <div class="calc-res-lbl">R:R Ratio</div>
      </div>
    </div>

    ${_simOpenTrade ? `
      <!-- Open trade info -->
      <div class="card card-gold" style="padding:12px;margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
          <div>
            <strong style="font-family:var(--display);font-size:15px">${_simOpenTrade.pair}</strong>
            <span class="pill ${_simOpenTrade.dir === 'BUY' ? 'pill-green' : 'pill-red'}" style="margin-left:6px">${_simOpenTrade.dir}</span>
          </div>
          <div id="live-pnl" class="t-mono" style="font-size:16px">$0.00</div>
        </div>
        <div style="font-size:11px;color:var(--txt2)">
          Entry: ${_simOpenTrade.entry.toFixed(4)} &nbsp;|&nbsp;
          SL: <span style="color:var(--red)">${_simOpenTrade.sl.toFixed(4)}</span> &nbsp;|&nbsp;
          TP: <span style="color:var(--green)">${_simOpenTrade.tp.toFixed(4)}</span>
        </div>
        <div style="font-size:11px;color:var(--txt3);margin-top:4px">Lots: ${_simOpenTrade.lots}</div>
      </div>
      <button class="btn btn-danger" onclick="closeSimTrade('Manual')">⬜ Close Position</button>
    ` : `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <button class="sim-buy" onclick="openSimTrade('BUY')">
          BUY / LONG
          <br><small style="font-size:11px;font-weight:400;opacity:.8">Market Order</small>
        </button>
        <button class="sim-sell" onclick="openSimTrade('SELL')">
          SELL / SHORT
          <br><small style="font-size:11px;font-weight:400;opacity:.8">Market Order</small>
        </button>
      </div>
    `}

    <!-- Checklist reminder -->
    <div class="card" style="padding:12px;margin-top:12px;background:rgba(201,168,76,.04);border-color:var(--bdr)">
      <div style="font-size:11px;color:var(--txt3)">
        ⚡ <strong style="color:var(--gold)">Pre-Trade Checklist:</strong> Trend confirmed? Setup valid? Position sized? SL placed?
      </div>
    </div>
    <div style="text-align:center;margin-top:10px;font-size:11px;color:var(--txt3)">🔒 Simulation only — no real money at risk</div>
  `;
}

function renderOpenPositions() {
  if (!_simOpenTrade) {
    return `<div style="text-align:center;padding:50px 0;color:var(--txt3)">
      <div style="font-size:44px;margin-bottom:10px">📊</div>
      <div style="font-family:var(--display);font-weight:600;font-size:15px;margin-bottom:6px">No Open Positions</div>
      <div style="font-size:12px">Go to the Trade tab to open a position</div>
    </div>`;
  }
  return `<div class="card" style="padding:14px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <div>
        <div style="font-family:var(--display);font-weight:800;font-size:16px">${_simOpenTrade.pair}</div>
        <span class="pill ${_simOpenTrade.dir === 'BUY' ? 'pill-green' : 'pill-red'}" style="margin-top:4px">${_simOpenTrade.dir}</span>
      </div>
      <div id="open-live-pnl" class="t-mono" style="font-size:20px;color:var(--txt2)">$0.00</div>
    </div>
    <div class="inp-row3" style="margin-bottom:12px">
      <div class="calc-res"><div class="calc-res-val">${_simOpenTrade.entry.toFixed(4)}</div><div class="calc-res-lbl">Entry</div></div>
      <div class="calc-res"><div class="calc-res-val" id="current-price-display">${_simCurrentPrice.toFixed(4)}</div><div class="calc-res-lbl">Current</div></div>
      <div class="calc-res"><div class="calc-res-val">${_simOpenTrade.lots}</div><div class="calc-res-lbl">Lots</div></div>
    </div>
    <div class="inp-row" style="margin-bottom:12px">
      <div class="calc-res"><div class="calc-res-val" style="color:var(--red)">${_simOpenTrade.sl.toFixed(4)}</div><div class="calc-res-lbl">Stop Loss</div></div>
      <div class="calc-res"><div class="calc-res-val" style="color:var(--green)">${_simOpenTrade.tp.toFixed(4)}</div><div class="calc-res-lbl">Take Profit</div></div>
    </div>
    <button class="btn btn-danger" onclick="closeSimTrade('Manual')">Close Position</button>
  </div>`;
}

function renderTradeHistory() {
  if (!STATE.simTrades.length) {
    return `<div style="text-align:center;padding:50px 0;color:var(--txt3)">
      <div style="font-size:44px;margin-bottom:10px">📋</div>
      <div style="font-family:var(--display);font-weight:600;font-size:15px;margin-bottom:6px">No Trade History</div>
      <div style="font-size:12px">Complete sim trades to see them here</div>
    </div>`;
  }
  return STATE.simTrades.slice().reverse().slice(0, 30).map(t => {
    const up = t.pnl >= 0;
    return `<div class="card" style="padding:12px;margin-bottom:8px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <strong style="font-family:var(--display)">${t.pair}</strong>
          <span class="pill ${t.dir === 'BUY' ? 'pill-green' : 'pill-red'}" style="margin-left:6px;font-size:9px">${t.dir}</span>
        </div>
        <div class="t-mono" style="font-size:15px;color:${up ? 'var(--green)' : 'var(--red)'}">
          ${up ? '+' : ''}${fmtCurrency(t.pnl)}
        </div>
      </div>
      <div style="font-size:11px;color:var(--txt2);margin-top:5px">
        ${t.lots} lots &nbsp;|&nbsp; ${t.entry} → ${t.exit} &nbsp;|&nbsp; ${t.reason}
      </div>
    </div>`;
  }).join('');
}

// ── SIM TRADING LOGIC ──
function updateSimPair(pair) {
  _simCurrentPair = pair;
  const found = MARKET_DATA.tickers.find(t => t.pair === pair);
  if (found) _simCurrentPrice = found.price;
  _simCandles = generateCandleData(_simCurrentPrice, 50);
  document.getElementById('trade-content').innerHTML = renderTradeTab();
  setTimeout(initSimChart, 50);
}

function updateRiskCalc() {
  const sl = parseFloat(el('tp-sl')?.value || 30);
  const tp = parseFloat(el('tp-tp')?.value || 60);
  const rr = tp / sl;
  const rrEl = el('risk-reward-display');
  if (rrEl) {
    rrEl.textContent = `${rr.toFixed(1)}:1`;
    rrEl.style.color = rr >= 2 ? 'var(--green)' : rr >= 1 ? 'var(--gold)' : 'var(--red)';
  }
}

function openSimTrade(dir) {
  if (_simOpenTrade) { showToast('⚠️ Close your existing position first'); return; }
  const lots  = parseFloat(el('tp-lots')?.value || '0.10');
  const slPip = parseInt(el('tp-sl')?.value || '30');
  const tpPip = parseInt(el('tp-tp')?.value || '60');
  const pm    = _simCurrentPair.includes('JPY') ? 0.01 :
                _simCurrentPair.includes('XAU') ? 0.1  :
                (_simCurrentPair.includes('NAS') || _simCurrentPair.includes('SPX') || _simCurrentPair.includes('US30')) ? 1 : 0.0001;

  _simOpenTrade = {
    pair: _simCurrentPair, dir, entry: _simCurrentPrice, lots,
    sl: dir === 'BUY' ? _simCurrentPrice - slPip * pm : _simCurrentPrice + slPip * pm,
    tp: dir === 'BUY' ? _simCurrentPrice + tpPip * pm : _simCurrentPrice - tpPip * pm,
    time: new Date().toISOString()
  };

  showToast(`📈 ${dir} ${_simCurrentPair} @ ${_simCurrentPrice.toFixed(4)}`);
  addXP(5);
  navigate('trade');
}

function closeSimTrade(reason = 'Manual') {
  if (!_simOpenTrade) return;
  const pm = _simCurrentPair.includes('JPY') ? 100 :
             (_simCurrentPair.includes('NAS') || _simCurrentPair.includes('SPX') || _simCurrentPair.includes('US30')) ? 1 :
             _simCurrentPair.includes('XAU') ? 10 : 10000;
  const pips = (_simOpenTrade.dir === 'BUY'
    ? _simCurrentPrice - _simOpenTrade.entry
    : _simOpenTrade.entry - _simCurrentPrice) * pm;
  const pnl = parseFloat((pips * _simOpenTrade.lots * 10 * 0.1).toFixed(2));

  STATE.simTrades.push({
    pair: _simOpenTrade.pair, dir: _simOpenTrade.dir,
    entry: _simOpenTrade.entry.toFixed(4), exit: _simCurrentPrice.toFixed(4),
    lots: _simOpenTrade.lots, pnl, reason, time: new Date().toISOString()
  });
  STATE.simEquity = parseFloat((STATE.simEquity + pnl).toFixed(2));
  _simOpenTrade = null;

  addXP(15);
  saveState();
  showToast(`${pnl >= 0 ? '✅ Profit' : '❌ Loss'}: ${pnl >= 0 ? '+' : ''}${fmtCurrency(pnl)}`);
  navigate('trade');
}

// ── CHART RENDERING ──
function generateCandleData(seed = 1.0847, count = 50) {
  const data = []; let price = seed;
  for (let i = 0; i < count; i++) {
    const open = price;
    const change = (Math.random() - 0.48) * 0.003;
    const close = Math.max(open + change, 0.0001);
    const high = Math.max(open, close) + Math.random() * 0.0015;
    const low  = Math.min(open, close) - Math.random() * 0.0015;
    data.push({ open, high, low, close, bull: close >= open });
    price = close;
  }
  return data;
}

function tickPrice() {
  const change = (Math.random() - 0.49) * 0.0003;
  _simCurrentPrice = Math.max(_simCurrentPrice + change, 0.0001);
  return _simCurrentPrice;
}

function initSimChart() {
  const canvas = el('sim-candle-chart');
  if (!canvas) return;
  canvas.width  = canvas.offsetWidth || 360;
  canvas.height = 190;
  if (_simCandles.length === 0) _simCandles = generateCandleData(_simCurrentPrice, 50);
  drawCandleChart(canvas.getContext('2d'), _simCandles, canvas.width, canvas.height);

  if (_simPriceInterval) clearInterval(_simPriceInterval);
  _simPriceInterval = setInterval(() => {
    _simCurrentPrice = tickPrice();

    // Update last candle or add new
    if (_simCandles.length > 0) {
      const last = _simCandles[_simCandles.length - 1];
      last.close = _simCurrentPrice;
      last.high  = Math.max(last.high, _simCurrentPrice);
      last.low   = Math.min(last.low,  _simCurrentPrice);
      last.bull  = last.close >= last.open;
      if (Math.random() < 0.15) {
        _simCandles.push(generateCandleData(_simCurrentPrice, 1)[0]);
        if (_simCandles.length > 70) _simCandles.shift();
      }
    }

    // Update price displays
    const bid = el('bid-price'), ask = el('ask-price');
    if (bid) bid.textContent = _simCurrentPrice.toFixed(4);
    if (ask) ask.textContent = (_simCurrentPrice + 0.00012).toFixed(4);

    // Update live P&L
    if (_simOpenTrade) {
      const pm = _simCurrentPair.includes('JPY') ? 100 : 10000;
      const pips = (_simOpenTrade.dir === 'BUY'
        ? _simCurrentPrice - _simOpenTrade.entry
        : _simOpenTrade.entry - _simCurrentPrice) * pm;
      const pnl = parseFloat((pips * _simOpenTrade.lots * 10 * 0.1).toFixed(2));
      const pnlStr = `${pnl >= 0 ? '+' : ''}${fmtCurrency(pnl)}`;
      const col = pnl >= 0 ? 'var(--green)' : 'var(--red)';
      ['live-pnl', 'open-live-pnl'].forEach(id => {
        const e2 = el(id);
        if (e2) { e2.textContent = pnlStr; e2.style.color = col; }
      });
      const cpd = el('current-price-display');
      if (cpd) cpd.textContent = _simCurrentPrice.toFixed(4);

      // Auto-close on SL/TP hit
      if (_simOpenTrade.dir === 'BUY') {
        if (_simCurrentPrice <= _simOpenTrade.sl) closeSimTrade('Stop Loss');
        if (_simCurrentPrice >= _simOpenTrade.tp) closeSimTrade('Take Profit');
      } else {
        if (_simCurrentPrice >= _simOpenTrade.sl) closeSimTrade('Stop Loss');
        if (_simCurrentPrice <= _simOpenTrade.tp) closeSimTrade('Take Profit');
      }
    }

    // Redraw chart
    const c = el('sim-candle-chart');
    if (c && c.isConnected) drawCandleChart(c.getContext('2d'), _simCandles, c.width, c.height);
  }, 800);
}

function drawCandleChart(ctx, candles, w, h) {
  if (!ctx || !candles || !candles.length) return;
  ctx.clearRect(0, 0, w, h);

  // Background
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg3').trim() || '#18181F';
  ctx.fillRect(0, 0, w, h);

  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = (h / 4) * i;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }

  const prices = candles.flatMap(c => [c.high, c.low]);
  const lo = Math.min(...prices), hi = Math.max(...prices);
  const range = (hi - lo) || 0.001;
  const PAD = 14;
  const sy = p => h - PAD - ((p - lo) / range) * (h - PAD * 2);
  const gap = w / candles.length;
  const cw  = Math.max(2, gap - 1.5);

  candles.forEach((c, i) => {
    const x = i * gap + gap / 2;
    const col = c.bull ? '#22C55E' : '#EF4444';
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 1.2;
    // Wick
    ctx.beginPath(); ctx.moveTo(x, sy(c.high)); ctx.lineTo(x, sy(c.low)); ctx.stroke();
    // Body
    const top = Math.min(sy(c.open), sy(c.close));
    const bodyH = Math.max(1.5, Math.abs(sy(c.open) - sy(c.close)));
    ctx.fillRect(x - cw / 2, top, cw, bodyH);
    // Last candle glow
    if (i === candles.length - 1) {
      ctx.shadowColor = col; ctx.shadowBlur = 8;
      ctx.fillRect(x - cw / 2, top, cw, bodyH);
      ctx.shadowBlur = 0;
    }
  });

  // Current price dashed line
  const last = candles[candles.length - 1].close;
  const py = sy(last);
  ctx.strokeStyle = 'rgba(201,168,76,0.7)'; ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(w, py); ctx.stroke();
  ctx.setLineDash([]);

  // Price label
  ctx.fillStyle = '#C9A84C'; ctx.font = 'bold 10px monospace';
  ctx.fillText(last.toFixed(4), 4, py - 4);
}

function showTradeHelp() {
  showModal(`<div class="modal-handle"></div>
    <div style="font-family:var(--display);font-weight:800;font-size:18px;margin-bottom:4px">Practice Trading Guide</div>
    <p style="font-size:13px;color:var(--txt2);margin-bottom:14px">This is a 100% risk-free simulation using real market prices.</p>
    <div style="display:flex;flex-direction:column;gap:10px;font-size:13px;color:var(--txt2)">
      <div>1️⃣ <strong style="color:var(--txt)">Select instrument</strong> — choose from 14 pairs</div>
      <div>2️⃣ <strong style="color:var(--txt)">Set lot size</strong> — start with 0.10 (mini lot)</div>
      <div>3️⃣ <strong style="color:var(--txt)">Set Stop Loss</strong> — your maximum loss in pips</div>
      <div>4️⃣ <strong style="color:var(--txt)">Set Take Profit</strong> — your target in pips</div>
      <div>5️⃣ <strong style="color:var(--txt)">Click BUY or SELL</strong> — enter the market</div>
      <div>6️⃣ <strong style="color:var(--txt)">Close manually</strong> or wait for SL/TP to trigger</div>
    </div>
    <div style="margin-top:14px;padding:12px;background:var(--gold-bg);border:1px solid var(--bdr);border-radius:var(--rs)">
      <div style="font-size:12px;color:var(--txt2)"><strong style="color:var(--gold)">💡 Tip:</strong> Always aim for minimum 1:2 Risk/Reward. If SL = 30 pips, TP should be at least 60 pips.</div>
    </div>
    <button class="btn btn-gold" style="margin-top:16px" onclick="closeModal()">Got it!</button>
  `);
}
