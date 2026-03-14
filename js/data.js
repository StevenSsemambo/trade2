/* ═══════════════════════════════════════════
   DATA LAYER — TradeBaby Pro v4
   Market data, strategies, flashcards, patterns
   ═══════════════════════════════════════════ */

// ── MARKET DATA ──
const MARKET_DATA = {
  tickers: [
    {pair:'EUR/USD', price:1.0847, change:0.0012,  pct: 0.11},
    {pair:'GBP/USD', price:1.2634, change:-0.0023, pct:-0.18},
    {pair:'USD/JPY', price:149.82, change: 0.45,   pct: 0.30},
    {pair:'AUD/USD', price:0.6512, change: 0.0008,  pct: 0.12},
    {pair:'USD/CHF', price:0.8921, change:-0.0015,  pct:-0.17},
    {pair:'USD/CAD', price:1.3654, change: 0.0021,  pct: 0.15},
    {pair:'NZD/USD', price:0.5923, change:-0.0011,  pct:-0.19},
    {pair:'EUR/GBP', price:0.8585, change: 0.0009,  pct: 0.10},
    {pair:'EUR/JPY', price:162.44, change: 0.67,   pct: 0.41},
    {pair:'GBP/JPY', price:189.21, change:-0.34,   pct:-0.18},
    {pair:'EUR/AUD', price:1.6648, change:-0.0045,  pct:-0.27},
    {pair:'AUD/JPY', price:97.56,  change: 0.23,   pct: 0.24},
    {pair:'XAU/USD', price:2341.50,change: 8.20,   pct: 0.35},
    {pair:'XAG/USD', price:27.42,  change: 0.18,   pct: 0.66},
    {pair:'BTC/USD', price:67420,  change: 1240,   pct: 1.87},
    {pair:'ETH/USD', price:3841,   change: 56,     pct: 1.48},
    {pair:'NAS100',  price:17840,  change:-125,    pct:-0.70},
    {pair:'SPX500',  price:5234,   change: 18,     pct: 0.34},
    {pair:'US30',    price:38670,  change: 142,    pct: 0.37},
    {pair:'OIL/USD', price:78.45,  change:-0.32,   pct:-0.41},
  ]
};

// ── DAILY WISDOM ──
const DAILY_TIPS = [
  {tip:"The market is a device for transferring money from the impatient to the patient.", by:"Warren Buffett"},
  {tip:"The goal of a successful trader is to make the best trades. Money is secondary.", by:"Alexander Elder"},
  {tip:"Risk comes from not knowing what you're doing.", by:"Warren Buffett"},
  {tip:"It's not whether you're right or wrong, but how much you make when right and how much you lose when wrong.", by:"George Soros"},
  {tip:"Amateurs want to be right. Professionals want to make money.", by:"Trading Wisdom"},
  {tip:"The elements of good trading are cutting losses, cutting losses, and cutting losses.", by:"Ed Seykota"},
  {tip:"Markets can remain irrational longer than you can remain solvent.", by:"John Maynard Keynes"},
  {tip:"Trade what you see, not what you think.", by:"Larry Pesavento"},
  {tip:"Plan the trade. Trade the plan.", by:"Classic Rule"},
  {tip:"The biggest trading errors are conceptual, not execution errors.", by:"Mark Douglas"},
  {tip:"I'm always thinking about losing money as opposed to making money.", by:"Paul Tudor Jones"},
  {tip:"Without a plan, you are just gambling.", by:"Trading Wisdom"},
  {tip:"The hard work in trading comes in the preparation. The trading should be effortless.", by:"Jack Schwager"},
  {tip:"Every trade is a probability. The best you can do is tilt the odds in your favor.", by:"Trading Wisdom"},
  {tip:"The less I care about the outcome of a specific trade, the better I trade.", by:"Mark Douglas"},
  {tip:"Consistency is the mother of mastery.", by:"Trading Wisdom"},
  {tip:"Cut your losses quickly. Let your profits run.", by:"Classic Rule"},
  {tip:"A good trader must have a chronic inability to accept things at face value.", by:"Michael Lewis"},
  {tip:"Win or lose, everybody gets what they want out of the market.", by:"Ed Seykota"},
  {tip:"Be patient. Opportunities will come. Don't force trades.", by:"Trading Wisdom"},
  {tip:"Your job is not to predict the market. Your job is to react to it.", by:"Trading Wisdom"},
  {tip:"The market rewards patience and punishes greed.", by:"Trading Wisdom"},
  {tip:"Novice traders risk 5-10× too much per trade.", by:"Bruce Kovner"},
  {tip:"The goal is not to be right. The goal is to make money.", by:"Trading Wisdom"},
  {tip:"Do more of what works and less of what doesn't.", by:"Steve Clark"},
  {tip:"In trading, discipline separates the rich from the broke.", by:"Trading Wisdom"},
  {tip:"A losing trade followed perfectly is better than a winning trade broken.", by:"Trading Wisdom"},
  {tip:"Opportunities come infrequently. When it rains gold, put out the bucket, not the thimble.", by:"Warren Buffett"},
  {tip:"There is no Holy Grail in trading. There is only you, your method, and the market.", by:"Trading Wisdom"},
  {tip:"The stock market is filled with individuals who know the price of everything, but the value of nothing.", by:"Philip Fisher"},
];

// ── FLASHCARDS ──
const FLASHCARDS = [
  {q:"What is a pip?", a:"The smallest standard price movement. Most pairs: 0.0001 (4th decimal). JPY pairs: 0.01 (2nd decimal). Pipette = 0.00001 (5th decimal)."},
  {q:"What is leverage?", a:"Borrowing from your broker to control a larger position. 100:1 = $1,000 controls $100,000. Amplifies both profits AND losses equally."},
  {q:"What is the Bid price?", a:"The price at which you can SELL. Always lower than the Ask. The market maker buys from you at this price."},
  {q:"What is the Ask price?", a:"The price at which you can BUY. Always higher than the Bid. The market maker sells to you at this price."},
  {q:"What is the Spread?", a:"Difference between Bid and Ask — the broker's built-in fee. EUR/USD: normally 0.5-2 pips. Exotic pairs: 10-50+ pips. Widens dramatically during news."},
  {q:"What is a Standard Lot?", a:"100,000 currency units. On EUR/USD with USD account = ~$10 per pip movement. Too large for most beginners."},
  {q:"What is a Mini Lot?", a:"10,000 units. ~$1 per pip on EUR/USD. Good for accounts with $1,000-$5,000 balance."},
  {q:"What is a Micro Lot?", a:"1,000 units. ~$0.10 per pip on EUR/USD. Best for beginners and small accounts under $1,000."},
  {q:"What is Margin?", a:"Collateral your broker holds to keep positions open. NOT a fee. Required Margin = Position Size ÷ Leverage. Falling below required margin triggers margin call."},
  {q:"What is a Margin Call?", a:"Broker warning when your equity falls below required margin level (~100%). Must deposit more funds or close trades or broker auto-closes positions."},
  {q:"What is a Stop Loss?", a:"Auto-closes trade at predetermined loss level. Non-negotiable — ALWAYS use one. Place at logical S&R level, not random pips. Never move it further away."},
  {q:"What is a Take Profit?", a:"Auto-closes trade when it reaches your profit target. Set BEFORE entering while thinking clearly. Prevents greed from moving the goalposts mid-trade."},
  {q:"What is a Bullish Engulfing?", a:"2-candle reversal: second green candle completely engulfs the first red candle. Strong bullish reversal signal, best at downtrend lows and key support levels."},
  {q:"What is a Bearish Engulfing?", a:"2-candle reversal: second red candle completely engulfs the first green candle. Strong bearish reversal, best at uptrend highs and key resistance."},
  {q:"What is a Hammer?", a:"Small body at top, long lower wick (at least 2× body length). Buyers rejected lower prices. Bullish reversal at downtrend lows and support. Needs confirmation candle."},
  {q:"What is a Shooting Star?", a:"Small body at bottom, long upper wick (at least 2× body). Sellers rejected higher prices. Bearish reversal at uptrend highs and resistance."},
  {q:"What is a Doji?", a:"Open ≈ Close. Complete market indecision. Most powerful after a strong trend at a key S&R level. The next candle confirms the direction."},
  {q:"What is RSI?", a:"Relative Strength Index. Oscillates 0-100. Above 70 = overbought. Below 30 = oversold. RSI 50 = trend filter. Divergence = powerful reversal signal."},
  {q:"What is MACD?", a:"12EMA - 26EMA with 9EMA signal line. MACD crossing above signal = bullish. Below = bearish. Histogram shows momentum strength. Divergence warns of reversals."},
  {q:"What is the Golden Cross?", a:"50 MA crosses ABOVE the 200 MA. Major long-term bullish signal, widely watched by institutional traders and fund managers."},
  {q:"What is the Death Cross?", a:"50 MA crosses BELOW the 200 MA. Major long-term bearish signal. Often preceded by extended downtrend."},
  {q:"What is Support?", a:"Price level where buying overcomes selling — price bounces up. More tests without breaking = stronger level. Broken support becomes resistance."},
  {q:"What is Resistance?", a:"Price level where selling overcomes buying — price bounces down. More tests = stronger level. Broken resistance becomes support (role reversal)."},
  {q:"What is Role Reversal?", a:"When broken support becomes resistance, or broken resistance becomes support. Trading the retest of a broken level is one of the highest-probability setups."},
  {q:"What is the 1% Rule?", a:"Never risk more than 1-2% of your account on any single trade. Allows surviving 50+ consecutive losses. The single most important rule in trading."},
  {q:"What is Risk/Reward Ratio?", a:"Relationship between potential loss and potential gain. 1:2 R:R = risk $1 to make $2. Minimum recommended: 1:2. With 1:2 R:R, you only need 34% win rate to profit."},
  {q:"What is Expectancy?", a:"Expected profit per dollar risked. Formula: (Win% × Avg Win) - (Loss% × Avg Loss). Positive expectancy = profitable system over many trades."},
  {q:"What is a Head & Shoulders?", a:"3 peaks: left shoulder, head (highest), right shoulder. Neckline = line through the two troughs. Close below neckline = sell entry. Target = head height."},
  {q:"What is a Double Top?", a:"Two nearly equal highs at resistance. Enter SHORT on close below the neckline (middle low). Target = pattern height. Signals bullish exhaustion."},
  {q:"What is a Double Bottom?", a:"Two nearly equal lows at support. Enter LONG on close above the middle high. Target = pattern height. Signals bearish exhaustion. Also called W-pattern."},
  {q:"What is Fibonacci 61.8%?", a:"The 'Golden Ratio' Fibonacci level. Most respected retracement globally. Price often reverses here in strong trends. Also called the 'Golden Pocket'."},
  {q:"What is an Order Block?", a:"In SMC: the last bearish candle before a major bullish impulse move. Price often returns to this zone for institutions to fill remaining orders."},
  {q:"What is a Fair Value Gap?", a:"3-candle price imbalance where candle 1 and candle 3 don't overlap. Price moved too fast, leaving untraded prices. Price tends to return to fill it."},
  {q:"What is CHOCH?", a:"Change of Character — first structure break against the prevailing trend. Signals potential reversal. Used in Smart Money Concepts to identify institutional reversals."},
  {q:"What is ATR?", a:"Average True Range — measures market volatility. Use to set realistic stops (1.5-2× ATR). Higher ATR = more volatile, wider stops needed."},
  {q:"What is Bollinger Band Squeeze?", a:"When upper and lower bands narrow significantly. Signals low volatility period. Price is coiling for a breakout — often precedes big directional moves."},
  {q:"What is the London/NY Overlap?", a:"13:00-17:00 UTC. Both major sessions active. Highest volume, tightest spreads, best trends of the entire trading day. Best time to trade major pairs."},
  {q:"What is NFP?", a:"Non-Farm Payrolls — US monthly jobs report, first Friday each month. Biggest regular USD mover. 100-300 pip reactions common. Spreads widen dramatically."},
  {q:"What is Hawkish?", a:"Central bank signaling rate hikes or monetary tightening. Reduces money supply. Generally causes the currency to STRENGTHEN."},
  {q:"What is Dovish?", a:"Central bank signaling rate cuts or monetary easing. Expands money supply. Generally causes the currency to WEAKEN."},
  {q:"What is Carry Trade?", a:"Buying a high-interest currency, selling a low-interest one. Earn the interest differential (swap) daily. Best in stable, risk-on environments. Unwinds violently in crises."},
  {q:"What is Slippage?", a:"Difference between your intended execution price and actual fill price. Normal in fast markets and on market orders. Factor into calculations especially during news."},
  {q:"What is a Pin Bar?", a:"Small body with wick at least 2× body size. Long lower wick = bullish rejection. Long upper wick = bearish rejection. Most powerful at key S&R levels with confluence."},
  {q:"What is confluence?", a:"Multiple technical factors aligning at the same price level. More factors = higher probability. Example: Fibonacci 61.8% + horizontal S&R + MA200 = extremely strong setup."},
  {q:"What is a trailing stop?", a:"A dynamic stop loss that moves WITH price as your trade profits, locking in gains while letting the trade run further. Automatically moves up (or down for shorts)."},
  {q:"What is an Inside Bar?", a:"A candle whose high AND low are completely within the previous candle's range. Signals consolidation/indecision. Trade the breakout of the mother bar's range."},
  {q:"What is the Morning Star?", a:"3-candle bullish reversal: large bearish candle → small indecision candle → large bullish candle closing past midpoint of first. Best at major support levels."},
  {q:"What is the Evening Star?", a:"3-candle bearish reversal: large bullish → small indecision → large bearish closing past midpoint of first. Best at major resistance. Mirror of Morning Star."},
  {q:"What is a Marubozu?", a:"Full-body candle with no wicks. Shows maximum conviction — bulls or bears completely dominated. Often starts or confirms the beginning of a strong new trend."},
  {q:"What is the RSI 50 line?", a:"The midpoint of RSI acts as a trend filter. RSI consistently above 50 = bullish momentum. Below 50 = bearish. Used to confirm trend direction before entering trades."},
  {q:"What is Quantitative Easing (QE)?", a:"When a central bank buys assets (bonds) to inject money into the economy. Expansionary monetary policy. Generally bearish for the currency as money supply increases."},
];

// ── PATTERN QUIZ DATA ──
const PATTERN_QUIZ = [
  {
    name:'Bullish Engulfing', type:'Bullish Reversal', winrate:'63-68%', timeframe:'H4/D1',
    hint:'A small red candle followed by a large green candle that completely swallows it',
    meaning:'Strong bullish reversal — buyers overwhelmed sellers', rules:'Best at downtrend lows and key support. Larger size difference = stronger signal.',
    candles:[
      {o:0.60, h:0.61, l:0.57, c:0.58, bull:false},
      {o:0.56, h:0.65, l:0.55, c:0.64, bull:true}
    ]
  },
  {
    name:'Bearish Engulfing', type:'Bearish Reversal', winrate:'61-66%', timeframe:'H4/D1',
    hint:'A small green candle followed by a large red candle that completely swallows it',
    meaning:'Strong bearish reversal — sellers overwhelmed buyers', rules:'Best at uptrend highs and key resistance. Most powerful on D1 after strong rallies.',
    candles:[
      {o:0.58, h:0.63, l:0.57, c:0.62, bull:true},
      {o:0.64, h:0.65, l:0.54, c:0.55, bull:false}
    ]
  },
  {
    name:'Hammer', type:'Bullish Reversal', winrate:'60-65%', timeframe:'All TFs',
    hint:'Small body at the TOP of the candle with a very long lower wick',
    meaning:'Buyers rejected lower prices — potential bottom', rules:'Appears at downtrend lows. Lower wick must be at least 2× body. Confirmation candle needed.',
    candles:[
      {o:0.62, h:0.63, l:0.50, c:0.61, bull:true},
    ]
  },
  {
    name:'Shooting Star', type:'Bearish Reversal', winrate:'59-64%', timeframe:'All TFs',
    hint:'Small body at the BOTTOM of the candle with a very long upper wick',
    meaning:'Sellers rejected higher prices — potential top', rules:'Appears at uptrend highs. Upper wick must be 2× body. Best at strong resistance levels.',
    candles:[
      {o:0.60, h:0.73, l:0.59, c:0.61, bull:true},
    ]
  },
  {
    name:'Doji', type:'Indecision/Reversal', winrate:'55-60%', timeframe:'H4/D1',
    hint:'Open and close prices are nearly identical — creating a cross or plus sign shape',
    meaning:'Complete indecision — neither bulls nor bears in control', rules:'Most powerful after a strong trend at a key S&R level. Next candle confirms direction.',
    candles:[
      {o:0.60, h:0.66, l:0.54, c:0.60, bull:true},
    ]
  },
  {
    name:'Morning Star', type:'Strong Bullish Reversal', winrate:'67-72%', timeframe:'D1/H4',
    hint:'Three candles: large bearish, small middle candle, large bullish',
    meaning:'Bears exhausted — bulls take control. One of the strongest reversal patterns.',
    rules:'Middle candle must be small (indecision). Third candle must close past midpoint of first. Best at major support.',
    candles:[
      {o:0.68, h:0.69, l:0.55, c:0.56, bull:false},
      {o:0.55, h:0.58, l:0.53, c:0.56, bull:true},
      {o:0.57, h:0.71, l:0.56, c:0.69, bull:true}
    ]
  },
  {
    name:'Evening Star', type:'Strong Bearish Reversal', winrate:'65-70%', timeframe:'D1/H4',
    hint:'Three candles: large bullish, small middle candle, large bearish',
    meaning:'Bulls exhausted — bears take control. Mirror of Morning Star.',
    rules:'Best at major resistance after extended uptrend. Third candle must close past midpoint of first.',
    candles:[
      {o:0.52, h:0.65, l:0.51, c:0.64, bull:true},
      {o:0.64, h:0.67, l:0.62, c:0.63, bull:false},
      {o:0.63, h:0.64, l:0.50, c:0.51, bull:false}
    ]
  },
  {
    name:'Pin Bar', type:'Bullish/Bearish Reversal', winrate:'62-67%', timeframe:'H4/D1',
    hint:'Very small body with a wick that is at least 2-3× the body length on one side',
    meaning:'Strong price rejection — potential reversal if at key level',
    rules:'Lower wick = bullish rejection (buy at support). Upper wick = bearish rejection (sell at resistance). Context is everything.',
    candles:[
      {o:0.62, h:0.63, l:0.47, c:0.61, bull:true},
    ]
  },
  {
    name:'Bullish Pin Bar', type:'Bullish Reversal', winrate:'62-67%', timeframe:'H4/D1',
    hint:'Long lower wick, small body near the top — buyers strongly rejected lower prices',
    meaning:'Strong bullish rejection at support', rules:'Enter at 50% retracement of the wick. SL below wick extreme. Best at Fibonacci + S&R confluence.',
    candles:[
      {o:0.61, h:0.63, l:0.48, c:0.62, bull:true},
    ]
  },
  {
    name:'Three White Soldiers', type:'Strong Bullish', winrate:'70-75%', timeframe:'D1',
    hint:'Three consecutive large green candles, each closing higher than the last',
    meaning:'Strong momentum shift — bulls completely in control', rules:'Each opens near previous close. Appears at major lows. One of highest-probability reversal patterns.',
    candles:[
      {o:0.54, h:0.59, l:0.53, c:0.58, bull:true},
      {o:0.58, h:0.64, l:0.57, c:0.63, bull:true},
      {o:0.63, h:0.70, l:0.62, c:0.69, bull:true}
    ]
  },
  {
    name:'Three Black Crows', type:'Strong Bearish', winrate:'68-73%', timeframe:'D1',
    hint:'Three consecutive large red candles, each closing lower than the last',
    meaning:'Strong momentum shift — bears completely in control', rules:'Each opens near previous close. Appears at major highs. Mirror of Three White Soldiers.',
    candles:[
      {o:0.68, h:0.69, l:0.62, c:0.63, bull:false},
      {o:0.63, h:0.64, l:0.57, c:0.58, bull:false},
      {o:0.58, h:0.59, l:0.51, c:0.52, bull:false}
    ]
  },
  {
    name:'Tweezer Bottom', type:'Bullish Reversal', winrate:'58-63%', timeframe:'H4/D1',
    hint:'Two candles with nearly identical LOWS — price tested the same low twice',
    meaning:'Double rejection of lower prices — strong support', rules:'Two candles with matching lows at support. Second candle should be bullish. Shows failed bearish pressure.',
    candles:[
      {o:0.65, h:0.66, l:0.55, c:0.56, bull:false},
      {o:0.55, h:0.63, l:0.55, c:0.62, bull:true}
    ]
  },
];

// ── CANDLESTICK BIBLE ──
const CANDLE_PATTERNS = [
  {name:'Hammer', type:'Bullish Reversal', reliability:'★★★★', timeframe:'All TFs', emoji:'🔨',
   desc:'Small body at top, long lower wick (at least 2× body size). Price tested lower but buyers closed it near the high. Represents failed bearish pressure.',
   rules:'Must appear at bottom of downtrend. Lower wick ≥ 2× body. Little or no upper wick. Requires confirmation from next candle closing higher.',
   stats:'Win rate at key support: 60-65%. Mid-range: ~48%. D1/H4 most reliable. Power increases at Fibonacci + S&R confluence.'},
  {name:'Inverted Hammer', type:'Bullish Reversal', reliability:'★★★', timeframe:'H4/D1', emoji:'🔁',
   desc:'Small body at bottom, long upper wick. Buyers pushed up but lost control. Potential reversal when at downtrend lows.',
   rules:'At downtrend bottoms only. Needs bullish confirmation candle to be valid. Treat as tentative signal until confirmed.',
   stats:'Win rate with confirmation: ~55%. Less reliable than regular hammer. Never trade without the confirmation candle.'},
  {name:'Shooting Star', type:'Bearish Reversal', reliability:'★★★★', timeframe:'All TFs', emoji:'⭐',
   desc:'Small body at bottom, long upper wick (2× body). Sellers rejected higher prices. The classic bearish reversal candle.',
   rules:'Appears at top of uptrend. Upper wick ≥ 2× body. Little/no lower wick. Best at round numbers and key resistance.',
   stats:'Win rate at resistance: 59-64%. Most powerful at weekly/monthly highs. Bearish confirmation increases reliability.'},
  {name:'Hanging Man', type:'Bearish Warning', reliability:'★★★', timeframe:'H4/D1', emoji:'🪢',
   desc:'Identical shape to hammer but appears at uptrend highs. Warning that selling pressure is emerging despite bullish close.',
   rules:'Must appear at top of uptrend to be bearish. Requires strong bearish confirmation next candle. Without confirmation, ignore.',
   stats:'Win rate with confirmation: ~54%. Weaker signal than shooting star. Only trade with strong bearish follow-through.'},
  {name:'Doji', type:'Indecision/Reversal', reliability:'★★★', timeframe:'H4/D1', emoji:'✚',
   desc:'Open ≈ Close. Complete equilibrium between buyers and sellers. Neither side won the battle.',
   rules:'Most powerful after a strong sustained trend at a key level. Next candle MUST confirm direction. Four subtypes: standard, long-legged, dragonfly, gravestone.',
   stats:'Standard doji reversal rate at S&R: ~55%. Dragonfly (bullish): 62%. Gravestone (bearish): 61%. Useless without context.'},
  {name:'Dragonfly Doji', type:'Bullish Reversal', reliability:'★★★★', timeframe:'H4/D1', emoji:'🐉',
   desc:'Open = Close at the HIGH. Long lower wick. Strong bullish signal — price tested lows and was completely rejected.',
   rules:'Forms when open and close are at or near the session high. At support levels or downtrend bottoms. Very bullish signal.',
   stats:'Win rate at key support: 62-67%. One of the more reliable single-candle patterns. Similar to hammer but with more symmetry.'},
  {name:'Gravestone Doji', type:'Bearish Reversal', reliability:'★★★★', timeframe:'H4/D1', emoji:'🪦',
   desc:'Open = Close at the LOW. Long upper wick. Strong bearish signal — price tested highs and was completely rejected.',
   rules:'Forms when open and close are at or near the session low. At resistance or uptrend highs. Very bearish signal.',
   stats:'Win rate at key resistance: 61-66%. Most powerful at weekly/monthly highs. Also called the "tombstone" doji.'},
  {name:'Bullish Engulfing', type:'Bullish Reversal', reliability:'★★★★★', timeframe:'All TFs', emoji:'🐂',
   desc:'Second green candle completely engulfs the first red candle. One of the most reliable and widely traded reversal patterns.',
   rules:'Green candle opens below red close, closes above red open. At downtrend lows or support. Larger size difference = stronger. Body engulfment matters more than wicks.',
   stats:'Win rate at S&R: 63-68%. Best pattern for reversal trading on H4/D1. Power increases with larger green candle.'},
  {name:'Bearish Engulfing', type:'Bearish Reversal', reliability:'★★★★★', timeframe:'All TFs', emoji:'🐻',
   desc:'Second red candle completely engulfs the first green candle. The bearish mirror of bullish engulfing.',
   rules:'Red candle opens above green close, closes below green open. At uptrend highs or resistance. Most powerful on D1 after extended rallies.',
   stats:'Win rate at resistance: 61-66%. Especially powerful at the top of strong, multi-week uptrends.'},
  {name:'Morning Star', type:'Strong Bullish Reversal', reliability:'★★★★★', timeframe:'D1/H4', emoji:'☀️',
   desc:'3 candles: large bearish → small indecision → large bullish. The classic powerful bottom reversal. Represents complete sentiment shift.',
   rules:'Strong bearish first candle. Small middle candle (can be any color). Large bullish third candle closing past first candle midpoint. At major support only.',
   stats:'Win rate at major support: 67-72%. One of the highest probability 3-candle patterns. Context is critical — at major support only.'},
  {name:'Evening Star', type:'Strong Bearish Reversal', reliability:'★★★★★', timeframe:'D1/H4', emoji:'🌙',
   desc:'3 candles: large bullish → small indecision → large bearish. The classic top reversal. Mirror of Morning Star.',
   rules:'Large bullish first candle. Small middle candle. Large bearish third closing past first midpoint. At major resistance after extended uptrend.',
   stats:'Win rate at major resistance: 65-70%. Most powerful when forming at multi-month or yearly highs.'},
  {name:'Marubozu', type:'Trend Confirmation', reliability:'★★★★', timeframe:'All TFs', emoji:'📊',
   desc:'Full-body candle with no wicks or very small wicks. Maximum conviction — one side completely dominated the session.',
   rules:'Bullish marubozu: opens at low, closes at high. Bearish: opens at high, closes at low. Signals strong momentum continuation.',
   stats:'Trend continuation rate: 58-65%. After consolidation, often launches a new strong trend. Very reliable momentum signal.'},
  {name:'Three White Soldiers', type:'Strong Bullish', reliability:'★★★★★', timeframe:'D1', emoji:'⚔️',
   desc:'Three consecutive large bullish candles, each opening within and closing above the previous. Maximum bullish conviction.',
   rules:'Each candle must be large. Each opens near previous close (minimal gap). At major lows after extended downtrend.',
   stats:'Win rate at major lows: 70-75%. One of the highest probability multi-candle patterns. Very rare but very reliable.'},
  {name:'Three Black Crows', type:'Strong Bearish', reliability:'★★★★★', timeframe:'D1', emoji:'🐦‍⬛',
   desc:'Three consecutive large bearish candles, each closing lower. Maximum bearish conviction. Mirror of Three White Soldiers.',
   rules:'Each candle large and closes lower. Each opens near previous close. At major highs after extended uptrend.',
   stats:'Win rate at major highs: 68-73%. Often seen at tops of major bull runs. Treat with extreme seriousness.'},
  {name:'Piercing Line', type:'Bullish Reversal', reliability:'★★★★', timeframe:'H4/D1', emoji:'🗡️',
   desc:'Two candles: large bearish, then bullish that opens below the low and closes above the midpoint of the bearish candle.',
   rules:'At downtrend lows. Bullish candle must close past 50% of bearish candle. Like a partial engulfing.',
   stats:'Win rate at support: 58-63%. Similar to engulfing but green candle does not fully engulf. Requires confirmation.'},
  {name:'Dark Cloud Cover', type:'Bearish Reversal', reliability:'★★★★', timeframe:'H4/D1', emoji:'⛈️',
   desc:'Two candles: large bullish, then bearish that opens above the high and closes below the midpoint of the bullish candle.',
   rules:'At uptrend highs or resistance. Bearish candle must close past 50% of bullish candle. Mirror of Piercing Line.',
   stats:'Win rate at resistance: 56-61%. More reliable on D1 than H4. Confirmation helps.'},
  {name:'Tweezer Top', type:'Bearish Reversal', reliability:'★★★', timeframe:'H4/D1', emoji:'🔧',
   desc:'Two consecutive candles with matching or near-matching HIGHS at resistance. Price tested the same high twice and rejected both times.',
   rules:'Must appear at resistance or swing highs. Second candle should be bearish. Extra powerful at round numbers.',
   stats:'Win rate at resistance: 58-63%. More reliable when highs align exactly. Add confluence for higher probability.'},
  {name:'Tweezer Bottom', type:'Bullish Reversal', reliability:'★★★', timeframe:'H4/D1', emoji:'🔩',
   desc:'Two consecutive candles with matching lows at support. Price tested the same low twice and bounced both times.',
   rules:'Must appear at support or swing lows. Second candle should be bullish. Best at major support levels.',
   stats:'Win rate at support: 57-62%. Most reliable when lows match exactly. Fibonacci + S&R confluence increases probability significantly.'},
];

// ── STRATEGIES ──
const STRATEGIES = [
  {
    id:'london-breakout', name:'London Breakout', style:'Day Trade', tf:'H1/M15',
    pairs:'EUR/USD, GBP/USD, EUR/JPY', winrate:'58%', rr:'1:2', difficulty:2, emoji:'🇬🇧', color:'var(--blue)',
    desc:'Capture the explosive move at London open (08:00 UTC) when major institutional traders enter the market.',
    rules:[
      'Mark the Asian session range: highest high and lowest low from 00:00-07:00 UTC',
      'At London open (08:00 UTC), wait for a candle to CLOSE above the Asian high or below Asian low',
      'BUY on confirmed close above Asian high | SELL on confirmed close below Asian low',
      'Stop Loss: 10-15 pips beyond the broken range extreme',
      'Take Profit: 1.5-2× the full height of the Asian session range',
      'Risk per trade: maximum 1% of account balance',
      'Avoid: Mondays (gap risk), holidays, days with Asian range >80 pips',
      'Best pairs: EUR/USD and GBP/USD. Avoid exotic pairs on this strategy',
    ],
    backtest:'Historical win rate ~58% on EUR/USD (2018-2024). Performs best when aligned with D1 trend direction. Weakest in July-August low-volume months.'
  },
  {
    id:'trend-pullback', name:'EMA Trend Pullback', style:'Swing/Day', tf:'H4/H1',
    pairs:'All Major Pairs', winrate:'52%', rr:'1:3', difficulty:2, emoji:'〰️', color:'var(--green)',
    desc:'Enter on pullbacks to the 21 EMA in a confirmed trend. Patient, high R:R approach used by many professional traders.',
    rules:[
      'H4 uptrend confirmed: price above both 21 EMA AND 50 EMA, both sloping upward',
      'Wait for price to pull back to the 21 EMA zone (within 5-10 pips)',
      'Look for bullish confirmation candle: hammer, bullish engulfing, or doji + bull candle',
      'Enter on the open of the next candle after confirmation',
      'Stop Loss: below the swing low of the pullback (NOT below the EMA)',
      'Take Profit: at previous swing high OR 3× your risk amount',
      'Move stop to break-even after price moves 1× risk in your favor',
      'For downtrends: exact reverse (sell at EMA retest with bearish confirmation)',
    ],
    backtest:'Best performance in ADX>25 trending conditions. Struggles in choppy markets. Filter: only trade when 21 EMA slope is clearly visible.'
  },
  {
    id:'support-bounce', name:'Support & Resistance Bounce', style:'Swing', tf:'D1/H4',
    pairs:'All Pairs', winrate:'55%', rr:'1:2.5', difficulty:1, emoji:'📏', color:'var(--gold)',
    desc:'The most fundamental strategy in trading. Buy at strong support, sell at strong resistance. Excellent for beginners.',
    rules:[
      'Mark key S&R levels on D1 timeframe — minimum 3 clear touch points',
      'Wait for price to approach the zone (within 10-15 pips)',
      'Look for reversal confirmation: pin bar, doji, or engulfing candle',
      'Enter on H4 or H1 after confirmation candle CLOSES',
      'Stop Loss: 10-20 pips beyond the S&R zone',
      'Take Profit: next significant S&R level on the opposite side',
      'Trade is only valid if R:R is minimum 1:2',
      'Avoid entering 30 minutes before or after high-impact news events',
    ],
    backtest:'Best when S&R coincides with round numbers (1.1000, 1.2000). Most reliable and learnable strategy for beginners. Start here.'
  },
  {
    id:'breakout-retest', name:'Breakout & Retest', style:'Day/Swing', tf:'H4/H1',
    pairs:'All Major Pairs', winrate:'48%', rr:'1:3', difficulty:2, emoji:'🔥', color:'var(--orange)',
    desc:'Enter the second-chance move after a key level breaks and price retests it. Lower risk than chasing breakouts.',
    rules:[
      'Mark S&R level with at least 3 clear touches in recent history',
      'Wait for a strong momentum candle that CLOSES beyond the level',
      'Allow price to pull back and retest the broken level',
      'Enter on a confirmation candle at the retest showing rejection',
      'Stop Loss: beyond the retested level (it should now be new S/R)',
      'Take Profit: measure the consolidation range, project same distance from breakout',
      'Must wait for the retest — never chase the initial breakout',
      'Avoid if consolidation lasted less than 4 hours',
    ],
    backtest:'False breakouts common (48% win rate). The retest entry provides much better R:R than chasing the initial break. Patience critical.'
  },
  {
    id:'rsi-divergence', name:'RSI Divergence', style:'Swing', tf:'H4/D1',
    pairs:'EUR/USD, GBP/JPY, XAU/USD', winrate:'45%', rr:'1:4', difficulty:3, emoji:'📊', color:'var(--purple)',
    desc:'Identify momentum divergence between price and RSI to catch high R:R reversals. Best at key confluence zones.',
    rules:[
      'On H4 or D1: price makes new HIGH but RSI makes lower high = bearish divergence',
      'Or price makes new LOW but RSI makes higher low = bullish divergence',
      'Divergence MUST occur at a major S&R level for confluence',
      'Divergence should span at least 20+ candles for significance',
      'Wait for a candlestick confirmation pattern after the divergence',
      'Enter on the CLOSE of the confirmation candle',
      'Stop Loss: beyond the swing high/low that formed the divergence',
      'Take Profit: next major S&R level (target 1:4 R:R minimum)',
    ],
    backtest:'Lower win rate but exceptional R:R when correct. Best on H4/D1. Avoid M5/M15 — too many false signals. Must have S&R confluence.'
  },
  {
    id:'smc-order-block', name:'SMC Order Block Entry', style:'Day Trade', tf:'H1/M15',
    pairs:'EUR/USD, GBP/USD, NAS100', winrate:'50%', rr:'1:3', difficulty:4, emoji:'🏛️', color:'var(--cyan)',
    desc:'Institutional-style trading using Smart Money Concepts. Enter at Order Blocks after Change of Character.',
    rules:[
      'Step 1: Identify H4/D1 market structure direction (BOS confirms trend)',
      'Step 2: On H1, wait for CHOCH — first structure break against the trend',
      'Step 3: Mark the Order Block (last bearish candle before the bullish CHOCH impulse)',
      'Step 4: Wait for price to retrace back to the Order Block zone',
      'Step 5: On M15, look for FVG fill or bullish confirmation at the OB',
      'Stop Loss: 3-5 pips below the Order Block low/high',
      'Take Profit: at next liquidity pool (previous swing high/equal highs)',
      'Invalidate OB if it has been tested more than 2 times previously',
    ],
    backtest:'Requires significant screen time to identify correctly. High R:R when mastered. Popular but heavily saturated — use with additional confluence.'
  },
  {
    id:'inside-bar', name:'Inside Bar Breakout', style:'Swing/Day', tf:'D1/H4',
    pairs:'All Major Pairs', winrate:'52%', rr:'1:2.5', difficulty:2, emoji:'📦', color:'var(--blue)',
    desc:'Trade the directional breakout from an Inside Bar consolidation. Mechanical rules with clear entry and exit.',
    rules:[
      'Identify Inside Bar: high AND low are completely within the previous candle (mother bar)',
      'Mother bar should be a strong directional candle',
      'Best setup: inside bar at a key S&R level or after a strong impulse move',
      'Set Buy Stop 1-2 pips above the Inside Bar high (breakout to upside)',
      'Set Sell Stop 1-2 pips below the Inside Bar low (breakout to downside)',
      'Stop Loss: opposite side of the Inside Bar + 3 pip buffer',
      'Take Profit: 2-2.5× the height of the Inside Bar',
      'Cancel pending orders if not triggered after 3 candles',
    ],
    backtest:'Clean mechanical rules. D1/H4 most reliable. M15/M30 generates too many false breakouts. Best after strong trend moves.'
  },
  {
    id:'pin-bar', name:'Pin Bar Reversal', style:'Swing', tf:'H4/D1',
    pairs:'All Majors + Gold', winrate:'53%', rr:'1:2', difficulty:2, emoji:'📌', color:'var(--purple)',
    desc:'High-probability reversal entries at key price rejection points. Visual, intuitive, and reliable at confluence zones.',
    rules:[
      'Pin bar criteria: wick must be at least 2× the body length, body ≤ 1/3 total candle length',
      'Bullish pin bar: long lower wick at support zone',
      'Bearish pin bar: long upper wick at resistance zone',
      'MUST be at major S&R, Fibonacci level, or MA200 for validity',
      'Optimal entry: limit order at 50% retracement of the pin bar wick',
      'Stop Loss: 3-5 pips beyond the extreme of the wick',
      'Take Profit: next major S&R level (minimum 2:1 R:R required)',
      'Mid-range pin bars without context = low probability, skip them',
    ],
    backtest:'Highly effective when context is clear. Same pattern mid-range = ~40% win rate. At strong S&R with confluence: 60-67% win rate.'
  },
  {
    id:'scalping-5min', name:'5-Minute Scalping', style:'Scalping', tf:'M5/M1',
    pairs:'EUR/USD, USD/JPY', winrate:'60%', rr:'1:1.5', difficulty:5, emoji:'⚡', color:'var(--red)',
    desc:'Quick in-and-out micro trades during peak London/NY hours. High intensity. Not for beginners.',
    rules:[
      'ONLY trade during London/NY overlap: 13:00-17:00 UTC',
      'Use M15 chart to determine trend direction — only trade in that direction',
      'On M5: enter on pullback to 9 EMA that shows rejection confirmation',
      'Stop Loss: maximum 5-8 pips on EUR/USD',
      'Take Profit: 8-12 pips target (1.5:1 R:R minimum)',
      'Maximum 5 trades per session — quality over quantity',
      'STOP trading after 2 consecutive losses for the session, no exceptions',
      'Requires ECN broker with raw spreads. Regular broker spreads make scalping unprofitable.',
    ],
    backtest:'Requires raw spread ECN broker. Commission-heavy. Not viable with >1.5 pip spread. Strict session discipline is essential.'
  },
  {
    id:'carry-trade', name:'Carry Trade', style:'Position', tf:'W1/D1',
    pairs:'AUD/JPY, NZD/JPY, USD/TRY', winrate:'65%', rr:'1:5+', difficulty:3, emoji:'💰', color:'var(--green)',
    desc:'Profit from interest rate differentials by holding high-rate vs low-rate currency positions for weeks or months.',
    rules:[
      'Identify pairs with significant interest rate differential (check broker swap rates)',
      'Buy the high-interest-rate currency, sell the low-interest currency',
      'Confirm D1 uptrend in the direction of the carry (technical alignment)',
      'Check broker swap rates before entering — they vary significantly',
      'Wide stop loss: 100-200 pips (noise filter for long-term hold)',
      'Hold position for weeks to months to accumulate positive swap',
      'Exit immediately if central bank changes rate outlook',
      'Reduce to 25% position size during high-uncertainty risk-off periods',
    ],
    backtest:'AUD/JPY historically strongest carry pair. Devastating in 2008 crisis and 2020 COVID (-40% in days). Always size conservatively.'
  },
];
