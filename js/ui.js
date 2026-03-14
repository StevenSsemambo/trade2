/* UI helper — thin wrapper so all screens can call renderScreen() */
// renderScreen is defined in state.js and calls all screen renderers
// This file ensures all renderX functions are available
// (All actual screen renderers are in js/screens/*.js)

// Also alias navigate -> for backward compatibility
if (typeof navigate === 'undefined' && typeof _navOrig !== 'undefined') {
  var navigate = _navOrig;
}
