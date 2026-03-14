/* ═══════════════════════════════════════════
   COMPREHENSIVE AI CHATBOT
   Knows every lesson, strategy, concept, formula
   ═══════════════════════════════════════════ */

function generateResponse(input) {
  const q = input.toLowerCase().trim();

  // ── EMOTIONAL SUPPORT ──
  const stressWords = ['stressed','frustrated','anxious','scared','worried','depressed','struggling','losing','failing','hopeless','angry','upset','bad trade'];
  if (stressWords.some(w => q.includes(w))) {
    return `I hear you, and what you're feeling is completely valid. Trading is genuinely one of the hardest things to master — even professionals have rough patches.<br><br>
    Here's what I want you to hear right now:<br><br>
    • <strong>Every loss is tuition, not failure</strong><br>
    • The fact that you're here learning already puts you ahead of 95% of people<br>
    • <strong>Stop trading today if you're emotional</strong> — come back fresh tomorrow<br>
    • Review your journal: is this a system failure or emotional execution failure?<br><br>
    What specifically happened? Tell me and I'll give you targeted help. You've got this. 💪`;
  }

  // ── MOTIVATION ──
  if (q.includes('motivat') || q.includes('give up') || q.includes("can't do") || q.includes('quit') || q.includes('worth it')) {
    return `Don't give up. Here's the truth about trading success:<br><br>
    Most profitable traders failed for 1-3 years before clicking. The <strong>learning curve is brutal</strong> — but it's a curve, not a wall. Those who push through it find that trading gets dramatically easier once the fundamentals become second nature.<br><br>
    Your current stats: <strong>Level ${STATE.user.level}</strong>, ${completedCount()} lessons done, ${STATE.dailyStreak} day streak, ${STATE.simTrades.length} sim trades.<br><br>
    You're building skills that 95% of people don't have the patience to develop. <strong>Consistency beats talent every time in trading.</strong> Keep going. 🏆`;
  }

  // ── PROGRESS CHECK ──
  if (q.match(/progress|how am i|my stats|my level|how far/)) {
    const wr = STATE.simTrades.length > 0 ? Math.round(STATE.simTrades.filter(t=>t.pnl>0).length/STATE.simTrades.length*100) : 0;
    const totalPnl = STATE.simTrades.reduce((a,t)=>a+t.pnl,0);
    return `Here's your complete trading journey snapshot:<br><br>
    ⭐ <strong>Level ${STATE.user.level}</strong> — ${STATE.user.xp}/${STATE.user.xpNext} XP to next level<br>
    📚 <strong>${completedCount()}/${totalLessons()} lessons</strong> complete (${progressPct()}%)<br>
    🔥 <strong>${STATE.dailyStreak} day</strong> streak<br>
    📈 <strong>${STATE.simTrades.length} sim trades</strong> — ${wr}% win rate<br>
    💰 <strong>${fmtCurrency(STATE.simEquity)}</strong> sim equity (${((STATE.simEquity-10000)/100).toFixed(1)}% return)<br>
    📓 <strong>${STATE.journal.length}</strong> journal entries<br><br>
    ${progressPct() < 25 ? '📌 Focus: Complete the Forex Basics and Risk Management sections first — they\'re foundational.' :
      progressPct() < 60 ? '📌 Good progress! Now apply everything in the Sim account and start journaling every trade.' :
      '📌 Excellent! Deepen strategy mastery and review your journal analytics weekly.'}`;
  }

  // ── NEXT LESSON ──
  if (q.match(/next lesson|what (should|to) study|what to learn next|continue/)) {
    if (typeof CURRICULUM !== 'undefined') {
      for (const cat of CURRICULUM) {
        for (const l of cat.lessons) {
          if (!STATE.progress[l.id]) {
            return `Your next lesson is <strong>"${l.title}"</strong> in the <em>${cat.title}</em> section.<br><br>
            It covers: ${l.content ? l.content.replace(/<[^>]+>/g,'').substring(0,120).trim() + '...' : 'key trading concepts in this area.'}<br><br>
            Time needed: ~${l.mins} minutes. You'll earn <strong>+${l.xp||50} XP</strong> on completion. Head to the <strong>LEARN tab</strong> to start! 🎓`;
          }
        }
      }
    }
    return `🏆 You've completed all ${totalLessons()} lessons! Now focus on: reviewing strategies, daily sim trading, journaling every trade, and deepening your analytics. The learning never truly stops.`;
  }

  // ── TRADE REVIEW ──
  if (q.match(/review.*trade|trade.*review|check.*trade|analyze.*trade/)) {
    return `I'd be happy to review your trade! Give me these details:<br><br>
    1. 📊 Pair and timeframe<br>
    2. 📍 Direction (buy/sell) and entry price<br>
    3. 🛑 Where you placed your Stop Loss<br>
    4. 🎯 Your Take Profit target<br>
    5. ⏰ What happened — hit SL, TP, or manual close?<br>
    6. 🧠 How were you feeling when you entered?<br><br>
    With those details, I'll give you honest, specific feedback on what was good and what to improve. 🎯`;
  }

  // ── GREETINGS ──
  const greetings = ['hello','hi','hey','good morning','good afternoon','good evening','good day','howdy','what\'s up','yo','hii','sup'];
  if (greetings.some(g => q.startsWith(g) || q === g)) {
    const hrs = new Date().getHours();
    const time = hrs < 12 ? 'morning' : hrs < 17 ? 'afternoon' : 'evening';
    return `Good ${time}, ${STATE.user.name || 'Trader'}! 😊<br><br>
    Ready to build your trading skills? I can help with:<br>
    • Any forex or trading concept<br>
    • Strategy rules and entry criteria<br>
    • Risk management calculations<br>
    • Chart pattern identification<br>
    • Psychology and discipline<br>
    • Reviewing your trades<br><br>
    What's on your mind today?`;
  }

  // ── KNOWLEDGE BASE LOOKUPS ──
  const KB = {
    // Core Forex
    'what is forex|forex market|foreign exchange': `The <strong>Foreign Exchange (Forex)</strong> market is the world's largest financial market — over <strong>$7.5 trillion</strong> traded daily. It operates 24/5 across global financial centres. You trade currency pairs like EUR/USD, betting that one currency will strengthen against another. No central exchange — it's entirely over-the-counter (OTC).`,

    'pip|pips|what is a pip': `A <strong>pip</strong> (Percentage in Point) is the smallest standard price movement in forex.<br>
    • Most pairs: 1 pip = <strong>0.0001</strong> (4th decimal)<br>
    • JPY pairs: 1 pip = <strong>0.01</strong> (2nd decimal)<br>
    • Pipette = 0.00001 (5th decimal — fractional pip)<br><br>
    Standard lot value per pip: EUR/USD = ~<strong>$10</strong>. Mini lot = $1. Micro = $0.10.`,

    'lot size|lot sizes|what is a lot|micro lot|mini lot|standard lot': `Lot sizes define how much currency you control:<br>
    • <strong>Standard lot</strong> = 100,000 units (~$10/pip on EUR/USD)<br>
    • <strong>Mini lot</strong> = 10,000 units (~$1/pip)<br>
    • <strong>Micro lot</strong> = 1,000 units (~$0.10/pip)<br>
    • <strong>Nano lot</strong> = 100 units (~$0.01/pip)<br><br>
    Beginners should start with micro or mini lots. Use the <strong>Calculator</strong> to size every position correctly.`,

    'leverage|margin|what is leverage': `<strong>Leverage</strong> lets you control a large position with small capital. At 100:1, $1,000 controls $100,000.<br><br>
    It amplifies both profits AND losses equally. A 1% adverse move at 100:1 leverage = 100% account loss.<br><br>
    Safe leverage: 🟢 Beginners: 1:5-1:10 | 🟡 Intermediate: 1:10-1:30 | 🔴 Advanced: max 1:50.<br><br>
    <strong>Margin</strong> = the collateral held by your broker. Required Margin = Position Size ÷ Leverage.`,

    'spread|bid ask|bid and ask': `The <strong>spread</strong> is the difference between Bid (sell price) and Ask (buy price). It's the broker's built-in fee.<br><br>
    • EUR/USD: normally 0.5-2 pips<br>
    • GBP/USD: 0.8-2 pips<br>
    • Exotic pairs: 10-50+ pips<br><br>
    ⚠️ During news events, spreads can widen from 1 pip to 20+ pips — this can trigger stop losses. Always check spreads during high-impact news.`,

    'stop loss|sl|stoploss': `A <strong>stop loss</strong> is an order that automatically closes your trade at a predetermined loss. It's non-negotiable — ALWAYS use one.<br><br>
    Place it at a <em>logical</em> level: below support for buys, above resistance for sells. Not just a random pip distance.<br><br>
    <strong>Never move your stop loss further away from price.</strong> That's how small losses become catastrophic losses.`,

    'take profit|tp': `A <strong>take profit</strong> order closes your trade automatically when it reaches your profit target. Set it BEFORE entering the trade — when you're thinking clearly, not mid-trade.<br><br>
    Aim for minimum 1:2 Risk:Reward. If your stop is 30 pips, your target should be at least 60 pips. Pre-setting TP prevents greed from moving the goalposts.`,

    'position size|lot calculator|how much to trade|risk management': `<strong>Position sizing formula:</strong><br>
    <code>Lots = (Account × Risk%) ÷ (SL pips × Pip Value)</code><br><br>
    Example: $10,000 account, 1% risk, 30 pip SL, micro lots ($0.10/pip):<br>
    = $100 ÷ (30 × $0.10) = <strong>33.3 micro lots</strong><br><br>
    Use the built-in <strong>Calculator</strong> tab for instant results every trade. This is the #1 most important calculation in trading.`,

    'risk|1 percent rule|risk per trade|never risk': `The <strong>1% Rule</strong> — never risk more than 1-2% of your account per trade.<br><br>
    Why? 20 consecutive losses at 1% = only 18% drawdown (recoverable). At 10% risk = 87% drawdown (devastating).<br><br>
    Risk management is the #1 skill in trading. Even a mediocre strategy with excellent risk management can be profitable. An excellent strategy with poor risk management will eventually blow the account.`,

    'support|resistance|support and resistance': `<strong>Support</strong>: Price level where buying overcomes selling — price "bounces" up. The more times it holds, the stronger it is.<br><br>
    <strong>Resistance</strong>: Where selling overcomes buying — price bounces down.<br><br>
    <strong>Role Reversal</strong>: Broken support becomes resistance, and vice versa. This retest is one of the highest-probability trade setups in all technical analysis.`,

    'trend|uptrend|downtrend|market structure': `<strong>Uptrend</strong>: Series of Higher Highs (HH) + Higher Lows (HL). Trade LONG.<br>
    <strong>Downtrend</strong>: Series of Lower Lows (LL) + Lower Highs (LH). Trade SHORT.<br>
    <strong>Range</strong>: Sideways between S&R.<br><br>
    Always identify the trend on at least 2 timeframes before entering. <strong>Never fight the trend</strong> — the probability is massively against you.`,

    'candlestick|candle|hammer|doji|engulfing|shooting star': `Candlesticks show 4 prices: Open, High, Low, Close. Green = bullish (close > open). Red = bearish.<br><br>
    Key patterns:<br>
    🔨 <strong>Hammer</strong> — Long lower wick at lows = bullish reversal<br>
    ⭐ <strong>Doji</strong> — Open≈Close = indecision, possible reversal<br>
    ⭐ <strong>Shooting Star</strong> — Long upper wick at highs = bearish reversal<br>
    🐂 <strong>Bullish Engulfing</strong> — Green candle engulfs red = bullish<br>
    ☀️ <strong>Morning Star</strong> — 3-candle bullish reversal at lows<br><br>
    Check the <strong>Candle Bible</strong> in Learn for all 17 patterns with statistics!`,

    'rsi|relative strength index|overbought|oversold': `<strong>RSI (Relative Strength Index)</strong> measures momentum on a 0-100 scale.<br><br>
    • RSI > 70 = Overbought (potential sell)<br>
    • RSI < 30 = Oversold (potential buy)<br>
    • RSI above 50 = bullish bias<br>
    • <strong>Divergence</strong> = Price new high but RSI lower high = weakening momentum (powerful signal)<br><br>
    Best setting: RSI 14 (default). Most useful when combined with S&R levels.`,

    'macd|moving average convergence': `<strong>MACD</strong> shows both trend direction and momentum:<br><br>
    • MACD Line = 12 EMA − 26 EMA<br>
    • Signal Line = 9 EMA of MACD<br>
    • Histogram = MACD − Signal<br><br>
    MACD crosses above Signal = bullish. Below = bearish. Histogram expanding = momentum increasing. Divergence between MACD and price = powerful reversal warning.`,

    'moving average|ema|sma|ma200|golden cross|death cross': `<strong>Moving Averages</strong> smooth price action to show trend direction.<br><br>
    Key levels:<br>
    • EMA 21 = Short-term trend (swing trading entries)<br>
    • SMA 50 = Medium-term trend<br>
    • <strong>SMA 200</strong> = The king — major long-term S&R<br><br>
    Golden Cross (MA50 > MA200) = bullish. Death Cross (MA50 < MA200) = bearish.<br>
    EMA reacts faster (better for entries). SMA is smoother (better for trend ID).`,

    'fibonacci|fib|golden ratio|retracement': `<strong>Fibonacci Retracements</strong> use the golden ratio (1.618) to find pullback levels.<br><br>
    Key levels: 23.6%, 38.2%, <strong>50%</strong>, <strong>61.8%</strong> (the golden pocket), 78.6%<br><br>
    Draw from swing low to high (uptrend) to find where pullback might end. The 61.8% level is the most respected globally — price often reverses here in strong trends.`,

    'bollinger bands|bollinger': `<strong>Bollinger Bands</strong> = Middle (20 SMA) ± 2 standard deviations.<br><br>
    • <strong>Squeeze</strong> = Bands narrow = low volatility = big move brewing<br>
    • <strong>Expansion</strong> = Bands widen = volatility increasing, trend underway<br>
    • Price touching outer band = extended, but NOT always a reversal<br>
    • "Walking the band" during strong trends is normal`,

    'stochastic|stoch': `The <strong>Stochastic Oscillator</strong> compares close to high-low range (0-100).<br><br>
    • Above 80 = Overbought | Below 20 = Oversold<br>
    • %K crossing above %D in oversold zone = buy signal<br>
    • Divergence with price = powerful reversal signal<br>
    Best settings for active trading: 5,3,3`,

    'atr|average true range|volatility': `<strong>ATR (Average True Range)</strong> measures market volatility — the average range per candle.<br><br>
    Uses:<br>
    • Set stop losses at 1.5-2× ATR (adapts to current market conditions)<br>
    • Identify when volatility is expanding/contracting<br>
    • Filter trades: avoid when ATR is abnormally low (dead markets)<br>
    High ATR = wider stops needed. Low ATR = tighter stops possible.`,

    'session|london|new york|tokyo|sydney|trading hours': `Four major forex sessions:<br><br>
    🇦🇺 <strong>Sydney</strong>: 22:00-07:00 UTC | Quiet, AUD/NZD pairs<br>
    🇯🇵 <strong>Tokyo</strong>: 00:00-09:00 UTC | JPY pairs, range-bound<br>
    🇬🇧 <strong>London</strong>: 08:00-17:00 UTC | Highest volume, strong trends<br>
    🇺🇸 <strong>New York</strong>: 13:00-22:00 UTC | USD pairs, NFP/FOMC<br><br>
    🔥 <strong>Best time to trade: London/NY overlap 13:00-17:00 UTC</strong> — highest liquidity, tightest spreads, best moves. The live clock on the Home screen shows current session status.`,

    'nfp|non-farm payroll|jobs report': `<strong>NFP (Non-Farm Payrolls)</strong> is the US monthly employment report, released the <strong>first Friday of each month</strong>.<br><br>
    It's the biggest regular USD mover — 100-300 pip reactions are common. Three approaches:<br>
    1. <strong>Avoid</strong> — close positions 30 min before (safest for beginners)<br>
    2. <strong>Trade aftermath</strong> — wait for initial spike to settle, trade the direction<br>
    3. <strong>Fade the spike</strong> — trade against extreme initial reaction (advanced)<br><br>
    ⚡ Spreads can jump from 1 pip to 20+ pips during NFP. Factor this in!`,

    'central bank|fed|fomc|ecb|boe|hawkish|dovish|interest rate': `Central banks are the most powerful market movers.<br><br>
    🦅 <strong>Hawkish</strong> = signals rate hikes/tightening → <strong>currency strengthens</strong><br>
    🕊️ <strong>Dovish</strong> = signals rate cuts/easing → <strong>currency weakens</strong><br><br>
    Key banks: Fed (USD), ECB (EUR), BOE (GBP), BOJ (JPY). Markets price in expected rate changes weeks in advance — "buy the rumour, sell the fact" often applies to rate decisions.`,

    'smc|smart money|order block|fair value gap|choch|bos|liquidity': `<strong>Smart Money Concepts (SMC)</strong> — trading with institutional order flow:<br><br>
    • <strong>Order Block</strong> = Last bearish candle before bullish impulse (institutions refilling orders)<br>
    • <strong>Fair Value Gap (FVG)</strong> = Price imbalance — 3 candles where 1st and 3rd don't overlap<br>
    • <strong>CHOCH</strong> = Change of Character — first structure break against the trend (reversal signal)<br>
    • <strong>BOS</strong> = Break of Structure — confirms trend continuation<br>
    • <strong>Liquidity Hunting</strong> = Price sweeps retail stop clusters before reversing<br><br>
    Popular strategy: Identify OB after CHOCH, enter on return to OB with LTF confirmation.`,

    'psychology|discipline|fear|greed|emotions|revenge trading': `Trading psychology is <strong>90% of long-term success</strong>.<br><br>
    The biggest killers:<br>
    😨 <strong>Fear</strong> = cutting winners early, missing valid setups<br>
    🤑 <strong>Greed</strong> = oversizing, revenge trading, overtrading<br>
    😠 <strong>Revenge trading</strong> = the account blow-up cycle<br><br>
    Golden Rules:<br>
    • After 2 consecutive losses → <strong>stop for the day</strong><br>
    • Judge trades on rule-following, NOT outcome<br>
    • Journal every trade to identify emotional patterns<br>
    • Process over outcome — always`,

    'journal|journaling|trade log': `A trading journal is your <strong>most powerful improvement tool</strong>.<br><br>
    It reveals: your real win rate (vs perceived), which setups actually work for YOU, emotional patterns, whether you follow your rules, and how much spread/commission costs.<br><br>
    Use the <strong>JOURNAL tab</strong> to log every trade. Review weekly. The traders who journal consistently improve dramatically faster than those who don't. It's that simple.`,

    'head and shoulders|h&s': `<strong>Head & Shoulders</strong> — classic bearish reversal pattern:<br><br>
    • Left shoulder → Head (highest peak) → Right shoulder<br>
    • Neckline = line through the two troughs<br>
    • Entry = close below neckline<br>
    • Target = head-to-neckline height projected down<br>
    • Inverse H&S = bullish mirror pattern at bottoms<br><br>
    Win rate at major resistance: ~65-70%. One of the most studied patterns in technical analysis.`,

    'double top|double bottom|w pattern|m pattern': `<strong>Double Top</strong> (bearish): Two nearly equal highs at resistance. Enter on close below the middle low (neckline). Target = pattern height.<br><br>
    <strong>Double Bottom</strong> (bullish): Two nearly equal lows at support. Enter on close above middle high. Target = pattern height.<br><br>
    Double tops/bottoms represent exhaustion after a sustained move. Win rate at key levels: ~60-65%.`,

    'london breakout|london strategy': `<strong>London Breakout Strategy:</strong><br><br>
    1. Mark Asian session range (00:00-07:00 UTC)<br>
    2. At London open (08:00 UTC), watch for break of range<br>
    3. BUY on close above Asian high | SELL on close below Asian low<br>
    4. SL: 10-15 pips beyond range extreme<br>
    5. TP: 1.5-2× the Asian range height<br><br>
    Win rate: ~58%. Best pairs: EUR/USD, GBP/USD. Avoid Mondays/holidays. Full rules in the <strong>Strategy Library</strong>.`,

    'trend pullback|ema pullback|ema strategy': `<strong>EMA Trend Pullback Strategy:</strong><br><br>
    1. Confirm H4 uptrend: price above 21 EMA AND 50 EMA, both sloping up<br>
    2. Wait for price to pull back to 21 EMA zone<br>
    3. Look for bullish confirmation candle<br>
    4. Enter on next candle open<br>
    5. SL below the swing low of the pullback<br>
    6. TP at previous swing high or 3× risk<br><br>
    Win rate: ~52%. R:R: 1:3. Full rules in the <strong>Strategy Library</strong>.`,

    'carry trade|swap|rollover': `<strong>Carry Trade</strong> — earn interest rate differentials:<br><br>
    Buy a high-interest currency, sell a low-interest currency. Earn the daily swap difference as long as you hold the position.<br><br>
    Classic example: AUD/JPY (high AUD rates vs near-zero JPY rates). Works best in stable, risk-on environments. Devastating in crises — carry trades unwind violently when markets panic. Always size conservatively.`,

    'mt5|metatrader|trading platform': `<strong>MetaTrader 5 (MT5)</strong> is the world's most popular retail trading platform. Free from most brokers.<br><br>
    Key shortcuts: <strong>F9</strong> = New Order | <strong>+/-</strong> = Zoom<br><br>
    Placing a trade: F9 → select instrument → enter volume (lot size!) → set SL/TP → click Buy/Sell.<br><br>
    ⚠️ Always double-check lot size before placing. MT5 won't warn you if you enter 1.0 lot instead of 0.10!`,

    'demo|practice account|virtual money|demo account': `Demo accounts are <strong>essential for beginners</strong>. Trade virtual money on live market feeds.<br><br>
    Rules for demo trading:<br>
    • Use the SAME lot sizes you'd use on live<br>
    • Trade your actual strategy (no testing random ideas)<br>
    • Journal every trade<br>
    • Target: 3+ consecutive profitable months before going live<br><br>
    Note: Demo success ≠ guaranteed live success. Emotions are different with real money. The sim account in TradeBaby Pro works the same way.`,

    'correlation|currency correlation': `Currency pairs move in relation to each other:<br><br>
    <strong>Positive correlation</strong> (move together):<br>
    EUR/USD + GBP/USD: ~0.85 (trading both = doubled USD exposure!)<br>
    AUD/USD + NZD/USD: ~0.80<br><br>
    <strong>Negative correlation</strong> (move opposite):<br>
    EUR/USD + USD/CHF: ~-0.90<br><br>
    If you trade EUR/USD and GBP/USD simultaneously in the same direction, you effectively have one big USD trade. Halve your position size on each.`,

    'breakout|retest|break and retest': `<strong>Breakout & Retest Strategy</strong>:<br><br>
    1. Mark S&R level tested 3+ times<br>
    2. Wait for strong momentum break (close beyond level)<br>
    3. Allow price to pull back and retest broken level<br>
    4. Enter on confirmation candle at retest<br>
    5. SL beyond the retested level<br>
    6. TP = range height projected from breakout<br><br>
    Always <strong>wait for the retest</strong> — never chase the initial breakout. Win rate improves dramatically with the retest entry.`,

    'divergence|rsi divergence|macd divergence': `<strong>Divergence</strong> is when price and indicator disagree:<br><br>
    <strong>Bearish divergence</strong>: Price makes new HIGH but RSI/MACD makes lower high → momentum weakening → potential sell<br>
    <strong>Bullish divergence</strong>: Price makes new LOW but RSI makes higher low → selling exhausted → potential buy<br><br>
    Best on H4/D1 timeframes at key S&R levels. Requires confirmation candle. Win rate with confluence: ~45-55% but with excellent 1:4 R:R.`,

    'calculator|position sizing calculator|lot size calculator': `The built-in <strong>Calculator</strong> (tap TRADE → 🧮 Calc) has three tools:<br><br>
    1. <strong>Position Size</strong> — Enter account balance, risk %, stop loss pips → get exact lot size<br>
    2. <strong>Pip Value</strong> — Enter lot size + pair type → get $ value per pip<br>
    3. <strong>Profit/Loss</strong> — Enter entry, exit, lots → get exact P&L<br><br>
    Use position sizing BEFORE every trade. It's non-negotiable.`,

    'flashcard|flash card': `The <strong>Flashcard Mode</strong> (Learn tab) has ${typeof FLASHCARDS !== 'undefined' ? FLASHCARDS.length : '40'}+ trading terms with answers. Tap to flip, mark correct/incorrect, earn +5 XP per correct answer.<br><br>
    Research shows spaced repetition (reviewing flashcards regularly) is one of the most effective learning methods. Aim for 10 cards per day.`,

    'pattern game|identify pattern|chart pattern game': `The <strong>Pattern Recognition Game</strong> (Learn tab) shows you a candlestick chart and asks you to identify the pattern from 4 options. Earn +10 XP for each correct answer.<br><br>
    The faster you can identify patterns on real charts, the better your live trading reactions will be. Practice until it's instant recognition.`,

    'candle bible|candlestick patterns|pattern library': `The <strong>Candle Bible</strong> (Learn tab) has all 17 major candlestick patterns with:<br>
    • Full description and psychology<br>
    • Exact trading rules<br>
    • Historical win rates<br>
    • Best timeframes<br>
    • Reliability ratings (1-5 stars)<br><br>
    Study them in the Candle Bible, then test your recognition in the Pattern Game. +5 XP for studying each pattern.`,

    'skill map|skill tree|curriculum map': `The <strong>Skill Map</strong> (Learn tab) shows your entire learning journey as a visual tree:<br><br>
    🟢 Green nodes = completed lessons<br>
    🟡 Gold nodes = current lesson (do this next!)<br>
    ⚫ Gray nodes = locked (complete previous lessons first)<br><br>
    It makes your progress tangible and shows exactly where you are in the curriculum.`,

    'notification|reminder|alert': `TradeBaby Pro supports notifications for:<br>
    • Daily learning reminders<br>
    • Trading session openings (London, NY overlap)<br>
    • Weekly review reminders<br>
    • Achievement unlocks<br><br>
    Go to <strong>Profile → Settings → Notifications</strong> to enable them. First-time setup requires granting browser notification permission.`,

    'beginners|new trader|just started|where do i start|how to start': `Welcome to your trading journey! 🌱<br><br>
    <strong>Recommended path for beginners:</strong><br>
    1. Complete all <strong>Forex Basics</strong> lessons first<br>
    2. Study <strong>Risk Management</strong> deeply (this is #1)<br>
    3. Learn <strong>Support & Resistance</strong> — the foundation<br>
    4. Start sim trading with 0.01 lots<br>
    5. Journal every trade from day 1<br>
    6. Practice <strong>3+ months</strong> before considering real money<br><br>
    The curriculum in the <strong>LEARN tab</strong> is structured in the perfect order. Start at the top and work down. You've got this! 💪`,
  };

  // Match knowledge base
  for (const [patterns, answer] of Object.entries(KB)) {
    const patternList = patterns.split('|');
    if (patternList.some(p => q.includes(p.trim()))) {
      return answer + (answer.includes('?') ? '' : '<br><br>💬 Want me to go deeper on any aspect of this?');
    }
  }

  // ── LESSON CONTENT LOOKUP ──
  if (typeof CURRICULUM !== 'undefined') {
    for (const cat of CURRICULUM) {
      for (const l of cat.lessons) {
        if (q.includes(l.title.toLowerCase()) || (l.id && q.includes(l.id.replace(/-/g,' ')))) {
          return `The lesson <strong>"${l.title}"</strong> is in the <em>${cat.title}</em> section of the curriculum.<br><br>
          ${l.content ? 'Here\'s a summary: ' + l.content.replace(/<[^>]+>/g,'').substring(0,200).trim() + '...' : ''}<br><br>
          Head to <strong>LEARN → ${cat.title}</strong> to study it fully and earn +${l.xp||50} XP. 📚`;
        }
      }
    }
  }

  // ── STRATEGY LOOKUP ──
  if (typeof STRATEGIES !== 'undefined') {
    for (const s of STRATEGIES) {
      if (q.includes(s.name.toLowerCase()) || q.includes(s.id.replace(/-/g,' '))) {
        return `<strong>${s.name}</strong> — ${s.style} strategy<br><br>
        📊 Win Rate: ${s.winrate} | R:R: ${s.rr} | Difficulty: ${'★'.repeat(s.difficulty)}<br>
        📈 Best pairs: ${s.pairs}<br><br>
        ${s.desc}<br><br>
        View full entry rules in the <strong>Strategy Library</strong> (Home → Strategies). +10 XP when you study it!`;
      }
    }
  }

  // ── CALCULATION QUESTIONS ──
  if (q.match(/calculate|how much|formula|math|equation/)) {
    return `I can help with trading calculations! 🧮<br><br>
    The <strong>Calculator tab</strong> (TRADE → 🧮 Calc) does all these instantly:<br>
    • <strong>Position Size</strong> — what lot size for my risk%?<br>
    • <strong>Pip Value</strong> — how much is each pip worth?<br>
    • <strong>Profit/Loss</strong> — what will I make/lose?<br><br>
    Or tell me your numbers: account balance, risk %, and stop loss in pips — and I'll calculate manually for you!`;
  }

  // ── DEFAULT RESPONSES ──
  const defaults = [
    `That's a great question about trading. The most important thing to remember is: <strong>risk management first, strategy second, psychology third.</strong><br><br>
    Could you be more specific? I can explain any trading concept in detail — indicators, patterns, strategies, psychology, calculations. What exactly would you like to understand better?`,

    `I want to give you the most useful answer. Trading success comes from mastering fundamentals deeply rather than collecting surface-level knowledge.<br><br>
    Try asking me about a specific concept like "What is support and resistance?", a strategy like "Explain the London Breakout", or say "What should I study next?" and I'll point you in the right direction. 🎯`,

    `Great question to be thinking about! The core of all profitable trading comes down to three things:<br>
    1. <strong>Edge</strong> — a strategy that wins more than it loses over time<br>
    2. <strong>Risk Management</strong> — protecting capital with every trade<br>
    3. <strong>Psychology</strong> — executing consistently without emotion<br><br>
    Which of these areas would you like to explore? Or ask me any specific question — I'm here! 💪`,
  ];

  return defaults[Math.floor(Math.random() * defaults.length)];
}
