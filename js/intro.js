/* ==========================================================================
   入场：魔法阵时间线
   SVG 负责几何线条与刻度，素材 PNG 负责星盘 / 罗盘 / 太阳
   ========================================================================== */

(function () {
  'use strict';

  var root = document.documentElement;
  var intro = document.getElementById('intro');

  if (!intro) return;

  if (!root.classList.contains('is-intro')) {
    intro.hidden = true;
    return;
  }

  var NS = 'http://www.w3.org/2000/svg';
  var svg = document.getElementById('mc-svg');
  var gOuter = document.getElementById('mc-outer');
  var gTicks = document.getElementById('mc-ticks');
  var gMid = document.getElementById('mc-mid');
  var gInner = document.getElementById('mc-inner');

  var elGlow = document.getElementById('intro-glow');
  var circle = document.getElementById('magic-circle');
  var sky = document.getElementById('intro-sky');
  var portal = document.getElementById('intro-portal');
  var starField = document.getElementById('star-field');
  var skipBtn = document.getElementById('skip-intro');
  var heroReveal = [document.querySelector('.hero-panel'), document.querySelector('.scroll-cue')];

  var anims = [];

  /* ── 星空 ─────────────────────────────────────────────────────── */

  if (starField) {
    var frag = document.createDocumentFragment();
    for (var s = 0; s < 170; s++) {
      var star = document.createElement('i');
      var size = Math.random();
      star.style.left = (Math.random() * 100).toFixed(2) + '%';
      star.style.top = (Math.random() * 100).toFixed(2) + '%';
      star.style.setProperty('--dur', (4 + Math.random() * 6).toFixed(2) + 's');
      star.style.setProperty('--delay', (Math.random() * 6).toFixed(2) + 's');
      if (size > 0.88) star.className = 'is-big';
      else if (size > 0.6) star.style.opacity = (0.35 + Math.random() * 0.4).toFixed(2);
      frag.appendChild(star);
    }
    starField.appendChild(frag);
  }

  function mk(tag, attrs) {
    var el = document.createElementNS(NS, tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }

  function polar(r, deg) {
    var rad = (deg * Math.PI) / 180;
    return [Math.cos(rad) * r, Math.sin(rad) * r];
  }

  /* ── 图层：外环 / 刻度 / 中环 / 几何 / 内环 ───────────────────── */

  try {
    gOuter.appendChild(mk('circle', { cx: 0, cy: 0, r: 470, class: 'stroke' }));
    gOuter.appendChild(mk('circle', { cx: 0, cy: 0, r: 456, class: 'stroke stroke--faint' }));

    for (var i = 0; i < 72; i++) {
      var a = i * 5;
      var major = i % 6 === 0;
      var rInner = major ? 436 : 446;
      var p1 = polar(rInner, a);
      var p2 = polar(456, a);
      gTicks.appendChild(
        mk('line', {
          x1: p1[0].toFixed(2), y1: p1[1].toFixed(2),
          x2: p2[0].toFixed(2), y2: p2[1].toFixed(2),
          class: major ? 'stroke' : 'stroke stroke--faint'
        })
      );
    }

    gMid.appendChild(mk('circle', { cx: 0, cy: 0, r: 336, class: 'stroke stroke--faint' }));
    gInner.appendChild(mk('circle', { cx: 0, cy: 0, r: 152, class: 'stroke stroke--faint' }));
  } catch (err) {
    /* 几何层失败也继续走完时间线 */
  }

  /* ── 时间线 ───────────────────────────────────────────────────── */

  function track(el, frames, opts) {
    if (!el) return null;
    var a;
    try {
      a = el.animate(frames, Object.assign({ easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'both' }, opts));
    } catch (err) {
      return null;
    }
    anims.push(a);
    return a;
  }

  function draw(el, delay, duration) {
    if (!el) return;
    if (el.hasAttribute('stroke-dasharray')) {
      track(el, [{ opacity: 0 }, { opacity: 1 }], { delay: delay, duration: duration });
      return;
    }
    var len;
    if (el.tagName === 'circle') {
      len = 2 * Math.PI * parseFloat(el.getAttribute('r'));
    } else if (el.tagName === 'line' || el.tagName === 'polygon') {
      try {
        len = el.getTotalLength();
      } catch (err) {
        len = 1400;
      }
    } else {
      len = 1200;
    }
    if (!len || !isFinite(len)) len = 1200;
    el.style.strokeDasharray = len;
    el.style.strokeDashoffset = len;
    track(el, [{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { delay: delay, duration: duration });
  }

  function children(el) {
    return el ? Array.prototype.slice.call(el.children) : [];
  }

  try {
    /* 夜空浮现 */
    track(sky, [{ opacity: 0 }, { opacity: 1 }], { duration: 900, easing: 'ease-out' });

    track(circle, [{ opacity: 0 }, { opacity: 1 }], { delay: 260, duration: 700 });
    track(elGlow, [{ opacity: 0 }, { opacity: 1 }], { delay: 420, duration: 1200 });
    track(elGlow, [{ opacity: 1 }, { opacity: 0.62 }], { delay: 2400, duration: 1400 });

    /* 中心：太阳 */
    var sun = document.getElementById('mc-sun');
    track(sun, [{ opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1 }], { delay: 380, duration: 1200 });

    /* 内环 */
    children(gInner).forEach(function (el, i) {
      draw(el, 520 + i * 80, 780);
    });

    /* 中环 */
    children(gMid).forEach(function (el, i) {
      draw(el, 880 + i * 70, 820);
    });

    /* 刻度：逐格亮起 */
    children(gTicks).forEach(function (el, i) {
      track(el, [{ opacity: 0 }, { opacity: 1 }], { delay: 1080 + i * 8, duration: 340 });
    });

    /* 外环 */
    children(gOuter).forEach(function (el, i) {
      draw(el, 1320 + i * 110, 900);
    });

    /* 揭开：圆窗从中心扩张 */
    track(
      portal,
      [
        { clipPath: 'circle(0px at 50% 50%)', offset: 0 },
        { clipPath: 'circle(16vmax at 50% 50%)', offset: 0.42 },
        { clipPath: 'circle(38vmax at 50% 50%)', offset: 0.72 },
        { clipPath: 'circle(96vmax at 50% 50%)', offset: 1 }
      ],
      { delay: 1680, duration: 1900, easing: 'cubic-bezier(.45,0,.25,1)' }
    );

    /* 魔法阵随之向外退开 */
    track(
      circle,
      [{ opacity: 1, scale: 1 }, { opacity: 0, scale: 1.22 }],
      { delay: 2180, duration: 1500 }
    );

    /* 中心的太阳让出圆窗 */
    track(sun, [{ opacity: 1 }, { opacity: 0 }], { delay: 1680, duration: 900 });

    /* 星空在圆窗之后褪去 */
    track(sky, [{ opacity: 1 }, { opacity: 0 }], { delay: 2450, duration: 1100 });
    track(elGlow, [{ opacity: 0.6 }, { opacity: 0 }], { delay: 2500, duration: 1000 });

    /* 学院名称 */
    heroReveal.forEach(function (el, i) {
      track(
        el,
        [
          { opacity: 0, transform: 'translateY(1.6rem)' },
          { opacity: 1, transform: 'translateY(0)' }
        ],
        { delay: 2520 + i * 220, duration: 1000 }
      );
    });
  } catch (err) {
    /* 忽略 */
  }

  /* ── 收尾与跳过 ───────────────────────────────────────────────── */

  var finished = false;

  function finish() {
    if (finished) return;
    finished = true;

    intro.classList.add('is-closing');
    root.classList.remove('is-intro');

    anims.forEach(function (a) {
      try { a.cancel(); } catch (e) {}
    });
    anims.length = 0;

    if (circle) circle.removeAttribute('style');
    if (elGlow) elGlow.removeAttribute('style');
    if (portal) portal.removeAttribute('style');
    if (sky) sky.removeAttribute('style');
    intro.hidden = true;
  }

  var endTimer = setTimeout(finish, 3750);

  if (skipBtn) {
    skipBtn.addEventListener('click', function () {
      clearTimeout(endTimer);
      finish();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (!finished && e.key === 'Escape') {
      clearTimeout(endTimer);
      finish();
    }
  });
})();
