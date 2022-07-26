var canvas = document.querySelector("#splash canvas");
var splash = document.querySelector("#splash");
var desc = document.querySelector("h1 .desc");
var curs = document.querySelector("h1 .curs");
var ctx = canvas.getContext("2d");
var w = window.innerWidth;
var h = window.innerHeight;

onresize = function() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
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

for (var i = 0; i < 50; i++) {
    lines.push(new ray(Math.random() * Math.PI * 2, Math.random() * Math.sqrt(w*w+h*h)/2, Math.random() * 10 + 10));
}

function ray(arg, len, spd) {
    this.arg = arg;
    this.len = len;
    this.spd = spd;
}

function draw(r) {
    var len2 = r.len < 0 ? r.len+40 : r.len * 1.5 + 40;
    ctx.lineWidth = 2;
    ctx.strokeStyle = `rgba(255, 130, 130, ${Math.max(0, Math.min(1, (r.len)/Math.min(w/4, h/4)))})`;
    ctx.beginPath();
    if (r.len > 0) {
        ctx.moveTo(w/2 + r.len * Math.cos(r.arg), h/2 + r.len * Math.sin(r.arg));
    } else {
        ctx.moveTo(w/2, h/2);
    }
    ctx.lineTo(w/2 + len2 * Math.cos(r.arg), h/2 + len2 * Math.sin(r.arg));
    ctx.stroke();
    ctx.closePath();
}

var tick = 0;
var anim_prog = 0;
var anim_stage = 0;

function update() {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < lines.length; i++) {
        draw(lines[i]);
        lines[i].len += lines[i].spd / 10;
        if (Math.pow(lines[i].len, 2) > (w*w+h*h)/4) {
            lines[i].len = -40;
            lines[i].arg = Math.random() * Math.PI * 2;
            lines[i].spd = Math.random() * 10 + 10;
        }
    }

    if (anim_stage == 0 || anim_stage == 2) {
        curs.style.color = (anim_prog % 40) < 20 ? "#392559" : "#FF8282";
        if (anim_prog > (anim_stage == 0 ? 120 : 30)) {
            anim_stage = (anim_stage+1)%4;
            anim_prog = 0;
        }
    } else {
        curs.style.color = "#FF8282";
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