/*
 Highcharts JS v7.1.0 (2019-04-01)

 3D features for Highcharts JS

 @license: www.highcharts.com/license
*/
(function (u) {
    "object" === typeof module && module.exports ? (u["default"] = u, module.exports = u) : "function" === typeof define && define.amd ? define("highcharts/highcharts-3d", ["highcharts"], function (A) {
        u(A);
        u.Highcharts = A;
        return u
    }) : u("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (u) {
    function A(b, z, x, v) {
        b.hasOwnProperty(z) || (b[z] = v.apply(null, x))
    }

    u = u ? u._modules : {};
    A(u, "parts-3d/Math.js", [u["parts/Globals.js"]], function (b) {
        var z = b.deg2rad, x = b.pick;
        b.perspective3D = function (b, r, n) {
            r = 0 < n && n < Number.POSITIVE_INFINITY ?
                n / (b.z + r.z + n) : 1;
            return {x: b.x * r, y: b.y * r}
        };
        b.perspective = function (v, r, n) {
            var y = r.options.chart.options3d, g = n ? r.inverted : !1,
                t = {x: r.plotWidth / 2, y: r.plotHeight / 2, z: y.depth / 2, vd: x(y.depth, 1) * x(y.viewDistance, 0)},
                p = r.scale3d || 1, h = z * y.beta * (g ? -1 : 1), y = z * y.alpha * (g ? -1 : 1), a = Math.cos(y),
                f = Math.cos(-h), q = Math.sin(y), k = Math.sin(-h);
            n || (t.x += r.plotLeft, t.y += r.plotTop);
            return v.map(function (m) {
                var e;
                e = (g ? m.y : m.x) - t.x;
                var c = (g ? m.x : m.y) - t.y;
                m = (m.z || 0) - t.z;
                e = {x: f * e - k * m, y: -q * k * e + a * c - f * q * m, z: a * k * e + q * c + a * f * m};
                c = b.perspective3D(e,
                    t, t.vd);
                c.x = c.x * p + t.x;
                c.y = c.y * p + t.y;
                c.z = e.z * p + t.z;
                return {x: g ? c.y : c.x, y: g ? c.x : c.y, z: c.z}
            })
        };
        b.pointCameraDistance = function (b, r) {
            var n = r.options.chart.options3d, v = r.plotWidth / 2;
            r = r.plotHeight / 2;
            n = x(n.depth, 1) * x(n.viewDistance, 0) + n.depth;
            return Math.sqrt(Math.pow(v - b.plotX, 2) + Math.pow(r - b.plotY, 2) + Math.pow(n - b.plotZ, 2))
        };
        b.shapeArea = function (b) {
            var r = 0, n, v;
            for (n = 0; n < b.length; n++) v = (n + 1) % b.length, r += b[n].x * b[v].y - b[v].x * b[n].y;
            return r / 2
        };
        b.shapeArea3d = function (v, r, n) {
            return b.shapeArea(b.perspective(v,
                r, n))
        }
    });
    A(u, "parts-3d/SVGRenderer.js", [u["parts/Globals.js"]], function (b) {
        function z(a, c, d, b, f, B, k, m) {
            var l = [], E = B - f;
            return B > f && B - f > Math.PI / 2 + .0001 ? (l = l.concat(z(a, c, d, b, f, f + Math.PI / 2, k, m)), l = l.concat(z(a, c, d, b, f + Math.PI / 2, B, k, m))) : B < f && f - B > Math.PI / 2 + .0001 ? (l = l.concat(z(a, c, d, b, f, f - Math.PI / 2, k, m)), l = l.concat(z(a, c, d, b, f - Math.PI / 2, B, k, m))) : ["C", a + d * Math.cos(f) - d * e * E * Math.sin(f) + k, c + b * Math.sin(f) + b * e * E * Math.cos(f) + m, a + d * Math.cos(B) + d * e * E * Math.sin(B) + k, c + b * Math.sin(B) - b * e * E * Math.cos(B) + m, a + d * Math.cos(B) +
            k, c + b * Math.sin(B) + m]
        }

        var x = Math.cos, v = Math.PI, r = Math.sin, n = b.animObject, y = b.charts, g = b.color, t = b.defined,
            p = b.deg2rad, h = b.extend, a = b.merge, f = b.perspective, q = b.pick, k = b.SVGElement,
            m = b.SVGRenderer, e, c, w;
        e = 4 * (Math.sqrt(2) - 1) / 3 / (v / 2);
        m.prototype.toLinePath = function (a, c) {
            var d = [];
            a.forEach(function (a) {
                d.push("L", a.x, a.y)
            });
            a.length && (d[0] = "M", c && d.push("Z"));
            return d
        };
        m.prototype.toLineSegments = function (a) {
            var c = [], d = !0;
            a.forEach(function (a) {
                c.push(d ? "M" : "L", a.x, a.y);
                d = !d
            });
            return c
        };
        m.prototype.face3d =
            function (a) {
                var c = this, d = this.createElement("path");
                d.vertexes = [];
                d.insidePlotArea = !1;
                d.enabled = !0;
                d.attr = function (a) {
                    if ("object" === typeof a && (t(a.enabled) || t(a.vertexes) || t(a.insidePlotArea))) {
                        this.enabled = q(a.enabled, this.enabled);
                        this.vertexes = q(a.vertexes, this.vertexes);
                        this.insidePlotArea = q(a.insidePlotArea, this.insidePlotArea);
                        delete a.enabled;
                        delete a.vertexes;
                        delete a.insidePlotArea;
                        var d = f(this.vertexes, y[c.chartIndex], this.insidePlotArea), l = c.toLinePath(d, !0),
                            d = b.shapeArea(d), d = this.enabled &&
                            0 < d ? "visible" : "hidden";
                        a.d = l;
                        a.visibility = d
                    }
                    return k.prototype.attr.apply(this, arguments)
                };
                d.animate = function (a) {
                    if ("object" === typeof a && (t(a.enabled) || t(a.vertexes) || t(a.insidePlotArea))) {
                        this.enabled = q(a.enabled, this.enabled);
                        this.vertexes = q(a.vertexes, this.vertexes);
                        this.insidePlotArea = q(a.insidePlotArea, this.insidePlotArea);
                        delete a.enabled;
                        delete a.vertexes;
                        delete a.insidePlotArea;
                        var d = f(this.vertexes, y[c.chartIndex], this.insidePlotArea), l = c.toLinePath(d, !0),
                            d = b.shapeArea(d), d = this.enabled &&
                            0 < d ? "visible" : "hidden";
                        a.d = l;
                        this.attr("visibility", d)
                    }
                    return k.prototype.animate.apply(this, arguments)
                };
                return d.attr(a)
            };
        m.prototype.polyhedron = function (a) {
            var c = this, d = this.g(), l = d.destroy;
            this.styledMode || d.attr({"stroke-linejoin": "round"});
            d.faces = [];
            d.destroy = function () {
                for (var a = 0; a < d.faces.length; a++) d.faces[a].destroy();
                return l.call(this)
            };
            d.attr = function (a, l, e, b) {
                if ("object" === typeof a && t(a.faces)) {
                    for (; d.faces.length > a.faces.length;) d.faces.pop().destroy();
                    for (; d.faces.length < a.faces.length;) d.faces.push(c.face3d().add(d));
                    for (var f = 0; f < a.faces.length; f++) c.styledMode && delete a.faces[f].fill, d.faces[f].attr(a.faces[f], null, e, b);
                    delete a.faces
                }
                return k.prototype.attr.apply(this, arguments)
            };
            d.animate = function (a, l, e) {
                if (a && a.faces) {
                    for (; d.faces.length > a.faces.length;) d.faces.pop().destroy();
                    for (; d.faces.length < a.faces.length;) d.faces.push(c.face3d().add(d));
                    for (var b = 0; b < a.faces.length; b++) d.faces[b].animate(a.faces[b], l, e);
                    delete a.faces
                }
                return k.prototype.animate.apply(this, arguments)
            };
            return d.attr(a)
        };
        c = {
            initArgs: function (a) {
                var c =
                    this, d = c.renderer, l = d[c.pathType + "Path"](a), b = l.zIndexes;
                c.parts.forEach(function (a) {
                    c[a] = d.path(l[a]).attr({"class": "highcharts-3d-" + a, zIndex: b[a] || 0}).add(c)
                });
                c.attr({"stroke-linejoin": "round", zIndex: b.group});
                c.originalDestroy = c.destroy;
                c.destroy = c.destroyParts
            }, singleSetterForParts: function (a, c, d, e, f, B) {
                var l = {};
                e = [null, null, e || "attr", f, B];
                var k = d && d.zIndexes;
                d ? (b.objectEach(d, function (c, e) {
                    l[e] = {};
                    l[e][a] = c;
                    k && (l[e].zIndex = d.zIndexes[e] || 0)
                }), e[1] = l) : (l[a] = c, e[0] = l);
                return this.processParts.apply(this,
                    e)
            }, processParts: function (a, c, d, e, f) {
                var l = this;
                l.parts.forEach(function (k) {
                    c && (a = b.pick(c[k], !1));
                    if (!1 !== a) l[k][d](a, e, f)
                });
                return l
            }, destroyParts: function () {
                this.processParts(null, null, "destroy");
                return this.originalDestroy()
            }
        };
        w = b.merge(c, {
            parts: ["front", "top", "side"], pathType: "cuboid", attr: function (a, c, d, e) {
                if ("string" === typeof a && "undefined" !== typeof c) {
                    var l = a;
                    a = {};
                    a[l] = c
                }
                return a.shapeArgs || t(a.x) ? this.singleSetterForParts("d", null, this.renderer[this.pathType + "Path"](a.shapeArgs || a)) : k.prototype.attr.call(this,
                    a, void 0, d, e)
            }, animate: function (a, c, d) {
                t(a.x) && t(a.y) ? (a = this.renderer[this.pathType + "Path"](a), this.singleSetterForParts("d", null, a, "animate", c, d), this.attr({zIndex: a.zIndexes.group})) : k.prototype.animate.call(this, a, c, d);
                return this
            }, fillSetter: function (a) {
                this.singleSetterForParts("fill", null, {
                    front: a,
                    top: g(a).brighten(.1).get(),
                    side: g(a).brighten(-.1).get()
                });
                this.color = this.fill = a;
                return this
            }
        });
        m.prototype.elements3d = {base: c, cuboid: w};
        m.prototype.element3d = function (a, c) {
            var d = this.g();
            b.extend(d,
                this.elements3d[a]);
            d.initArgs(c);
            return d
        };
        m.prototype.cuboid = function (a) {
            return this.element3d("cuboid", a)
        };
        b.SVGRenderer.prototype.cuboidPath = function (a) {
            function c(a) {
                return r[a]
            }

            var d = a.x, e = a.y, l = a.z, k = a.height, m = a.width, h = a.depth, q = y[this.chartIndex], p, w,
                g = q.options.chart.options3d.alpha, n = 0,
                r = [{x: d, y: e, z: l}, {x: d + m, y: e, z: l}, {x: d + m, y: e + k, z: l}, {
                    x: d,
                    y: e + k,
                    z: l
                }, {x: d, y: e + k, z: l + h}, {x: d + m, y: e + k, z: l + h}, {x: d + m, y: e, z: l + h}, {
                    x: d,
                    y: e,
                    z: l + h
                }], r = f(r, q, a.insidePlotArea);
            w = function (a, d) {
                var e = [[], -1];
                a = a.map(c);
                d = d.map(c);
                0 > b.shapeArea(a) ? e = [a, 0] : 0 > b.shapeArea(d) && (e = [d, 1]);
                return e
            };
            p = w([3, 2, 1, 0], [7, 6, 5, 4]);
            a = p[0];
            m = p[1];
            p = w([1, 6, 7, 0], [4, 5, 2, 3]);
            k = p[0];
            h = p[1];
            p = w([1, 2, 5, 6], [0, 7, 4, 3]);
            w = p[0];
            p = p[1];
            1 === p ? n += 1E4 * (1E3 - d) : p || (n += 1E4 * d);
            n += 10 * (!h || 0 <= g && 180 >= g || 360 > g && 357.5 < g ? q.plotHeight - e : 10 + e);
            1 === m ? n += 100 * l : m || (n += 100 * (1E3 - l));
            return {
                front: this.toLinePath(a, !0),
                top: this.toLinePath(k, !0),
                side: this.toLinePath(w, !0),
                zIndexes: {group: Math.round(n)},
                isFront: m,
                isTop: h
            }
        };
        b.SVGRenderer.prototype.arc3d = function (c) {
            function e(d) {
                var c =
                    !1, e = {}, l;
                d = a(d);
                for (l in d) -1 !== f.indexOf(l) && (e[l] = d[l], delete d[l], c = !0);
                return c ? e : !1
            }

            var d = this.g(), l = d.renderer, f = "x y r innerR start end".split(" ");
            c = a(c);
            c.alpha = (c.alpha || 0) * p;
            c.beta = (c.beta || 0) * p;
            d.top = l.path();
            d.side1 = l.path();
            d.side2 = l.path();
            d.inn = l.path();
            d.out = l.path();
            d.onAdd = function () {
                var a = d.parentGroup, c = d.attr("class");
                d.top.add(d);
                ["out", "inn", "side1", "side2"].forEach(function (e) {
                    d[e].attr({"class": c + " highcharts-3d-side"}).add(a)
                })
            };
            ["addClass", "removeClass"].forEach(function (a) {
                d[a] =
                    function () {
                        var c = arguments;
                        ["top", "out", "inn", "side1", "side2"].forEach(function (e) {
                            d[e][a].apply(d[e], c)
                        })
                    }
            });
            d.setPaths = function (a) {
                var c = d.renderer.arc3dPath(a), e = 100 * c.zTop;
                d.attribs = a;
                d.top.attr({d: c.top, zIndex: c.zTop});
                d.inn.attr({d: c.inn, zIndex: c.zInn});
                d.out.attr({d: c.out, zIndex: c.zOut});
                d.side1.attr({d: c.side1, zIndex: c.zSide1});
                d.side2.attr({d: c.side2, zIndex: c.zSide2});
                d.zIndex = e;
                d.attr({zIndex: e});
                a.center && (d.top.setRadialReference(a.center), delete a.center)
            };
            d.setPaths(c);
            d.fillSetter =
                function (a) {
                    var c = g(a).brighten(-.1).get();
                    this.fill = a;
                    this.side1.attr({fill: c});
                    this.side2.attr({fill: c});
                    this.inn.attr({fill: c});
                    this.out.attr({fill: c});
                    this.top.attr({fill: a});
                    return this
                };
            ["opacity", "translateX", "translateY", "visibility"].forEach(function (a) {
                d[a + "Setter"] = function (a, c) {
                    d[c] = a;
                    ["out", "inn", "side1", "side2", "top"].forEach(function (e) {
                        d[e].attr(c, a)
                    })
                }
            });
            d.attr = function (a) {
                var c;
                "object" === typeof a && (c = e(a)) && (h(d.attribs, c), d.setPaths(d.attribs));
                return k.prototype.attr.apply(d,
                    arguments)
            };
            d.animate = function (c, l, f) {
                var m, h = this.attribs, p, w = "data-" + Math.random().toString(26).substring(2, 9);
                delete c.center;
                delete c.z;
                delete c.depth;
                delete c.alpha;
                delete c.beta;
                p = n(q(l, this.renderer.globalAnimation));
                p.duration && (m = e(c), d[w] = 0, c[w] = 1, d[w + "Setter"] = b.noop, m && (p.step = function (c, d) {
                    function e(a) {
                        return h[a] + (q(m[a], h[a]) - h[a]) * d.pos
                    }

                    d.prop === w && d.elem.setPaths(a(h, {
                        x: e("x"),
                        y: e("y"),
                        r: e("r"),
                        innerR: e("innerR"),
                        start: e("start"),
                        end: e("end")
                    }))
                }), l = p);
                return k.prototype.animate.call(this,
                    c, l, f)
            };
            d.destroy = function () {
                this.top.destroy();
                this.out.destroy();
                this.inn.destroy();
                this.side1.destroy();
                this.side2.destroy();
                k.prototype.destroy.call(this)
            };
            d.hide = function () {
                this.top.hide();
                this.out.hide();
                this.inn.hide();
                this.side1.hide();
                this.side2.hide()
            };
            d.show = function (a) {
                this.top.show(a);
                this.out.show(a);
                this.inn.show(a);
                this.side1.show(a);
                this.side2.show(a)
            };
            return d
        };
        m.prototype.arc3dPath = function (a) {
            function c(a) {
                a %= 2 * Math.PI;
                a > Math.PI && (a = 2 * Math.PI - a);
                return a
            }

            var d = a.x, e = a.y, l = a.start,
                b = a.end - .00001, f = a.r, m = a.innerR || 0, k = a.depth || 0, h = a.alpha, p = a.beta,
                q = Math.cos(l), w = Math.sin(l);
            a = Math.cos(b);
            var g = Math.sin(b), n = f * Math.cos(p), f = f * Math.cos(h), t = m * Math.cos(p), y = m * Math.cos(h),
                m = k * Math.sin(p), u = k * Math.sin(h), k = ["M", d + n * q, e + f * w],
                k = k.concat(z(d, e, n, f, l, b, 0, 0)), k = k.concat(["L", d + t * a, e + y * g]),
                k = k.concat(z(d, e, t, y, b, l, 0, 0)), k = k.concat(["Z"]), A = 0 < p ? Math.PI / 2 : 0,
                p = 0 < h ? 0 : Math.PI / 2, A = l > -A ? l : b > -A ? -A : l,
                C = b < v - p ? b : l < v - p ? v - p : b, D = 2 * v - p, h = ["M", d + n * x(A), e + f * r(A)],
                h = h.concat(z(d, e, n, f, A, C, 0, 0));
            b > D && l <
            D ? (h = h.concat(["L", d + n * x(C) + m, e + f * r(C) + u]), h = h.concat(z(d, e, n, f, C, D, m, u)), h = h.concat(["L", d + n * x(D), e + f * r(D)]), h = h.concat(z(d, e, n, f, D, b, 0, 0)), h = h.concat(["L", d + n * x(b) + m, e + f * r(b) + u]), h = h.concat(z(d, e, n, f, b, D, m, u)), h = h.concat(["L", d + n * x(D), e + f * r(D)]), h = h.concat(z(d, e, n, f, D, C, 0, 0))) : b > v - p && l < v - p && (h = h.concat(["L", d + n * Math.cos(C) + m, e + f * Math.sin(C) + u]), h = h.concat(z(d, e, n, f, C, b, m, u)), h = h.concat(["L", d + n * Math.cos(b), e + f * Math.sin(b)]), h = h.concat(z(d, e, n, f, b, C, 0, 0)));
            h = h.concat(["L", d + n * Math.cos(C) + m, e + f * Math.sin(C) +
            u]);
            h = h.concat(z(d, e, n, f, C, A, m, u));
            h = h.concat(["Z"]);
            p = ["M", d + t * q, e + y * w];
            p = p.concat(z(d, e, t, y, l, b, 0, 0));
            p = p.concat(["L", d + t * Math.cos(b) + m, e + y * Math.sin(b) + u]);
            p = p.concat(z(d, e, t, y, b, l, m, u));
            p = p.concat(["Z"]);
            q = ["M", d + n * q, e + f * w, "L", d + n * q + m, e + f * w + u, "L", d + t * q + m, e + y * w + u, "L", d + t * q, e + y * w, "Z"];
            d = ["M", d + n * a, e + f * g, "L", d + n * a + m, e + f * g + u, "L", d + t * a + m, e + y * g + u, "L", d + t * a, e + y * g, "Z"];
            g = Math.atan2(u, -m);
            e = Math.abs(b + g);
            a = Math.abs(l + g);
            l = Math.abs((l + b) / 2 + g);
            e = c(e);
            a = c(a);
            l = c(l);
            l *= 1E5;
            b = 1E5 * a;
            e *= 1E5;
            return {
                top: k,
                zTop: 1E5 *
                    Math.PI + 1,
                out: h,
                zOut: Math.max(l, b, e),
                inn: p,
                zInn: Math.max(l, b, e),
                side1: q,
                zSide1: .99 * e,
                side2: d,
                zSide2: .99 * b
            }
        }
    });
    A(u, "parts-3d/Chart.js", [u["parts/Globals.js"]], function (b) {
        function u(b, h) {
            var a = b.plotLeft, f = b.plotWidth + a, p = b.plotTop, k = b.plotHeight + p, m = a + b.plotWidth / 2,
                e = p + b.plotHeight / 2, c = Number.MAX_VALUE, w = -Number.MAX_VALUE, l = Number.MAX_VALUE,
                E = -Number.MAX_VALUE, d, g = 1;
            d = [{x: a, y: p, z: 0}, {x: a, y: p, z: h}];
            [0, 1].forEach(function (a) {
                d.push({x: f, y: d[a].y, z: d[a].z})
            });
            [0, 1, 2, 3].forEach(function (a) {
                d.push({
                    x: d[a].x,
                    y: k, z: d[a].z
                })
            });
            d = n(d, b, !1);
            d.forEach(function (a) {
                c = Math.min(c, a.x);
                w = Math.max(w, a.x);
                l = Math.min(l, a.y);
                E = Math.max(E, a.y)
            });
            a > c && (g = Math.min(g, 1 - Math.abs((a + m) / (c + m)) % 1));
            f < w && (g = Math.min(g, (f - m) / (w - m)));
            p > l && (g = 0 > l ? Math.min(g, (p + e) / (-l + p + e)) : Math.min(g, 1 - (p + e) / (l + e) % 1));
            k < E && (g = Math.min(g, Math.abs((k - e) / (E - e))));
            return g
        }

        var x = b.addEvent, v = b.Chart, r = b.merge, n = b.perspective, y = b.pick, g = b.wrap;
        v.prototype.is3d = function () {
            return this.options.chart.options3d && this.options.chart.options3d.enabled
        };
        v.prototype.propsRequireDirtyBox.push("chart.options3d");
        v.prototype.propsRequireUpdateSeries.push("chart.options3d");
        x(v, "afterInit", function () {
            var b = this.options;
            this.is3d() && (b.series || []).forEach(function (h) {
                "scatter" === (h.type || b.chart.type || b.chart.defaultSeriesType) && (h.type = "scatter3d")
            })
        });
        x(v, "addSeries", function (b) {
            this.is3d() && "scatter" === b.options.type && (b.options.type = "scatter3d")
        });
        b.wrap(b.Chart.prototype, "isInsidePlot", function (b) {
            return this.is3d() || b.apply(this, [].slice.call(arguments, 1))
        });
        var t = b.getOptions();
        r(!0, t, {
            chart: {
                options3d: {
                    enabled: !1,
                    alpha: 0,
                    beta: 0,
                    depth: 100,
                    fitToPlot: !0,
                    viewDistance: 25,
                    axisLabelPosition: null,
                    frame: {visible: "default", size: 1, bottom: {}, top: {}, left: {}, right: {}, back: {}, front: {}}
                }
            }
        });
        x(v, "afterGetContainer", function () {
            this.styledMode && (this.renderer.definition({
                tagName: "style",
                textContent: ".highcharts-3d-top{filter: url(#highcharts-brighter)}\n.highcharts-3d-side{filter: url(#highcharts-darker)}\n"
            }), [{name: "darker", slope: .6}, {name: "brighter", slope: 1.4}].forEach(function (b) {
                this.renderer.definition({
                    tagName: "filter",
                    id: "highcharts-" + b.name,
                    children: [{
                        tagName: "feComponentTransfer",
                        children: [{tagName: "feFuncR", type: "linear", slope: b.slope}, {
                            tagName: "feFuncG",
                            type: "linear",
                            slope: b.slope
                        }, {tagName: "feFuncB", type: "linear", slope: b.slope}]
                    }]
                })
            }, this))
        });
        g(v.prototype, "setClassName", function (b) {
            b.apply(this, [].slice.call(arguments, 1));
            this.is3d() && (this.container.className += " highcharts-3d-chart")
        });
        x(b.Chart, "afterSetChartSize", function () {
            var b = this.options.chart.options3d;
            if (this.is3d()) {
                var h = this.inverted, a = this.clipBox,
                    f = this.margin;
                a[h ? "y" : "x"] = -(f[3] || 0);
                a[h ? "x" : "y"] = -(f[0] || 0);
                a[h ? "height" : "width"] = this.chartWidth + (f[3] || 0) + (f[1] || 0);
                a[h ? "width" : "height"] = this.chartHeight + (f[0] || 0) + (f[2] || 0);
                this.scale3d = 1;
                !0 === b.fitToPlot && (this.scale3d = u(this, b.depth));
                this.frame3d = this.get3dFrame()
            }
        });
        x(v, "beforeRedraw", function () {
            this.is3d() && (this.isDirtyBox = !0)
        });
        x(v, "beforeRender", function () {
            this.is3d() && (this.frame3d = this.get3dFrame())
        });
        g(v.prototype, "renderSeries", function (b) {
            var h = this.series.length;
            if (this.is3d()) for (; h--;) b =
                this.series[h], b.translate(), b.render(); else b.call(this)
        });
        x(v, "afterDrawChartBox", function () {
            if (this.is3d()) {
                var p = this.renderer, h = this.options.chart.options3d, a = this.get3dFrame(), f = this.plotLeft,
                    q = this.plotLeft + this.plotWidth, k = this.plotTop, m = this.plotTop + this.plotHeight,
                    h = h.depth, e = f - (a.left.visible ? a.left.size : 0),
                    c = q + (a.right.visible ? a.right.size : 0), w = k - (a.top.visible ? a.top.size : 0),
                    l = m + (a.bottom.visible ? a.bottom.size : 0), g = 0 - (a.front.visible ? a.front.size : 0),
                    d = h + (a.back.visible ? a.back.size : 0),
                    n = this.hasRendered ? "animate" : "attr";
                this.frame3d = a;
                this.frameShapes || (this.frameShapes = {
                    bottom: p.polyhedron().add(),
                    top: p.polyhedron().add(),
                    left: p.polyhedron().add(),
                    right: p.polyhedron().add(),
                    back: p.polyhedron().add(),
                    front: p.polyhedron().add()
                });
                this.frameShapes.bottom[n]({
                    "class": "highcharts-3d-frame highcharts-3d-frame-bottom",
                    zIndex: a.bottom.frontFacing ? -1E3 : 1E3,
                    faces: [{
                        fill: b.color(a.bottom.color).brighten(.1).get(),
                        vertexes: [{x: e, y: l, z: g}, {x: c, y: l, z: g}, {x: c, y: l, z: d}, {x: e, y: l, z: d}],
                        enabled: a.bottom.visible
                    },
                        {
                            fill: b.color(a.bottom.color).brighten(.1).get(),
                            vertexes: [{x: f, y: m, z: h}, {x: q, y: m, z: h}, {x: q, y: m, z: 0}, {x: f, y: m, z: 0}],
                            enabled: a.bottom.visible
                        }, {
                            fill: b.color(a.bottom.color).brighten(-.1).get(),
                            vertexes: [{x: e, y: l, z: g}, {x: e, y: l, z: d}, {x: f, y: m, z: h}, {x: f, y: m, z: 0}],
                            enabled: a.bottom.visible && !a.left.visible
                        }, {
                            fill: b.color(a.bottom.color).brighten(-.1).get(),
                            vertexes: [{x: c, y: l, z: d}, {x: c, y: l, z: g}, {x: q, y: m, z: 0}, {x: q, y: m, z: h}],
                            enabled: a.bottom.visible && !a.right.visible
                        }, {
                            fill: b.color(a.bottom.color).get(),
                            vertexes: [{
                                x: c,
                                y: l, z: g
                            }, {x: e, y: l, z: g}, {x: f, y: m, z: 0}, {x: q, y: m, z: 0}],
                            enabled: a.bottom.visible && !a.front.visible
                        }, {
                            fill: b.color(a.bottom.color).get(),
                            vertexes: [{x: e, y: l, z: d}, {x: c, y: l, z: d}, {x: q, y: m, z: h}, {x: f, y: m, z: h}],
                            enabled: a.bottom.visible && !a.back.visible
                        }]
                });
                this.frameShapes.top[n]({
                    "class": "highcharts-3d-frame highcharts-3d-frame-top",
                    zIndex: a.top.frontFacing ? -1E3 : 1E3,
                    faces: [{
                        fill: b.color(a.top.color).brighten(.1).get(),
                        vertexes: [{x: e, y: w, z: d}, {x: c, y: w, z: d}, {x: c, y: w, z: g}, {x: e, y: w, z: g}],
                        enabled: a.top.visible
                    },
                        {
                            fill: b.color(a.top.color).brighten(.1).get(),
                            vertexes: [{x: f, y: k, z: 0}, {x: q, y: k, z: 0}, {x: q, y: k, z: h}, {x: f, y: k, z: h}],
                            enabled: a.top.visible
                        }, {
                            fill: b.color(a.top.color).brighten(-.1).get(),
                            vertexes: [{x: e, y: w, z: d}, {x: e, y: w, z: g}, {x: f, y: k, z: 0}, {x: f, y: k, z: h}],
                            enabled: a.top.visible && !a.left.visible
                        }, {
                            fill: b.color(a.top.color).brighten(-.1).get(),
                            vertexes: [{x: c, y: w, z: g}, {x: c, y: w, z: d}, {x: q, y: k, z: h}, {x: q, y: k, z: 0}],
                            enabled: a.top.visible && !a.right.visible
                        }, {
                            fill: b.color(a.top.color).get(),
                            vertexes: [{x: e, y: w, z: g},
                                {x: c, y: w, z: g}, {x: q, y: k, z: 0}, {x: f, y: k, z: 0}],
                            enabled: a.top.visible && !a.front.visible
                        }, {
                            fill: b.color(a.top.color).get(),
                            vertexes: [{x: c, y: w, z: d}, {x: e, y: w, z: d}, {x: f, y: k, z: h}, {x: q, y: k, z: h}],
                            enabled: a.top.visible && !a.back.visible
                        }]
                });
                this.frameShapes.left[n]({
                    "class": "highcharts-3d-frame highcharts-3d-frame-left",
                    zIndex: a.left.frontFacing ? -1E3 : 1E3,
                    faces: [{
                        fill: b.color(a.left.color).brighten(.1).get(),
                        vertexes: [{x: e, y: l, z: g}, {x: f, y: m, z: 0}, {x: f, y: m, z: h}, {x: e, y: l, z: d}],
                        enabled: a.left.visible && !a.bottom.visible
                    },
                        {
                            fill: b.color(a.left.color).brighten(.1).get(),
                            vertexes: [{x: e, y: w, z: d}, {x: f, y: k, z: h}, {x: f, y: k, z: 0}, {x: e, y: w, z: g}],
                            enabled: a.left.visible && !a.top.visible
                        }, {
                            fill: b.color(a.left.color).brighten(-.1).get(),
                            vertexes: [{x: e, y: l, z: d}, {x: e, y: w, z: d}, {x: e, y: w, z: g}, {x: e, y: l, z: g}],
                            enabled: a.left.visible
                        }, {
                            fill: b.color(a.left.color).brighten(-.1).get(),
                            vertexes: [{x: f, y: k, z: h}, {x: f, y: m, z: h}, {x: f, y: m, z: 0}, {x: f, y: k, z: 0}],
                            enabled: a.left.visible
                        }, {
                            fill: b.color(a.left.color).get(), vertexes: [{x: e, y: l, z: g}, {x: e, y: w, z: g},
                                {x: f, y: k, z: 0}, {x: f, y: m, z: 0}], enabled: a.left.visible && !a.front.visible
                        }, {
                            fill: b.color(a.left.color).get(),
                            vertexes: [{x: e, y: w, z: d}, {x: e, y: l, z: d}, {x: f, y: m, z: h}, {x: f, y: k, z: h}],
                            enabled: a.left.visible && !a.back.visible
                        }]
                });
                this.frameShapes.right[n]({
                    "class": "highcharts-3d-frame highcharts-3d-frame-right",
                    zIndex: a.right.frontFacing ? -1E3 : 1E3,
                    faces: [{
                        fill: b.color(a.right.color).brighten(.1).get(),
                        vertexes: [{x: c, y: l, z: d}, {x: q, y: m, z: h}, {x: q, y: m, z: 0}, {x: c, y: l, z: g}],
                        enabled: a.right.visible && !a.bottom.visible
                    },
                        {
                            fill: b.color(a.right.color).brighten(.1).get(),
                            vertexes: [{x: c, y: w, z: g}, {x: q, y: k, z: 0}, {x: q, y: k, z: h}, {x: c, y: w, z: d}],
                            enabled: a.right.visible && !a.top.visible
                        }, {
                            fill: b.color(a.right.color).brighten(-.1).get(),
                            vertexes: [{x: q, y: k, z: 0}, {x: q, y: m, z: 0}, {x: q, y: m, z: h}, {x: q, y: k, z: h}],
                            enabled: a.right.visible
                        }, {
                            fill: b.color(a.right.color).brighten(-.1).get(),
                            vertexes: [{x: c, y: l, z: g}, {x: c, y: w, z: g}, {x: c, y: w, z: d}, {x: c, y: l, z: d}],
                            enabled: a.right.visible
                        }, {
                            fill: b.color(a.right.color).get(), vertexes: [{x: c, y: w, z: g}, {
                                x: c,
                                y: l, z: g
                            }, {x: q, y: m, z: 0}, {x: q, y: k, z: 0}], enabled: a.right.visible && !a.front.visible
                        }, {
                            fill: b.color(a.right.color).get(),
                            vertexes: [{x: c, y: l, z: d}, {x: c, y: w, z: d}, {x: q, y: k, z: h}, {x: q, y: m, z: h}],
                            enabled: a.right.visible && !a.back.visible
                        }]
                });
                this.frameShapes.back[n]({
                    "class": "highcharts-3d-frame highcharts-3d-frame-back",
                    zIndex: a.back.frontFacing ? -1E3 : 1E3,
                    faces: [{
                        fill: b.color(a.back.color).brighten(.1).get(),
                        vertexes: [{x: c, y: l, z: d}, {x: e, y: l, z: d}, {x: f, y: m, z: h}, {x: q, y: m, z: h}],
                        enabled: a.back.visible && !a.bottom.visible
                    },
                        {
                            fill: b.color(a.back.color).brighten(.1).get(),
                            vertexes: [{x: e, y: w, z: d}, {x: c, y: w, z: d}, {x: q, y: k, z: h}, {x: f, y: k, z: h}],
                            enabled: a.back.visible && !a.top.visible
                        }, {
                            fill: b.color(a.back.color).brighten(-.1).get(),
                            vertexes: [{x: e, y: l, z: d}, {x: e, y: w, z: d}, {x: f, y: k, z: h}, {x: f, y: m, z: h}],
                            enabled: a.back.visible && !a.left.visible
                        }, {
                            fill: b.color(a.back.color).brighten(-.1).get(),
                            vertexes: [{x: c, y: w, z: d}, {x: c, y: l, z: d}, {x: q, y: m, z: h}, {x: q, y: k, z: h}],
                            enabled: a.back.visible && !a.right.visible
                        }, {
                            fill: b.color(a.back.color).get(),
                            vertexes: [{x: f, y: k, z: h}, {x: q, y: k, z: h}, {x: q, y: m, z: h}, {x: f, y: m, z: h}],
                            enabled: a.back.visible
                        }, {
                            fill: b.color(a.back.color).get(),
                            vertexes: [{x: e, y: l, z: d}, {x: c, y: l, z: d}, {x: c, y: w, z: d}, {x: e, y: w, z: d}],
                            enabled: a.back.visible
                        }]
                });
                this.frameShapes.front[n]({
                    "class": "highcharts-3d-frame highcharts-3d-frame-front",
                    zIndex: a.front.frontFacing ? -1E3 : 1E3,
                    faces: [{
                        fill: b.color(a.front.color).brighten(.1).get(),
                        vertexes: [{x: e, y: l, z: g}, {x: c, y: l, z: g}, {x: q, y: m, z: 0}, {x: f, y: m, z: 0}],
                        enabled: a.front.visible && !a.bottom.visible
                    },
                        {
                            fill: b.color(a.front.color).brighten(.1).get(),
                            vertexes: [{x: c, y: w, z: g}, {x: e, y: w, z: g}, {x: f, y: k, z: 0}, {x: q, y: k, z: 0}],
                            enabled: a.front.visible && !a.top.visible
                        }, {
                            fill: b.color(a.front.color).brighten(-.1).get(),
                            vertexes: [{x: e, y: w, z: g}, {x: e, y: l, z: g}, {x: f, y: m, z: 0}, {x: f, y: k, z: 0}],
                            enabled: a.front.visible && !a.left.visible
                        }, {
                            fill: b.color(a.front.color).brighten(-.1).get(),
                            vertexes: [{x: c, y: l, z: g}, {x: c, y: w, z: g}, {x: q, y: k, z: 0}, {x: q, y: m, z: 0}],
                            enabled: a.front.visible && !a.right.visible
                        }, {
                            fill: b.color(a.front.color).get(),
                            vertexes: [{x: q, y: k, z: 0}, {x: f, y: k, z: 0}, {x: f, y: m, z: 0}, {x: q, y: m, z: 0}],
                            enabled: a.front.visible
                        }, {
                            fill: b.color(a.front.color).get(),
                            vertexes: [{x: c, y: l, z: g}, {x: e, y: l, z: g}, {x: e, y: w, z: g}, {x: c, y: w, z: g}],
                            enabled: a.front.visible
                        }]
                })
            }
        });
        v.prototype.retrieveStacks = function (b) {
            var h = this.series, a = {}, f, g = 1;
            this.series.forEach(function (k) {
                f = y(k.options.stack, b ? 0 : h.length - 1 - k.index);
                a[f] ? a[f].series.push(k) : (a[f] = {series: [k], position: g}, g++)
            });
            a.totalStacks = g + 1;
            return a
        };
        v.prototype.get3dFrame = function () {
            var g = this,
                h = g.options.chart.options3d, a = h.frame, f = g.plotLeft, q = g.plotLeft + g.plotWidth, k = g.plotTop,
                m = g.plotTop + g.plotHeight, e = h.depth, c = function (a) {
                    a = b.shapeArea3d(a, g);
                    return .5 < a ? 1 : -.5 > a ? -1 : 0
                }, w = c([{x: f, y: m, z: e}, {x: q, y: m, z: e}, {x: q, y: m, z: 0}, {x: f, y: m, z: 0}]),
                l = c([{x: f, y: k, z: 0}, {x: q, y: k, z: 0}, {x: q, y: k, z: e}, {x: f, y: k, z: e}]),
                r = c([{x: f, y: k, z: 0}, {x: f, y: k, z: e}, {x: f, y: m, z: e}, {x: f, y: m, z: 0}]),
                d = c([{x: q, y: k, z: e}, {x: q, y: k, z: 0}, {x: q, y: m, z: 0}, {x: q, y: m, z: e}]),
                v = c([{x: f, y: m, z: 0}, {x: q, y: m, z: 0}, {x: q, y: k, z: 0}, {x: f, y: k, z: 0}]), c = c([{
                    x: f,
                    y: k, z: e
                }, {x: q, y: k, z: e}, {x: q, y: m, z: e}, {x: f, y: m, z: e}]), t = !1, B = !1, u = !1, z = !1;
            [].concat(g.xAxis, g.yAxis, g.zAxis).forEach(function (a) {
                a && (a.horiz ? a.opposite ? B = !0 : t = !0 : a.opposite ? z = !0 : u = !0)
            });
            var x = function (a, c, d) {
                for (var e = ["size", "color", "visible"], b = {}, l = 0; l < e.length; l++) for (var f = e[l], h = 0; h < a.length; h++) if ("object" === typeof a[h]) {
                    var m = a[h][f];
                    if (void 0 !== m && null !== m) {
                        b[f] = m;
                        break
                    }
                }
                a = d;
                !0 === b.visible || !1 === b.visible ? a = b.visible : "auto" === b.visible && (a = 0 < c);
                return {
                    size: y(b.size, 1), color: y(b.color, "none"),
                    frontFacing: 0 < c, visible: a
                }
            }, a = {
                bottom: x([a.bottom, a.top, a], w, t),
                top: x([a.top, a.bottom, a], l, B),
                left: x([a.left, a.right, a.side, a], r, u),
                right: x([a.right, a.left, a.side, a], d, z),
                back: x([a.back, a.front, a], c, !0),
                front: x([a.front, a.back, a], v, !1)
            };
            "auto" === h.axisLabelPosition ? (d = function (a, c) {
                    return a.visible !== c.visible || a.visible && c.visible && a.frontFacing !== c.frontFacing
                }, h = [], d(a.left, a.front) && h.push({
                    y: (k + m) / 2,
                    x: f,
                    z: 0,
                    xDir: {x: 1, y: 0, z: 0}
                }), d(a.left, a.back) && h.push({y: (k + m) / 2, x: f, z: e, xDir: {x: 0, y: 0, z: -1}}),
                d(a.right, a.front) && h.push({
                    y: (k + m) / 2,
                    x: q,
                    z: 0,
                    xDir: {x: 0, y: 0, z: 1}
                }), d(a.right, a.back) && h.push({
                    y: (k + m) / 2,
                    x: q,
                    z: e,
                    xDir: {x: -1, y: 0, z: 0}
                }), w = [], d(a.bottom, a.front) && w.push({
                    x: (f + q) / 2,
                    y: m,
                    z: 0,
                    xDir: {x: 1, y: 0, z: 0}
                }), d(a.bottom, a.back) && w.push({
                    x: (f + q) / 2,
                    y: m,
                    z: e,
                    xDir: {x: -1, y: 0, z: 0}
                }), l = [], d(a.top, a.front) && l.push({
                    x: (f + q) / 2,
                    y: k,
                    z: 0,
                    xDir: {x: 1, y: 0, z: 0}
                }), d(a.top, a.back) && l.push({
                    x: (f + q) / 2,
                    y: k,
                    z: e,
                    xDir: {x: -1, y: 0, z: 0}
                }), r = [], d(a.bottom, a.left) && r.push({
                    z: (0 + e) / 2,
                    y: m,
                    x: f,
                    xDir: {x: 0, y: 0, z: -1}
                }), d(a.bottom, a.right) &&
                r.push({
                    z: (0 + e) / 2,
                    y: m,
                    x: q,
                    xDir: {x: 0, y: 0, z: 1}
                }), m = [], d(a.top, a.left) && m.push({
                    z: (0 + e) / 2,
                    y: k,
                    x: f,
                    xDir: {x: 0, y: 0, z: -1}
                }), d(a.top, a.right) && m.push({
                    z: (0 + e) / 2,
                    y: k,
                    x: q,
                    xDir: {x: 0, y: 0, z: 1}
                }), f = function (a, c, d) {
                    if (0 === a.length) return null;
                    if (1 === a.length) return a[0];
                    for (var e = 0, b = n(a, g, !1), l = 1; l < b.length; l++) d * b[l][c] > d * b[e][c] ? e = l : d * b[l][c] === d * b[e][c] && b[l].z < b[e].z && (e = l);
                    return a[e]
                }, a.axes = {
                    y: {left: f(h, "x", -1), right: f(h, "x", 1)},
                    x: {top: f(l, "y", -1), bottom: f(w, "y", 1)},
                    z: {top: f(m, "y", -1), bottom: f(r, "y", 1)}
                }) :
                a.axes = {
                    y: {
                        left: {x: f, z: 0, xDir: {x: 1, y: 0, z: 0}},
                        right: {x: q, z: 0, xDir: {x: 0, y: 0, z: 1}}
                    },
                    x: {top: {y: k, z: 0, xDir: {x: 1, y: 0, z: 0}}, bottom: {y: m, z: 0, xDir: {x: 1, y: 0, z: 0}}},
                    z: {
                        top: {x: u ? q : f, y: k, xDir: u ? {x: 0, y: 0, z: 1} : {x: 0, y: 0, z: -1}},
                        bottom: {x: u ? q : f, y: m, xDir: u ? {x: 0, y: 0, z: 1} : {x: 0, y: 0, z: -1}}
                    }
                };
            return a
        };
        b.Fx.prototype.matrixSetter = function () {
            var g;
            if (1 > this.pos && (b.isArray(this.start) || b.isArray(this.end))) {
                var h = this.start || [1, 0, 0, 1, 0, 0], a = this.end || [1, 0, 0, 1, 0, 0];
                g = [];
                for (var f = 0; 6 > f; f++) g.push(this.pos * a[f] + (1 - this.pos) *
                    h[f])
            } else g = this.end;
            this.elem.attr(this.prop, g, null, !0)
        }
    });
    A(u, "parts-3d/Axis.js", [u["parts/Globals.js"]], function (b) {
        function u(e, c, b) {
            if (!e.chart.is3d() || "colorAxis" === e.coll) return c;
            var l = e.chart, h = y * l.options.chart.options3d.alpha, d = y * l.options.chart.options3d.beta,
                m = a(b && e.options.title.position3d, e.options.labels.position3d);
            b = a(b && e.options.title.skew3d, e.options.labels.skew3d);
            var g = l.frame3d, k = l.plotLeft, w = l.plotWidth + k, q = l.plotTop, n = l.plotHeight + q, l = !1, r = 0,
                v = 0, t = {x: 0, y: 1, z: 0};
            c = e.swapZ({
                x: c.x,
                y: c.y, z: 0
            });
            if (e.isZAxis) if (e.opposite) {
                if (null === g.axes.z.top) return {};
                v = c.y - q;
                c.x = g.axes.z.top.x;
                c.y = g.axes.z.top.y;
                k = g.axes.z.top.xDir;
                l = !g.top.frontFacing
            } else {
                if (null === g.axes.z.bottom) return {};
                v = c.y - n;
                c.x = g.axes.z.bottom.x;
                c.y = g.axes.z.bottom.y;
                k = g.axes.z.bottom.xDir;
                l = !g.bottom.frontFacing
            } else if (e.horiz) if (e.opposite) {
                if (null === g.axes.x.top) return {};
                v = c.y - q;
                c.y = g.axes.x.top.y;
                c.z = g.axes.x.top.z;
                k = g.axes.x.top.xDir;
                l = !g.top.frontFacing
            } else {
                if (null === g.axes.x.bottom) return {};
                v = c.y - n;
                c.y = g.axes.x.bottom.y;
                c.z = g.axes.x.bottom.z;
                k = g.axes.x.bottom.xDir;
                l = !g.bottom.frontFacing
            } else if (e.opposite) {
                if (null === g.axes.y.right) return {};
                r = c.x - w;
                c.x = g.axes.y.right.x;
                c.z = g.axes.y.right.z;
                k = g.axes.y.right.xDir;
                k = {x: k.z, y: k.y, z: -k.x}
            } else {
                if (null === g.axes.y.left) return {};
                r = c.x - k;
                c.x = g.axes.y.left.x;
                c.z = g.axes.y.left.z;
                k = g.axes.y.left.xDir
            }
            "chart" !== m && ("flap" === m ? e.horiz ? (d = Math.sin(h), h = Math.cos(h), e.opposite && (d = -d), l && (d = -d), t = {
                x: k.z * d,
                y: h,
                z: -k.x * d
            }) : k = {x: Math.cos(d), y: 0, z: Math.sin(d)} : "ortho" === m ? e.horiz ? (t =
                Math.cos(h), m = Math.sin(d) * t, h = -Math.sin(h), d = -t * Math.cos(d), t = {
                x: k.y * d - k.z * h,
                y: k.z * m - k.x * d,
                z: k.x * h - k.y * m
            }, h = 1 / Math.sqrt(t.x * t.x + t.y * t.y + t.z * t.z), l && (h = -h), t = {
                x: h * t.x,
                y: h * t.y,
                z: h * t.z
            }) : k = {x: Math.cos(d), y: 0, z: Math.sin(d)} : e.horiz ? t = {
                x: Math.sin(d) * Math.sin(h),
                y: Math.cos(h),
                z: -Math.cos(d) * Math.sin(h)
            } : k = {x: Math.cos(d), y: 0, z: Math.sin(d)});
            c.x += r * k.x + v * t.x;
            c.y += r * k.y + v * t.y;
            c.z += r * k.z + v * t.z;
            l = p([c], e.chart)[0];
            b && (0 > f(p([c, {x: c.x + k.x, y: c.y + k.y, z: c.z + k.z}, {
                x: c.x + t.x,
                y: c.y + t.y,
                z: c.z + t.z
            }], e.chart)) && (k = {
                x: -k.x,
                y: -k.y, z: -k.z
            }), e = p([{x: c.x, y: c.y, z: c.z}, {x: c.x + k.x, y: c.y + k.y, z: c.z + k.z}, {
                x: c.x + t.x,
                y: c.y + t.y,
                z: c.z + t.z
            }], e.chart), l.matrix = [e[1].x - e[0].x, e[1].y - e[0].y, e[2].x - e[0].x, e[2].y - e[0].y, l.x, l.y], l.matrix[4] -= l.x * l.matrix[0] + l.y * l.matrix[2], l.matrix[5] -= l.x * l.matrix[1] + l.y * l.matrix[3]);
            return l
        }

        var x, v = b.addEvent, r = b.Axis, n = b.Chart, y = b.deg2rad, g = b.extend, t = b.merge, p = b.perspective,
            h = b.perspective3D, a = b.pick, f = b.shapeArea, q = b.splat, k = b.Tick, m = b.wrap;
        t(!0, r.prototype.defaultOptions, {
            labels: {
                position3d: "offset",
                skew3d: !1
            }, title: {position3d: null, skew3d: null}
        });
        v(r, "afterSetOptions", function () {
            var e;
            this.chart.is3d && this.chart.is3d() && "colorAxis" !== this.coll && (e = this.options, e.tickWidth = a(e.tickWidth, 0), e.gridLineWidth = a(e.gridLineWidth, 1))
        });
        m(r.prototype, "getPlotLinePath", function (a) {
            var c = a.apply(this, [].slice.call(arguments, 1));
            if (!this.chart.is3d() || "colorAxis" === this.coll || null === c) return c;
            var e = this.chart, b = e.options.chart.options3d, b = this.isZAxis ? e.plotWidth : b.depth, e = e.frame3d,
                c = [this.swapZ({
                    x: c[1],
                    y: c[2], z: 0
                }), this.swapZ({x: c[1], y: c[2], z: b}), this.swapZ({x: c[4], y: c[5], z: 0}), this.swapZ({
                    x: c[4],
                    y: c[5],
                    z: b
                })], b = [];
            this.horiz ? (this.isZAxis ? (e.left.visible && b.push(c[0], c[2]), e.right.visible && b.push(c[1], c[3])) : (e.front.visible && b.push(c[0], c[2]), e.back.visible && b.push(c[1], c[3])), e.top.visible && b.push(c[0], c[1]), e.bottom.visible && b.push(c[2], c[3])) : (e.front.visible && b.push(c[0], c[2]), e.back.visible && b.push(c[1], c[3]), e.left.visible && b.push(c[0], c[1]), e.right.visible && b.push(c[2], c[3]));
            b = p(b, this.chart,
                !1);
            return this.chart.renderer.toLineSegments(b)
        });
        m(r.prototype, "getLinePath", function (a) {
            return this.chart.is3d() && "colorAxis" !== this.coll ? [] : a.apply(this, [].slice.call(arguments, 1))
        });
        m(r.prototype, "getPlotBandPath", function (a) {
            if (!this.chart.is3d() || "colorAxis" === this.coll) return a.apply(this, [].slice.call(arguments, 1));
            var c = arguments, e = c[2], b = [], c = this.getPlotLinePath(c[1]), e = this.getPlotLinePath(e);
            if (c && e) for (var h = 0; h < c.length; h += 6) b.push("M", c[h + 1], c[h + 2], "L", c[h + 4], c[h + 5], "L", e[h + 4], e[h +
            5], "L", e[h + 1], e[h + 2], "Z");
            return b
        });
        m(k.prototype, "getMarkPath", function (a) {
            var c = a.apply(this, [].slice.call(arguments, 1)),
                c = [u(this.axis, {x: c[1], y: c[2], z: 0}), u(this.axis, {x: c[4], y: c[5], z: 0})];
            return this.axis.chart.renderer.toLineSegments(c)
        });
        v(k, "afterGetLabelPosition", function (a) {
            g(a.pos, u(this.axis, a.pos))
        });
        m(r.prototype, "getTitlePosition", function (a) {
            var c = a.apply(this, [].slice.call(arguments, 1));
            return u(this, c, !0)
        });
        v(r, "drawCrosshair", function (a) {
            this.chart.is3d() && "colorAxis" !== this.coll &&
            a.point && (a.point.crosshairPos = this.isXAxis ? a.point.axisXpos : this.len - a.point.axisYpos)
        });
        v(r, "destroy", function () {
            ["backFrame", "bottomFrame", "sideFrame"].forEach(function (a) {
                this[a] && (this[a] = this[a].destroy())
            }, this)
        });
        r.prototype.swapZ = function (a, c) {
            return this.isZAxis ? (c = c ? 0 : this.chart.plotLeft, {x: c + a.z, y: a.y, z: a.x - c}) : a
        };
        x = b.ZAxis = function () {
            this.init.apply(this, arguments)
        };
        g(x.prototype, r.prototype);
        g(x.prototype, {
            isZAxis: !0, setOptions: function (a) {
                a = t({offset: 0, lineWidth: 0}, a);
                r.prototype.setOptions.call(this,
                    a);
                this.coll = "zAxis"
            }, setAxisSize: function () {
                r.prototype.setAxisSize.call(this);
                this.width = this.len = this.chart.options.chart.options3d.depth;
                this.right = this.chart.chartWidth - this.width - this.left
            }, getSeriesExtremes: function () {
                var b = this, c = b.chart;
                b.hasVisibleSeries = !1;
                b.dataMin = b.dataMax = b.ignoreMinPadding = b.ignoreMaxPadding = null;
                b.buildStacks && b.buildStacks();
                b.series.forEach(function (e) {
                    if (e.visible || !c.options.chart.ignoreHiddenSeries) b.hasVisibleSeries = !0, e = e.zData, e.length && (b.dataMin = Math.min(a(b.dataMin,
                        e[0]), Math.min.apply(null, e)), b.dataMax = Math.max(a(b.dataMax, e[0]), Math.max.apply(null, e)))
                })
            }
        });
        v(n, "afterGetAxes", function () {
            var a = this, c = this.options, c = c.zAxis = q(c.zAxis || {});
            a.is3d() && (this.zAxis = [], c.forEach(function (c, b) {
                c.index = b;
                c.isX = !0;
                (new x(a, c)).setScale()
            }))
        });
        m(r.prototype, "getSlotWidth", function (b, c) {
            if (this.chart.is3d() && c && c.label && this.categories && this.chart.frameShapes) {
                var e = this.chart, f = this.ticks, k = this.gridGroup.element.childNodes[0].getBBox(),
                    d = e.frameShapes.left.getBBox(),
                    g = e.options.chart.options3d, e = {
                        x: e.plotWidth / 2,
                        y: e.plotHeight / 2,
                        z: g.depth / 2,
                        vd: a(g.depth, 1) * a(g.viewDistance, 0)
                    }, m, q, g = c.pos, n = f[g - 1], f = f[g + 1];
                0 !== g && n && n.label.xy && (m = h({x: n.label.xy.x, y: n.label.xy.y, z: null}, e, e.vd));
                f && f.label.xy && (q = h({x: f.label.xy.x, y: f.label.xy.y, z: null}, e, e.vd));
                f = {x: c.label.xy.x, y: c.label.xy.y, z: null};
                f = h(f, e, e.vd);
                return Math.abs(m ? f.x - m.x : q ? q.x - f.x : k.x - d.x)
            }
            return b.apply(this, [].slice.call(arguments, 1))
        })
    });
    A(u, "parts-3d/Series.js", [u["parts/Globals.js"]], function (b) {
        var u =
            b.addEvent, x = b.perspective, v = b.pick;
        u(b.Series, "afterTranslate", function () {
            this.chart.is3d() && this.translate3dPoints()
        });
        b.Series.prototype.translate3dPoints = function () {
            var b = this.chart, n = v(this.zAxis, b.options.zAxis[0]), u = [], g, t, p;
            for (p = 0; p < this.data.length; p++) g = this.data[p], n && n.translate ? (t = n.isLog && n.val2lin ? n.val2lin(g.z) : g.z, g.plotZ = n.translate(t), g.isInside = g.isInside ? t >= n.min && t <= n.max : !1) : g.plotZ = 0, g.axisXpos = g.plotX, g.axisYpos = g.plotY, g.axisZpos = g.plotZ, u.push({
                x: g.plotX,
                y: g.plotY,
                z: g.plotZ
            });
            b = x(u, b, !0);
            for (p = 0; p < this.data.length; p++) g = this.data[p], n = b[p], g.plotX = n.x, g.plotY = n.y, g.plotZ = n.z
        }
    });
    A(u, "parts-3d/Column.js", [u["parts/Globals.js"]], function (b) {
        function u(b) {
            var a = b.apply(this, [].slice.call(arguments, 1));
            this.chart.is3d && this.chart.is3d() && (a.stroke = this.options.edgeColor || a.fill, a["stroke-width"] = n(this.options.edgeWidth, 1));
            return a
        }

        function x(b, a, f) {
            var h = this.chart.is3d && this.chart.is3d();
            h && (this.options.inactiveOtherPoints = !0);
            b.call(this, a, f);
            h && (this.options.inactiveOtherPoints =
                !1)
        }

        var v = b.addEvent, r = b.perspective, n = b.pick, y = b.Series, g = b.seriesTypes, t = b.svg, p = b.wrap;
        p(g.column.prototype, "translate", function (b) {
            b.apply(this, [].slice.call(arguments, 1));
            this.chart.is3d() && this.translate3dShapes()
        });
        p(b.Series.prototype, "alignDataLabel", function (b) {
            arguments[3].outside3dPlot = arguments[1].outside3dPlot;
            b.apply(this, [].slice.call(arguments, 1))
        });
        p(b.Series.prototype, "justifyDataLabel", function (b) {
            return arguments[2].outside3dPlot ? !1 : b.apply(this, [].slice.call(arguments, 1))
        });
        g.column.prototype.translate3dPoints = function () {
        };
        g.column.prototype.translate3dShapes = function () {
            var b = this, a = b.chart, f = b.options, g = f.depth || 25,
                k = (f.stacking ? f.stack || 0 : b.index) * (g + (f.groupZPadding || 1)),
                m = b.borderWidth % 2 ? .5 : 0;
            a.inverted && !b.yAxis.reversed && (m *= -1);
            !1 !== f.grouping && (k = 0);
            k += f.groupZPadding || 1;
            b.data.forEach(function (e) {
                e.outside3dPlot = null;
                if (null !== e.y) {
                    var c = e.shapeArgs, f = e.tooltipPos, h;
                    [["x", "width"], ["y", "height"]].forEach(function (a) {
                        h = c[a[0]] - m;
                        0 > h && (c[a[1]] += c[a[0]] + m, c[a[0]] =
                            -m, h = 0);
                        h + c[a[1]] > b[a[0] + "Axis"].len && 0 !== c[a[1]] && (c[a[1]] = b[a[0] + "Axis"].len - c[a[0]]);
                        if (0 !== c[a[1]] && (c[a[0]] >= b[a[0] + "Axis"].len || c[a[0]] + c[a[1]] <= m)) {
                            for (var d in c) c[d] = 0;
                            e.outside3dPlot = !0
                        }
                    });
                    "rect" === e.shapeType && (e.shapeType = "cuboid");
                    c.z = k;
                    c.depth = g;
                    c.insidePlotArea = !0;
                    f = r([{x: f[0], y: f[1], z: k}], a, !0)[0];
                    e.tooltipPos = [f.x, f.y]
                }
            });
            b.z = k
        };
        p(g.column.prototype, "animate", function (b) {
            if (this.chart.is3d()) {
                var a = arguments[1], f = this.yAxis, g = this, k = this.yAxis.reversed;
                t && (a ? g.data.forEach(function (a) {
                    null !==
                    a.y && (a.height = a.shapeArgs.height, a.shapey = a.shapeArgs.y, a.shapeArgs.height = 1, k || (a.shapeArgs.y = a.stackY ? a.plotY + f.translate(a.stackY) : a.plotY + (a.negative ? -a.height : a.height)))
                }) : (g.data.forEach(function (a) {
                    null !== a.y && (a.shapeArgs.height = a.height, a.shapeArgs.y = a.shapey, a.graphic && a.graphic.animate(a.shapeArgs, g.options.animation))
                }), this.drawDataLabels(), g.animate = null))
            } else b.apply(this, [].slice.call(arguments, 1))
        });
        p(g.column.prototype, "plotGroup", function (b, a, f, g, k, m) {
            this.chart.is3d() && m && !this[a] &&
            (this.chart.columnGroup || (this.chart.columnGroup = this.chart.renderer.g("columnGroup").add(m)), this[a] = this.chart.columnGroup, this.chart.columnGroup.attr(this.getPlotBox()), this[a].survive = !0);
            return b.apply(this, Array.prototype.slice.call(arguments, 1))
        });
        p(g.column.prototype, "setVisible", function (b, a) {
            var f = this, g;
            f.chart.is3d() && f.data.forEach(function (b) {
                g = (b.visible = b.options.visible = a = void 0 === a ? !b.visible : a) ? "visible" : "hidden";
                f.options.data[f.data.indexOf(b)] = b.options;
                b.graphic && b.graphic.attr({visibility: g})
            });
            b.apply(this, Array.prototype.slice.call(arguments, 1))
        });
        g.column.prototype.handle3dGrouping = !0;
        v(y, "afterInit", function () {
            if (this.chart.is3d() && this.handle3dGrouping) {
                var b = this.options, a = b.grouping, f = b.stacking, g = n(this.yAxis.options.reversedStacks, !0),
                    k = 0;
                if (void 0 === a || a) {
                    a = this.chart.retrieveStacks(f);
                    k = b.stack || 0;
                    for (f = 0; f < a[k].series.length && a[k].series[f] !== this; f++) ;
                    k = 10 * (a.totalStacks - a[k].position) + (g ? f : -f);
                    this.xAxis.reversed || (k = 10 * a.totalStacks - k)
                }
                b.zIndex = k
            }
        });
        p(g.column.prototype, "pointAttribs",
            u);
        p(g.column.prototype, "setState", x);
        g.columnrange && (p(g.columnrange.prototype, "pointAttribs", u), p(g.columnrange.prototype, "setState", x), g.columnrange.prototype.plotGroup = g.column.prototype.plotGroup, g.columnrange.prototype.setVisible = g.column.prototype.setVisible);
        p(y.prototype, "alignDataLabel", function (b) {
            if (this.chart.is3d() && this instanceof g.column) {
                var a = arguments, f = a[4], a = a[1], h = {x: f.x, y: f.y, z: this.z}, h = r([h], this.chart, !0)[0];
                f.x = h.x;
                f.y = a.outside3dPlot ? -9E9 : h.y
            }
            b.apply(this, [].slice.call(arguments,
                1))
        });
        p(b.StackItem.prototype, "getStackBox", function (g, a) {
            var f = g.apply(this, [].slice.call(arguments, 1));
            if (a.is3d()) {
                var h = {x: f.x, y: f.y, z: 0}, h = b.perspective([h], a, !0)[0];
                f.x = h.x;
                f.y = h.y
            }
            return f
        })
    });
    A(u, "parts-3d/Pie.js", [u["parts/Globals.js"]], function (b) {
        var u = b.deg2rad, x = b.pick, v = b.seriesTypes, r = b.svg;
        b = b.wrap;
        b(v.pie.prototype, "translate", function (b) {
            b.apply(this, [].slice.call(arguments, 1));
            if (this.chart.is3d()) {
                var n = this, g = n.options, t = g.depth || 0, p = n.chart.options.chart.options3d, h = p.alpha,
                    a = p.beta, f = g.stacking ? (g.stack || 0) * t : n._i * t, f = f + t / 2;
                !1 !== g.grouping && (f = 0);
                n.data.forEach(function (b) {
                    var k = b.shapeArgs;
                    b.shapeType = "arc3d";
                    k.z = f;
                    k.depth = .75 * t;
                    k.alpha = h;
                    k.beta = a;
                    k.center = n.center;
                    k = (k.end + k.start) / 2;
                    b.slicedTranslation = {
                        translateX: Math.round(Math.cos(k) * g.slicedOffset * Math.cos(h * u)),
                        translateY: Math.round(Math.sin(k) * g.slicedOffset * Math.cos(h * u))
                    }
                })
            }
        });
        b(v.pie.prototype.pointClass.prototype, "haloPath", function (b) {
            var n = arguments;
            return this.series.chart.is3d() ? [] : b.call(this, n[1])
        });
        b(v.pie.prototype, "pointAttribs", function (b, r, g) {
            b = b.call(this, r, g);
            g = this.options;
            this.chart.is3d() && !this.chart.styledMode && (b.stroke = g.edgeColor || r.color || this.color, b["stroke-width"] = x(g.edgeWidth, 1));
            return b
        });
        b(v.pie.prototype, "drawDataLabels", function (b) {
            if (this.chart.is3d()) {
                var n = this.chart.options.chart.options3d;
                this.data.forEach(function (b) {
                    var g = b.shapeArgs, p = g.r, h = (g.start + g.end) / 2;
                    b = b.labelPosition;
                    var a = b.connectorPosition, f = -p * (1 - Math.cos((g.alpha || n.alpha) * u)) * Math.sin(h),
                        q = p * (Math.cos((g.beta ||
                            n.beta) * u) - 1) * Math.cos(h);
                    [b.natural, a.breakAt, a.touchingSliceAt].forEach(function (a) {
                        a.x += q;
                        a.y += f
                    })
                })
            }
            b.apply(this, [].slice.call(arguments, 1))
        });
        b(v.pie.prototype, "addPoint", function (b) {
            b.apply(this, [].slice.call(arguments, 1));
            this.chart.is3d() && this.update(this.userOptions, !0)
        });
        b(v.pie.prototype, "animate", function (b) {
            if (this.chart.is3d()) {
                var n = arguments[1], g = this.options.animation, t = this.center, p = this.group, h = this.markerGroup;
                r && (!0 === g && (g = {}), n ? (p.oldtranslateX = p.translateX, p.oldtranslateY =
                    p.translateY, n = {
                    translateX: t[0],
                    translateY: t[1],
                    scaleX: .001,
                    scaleY: .001
                }, p.attr(n), h && (h.attrSetters = p.attrSetters, h.attr(n))) : (n = {
                    translateX: p.oldtranslateX,
                    translateY: p.oldtranslateY,
                    scaleX: 1,
                    scaleY: 1
                }, p.animate(n, g), h && h.animate(n, g), this.animate = null))
            } else b.apply(this, [].slice.call(arguments, 1))
        })
    });
    A(u, "parts-3d/Scatter.js", [u["parts/Globals.js"]], function (b) {
        var u = b.Point, x = b.seriesType, v = b.seriesTypes;
        x("scatter3d", "scatter", {tooltip: {pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3ez: \x3cb\x3e{point.z}\x3c/b\x3e\x3cbr/\x3e"}},
            {
                pointAttribs: function (r) {
                    var n = v.scatter.prototype.pointAttribs.apply(this, arguments);
                    this.chart.is3d() && r && (n.zIndex = b.pointCameraDistance(r, this.chart));
                    return n
                },
                axisTypes: ["xAxis", "yAxis", "zAxis"],
                pointArrayMap: ["x", "y", "z"],
                parallelArrays: ["x", "y", "z"],
                directTouch: !0
            }, {
                applyOptions: function () {
                    u.prototype.applyOptions.apply(this, arguments);
                    void 0 === this.z && (this.z = 0);
                    return this
                }
            })
    });
    A(u, "parts-3d/VMLRenderer.js", [u["parts/Globals.js"]], function (b) {
        var u = b.addEvent, x = b.Axis, v = b.SVGRenderer, r =
            b.VMLRenderer;
        r && (b.setOptions({animate: !1}), r.prototype.face3d = v.prototype.face3d, r.prototype.polyhedron = v.prototype.polyhedron, r.prototype.elements3d = v.prototype.elements3d, r.prototype.element3d = v.prototype.element3d, r.prototype.cuboid = v.prototype.cuboid, r.prototype.cuboidPath = v.prototype.cuboidPath, r.prototype.toLinePath = v.prototype.toLinePath, r.prototype.toLineSegments = v.prototype.toLineSegments, r.prototype.arc3d = function (b) {
            b = v.prototype.arc3d.call(this, b);
            b.css({zIndex: b.zIndex});
            return b
        },
            b.VMLRenderer.prototype.arc3dPath = b.SVGRenderer.prototype.arc3dPath, u(x, "render", function () {
            this.sideFrame && (this.sideFrame.css({zIndex: 0}), this.sideFrame.front.attr({fill: this.sideFrame.color}));
            this.bottomFrame && (this.bottomFrame.css({zIndex: 1}), this.bottomFrame.front.attr({fill: this.bottomFrame.color}));
            this.backFrame && (this.backFrame.css({zIndex: 0}), this.backFrame.front.attr({fill: this.backFrame.color}))
        }))
    });
    A(u, "masters/highcharts-3d.src.js", [], function () {
    })
});
//# sourceMappingURL=highcharts-3d.js.map
