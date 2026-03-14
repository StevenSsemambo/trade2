/* Curriculum data */
const CURRICULUM = [
  {
    id:'forex-basics',title:'Forex Fundamentals',emoji:'📘',
    desc:'Master the foundation of currency trading — from what forex is to placing your first trade.',
    color:'var(--blue)',
    lessons:[
      {id:'what-is-forex',title:'What is Forex?',emoji:'🌍',mins:8,xp:80,
       content:`<h3>What is the Forex Market?</h3>
<p>The <strong>Foreign Exchange (Forex or FX)</strong> market is the world's largest and most liquid financial market, with over <strong>$7.5 trillion</strong> traded daily. Unlike stocks, forex has no central exchange — it operates 24 hours a day, 5 days a week across global financial centers.</p>
<p>In simple terms: forex is the exchange of one nation's currency for another. When you travel abroad and exchange your currency at the airport, you've participated in the forex market.</p>
<h3>How Forex Trading Works</h3>
<p>Forex trading involves buying one currency while simultaneously selling another. Currencies are always traded in <strong>pairs</strong>, like EUR/USD (Euro vs US Dollar). If you believe the Euro will strengthen against the Dollar, you <em>buy</em> EUR/USD. If you're right, you profit.</p>
<h3>Key Participants</h3>
<ul>
<li><strong>Central Banks</strong> — Control monetary policy (Fed, ECB, BOE, BOJ). Biggest movers of all.</li>
<li><strong>Commercial Banks</strong> — Citibank, Deutsche Bank, JPMorgan facilitate most forex flow</li>
<li><strong>Hedge Funds & Institutions</strong> — Speculative trading with billions</li>
<li><strong>Retail Traders</strong> — That's you! Trading via online brokers</li>
<li><strong>Corporations</strong> — Hedging international business revenue</li>
<li><strong>Tourists & Travelers</strong> — Currency exchange for travel</li>
</ul>
<h3>Why Trade Forex?</h3>
<ul>
<li>✅ 24/5 market — trade anytime</li>
<li>✅ Highest liquidity in the world — tight spreads</li>
<li>✅ Leverage available for amplified returns</li>
<li>✅ Low entry capital requirement (start with $100)</li>
<li>✅ Profit in both rising AND falling markets</li>
<li>✅ No commissions on most retail accounts</li>
</ul>
<h3>Forex vs Other Markets</h3>
<table><tr><th>Market</th><th>Daily Volume</th><th>Hours</th><th>Commission</th></tr>
<tr><td>Forex</td><td>$7.5 Trillion</td><td>24/5</td><td>Spread only</td></tr>
<tr><td>Stock Market</td><td>$200 Billion</td><td>6.5 hrs/day</td><td>Per trade</td></tr>
<tr><td>Crypto</td><td>$50 Billion</td><td>24/7</td><td>0.1-0.5%</td></tr>
<tr><td>Gold (Futures)</td><td>$100 Billion</td><td>23 hrs</td><td>Per contract</td></tr>
</table>
<div class="callout"><strong>💡 Key Insight:</strong> The forex market moves based on the relative strength of economies. When the US economy outperforms Europe, the USD typically strengthens against the EUR, driving EUR/USD lower. This is the foundation of fundamental analysis.</div>`,
      },
      {id:'currency-pairs',title:'Currency Pairs Explained',emoji:'💱',mins:10,xp:100,
       content:`<h3>Understanding Currency Pairs</h3>
<p>Every forex trade involves exactly two currencies. The <strong>base currency</strong> comes first, the <strong>quote currency</strong> second.</p>
<div class="card" style="padding:14px;margin:10px 0;text-align:center"><div class="mono" style="font-size:20px;color:var(--gold)">EUR / USD = 1.0850</div><div style="display:flex;justify-content:space-between;margin-top:8px;font-size:12px;color:var(--text2)"><span>← Base (sell)</span><span>Quote (buy) →</span></div><p style="font-size:13px;color:var(--text2);margin-top:8px">1 Euro = 1.0850 US Dollars</p></div>
<p>If EUR/USD goes from 1.0850 to 1.0900, the Euro strengthened. If it goes to 1.0800, the Euro weakened.</p>
<h3>Major Pairs (Most Traded)</h3>
<p>All major pairs include the USD. They have the tightest spreads and highest liquidity:</p>
<table><tr><th>Pair</th><th>Nickname</th><th>Daily Volume</th></tr>
<tr><td>EUR/USD</td><td>The Euro</td><td>~28% of all forex</td></tr>
<tr><td>USD/JPY</td><td>The Yen</td><td>~13%</td></tr>
<tr><td>GBP/USD</td><td>Cable</td><td>~11%</td></tr>
<tr><td>AUD/USD</td><td>Aussie</td><td>~7%</td></tr>
<tr><td>USD/CAD</td><td>Loonie</td><td>~5%</td></tr>
<tr><td>USD/CHF</td><td>Swissie</td><td>~5%</td></tr>
<tr><td>NZD/USD</td><td>Kiwi</td><td>~4%</td></tr>
</table>
<h3>Minor (Cross) Pairs</h3>
<p>No USD involved. Slightly wider spreads but excellent trading opportunities:</p>
<ul><li>EUR/GBP, EUR/JPY, EUR/AUD, EUR/CHF</li><li>GBP/JPY ("The Beast" — highly volatile), GBP/AUD</li><li>AUD/JPY, AUD/NZD, CAD/JPY</li></ul>
<h3>Exotic Pairs</h3>
<p>One major currency + an emerging market currency. Wide spreads, high volatility, lower liquidity:</p>
<ul><li>USD/ZAR (South African Rand), USD/MXN (Mexican Peso)</li><li>EUR/TRY (Turkish Lira), USD/SGD (Singapore Dollar)</li></ul>
<h3>Bid, Ask & Spread</h3>
<div class="stat-grid"><div class="stat-box"><div class="stat-val" style="font-size:18px;color:var(--red)">1.0848</div><div class="stat-lbl">BID — Your sell price</div></div><div class="stat-box"><div class="stat-val" style="font-size:18px;color:var(--green)">1.0850</div><div class="stat-lbl">ASK — Your buy price</div></div></div>
<p style="margin-top:10px">The <strong>spread</strong> is 2 pips — the broker's fee. Majors: 0.5-2 pips. Minors: 2-5 pips. Exotics: 10-50+ pips.</p>
<div class="callout"><strong>⚠️ Remember:</strong> You BUY at the ASK (higher price) and SELL at the BID (lower price). The spread is your immediate cost — you start every trade slightly negative before price even moves.</div>`,
      },
      {id:'pips-lots',title:'Pips, Lots & Position Sizing',emoji:'📐',mins:12,xp:120,
       content:`<h3>What is a Pip?</h3>
<p>A <strong>pip</strong> (Percentage in Point) is the smallest standard price move in forex. The name comes from "percentage in point" — it's the standardized unit of measurement.</p>
<ul><li>Most pairs: 1 pip = <strong>0.0001</strong> (4th decimal place)</li><li>JPY pairs: 1 pip = <strong>0.01</strong> (2nd decimal place)</li><li>A <strong>pipette</strong> = 0.00001 (the 5th decimal — "fractional pip")</li></ul>
<div class="card" style="padding:12px;margin:10px 0"><div class="mono" style="font-size:13px">EUR/USD: 1.0850 → 1.0860 = <span style="color:var(--green)">+10 pips</span><br>USD/JPY: 149.00 → 150.00 = <span style="color:var(--green)">+100 pips</span><br>GBP/USD: 1.2650 → 1.2600 = <span style="color:var(--red)">-50 pips</span></div></div>
<h3>Lot Sizes — The Unit of Trade</h3>
<table><tr><th>Lot Type</th><th>Units</th><th>EUR/USD Pip Value</th><th>Best For</th></tr>
<tr><td><strong>Standard</strong></td><td class="mono">100,000</td><td style="color:var(--green)">~$10/pip</td><td>Experienced traders</td></tr>
<tr><td><strong>Mini</strong></td><td class="mono">10,000</td><td style="color:var(--green)">~$1/pip</td><td>Intermediate traders</td></tr>
<tr><td><strong>Micro</strong></td><td class="mono">1,000</td><td style="color:var(--green)">~$0.10/pip</td><td>Beginners / small accounts</td></tr>
<tr><td><strong>Nano</strong></td><td class="mono">100</td><td style="color:var(--green)">~$0.01/pip</td><td>Practice / tiny accounts</td></tr>
</table>
<h3>Pip Value Formula</h3>
<div class="card card-gold" style="padding:12px"><div class="mono" style="font-size:13px;color:var(--gold)">Pip Value = (Pip Size / Exchange Rate) × Lot Size</div><div style="font-size:12px;color:var(--text2);margin-top:6px">For USD-quoted pairs (EUR/USD, GBP/USD):<br>Pip value = 0.0001 × 100,000 = <strong style="color:var(--gold)">$10 per pip</strong> (standard lot)</div></div>
<h3>Position Sizing — The Most Important Skill</h3>
<div class="card card-gold" style="padding:14px;margin:10px 0"><div class="mono" style="color:var(--gold);font-size:13px">Lot Size = (Account × Risk%) ÷ (Stop Loss pips × Pip Value)</div><div style="font-size:13px;color:var(--text2);margin-top:10px"><strong>Example:</strong> $10,000 account, 1% risk, 30 pip SL, micro lots ($0.10/pip):<br>= ($10,000 × 0.01) ÷ (30 × $0.10)<br>= $100 ÷ $3 = <strong style="color:var(--gold)">33.3 micro lots</strong></div></div>
<div class="callout"><strong>💡 Never trade without calculating position size first.</strong> Use the built-in calculator in the TRADE tab. This one habit separates losing traders from winning ones.</div>`,
      },
      {id:'leverage-margin',title:'Leverage & Margin',emoji:'⚖️',mins:10,xp:100,
       content:`<h3>Understanding Leverage</h3>
<p>Leverage is borrowing from your broker to control a larger position. It's expressed as a ratio:</p>
<div class="stat-grid" style="margin:10px 0">
<div class="stat-box"><div class="stat-val">100:1</div><div class="stat-lbl">Leverage</div></div>
<div class="stat-box"><div class="stat-val" style="color:var(--blue)">$1,000</div><div class="stat-lbl">Your Capital</div></div>
<div class="stat-box"><div class="stat-val" style="color:var(--green)">$100K</div><div class="stat-lbl">Position Size</div></div>
<div class="stat-box"><div class="stat-val" style="color:var(--red)">1%</div><div class="stat-lbl">Margin Req.</div></div>
</div>
<h3>Types of Margin</h3>
<ul>
<li><strong>Required Margin</strong> = Position Size ÷ Leverage (the deposit held as collateral)</li>
<li><strong>Used Margin</strong> = Total required margin across all open trades</li>
<li><strong>Free Margin</strong> = Equity − Used Margin (available to open new trades)</li>
<li><strong>Margin Level</strong> = (Equity ÷ Used Margin) × 100%</li>
</ul>
<h3>The Margin Call & Stop Out</h3>
<p>When your account loses money, margin level falls. Here's what happens:</p>
<ul>
<li>🟡 <strong>Margin Call (~100% level)</strong> — Broker warns you to deposit more or close trades</li>
<li>🔴 <strong>Stop Out (~50% level)</strong> — Broker automatically closes your trades from largest loss first</li>
</ul>
<h3>Leverage: The Double-Edged Sword</h3>
<div class="stat-grid" style="margin:10px 0">
<div class="stat-box card-green"><div style="color:var(--green);font-weight:700;font-family:var(--display)">BUY 1 lot EUR/USD @ 1:100</div><div style="font-size:12px;color:var(--text2);margin-top:4px">Price moves +100 pips: <strong style="color:var(--green)">+$1,000 profit</strong> on $1,000 margin</div></div>
<div class="stat-box card-red"><div style="color:var(--red);font-weight:700;font-family:var(--display)">BUY 1 lot EUR/USD @ 1:100</div><div style="font-size:12px;color:var(--text2);margin-top:4px">Price moves -100 pips: <strong style="color:var(--red)">-$1,000 loss</strong> = 100% wipeout</div></div>
</div>
<h3>Safe Leverage Guidelines</h3>
<ul><li>🟢 Beginners: 1:5 to 1:10</li><li>🟡 Intermediate: 1:10 to 1:30</li><li>🔴 Advanced: Up to 1:50 (strict risk management required)</li></ul>
<div class="callout"><strong>🚨 Warning:</strong> High leverage is the #1 reason traders blow accounts. A 1% adverse move with 100:1 leverage = 100% loss. Most regulated brokers cap retail leverage at 1:30 (EU/UK) or 1:50 (US). Never use maximum leverage available.</div>`,
      },
      {id:'order-types',title:'Order Types Mastery',emoji:'📋',mins:11,xp:110,
       content:`<h3>The 6 Essential Order Types</h3>
<p>Understanding order types lets you execute trades precisely and automate your strategy.</p>
<h3>1. Market Order</h3>
<p>Executes immediately at the best available price. Use when speed matters more than exact price.</p>
<div class="card card-green" style="padding:10px;margin:6px 0;font-size:13px">Best for: <strong>News trades, emergency exits, highly liquid markets during peak hours</strong></div>
<h3>2. Limit Orders (4 types)</h3>
<p><strong>Buy Limit</strong> — Buy when price drops TO your level (below current). You want to buy cheaper.</p>
<p><strong>Sell Limit</strong> — Sell when price rises TO your level (above current). You want to sell higher.</p>
<p><strong>Buy Stop</strong> — Buy when price rises THROUGH your level (above current). Breakout entry.</p>
<p><strong>Sell Stop</strong> — Sell when price falls THROUGH your level (below current). Breakdown entry.</p>
<h3>3. Stop Loss (SL)</h3>
<p>Your safety net. Automatically closes a losing trade at your predetermined maximum loss level.</p>
<div class="card card-red" style="padding:10px;margin:6px 0;font-size:13px;color:var(--text2)">Place SL at a <strong>logical level</strong> — below support (for longs), above resistance (for shorts). Not just a random pip distance.</div>
<h3>4. Take Profit (TP)</h3>
<p>Locks in your profit automatically. The trade closes when price reaches your target.</p>
<h3>5. Trailing Stop</h3>
<p>Moves WITH your trade as it profits, locking in gains while letting the trade run further. If you set a 30-pip trailing stop and price moves 50 pips in your favor, your stop moves up 50 pips too.</p>
<h3>6. OCO (One Cancels the Other)</h3>
<p>Two pending orders — when one executes, the other is automatically cancelled. Perfect for trading breakouts where you don't know the direction.</p>
<div class="callout"><strong>Golden Rule:</strong> <em>NEVER</em> enter a trade without a Stop Loss. One unexpected news event, one flash crash, one gap open on Monday — any of these can wipe an account in seconds without a stop loss.</div>`,
      },
    ]
  },
  {
    id:'technical-analysis',title:'Technical Analysis',emoji:'📊',
    desc:'Read charts like a professional — the visual language of markets.',
    color:'var(--purple)',
    lessons:[
      {id:'candlestick-basics',title:'Candlestick Fundamentals',emoji:'🕯️',mins:14,xp:140,
       content:`<h3>The Language of Price Action</h3>
<p>Candlestick charts were invented by Japanese rice traders in the 18th century. They pack 4 critical prices into one visual element — giving you far more information than a simple line chart.</p>
<div style="display:flex;gap:10px;justify-content:center;margin:14px 0;flex-wrap:wrap">
<div style="text-align:center"><svg viewBox="0 0 80 160" width="80" height="160"><line x1="40" y1="10" x2="40" y2="40" stroke="#22C55E" stroke-width="2"/><rect x="20" y="40" width="40" height="80" fill="#22C55E" rx="2"/><line x1="40" y1="120" x2="40" y2="150" stroke="#22C55E" stroke-width="2"/><text y="10" x="40" text-anchor="middle" fill="#9B9891" font-size="9" font-family="monospace">HIGH</text><text y="35" x="62" text-anchor="start" fill="#F0EEE8" font-size="9" font-family="monospace">CLOSE</text><text y="125" x="62" text-anchor="start" fill="#F0EEE8" font-size="9" font-family="monospace">OPEN</text><text y="156" x="40" text-anchor="middle" fill="#9B9891" font-size="9" font-family="monospace">LOW</text></svg><div style="font-size:11px;color:var(--green);margin-top:4px;font-family:var(--display);font-weight:700">BULLISH</div></div>
<div style="text-align:center"><svg viewBox="0 0 80 160" width="80" height="160"><line x1="40" y1="10" x2="40" y2="40" stroke="#EF4444" stroke-width="2"/><rect x="20" y="40" width="40" height="80" fill="#EF4444" rx="2"/><line x1="40" y1="120" x2="40" y2="150" stroke="#EF4444" stroke-width="2"/><text y="10" x="40" text-anchor="middle" fill="#9B9891" font-size="9" font-family="monospace">HIGH</text><text y="35" x="62" text-anchor="start" fill="#F0EEE8" font-size="9" font-family="monospace">OPEN</text><text y="125" x="62" text-anchor="start" fill="#F0EEE8" font-size="9" font-family="monospace">CLOSE</text><text y="156" x="40" text-anchor="middle" fill="#9B9891" font-size="9" font-family="monospace">LOW</text></svg><div style="font-size:11px;color:var(--red);margin-top:4px;font-family:var(--display);font-weight:700">BEARISH</div></div>
</div>
<h3>The 10 Most Important Candlestick Patterns</h3>
<p><strong>🔨 Hammer</strong> — Small body at top, long lower wick. Price tested lower but closed near high. Strong bullish reversal at downtrend lows. The wick = failed selling pressure.</p>
<p><strong>☁️ Inverted Hammer</strong> — Small body at bottom, long upper wick. At downtrend lows = potential bullish reversal. Requires confirmation next candle.</p>
<p><strong>💫 Shooting Star</strong> — Small body at bottom, long upper wick. At uptrend highs = strong bearish reversal. Failed buying pressure.</p>
<p><strong>🪝 Hanging Man</strong> — Looks like a hammer but appears at uptrend highs. Bearish warning — selling pressure is emerging.</p>
<p><strong>⭐ Doji</strong> — Open = Close. Complete indecision. After a strong trend = warning of reversal. Types: Standard, Long-legged, Dragonfly (bullish), Gravestone (bearish).</p>
<p><strong>🐾 Bullish Engulfing</strong> — Second green candle completely engulfs first red candle. Strong bullish reversal. Power increases with larger size difference.</p>
<p><strong>🐾 Bearish Engulfing</strong> — Second red candle completely engulfs first green candle. Strong bearish reversal.</p>
<p><strong>☀️ Morning Star</strong> — 3 candles: Large bearish → small indecision → large bullish. Powerful bullish reversal at lows.</p>
<p><strong>🌙 Evening Star</strong> — 3 candles: Large bullish → small indecision → large bearish. Powerful bearish reversal at highs.</p>
<p><strong>🌅 Marubozu</strong> — Full body candle with no wicks. Maximum conviction — bulls or bears completely in control. Often starts new trends.</p>
<div class="callout"><strong>Context is everything.</strong> A hammer at a major support level after a 300-pip downtrend = HIGH probability. A hammer in the middle of a range = LOW probability. Never trade patterns in isolation — always ask "where is this pattern forming?"</div>`,
      },
      {id:'support-resistance',title:'Support & Resistance',emoji:'📏',mins:13,xp:130,
       content:`<h3>The Cornerstone of Technical Analysis</h3>
<p><strong>Support</strong> is a price zone where buying interest historically overcomes selling pressure — price "bounces" up. Buyers step in because they see value at this price.</p>
<p><strong>Resistance</strong> is where selling overcomes buying — price "bounces" down. Sellers step in because they think the price is overvalued.</p>
<h3>Why These Levels Form</h3>
<p>S&R levels form because of human psychology and institutional order flow:</p>
<ul>
<li><strong>Institutional orders</strong> — Banks and hedge funds place large orders at key levels</li>
<li><strong>Profit taking</strong> — Traders who bought lower take profits at the same resistance</li>
<li><strong>Stop loss clusters</strong> — Stops placed just beyond levels create momentum on breakout</li>
<li><strong>Round numbers</strong> — 1.1000, 1.2000 attract enormous order flow (psychological)</li>
</ul>
<h3>Types of S&R Levels</h3>
<p><strong>Horizontal S&R</strong> — Fixed price areas, the most reliable. Draw horizontal lines at obvious reversal zones.</p>
<p><strong>Swing Highs/Lows</strong> — Previous day, week, month highs and lows carry significant weight.</p>
<p><strong>Round Numbers</strong> — 1.1000, 1.2000, 150.00 (JPY). Institutions place large orders here.</p>
<p><strong>Dynamic S&R</strong> — Moving averages that act as support/resistance. The 200 MA is the most watched.</p>
<p><strong>Fibonacci Levels</strong> — 38.2%, 50%, 61.8% retracements. Widely watched by traders globally.</p>
<p><strong>Previous Range Highs/Lows</strong> — Yesterday's high/low are critical intraday levels.</p>
<h3>How to Draw Levels Correctly</h3>
<ul>
<li>Use the <em>body</em> of candles as primary reference, wicks secondary</li>
<li>Minimum 2 touches to confirm a level, 3+ for high confidence</li>
<li>Think in <em>zones</em> not exact prices (±5-10 pips buffer)</li>
<li>Higher timeframe levels > lower timeframe levels in importance</li>
</ul>
<h3>The Role Reversal (Most Powerful Concept)</h3>
<div class="callout"><strong>Support broken becomes Resistance. Resistance broken becomes Support.</strong> When price breaks above resistance, that level now acts as support on the pullback. The "retest" of a broken level is one of the highest probability trade setups in all of technical analysis. Wait for the retest!</div>
<h3>Confluence = Higher Probability</h3>
<p>The best trades have multiple factors aligning at one level:</p>
<ul>
<li>Horizontal S&R + Fibonacci 61.8% + MA200 = very strong setup</li>
<li>Horizontal S&R + round number + previous day high = strong setup</li>
<li>More confluence factors = higher probability = take the trade</li>
</ul>`,
      },
      {id:'trend-analysis',title:'Trend Analysis & Market Structure',emoji:'📈',mins:15,xp:150,
       content:`<h3>The Most Important Concept in Trading</h3>
<p>"The trend is your friend" is not just a cliché — it's a mathematical fact. Trading WITH the trend is the highest-probability approach in any market.</p>
<h3>Defining a Trend</h3>
<p><strong>Uptrend (Bullish):</strong> Series of Higher Highs (HH) and Higher Lows (HL). Each peak is higher than the last. Each trough is higher than the last.</p>
<p><strong>Downtrend (Bearish):</strong> Series of Lower Lows (LL) and Lower Highs (LH). Each trough is lower than the last. Each peak is lower than the last.</p>
<p><strong>Range/Consolidation:</strong> Price moves sideways between horizontal support and resistance.</p>
<h3>Market Structure Concepts (Advanced)</h3>
<p><strong>Break of Structure (BOS)</strong> — When price breaks a significant previous high (in uptrend) or low (in downtrend), confirming trend continuation. This is a <em>momentum signal</em>.</p>
<p><strong>Change of Character (CHOCH)</strong> — When price breaks structure <em>against</em> the trend direction. First sign of potential reversal. Example: in an uptrend, price fails to make a higher high and then breaks below the last higher low = CHOCH.</p>
<p><strong>Liquidity Sweep</strong> — Price briefly moves beyond a key level to grab stop orders, then reverses sharply. A fake breakout followed by a strong reversal.</p>
<h3>Multi-Timeframe Analysis</h3>
<table>
<tr><th>Timeframe</th><th>Purpose</th><th>Weight</th></tr>
<tr><td>Monthly/Weekly</td><td>Define macro trend bias</td><td>Highest</td></tr>
<tr><td>Daily/H4</td><td>Key levels, swing structure</td><td>High</td></tr>
<tr><td>H1/M30</td><td>Entry setup identification</td><td>Medium</td></tr>
<tr><td>M15/M5</td><td>Precise entry timing</td><td>Low</td></tr>
</table>
<p><strong>Rule:</strong> Only take trades in the direction of the higher timeframe trend. Never fight the trend on a lower timeframe unless the higher timeframe has clearly reversed.</p>
<h3>Trendlines</h3>
<p>Connect swing lows for uptrends, swing highs for downtrends. Minimum 2 touch points — 3+ confirms strength. A trendline break can signal a potential reversal but always wait for confirmation.</p>
<div class="callout"><strong>Top-Down Analysis Workflow:</strong> Monthly → Weekly → Daily → H4 → H1 → M15. Each timeframe gives context to the one below it. Before entering any trade, you should know the trend on at least 3 timeframes.</div>`,
      },
      {id:'moving-averages',title:'Moving Averages',emoji:'〰️',mins:12,xp:120,
       content:`<h3>The Trader's Most Versatile Tool</h3>
<p>Moving averages (MAs) smooth price action, revealing the underlying trend and acting as dynamic support/resistance. They're the most widely used indicators globally.</p>
<h3>SMA vs EMA — Which is Better?</h3>
<div class="stat-grid" style="margin:10px 0">
<div class="stat-box"><div style="font-weight:700;font-family:var(--display);color:var(--blue);margin-bottom:4px">SMA (Simple MA)</div><div style="font-size:12px;color:var(--text2)">Equal weight to all periods. Slower to react. Less noise. Better for S&R identification on H4/D1.</div></div>
<div class="stat-box"><div style="font-weight:700;font-family:var(--display);color:var(--orange);margin-bottom:4px">EMA (Exponential MA)</div><div style="font-size:12px;color:var(--text2)">More weight to recent prices. Faster response. More signals (more false ones too). Better for active entries on H1/H4.</div></div>
</div>
<div class="card" style="padding:10px;margin:8px 0"><div class="mono" style="font-size:12px;color:var(--gold)">SMA(20) = Sum of last 20 closes ÷ 20<br>EMA uses recursive formula weighting recent prices more</div></div>
<h3>The Key MA Levels Every Trader Watches</h3>
<table>
<tr><th>MA</th><th>Use</th><th>Best For</th></tr>
<tr><td><strong>EMA 9/10</strong></td><td>Very short-term momentum</td><td>Scalping, fast moves</td></tr>
<tr><td><strong>EMA 21</strong></td><td>Short-term trend, pullback entry</td><td>Swing trading</td></tr>
<tr><td><strong>SMA 50</strong></td><td>Medium-term trend indicator</td><td>Intraday to swing</td></tr>
<tr><td><strong>SMA 100</strong></td><td>Strong trend filter</td><td>All timeframes</td></tr>
<tr><td><strong>SMA 200</strong></td><td>The king — major trend/S&R</td><td>All traders</td></tr>
</table>
<h3>The Golden Cross & Death Cross</h3>
<p><strong>Golden Cross</strong> — 50 MA crosses ABOVE 200 MA = long-term bullish signal. Historically one of the most reliable macro signals.</p>
<p><strong>Death Cross</strong> — 50 MA crosses BELOW 200 MA = long-term bearish signal.</p>
<h3>MAs as Dynamic S&R</h3>
<p>In a strong uptrend, price often pulls back to the 21 EMA or 50 MA before continuing higher. This creates excellent, predictable entry opportunities with tight stop losses.</p>
<p><strong>The 3 MA System:</strong> EMA9 > EMA21 > SMA50 (all sloping up) = strong uptrend. All aligned = highest probability environment for longs.</p>
<div class="callout"><strong>Don't over-MA your chart.</strong> 2-3 MAs maximum. The best traders often use just one (e.g., the 21 EMA) and master it completely. More lines = more confusion.</div>`,
      },
      {id:'indicators',title:'Key Indicators Deep Dive',emoji:'🔭',mins:18,xp:180,
       content:`<h3>Indicators: Tools, Not Oracles</h3>
<p>Indicators are mathematical calculations of price and/or volume. They ALWAYS lag price because they're calculated from past data. Never trade indicators blindly — use them as confirmation, not direction.</p>
<h3>RSI (Relative Strength Index)</h3>
<p>Invented by J. Welles Wilder. Oscillates 0-100, measuring momentum speed and change.</p>
<ul>
<li><strong>RSI > 70</strong> = Overbought (potential reversal down — but can stay overbought for hours in strong trends)</li>
<li><strong>RSI < 30</strong> = Oversold (potential reversal up)</li>
<li><strong>RSI 50 Line</strong> = Trend filter. Above 50 = bullish bias. Below 50 = bearish bias.</li>
<li><strong>Bearish Divergence</strong> = Price makes new high, RSI makes lower high → weakening momentum</li>
<li><strong>Bullish Divergence</strong> = Price makes new low, RSI makes higher low → bearish exhaustion</li>
</ul>
<p>Best settings: <strong>RSI 14</strong> (default), RSI 7 (faster, more signals), RSI 21 (slower, fewer false signals)</p>
<h3>MACD (Moving Average Convergence Divergence)</h3>
<p>Created by Gerald Appel. Shows both trend direction AND momentum in one indicator.</p>
<ul>
<li>MACD Line = 12 EMA − 26 EMA</li>
<li>Signal Line = 9 EMA of the MACD line</li>
<li>Histogram = MACD − Signal (shows momentum strength)</li>
<li><strong>MACD crosses above Signal</strong> = Buy signal</li>
<li><strong>MACD crosses below Signal</strong> = Sell signal</li>
<li><strong>MACD above zero</strong> = Bullish overall trend</li>
<li>Divergence between MACD and price = powerful reversal warning</li>
</ul>
<h3>Bollinger Bands</h3>
<p>John Bollinger's invention. Shows volatility with a channel around price.</p>
<ul>
<li>Middle Band = 20 SMA</li>
<li>Upper Band = 20 SMA + 2 standard deviations</li>
<li>Lower Band = 20 SMA − 2 standard deviations</li>
<li><strong>BB Squeeze</strong> = Bands narrow = low volatility = big move coming soon</li>
<li><strong>BB Expansion</strong> = Bands widen = high volatility, trend underway</li>
<li>Price touching outer band = extended, but NOT always a reversal signal</li>
</ul>
<h3>Stochastic Oscillator</h3>
<p>Compares closing price to price range over a period. Settings: K=5, D=3, Slowing=3 for active trading.</p>
<ul><li>Above 80 = Overbought | Below 20 = Oversold</li><li>%K crossing above %D = buy signal (best in oversold zone)</li></ul>
<h3>ATR (Average True Range)</h3>
<p>Measures volatility. Higher ATR = bigger moves expected. Use to:</p>
<ul><li>Set stop losses (e.g., 1.5× ATR as stop)</li><li>Determine if a move is "significant"</li><li>Avoid trading when ATR is extremely low (dead markets)</li></ul>
<h3>Fibonacci Retracement</h3>
<p>Based on the golden ratio (1.618). Key levels: 23.6%, 38.2%, 50%, 61.8% (golden ratio), 78.6%</p>
<p>Draw from swing low to high (uptrend) or high to low (downtrend). Price retraces to these levels before continuing — the 61.8% "golden pocket" is most respected globally.</p>
<div class="callout"><strong>Less is more.</strong> Pick 2-3 indicators. Master them. Beginners with 10 indicators are more confused, not more informed. The best price action traders use zero indicators — just price and volume.</div>`,
      },
      {id:'chart-patterns',title:'Chart Patterns Masterclass',emoji:'🔷',mins:16,xp:160,
       content:`<h3>Chart Patterns: The Market's Recurring Language</h3>
<p>Chart patterns are visual formations that repeat across markets and timeframes. They represent the battle between buyers and sellers, with predictable outcomes based on who wins.</p>
<h3>Continuation Patterns (Trend Resumes)</h3>
<p><strong>📐 Bull/Bear Flag</strong> — Strong move (flagpole), brief consolidation in a narrow channel (flag), then continuation. Entry: breakout of the flag. Target = flagpole length. One of the highest-probability patterns.</p>
<p><strong>🔺 Ascending Triangle</strong> — Flat resistance top + rising support. Buyers getting more aggressive. Bullish breakout above flat resistance. Target = height of triangle.</p>
<p><strong>🔻 Descending Triangle</strong> — Flat support bottom + falling resistance. Sellers getting more aggressive. Bearish breakdown below flat support.</p>
<p><strong>△ Symmetrical Triangle</strong> — Converging trendlines. Market undecided. Breakout in either direction — trade the break.</p>
<p><strong>◇ Pennant</strong> — Like a flag but triangular consolidation. Short-term pause in strong trend.</p>
<h3>Reversal Patterns (Trend Changes)</h3>
<p><strong>👑 Head & Shoulders</strong> — 3 peaks: left shoulder, head (highest), right shoulder. Neckline = line through the two troughs. Break below neckline = entry. Target = head-to-neckline height projected downward. One of the most reliable reversal patterns.</p>
<p><strong>🙃 Inverse Head & Shoulders</strong> — Opposite of above. Bullish reversal at bottoms.</p>
<p><strong>⬇️⬇️ Double Top</strong> — Two equal highs at resistance. Break of middle low (neckline) = entry. Bearish reversal.</p>
<p><strong>⬆️⬆️ Double Bottom</strong> — Two equal lows at support. Break of middle high = entry. Bullish reversal (W pattern).</p>
<p><strong>🍽️ Cup & Handle</strong> — Long rounding bottom (cup) + short consolidation (handle). Bullish continuation. Target = cup depth projected up from handle breakout.</p>
<h3>How to Trade Patterns Correctly</h3>
<ul>
<li><strong>Wait for confirmation</strong> — Always wait for a close beyond the pattern boundary</li>
<li><strong>Trade the retest</strong> — After breakout, wait for retest of broken level (lower risk entry)</li>
<li><strong>Measure the target</strong> — Every pattern has a measurable price objective</li>
<li><strong>Accept failures</strong> — Even the best patterns fail 40-50% of the time</li>
</ul>
<div class="callout"><strong>Patterns fail — that's normal.</strong> If you use 1:3 R:R and patterns succeed 45% of the time, you're still highly profitable. The math works in your favor even with a sub-50% win rate.</div>`,
      },
    ]
  },
  {
    id:'risk-management',title:'Risk Management',emoji:'🛡️',
    desc:'The skill that keeps you alive in trading. Master this before anything else.',
    color:'var(--red)',
    lessons:[
      {id:'the-1percent-rule',title:'The 1% Rule & Position Sizing',emoji:'💯',mins:14,xp:140,
       content:`<h3>The Single Most Important Rule</h3>
<p>Ask any consistently profitable professional trader their #1 rule. The answer is always some version of <strong>risk management first</strong>. You can have a 40% win rate and still be highly profitable with correct sizing.</p>
<h3>The 1-2% Rule</h3>
<div class="card card-gold" style="padding:16px;margin:12px 0;text-align:center"><div style="font-family:var(--display);font-size:22px;color:var(--gold);font-weight:800">NEVER RISK MORE THAN 1-2%<br>PER TRADE</div><div style="font-size:13px;color:var(--text2);margin-top:8px">of your total account balance</div></div>
<h3>The Mathematics of Survival</h3>
<table>
<tr><th>Risk/Trade</th><th>20 Consecutive Losses</th><th>Recovery Needed</th></tr>
<tr><td style="color:var(--green)">1%</td><td style="color:var(--green)">-18% drawdown</td><td style="color:var(--green)">+22%</td></tr>
<tr><td style="color:var(--gold)">2%</td><td style="color:var(--gold)">-33% drawdown</td><td style="color:var(--gold)">+50%</td></tr>
<tr><td style="color:var(--orange)">5%</td><td style="color:var(--orange)">-64% drawdown</td><td style="color:var(--orange)">+180%</td></tr>
<tr><td style="color:var(--red)">10%</td><td style="color:var(--red)">-87% drawdown</td><td style="color:var(--red)">+700%!</td></tr>
</table>
<p>20 consecutive losses is rare but possible. Professional traders build systems that survive worst-case scenarios.</p>
<h3>Position Sizing Formula</h3>
<div class="card card-gold" style="padding:14px"><div class="mono" style="color:var(--gold);font-size:13px">Lots = (Account Balance × Risk%) ÷ (Stop Loss pips × Pip Value)</div><div style="margin-top:12px;font-size:13px;color:var(--text2)"><strong>Example:</strong> $5,000 account, 1% risk ($50), 25 pip SL, standard EUR/USD ($10/pip/standard lot):<br>Lots = $50 ÷ (25 × $10) = $50 ÷ $250 = <strong style="color:var(--gold)">0.20 standard lots (2 mini lots)</strong></div></div>
<h3>Risk/Reward — The Other Half</h3>
<p>Always set your Take Profit BEFORE you enter. Minimum 1:2 R:R (risk $1 to make $2).</p>
<div class="card card-green" style="padding:12px;margin:10px 0"><div class="section-label">Profitability with 1:2 R:R at 50% win rate</div><div style="font-size:13px;color:var(--text2)">10 trades: 5 wins × +$200 = +$1,000<br>5 losses × -$100 = -$500<br><strong style="color:var(--green)">Net: +$500 on $5,000 = +10% ✅</strong></div></div>
<div class="callout"><strong>Use the Calculator tab</strong> to automatically calculate the correct lot size for every trade. Make this a non-negotiable habit before every single trade you enter.</div>`,
      },
      {id:'drawdown-recovery',title:'Drawdown & Recovery Psychology',emoji:'📉',mins:10,xp:100,
       content:`<h3>Understanding Drawdown</h3>
<p>Drawdown is the decline from your account peak to its current trough. It's measured in percentage terms. <strong>Every professional trader experiences significant drawdowns</strong> — the difference is how they manage them.</p>
<h3>The Brutal Mathematics of Recovery</h3>
<table>
<tr><th>Drawdown</th><th>To Recover</th><th>What Happened</th></tr>
<tr><td>-10%</td><td style="color:var(--green)">+11.1%</td><td>10 bad trades at 1% risk</td></tr>
<tr><td>-20%</td><td style="color:var(--gold)">+25%</td><td>20 bad trades</td></tr>
<tr><td>-30%</td><td style="color:var(--orange)">+42.9%</td><td>2-3 bad weeks</td></tr>
<tr><td>-50%</td><td style="color:var(--red)">+100%</td><td>Trading without plan</td></tr>
<tr><td>-80%</td><td style="color:var(--red)">+400%</td><td>Account almost gone</td></tr>
</table>
<h3>Drawdown Management Rules</h3>
<ul>
<li><strong>Daily limit: -3% to -5%</strong> — Stop trading completely for the day</li>
<li><strong>Weekly limit: -5% to -8%</strong> — Reduce position size by 50%</li>
<li><strong>Monthly limit: -10%</strong> — Pause, review all trades, fix issues</li>
<li><strong>Max drawdown: -20-25%</strong> — Complete stop. Full system review required.</li>
</ul>
<h3>The Drawdown Mindset</h3>
<p>When in a drawdown:</p>
<ul>
<li>✅ Reduce position size by 50% immediately</li>
<li>✅ Review your last 20 trades for pattern errors</li>
<li>✅ Switch to demo for a week while you diagnose the issue</li>
<li>✅ Ask: Am I deviating from my plan? Am I revenge trading?</li>
<li>❌ Do NOT increase position size to "recover faster" — classic blow-up pattern</li>
<li>❌ Do NOT change strategy every few losing trades</li>
</ul>
<div class="callout"><strong>Drawdowns are tuition fees.</strong> Every great trader has had a bad drawdown. What separates survivors from those who quit is how they respond. Preserve capital — it's your most valuable asset.</div>`,
      },
      {id:'risk-reward',title:'Risk/Reward & Expectancy Math',emoji:'⚡',mins:11,xp:110,
       content:`<h3>The Math That Makes Trading Profitable</h3>
<p>Most beginners obsess over win rate. Professionals focus on <strong>expectancy</strong> — the expected profit per dollar risked over many trades.</p>
<h3>Expectancy Formula</h3>
<div class="card card-gold" style="padding:14px;text-align:center"><div class="mono" style="color:var(--gold);font-size:14px">E = (Win% × Avg Win) − (Loss% × Avg Loss)</div><div style="font-size:12px;color:var(--text2);margin-top:8px">Positive expectancy = profitable system regardless of individual trade outcomes</div></div>
<h3>Win Rate vs R:R Matrix</h3>
<table>
<tr><th>Win Rate</th><th>1:1 R:R</th><th>1:2 R:R</th><th>1:3 R:R</th><th>1:5 R:R</th></tr>
<tr><td>30%</td><td style="color:var(--red)">-$40</td><td style="color:var(--red)">-$10</td><td style="color:var(--green)">+$20</td><td style="color:var(--green)">+$80</td></tr>
<tr><td>40%</td><td style="color:var(--red)">-$20</td><td style="color:var(--green)">+$20</td><td style="color:var(--green)">+$60</td><td style="color:var(--green)">+$140</td></tr>
<tr><td>50%</td><td style="color:var(--orange)">$0</td><td style="color:var(--green)">+$50</td><td style="color:var(--green)">+$100</td><td style="color:var(--green)">+$200</td></tr>
<tr><td>60%</td><td style="color:var(--green)">+$20</td><td style="color:var(--green)">+$80</td><td style="color:var(--green)">+$140</td><td style="color:var(--green)">+$260</td></tr>
</table>
<p style="font-size:11px;color:var(--text3)">Values = profit/loss per 100 trades risking $1 each</p>
<h3>Minimum Win Rates for Profitability</h3>
<ul>
<li>1:1 R:R → Need >50% win rate</li>
<li>1:2 R:R → Need >34% win rate</li>
<li>1:3 R:R → Need >26% win rate</li>
<li>1:5 R:R → Need >17% win rate</li>
</ul>
<div class="callout"><strong>Key insight:</strong> A trader with 1:3 R:R who is right only 30% of the time makes money. Quality setups with high R:R are far more valuable than forcing "easy" trades with low R:R. Be selective. Be patient. Let the trade come to you.</div>`,
      },
    ]
  },
  {
    id:'trading-psychology',title:'Trading Psychology',emoji:'🧠',
    desc:'90% of trading is mental. Master your mind to master the markets.',
    color:'var(--purple)',
    lessons:[
      {id:'emotions-trading',title:'Fear, Greed & Emotions',emoji:'😤',mins:15,xp:150,
       content:`<h3>The Psychological Edge Is the Biggest Edge</h3>
<p>You can have the best strategy in the world and still blow your account if your emotions override your rules. Trading is a performance activity — like professional sport — and your mental state directly determines your results.</p>
<h3>The Two Enemies: Fear & Greed</h3>
<div class="stat-grid" style="margin:10px 0">
<div class="stat-box card-red"><div style="color:var(--red);font-weight:700;font-family:var(--display);font-size:15px;margin-bottom:6px">😨 FEAR</div><ul style="font-size:12px;color:var(--text2)"><li>FOMO — entering late, chasing moves</li><li>Cutting winners too early</li><li>Hesitating on valid setups</li><li>Moving TP closer out of fear</li><li>Not trading at all (paralysis)</li></ul></div>
<div class="stat-box card-gold"><div style="color:var(--gold);font-weight:700;font-family:var(--display);font-size:15px;margin-bottom:6px">🤑 GREED</div><ul style="font-size:12px;color:var(--text2)"><li>Oversizing positions</li><li>Moving TP further constantly</li><li>Revenge trading after losses</li><li>Overtrading — forcing entries</li><li>Not taking profit when obvious</li></ul></div>
</div>
<h3>The 7 Cognitive Biases That Kill Traders</h3>
<p><strong>Confirmation Bias</strong> — Only seeing information that confirms your bias. Fix: actively look for reasons NOT to take the trade.</p>
<p><strong>Recency Bias</strong> — Weighting recent events too much. After 5 wins: overconfidence and oversizing. After 5 losses: paralysis and self-doubt.</p>
<p><strong>Loss Aversion</strong> — Losses feel 2× more painful than equivalent gains feel good. Causes holding losers too long and cutting winners early.</p>
<p><strong>Overconfidence Bias</strong> — "I've traded 3 months and have a system." Leads to reckless risk-taking after a winning streak.</p>
<p><strong>Anchoring</strong> — Fixating on your entry price. The market doesn't care where you entered.</p>
<p><strong>Gambler's Fallacy</strong> — After 5 losses: "I'm due a win." After 5 wins: "I can't lose now." Every trade has the same probability regardless of history.</p>
<p><strong>Sunk Cost Fallacy</strong> — "I've held this losing trade for 3 days, I can't close it now." The time already lost is irrelevant. Close bad trades immediately.</p>
<h3>The Revenge Trade Cycle</h3>
<div class="card card-red" style="padding:12px"><div style="font-size:13px;color:var(--text2)">Loss → Anger/frustration → Larger position to recover → Another loss → More anger → Even larger position → Account destruction</div></div>
<div class="callout"><strong>The Rule:</strong> After 2 consecutive losses, STOP trading for the day. Close your platform. Go for a walk. Return tomorrow with a clear head. This single rule prevents revenge trading.</div>`,
      },
      {id:'discipline-rules',title:'Trading Discipline & The Plan',emoji:'📜',mins:13,xp:130,
       content:`<h3>The Gap Between Knowing and Doing</h3>
<p>The biggest problem most traders have isn't knowledge — they <em>know</em> to use stop losses, they <em>know</em> to follow their plan. The problem is execution under pressure, when real money is on the line.</p>
<h3>Your Pre-Trade Checklist</h3>
<div class="card" style="padding:14px;margin:10px 0">
<p style="font-weight:600;font-family:var(--display);margin-bottom:10px;color:var(--gold)">Before EVERY Trade — No Exceptions:</p>
<div style="font-size:13px;display:flex;flex-direction:column;gap:8px;color:var(--text2)">
<label style="display:flex;align-items:flex-start;gap:8px;cursor:pointer"><input type="checkbox" style="margin-top:2px;accent-color:var(--gold);flex-shrink:0"> <span>✅ Setup matches my strategy criteria exactly</span></label>
<label style="display:flex;align-items:flex-start;gap:8px;cursor:pointer"><input type="checkbox" style="margin-top:2px;accent-color:var(--gold);flex-shrink:0"> <span>✅ Stop loss at a logical level (not random pips)</span></label>
<label style="display:flex;align-items:flex-start;gap:8px;cursor:pointer"><input type="checkbox" style="margin-top:2px;accent-color:var(--gold);flex-shrink:0"> <span>✅ Position size calculated — max 1-2% risk</span></label>
<label style="display:flex;align-items:flex-start;gap:8px;cursor:pointer"><input type="checkbox" style="margin-top:2px;accent-color:var(--gold);flex-shrink:0"> <span>✅ R:R is minimum 1:2</span></label>
<label style="display:flex;align-items:flex-start;gap:8px;cursor:pointer"><input type="checkbox" style="margin-top:2px;accent-color:var(--gold);flex-shrink:0"> <span>✅ I am emotionally calm — not angry, fearful, or greedy</span></label>
<label style="display:flex;align-items:flex-start;gap:8px;cursor:pointer"><input type="checkbox" style="margin-top:2px;accent-color:var(--gold);flex-shrink:0"> <span>✅ No high-impact news in the next 30 minutes</span></label>
<label style="display:flex;align-items:flex-start;gap:8px;cursor:pointer"><input type="checkbox" style="margin-top:2px;accent-color:var(--gold);flex-shrink:0"> <span>✅ HTF trend aligns with my entry direction</span></label>
</div>
</div>
<h3>Building Your Trading Plan</h3>
<p>A trading plan is your business plan for trading. It removes emotion by defining rules in advance, before you have money on the line.</p>
<ul>
<li><strong>Universe:</strong> Which pairs/instruments you trade (specialise — max 3-5)</li>
<li><strong>Timeframes:</strong> Your analysis TF and your entry TF</li>
<li><strong>Entry rules:</strong> Exact criteria (not vague — "when I feel it's good" is not a rule)</li>
<li><strong>Exit rules:</strong> Where exactly is your SL and TP, and why</li>
<li><strong>Risk rules:</strong> Max risk per trade, daily/weekly loss limits</li>
<li><strong>Session rules:</strong> Which hours you trade, which you avoid</li>
<li><strong>Drawdown response:</strong> What you do when losing (reduce size, stop, review)</li>
</ul>
<div class="callout"><strong>Process over outcome.</strong> Judge every trade on whether you followed your rules — NOT on whether it won or lost. A perfectly executed losing trade is a success. A poorly executed winning trade is a failure. This mindset shift is transformative.</div>`,
      },
      {id:'trading-mindset',title:'The Professional Trader Mindset',emoji:'🏆',mins:14,xp:140,
       content:`<h3>What Separates Pros from Amateurs</h3>
<p>It's not IQ. It's not advanced strategies. It's not secret indicators. It's <strong>consistent execution of fundamentals, and the mental framework to handle uncertainty.</strong></p>
<h3>Amateur vs Professional: A Comparison</h3>
<table>
<tr><th>Amateur Thinks</th><th>Professional Thinks</th></tr>
<tr><td style="color:var(--red)">I need to win this trade</td><td style="color:var(--green)">I need to execute correctly</td></tr>
<tr><td style="color:var(--red)">This setup looks perfect, I'll size up</td><td style="color:var(--green)">Same size, same rules, always</td></tr>
<tr><td style="color:var(--red)">I'll move my stop — it'll come back</td><td style="color:var(--green)">My stop is my plan. I honor it.</td></tr>
<tr><td style="color:var(--red)">I can't close at a loss</td><td style="color:var(--green)">Quick losses are cheap lessons</td></tr>
<tr><td style="color:var(--red)">3 losses in a row — I need to trade more</td><td style="color:var(--green)">3 losses — I take a break</td></tr>
<tr><td style="color:var(--red)">The market is against me</td><td style="color:var(--green)">The market is neutral. I adapt.</td></tr>
<tr><td style="color:var(--red)">I'll recover with one big trade</td><td style="color:var(--green)">Slow, consistent growth always wins</td></tr>
</table>
<h3>The Probability Mindset</h3>
<p>The most important shift: <strong>stop thinking in individual trades and start thinking in distributions of trades.</strong></p>
<p>A flipped coin is 50/50. If it lands heads 5 times in a row, what's the probability of heads on flip 6? Still 50/50. The coin has no memory.</p>
<p>Trading is the same. After 5 losses, your next trade has the same probability as always. After 5 wins, the same. Each trade is independent. Manage the system, not the individual outcomes.</p>
<h3>The Daily Habits of Successful Traders</h3>
<ul>
<li>🌅 <strong>Pre-market</strong> — Review overnight price action, check economic calendar, mark key levels for the day</li>
<li>📋 <strong>Pre-trade</strong> — Complete the checklist. No exceptions.</li>
<li>📓 <strong>Post-trade</strong> — Journal every trade with screenshot</li>
<li>🌆 <strong>End of day</strong> — Review open positions, check news for tomorrow</li>
<li>🗓️ <strong>End of week</strong> — Analyze all trades. Find patterns. What worked? What didn't?</li>
<li>💪 <strong>Non-trading habits</strong> — Exercise, sleep (7-8 hrs), nutrition. Your brain is your tool.</li>
</ul>
<div class="callout"><strong>Trading mastery is a journey of 2-5 years.</strong> The traders who make it are not the smartest or most educated — they're the most patient, most disciplined, and most willing to learn from every single trade. You're on the right path.</div>`,
      },
    ]
  },
  {
    id:'fundamental-analysis',title:'Fundamental Analysis',emoji:'📰',
    desc:'Trade the economic big picture. Understand why currencies really move.',
    color:'var(--orange)',
    lessons:[
      {id:'economic-calendar',title:'Economic Calendar Mastery',emoji:'🗓️',mins:13,xp:130,
       content:`<h3>The Economic Calendar: Your Trading Bible</h3>
<p>Fundamental analysis means trading the economic data and events that drive currency values. High-impact news can move markets 50-300 pips in seconds — both for and against your position.</p>
<h3>Impact Levels</h3>
<ul>
<li>🔴 <strong>High Impact</strong> — Major market movers. Close positions 30 min before, or have a strategy.</li>
<li>🟡 <strong>Medium Impact</strong> — Notable but usually smaller moves. Monitor carefully.</li>
<li>🟢 <strong>Low Impact</strong> — Minimal effect on markets typically.</li>
</ul>
<h3>The 10 Most Market-Moving Events</h3>
<p>1. <strong>FOMC Rate Decision & Press Conference</strong> — 8 times/year. Biggest USD mover. Powell's words matter as much as the decision.</p>
<p>2. <strong>NFP (Non-Farm Payrolls)</strong> — First Friday each month. 300+ pip moves common on USD pairs. 30-min blackout recommended.</p>
<p>3. <strong>CPI (Consumer Price Index)</strong> — Monthly inflation data. Directly affects rate expectations. Massive market reaction.</p>
<p>4. <strong>GDP Data</strong> — Quarterly. Major economic health indicator.</p>
<p>5. <strong>Central Bank Rate Decisions</strong> — ECB, BOE, BOJ, RBA, RBNZ. Massive movers for their respective currencies.</p>
<p>6. <strong>PMI (Purchasing Managers Index)</strong> — Above 50 = expansion, below 50 = contraction. Monthly leading indicator.</p>
<p>7. <strong>Retail Sales</strong> — Consumer spending = 70% of US GDP. Important USD driver.</p>
<p>8. <strong>Unemployment Claims</strong> — Weekly US data. Less dramatic but consistent market mover.</p>
<p>9. <strong>Trade Balance</strong> — Surplus/deficit in goods and services. Affects currency supply/demand.</p>
<p>10. <strong>Central Bank Speeches</strong> — Fed Chair, ECB President etc. Forward guidance moves markets.</p>
<h3>Trading News Events — 3 Strategies</h3>
<p><strong>Strategy 1: Avoid entirely</strong> — Close all positions 30 min before. Best for beginners. Zero risk from news.</p>
<p><strong>Strategy 2: Trade the aftermath</strong> — Wait 2-5 minutes after release, let initial spike settle, then trade the direction of the sustained move.</p>
<p><strong>Strategy 3: Fade the spike</strong> — If initial move is extreme and quickly reverses, trade against the spike. High risk, high reward. Advanced only.</p>
<div class="callout"><strong>⚡ Spread Warning:</strong> Spreads on EUR/USD can jump from 1 pip to 20+ pips during major news events. This can trigger your stop loss even if price "goes your way" at the news. Check spreads on your broker's demo first.</div>`,
      },
      {id:'central-banks',title:'Central Banks & Monetary Policy',emoji:'🏦',mins:12,xp:120,
       content:`<h3>The True Market Movers</h3>
<p>Central banks are the most powerful entities in financial markets. A single sentence in a central bank statement can move a currency 200 pips instantly. Understanding their language and policy cycles is essential for any serious trader.</p>
<h3>The Major Central Banks</h3>
<table>
<tr><th>Central Bank</th><th>Currency</th><th>Meets</th><th>Key Tool</th></tr>
<tr><td><strong>Federal Reserve (Fed)</strong></td><td class="mono" style="color:var(--gold)">USD</td><td>8×/year</td><td>Fed Funds Rate</td></tr>
<tr><td><strong>European Central Bank (ECB)</strong></td><td class="mono" style="color:var(--gold)">EUR</td><td>8×/year</td><td>Deposit Facility Rate</td></tr>
<tr><td><strong>Bank of England (BOE)</strong></td><td class="mono" style="color:var(--gold)">GBP</td><td>8×/year</td><td>Bank Rate</td></tr>
<tr><td><strong>Bank of Japan (BOJ)</strong></td><td class="mono" style="color:var(--gold)">JPY</td><td>8×/year</td><td>Short-term Rate + YCC</td></tr>
<tr><td><strong>Swiss National Bank (SNB)</strong></td><td class="mono" style="color:var(--gold)">CHF</td><td>4×/year</td><td>Policy Rate</td></tr>
<tr><td><strong>Reserve Bank of Australia (RBA)</strong></td><td class="mono" style="color:var(--gold)">AUD</td><td>11×/year</td><td>Cash Rate</td></tr>
<tr><td><strong>Bank of Canada (BOC)</strong></td><td class="mono" style="color:var(--gold)">CAD</td><td>8×/year</td><td>Overnight Rate</td></tr>
</table>
<h3>Hawkish vs Dovish</h3>
<div class="stat-grid" style="margin:10px 0">
<div class="stat-box card-green"><div style="color:var(--green);font-weight:700;font-family:var(--display)">🦅 HAWKISH</div><p style="font-size:12px;color:var(--text2);margin-top:4px">Signals rate hikes or tight policy. Reduces money supply. <strong style="color:var(--green)">Currency strengthens.</strong></p></div>
<div class="stat-box card-red"><div style="color:var(--red);font-weight:700;font-family:var(--display)">🕊️ DOVISH</div><p style="font-size:12px;color:var(--text2);margin-top:4px">Signals rate cuts or loose policy. Expands money supply. <strong style="color:var(--red)">Currency weakens.</strong></p></div>
</div>
<h3>Interest Rate Differentials</h3>
<p>The difference in interest rates between two countries is one of the most powerful long-term drivers of currency values. If the US rate is 5.25% and Japan's is 0.1%, capital flows to USD for better returns → USD/JPY trends higher.</p>
<h3>Quantitative Easing (QE) vs Tightening (QT)</h3>
<p><strong>QE:</strong> Central bank buys assets (bonds), injecting money into economy. Expansionary = bearish for currency.</p>
<p><strong>QT:</strong> Sells assets, removing money from economy. Contractionary = bullish for currency.</p>
<div class="callout"><strong>Pro tip:</strong> Don't wait for the actual rate decision — watch for "forward guidance" in speeches and minutes. Markets price in expected rate changes weeks or months in advance. By the time the decision comes, it's often "buy the rumour, sell the fact."</div>`,
      },
      {id:'macro-drivers',title:'Macro Drivers of Currency Value',emoji:'🌏',mins:11,xp:110,
       content:`<h3>What Really Moves Currencies Long-Term</h3>
<p>Beyond short-term news, currencies are driven by fundamental economic forces. Understanding these gives you a long-term directional bias for your trades.</p>
<h3>The Big 6 Macro Drivers</h3>
<p><strong>1. Interest Rate Differentials</strong> — The most powerful driver. Higher rate = more attractive = stronger currency. Watch central bank meetings and CPI data as leading indicators.</p>
<p><strong>2. Economic Growth (GDP)</strong> — Faster-growing economy = more investment inflows = stronger currency. Quarterly GDP surprises can create multi-week trends.</p>
<p><strong>3. Inflation</strong> — Moderate inflation = healthy economy = can support higher rates = bullish. Hyperinflation = currency collapse. Deflation = weak economy = bearish.</p>
<p><strong>4. Employment</strong> — High employment = strong consumer spending = economic strength = bullish currency. NFP and unemployment claims tell this story monthly/weekly.</p>
<p><strong>5. Trade Balance</strong> — Trade surplus (exports > imports) = more demand for local currency = bullish. Countries like Japan with chronic surpluses see structural JPY support.</p>
<p><strong>6. Geopolitical Stability</strong> — Political instability, wars, sanctions = capital flight = currency weakness. Safe haven currencies (USD, CHF, JPY, Gold) strengthen in risk-off periods.</p>
<h3>Risk-On vs Risk-Off</h3>
<p><strong>Risk-On:</strong> Investors buy risky assets (AUD, NZD, emerging markets, stocks). USD, JPY, CHF weaken. Happens when economy is strong and confidence is high.</p>
<p><strong>Risk-Off:</strong> Investors flee to safety (USD, JPY, CHF, Gold). AUD, NZD, EM currencies fall sharply. Happens during crises, recessions, market panic.</p>
<h3>Commodity Currencies</h3>
<p>AUD/USD, NZD/USD, USD/CAD are closely correlated with commodity prices:</p>
<ul><li>AUD — Iron ore, coal, agricultural exports</li><li>CAD — Oil prices (Canada = major oil exporter)</li><li>NZD — Agricultural prices (dairy)</li></ul>
<div class="callout"><strong>Practical application:</strong> Before taking a swing trade, check the fundamental picture. Are you trading WITH or AGAINST the fundamental trend? Trading in the direction of fundamental momentum significantly increases probability of success.</div>`,
      },
    ]
  },
  {
    id:'trading-sessions',title:'Trading Sessions & Timing',emoji:'🕐',
    desc:'Trade at the right time. The WHEN is as important as the WHERE.',
    color:'var(--cyan)',
    lessons:[
      {id:'session-overview',title:'Global Trading Sessions',emoji:'🌐',mins:11,xp:110,
       content:`<h3>The 24-Hour Forex Clock</h3>
<p>Forex is open 24 hours but not all hours are equal. Volatility, liquidity, and trading opportunity vary dramatically depending on which financial centres are active.</p>
<h3>The Four Major Sessions</h3>
<div class="card" style="padding:14px;margin:10px 0">
<div style="display:flex;flex-direction:column;gap:12px">
<div><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px"><strong style="font-family:var(--display)">🇦🇺 Sydney</strong><span class="pill pill-blue">Low Volume</span></div><div style="font-size:12px;color:var(--text2)"><span class="mono">22:00–07:00 UTC</span> | Best: AUD/USD, AUD/JPY, NZD/USD | Quiet opening of the week</div></div>
<div><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px"><strong style="font-family:var(--display)">🇯🇵 Tokyo/Asia</strong><span class="pill pill-blue">Low–Medium</span></div><div style="font-size:12px;color:var(--text2)"><span class="mono">00:00–09:00 UTC</span> | Best: USD/JPY, EUR/JPY, AUD/JPY | Range-bound often</div></div>
<div><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px"><strong style="font-family:var(--display)">🇬🇧 London</strong><span class="pill pill-green">High Volume ⭐</span></div><div style="font-size:12px;color:var(--text2)"><span class="mono">08:00–17:00 UTC</span> | Best: EUR/USD, GBP/USD, EUR/GBP | Most liquid session</div></div>
<div><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px"><strong style="font-family:var(--display)">🇺🇸 New York</strong><span class="pill pill-green">High Volume ⭐</span></div><div style="font-size:12px;color:var(--text2)"><span class="mono">13:00–22:00 UTC</span> | Best: All USD pairs | NFP, FOMC releases here</div></div>
</div>
</div>
<h3>🔥 London/New York Overlap (13:00–17:00 UTC)</h3>
<div class="card card-gold" style="padding:12px;margin:10px 0"><p style="font-size:13px;color:var(--text2)">This 4-hour window has the <strong>highest volume and tightest spreads</strong> of any trading period. Both major financial centres are active simultaneously. Most major trend moves start or accelerate here. This is when professional traders are most active.</p></div>
<h3>Session Characteristics</h3>
<table>
<tr><th>Session</th><th>Characteristic</th><th>Best Strategy</th></tr>
<tr><td>Asian</td><td>Range-bound, low volatility</td><td>Range trading, carry</td></tr>
<tr><td>London Open</td><td>Strong directional moves</td><td>Breakout of Asian range</td></tr>
<tr><td>London/NY Overlap</td><td>Highest volatility + volume</td><td>Trend following</td></tr>
<tr><td>NY Afternoon</td><td>Quieter, range develops</td><td>Fade extreme moves</td></tr>
<tr><td>Weekend</td><td>Market closed</td><td>Analysis only</td></tr>
</table>
<div class="callout"><strong>Time zone tip:</strong> Add UTC to your phone/computer alongside your local time. Forex uses UTC as the reference standard. All major news releases, session opens, and daily candle closes are measured from UTC (or New York time = UTC-5).</div>`,
      },
      {id:'day-of-week',title:'Day of Week Effects',emoji:'📅',mins:8,xp:80,
       content:`<h3>Not All Days Are Created Equal</h3>
<p>Professional traders know that certain days of the week have higher probability setups, while others are best avoided.</p>
<h3>The Weekly Pattern</h3>
<p><strong>Monday</strong> — Gaps from weekend news. Low volume initially. Markets "finding direction." Avoid trading the open gap blindly. Often a trap day.</p>
<p><strong>Tuesday</strong> — Volume picks up. Usually the first clear directional day. Good for trend trades established Monday.</p>
<p><strong>Wednesday</strong> — Mid-week liquidity. Often the highest volume day. If a trend is developing, Wednesday often has the strongest continuation moves. Watch for FOMC minutes.</p>
<p><strong>Thursday</strong> — Bank of England, ECB meetings often on Thursdays. USD claims data. Still active.</p>
<p><strong>Friday</strong> — NFP first Friday of month = massive volatility. Other Fridays: lower volume as traders square positions for the weekend. Spreads widen into Friday close. <strong>Avoid carrying positions over the weekend.</strong></p>
<h3>Monthly Calendar Awareness</h3>
<ul>
<li><strong>First Friday</strong> — NFP. Don't trade EUR/USD or GBP/USD 30 min before without a strategy.</li>
<li><strong>Mid-month</strong> — CPI data (US, UK, Europe). Major mover.</li>
<li><strong>Month-end</strong> — Institutional rebalancing. Unusual flows. Can reverse trends temporarily.</li>
<li><strong>Quarter-end</strong> — Larger institutional rebalancing. Increased volatility.</li>
</ul>
<div class="callout"><strong>Best days to trade:</strong> Tuesday, Wednesday, Thursday during London/NY overlap. Worst days: Monday morning and Friday afternoon. This alone can improve your win rate by filtering out lower-probability environments.</div>`,
      },
    ]
  },
  {
    id:'trading-calculations',title:'Trading Calculations',emoji:'🧮',
    desc:'Master the numbers. Every profitable trader lives and breathes these calculations.',
    color:'var(--gold)',
    lessons:[
      {id:'key-calculations',title:'Essential Trade Math',emoji:'📊',mins:14,xp:140,
       content:`<h3>The Numbers Every Trader Must Know Automatically</h3>
<p>These calculations should become second nature. Do them before every trade. Use the calculator in the TRADE tab for instant results.</p>
<h3>1. Pip Value Calculation</h3>
<div class="card" style="padding:12px;margin:8px 0"><div class="mono" style="font-size:13px;color:var(--gold)">Pip Value (USD) = (Pip × Lot Size) ÷ Current Rate</div><div style="font-size:12px;color:var(--text2);margin-top:6px">For EUR/USD (USD is quote): Pip Value = 0.0001 × 100,000 = $10/pip (standard lot)<br>For USD/JPY (USD is base): Pip Value = 0.01 × 100,000 ÷ 150 = $6.67/pip</div></div>
<h3>2. Position Size</h3>
<div class="card" style="padding:12px;margin:8px 0"><div class="mono" style="font-size:13px;color:var(--gold)">Lots = Risk Amount ÷ (SL Pips × Pip Value per lot)</div><div style="font-size:12px;color:var(--text2);margin-top:6px">$10,000 account, 1% risk ($100), 40 pip SL, micro lots:<br>$100 ÷ (40 × $0.10) = $100 ÷ $4 = <strong style="color:var(--gold)">25 micro lots</strong></div></div>
<h3>3. Profit & Loss Calculation</h3>
<div class="card" style="padding:12px;margin:8px 0"><div class="mono" style="font-size:13px;color:var(--gold)">P&L = (Close − Open) × Lots × 100,000 ÷ Quote Rate</div><div style="font-size:12px;color:var(--text2);margin-top:6px">Buy EUR/USD 1.0800 → Close 1.0860, 0.5 standard lots:<br>= (1.0860 − 1.0800) × 0.5 × 100,000 ÷ 1.0860<br>= 0.006 × 50,000 ÷ 1.0860 ≈ <strong style="color:var(--green)">$276</strong></div></div>
<h3>4. Swap (Rollover) Calculation</h3>
<div class="card" style="padding:12px;margin:8px 0"><div class="mono" style="font-size:13px;color:var(--gold)">Daily Swap = Lots × Swap Rate (from broker)</div><div style="font-size:12px;color:var(--text2);margin-top:6px">Check broker's swap rates before any multi-day trade. Positive swap = you earn. Negative = you pay.<br>Triple swap on Wednesday night (covers Sat+Sun).</div></div>
<h3>5. Win Rate & Expectancy</h3>
<div class="card" style="padding:12px;margin:8px 0"><div class="mono" style="font-size:13px;color:var(--gold)">Expectancy = (Win% × Avg Win) − (Loss% × Avg Loss)<br>Break-even Win Rate = 1 ÷ (1 + R:R Ratio)</div><div style="font-size:12px;color:var(--text2);margin-top:6px">1:2 R:R: Break-even = 1 ÷ 3 = 33.3%<br>1:3 R:R: Break-even = 1 ÷ 4 = 25%</div></div>
<h3>6. Margin Required</h3>
<div class="card" style="padding:12px;margin:8px 0"><div class="mono" style="font-size:13px;color:var(--gold)">Margin = (Lot Size × Contract Size) ÷ Leverage</div><div style="font-size:12px;color:var(--text2);margin-top:6px">1 standard lot EUR/USD at 1:100 leverage:<br>= (1 × 100,000 × 1.08) ÷ 100 = <strong style="color:var(--gold)">$1,080 margin</strong></div></div>
<div class="callout"><strong>Use the built-in calculator</strong> in the TRADE tab → Calc button. All these formulas are built in. Always calculate BEFORE entering — never guess position sizes.</div>`,
      },
    ]
  },
  {
    id:'smc-concepts',title:'Smart Money Concepts (SMC)',emoji:'🏛️',
    desc:'Trade with the banks. Understand institutional order flow.',
    color:'var(--cyan)',
    lessons:[
      {id:'smc-intro',title:'Introduction to SMC',emoji:'💡',mins:16,xp:160,
       content:`<h3>What Is Smart Money?</h3>
<p>Smart Money = institutional traders (banks, hedge funds, central banks). They move the markets. Retail traders are "dumb money" — often on the wrong side of institutional moves. SMC teaches you to identify institutional footprints and trade alongside them.</p>
<h3>Core SMC Concepts</h3>
<p><strong>Order Blocks (OB)</strong> — Areas where institutions placed large orders, causing a significant impulse move. The last bearish candle before a major bullish impulse = bullish Order Block. Price often returns to these zones for institutions to complete their orders.</p>
<p><strong>Fair Value Gaps (FVG / Imbalance)</strong> — A 3-candle pattern where candle 1 and candle 3 don't overlap, leaving a "gap" in price delivery. Represents an imbalance between buyers and sellers. Price often returns to fill FVGs before continuing.</p>
<p><strong>Liquidity</strong> — Pools of buy/sell stop orders that accumulate above swing highs and below swing lows. Institutions need liquidity to fill large orders. They "hunt" retail stops before reversing.</p>
<p><strong>Break of Structure (BOS)</strong> — Confirmed trend continuation. Price breaks a key swing high (bullish) or swing low (bearish).</p>
<p><strong>Change of Character (CHOCH)</strong> — First sign of trend reversal. Price breaks structure against the prevailing trend. This is the CHOCH candle — the one that broke the last relevant swing.</p>
<p><strong>Premium & Discount</strong> — Price above the 50% of a recent swing = Premium (expensive, look to sell). Price below 50% = Discount (cheap, look to buy).</p>
<h3>The SMC Trading Model</h3>
<div class="card" style="padding:14px;margin:10px 0">
<ol style="font-size:13px;display:flex;flex-direction:column;gap:6px;color:var(--text2)">
<li>Identify HTF (D1/H4) market structure and direction</li>
<li>On H1: Wait for CHOCH — first structure break against HTF trend</li>
<li>After CHOCH: price is likely retracing to HTF direction</li>
<li>Mark the Order Block at the CHOCH point</li>
<li>Wait for price to return to the OB zone</li>
<li>Use M15/M5 for entry confirmation (FVG fill, candlestick pattern)</li>
<li>SL: below/above the Order Block extreme</li>
<li>TP: next liquidity pool (equal highs/lows, previous swing points)</li>
</ol>
</div>
<div class="callout"><strong>SMC popularity warning:</strong> SMC has become extremely popular on social media. When millions of traders watch the same patterns, institutions adapt. Always combine SMC with other confluence factors. The tool is valid — but mechanical application rarely works long-term.</div>`,
      },
      {id:'liquidity-hunting',title:'Liquidity & Stop Hunting',emoji:'🎯',mins:12,xp:120,
       content:`<h3>Why Retail Traders Get Stopped Out at the Worst Times</h3>
<p>You enter a trade, place your stop at the obvious level. Price hits your stop, then immediately reverses to your target. Sound familiar? This is liquidity hunting — it's not random and it's not bad luck.</p>
<h3>Where Institutions Hunt Liquidity</h3>
<ul>
<li><strong>Below swing lows</strong> — Retail buys have stops here</li>
<li><strong>Above swing highs</strong> — Retail sells have stops here</li>
<li><strong>Below/above round numbers</strong> — 1.1000, 1.2000 (massive order clusters)</li>
<li><strong>Equal Highs (EQH)</strong> — Two or more highs at same level = obvious buy-stop cluster</li>
<li><strong>Equal Lows (EQL)</strong> — Two or more lows at same level = obvious sell-stop cluster</li>
<li><strong>Session highs/lows</strong> — Previous day high/low, Asian range extremes</li>
</ul>
<h3>The Liquidity Hunt Pattern</h3>
<div class="card" style="padding:12px;margin:10px 0;font-size:13px;color:var(--text2)">
1. Market has clear swing high with multiple retail sell stops above<br>
2. Institutions push price above swing high (stop hunt spike)<br>
3. Retail stops triggered → provides liquidity for institutional SELL orders<br>
4. Price reverses strongly downward (institutions now short)<br>
5. Retail who just got stopped out watches price go their original direction
</div>
<h3>How to Use This Knowledge</h3>
<ul>
<li><strong>Don't place stops at obvious levels</strong> — go 5-10 pips beyond the obvious cluster</li>
<li><strong>Watch for sweep + reversal setups</strong> — long wick through key level then strong reversal = high probability trade</li>
<li><strong>Wait for liquidity sweep before entering</strong> — don't enter before the sweep</li>
<li><strong>Equal highs/lows are targets</strong> — price is likely to sweep them eventually</li>
</ul>
<div class="callout"><strong>The fake breakout setup:</strong> One of the highest probability setups in professional trading. Price sweeps beyond a key level, grabs the liquidity, then aggressively reverses. Enter on the reversal candle. Stop beyond the sweep wick. Target the opposite side of the range.</div>`,
      },
    ]
  },
  {
    id:'mt5-guide',title:'MetaTrader 5 (MT5) Mastery',emoji:'💻',
    desc:'Master the world\'s most popular trading platform end-to-end.',
    color:'var(--blue)',
    lessons:[
      {id:'mt5-interface',title:'MT5 Interface & Setup',emoji:'🖥️',mins:12,xp:120,
       content:`<h3>MetaTrader 5 — The Professional Standard</h3>
<p>MT5 is the most widely used professional retail trading platform. Available on desktop (Windows/Mac), web browser, and mobile (iOS/Android). Most brokers support it.</p>
<h3>MT5 Interface Layout</h3>
<p><strong>Market Watch Panel (Left)</strong> — List of instruments with live bid/ask prices. Right-click → "Chart Window" to open. Right-click → "Specification" for full contract details.</p>
<p><strong>Chart Area (Center)</strong> — Your main workspace. Multiple charts. Right-click for settings. Mouse wheel to zoom. Drag to scroll.</p>
<p><strong>Navigator Panel (Left)</strong> — Access indicators, expert advisors (EAs), scripts. Drag indicator to chart to apply.</p>
<p><strong>Terminal Panel (Bottom)</strong></p>
<ul>
<li><strong>Trade tab</strong> — Open positions with real-time P&L</li>
<li><strong>History tab</strong> — Closed trade history</li>
<li><strong>Alerts tab</strong> — Custom price alerts</li>
<li><strong>Mailbox tab</strong> — Broker messages</li>
</ul>
<h3>Essential MT5 Keyboard Shortcuts</h3>
<table>
<tr><th>Shortcut</th><th>Action</th></tr>
<tr><td class="mono">F9</td><td>Open New Order dialog</td></tr>
<tr><td class="mono">F8</td><td>Chart properties</td></tr>
<tr><td class="mono">+/−</td><td>Zoom in/out on chart</td></tr>
<tr><td class="mono">Ctrl+Z</td><td>Undo drawing</td></tr>
<tr><td class="mono">Delete</td><td>Delete selected object</td></tr>
<tr><td class="mono">Ctrl+A</td><td>Select all objects</td></tr>
<tr><td class="mono">H</td><td>Toggle crosshair cursor</td></tr>
<tr><td class="mono">Ctrl+G</td><td>Toggle grid</td></tr>
<tr><td class="mono">End</td><td>Jump to current candle</td></tr>
</table>
<h3>Step-by-Step: Placing a Trade in MT5</h3>
<ol style="font-size:13px;color:var(--text2);display:flex;flex-direction:column;gap:5px">
<li>Open the chart for your chosen pair</li>
<li>Press F9 or click "New Order" button in toolbar</li>
<li>Select instrument (should auto-fill from chart)</li>
<li>Choose order type: Market, Limit, Stop</li>
<li>Set Volume (lot size — calculate this first!)</li>
<li>Set Stop Loss price (NOT pips — set the actual price level)</li>
<li>Set Take Profit price</li>
<li>Click Buy (blue) or Sell (red) to execute</li>
<li>Confirm position appears in Trade tab</li>
</ol>
<div class="callout"><strong>MT5 Stop Loss tip:</strong> Enter the actual price for SL/TP, not pips. Example: if EUR/USD is at 1.0850 and you want 30 pip SL for a buy, enter SL = 1.0820. This is more precise than pip-based stops.</div>`,
      },
      {id:'mt5-indicators',title:'Adding & Using Indicators in MT5',emoji:'📈',mins:9,xp:90,
       content:`<h3>MT5's Built-in Indicator Library</h3>
<p>MT5 comes with 38 built-in indicators across 5 categories. Here are the most useful ones:</p>
<h3>Trend Indicators</h3>
<ul>
<li><strong>Moving Average</strong> — Go to Navigator → Indicators → Trend → Moving Average. Set MA Method (SMA/EMA), Period, Apply to (Close). Best: EMA21, EMA50, SMA200.</li>
<li><strong>Bollinger Bands</strong> — Trend → Bollinger Bands. Default settings (20, 2.0) work well.</li>
<li><strong>Ichimoku Cloud</strong> — Shows trend, S&R, and momentum all at once. Advanced.</li>
</ul>
<h3>Oscillators (for momentum/divergence)</h3>
<ul>
<li><strong>RSI</strong> — Oscillators → Relative Strength Index. Period 14, add levels 70/30.</li>
<li><strong>MACD</strong> — Oscillators → MACD. Default 12-26-9 is fine to start.</li>
<li><strong>Stochastic</strong> — Oscillators → Stochastic Oscillator. Try 5,3,3 for active trading.</li>
</ul>
<h3>How to Draw S&R Lines</h3>
<p>Toolbar → Draw horizontal line, or press H. Click on chart to place. Drag to adjust. Right-click → Properties to change color/style.</p>
<h3>MT5 Strategy Tester (Backtesting)</h3>
<p>View → Strategy Tester. Select any Expert Advisor or indicator to test on historical data. Run backtests to validate your strategy before going live.</p>
<h3>Setting Price Alerts in MT5</h3>
<p>Terminal → Alerts tab → Right-click → Create. Set price level, sound, and notification. MT5 will alert you even when minimized.</p>
<div class="callout"><strong>Mobile MT5:</strong> Download from App Store/Google Play. Log in with your broker credentials. Full functionality on mobile including placing orders, managing positions, and viewing charts with indicators.</div>`,
      },
    ]
  },
  {
    id:'journalling',title:'Trade Journalling',emoji:'📓',
    desc:'The #1 habit that separates consistently profitable traders from the rest.',
    color:'var(--green)',
    lessons:[
      {id:'why-journal',title:'Why Journalling Changes Everything',emoji:'✍️',mins:9,xp:90,
       content:`<h3>The Mirror That Makes You Better</h3>
<p>Ask any professional who made it past their first year of trading consistently. Every single one journals. Every. Single. One. Without exception.</p>
<h3>What Your Journal Reveals (That Nothing Else Can)</h3>
<ul>
<li>Which setups are <em>actually</em> profitable for YOU (vs what you think works)</li>
<li>What time of day you perform best and worst</li>
<li>Emotional patterns: when do you revenge trade? When do you skip valid setups?</li>
<li>Your real win rate vs your perception</li>
<li>How much the spread/commission is actually costing you</li>
<li>Whether you follow your rules (process compliance %)</li>
<li>Your actual R:R ratio achieved vs what you planned</li>
</ul>
<h3>What to Record in Every Trade</h3>
<div class="card" style="padding:14px;margin:10px 0">
<div style="font-size:13px;color:var(--text2);display:flex;flex-direction:column;gap:5px">
<div>📅 Date & Time of entry and exit</div>
<div>💱 Pair and direction (BUY/SELL)</div>
<div>📊 Timeframe used for analysis and entry</div>
<div>📍 Entry price, Stop Loss, Take Profit (planned vs actual)</div>
<div>📐 Lot size, Risk amount $, Risk %</div>
<div>⏰ Trade duration</div>
<div>✅/❌ Outcome, final P&L in pips and $</div>
<div>📸 Screenshot of chart at entry AND exit</div>
<div>🧠 Emotional state: 1-5 score + 1 sentence</div>
<div>📝 Setup type, what worked, what could improve</div>
</div>
</div>
<h3>The Weekly Review (Non-Negotiable)</h3>
<p>Every weekend: go through every trade. Answer these questions:</p>
<ul>
<li>Did I follow my rules on every trade? If not, why not?</li>
<li>Were my losses due to the market or my mistakes?</li>
<li>What is my current profit factor? Win rate? Avg R:R?</li>
<li>What one thing will I improve this week?</li>
</ul>
<div class="callout"><strong>Use TradeBaby's Journal tab</strong> to log every trade. The stats section automatically calculates win rate, profit factor, performance by pair, and emotional correlations. This is your edge-building machine.</div>`,
      },
    ]
  },
  {
    id:'advanced-concepts',title:'Advanced Trading Concepts',emoji:'🔬',
    desc:'Take your trading to the next level with professional-grade techniques.',
    color:'var(--purple)',
    lessons:[
      {id:'correlation',title:'Currency Correlation',emoji:'🔗',mins:10,xp:100,
       content:`<h3>Understanding Correlation</h3>
<p>Currency pairs move in relation to each other. Understanding correlation prevents you from doubling your risk unknowingly.</p>
<h3>Positive Correlation (Move Together)</h3>
<p>If you buy EUR/USD AND buy GBP/USD simultaneously, you have essentially doubled your USD exposure. If USD strengthens, both lose. You think you have 2 trades — you really have 1 big trade.</p>
<ul>
<li>EUR/USD & GBP/USD — Highly correlated (0.85+)</li>
<li>EUR/USD & AUD/USD — Moderately correlated (0.6-0.7)</li>
<li>EUR/USD & EUR/GBP — Partially correlated</li>
</ul>
<h3>Negative Correlation (Move Opposite)</h3>
<p>EUR/USD and USD/CHF move almost exactly opposite (-0.9 correlation). Buying both = a near-zero net position.</p>
<ul>
<li>EUR/USD & USD/CHF — Strongly negative</li>
<li>EUR/USD & USD/JPY — Moderately negative</li>
<li>AUD/USD & USD/CAD — Moderately negative</li>
</ul>
<h3>Safe Haven vs Risk Currency Clusters</h3>
<p><strong>Risk-on currencies (positive correlation):</strong> AUD, NZD, CAD, EUR, GBP all tend to rise together when markets are bullish.</p>
<p><strong>Safe havens (negative correlation to risk):</strong> USD, JPY, CHF rise when markets panic/crash.</p>
<h3>Practical Rules</h3>
<ul>
<li>Never open correlated trades in the same direction without reducing size</li>
<li>If trading EUR/USD AND GBP/USD, halve position size on each</li>
<li>Use correlation to hedge: opposing positions in correlated pairs</li>
<li>Monitor total USD exposure, not just individual trade risk</li>
</ul>
<div class="callout"><strong>Correlation is dynamic.</strong> These relationships change over time as economic conditions evolve. Check current correlation matrices on sites like myfxbook.com before assuming historical correlations still hold.</div>`,
      },
      {id:'market-microstructure',title:'Market Microstructure',emoji:'🏗️',mins:11,xp:110,
       content:`<h3>Understanding How Markets Actually Work</h3>
<p>Most retail traders have no idea how the market actually operates at the microstructure level. This knowledge gives you a significant edge.</p>
<h3>The Interbank Market</h3>
<p>The real forex market is the interbank market — large banks trading directly with each other. Citibank, Deutsche Bank, UBS, JPMorgan and others exchange billions daily. Retail traders don't access this directly — your broker aggregates prices from multiple liquidity providers.</p>
<h3>Types of Brokers</h3>
<p><strong>Market Maker (Dealing Desk)</strong> — Broker takes the other side of your trade. Makes money from spread AND can trade against you. Conflict of interest. Used by most beginner-focused brokers. Not inherently bad but be aware.</p>
<p><strong>STP (Straight-Through Processing)</strong> — Your order routes directly to liquidity providers. No dealing desk interference. Better for larger trades.</p>
<p><strong>ECN (Electronic Communication Network)</strong> — True market access. Variable spreads (can be 0.0 pips). Commission-based. Professional-grade. Best for scalping and high-frequency strategies.</p>
<h3>Order Flow & Price Discovery</h3>
<p>Price moves because of order imbalance. When buy orders > sell orders at a level, price rises to find sellers. When sell orders > buys, price falls. Large institutional orders create the significant moves you see on charts.</p>
<h3>Slippage</h3>
<p>The difference between your intended execution price and actual fill price. Happens during fast markets, low liquidity periods, and on market orders. Normal and unavoidable — factor into your calculations.</p>
<div class="callout"><strong>Broker selection matters.</strong> For swing trading: any reputable STP/ECN broker works. For scalping: you NEED an ECN broker with raw spreads + commission. Market makers with variable spreads will eat your scalping edge in costs alone.</div>`,
      },
      {id:'trading-tools',title:'Professional Trading Tools',emoji:'🛠️',mins:10,xp:100,
       content:`<h3>Tools That Give You an Edge</h3>
<p>Beyond MT5, professional traders use these resources daily. Most are free.</p>
<h3>Essential Free Resources</h3>
<p><strong>Economic Calendar:</strong> investing.com/economic-calendar or forexfactory.com. Set to your timezone. Check every morning.</p>
<p><strong>TradingView</strong> — The best charting platform. Multi-timeframe, drawing tools, community ideas, replay mode. Free tier is sufficient. tradingview.com</p>
<p><strong>DXY (US Dollar Index)</strong> — Tracks USD strength vs basket of 6 currencies. Essential context for all USD pairs.</p>
<p><strong>VIX (Volatility Index)</strong> — "Fear gauge" for stock markets. High VIX = risk-off = USD/JPY/CHF strength. Low VIX = risk-on = AUD/NZD strength.</p>
<p><strong>COT Report (Commitment of Traders)</strong> — Weekly CFTC report showing institutional positioning in futures. Shows whether large speculators are net long or short a currency. Released Fridays for previous Tuesday data.</p>
<p><strong>Position Size Calculator:</strong> babypips.com/tools or use TradeBaby's built-in calculator.</p>
<p><strong>Pip Calculator:</strong> Calculate exact pip values for any pair and lot size.</p>
<h3>Premium Tools (Worth It)</h3>
<ul>
<li><strong>Jigsaw Trading</strong> — Order flow and depth of market for futures</li>
<li><strong>Bookmap</strong> — Volume/heat map visualization</li>
<li><strong>TradeStation/NinjaTrader</strong> — Advanced backtesting and order flow</li>
</ul>
<div class="callout"><strong>Warning on "premium signals":</strong> 99% of paid signal services and "forex gurus" are scams. No legitimate profitable trader sells signals — they trade their own capital. Learn to fish; don't buy fish.</div>`,
      },
    ]
  },
];

// ── QUIZZES ──
const QUIZZES = {
  'what-is-forex': [
    {q:"What is the daily trading volume of the forex market?",opts:["$750 million","$7.5 billion","$7.5 trillion","$75 trillion"],correct:2},
    {q:"Forex is traded on which exchange?",opts:["NYSE","NASDAQ","No central exchange — OTC","CME only"],correct:2},
    {q:"How many days per week is the forex market open?",opts:["3","5","6","7"],correct:1},
  ],
  'pips-lots': [
    {q:"For EUR/USD, a pip is at which decimal place?",opts:["2nd","3rd","4th","5th"],correct:2},
    {q:"How many units are in a standard lot?",opts:["1,000","10,000","100,000","1,000,000"],correct:2},
    {q:"What is the approximate pip value for a mini lot on EUR/USD?",opts:["$10/pip","$1/pip","$0.10/pip","$100/pip"],correct:1},
  ],
  'leverage-margin': [
    {q:"With 100:1 leverage, how much can $1,000 control?",opts:["$10,000","$50,000","$100,000","$1,000,000"],correct:2},
    {q:"What triggers a margin call?",opts:["Account makes profit","Equity falls below required margin","You open too many trades","Weekend gap"],correct:1},
  ],
  'the-1percent-rule': [
    {q:"What is the maximum recommended risk per trade?",opts:["5-10%","10-15%","1-2%","20-25%"],correct:2},
    {q:"After a 50% account loss, what gain is needed to recover?",opts:["50%","75%","100%","25%"],correct:2},
    {q:"With 1:2 R:R, what minimum win rate is needed to profit?",opts:["50%","40%","34%","60%"],correct:2},
  ],
  'moving-averages': [
    {q:"What is a Golden Cross?",opts:["Price touching MA200","MA50 crossing above MA200","MA9 crossing MA21","Price breaking resistance"],correct:1},
    {q:"Which MA is most watched as a major long-term indicator?",opts:["MA9","MA21","MA50","MA200"],correct:3},
    {q:"Which MA type reacts faster to recent price changes?",opts:["SMA","EMA","They are identical","WMA"],correct:1},
  ],
  'support-resistance': [
    {q:"What is role reversal in S&R?",opts:["Price reversing randomly","Broken support becoming resistance","S&R swapping daily","A chart pattern"],correct:1},
    {q:"Minimum touches to confirm a strong S&R level?",opts:["1","2","3+","10+"],correct:2},
  ],
  'candlestick-basics': [
    {q:"What does a bullish engulfing pattern signal?",opts:["Trend continuation","Potential bullish reversal","Indecision","Strong downtrend"],correct:1},
    {q:"A Doji candle shows what?",opts:["Strong buying","Market indecision — open ≈ close","Strong selling","Definite reversal"],correct:1},
    {q:"Where is a hammer pattern most significant?",opts:["Mid-range anywhere","Top of uptrend","Bottom of downtrend at support","After consolidation"],correct:2},
  ],
  'emotions-trading': [
    {q:"What should you do after 2 consecutive losses?",opts:["Double size to recover","Stop trading for the day","Switch strategies","Trade more"],correct:1},
    {q:"Revenge trading typically ends with:",opts:["A big recovery","Account blow-up","Better discipline","A profitable week"],correct:1},
  ],
};
