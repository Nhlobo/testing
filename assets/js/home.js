/* Mapengo Innovations — "Under the hood" trace animation.

   One incident report is stepped through two views at once:
   a code panel (the function that handles it) and a request-path
   map (the services it crosses). Each step names the node the
   request is actually in, so the code highlight and the map never
   disagree. No dependencies. */
(function () {
  'use strict';

  // Geometry shared with the CSS: dots are 10px, top edge 5px below the row top.
  var DOT = 10;
  var DOT_TOP = 5;

  function initTrace(root) {
    var lineEls = Array.prototype.slice.call(root.querySelectorAll('.ln'));
    var codeEls = Array.prototype.slice.call(root.querySelectorAll('.ln[data-status]'));
    var nodes = Array.prototype.slice.call(root.querySelectorAll('.mx-trace-flow li'));
    var statusText = root.querySelector('.mx-trace-status [data-status]');
    var placeText = root.querySelector('.mx-trace-status [data-ln]');
    var spine = root.querySelector('.mx-trace-spine');
    var fill = root.querySelector('.mx-trace-fill');
    var packet = root.querySelector('.mx-packet');
    if (!nodes.length || !codeEls.length) return;

    function nodeName(i) {
      var n = nodes[i].querySelector('.mx-node-name');
      return n ? n.textContent : '';
    }

    // Build the timeline: for each node, an "arrival" step if the node
    // has its own message, then the code lines that run inside it.
    var timeline = [];
    nodes.forEach(function (li, i) {
      var arrival = li.getAttribute('data-status');
      if (arrival) timeline.push({ node: i, line: null, status: arrival, ms: 950 });
      codeEls.forEach(function (el) {
        if (parseInt(el.getAttribute('data-node'), 10) === i) {
          timeline.push({ node: i, line: el, status: el.getAttribute('data-status'), ms: 820 });
        }
      });
    });
    if (!timeline.length) return;

    function center(i) { return nodes[i].offsetTop + DOT_TOP + DOT / 2; }

    function layout() {
      var c0 = center(0);
      var cLast = center(nodes.length - 1);
      if (spine) { spine.style.top = c0 + 'px'; spine.style.height = (cLast - c0) + 'px'; spine.style.bottom = 'auto'; }
      if (fill) fill.style.top = c0 + 'px';
    }

    function place(i) {
      var c0 = center(0);
      var c = center(i);
      if (fill) fill.style.height = (c - c0) + 'px';
      if (packet) packet.style.top = (c - DOT / 2) + 'px';
    }

    var current = 0;
    function paint(step, finished) {
      current = step.node;
      lineEls.forEach(function (el) { el.classList.remove('is-active'); });
      if (step.line) step.line.classList.add('is-active');
      root.classList.toggle('is-idle', !step.line && !finished);

      if (statusText) statusText.textContent = step.status;
      if (placeText) {
        placeText.textContent = step.line ? 'Ln ' + (lineEls.indexOf(step.line) + 1) : nodeName(step.node);
      }

      nodes.forEach(function (li, idx) {
        li.classList.toggle('is-done', idx < step.node || (finished && idx === step.node));
        li.classList.toggle('is-active', idx === step.node && !finished);
      });
      place(step.node);
    }

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    layout();

    if (reduceMotion) {
      // One complete, legible frame; nothing moves.
      paint(timeline[timeline.length - 1], true);
      root.classList.remove('is-idle');
      return;
    }

    var idx = 0;
    var timer = null;

    function restart() {
      root.classList.add('is-reset');
      paint(timeline[0], false);
      void root.offsetWidth; // flush so the jump back to the start isn't animated
      root.classList.remove('is-reset');
    }

    function tick() {
      var step = timeline[idx];
      var last = idx === timeline.length - 1;
      paint(step, last);
      if (last) {
        timer = setTimeout(function () {
          idx = 0;
          restart();
          timer = setTimeout(tick, 600);
        }, 2200);
      } else {
        idx += 1;
        timer = setTimeout(tick, step.ms);
      }
    }

    function start() {
      if (timer) return;
      requestAnimationFrame(function () { requestAnimationFrame(tick); });
    }
    function stop() {
      clearTimeout(timer);
      timer = null;
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { entry.isIntersecting ? start() : stop(); });
      }, { threshold: 0.3 }).observe(root);
    } else {
      start();
    }

    function relayout() { layout(); place(current); }
    if ('ResizeObserver' in window) {
      new ResizeObserver(relayout).observe(root);
    } else {
      window.addEventListener('resize', relayout);
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var root = document.querySelector('[data-trace]');
    if (root) initTrace(root);
  });

  /* Services explorer: a numbered list on the left, the selected service on the right.
     Without JS every panel simply shows in a stack. */
  function initServices(root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    var panels = Array.prototype.slice.call(root.querySelectorAll('[role="tabpanel"]'));
    if (!tabs.length || tabs.length !== panels.length) return;
    root.classList.add('is-tabs');

    function select(i, focus) {
      tabs.forEach(function (tab, idx) {
        var on = idx === i;
        tab.classList.toggle('is-active', on);
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
        tab.setAttribute('tabindex', on ? '0' : '-1');
        panels[idx].classList.toggle('is-active', on);
      });
      if (focus) tabs[i].focus();
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(i, false); });
      tab.addEventListener('keydown', function (e) {
        var next = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % tabs.length;
        else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = tabs.length - 1;
        if (next !== null) { e.preventDefault(); select(next, true); }
      });
    });
    select(0, false);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var svc = document.querySelector('[data-services]');
    if (svc) initServices(svc);
  });

  /* Small clean-ups for the shared header, footer and chat button, and scroll reveals. */
  function initPage() {
    // the shared footer jumps from an h2 straight to h4s: give them the right level
    Array.prototype.forEach.call(document.querySelectorAll('#site-footer h4'), function (h) { h.setAttribute('aria-level', '3'); });
    // the floating chat link sits outside every landmark: give it one
    var chat = document.getElementById('whatsapp-icon');
    if (chat && chat.parentElement && chat.parentElement.tagName !== 'ASIDE') {
      var aside = document.createElement('aside');
      aside.setAttribute('aria-label', 'Chat on WhatsApp');
      chat.parentElement.insertBefore(aside, chat);
      aside.appendChild(chat);
    }


    // spotlight: a soft light follows the pointer across cards
    Array.prototype.forEach.call(document.querySelectorAll(
      '.mx-capability-item, .mx-testimonial, .mx-svc-stage, .mx-ho, .mx-trace-stage, .mx-process-item, .mx-flagship-v2'),
      function (el) { el.setAttribute('data-spot', ''); });
    var spotFrame = 0, spotPending = null;
    document.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch' || !e.target.closest) return;
      var el = e.target.closest('[data-spot]');
      if (!el) return;
      spotPending = { el: el, x: e.clientX, y: e.clientY };
      if (spotFrame) return;
      spotFrame = requestAnimationFrame(function () {
        spotFrame = 0;
        var r = spotPending.el.getBoundingClientRect();
        spotPending.el.style.setProperty('--sx', (spotPending.x - r.left) + 'px');
        spotPending.el.style.setProperty('--sy', (spotPending.y - r.top) + 'px');
      });
    }, { passive: true });

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;

    var groups = [
      ['.mx-hero-device', 0], ['.mx-capability .mx-section-head', 0], ['.mx-capability-item', 0.08], ['.mx-sectors', 0],
      ['.mx-services .mx-section-head', 0], ['.mx-svc', 0], ['.mx-svc-cta', 0],
      ['.mx-work .mx-section-head', 0], ['.mx-flagship', 0], ['.mx-trace', 0],
      ['.mx-process-side', 0], ['.mx-process-item', 0.06],
      ['.mx-ownership-copy', 0], ['.mx-ho', 0.1],
      ['.mx-testimonials .mx-section-head', 0], ['.mx-testimonial', 0.08],
      ['.mx-cta .container > *', 0.07]
    ];
    var targets = [];
    groups.forEach(function (g) {
      Array.prototype.forEach.call(document.querySelectorAll(g[0]), function (el, i) {
        el.setAttribute('data-reveal', '');
        if (g[1]) el.style.setProperty('--rd', (i * g[1]).toFixed(2) + 's');
        targets.push(el);
      });
    });
    document.documentElement.classList.add('mx-js');

    // looping figures only run while visible
    var live = document.querySelectorAll('.mx-fig.is-live, .mx-ho, .mx-console');
    if (live.length) {
      var wake = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { e.target.classList.toggle('is-on', e.isIntersecting); });
      }, { threshold: 0.05 });
      Array.prototype.forEach.call(live, function (el) { wake.observe(el); });
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(function (el) { io.observe(el); });
  }

  document.addEventListener('DOMContentLoaded', initPage);
})();
