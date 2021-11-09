const app = {
  ready: (callback) => {
      // In case the document is already rendered
      if (document.readyState != 'loading') callback();
      else document.addEventListener('DOMContentLoaded', callback);
  },
  menu: {},
  search: {},
  keys: {},
  overlay: {},
  animations: {}
  };
  
  const dispatch = e => document.dispatchEvent(new Event(e));
  const select = selector => document.querySelector(selector)
  const selectAll = selector => document.querySelectorAll(selector)
  
  const listen = (obj, event, callback) => {
  obj = typeof obj === "string" ? select(obj) : obj;
  obj.addEventListener(event, callback);
  }
  
  const listenAll = (objs, event, callback) => {
  objs = typeof objs === "string" ? selectAll(objs) : objs;
  for (const obj of objs) {
      listen(obj, event, callback)
  }
  }
  
  const create = (element, ...objs) => {
  let elArgs = element.split('.');
  const el = document.createElement(elArgs.shift());
  const children = objs.filter(el => el instanceof HTMLElement);
  const options = objs.filter(el => !(el instanceof HTMLElement) && typeof el === 'object')[0];
  const text = objs.filter(el => typeof el === 'string')[0];
  
  if (text !== undefined) el.textContent = text;
  for (const property in options) {
      el[property] = options[property]
  }
  if (elArgs.length > 0) el.classList.add(...elArgs);
  for (const child of children) {
      el.appendChild(child)
  }
  return el;
  }
  
  const animate = (elements, keyframeTemplates, optionsTemplate = {}) => {
  elements = typeof elements === "string" ? selectAll(elements) : elements;
  
  // shorthand version, move out options and construct keysFrom and keysTo
  if (!Array.isArray(keyframeTemplates) && typeof keyframeTemplates === 'object') {
      const optionProps = ['delay', 'direction', 'duration', 'easing', 'endDelay', 'fill', 'iterationStart', 'iterations'];
      for (const [key, value] of Object.entries(keyframeTemplates)) {
          if (optionProps.includes(key)) {
              optionsTemplate[key] = value;
              delete keyframeTemplates[key];
          }
      }
  
      const keysFrom = {},
          keysTo = {};
      for (const [key, value] of Object.entries(keyframeTemplates)) {
          // if any keyframe is _not_ defined through an array (to, from), use its current value as from
          if (Array.isArray(value)) {
              keysFrom[key] = value[0];
              keysTo[key] = value[1];
          } else {
              // TODO: set to a keyword ('current'?) that can later be used to get its current value for keysFrom
              // keysFrom[key] = 'current'
              keysTo[key] = value;
          }
      }
  
      keyframeTemplates = [keysFrom, keysTo];
  }
  
  const animations = [];
  const easings = {
      easeInSine: '0.12, 0, 0.39, 0',
      easeOutSine: '0.61, 1, 0.88, 1',
      easeInOutSine: '0.37, 0, 0.63, 1',
      easeInQuad: '0.11, 0, 0.5, 0',
      easeOutQuad: '0.5, 1, 0.89, 1',
      easeInOutQuad: '0.45, 0, 0.55, 1',
      easeInCubic: '0.32, 0, 0.67, 0',
      easeOutCubic: '0.33, 1, 0.68, 1',
      easeInOutCubic: '0.65, 0, 0.35, 1',
      easeInQuart: '0.5, 0, 0.75, 0',
      easeOutQuart: '0.25, 1, 0.5, 1',
      easeInOutQuart: '0.76, 0, 0.24, 1',
      easeInQuint: '0.64, 0, 0.78, 0',
      easeOutQuint: '0.22, 1, 0.36, 1',
      easeInOutQuint: '0.83, 0, 0.17, 1',
      easeInExpo: '0.7, 0, 0.84, 0',
      easeOutExpo: '0.16, 1, 0.3, 1',
      easeInOutExpo: '0.87, 0, 0.13, 1',
      easeInCirc: '0.55, 0, 1, 0.45',
      easeOutCirc: '0, 0.55, 0.45, 1',
      easeInOutCirc: '0.85, 0, 0.15, 1',
      easeInBack: '0.36, 0, 0.66, -0.56',
      easeOutBack: '0.34, 1.56, 0.64, 1',
      easeInOutBack: '0.68, -0.6, 0.32, 1.6'
  }
  
  const transformProps = ['matrix', 'matrix3d', 'perspective', 'rotate', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'translate', 'translate3d', 'translateX', 'translateY', 'translateZ', 'scale', 'scale3d', 'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skew'];
  
  for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const keyframes = [];
  
      for (const keyframeTemplate of keyframeTemplates) {
          const keyframe = { ...keyframeTemplate
          };
          const transforms = [];
          for (const [key, value] of Object.entries(keyframe)) {
              keyframe[key] = typeof value === 'function' ? value(element, i) : value;
              if (transformProps.includes(key)) {
                  transforms.push(`${key}(${keyframe[key]})`);
                  delete keyframe[key];
              }
          }
          if (transforms.length > 0) keyframe.transform = transforms.join(' ');
          keyframes.push(keyframe);
      }
  
      const options = { ...optionsTemplate
      };
      let finishCallback;
      if (options.finish !== null) {
          finishCallback = options.finish;
          delete options.finish;
      }
  
      for (const [key, value] of Object.entries(options)) {
          options[key] = typeof value === 'function' ? value(element, i) : value;
      }
      options.duration = options.duration ||  600;
      options.easing = options.easing || "easeOutExpo";
      options.easing = easings[options.easing] !== null ? `cubic-bezier(${easings[options.easing]})` : options.easing;
  
      const animation = element.animate(keyframes, { ...options,
          fill: 'both'
      });
      animation.addEventListener('finish', () => {
          try {
              animation.commitStyles();
          } catch (error) {
              console.error({
                  elements,
                  error
              });
          }
          animation.cancel();
          if (finishCallback !== null && typeof finishCallback === 'function') finishCallback(element, i, i == elements.length - 1);
      });
  
      animations.push(animation);
  }
  
  return {
      animations,
      then: (callback) => {
          animations[animations.length - 1].addEventListener('finish', () => {
              callback();
          });
      }
  };
  }
  
  app.ready(() => {
  // Listen to keys, close menu if visible
  listen(document, "keyup", e => {
      if (e.keyCode == app.keys.ESC) app.keys.handleESC()
  });
  
  listen(document, "keydown", e => {
      if (e.keyCode == app.keys.arrowUp) app.keys.handleArrowUp(e);
      else if (e.keyCode == app.keys.arrowDown) app.keys.handleArrowDown(e);
      else if (e.keyCode == app.keys.enter) app.keys.handleEnter(e);
  });
  });
  
  // Search
  app.search.visible = false;
  app.search.storageKey = "globalSearchData";
  app.ready(() => {
  var searchIcon = select(".js-search");
  if (!(searchIcon instanceof HTMLElement)) return;
  
  app.search.searchIcon = searchIcon;
  app.search.loadData();
  
  // Dispatched events
  listen(document, "app:menuDidHide", app.search.showIcon);
  listen(document, "app:menuWillShow", app.search.hideIcon);
  
  // User input
  listen(searchIcon, "click", e => !app.search.visible ? app.search.reveal(e) : app.search.hide(e));
  listen(".js-search-input", "input", e => app.search.updateForQuery(e.target.value));
  });
  
  app.search.loadData = () => {
  // Check if data already exists, if so load it instead
  const cachedData = localStorage.getItem(app.search.storageKey);
  if (cachedData) {
      const data = JSON.parse(cachedData);
      app.search.data = data["items"];
      return;
  }
  
  // If not, cache this with local storage and don't fetch on every page load
  fetch("/js/searchable.json")
      .then(response => response.json())
      .then(data => {
          localStorage.setItem(app.search.storageKey, JSON.stringify(data));
          app.search.data = data["items"];
      }).catch(err => { /* Handle error */ });
  }
  
  app.search.updateForQuery = query => {
  query = query.toLowerCase();
  let hits = [];
  // Look through all items
  for (var i = 0; i < app.search.data.length; i++) {
      // For every item, look for hits
      const entryValues = Object.values(app.search.data[i]);
      const searchString = entryValues.join(" ").toLowerCase();
      if (searchString.indexOf(query) == -1) continue;
      // Store new hit
      hits.push(app.search.data[i]);
  }
  
  app.search.renderResults(hits, query);
  }
  
  app.search.renderResults = (results, query) => {
  const searchElements = create("div.site-search-content-results-list");
  
  for (var i = 0; i < results.length; i++) {
      // Create link and add "active" if first row
      const link = create("a.site-search-results-item.js-site-search-results-item", {
              classList: i == 0 ? "site-search-results-item-active" : "",
              href: results[i]["url"],
              textContent: results[i]["title"]
          },
          create("span.site-search-results-item-desc", results[i]["description"])
      );
      searchElements.appendChild(link);
  }
  // If length is 0, add a placeholder saying you found nothing
  if (results.length == 0) {
      var noResult = create("span.site-search-results-item.site-search-results-item-message",
          'No hits for "' + query + '"'
      );
      searchElements.appendChild(noResult);
  }
  
  var results = select(".js-site-search-content-results");
  results.innerHTML = "";
  results.appendChild(searchElements);
  
  listenAll(".js-site-search-results-item", "mouseenter", e => app.search.focusItem(e.target));
  }
  
  app.menu.visible = false;
  app.ready(() => {
  app.menu.icon = select(".js-menu");
  listen(app.menu.icon, "click", e => !app.menu.visible ? app.menu.reveal(e) : app.menu.hide(e));
  });
  
  app.menu.toggleStates = () =>  {
  select('body').classList.toggle('no-scroll');
  app.menu.icon.classList.toggle('menu-active');
  select('.js-nav').classList.toggle('site-nav-active');
  }
  
  app.search.toggleStates = () => {
  select('body').classList.toggle('no-scroll');
  select('.js-search-overlay').classList.toggle('site-nav-active');
  }
  
  app.menu.reveal = e => {
  app.menu.visible = true;
  app.menu.toggleStates();
  dispatch("app:menuWillShow");
  
  app.overlay.show({
      position: app.clickPosition(e),
      fill: "#ffffff"
  });
  
  anime.remove('.js-nav, .js-nav-header-line, .js-nav-animate');
  
  let containerDelay = 200;
  
  animate('.js-nav', {
      opacity: [0, 1],
      delay: containerDelay,
      duration: 200,
      easing: "easeInOutExpo"
  });
  
  var menuItemDelay = 90;
  containerDelay += 75;
  select(".js-nav-header").style.opacity = 0;
  animate('.js-nav-header', {
      opacity: [0, 1],
      delay: containerDelay,
      duration: 200,
      easing: "easeInOutExpo"
  });
  
  select(".js-nav-header-line").style.transform.replace(/scale\([0-9|\.]*\)/, 'scale(0.28)');
  animate('.js-nav-header-line', {
      scale: [0.28, 1],
      delay: containerDelay,
      duration: 600,
      easing: "easeInOutExpo"
  });
  containerDelay += 350;
  
  for (let animated of selectAll(".js-nav-animate")) {
      animated.style.opacity = 0;
      animated.style.transform.replace(/scale\([0-9|\.]*\)/, 'scale(0.9)');
  }
  
  animate('.js-nav-animate', [{
          opacity: 0,
          scale: 0.9,
          translateY: '-7px'
      },
      {
          opacity: 1,
          scale: 1,
          translateY: 0
      }
  ], {
      delay: (el, i) => containerDelay + menuItemDelay * (i + 1),
      duration: 1100,
      easing: "easeOutExpo"
  }).then(() => dispatch('app:menuDidReveal'));
  }
  
  
  
  app.menu.hide = (e) => {
  app.menu.visible = false;
  app.menu.toggleStates();
  dispatch("app:menuWillHide");
  
  app.overlay.hide({
      position: app.overlay.lastStartingPoint,
      fill: "#ffffff",
      complete: () => dispatch("app:menuDidHide")
  });
  
  animate('.js-nav', {
      opacity: [1, 0],
      duration: 200,
      easing: "easeInOutExpo"
  });
  
  animate('.js-nav-header-line', {
      scale: [1, 0.5],
      duration: 300,
      easing: "easeInExpo"
  });
  
  animate('.js-nav-animate', [{
          translateY: '0px',
          opacity: 1,
          scale: 1
      },
      {
          translateY: '10px',
          opacity: 0,
          scale: 0.9
      }
  ], {
      duration: 200,
      easing: "easeInExpo"
  });
  }
  
  app.menu.hideMenuIcon = () => app.menu.icon.classList.add("menu-hidden");
  
  app.menu.showMenuIcon = () => {
  app.menu.icon.classList.remove("menu-hidden");
  animate('.menu', {
      opacity: [0, 1],
      duration: 500,
      easing: 'easeOutQuart'
  });
  }
  
  app.search.hideIcon = () =>  {
  if (!app.search.searchIcon) return;
  app.search.searchIcon.classList.add("menu-hidden");
  }
  
  app.search.showIcon = () =>  {
  if (!app.search.searchIcon) return;
  app.search.searchIcon.classList.remove("menu-hidden");
  animate('.js-search', {
      opacity: [0, 1],
      duration: 500,
      easing: 'easeOutQuart'
  });
  }
  
  app.keys.handleESC = () => {
  dispatch("pressed:ESC");
  if (app.menu.visible) app.menu.hide()
  if (app.search.visible) app.search.hide();
  }
  
  // Keyboard Key handling
  app.keys.ESC = 27;
  app.keys.arrowUp = 38;
  app.keys.arrowDown = 40;
  app.keys.enter = 13;
  
  app.keys.handleArrowUp = (e) => {
  if (app.search.visible) {
      e.preventDefault();
      app.search.moveSelectionUp();
  }
  }
  
  app.keys.handleArrowDown = (e) => {
  if (app.search.visible) {
      e.preventDefault();
      app.search.moveSelectionDown();
  }
  }
  
  app.keys.handleEnter = (e) => {
  if (app.search.visible) {
      e.preventDefault();
      app.search.goToSelectedItem();
  }
  }
  
  app.animations.track = (animeTimeline, el) => {
  const animationObserver = new IntersectionObserver((entries, observer) => {
      entries[0].isIntersecting ? animeTimeline.play() : animeTimeline.pause();
  }, {
      rootMargin: '-5px 0px'
  });
  animationObserver.observe(el);
  }
  
  app.ready(() => {
  app.overlay.c = select(".site-nav-canvas");
  app.overlay.ctx = app.overlay.c.getContext("2d");
  app.overlay.cH;
  app.overlay.cW;
  app.overlay.bgColor = "transparent";
  app.overlay.resizeCanvas();
  app.overlay.lastStartingPoint = {
      x: 0,
      y: 0
  };
  
  listen(window, "resize", app.overlay.resizeCanvas);
  });
  
  app.overlay.resizeCanvas = function() {
  app.overlay.cW = window.innerWidth;
  app.overlay.cH = window.innerHeight;
  app.overlay.c.width = app.overlay.cW * window.devicePixelRatio;
  app.overlay.c.height = app.overlay.cH * window.devicePixelRatio;
  app.overlay.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  app.overlay.ctx.fillStyle = app.overlay.bgColor;
  app.overlay.ctx.fillRect(0, 0, app.overlay.cW, app.overlay.cH);
  }
  
  app.overlay.show = options => {
  app.overlay.c.style.display = "block";
  app.overlay.c.style.zIndex = "1";
  app.overlay.lastStartingPoint = options.position;
  
  options.targetRadius = app.overlay.calcPageFillRadius(options.position.x, options.position.y);
  options.startRadius = 0;
  options.easing = "easeOutQuart";
  app.overlay.animate(options);
  }
  
  // Hide the overlay. Args:
  // fill: color to animate with
  // position: position to target as the circle shrinks
  // complete: completion callback
  app.overlay.hide = options => {
  options.targetRadius = 0;
  options.easing = "easeInOutQuart";
  
  const callback = options.complete;
  options.complete = () => {
      app.overlay.c.style.display = "none";
      app.overlay.bgColor = "transparent";
      if (callback) callback();
  };
  
  options.startRadius = app.overlay.calcPageFillRadius(options.position.x, options.position.y);
  app.overlay.animate(options);
  }
  
  // Animate from one size to another. Args:
  // position: {x, y}
  // fill: "color" 
  // startRadius: number
  // targetRadius: number
  // complete: callback method
  app.overlay.animate = (options) => {
  const minCoverDuration = 750;
  app.overlay.bgColor = options.fill;
  
  app.overlay.circle.x = options.position.x;
  app.overlay.circle.y = options.position.y;
  app.overlay.circle.r = options.startRadius;
  app.overlay.circle.fill = options.fill;
  
  anime.remove(app.overlay.circle)
  
  anime({
      targets: app.overlay.circle,
      r: options.targetRadius,
      duration: Math.max(options.targetRadius / 2, minCoverDuration),
      easing: options.easing,
      complete: options.complete ? options.complete : null,
      update: () => app.overlay.circle.draw({
          startRadius: options.startRadius,
          targetRadius: options.targetRadius
      })
  });
  }
  
  app.overlay.calcPageFillRadius = function(x, y) {
  var l = Math.max(x - 0, app.overlay.cW - x);
  var h = Math.max(y - 0, app.overlay.cH - y);
  return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
  }
  
  app.clickPosition = (e) => {
  if (e.touches) e = e.touches[0];
  
  if (e.clientX && e.clientY) return {
      x: e.clientX,
      y: e.clientY
  }
  
  // If there was no clientX and Y set, use the center position of
  // the target as a backup
  var rect = e.target.getBoundingClientRect();
  return {
      x: rect.top + (rect.bottom - rect.top) / 2,
      y: rect.left + (rect.right - rect.left) / 2
  }
  }
  
  app.overlay.circle = {};
  
  app.overlay.circle.draw = function(options) {
  if (options.targetRadius < options.startRadius) {
      app.overlay.ctx.clearRect(0, 0, app.overlay.cW, app.overlay.cH);
  }
  
  app.overlay.ctx.beginPath();
  app.overlay.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
  app.overlay.ctx.fillStyle = this.fill;
  app.overlay.ctx.fill();
  app.overlay.ctx.closePath();
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  /*
  2017 Julian Garnier
  Released under the MIT license
  */
  var $jscomp$this = this;
  (function(v, p) {
  "function" === typeof define && define.amd ? define([], p) : "object" === typeof module && module.exports ? module.exports = p() : v.anime = p()
  })(this, function() {
  function v(a) {
      if (!g.col(a)) try {
          return document.querySelectorAll(a)
      } catch (b) {}
  }
  
  function p(a) {
      return a.reduce(function(a, d) {
          return a.concat(g.arr(d) ? p(d) : d)
      }, [])
  }
  
  function w(a) {
      if (g.arr(a)) return a;
      g.str(a) && (a = v(a) || a);
      return a instanceof NodeList || a instanceof HTMLCollection ? [].slice.call(a) : [a]
  }
  
  function F(a, b) {
      return a.some(function(a) {
          return a === b
      })
  }
  
  function A(a) {
      var b = {},
          d;
      for (d in a) b[d] = a[d];
      return b
  }
  
  function G(a, b) {
      var d = A(a),
          c;
      for (c in a) d[c] = b.hasOwnProperty(c) ? b[c] : a[c];
      return d
  }
  
  function B(a, b) {
      var d = A(a),
          c;
      for (c in b) d[c] = g.und(a[c]) ? b[c] : a[c];
      return d
  }
  
  function S(a) {
      a = a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(a, b, d, h) {
          return b + b + d + d + h + h
      });
      var b = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
      a = parseInt(b[1], 16);
      var d = parseInt(b[2], 16),
          b = parseInt(b[3], 16);
      return "rgb(" + a + "," + d + "," + b + ")"
  }
  
  function T(a) {
      function b(a, b, c) {
          0 >
              c && (c += 1);
          1 < c && --c;
          return c < 1 / 6 ? a + 6 * (b - a) * c : .5 > c ? b : c < 2 / 3 ? a + (b - a) * (2 / 3 - c) * 6 : a
      }
      var d = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(a);
      a = parseInt(d[1]) / 360;
      var c = parseInt(d[2]) / 100,
          d = parseInt(d[3]) / 100;
      if (0 == c) c = d = a = d;
      else {
          var e = .5 > d ? d * (1 + c) : d + c - d * c,
              l = 2 * d - e,
              c = b(l, e, a + 1 / 3),
              d = b(l, e, a);
          a = b(l, e, a - 1 / 3)
      }
      return "rgb(" + 255 * c + "," + 255 * d + "," + 255 * a + ")"
  }
  
  function x(a) {
      if (a = /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg|rad|turn)?/.exec(a)) return a[2]
  }
  
  function U(a) {
      if (-1 < a.indexOf("translate")) return "px";
      if (-1 < a.indexOf("rotate") || -1 < a.indexOf("skew")) return "deg"
  }
  
  function H(a, b) {
      return g.fnc(a) ? a(b.target, b.id, b.total) : a
  }
  
  function C(a, b) {
      if (b in a.style) return getComputedStyle(a).getPropertyValue(b.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()) || "0"
  }
  
  function I(a, b) {
      if (g.dom(a) && F(V, b)) return "transform";
      if (g.dom(a) && (a.getAttribute(b) || g.svg(a) && a[b])) return "attribute";
      if (g.dom(a) && "transform" !== b && C(a, b)) return "css";
      if (null != a[b]) return "object"
  }
  
  function W(a, b) {
      var d = U(b),
          d = -1 < b.indexOf("scale") ?
          1 : 0 + d;
      a = a.style.transform;
      if (!a) return d;
      for (var c = [], e = [], l = [], h = /(\w+)\((.+?)\)/g; c = h.exec(a);) e.push(c[1]), l.push(c[2]);
      a = l.filter(function(a, c) {
          return e[c] === b
      });
      return a.length ? a[0] : d
  }
  
  function J(a, b) {
      switch (I(a, b)) {
          case "transform":
              return W(a, b);
          case "css":
              return C(a, b);
          case "attribute":
              return a.getAttribute(b)
      }
      return a[b] || 0
  }
  
  function K(a, b) {
      var d = /^(\*=|\+=|-=)/.exec(a);
      if (!d) return a;
      b = parseFloat(b);
      a = parseFloat(a.replace(d[0], ""));
      switch (d[0][0]) {
          case "+":
              return b + a;
          case "-":
              return b - a;
          case "*":
              return b *
                  a
      }
  }
  
  function D(a) {
      return g.obj(a) && a.hasOwnProperty("totalLength")
  }
  
  function X(a, b) {
      function d(c) {
          c = void 0 === c ? 0 : c;
          return a.el.getPointAtLength(1 <= b + c ? b + c : 0)
      }
      var c = d(),
          e = d(-1),
          l = d(1);
      switch (a.property) {
          case "x":
              return c.x;
          case "y":
              return c.y;
          case "angle":
              return 180 * Math.atan2(l.y - e.y, l.x - e.x) / Math.PI
      }
  }
  
  function L(a, b) {
      var d = /-?\d*\.?\d+/g;
      a = D(a) ? a.totalLength : a;
      if (g.col(a)) b = g.rgb(a) ? a : g.hex(a) ? S(a) : g.hsl(a) ? T(a) : void 0;
      else {
          var c = x(a);
          a = c ? a.substr(0, a.length - c.length) : a;
          b = b ? a + b : a
      }
      b += "";
      return {
          original: b,
          numbers: b.match(d) ? b.match(d).map(Number) : [0],
          strings: b.split(d)
      }
  }
  
  function Y(a, b) {
      return b.reduce(function(b, c, e) {
          return b + a[e - 1] + c
      })
  }
  
  function M(a) {
      return (a ? p(g.arr(a) ? a.map(w) : w(a)) : []).filter(function(a, d, c) {
          return c.indexOf(a) === d
      })
  }
  
  function Z(a) {
      var b = M(a);
      return b.map(function(a, c) {
          return {
              target: a,
              id: c,
              total: b.length
          }
      })
  }
  
  function aa(a, b) {
      var d = A(b);
      if (g.arr(a)) {
          var c = a.length;
          2 !== c || g.obj(a[0]) ? g.fnc(b.duration) || (d.duration = b.duration / c) : a = {
              value: a
          }
      }
      return w(a).map(function(a, c) {
          c = c ? 0 : b.delay;
          a = g.obj(a) && !D(a) ? a : {
              value: a
          };
          g.und(a.delay) && (a.delay = c);
          return a
      }).map(function(a) {
          return B(a, d)
      })
  }
  
  function ba(a, b) {
      var d = {},
          c;
      for (c in a) {
          var e = H(a[c], b);
          g.arr(e) && (e = e.map(function(a) {
              return H(a, b)
          }), 1 === e.length && (e = e[0]));
          d[c] = e
      }
      d.duration = parseFloat(d.duration);
      d.delay = parseFloat(d.delay);
      return d
  }
  
  function ca(a) {
      return g.arr(a) ? y.apply(this, a) : N[a]
  }
  
  function da(a, b) {
      var d;
      return a.tweens.map(function(c) {
          c = ba(c, b);
          var e = c.value,
              l = J(b.target, a.name),
              h = d ? d.to.original : l,
              h = g.arr(e) ? e[0] : h,
              m = K(g.arr(e) ?
                  e[1] : e, h),
              l = x(m) || x(h) || x(l);
          c.isPath = D(e);
          c.from = L(h, l);
          c.to = L(m, l);
          c.start = d ? d.end : a.offset;
          c.end = c.start + c.delay + c.duration;
          c.easing = ca(c.easing);
          c.elasticity = (1E3 - Math.min(Math.max(c.elasticity, 1), 999)) / 1E3;
          g.col(c.from.original) && (c.round = 1);
          return d = c
      })
  }
  
  function ea(a, b) {
      return p(a.map(function(a) {
          return b.map(function(b) {
              var c = I(a.target, b.name);
              if (c) {
                  var d = da(b, a);
                  b = {
                      type: c,
                      property: b.name,
                      animatable: a,
                      tweens: d,
                      duration: d[d.length - 1].end,
                      delay: d[0].delay
                  }
              } else b = void 0;
              return b
          })
      })).filter(function(a) {
          return !g.und(a)
      })
  }
  
  function O(a, b, d) {
      var c = "delay" === a ? Math.min : Math.max;
      return b.length ? c.apply(Math, b.map(function(b) {
          return b[a]
      })) : d[a]
  }
  
  function fa(a) {
      var b = G(ga, a),
          d = G(ha, a),
          c = Z(a.targets),
          e = [],
          g = B(b, d),
          h;
      for (h in a) g.hasOwnProperty(h) || "targets" === h || e.push({
          name: h,
          offset: g.offset,
          tweens: aa(a[h], d)
      });
      a = ea(c, e);
      return B(b, {
          children: [],
          animatables: c,
          animations: a,
          duration: O("duration", a, d),
          delay: O("delay", a, d)
      })
  }
  
  function n(a) {
      function b() {
          return window.Promise && new Promise(function(a) {
              return Q = a
          })
      }
  
      function d(a) {
          return f.reversed ?
              f.duration - a : a
      }
  
      function c(a) {
          for (var b = 0, c = {}, d = f.animations, e = {}; b < d.length;) {
              var g = d[b],
                  h = g.animatable,
                  m = g.tweens;
              e.tween = m.filter(function(b) {
                  return a < b.end
              })[0] || m[m.length - 1];
              e.isPath$1 = e.tween.isPath;
              e.round = e.tween.round;
              e.eased = e.tween.easing(Math.min(Math.max(a - e.tween.start - e.tween.delay, 0), e.tween.duration) / e.tween.duration, e.tween.elasticity);
              m = Y(e.tween.to.numbers.map(function(a) {
                  return function(b, c) {
                      c = a.isPath$1 ? 0 : a.tween.from.numbers[c];
                      b = c + a.eased * (b - c);
                      a.isPath$1 && (b = X(a.tween.value,
                          b));
                      a.round && (b = Math.round(b * a.round) / a.round);
                      return b
                  }
              }(e)), e.tween.to.strings);
              ia[g.type](h.target, g.property, m, c, h.id);
              g.currentValue = m;
              b++;
              e = {
                  isPath$1: e.isPath$1,
                  tween: e.tween,
                  eased: e.eased,
                  round: e.round
              }
          }
          if (c)
              for (var k in c) E || (E = C(document.body, "transform") ? "transform" : "-webkit-transform"), f.animatables[k].target.style[E] = c[k].join(" ");
          f.currentTime = a;
          f.progress = a / f.duration * 100
      }
  
      function e(a) {
          if (f[a]) f[a](f)
      }
  
      function g() {
          f.remaining && !0 !== f.remaining && f.remaining--
      }
  
      function h(a) {
          var h = f.duration,
              l = f.offset,
              n = f.delay,
              P = f.currentTime,
              q = f.reversed,
              r = d(a),
              r = Math.min(Math.max(r, 0), h);
          if (f.children) {
              var p = f.children;
              if (r >= f.currentTime)
                  for (var u = 0; u < p.length; u++) p[u].seek(r);
              else
                  for (u = p.length; u--;) p[u].seek(r)
          }
          r > l && r < h ? (c(r), !f.began && r >= n && (f.began = !0, e("begin")), e("run")) : (r <= l && 0 !== P && (c(0), q && g()), r >= h && P !== h && (c(h), q || g()));
          a >= h && (f.remaining ? (t = m, "alternate" === f.direction && (f.reversed = !f.reversed)) : (f.pause(), "Promise" in window && (Q(), R = b()), f.completed || (f.completed = !0, e("complete"))),
              k = 0);
          e("update")
      }
      a = void 0 === a ? {} : a;
      var m, t, k = 0,
          Q = null,
          R = b(),
          f = fa(a);
      f.reset = function() {
          var a = f.direction,
              b = f.loop;
          f.currentTime = 0;
          f.progress = 0;
          f.paused = !0;
          f.began = !1;
          f.completed = !1;
          f.reversed = "reverse" === a;
          f.remaining = "alternate" === a && 1 === b ? 2 : b;
          for (a = f.children.length; a--;) b = f.children[a], b.seek(b.offset), b.reset()
      };
      f.tick = function(a) {
          m = a;
          t || (t = m);
          h((k + m - t) * n.speed)
      };
      f.seek = function(a) {
          h(d(a))
      };
      f.pause = function() {
          var a = q.indexOf(f); - 1 < a && q.splice(a, 1);
          f.paused = !0
      };
      f.play = function() {
          f.paused && (f.paused = !1, t = 0, k = d(f.currentTime), q.push(f), z || ja())
      };
      f.reverse = function() {
          f.reversed = !f.reversed;
          t = 0;
          k = d(f.currentTime)
      };
      f.restart = function() {
          f.pause();
          f.reset();
          f.play()
      };
      f.finished = R;
      f.reset();
      f.autoplay && f.play();
      return f
  }
  var ga = {
          update: void 0,
          begin: void 0,
          run: void 0,
          complete: void 0,
          loop: 1,
          direction: "normal",
          autoplay: !0,
          offset: 0
      },
      ha = {
          duration: 1E3,
          delay: 0,
          easing: "easeOutElastic",
          elasticity: 500,
          round: 0
      },
      V = "translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY".split(" "),
      E, g = {
          arr: function(a) {
              return Array.isArray(a)
          },
          obj: function(a) {
              return -1 < Object.prototype.toString.call(a).indexOf("Object")
          },
          svg: function(a) {
              return a instanceof SVGElement
          },
          dom: function(a) {
              return a.nodeType || g.svg(a)
          },
          str: function(a) {
              return "string" === typeof a
          },
          fnc: function(a) {
              return "function" === typeof a
          },
          und: function(a) {
              return "undefined" === typeof a
          },
          hex: function(a) {
              return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a)
          },
          rgb: function(a) {
              return /^rgb/.test(a)
          },
          hsl: function(a) {
              return /^hsl/.test(a)
          },
          col: function(a) {
              return g.hex(a) ||
                  g.rgb(a) || g.hsl(a)
          }
      },
      y = function() {
          function a(a, d, c) {
              return (((1 - 3 * c + 3 * d) * a + (3 * c - 6 * d)) * a + 3 * d) * a
          }
          return function(b, d, c, e) {
              if (0 <= b && 1 >= b && 0 <= c && 1 >= c) {
                  var g = new Float32Array(11);
                  if (b !== d || c !== e)
                      for (var h = 0; 11 > h; ++h) g[h] = a(.1 * h, b, c);
                  return function(h) {
                      if (b === d && c === e) return h;
                      if (0 === h) return 0;
                      if (1 === h) return 1;
                      for (var m = 0, k = 1; 10 !== k && g[k] <= h; ++k) m += .1;
                      --k;
                      var k = m + (h - g[k]) / (g[k + 1] - g[k]) * .1,
                          l = 3 * (1 - 3 * c + 3 * b) * k * k + 2 * (3 * c - 6 * b) * k + 3 * b;
                      if (.001 <= l) {
                          for (m = 0; 4 > m; ++m) {
                              l = 3 * (1 - 3 * c + 3 * b) * k * k + 2 * (3 * c - 6 * b) * k + 3 * b;
                              if (0 === l) break;
                              var n = a(k, b, c) - h,
                                  k = k - n / l
                          }
                          h = k
                      } else if (0 === l) h = k;
                      else {
                          var k = m,
                              m = m + .1,
                              f = 0;
                          do n = k + (m - k) / 2, l = a(n, b, c) - h, 0 < l ? m = n : k = n; while (1e-7 < Math.abs(l) && 10 > ++f);
                          h = n
                      }
                      return a(h, d, e)
                  }
              }
          }
      }(),
      N = function() {
          function a(a, b) {
              return 0 === a || 1 === a ? a : -Math.pow(2, 10 * (a - 1)) * Math.sin(2 * (a - 1 - b / (2 * Math.PI) * Math.asin(1)) * Math.PI / b)
          }
          var b = "Quad Cubic Quart Quint Sine Expo Circ Back Elastic".split(" "),
              d = {
                  In: [
                      [.55, .085, .68, .53],
                      [.55, .055, .675, .19],
                      [.895, .03, .685, .22],
                      [.755, .05, .855, .06],
                      [.47, 0, .745, .715],
                      [.95, .05, .795, .035],
                      [.6, .04, .98,
                          .335
                      ],
                      [.6, -.28, .735, .045], a
                  ],
                  Out: [
                      [.25, .46, .45, .94],
                      [.215, .61, .355, 1],
                      [.165, .84, .44, 1],
                      [.23, 1, .32, 1],
                      [.39, .575, .565, 1],
                      [.19, 1, .22, 1],
                      [.075, .82, .165, 1],
                      [.175, .885, .32, 1.275],
                      function(b, c) {
                          return 1 - a(1 - b, c)
                      }
                  ],
                  InOut: [
                      [.455, .03, .515, .955],
                      [.645, .045, .355, 1],
                      [.77, 0, .175, 1],
                      [.86, 0, .07, 1],
                      [.445, .05, .55, .95],
                      [1, 0, 0, 1],
                      [.785, .135, .15, .86],
                      [.68, -.55, .265, 1.55],
                      function(b, c) {
                          return .5 > b ? a(2 * b, c) / 2 : 1 - a(-2 * b + 2, c) / 2
                      }
                  ]
              },
              c = {
                  linear: y(.25, .25, .75, .75)
              },
              e = {},
              l;
          for (l in d) e.type = l, d[e.type].forEach(function(a) {
              return function(d,
                  e) {
                  c["ease" + a.type + b[e]] = g.fnc(d) ? d : y.apply($jscomp$this, d)
              }
          }(e)), e = {
              type: e.type
          };
          return c
      }(),
      ia = {
          css: function(a, b, d) {
              return a.style[b] = d
          },
          attribute: function(a, b, d) {
              return a.setAttribute(b, d)
          },
          object: function(a, b, d) {
              return a[b] = d
          },
          transform: function(a, b, d, c, e) {
              c[e] || (c[e] = []);
              c[e].push(b + "(" + d + ")")
          }
      },
      q = [],
      z = 0,
      ja = function() {
          function a() {
              z = requestAnimationFrame(b)
          }
  
          function b(b) {
              var c = q.length;
              if (c) {
                  for (var d = 0; d < c;) q[d] && q[d].tick(b), d++;
                  a()
              } else cancelAnimationFrame(z), z = 0
          }
          return a
      }();
  n.version = "2.0.2";
  n.speed = 1;
  n.running = q;
  n.remove = function(a) {
      a = M(a);
      for (var b = q.length; b--;)
          for (var d = q[b], c = d.animations, e = c.length; e--;) F(a, c[e].animatable.target) && (c.splice(e, 1), c.length || d.pause())
  };
  n.getValue = J;
  n.path = function(a, b) {
      var d = g.str(a) ? v(a)[0] : a,
          c = b || 100;
      return function(a) {
          return {
              el: d,
              property: a,
              totalLength: d.getTotalLength() * (c / 100)
          }
      }
  };
  n.setDashoffset = function(a) {
      var b = a.getTotalLength();
      a.setAttribute("stroke-dasharray", b);
      return b
  };
  n.bezier = y;
  n.easings = N;
  n.timeline = function(a) {
      var b = n(a);
      b.pause();
      b.duration = 0;
      b.add = function(a) {
          b.children.forEach(function(a) {
              a.began = !0;
              a.completed = !0
          });
          w(a).forEach(function(a) {
              var c = b.duration,
                  d = a.offset;
              a.autoplay = !1;
              a.offset = g.und(d) ? c : K(d, c);
              b.seek(a.offset);
              a = n(a);
              a.duration > c && (b.duration = a.duration);
              a.began = !0;
              b.children.push(a)
          });
          b.reset();
          b.seek(0);
          b.autoplay && b.restart();
          return b
      };
      return b
  };
  n.random = function(a, b) {
      return Math.floor(Math.random() * (b - a + 1)) + a
  };
  return n
  });
  
  
  
  
  
  
  
  
  