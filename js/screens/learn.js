/* ═══════════════════════════════════════════
   LEARN, PROFILE, TOOLS SCREENS
   ═══════════════════════════════════════════ */

// ── LEARN ──
function renderLearn() {
  const pct = progressPct();
  return `<div class="screen-pad">
    <div class="pg-header a-fadeup" style="padding:0 0 12px">
      <div>
        <h1 class="pg-title">Academy</h1>
        <div style="font-size:12px;color:var(--txt2)">${completedCount()}/${totalLessons()} lessons · ${pct}% complete</div>
      </div>
      <div style="display:flex;gap:6px">
        <button class="btn btn-ghost btn-sm" onclick="navigate('skillmap')">🗺️</button>
        <button class="btn btn-ghost btn-sm" onclick="navigate('flashcards')">🃏</button>
      </div>
    </div>

    <div class="card a-fadeup2" style="padding:14px;margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;margin-bottom:6px">
        <span style="font-size:12px;color:var(--txt2)">Overall Progress</span>
        <span style="font-size:12px;color:var(--gold);font-family:var(--mono)">${pct}%</span>
      </div>
      <div class="prog-bar lg"><div class="prog-fill" style="width:${pct}%"></div></div>
    </div>

    <!-- Learning Tools -->
    <div class="h-scroll a-fadeup2" style="margin-bottom:16px">
      ${[
        {icon:'🕯️', label:'Candle Bible', sub:CANDLE_PATTERNS.length+' patterns', action:'candlebible'},
        {icon:'🎮', label:'Pattern Game', sub:'Earn XP', action:'patterns'},
        {icon:'🃏', label:'Flashcards', sub:FLASHCARDS.length+' cards', action:'flashcards'},
        {icon:'⚔️', label:'Strategies', sub:STRATEGIES.length+' setups', action:'strategies'},
        {icon:'🗺️', label:'Skill Map', sub:'Visual roadmap', action:'skillmap'},
        {icon:'📖', label:'Curriculum', sub:'Full syllabus', action:'curriculum'},
      ].map(a => `
        <div class="card card-tappable" onclick="navigate('${a.action}')" style="flex-shrink:0;width:110px;padding:12px;cursor:pointer">
          <div style="font-size:24px;margin-bottom:6px">${a.icon}</div>
          <div style="font-size:12px;font-weight:700;font-family:var(--display)">${a.label}</div>
          <div style="font-size:10px;color:var(--txt3);margin-top:2px">${a.sub}</div>
        </div>
      `).join('')}
    </div>

    <!-- Curriculum -->
    ${CURRICULUM.map((cat, ci) => {
      const catDone = cat.lessons.filter(l => STATE.progress[l.id]).length;
      const catPct = Math.round((catDone / cat.lessons.length) * 100);
      return `<div class="a-fadeup" style="animation-delay:${ci * .05}s;margin-bottom:20px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-size:20px">${cat.emoji}</span>
            <div>
              <div style="font-family:var(--display);font-weight:700;font-size:14px">${cat.title}</div>
              <div style="font-size:11px;color:var(--txt2)">${catDone}/${cat.lessons.length} done</div>
            </div>
          </div>
          <span class="pill ${catPct === 100 ? 'pill-green' : 'pill-gold'}">${catPct}%</span>
        </div>
        <div class="prog-bar sm" style="margin-bottom:10px">
          <div class="prog-fill" style="width:${catPct}%"></div>
        </div>
        ${cat.lessons.map((l, li) => {
          const done = STATE.progress[l.id];
          const prevDone = li === 0 || STATE.progress[cat.lessons[li-1].id];
          const isCurrent = !done && prevDone;
          return `<div class="lesson-card ${done ? 'done' : isCurrent ? 'current' : ''}" onclick="openLesson('${l.id}')">
            <div class="lesson-icon">${l.emoji}</div>
            <div class="lesson-meta">
              <div class="lesson-title">${l.title}</div>
              <div class="lesson-sub">⏱ ${l.mins} min · +${l.xp || 50} XP${done ? ' · ✓ Done' : isCurrent ? ' · Start here' : ''}</div>
            </div>
            <div class="lesson-check ${done ? 'done' : ''}">
              ${done ? '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
            </div>
          </div>`;
        }).join('')}
      </div>`;
    }).join('')}
  </div>`;
}

// ── LESSON DETAIL ──
let _currentLesson = null;

function openLesson(id) {
  const found = getLessonById(id);
  if (!found) return;
  _currentLesson = found;
  STATE.screen = 'lesson';
  renderScreen('lesson');
  document.getElementById('screen-wrap').scrollTop = 0;
  addXP(2);
}

function renderLesson() {
  if (!_currentLesson) { navigate('learn'); return ''; }
  const {lesson: l, category: cat} = _currentLesson;
  const done = STATE.progress[l.id];
  const allInCat = cat.lessons;
  const idx = allInCat.findIndex(x => x.id === l.id);
  const quiz = (typeof QUIZZES !== 'undefined') ? QUIZZES[l.id] : null;

  return `<div class="screen-pad">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px" class="a-fadeup">
      <button class="back-btn" onclick="navigate('learn')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div style="flex:1">
        <div style="font-size:10px;color:var(--gold);font-family:var(--display);font-weight:700;letter-spacing:1px">${cat.title.toUpperCase()}</div>
        <div style="font-size:11px;color:var(--txt3)">Lesson ${idx + 1} of ${allInCat.length}</div>
      </div>
      ${done ? '<span class="pill pill-green">✓ Done</span>' : ''}
    </div>

    <div class="a-fadeup2" style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
      <div style="font-size:38px;flex-shrink:0">${l.emoji}</div>
      <div>
        <h1 style="font-size:20px;line-height:1.2">${l.title}</h1>
        <div style="font-size:12px;color:var(--txt2);margin-top:4px">⏱ ${l.mins} min · +${l.xp || 50} XP on completion</div>
      </div>
    </div>

    <div class="a-fadeup3 lesson-body">${l.content}</div>

    ${quiz ? renderLessonQuiz(l.id, quiz) : ''}

    <div class="a-fadeup4" style="margin-top:24px;display:flex;gap:10px">
      ${!done
        ? `<button class="btn btn-gold" onclick="completelesson('${l.id}')">✓ Mark Complete · +${l.xp || 50} XP</button>`
        : `<button class="btn btn-ghost btn-sm" onclick="navigate('learn')" style="width:auto">← Back</button>`
      }
      ${idx < allInCat.length - 1
        ? `<button class="btn btn-outline btn-sm" onclick="openLesson('${allInCat[idx + 1].id}')" style="width:auto">Next →</button>`
        : ''
      }
    </div>

    ${idx < allInCat.length - 1 ? `
    <div style="margin-top:20px">
      <div class="section-lbl">Up Next</div>
      <div class="lesson-card" onclick="openLesson('${allInCat[idx + 1].id}')">
        <div class="lesson-icon">${allInCat[idx + 1].emoji}</div>
        <div class="lesson-meta">
          <div class="lesson-title">${allInCat[idx + 1].title}</div>
          <div class="lesson-sub">⏱ ${allInCat[idx + 1].mins} min · +${allInCat[idx + 1].xp || 50} XP</div>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
    </div>` : ''}
  </div>`;
}

function renderLessonQuiz(lessonId, questions) {
  const results = STATE.quizResults[lessonId] || {};
  const allDone = questions.every((_, i) => results[i] !== undefined);
  if (allDone) {
    const score = questions.filter((_, i) => results[i] === true).length;
    return `<div class="card card-green" style="padding:14px;margin-top:16px">
      <div style="font-family:var(--display);font-weight:700;margin-bottom:4px">✓ Quiz Complete!</div>
      <div style="font-size:13px;color:var(--txt2)">Score: ${score}/${questions.length} · ${Math.round(score/questions.length*100)}%</div>
      <button class="btn btn-ghost btn-xs" style="margin-top:8px" onclick="delete STATE.quizResults['${lessonId}'];saveState();renderScreen('lesson')">Retry</button>
    </div>`;
  }
  return `<div style="margin-top:16px">
    <div class="section-lbl">Quick Quiz</div>
    ${questions.map((q, i) => {
      if (results[i] !== undefined) {
        return `<div class="card" style="padding:12px;margin-bottom:8px;background:${results[i] ? 'var(--green-bg)' : 'var(--red-bg)'}">
          <div style="font-size:13px;font-weight:600;margin-bottom:6px">${q.q}</div>
          ${q.opts.map((o, oi) => `<div style="padding:3px 0;font-size:12px;color:${oi===q.correct?'var(--green)':oi===results[i+'-p']&&!results[i]?'var(--red)':'var(--txt3)'}">
            ${oi===q.correct?'✓':oi===results[i+'-p']&&!results[i]?'✗':''} ${o}
          </div>`).join('')}
        </div>`;
      }
      return `<div class="card" style="padding:12px;margin-bottom:10px">
        <div style="font-size:13px;font-weight:600;margin-bottom:8px">${q.q}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
          ${q.opts.map((o, oi) => `<div class="pattern-opt" onclick="answerQuiz('${lessonId}',${i},${oi},${q.correct})">${o}</div>`).join('')}
        </div>
      </div>`;
    }).join('')}
  </div>`;
}

function answerQuiz(lessonId, qi, picked, correct) {
  if (!STATE.quizResults[lessonId]) STATE.quizResults[lessonId] = {};
  const right = picked === correct;
  STATE.quizResults[lessonId][qi] = right;
  STATE.quizResults[lessonId][qi + '-p'] = picked;
  if (right) { addXP(15); showToast('✅ Correct! +15 XP'); }
  else showToast('❌ Incorrect — check the highlighted answer');
  saveState();
  renderScreen('lesson');
}

function completelesson(id) {
  if (!STATE.progress[id]) {
    STATE.progress[id] = true;
    const found = getLessonById(id);
    const xp = found?.lesson?.xp || 50;
    addXP(xp);
    showToast(`🎓 Lesson complete! +${xp} XP`);
    saveState();
  }
  renderScreen('lesson');
}

// ── CURRICULUM OVERVIEW ──
function renderCurriculum() {
  return `<div class="screen-pad">
    <div class="pg-header a-fadeup" style="padding:0 0 14px">
      <div style="display:flex;gap:10px;align-items:center">
        <button class="back-btn" onclick="navigate('learn')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>
        <div><h1 class="pg-title">Full Curriculum</h1><div style="font-size:12px;color:var(--txt2)">${totalLessons()} lessons across ${CURRICULUM.length} subjects</div></div>
      </div>
    </div>
    ${CURRICULUM.map(cat => `
      <div class="a-fadeup" style="margin-bottom:16px">
        <div class="card card-gold" style="padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px;cursor:pointer" onclick="navigate('learn')">
          <span style="font-size:24px">${cat.emoji}</span>
          <div style="flex:1">
            <div style="font-family:var(--display);font-weight:700;font-size:15px">${cat.title}</div>
            <div style="font-size:12px;color:var(--txt2);margin-top:2px">${cat.desc}</div>
          </div>
          <span class="pill ${cat.lessons.filter(l=>STATE.progress[l.id]).length===cat.lessons.length?'pill-green':'pill-gold'}">${cat.lessons.filter(l=>STATE.progress[l.id]).length}/${cat.lessons.length}</span>
        </div>
        ${cat.lessons.map(l => `
          <div style="padding:8px 12px;border-bottom:1px solid var(--bdr2);display:flex;align-items:center;gap:10px;cursor:pointer;background:var(--bg3);border-radius:0" onclick="openLesson('${l.id}')">
            <span style="font-size:16px">${l.emoji}</span>
            <div style="flex:1">
              <div style="font-size:13px;font-weight:600">${l.title}</div>
              <div style="font-size:10px;color:var(--txt3)">${l.mins} min</div>
            </div>
            ${STATE.progress[l.id] ? '<span style="color:var(--green);font-size:14px">✓</span>' : '<span style="color:var(--txt3);font-size:12px">→</span>'}
          </div>
        `).join('')}
      </div>
    `).join('')}
  </div>`;
}

// ── SKILL MAP ──
function renderSkillMap() {
  return `<div class="screen-pad">
    <div class="pg-header a-fadeup" style="padding:0 0 14px">
      <div style="display:flex;gap:10px;align-items:center">
        <button class="back-btn" onclick="navigate('learn')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>
        <div><h1 class="pg-title">Skill Map</h1><div style="font-size:12px;color:var(--txt2)">${completedCount()}/${totalLessons()} lessons complete</div></div>
      </div>
    </div>
    <div class="card a-fadeup2" style="padding:12px;margin-bottom:12px">
      <div style="font-size:12px;color:var(--txt2)">
        <span style="color:var(--green)">●</span> Complete &nbsp;
        <span style="color:var(--gold)">●</span> Current &nbsp;
        <span style="color:var(--txt4)">●</span> Locked
      </div>
    </div>
    ${CURRICULUM.map((cat, ci) => `
      <div class="a-fadeup" style="animation-delay:${ci*.04}s;margin-bottom:20px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
          <span style="font-size:18px">${cat.emoji}</span>
          <div style="flex:1;font-family:var(--display);font-weight:700;font-size:13px">${cat.title}</div>
          <span class="pill ${cat.lessons.filter(l=>STATE.progress[l.id]).length===cat.lessons.length?'pill-green':'pill-gold'}" style="font-size:9px">
            ${cat.lessons.filter(l=>STATE.progress[l.id]).length}/${cat.lessons.length}
          </span>
        </div>
        <div style="display:flex;align-items:center;overflow-x:auto;padding:4px 0 12px;scrollbar-width:none;-webkit-overflow-scrolling:touch">
          ${cat.lessons.map((l, li) => {
            const done = STATE.progress[l.id];
            const prevDone = li === 0 || STATE.progress[cat.lessons[li-1].id];
            const isCurrent = !done && prevDone;
            return `${li > 0 ? `<div class="skill-connector ${STATE.progress[cat.lessons[li-1].id] ? 'done' : ''}"></div>` : ''}
            <div class="skill-node-wrap" onclick="openLesson('${l.id}')">
              <div class="skill-node ${done ? 'done' : isCurrent ? 'current' : 'locked'}">
                ${l.emoji}
                ${done ? `<div style="position:absolute;bottom:-2px;right:-2px;width:14px;height:14px;background:var(--green);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:8px;border:2px solid var(--bg3);color:white">✓</div>` : ''}
              </div>
              <div class="skill-label" style="color:${done?'var(--green)':isCurrent?'var(--gold)':'var(--txt3)'}">${l.title.split(' ').slice(0,2).join(' ')}</div>
            </div>`;
          }).join('')}
        </div>
      </div>
    `).join('')}
  </div>`;
}

// ── FLASHCARDS ──
let _flashIdx = 0, _flashFlipped = false;

function renderFlashcards() {
  const total = FLASHCARDS.length;
  const seen = Object.keys(STATE.flashProgress).length;
  const card = FLASHCARDS[_flashIdx % total];
  return `<div class="screen-pad">
    <div class="pg-header a-fadeup" style="padding:0 0 14px">
      <div style="display:flex;gap:10px;align-items:center">
        <button class="back-btn" onclick="navigate('learn')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>
        <div><h1 class="pg-title">Flashcards</h1><div style="font-size:12px;color:var(--txt2)">${seen}/${total} studied</div></div>
      </div>
      <span class="pill pill-gold">${(_flashIdx % total) + 1}/${total}</span>
    </div>
    <div class="prog-bar a-fadeup2" style="margin-bottom:16px"><div class="prog-fill" style="width:${Math.round(seen/total*100)}%"></div></div>
    <div class="flashcard-wrap a-fadeup2" onclick="_flashFlipped=!_flashFlipped;renderScreen('flashcards')">
      <div class="flashcard ${_flashFlipped ? 'flipped' : ''}" style="min-height:220px;position:relative">
        <div class="fc-front">
          <div style="font-size:11px;color:var(--txt3);font-family:var(--display);letter-spacing:1.5px;margin-bottom:16px">QUESTION</div>
          <div style="font-family:var(--display);font-weight:700;font-size:19px;line-height:1.3">${card.q}</div>
          <div class="fc-hint">TAP TO FLIP</div>
        </div>
        <div class="fc-back">
          <div style="font-size:11px;color:var(--gold);font-family:var(--display);letter-spacing:1.5px;margin-bottom:16px">ANSWER</div>
          <div style="font-size:14px;line-height:1.65;color:var(--txt)">${card.a}</div>
        </div>
      </div>
    </div>
    ${_flashFlipped ? `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px" class="a-fadeup">
      <button class="btn btn-danger" onclick="gradeFlashcard(false)">✗ Didn't Know</button>
      <button class="btn btn-success" onclick="gradeFlashcard(true)">✓ Got It! +5 XP</button>
    </div>` : `
    <button class="btn btn-outline" style="margin-top:14px" onclick="_flashFlipped=true;renderScreen('flashcards')">Reveal Answer</button>`}
    <div style="display:flex;gap:8px;margin-top:12px">
      <button class="btn btn-ghost btn-sm" onclick="_flashIdx=Math.max(0,_flashIdx-1);_flashFlipped=false;renderScreen('flashcards')">← Prev</button>
      <button class="btn btn-ghost btn-sm" onclick="_flashIdx=Math.floor(Math.random()*FLASHCARDS.length);_flashFlipped=false;renderScreen('flashcards')">🔀 Random</button>
      <button class="btn btn-ghost btn-sm" onclick="_flashIdx=(_flashIdx+1)%FLASHCARDS.length;_flashFlipped=false;renderScreen('flashcards')">Next →</button>
    </div>
  </div>`;
}

function gradeFlashcard(correct) {
  const id = 'fc-' + (_flashIdx % FLASHCARDS.length);
  STATE.flashProgress[id] = {correct, seen: true, time: Date.now()};
  if (correct) { addXP(5); showToast('✅ +5 XP'); }
  _flashIdx = (_flashIdx + 1) % FLASHCARDS.length;
  _flashFlipped = false;
  saveState();
  renderScreen('flashcards');
}

// ── PATTERN GAME ──
let _pgIdx = 0, _pgAnswered = false;

function renderPatternGame() {
  const p = PATTERN_QUIZ[_pgIdx % PATTERN_QUIZ.length];
  const others = PATTERN_QUIZ.filter((_, i) => i !== _pgIdx % PATTERN_QUIZ.length)
    .sort(() => Math.random() - .5).slice(0, 3).map(x => x.name);
  const opts = [p.name, ...others].sort(() => Math.random() - .5);
  return `<div class="screen-pad">
    <div class="pg-header a-fadeup" style="padding:0 0 14px">
      <div style="display:flex;gap:10px;align-items:center">
        <button class="back-btn" onclick="navigate('learn')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>
        <div><h1 class="pg-title">Pattern Game</h1><div style="font-size:12px;color:var(--txt2)">${STATE.patternScore.correct}/${STATE.patternScore.total} correct</div></div>
      </div>
      <span class="pill pill-gold">${(_pgIdx%PATTERN_QUIZ.length)+1}/${PATTERN_QUIZ.length}</span>
    </div>
    <div class="card a-fadeup2" style="padding:14px;margin-bottom:12px;text-align:center">
      <div style="font-size:11px;color:var(--txt3);font-family:var(--display);letter-spacing:1.5px;margin-bottom:10px">IDENTIFY THIS PATTERN</div>
      <div class="mini-chart-wrap"><canvas id="pg-canvas"></canvas></div>
      <div style="margin-top:10px;font-size:12px;color:var(--txt2);font-style:italic">${p.hint}</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px" id="pg-opts">
      ${opts.map(o => `<div class="pattern-opt" id="pgopt-${o.replace(/\W/g,'-')}" onclick="checkPatternAnswer('${o}','${p.name}')">${o}</div>`).join('')}
    </div>
    ${_pgAnswered ? `
    <div class="card card-gold a-fadeup" style="padding:14px;margin-bottom:12px">
      <div style="font-family:var(--display);font-weight:700;margin-bottom:6px">${p.name}</div>
      <div style="font-size:12px;color:var(--txt2);margin-bottom:6px">${p.type} · ${p.timeframe}</div>
      <div style="font-size:12px;color:var(--txt2);margin-bottom:8px">${p.rules}</div>
      <span class="pill pill-green">Win Rate: ${p.winrate}</span>
    </div>
    <button class="btn btn-gold" onclick="_pgAnswered=false;_pgIdx=(_pgIdx+1)%PATTERN_QUIZ.length;renderScreen('patterns');setTimeout(drawPatternCanvas,80)">Next Pattern →</button>` : ''}
    <div style="margin-top:12px;display:flex;justify-content:space-between;font-size:12px;color:var(--txt3)">
      <span>${STATE.patternScore.correct} correct of ${STATE.patternScore.total} attempts</span>
      <span>${STATE.patternScore.total>0?Math.round(STATE.patternScore.correct/STATE.patternScore.total*100):0}% accuracy</span>
    </div>
  </div>`;
}

function checkPatternAnswer(chosen, correct) {
  if (_pgAnswered) return;
  _pgAnswered = true;
  STATE.patternScore.total++;
  const right = chosen === correct;
  if (right) { STATE.patternScore.correct++; addXP(10); showToast('🎯 Correct! +10 XP'); }
  else showToast(`❌ It was: ${correct}`);
  document.querySelectorAll('.pattern-opt').forEach(el => {
    if (el.textContent.trim() === correct) el.classList.add('correct');
    else if (el.textContent.trim() === chosen && !right) el.classList.add('wrong');
  });
  saveState();
  renderScreen('patterns');
  setTimeout(drawPatternCanvas, 80);
}

function drawPatternCanvas() {
  const canvas = document.getElementById('pg-canvas');
  if (!canvas) return;
  const p = PATTERN_QUIZ[_pgIdx % PATTERN_QUIZ.length];
  canvas.width = canvas.offsetWidth || 300;
  canvas.height = 155;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg3').trim() || '#18181F';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const candles = p.candles;
  const prices = candles.flatMap(c => [c.h, c.l]);
  const lo = Math.min(...prices), hi = Math.max(...prices);
  const range = (hi - lo) || 0.05;
  const pad = 20, w = canvas.width, h = canvas.height;
  const sy = v => h - pad - ((v - lo) / range) * (h - pad * 2);
  const count = candles.length;
  const spacing = count === 1 ? w / 2 : w / (count + 1);
  const cw = Math.min(40, spacing * 0.7);
  candles.forEach((c, i) => {
    const x = count === 1 ? w / 2 : spacing * (i + 1);
    const col = c.bull ? '#22C55E' : '#EF4444';
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x, sy(c.h)); ctx.lineTo(x, sy(c.l)); ctx.stroke();
    const top = Math.min(sy(c.o), sy(c.c));
    const bh = Math.max(2, Math.abs(sy(c.o) - sy(c.c)));
    ctx.shadowColor = col; ctx.shadowBlur = 6;
    ctx.fillRect(x - cw/2, top, cw, bh);
    ctx.shadowBlur = 0;
  });
}

// ── CANDLE BIBLE ──
let _candleFilter = 'All';

function renderCandleBible() {
  const types = ['All', 'Bullish Reversal', 'Bearish Reversal', 'Indecision/Reversal', 'Strong Bullish', 'Strong Bearish', 'Trend Confirmation'];
  const filtered = _candleFilter === 'All' ? CANDLE_PATTERNS : CANDLE_PATTERNS.filter(p => p.type === _candleFilter);
  return `<div class="screen-pad">
    <div class="pg-header a-fadeup" style="padding:0 0 12px">
      <div style="display:flex;gap:10px;align-items:center">
        <button class="back-btn" onclick="navigate('learn')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>
        <div><h1 class="pg-title">Candle Bible</h1><div style="font-size:12px;color:var(--txt2)">${CANDLE_PATTERNS.length} patterns</div></div>
      </div>
    </div>
    <div class="h-scroll a-fadeup2" style="margin-bottom:14px">
      ${types.map(t => `<button onclick="_candleFilter='${t}';renderScreen('candlebible')" style="flex-shrink:0;padding:6px 12px;border-radius:20px;font-size:11px;font-weight:700;font-family:var(--display);cursor:pointer;border:1.5px solid var(--bdr2);background:${_candleFilter===t?'var(--gold)':'var(--bg3)'};color:${_candleFilter===t?'#0A0A0F':'var(--txt2)'};white-space:nowrap;transition:all .15s">${t}</button>`).join('')}
    </div>
    ${filtered.map((p, i) => `
      <div class="cp-card a-fadeup" style="animation-delay:${i*.04}s" onclick="showCandleDetail('${p.name.replace(/'/g,'')}')">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px">
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
              <span style="font-size:22px">${p.emoji}</span>
              <div>
                <div style="font-family:var(--display);font-weight:700;font-size:15px">${p.name}</div>
                <span class="pill ${p.type.includes('Bullish')?'pill-green':p.type.includes('Bearish')?'pill-red':'pill-gold'}" style="margin-top:3px;font-size:9px">${p.type}</span>
              </div>
            </div>
            <div style="font-size:12px;color:var(--txt2);line-height:1.5">${p.desc}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div style="font-size:16px;color:var(--gold)">${p.reliability}</div>
            <div style="font-size:9px;color:var(--txt3);font-family:var(--display);margin-top:2px">RELIABILITY</div>
          </div>
        </div>
      </div>
    `).join('')}
  </div>`;
}

function showCandleDetail(name) {
  const p = CANDLE_PATTERNS.find(x => x.name === name || x.name.replace(/'/g,'') === name);
  if (!p) return;
  showModal(`<div class="modal-handle"></div>
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
      <span style="font-size:36px">${p.emoji}</span>
      <div><div style="font-family:var(--display);font-weight:800;font-size:19px">${p.name}</div>
      <span class="pill ${p.type.includes('Bullish')?'pill-green':p.type.includes('Bearish')?'pill-red':'pill-gold'}">${p.type}</span></div>
    </div>
    <div style="margin-bottom:12px"><div class="section-lbl">Description</div><p style="font-size:14px;color:var(--txt2);line-height:1.6">${p.desc}</p></div>
    <div style="margin-bottom:12px"><div class="section-lbl">Trading Rules</div><p style="font-size:13px;color:var(--txt2);line-height:1.6">${p.rules}</p></div>
    <div style="margin-bottom:14px"><div class="section-lbl">Statistics</div><p style="font-size:13px;color:var(--txt2);line-height:1.6">${p.stats}</p></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">
      <span class="pill pill-gold">Reliability: ${p.reliability}</span>
      <span class="pill pill-blue">Best TF: ${p.timeframe}</span>
    </div>
    <button class="btn btn-gold" onclick="closeModal();addXP(5);showToast('📚 Pattern studied! +5 XP')">Got it! +5 XP</button>`);
}

// ── STRATEGIES ──
let _stratFilter = 'All';

function renderStrategies() {
  const styles = ['All','Day Trade','Swing','Swing/Day','Day/Swing','Scalping','Position'];
  const filtered = _stratFilter === 'All' ? STRATEGIES : STRATEGIES.filter(s => s.style.includes(_stratFilter));
  return `<div class="screen-pad">
    <div class="pg-header a-fadeup" style="padding:0 0 12px">
      <div style="display:flex;gap:10px;align-items:center">
        <button class="back-btn" onclick="navigate('home')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>
        <div><h1 class="pg-title">Strategy Library</h1><div style="font-size:12px;color:var(--txt2)">${STRATEGIES.length} complete strategies</div></div>
      </div>
    </div>
    <div class="h-scroll a-fadeup2" style="margin-bottom:14px">
      ${styles.map(s => `<button onclick="_stratFilter='${s}';renderScreen('strategies')" style="flex-shrink:0;padding:6px 12px;border-radius:20px;font-size:11px;font-weight:700;font-family:var(--display);cursor:pointer;border:1.5px solid var(--bdr2);background:${_stratFilter===s?'var(--gold)':'var(--bg3)'};color:${_stratFilter===s?'#0A0A0F':'var(--txt2)'};transition:all .15s">${s}</button>`).join('')}
    </div>
    ${filtered.map((s, i) => `
      <div class="strat-card a-fadeup" style="animation-delay:${i*.05}s" onclick="showStratDetail('${s.id}')">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px">
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
              <span style="font-size:22px">${s.emoji}</span>
              <div style="font-family:var(--display);font-weight:700;font-size:16px">${s.name}</div>
            </div>
            <div style="display:flex;gap:4px;flex-wrap:wrap">
              <span class="pill pill-gold" style="font-size:9px">${s.style}</span>
              <span class="pill pill-blue" style="font-size:9px">${s.tf}</span>
              <span class="diff-stars">${'★'.repeat(s.difficulty)}${'☆'.repeat(5-s.difficulty)}</span>
            </div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div class="t-mono" style="font-size:16px;color:var(--green)">${s.winrate}</div>
            <div style="font-size:9px;color:var(--txt3);font-family:var(--display)">WIN RATE</div>
            <div class="t-mono" style="font-size:13px;color:var(--gold);margin-top:3px">${s.rr}</div>
            <div style="font-size:9px;color:var(--txt3);font-family:var(--display)">R:R</div>
          </div>
        </div>
        <div style="font-size:13px;color:var(--txt2);line-height:1.5">${s.desc}</div>
        <div style="margin-top:8px;font-size:11px;color:var(--txt3)">📊 ${s.pairs}</div>
      </div>
    `).join('')}
  </div>`;
}

function showStratDetail(id) {
  const s = STRATEGIES.find(x => x.id === id);
  if (!s) return;
  showModal(`<div class="modal-handle"></div>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
      <span style="font-size:36px">${s.emoji}</span>
      <div><div style="font-family:var(--display);font-weight:800;font-size:19px">${s.name}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px"><span class="pill pill-gold">${s.style}</span><span class="pill pill-blue">${s.tf}</span></div></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:14px">
      <div class="calc-res"><div class="calc-res-val" style="color:var(--green)">${s.winrate}</div><div class="calc-res-lbl">Win Rate</div></div>
      <div class="calc-res"><div class="calc-res-val" style="color:var(--gold)">${s.rr}</div><div class="calc-res-lbl">R:R</div></div>
      <div class="calc-res"><div class="calc-res-val">${'★'.repeat(s.difficulty)}</div><div class="calc-res-lbl">Difficulty</div></div>
    </div>
    <div style="margin-bottom:12px"><div class="section-lbl">Overview</div><p style="font-size:13px;color:var(--txt2);line-height:1.6">${s.desc}</p></div>
    <div style="margin-bottom:12px"><div class="section-lbl">Best Pairs</div><p style="font-size:13px;color:var(--txt2)">${s.pairs}</p></div>
    <div class="section-lbl">Complete Rules</div>
    <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:14px">
      ${s.rules.map((r, i) => `<div style="display:flex;gap:10px;align-items:flex-start;padding:9px;background:var(--bg3);border-radius:var(--rs)">
        <div style="width:20px;height:20px;border-radius:50%;background:var(--gold);color:#0A0A0F;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;flex-shrink:0;font-family:var(--display)">${i+1}</div>
        <div style="font-size:13px;color:var(--txt2);line-height:1.5">${r}</div>
      </div>`).join('')}
    </div>
    ${s.backtest ? `<div class="card card-gold" style="padding:12px;margin-bottom:14px"><div class="section-lbl">Backtest Notes</div><p style="font-size:12px;color:var(--txt2);line-height:1.55">${s.backtest}</p></div>` : ''}
    <button class="btn btn-gold" onclick="closeModal();addXP(10);showToast('📊 Strategy studied! +10 XP')">Add to Toolkit +10 XP</button>`);
}
