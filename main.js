var canvas = document.querySelector("canvas");
var splash = document.querySelector("#splash");
var desc = document.querySelector("h1 .profile-desc");
var curs = document.querySelector("h1 .profile-curs");
var ctx = canvas.getContext("2d");
var w = window.innerWidth;
var h = window.innerHeight;

onresize = function() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    if (w/h > 2.5) {
        this.document.querySelector("br").style.display = "none";
    } else {
        this.document.querySelector("br").style.display = "block";
    }
}

onresize();

var lines = [];
var things = ["an engineering student.", 
            "a part-time hacker.",
            "not a web developer.",
            "a gamer.",
            "a rocket scientist.",
            "a future Martian.",
            "an accordion player.",
            "a mountain goat.",
            "a dancer.",
            "master procrastinator.",
            "a life-long tinkerer.",
            "a competitive programmer.",
            "a South African."];
var thingID = Math.random() * things.length | 0;
var newID = thingID;
desc.textContent = things[thingID]

for (var i = 0; i < 64; i++) {
    lines.push(new ray(Math.random() * Math.PI * 2, Math.random() * Math.sqrt(w*w+h*h)/2, Math.random() * 10 + 10));
}

function ray(arg, len, spd) {
    this.arg = arg;
    this.len = len;
    this.spd = spd;
    this.ox = Math.random()*4-2;
    this.oy = Math.random()*4-2;
}

function draw(r) {
    var len2 = r.len < 0 ? r.len+40 : r.len * 1.5 + 40;
    ctx.lineWidth = 7;
    ctx.strokeStyle = `rgba(1, 240, 255, ${Math.max(0, Math.min(0.8, (r.len)/Math.min(w/4, h/4)))})`;
    ctx.beginPath();
    if (r.len > 0) {
        ctx.moveTo(w/2 + r.len * Math.cos(r.arg)+r.ox, 0.32*h + r.len * Math.sin(r.arg)+r.oy);
    } else {
        ctx.moveTo(w/2+r.ox, h/2+r.oy);
    }
    ctx.lineTo(w/2 + len2 * Math.cos(r.arg)+r.ox, 0.32*h + len2 * Math.sin(r.arg)+r.oy);
    ctx.stroke();
    ctx.closePath();
    ctx.strokeStyle = `rgba(255, 130, 130, ${Math.max(0, Math.min(0.8, (r.len)/Math.min(w/4, h/4)))})`;
    ctx.beginPath();
    if (r.len > 0) {
        ctx.moveTo(w/2 + r.len * Math.cos(r.arg), 0.32*h + r.len * Math.sin(r.arg));
    } else {
        ctx.moveTo(w/2, h/2);
    }
    ctx.lineTo(w/2 + len2 * Math.cos(r.arg), 0.32*h + len2 * Math.sin(r.arg));
    ctx.stroke();
    ctx.closePath();
}

var tick = 0;
var anim_prog = 0;
var anim_stage = 0;

function update() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(55, 36, 86, 1.0)";
    ctx.fillRect(0, 0, w, h);
    for (var i = 0; i < lines.length; i++) {
        draw(lines[i]);
        lines[i].len += lines[i].spd / 25;
        if (Math.pow(lines[i].len, 2) > (w*w+h*h)/3) {
            lines[i].len = -40;
            lines[i].arg = Math.random() * Math.PI * 2;
            lines[i].spd = Math.random() * 10 + 10;
        }
    }

    if (anim_stage == 0 || anim_stage == 2) {
        curs.style.opacity = (anim_prog % 40) < 20 ? 1 : 0;
        if (anim_prog > (anim_stage == 0 ? 120 : 30)) {
            anim_stage = (anim_stage+1)%4;
            anim_prog = 0;
        }
    } else {
        curs.style.opacity = 1;
    }

    if (anim_stage == 1 && anim_prog % 8 == 0) {
        if (desc.textContent != things[newID].substring(0, desc.textContent.length)) {
            desc.textContent = desc.textContent.substring(0, desc.textContent.length-1);
        } else {
            anim_stage = 2;
            thingID = newID;
            anim_prog = 0;
        }
    }

    if (anim_stage == 3 && anim_prog % 12 == 0) {
        if (desc.textContent.length < things[thingID].length) {
            desc.textContent = desc.textContent + things[thingID][desc.textContent.length];
        } else {
            anim_stage = 0;
            while (newID == thingID) {
                newID = Math.random() * things.length | 0;
            }
            anim_prog = 0;
        }
    }

    anim_prog++;
    tick++;
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);