/* ==========================================================================
   尘壤学院 · 交互
   页首状态 / 章节高亮 / 滚动揭示 / 视差 / 分院切换
   ========================================================================== */

(function () {
  'use strict';

  window.__crReady = true;

  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 入场失败保护：内容必须能看到 */
  if (root.classList.contains('is-intro')) {
    window.setTimeout(function () {
      if (!root.classList.contains('is-intro')) return;
      root.classList.remove('is-intro');
      var intro = document.getElementById('intro');
      if (intro) intro.hidden = true;
    }, 6500);
  }

  /* ── 页首 ─────────────────────────────────────────────────────── */

  var header = document.getElementById('site-header');
  var heroMedia = document.getElementById('hero-media');

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;

    if (header) header.classList.toggle('is-solid', y > 40);

    if (heroMedia && !reduce && y < window.innerHeight * 1.4) {
      heroMedia.style.transform = 'translate3d(0,' + (y * 0.14).toFixed(2) + 'px,0)';
    }
  }

  var ticking = false;
  window.addEventListener(
    'scroll',
    function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        onScroll();
        ticking = false;
      });
    },
    { passive: true }
  );
  onScroll();

  /* ── 章节高亮 ─────────────────────────────────────────────────── */

  var navLinks = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));
  var sections = ['home', 'academy', 'disciplines', 'architecture', 'hall', 'archive', 'forum'];

  if ('IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (link) {
            link.classList.toggle('is-active', link.getAttribute('data-nav') === entry.target.id);
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });
  }

  /* ── 滚动揭示 ─────────────────────────────────────────────────── */

  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );
    reveals.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ── 分院切换 ─────────────────────────────────────────────────── */

  var houses = {
    nature: { num: 'I', cn: '自然派', en: 'Nature', text: '' },
    mysticism: { num: 'II', cn: '神秘学派', en: 'Mysticism', text: '涉及占卜、炼金等内容。' },
    druid: { num: 'III', cn: '德鲁伊派', en: 'Druid', text: '涉及伴生动物组织。' },
    unnatural: { num: 'IV', cn: '非自然派', en: 'Unnatural', text: '涉及机械科技方向。' }
  };

  var tabs = Array.prototype.slice.call(document.querySelectorAll('.house'));
  var detailNum = document.getElementById('detail-num');
  var detailCn = document.getElementById('detail-cn');
  var detailEn = document.getElementById('detail-en');
  var detailText = document.getElementById('detail-text');

  function selectHouse(key) {
    var house = houses[key];
    if (!house) return;

    tabs.forEach(function (tab) {
      tab.setAttribute('aria-selected', String(tab.getAttribute('data-house') === key));
    });

    if (detailNum) detailNum.textContent = house.num;
    if (detailCn) detailCn.textContent = house.cn;
    if (detailEn) detailEn.textContent = house.en;

    if (detailText) {
      if (house.text) {
        detailText.textContent = house.text;
        detailText.hidden = false;
      } else {
        detailText.textContent = '';
        detailText.hidden = true;
      }
    }
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      selectHouse(tab.getAttribute('data-house'));
    });

    tab.addEventListener('keydown', function (e) {
      var index = tabs.indexOf(tab);
      var next = null;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = tabs[(index + 1) % tabs.length];
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = tabs[(index - 1 + tabs.length) % tabs.length];

      if (next) {
        e.preventDefault();
        next.focus();
        selectHouse(next.getAttribute('data-house'));
      }
    });
  });

  if (tabs.length) selectHouse(tabs[0].getAttribute('data-house'));
})();
