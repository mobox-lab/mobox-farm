/*!
 * by zhangxinxu(.com) 2012-12-27
 * you can visit http://www.zhangxinxu.com/wordpress/?p=3855 to get more infomation
 * under MIT license
 */
var funParabola = function (d, t, g) {
	var i = {
		speed: 166.67,
		curvature: 0.001,
		progress: function () {},
		complete: function () {}
	};
	var p = {};
	g = g || {};
	for (var v in i) {
		p[v] = g[v] || i[v]
	}
	var u = {
		mark: function () {
			return this
		},
		position: function () {
			return this
		},
		move: function () {
			return this
		},
		init: function () {
			return this
		}
	};
	var e = "margin",
		r = document.createElement("div");
	if ("oninput" in r) {
		["", "ms", "webkit"].forEach(function (b) {
			var a = b + (b ? "T" : "t") + "ransform";
			if (a in r.style) {
				e = a
			}
		})
	}
	var s = p.curvature,
		q = 0,
		o = 0;
	var k = true;
	if (d && t && d.nodeType == 1 && t.nodeType == 1) {
		var n = {},
			j = {};
		var h = {},
			m = {};
		var f = {},
			l = {};
		u.mark = function () {
			if (k == false) {
				return this
			}
			if (typeof f.x == "undefined") {
				this.position()
			}
			d.setAttribute("data-center", [f.x, f.y].join());
			t.setAttribute("data-center", [l.x, l.y].join());
			return this
		};
		u.position = function () {
			if (k == false) {
				return this
			}
			var b = document.documentElement.scrollLeft || document.body.scrollLeft,
				a = document.documentElement.scrollTop || document.body.scrollTop;
			if (e == "margin") {
				d.style.marginLeft = d.style.marginTop = "0px"
			} else {
				d.style[e] = "translate(0, 0)"
			}
			n = d.getBoundingClientRect();
			j = t.getBoundingClientRect();
			h = {
				x: n.left + (n.right - n.left) / 2 + b,
				y: n.top + (n.bottom - n.top) / 2 + a
			};
			m = {
				x: j.left + (j.right - j.left) / 2 + b,
				y: j.top + (j.bottom - j.top) / 2 + a
			};
			f = {
				x: 0,
				y: 0
			};
			l = {
				x: -1 * (h.x - m.x),
				y: -1 * (h.y - m.y)
			};
			q = (l.y - s * l.x * l.x) / l.x;
			return this
		};
		u.move = function () {
			if (k == false) {
				return this
			}
			var a = 0,
				b = l.x > 0 ? 1 : -1;
			var c = function () {
				var z = 2 * s * a + q;
				a = a + b * Math.sqrt(p.speed / (z * z + 1));
				if ((b == 1 && a > l.x) || (b == -1 && a < l.x)) {
					a = l.x
				}
				var w = a,
					A = s * w * w + q * w;
				d.setAttribute("data-center", [Math.round(w), Math.round(A)].join());
				if (e == "margin") {
					d.style.marginLeft = w + "px";
					d.style.marginTop = A + "px"
				} else {
					d.style[e] = "translate(" + [w + "px", A + "px"].join() + ")"
				}
				if (a !== l.x) {
					p.progress(w, A);
					window.requestAnimationFrame(c)
				} else {
					p.complete();
					k = true
				}
			};
			window.requestAnimationFrame(c);
			k = false;
			return this
		};
		u.init = function () {
			this.position().mark().move()
		}
	}
	return u
};
/*! requestAnimationFrame.js
 * by zhangxinxu 2013-09-30
 */
(function () {
	var b = 0;
	var c = ["webkit", "moz"];
	for (var a = 0; a < c.length && !window.requestAnimationFrame; ++a) {
		window.requestAnimationFrame = window[c[a] + "RequestAnimationFrame"];
		window.cancelAnimationFrame = window[c[a] + "CancelAnimationFrame"] || window[c[a] + "CancelRequestAnimationFrame"]
	}
	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = function (h, e) {
			var d = new Date().getTime();
			var f = Math.max(0, 16.7 - (d - b));
			var g = window.setTimeout(function () {
				h(d + f)
			}, f);
			b = d + f;
			return g
		}
	}
	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function (d) {
			clearTimeout(d)
		}
	}
}());