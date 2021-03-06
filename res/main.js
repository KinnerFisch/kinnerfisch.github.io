!function(t, e) {
	var s = e.body,
	n = e.querySelector.bind(e),
	a = e.querySelectorAll.bind(e),
	o = n("html"),
	c = n("#gotop"),
	l = n("#menu"),
	r = n("#header"),
	d = n("#mask"),
	h = n("#menu-toggle"),
	f = n("#menu-off"),
	u = n("#loading"),
	m = t.requestAnimationFrame,
	v = 12,
	g = Array.prototype.forEach,
	p = "ontouchstart" in t && /Mobile|Android|iOS|iPhone|iPad|iPod|Windows Phone|KFAPWI/i.test(navigator.userAgent) ? "touchstart": "click",
	L = /micromessenger/i.test(navigator.userAgent),
	y = function() {},
	w = function(t) {
		var e = t.offsetLeft,
		i = t.offsetTop;
		if (t.offsetParent) {
			var s = arguments.callee(t.offsetParent);
			e += s.x,
			i += s.y
		}
		return {
			x: e,
			y: i
		}
	},
	x = function() {
		return e.documentElement.scrollTop || e.body.scrollTop
	},
	$ = {
		goTop: function(e) {
			var i = x(),
			s = arguments.length > 2 ? arguments[1] : Math.abs(i - e) / v;
			i && i > e ? (t.scrollTo(0, Math.max(i - s, 0)), m(arguments.callee.bind(this, e, s))) : e && e > i ? (t.scrollTo(0, Math.min(i + s, e)), m(arguments.callee.bind(this, e, s))) : this.toc.actived(e)
		},
		toggleGotop: function(e) {
			e > t.innerHeight / 2 ? c.classList.add("in") : c.classList.remove("in")
		},
		toggleMenu: function(e) {
			var i = n("#main");
			if (e) {
				if (l.classList.remove("hide"), t.innerWidth < 1241) if (d.classList.add("in"), l.classList.add("show"), L) {
					var s = x();
					i.classList.add("lock"),
					i.scrollTop = s
				} else o.classList.add("lock")
			} else if (l.classList.remove("show"), d.classList.remove("in"), L) {
				var s = i.scrollTop;
				i.classList.remove("lock"),
				t.scrollTo(0, s)
			} else o.classList.remove("lock")
		},
		fixedHeader: function(t) {
			t > r.clientHeight ? r.classList.add("fixed") : r.classList.remove("fixed")
		},
		toc: function() {
			var t = n("#post-toc");
			if (!t || !t.children.length) return {
				fixed: y,
				actived: y
			};
			var e = n(".post-header").clientHeight,
			s = r.clientHeight,
			a = n("#post-content").querySelectorAll("h1, h2, h3, h4, h5, h6");
			t.querySelector('a[href="#' + a[0].id + '"]').parentNode.classList.add("active");
			var o = t.querySelectorAll(".post-toc-child");
			for (i = 0, len = o.length; i < len; i++) o[i].classList.add("post-toc-shrink");
			var c = t.querySelector('a[href="#' + a[0].id + '"]').nextElementSibling;
			c && (c.classList.add("post-toc-expand"), c.classList.remove("post-toc-shrink")),
			t.classList.remove("post-toc-shrink");
			var l = function(t, e) {
				t.classList.remove("active"),
				e.classList.add("active");
				var i = e.parentElement.querySelectorAll(".post-toc-child");
				for (j = 0, len1 = i.length; j < len1; j++) i[j].classList.remove("post-toc-expand"),
				i[j].classList.add("post-toc-shrink");
				var s = e.querySelector(".post-toc-child");
				s && (s.classList.remove("post-toc-shrink"), s.classList.add("post-toc-expand"))
			};
			return {
				fixed: function(i) {
					i >= e - s ? t.classList.add("fixed") : t.classList.remove("fixed")
				},
				actived: function(e) {
					for (i = 0, len = a.length; i < len; i++) if (e > w(a[i]).y - s - 5) {
						var n = t.querySelector("li.active"),
						o = t.querySelector('a[href="#' + a[i].id + '"]').parentNode;
						l(n, o)
					}
					e < w(a[0]).y && l(t.querySelector("li.active"), t.querySelector('a[href="#' + a[0].id + '"]').parentNode)
				}
			}
		} (),
		hideOnMask: [],
		modal: function(t) {
			this.$modal = n(t);
			var e = this;
			this.show = function() {
				d.classList.add("in"),
				e.$modal.classList.add("ready"),
				setTimeout(function() {
					e.$modal.classList.add("in")
				},
				0)
			},
			this.onHide = y,
			this.hide = function() {
				e.onHide(),
				d.classList.remove("in"),
				e.$modal.classList.remove("in"),
				setTimeout(function() {
					e.$modal.classList.remove("ready")
				},
				300)
			},
			this.toggle = function() {
				return e.$modal.classList.contains("in") ? e.hide() : e.show()
			},
			$.hideOnMask.push(this.hide),
			this.$off && this.$off.addEventListener(p, this.hide)
		},
		share: function() {
			var t = n("#pageShare"),
			i = n("#shareFab"),
			s = new this.modal("#globalShare");
			i && (i.addEventListener(p,
			function() {
				t.classList.toggle("in")
			},
			!1), e.addEventListener(p,
			function(e) { ! i.contains(e.target) && t.classList.remove("in")
			},
			!1));
			var o = new this.modal("#wxShare");
			o.onHide = s.hide,
			g.call(a(".wxFab"),
			function(t) {
				t.addEventListener(p, o.toggle)
			})
		},
		reward: function() {
			var t = new this.modal("#reward");
			var e = n("#rewardToggle"),
			i = n("#rewardCode");
			e && e.addEventListener("change",
			function() {
				i.src = this.checked ? this.dataset.alipay: this.dataset.wechat
			})
		},
		waterfall: function() {
			t.innerWidth < 760 || g.call(a(".waterfall"),
			function(t) {
				var e = t.querySelectorAll(".waterfall-item"),
				i = [0, 0];
				g.call(e,
				function(t) {
					var e = i[0] <= i[1] ? 0 : 1;
					t.style.cssText = "top:" + i[e] + "px;left:" + (e > 0 ? "50%": 0),
					i[e] += t.offsetHeight
				}),
				t.style.height = Math.max(i[0], i[1]) + "px",
				t.classList.add("in")
			})
		},
		tabBar: function(t) {
			t.parentNode.parentNode.classList.toggle("expand")
		},
		page: function() {
			var t = a(".fade, .fade-scale"),
			e = !1;
			return {
				loaded: function() {
					g.call(t,
					function(t) {
						t.classList.add("in")
					}),
					e = !0
				},
				unload: function() {
					g.call(t,
					function(t) {
						t.classList.remove("in")
					}),
					e = !1
				},
				visible: e
			}
		} (),
		lightbox: function() {
			function i(i) {
				this.$img = i.querySelector("img"),
				this.$overlay = i.querySelector("overlay"),
				this.margin = 40,
				this.title = this.$img.title || this.$img.alt || "",
				this.isZoom = !1;
				var n, a, o, c, l;
				this.calcRect = function() {
					c = s.clientWidth,
					l = s.clientHeight;
					var t = l - 2 * this.margin,
					e = n,
					i = a,
					r = (this.margin, e > c ? c / e: 1),
					d = i > t ? t / i: 1,
					h = Math.min(r, d);
					return e *= h,
					i *= h,
					{
						w: e,
						h: i,
						t: (l - i) / 2 - o.top,
						l: (c - e) / 2 - o.left + this.$img.offsetLeft
					}
				},
				this.setImgRect = function(t) {
					this.$img.style.cssText = "width: " + t.w + "px; max-width: " + t.w + "px; height:" + t.h + "px; top: " + t.t + "px; left: " + t.l + "px"
				},
				this.setFrom = function() {
					this.setImgRect({
						w: o.width,
						h: o.height,
						t: 0,
						l: (i.offsetWidth - o.width) / 2
					})
				},
				this.setTo = function() {
					this.setImgRect(this.calcRect())
				},
				this.addTitle = function() {
					this.title && (this.$caption = e.createElement("div"), this.$caption.innerHTML = this.title, this.$caption.className = "overlay-title", i.appendChild(this.$caption))
				},
				this.removeTitle = function() {
					this.$caption && i.removeChild(this.$caption)
				};
				var r = this;
				this.zoomIn = function() {
					n = this.$img.naturalWidth || this.$img.width,
					a = this.$img.naturalHeight || this.$img.height,
					o = this.$img.getBoundingClientRect(),
					i.style.height = o.height + "px",
					i.classList.add("ready"),
					this.setFrom(),
					this.addTitle(),
					this.$img.classList.add("zoom-in"),
					setTimeout(function() {
						i.classList.add("active"),
						r.setTo(),
						r.isZoom = !0
					},
					0)
				},
				this.zoomOut = function() {
					this.isZoom = !1,
					i.classList.remove("active"),
					this.$img.classList.add("zoom-in"),
					this.setFrom(),
					setTimeout(function() {
						r.$img.classList.remove("zoom-in"),
						r.$img.style.cssText = "",
						r.removeTitle(),
						i.classList.remove("ready"),
						i.removeAttribute("style")
					},
					300)
				},
				i.addEventListener("click",
				function(t) {
					r.isZoom ? r.zoomOut() : "IMG" === t.target.tagName && r.zoomIn()
				}),
				e.addEventListener("scroll",
				function() {
					r.isZoom && r.zoomOut()
				}),
				t.addEventListener("resize",
				function() {
					r.isZoom && r.zoomOut()
				})
			}
			g.call(a(".img-lightbox"),
			function(t) {
				new i(t)
			})
		} (),
		loadScript: function(t) {
			t.forEach(function(t) {
				var i = e.createElement("script");
				i.src = t,
				i.async = !0,
				s.appendChild(i)
			})
		}
	};
	t.addEventListener("load",
	function() {
		u.classList.remove("active"),
		$.page.loaded(),
		t.lazyScripts && t.lazyScripts.length && $.loadScript(t.lazyScripts)
	}),
	t.addEventListener("DOMContentLoaded",
	function() {
		$.waterfall();
		var t = x();
		$.toc.fixed(t),
		$.toc.actived(t),
		$.page.loaded()
	});
	var E = !1,
	S = n('a[href^="mailto"]');
	S && S.addEventListener(p,
	function() {
		E = !0
	}),
	t.addEventListener("beforeunload",
	function(t) {
		E ? E = !1 : $.page.unload()
	}),
	t.addEventListener("pageshow",
	function() { ! $.page.visible && $.page.loaded()
	}),
	t.addEventListener("resize",
	function() {
		t.BLOG.even = p = "ontouchstart" in t ? "touchstart": "click",
		$.toggleMenu(),
		$.waterfall()
	}),
	c.addEventListener(p,
	function() {
		m($.goTop.bind($, 0))
	},
	!1),
	h.addEventListener(p,
	function(t) {
		$.toggleMenu(!0),
		t.preventDefault()
	},
	!1),
	f.addEventListener(p,
	function() {
		l.classList.add("hide")
	},
	!1),
	d.addEventListener(p,
	function(t) {
		$.toggleMenu(),
		$.hideOnMask.forEach(function(t) {
			t()
		}),
		t.preventDefault()
	},
	!1),
	e.addEventListener("scroll",
	function() {
		var t = x();
		$.toggleGotop(t),
		$.fixedHeader(t),
		$.toc.fixed(t),
		$.toc.actived(t)
	},
	!1),
	$.share(),
	$.reward(),
	$.noop = y,
	$.even = p,
	$.$ = n,
	$.$$ = a,
	t.Waves ? (Waves.init(), Waves.attach(".global-share li", ["waves-block"]), Waves.attach(".article-tag-list-link, #page-nav a, #page-nav span", ["waves-button"])) : null
} (window, document);
