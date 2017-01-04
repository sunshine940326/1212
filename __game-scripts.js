var Splash = pc.createScript("Splash");
Splash.attributes.add("posX", {type: "curve"}), Splash.attributes.add("posY", {type: "curve"}), Splash.attributes.add("posZ", {type: "curve"}), Splash.attributes.add("Time", {type: "number"}), Splash.prototype.initialize = function () {
    var t = this.app;
    this.timer = 0, this.camera = t.root.findByName("Camera"), this.scene0 = t.root.findByName("scene0"), this.cloudanim = t.root.findByName("cloudanims");
    for (var i = t.root.findByName("loadinganim"), e = 0; e < i.children.length; e++)i.children[e].script.enabled = !0;
    this.dir = 1, neoneClick("loadOver")
}, Splash.prototype.update = function (t) {
    this.timer > this.Time && (this.camera.script.enabled = !0, this.cloudanim.enabled = !0, this.scene0.destroy()), this.timer < 0 && (this.dir = 1), this.timer += this.dir * t;
    var i = this.timer / this.Time;
    i = pc.math.clamp(i, 0, 1), this.entity.setPosition(this.posX.value(i), this.posY.value(i), this.posZ.value(i))
};
var Anim2 = pc.createScript("anim2");
Anim2.attributes.add("fwddir", {
    type: "boolean",
    "default": !0
}), Anim2.attributes.add("offsetrotY", {type: "number"}), Anim2.attributes.add("minrotY", {type: "number"}), Anim2.attributes.add("aimrotY", {type: "number"}), Anim2.attributes.add("radius1", {type: "curve"}), Anim2.attributes.add("height1", {type: "curve"}), Anim2.prototype.initialize = function () {
    this.r1 = this.radius1.value(0), this.h1 = this.height1.value(0), this.hastrigger = !1, this.lastrotY = 0;
    var t;
    t = this.fwddir ? this.minrotY % 360 + this.offsetrotY : this.aimrot % 360 + this.offsetrotY;
    var i = this.r1 * Math.sin(t * pc.math.DEG_TO_RAD), s = this.r1 * Math.cos(t * pc.math.DEG_TO_RAD);
    this.entity.setPosition(i, this.h1, s), this.entity.setEulerAngles(90, t, 0)
}, Anim2.prototype.update = function (t) {
}, Anim2.prototype.updateAnim = function (t) {
    if (-t <= this.minrotY) {
        if (t = -this.minrotY, this.lastrotY === this.minrotY)return;
        this.lastrotY = this.minrotY
    } else if (-t >= this.aimrotY) {
        if (this.hastrigger)return;
        this.hastrigger = !0, t = -this.aimrotY
    } else this.hastrigger && (this.hastrigger = !1);
    var i = (-t - this.minrotY) / (this.aimrotY - this.minrotY);
    this.r1 = this.radius1.value(i), this.h1 = this.height1.value(i);
    var s;
    s = this.fwddir ? (-t % 360 + this.offsetrotY) * pc.math.DEG_TO_RAD : ((this.aimrotY * (1 - i) + i * this.minrotY) % 360 + this.offsetrotY) * pc.math.DEG_TO_RAD;
    var r = this.r1 * Math.sin(s), h = this.r1 * Math.cos(s);
    this.entity.setPosition(r, this.h1, h), this.entity.setEulerAngles(90, s * pc.math.RAD_TO_DEG, 0)
};
var ShowControl = pc.createScript("ShowControl");
ShowControl.attributes.add("rot1", {type: "number"}), ShowControl.attributes.add("rot2", {type: "number"}), ShowControl.attributes.add("rot3", {type: "number"}), ShowControl.attributes.add("rot4", {type: "number"}), ShowControl.attributes.add("show1", {type: "entity"}), ShowControl.attributes.add("show2", {type: "entity"}), ShowControl.attributes.add("offset", {type: "number"}), ShowControl.prototype.initialize = function () {
    this.cameracontrol = this.entity.script.CameraControl, this.x1 = .08, this.x2 = -.022, this.x3 = -.08, this.xs1 = 0, this.xs2 = 0, this.y = -.049, this.z = -.15, this.hitnextfloor = !1
}, ShowControl.prototype.update = function (t) {
}, ShowControl.prototype.updateScene = function (t) {
    t *= -1;
    var o, s;
    t > this.rot1 && t < this.rot2 ? (this.hitnextfloor || (this.hitnextfloor = !0, neoneClick(this.entity.name)), o = (t - this.rot1) / (this.rot2 - this.rot1), this.xs1 = this.x2 * o + this.x1 * (1 - o), this.show2.setLocalPosition(this.xs1, this.y, this.z)) : (t < this.rot1 && t > this.rot1 - this.offset && this.show2.setLocalPosition(this.x1, this.y, this.z), t > this.rot2 && t < this.rot2 + this.offset && (this.show2.setLocalPosition(this.x2, this.y, this.z)), this.hitnextfloor = !1), t > this.rot3 && t < this.rot4 ? (s = (t - this.rot3) / (this.rot4 - this.rot3), this.xs2 = this.x3 * s + this.x2 * (1 - s), this.show1.setLocalPosition(this.xs2, this.y, this.z)) : (t < this.rot3 && t > this.rot3 - this.offset && this.show1.setLocalPosition(this.x2, this.y, this.z), t > this.rot4 && t < this.rot4 + this.offset && this.show1.setLocalPosition(this.x3, this.y, this.z))
};
var ScaleAnim = pc.createScript("scaleAnim");
ScaleAnim.attributes.add("startangle", {type: "number"}), ScaleAnim.attributes.add("speed", {
    type: "number",
    "default": 2
}), ScaleAnim.attributes.add("AnimType", {
    type: "number",
    "default": 2,
    "enum": [{ScaleX: 2}, {ScaleY: 3}, {SceleAll: 4}]
}), ScaleAnim.prototype.initialize = function () {
    var t = this.app;
    switch (this.InitScale = this.entity.getLocalScale().clone(), this.InitEuler = this.entity.getLocalEulerAngles().clone(), this.speed = 4, this.AnimType) {
        case 2:
            this.entity.setLocalScale(.001, this.InitScale.y, this.InitScale.z);
            break;
        case 3:
            this.entity.setLocalScale(this.InitScale.x, this.InitScale.y, .001);
            break;
        case 4:
            this.entity.setLocalScale(.001, .001, .001)
    }
    this.scaleanim = !1, this.startanim = !1, this.camera = t.root.findByName("Camera"), this.cameracontrol = this.camera.script.CameraControl, this.timer = 0, this.scaletime = 1, this.nowScaleX = 0, this.nowScaleY = 0, this.nowScaleZ = 0
}, ScaleAnim.prototype.update = function (t) {
    if (!this.scaleanim)if (this.startanim)if (this.timer += this.speed * t, this.timer > this.scaletime)this.entity.setLocalScale(this.InitScale.x, this.InitScale.y, this.InitScale.z), this.scaleanim = !0; else {
        var e = this.timer / this.scaletime;
        switch (this.nowScaleX = e * this.InitScale.x, this.nowScaleY = e * this.InitScale.y, this.nowScaleZ = e * this.InitScale.z, this.noweulerX = -90 * (1 - e) + e * this.InitEuler.x, this.AnimType) {
            case 2:
                this.entity.setLocalScale(this.nowScaleX, this.InitScale.y, this.InitScale.z);
                break;
            case 3:
                this.entity.setLocalScale(this.InitScale.x, this.InitScale.y, this.nowScaleZ);
                break;
            case 4:
                this.entity.setLocalScale(this.nowScaleX, this.nowScaleY, this.nowScaleZ)
        }
    } else {
        if (void 0 === this.cameracontrol.rotY || -this.cameracontrol.rotY < this.startangle)return;
        this.startanim = !0
    }
}, ScaleAnim.prototype.ResetAnim = function () {
    switch (this.AnimType) {
        case 2:
            this.entity.setLocalScale(.001, this.InitScale.y, this.InitScale.z);
            break;
        case 3:
            this.entity.setLocalScale(this.InitScale.x, this.InitScale.y, .001);
            break;
        case 4:
            this.entity.setLocalScale(.001, .001, .001)
    }
    this.scaleanim = !1, this.startanim = !1, this.timer = 0, this.nowScaleX = 0, this.nowScaleY = 0, this.nowScaleZ = 0
};
var LightAnim = pc.createScript("LightAnim");
LightAnim.attributes.add("angle", {type: "curve"}), LightAnim.attributes.add("speed", {type: "number"}), LightAnim.prototype.initialize = function () {
    var t = this.app;
    this.timer = 0, this.rotation = this.entity.getRotation().clone(), this.cameracontrol = t.root.findByName("Camera").script.CameraControl, this.dir = 1
}, LightAnim.prototype.update = function (t) {
    if (this.cameracontrol.cantopanim) {
        this.timer > 1 && (this.dir = -1), this.timer < 0 && (this.dir = 1), this.timer += this.dir * this.speed * t;
        var i = new pc.Quat;
        i = i.setFromAxisAngle(pc.Vec3.FORWARD, this.angle.value(this.timer));
        var e = this.rotation.clone();
        this.entity.setRotation(e.mul(i))
    }
};
var TextureAnim = pc.createScript("textureAnim");
TextureAnim.attributes.add("material", {type: "asset"}), TextureAnim.attributes.add("texture", {type: "asset"}), TextureAnim.attributes.add("speed", {type: "number"}), TextureAnim.prototype.initialize = function () {
    var t = this.app;
    this.timer = 0, this.cameracontrol = t.root.findByName("Camera").script.CameraControl, this.mat = t.assets.get(this.material.id).resource, this.tex = t.assets.get(this.texture.id).resource, this.count = 8, this.index = 0, this.dir = 1, this.mat.emissiveMap = this.tex, this.mat.emissiveMapTiling = new pc.Vec2(.25, .5), this.mat.update()
}, TextureAnim.prototype.update = function (t) {
    if (this.cameracontrol.cantopanim && (this.timer += this.speed * t, this.timer > 1)) {
        this.timer = 0, this.index >= this.count - 1 && (this.dir = -1), this.index <= 0 && (this.dir = 1), this.index += this.dir;
        var e = this.index % 4, i = Math.floor(this.index / 4);
        this.mat.emissiveMapOffset = new pc.Vec2(.25 * e, .5 * i), this.mat.update()
    }
};
var Animfloat = pc.createScript("animfloat");
Animfloat.attributes.add("aa", {type: "number"}), Animfloat.attributes.add("ww", {type: "number"}), Animfloat.attributes.add("gg", {type: "number"}), Animfloat.prototype.initialize = function () {
    this.t = 0;
    var t = this.entity.getLocalPosition();
    this.xx = t.x, this.yy = t.y, this.zz = t.z
}, Animfloat.prototype.update = function (t) {
    this.t += t, this.entity.setPosition(this.xx, this.aa * Math.sin(this.ww * this.t + this.gg) + this.yy, this.zz)
};
var CameraControl = pc.createScript("CameraControl");
CameraControl.prototype.initialize = function () {
    var t = this.app, i = t.root.findByTag("player");
    this.playercount = i.length, this.playeranims = [];
    for (var o = 0; o < this.playercount; o++) {
        var s = i[o].script.anim2;
        this.playeranims.push(s)
    }
    var e = this.entity.findByTag("show");
    this.showcount = e.length, this.showcontrols = [];
    for (var o = 0; o < this.showcount; o++) {
        var h = e[o].script.ShowControl;
        this.showcontrols.push(h)
    }
    this.hitsky = !1, this.show12 = t.root.findByTag("show12")[0], this.rotY = 32, this.height = 1, this.targetrotY = 22, this.rotateSpeed = 1, this.minzoom = 2.8, this.maxzoom = 3.5, this.zoom = this.minzoom, this.targetZoom = this.minzoom, this.minrotY = -2070, this.maxrotY = 22, this.initroty = this.entity.getEulerAngles().y, this.initHeight = this.entity.getPosition().y, this.ControlModel = {
        bottom: 0,
        top: 1
    }, this.curcontrolmodel = this.ControlModel.bottom, this.addheight = 0, this.targetaddheight = 0, this.toprotY = 50, this.topaddheight = 1, this.topzoom = 3.2, this.upaddheight = 4.2, this.upzoom = 4.1, this.showui = !1, this.UpAnim = !1, this.animtimer1 = 0, this.mani1Time = .5, this.DownAnim = !1, this.animtimer2 = 0, this.mani2Time = .5, this.cantopanim = !1, this.showmenu = !1;
    var n = document.getElementById("menubtn"), r = document.getElementById("return1btn"), a = document.getElementById("return2btn"), m = document.getElementById("downbtn");
    this.downbtn = m;
    var l = document.getElementById("upbtn");
    this.upbtn = l, this.musicon = !0;
    var d = document.getElementById("musicclose");
    n.style.display = "block", d.style.display = "block";
    var c = this;
    m.addEventListener("click", function (t) {
        c.animtimer1 = 0, c.UpAnim = !1, c.DownAnim = !0, c.targetZoom = c.topzoom, c.targetaddheight = c.topaddheight, m.style.display = "none", n.style.display = "block", d.style.display = "block"
    }), l.addEventListener("click", function (t) {
        c.show12.enabled = !1, c.animtimer2 = 0, c.DownAnim = !1, c.curcontrolmodel = c.ControlModel.top, c.targetZoom = c.upzoom, c.targetaddheight = c.upaddheight, c.showui = !1, c.UpAnim = !0, l.style.display = "none", n.style.display = "none", d.style.display = "none"
    }), d.addEventListener("click", function (i) {
        c.musicon ? (c.musicon = !1, t.systems.sound.volume = 0) : (c.musicon = !0, t.systems.sound.volume = 1)
    }), n.addEventListener("click", function (t) {
        c.showmenu = !0, c.showui && (l.style.display = "none", c.showui = !1)
    }), r.addEventListener("click", function (t) {
        c.showmenu = !1
    }), a.addEventListener("click", function (t) {
        c.showmenu = !1
    });
    var p, u;
    t.touch ? (window.addEventListener("touchstart", function (t) {
        p = t.touches[0].pageX, u = t.touches[0].pageY
    }), window.addEventListener("touchmove", function (t) {
        var i = t.touches[0], o = i.pageX - p;
        i.pageY - u;
        c.curcontrolmodel === c.ControlModel.bottom && c.orbit(c.rotateSpeed * o), p = i.pageX, u = i.pageY
    })) : t.mouse.on(pc.EVENT_MOUSEMOVE, function (t) {
        t.buttons[pc.MOUSEBUTTON_LEFT] && c.curcontrolmodel === c.ControlModel.bottom && c.orbit(c.rotateSpeed * t.dx)
    })
}, CameraControl.prototype.update = function (t) {
    this.Control(t)
}, CameraControl.prototype.swap = function (t) {
}, CameraControl.prototype.dolly = function () {
    var t = 1;
    -this.rotY <= 108 && (t = -this.rotY / 108), this.targetZoom = (1 - t) * this.minzoom + t * this.maxzoom, this.targetZoom = pc.math.clamp(this.targetZoom, this.minzoom, this.maxzoom), this.rotY < this.minrotY + this.toprotY && this.rotY >= this.minrotY - 50 ? (this.cantopanim = !0, t = (-this.minrotY + this.rotY) / this.toprotY, t = pc.math.clamp(t, 0, 1), this.targetZoom = this.maxzoom * t + this.topzoom * (1 - t), this.targetaddheight = this.topaddheight * (1 - t)) : (this.targetaddheight = 0, this.cantopanim = !1)
}, CameraControl.prototype.orbit = function (t) {
    this.targetrotY += t * this.rotateSpeed, this.targetrotY = pc.math.clamp(this.targetrotY, this.minrotY - 10, this.maxrotY)
}, CameraControl.prototype.Control = function (t) {
    switch (this.curcontrolmodel) {
        case this.ControlModel.bottom:
            this.dolly(), this.targetrotY > this.maxrotY && (this.targetrotY = pc.math.lerp(this.targetrotY, this.maxrotY, t / .1)), this.targetrotY < this.minrotY && (this.targetrotY = pc.math.lerp(this.targetrotY, this.minrotY, t / .1)), this.rotY = pc.math.lerp(this.rotY, this.targetrotY, t), this.entity.setEulerAngles(0, -this.rotY + this.initroty, 0);
            for (var i = 0; i < this.playercount; i++)this.playeranims[i].updateAnim(this.rotY);
            for (var i = 0; i < this.showcount; i++)this.showcontrols[i].updateScene(this.rotY);
            this.rotY < this.minrotY + 5 && !this.showui && !this.showmenu && (this.showui = !0, this.upbtn.style.display = "block", this.hitsky || (this.hitsky = !0, neoneClick("sky"))), this.rotY > this.minrotY + 8 && this.showui && (this.hitsky = !1, this.showui = !1, this.upbtn.style.display = "none");
            break;
        case this.ControlModel.top:
            this.UpAnim && (this.animtimer1 += t, this.animtimer1 > this.mani1Time && (this.animtimer1 = 0, this.UpAnim = !1, this.downbtn.style.display = "block")), this.DownAnim && (this.animtimer2 += t, this.animtimer2 > this.mani2Time && (this.animtimer2 = 0, this.DownAnim = !1, this.curcontrolmodel = this.ControlModel.bottom, this.show12.enabled = !0))
    }
    var o = this.height * (-this.rotY / 360);
    this.addheight = pc.math.lerp(this.addheight, this.targetaddheight, t / .2), o += this.addheight, this.zoom = pc.math.lerp(this.zoom, this.targetZoom, t / .2), this.entity.setPosition(0, o + this.initHeight, 0), this.entity.translateLocal(0, 0, this.zoom)
};
var OffsetAnim = pc.createScript("offsetAnim");
OffsetAnim.attributes.add("offset", {type: "curve"}), OffsetAnim.attributes.add("animType", {
    type: "number",
    "default": 0,
    "enum": [{OffsetX: 0}, {OffsetY: 1}, {OffsetZ: 2}]
}), OffsetAnim.attributes.add("speed", {type: "number"}), OffsetAnim.prototype.initialize = function () {
    var t = this.app;
    this.camera = t.root.findByName("Camera"), this.timer = 0, this.localpos = this.entity.getLocalPosition().clone()
}, OffsetAnim.prototype.update = function (t) {
    if (this.timer += this.speed * t, this.timer > 1)this.entity.script.enabled = !1; else {
        this.timer = pc.math.clamp(this.timer, 0, 1);
        var e = this.offset.value(this.timer);
        switch (this.entity.setLocalPosition(this.localpos.x, this.localpos.y, this.localpos.z), this.animType) {
            case 0:
                this.entity.translateLocal(e, 0, 0);
                break;
            case 1:
                this.entity.translateLocal(0, e, 0);
                break;
            case 2:
                this.entity.translateLocal(0, 0, e)
        }
    }
};
var ResourcesManager = pc.createScript("ResourcesManager");
ResourcesManager.prototype.initialize = function () {
    var a = this.app;
    this.camera1 = a.root.findByName("camera1");
    var e = this;
    this.lights = a.root.findByTag("light");
    var s, t, r, o, n, d, i, f, g, l, y, p, c, B, u, h = a.root.findByName("model"), m = a.root.findByName("zhuti"), v = a.root.findByName("part1"), b = a.root.findByName("part2"), N = a.root.findByName("part3"), P = a.root.findByName("part4"), T = a.root.findByName("part5"), M = a.root.findByName("part6"), R = a.root.findByName("part7"), z = a.root.findByName("part8"), w = a.root.findByName("part9"), S = a.root.findByName("part10"), j = a.root.findByName("part11"), k = a.root.findByName("part12"), q = a.assets.findByTag("item");
    t = q.length;
    var x = a.assets.findByTag("zhuti");
    r = x.length;
    var A = a.assets.findByTag("part1");
    o = A.length;
    var C = a.assets.findByTag("part2");
    n = C.length;
    var D = a.assets.findByTag("part3");
    d = D.length;
    var E = a.assets.findByTag("part4");
    i = E.length;
    var F = a.assets.findByTag("part5");
    f = F.length;
    var G = a.assets.findByTag("part6");
    g = G.length;
    var H = a.assets.findByTag("part7");
    l = H.length;
    var I = a.assets.findByTag("part8");
    y = I.length;
    var J = a.assets.findByTag("part9");
    p = J.length;
    var K = a.assets.findByTag("part10");
    c = K.length;
    var L = a.assets.findByTag("part11");
    B = L.length;
    var O = a.assets.findByTag("part12");
    u = O.length, s = t + r + o + n + d + i + f + g + l + y + p + c + B + u;
    var Q = 0, U = 0, V = 0, W = 0, X = 0, Y = 0, Z = 0, $ = 0, _ = 0, aa = 0, ea = 0, sa = 0, ta = 0, ra = 0, oa = 0, na = 0;
    for (this.starttime = pc.now(), na = 0; t > na; na++)a.assets.load(q[na]), q[na].ready(function (a) {
        Q++, U++, U === t && (h.enabled = !0), e.setProgress(Q / s)
    });
    for (na = 0; r > na; na++)a.assets.load(x[na]), x[na].ready(function (a) {
        Q++, V++, V === r && (m.enabled = !0), e.setProgress(Q / s)
    });
    for (na = 0; o > na; na++)a.assets.load(A[na]), A[na].ready(function (a) {
        Q++, W++, e.setProgress(Q / s), W === o && (v.enabled = !0)
    });
    for (na = 0; n > na; na++)a.assets.load(C[na]), C[na].ready(function (a) {
        Q++, X++, e.setProgress(Q / s), X === n && (b.enabled = !0)
    });
    for (na = 0; d > na; na++)a.assets.load(D[na]), D[na].ready(function (a) {
        Q++, Y++, Y === d && (N.enabled = !0), e.setProgress(Q / s)
    });
    for (na = 0; i > na; na++)a.assets.load(E[na]), E[na].ready(function (a) {
        Q++, Z++, Z === i && (P.enabled = !0), e.setProgress(Q / s)
    });
    for (na = 0; f > na; na++)a.assets.load(F[na]), F[na].ready(function (a) {
        Q++, $++, $ === f && (T.enabled = !0), e.setProgress(Q / s)
    });
    for (na = 0; g > na; na++)a.assets.load(G[na]), G[na].ready(function (a) {
        Q++, _++, _ === g && (M.enabled = !0), e.setProgress(Q / s)
    });
    for (na = 0; l > na; na++)a.assets.load(H[na]), H[na].ready(function (a) {
        Q++, aa++, aa === l && (R.enabled = !0), e.setProgress(Q / s)
    });
    for (na = 0; y > na; na++)a.assets.load(I[na]), I[na].ready(function (a) {
        Q++, ea++, ea === y && (z.enabled = !0), e.setProgress(Q / s)
    });
    for (na = 0; p > na; na++)a.assets.load(J[na]), J[na].ready(function (a) {
        Q++, sa++, sa === p && (w.enabled = !0), e.setProgress(Q / s)
    });
    for (na = 0; c > na; na++)a.assets.load(K[na]), K[na].ready(function (a) {
        Q++, ta++, ta === c && (S.enabled = !0), e.setProgress(Q / s)
    });
    for (na = 0; B > na; na++)a.assets.load(L[na]), L[na].ready(function (a) {
        Q++, ra++, ra === B && (j.enabled = !0), e.setProgress(Q / s)
    });
    for (na = 0; u > na; na++)a.assets.load(O[na]), O[na].ready(function (a) {
        Q++, oa++, oa === u && (k.enabled = !0), e.setProgress(Q / s)
    })
}, ResourcesManager.prototype.update = function (a) {
}, ResourcesManager.prototype.setProgress = function (a) {
    1 === a && (this.camera1.script.enabled = !0)
};
var BoundBox = pc.createScript("BoundBox");
BoundBox.attributes.add("size", {type: "vec3"}), BoundBox.attributes.add("offset", {type: "vec3"}), BoundBox.attributes.add("name", {type: "string"}), BoundBox.prototype.initialize = function () {
    this.collider = new pc.BoundingBox(this.entity.getPosition(), this.size), this.collider.center.add(this.offset)
}, BoundBox.prototype.update = function (t) {
}, BoundBox.prototype.setBoundBox = function () {
    this.collider.center.copy(this.entity.getPosition()), this.collider.center.add(this.offset)
};
var SetViewControl = pc.createScript("setViewControl");
SetViewControl.prototype.initialize = function () {
    var t = this.app;
    this.cameracontrol = this.entity.script.CameraControl, this.ray = new pc.Ray;
    var o = t.root.findByTag("show");
    this.colliders = [];
    for (var i = 0; i < o.length; i++)this.colliders.push(o[i].script.BoundBox);
    var r = this;
    t.touch ? window.addEventListener("touchstart", function (t) {
        if (!r.cameracontrol.showmenu) {
            var o = t.touches[0], i = o.pageX, e = o.pageY;
            r.doRaycast(i, e) && t.preventDefault()
        }
    }) : t.mouse.on(pc.EVENT_MOUSEDOWN, function (t) {
        if (!r.cameracontrol.showmenu) {
            var o = t.x, i = t.y;
            r.doRaycast(o, i)
        }
    })
}, SetViewControl.prototype.update = function (t) {
}, SetViewControl.prototype.doRaycast = function (t, o) {
    this.entity.camera.screenToWorld(t, o, this.entity.camera.farClip, this.ray.direction), this.ray.origin.copy(this.entity.getPosition()), this.ray.direction.sub(this.ray.origin).normalize();
    for (var i = 0; i < this.colliders.length; ++i) {
        var r = this.colliders[i];
        r.setBoundBox();
        var e = r.collider.intersectsRay(this.ray);
        if (e)return show3Dimg(r.name), e
    }
};
var TipAnim = pc.createScript("TipAnim");
TipAnim.attributes.add("offset", {type: "curve"}), TipAnim.attributes.add("animType", {
    type: "number",
    "default": 0,
    "enum": [{OffsetX: 0}, {OffsetY: 1}, {OffsetZ: 2}]
}), TipAnim.attributes.add("loopType", {
    type: "number",
    "default": 0,
    "enum": [{Loop: 0}, {PingPang: 1}, {Once: 2}]
}), TipAnim.attributes.add("speed", {type: "number"}), TipAnim.prototype.initialize = function () {
    this.app;
    this.timer = 0, this.localpos = this.entity.getLocalPosition().clone()
}, TipAnim.prototype.update = function (t) {
    if (!(this.timer > 1 && 2 === this.loopType)) {
        this.timer += this.speed * t, this.timer > 1 && (0 === this.loopType && (this.timer = 0), 1 === this.loopType && (this.speed = -this.speed)), this.timer < 0 && 1 === this.loopType && (this.speed = -this.speed), this.timer = pc.math.clamp(this.timer, 0, 1);
        var i = this.offset.value(this.timer);
        switch (this.entity.setLocalPosition(this.localpos.x, this.localpos.y, this.localpos.z), this.animType) {
            case 0:
                this.entity.translateLocal(i, 0, 0);
                break;
            case 1:
                this.entity.translateLocal(0, i, 0);
                break;
            case 2:
                this.entity.translateLocal(0, 0, i)
        }
    }
};
