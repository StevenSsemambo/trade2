/* ═══════════════════════════════════════════
   NOTIFICATIONS SYSTEM
   Push notifications + in-app reminders
   ═══════════════════════════════════════════ */

const NOTIFICATION_MESSAGES = {
  morning: [
    { title: 'TradeBaby Pro 📈', body: 'Good morning! Ready to learn something new today? Your lesson is waiting.' },
    { title: 'Morning Market Brief 🌅', body: 'London session opens in 2 hours. Check the economic calendar first.' },
    { title: 'Daily Challenge ⚡', body: 'Complete one lesson today and earn XP. Your streak is counting!' },
    { title: 'TradeBaby Reminder 🎯', body: 'Consistency is the mother of mastery. One lesson a day keeps failure away.' },
  ],
  session: [
    { title: '🇬🇧 London Session OPEN', body: 'Best trading window just opened! EUR/USD and GBP/USD most active now.' },
    { title: '🔥 Peak Trading Hours', body: 'London/NY overlap active — highest volume and tightest spreads of the day.' },
    { title: '🇺🇸 NY Session Opening', body: 'New York just opened. Watch for USD pair opportunities.' },
  ],
  streak: [
    { title: '🔥 Streak at risk!', body: "Don't break your learning streak — complete a quick flashcard review!" },
    { title: '⏰ Daily Check-in Due', body: "You haven't checked in today. Keep your streak alive!" },
  ],
  weekly: [
    { title: '📊 Weekly Review Time', body: 'It\'s Sunday — perfect time to review your sim trades and journal entries.' },
    { title: '🎯 Weekly Goal Check', body: 'How did your trading week go? Log it and review your progress.' },
  ],
  milestone: [
    { title: '🏆 New Achievement!', body: 'You just unlocked a badge in TradeBaby Pro!' },
    { title: '⭐ Level Up!', body: 'Congratulations! You reached a new level in your trading journey.' },
  ],
};

let _notifPermission = 'default';

async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    showToast('Notifications not supported in this browser');
    return false;
  }
  if (Notification.permission === 'granted') {
    _notifPermission = 'granted';
    STATE.user.notificationsEnabled = true;
    setupNotificationSchedule();
    saveState();
    return true;
  }
  try {
    const permission = await Notification.requestPermission();
    _notifPermission = permission;
    if (permission === 'granted') {
      STATE.user.notificationsEnabled = true;
      setupNotificationSchedule();
      saveState();
      showToast('🔔 Notifications enabled! You\'ll get daily reminders.');
      // Send welcome notification
      sendNotification({ title: 'TradeBaby Pro 📈', body: 'Notifications enabled! You\'ll get daily trading reminders and session alerts.' });
      return true;
    } else {
      showToast('Notifications blocked. Enable in browser settings.');
      return false;
    }
  } catch(e) {
    console.warn('Notification permission error:', e);
    return false;
  }
}

function sendNotification(opts) {
  if (Notification.permission !== 'granted') return;
  try {
    const n = new Notification(opts.title, {
      body: opts.body,
      icon: 'icons/icon.svg',
      badge: 'icons/icon.svg',
      tag: opts.tag || 'tradebaby',
      renotify: opts.renotify || false,
    });
    n.onclick = () => { window.focus(); n.close(); };
  } catch(e) { console.warn('Notification error:', e); }
}

function setupNotificationSchedule() {
  if (!STATE.user.notificationsEnabled) return;
  // Clear any existing scheduled checks
  if (window._notifTimer) clearInterval(window._notifTimer);

  // Check every minute for scheduled notifications
  window._notifTimer = setInterval(checkScheduledNotifications, 60000);
  checkScheduledNotifications(); // Run immediately
}

function checkScheduledNotifications() {
  if (!STATE.user.notificationsEnabled || Notification.permission !== 'granted') return;

  const now = new Date();
  const hr = now.getHours();
  const min = now.getMinutes();
  const dayOfWeek = now.getDay();
  const todayKey = now.toDateString();
  const notifLog = JSON.parse(localStorage.getItem('tb4_notifs') || '{}');

  // Morning reminder (8:00 AM local)
  if (hr === 8 && min === 0 && notifLog['morning'] !== todayKey) {
    const msg = NOTIFICATION_MESSAGES.morning[Math.floor(Math.random() * NOTIFICATION_MESSAGES.morning.length)];
    sendNotification(msg);
    notifLog['morning'] = todayKey;
  }

  // Streak reminder if not checked in by 8 PM
  if (hr === 20 && min === 0 && STATE.dailyCheckIn !== todayKey && notifLog['streak'] !== todayKey) {
    const msg = NOTIFICATION_MESSAGES.streak[Math.floor(Math.random() * NOTIFICATION_MESSAGES.streak.length)];
    sendNotification(msg);
    notifLog['streak'] = todayKey;
  }

  // London session open (8:00 UTC)
  const utcHr = now.getUTCHours(), utcMin = now.getUTCMinutes();
  if (utcHr === 8 && utcMin === 0 && notifLog['london'] !== todayKey) {
    sendNotification(NOTIFICATION_MESSAGES.session[0]);
    notifLog['london'] = todayKey;
  }

  // London/NY overlap (13:00 UTC)
  if (utcHr === 13 && utcMin === 0 && notifLog['overlap'] !== todayKey) {
    sendNotification(NOTIFICATION_MESSAGES.session[1]);
    notifLog['overlap'] = todayKey;
  }

  // Weekly review (Sunday 10 AM)
  if (dayOfWeek === 0 && hr === 10 && min === 0 && notifLog['weekly'] !== todayKey) {
    const msg = NOTIFICATION_MESSAGES.weekly[Math.floor(Math.random() * NOTIFICATION_MESSAGES.weekly.length)];
    sendNotification(msg);
    notifLog['weekly'] = todayKey;
  }

  localStorage.setItem('tb4_notifs', JSON.stringify(notifLog));
}

function disableNotifications() {
  STATE.user.notificationsEnabled = false;
  if (window._notifTimer) clearInterval(window._notifTimer);
  saveState();
  showToast('🔕 Notifications disabled');
}

function renderNotifications() {
  const notifs = STATE.notifications;
  const unread = notifs.filter(n => !n.read).length;

  // Mark all as read
  STATE.notifications.forEach(n => n.read = true);
  const dot = document.getElementById('mentor-dot');
  if (dot) dot.style.display = 'none';
  saveState();

  return `<div class="screen-pad">
    <div class="pg-header a-fadeup" style="padding:0 0 14px">
      <div style="display:flex;gap:10px;align-items:center">
        <button class="back-btn" onclick="navigate('profile')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div>
          <h1 class="pg-title">Notifications</h1>
          <div style="font-size:12px;color:var(--txt2)">${unread > 0 ? unread + ' new' : 'All caught up'}</div>
        </div>
      </div>
      <button class="btn btn-ghost btn-xs" onclick="STATE.notifications=[];saveState();navigate('notifications')">Clear all</button>
    </div>

    <!-- Notification permission card -->
    ${!STATE.user.notificationsEnabled ? `
    <div class="notif-card a-fadeup2" style="margin-bottom:16px">
      <div style="font-size:28px">🔔</div>
      <div style="flex:1">
        <div style="font-family:var(--display);font-weight:700;font-size:14px;margin-bottom:3px">Enable Notifications</div>
        <div style="font-size:12px;color:var(--txt2)">Get daily reminders, session alerts & achievement notifications</div>
      </div>
      <button class="btn btn-gold btn-sm" onclick="requestNotificationPermission()">Enable</button>
    </div>` : `
    <div class="card a-fadeup2" style="padding:12px;margin-bottom:14px;display:flex;align-items:center;gap:12px;background:var(--green-bg);border-color:var(--green-bdr)">
      <span style="font-size:20px">✅</span>
      <div style="flex:1;font-size:13px;color:var(--txt2)">Notifications are <strong style="color:var(--green)">enabled</strong></div>
      <button class="btn btn-ghost btn-xs" onclick="disableNotifications()">Disable</button>
    </div>`}

    ${notifs.length === 0 ? `
      <div style="text-align:center;padding:50px 0;color:var(--txt3)">
        <div style="font-size:44px;margin-bottom:10px">🔔</div>
        <div style="font-family:var(--display);font-weight:600;font-size:15px;color:var(--txt2)">No notifications yet</div>
        <div style="font-size:12px;margin-top:6px">Achievements and system alerts will appear here</div>
      </div>
    ` : notifs.map(n => `
      <div class="notif-item ${n.read ? '' : 'unread'}">
        <span style="font-size:20px;flex-shrink:0">${n.icon}</span>
        <div style="flex:1">
          <div style="font-size:13px;color:var(--txt);line-height:1.5">${n.text}</div>
          <div style="font-size:10px;color:var(--txt3);margin-top:4px;font-family:var(--mono)">${fmtDate(n.time)}</div>
        </div>
      </div>`).join('')}
  </div>`;
}

// Initialize notifications on app start
function initNotifications() {
  _notifPermission = Notification.permission || 'default';
  if (STATE.user.notificationsEnabled && _notifPermission === 'granted') {
    setupNotificationSchedule();
  }
  // Show unread dot if applicable
  const unread = STATE.notifications.filter(n => !n.read).length;
  const dot = document.getElementById('mentor-dot');
  if (dot) dot.style.display = unread > 0 ? 'block' : 'none';
}
