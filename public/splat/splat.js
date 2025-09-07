const SPLAT_SOUNDS = ['splat/mp3/splat01.mp3','splat/mp3/splat02.mp3','splat/mp3/splat03.mp3'];
const LAUNCH_SOUND = 'splat/mp3/launch01.mp3';
const WASH_SOUND   = 'splat/mp3/wash_1.mp3';
const SPRITE_URL   = 'splat/img/extra_splats.png';
const SPRITE_FRAMES = 8;
const PALETTE = ['#4285f4','#fbbc04','#34a853','#ea4335'];

// --- DOM Elements ---
const launcher = document.getElementById("launcher");
const canvas = document.getElementById("ink-canvas");
const clearBtn = document.getElementById('clear-btn');
const ctx = canvas.getContext("2d");

// --- Canvas & Context Setup ---
const backCanvas = document.createElement("canvas");
const backCtx = backCanvas.getContext("2d");

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  backCanvas.width = window.innerWidth;
  backCanvas.height = window.innerHeight;
}
window.addEventListener("resize",resize);
resize();

// --- Asset Loading ---
const coloredSprites = {};
const sprite = new Image();
sprite.src = SPRITE_URL;
let spriteReady=false, frameW=0, frameH=0;
sprite.onload = () => {
  frameW = sprite.naturalWidth / SPRITE_FRAMES;
  frameH = sprite.naturalHeight;
  PALETTE.forEach(color => {
    const coloredCanvas = document.createElement("canvas");
    coloredCanvas.width = sprite.naturalWidth;
    coloredCanvas.height = sprite.naturalHeight;
    const coloredCtx = coloredCanvas.getContext("2d");
    coloredCtx.drawImage(sprite, 0, 0);
    coloredCtx.globalCompositeOperation = "source-in";
    coloredCtx.fillStyle = color;
    coloredCtx.fillRect(0, 0, sprite.naturalWidth, sprite.naturalHeight);
    coloredSprites[color] = coloredCanvas;
  });
  spriteReady = true;
};

const waveImg = new Image();
waveImg.src = 'splat/img/wave.png';

// --- Audio ---
function playAudio(src){
  const a = new Audio(src);
  a.play().catch(()=>{});
}

// --- Game Logic ---
class FlyingInk {
  constructor(x,y){
    this.target = {x,y};
    this.start = {x: 0.4*(x-canvas.width/2) + canvas.width/2, y: canvas.height};
    this.startTime = performance.now();
    const dist = Math.hypot(this.target.x - this.start.x, this.target.y - this.start.y);
    this.duration = Math.max(500, dist * 0.625);
    this.color = PALETTE[Math.floor(Math.random()*PALETTE.length)];
    this.frame = Math.floor(Math.random()*4);
    if (Math.random() < 0.1) this.frame += 4;
    this.angle = Math.random()*Math.PI*2;
    this.scale = 0.4 + Math.random() * 0.2;
    this.landed=false;
    playAudio(LAUNCH_SOUND);
  }

  easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  update(ctx){
    const now = performance.now();
    const t = Math.min(1,(now-this.startTime)/this.duration);
    if(t>=1){
      if(!this.landed){ this.land(); this.landed=true; }
      return false;
    }
    const ease = this.easeOut(t);
    const currentPos = {
        x: this.start.x * (1 - t) + this.target.x * t,
        y: this.start.y * (1 - ease) + this.target.y * ease
    };
    const headSize = 90 * (1 - ease) + 15 * ease;
    const trail_t = t - Math.min(t, 0.125);
    const trail_ease = this.easeOut(trail_t);
    const trailPos = {
        x: this.start.x * (1 - trail_t) + this.target.x * trail_t,
        y: this.start.y * (1 - trail_ease) + this.target.y * trail_ease
    };
    for(let i=0; i<25; i++){
        const p = i / 25;
        const particleSize = headSize * (1 - p);
        const particleX = currentPos.x * (1 - p) + trailPos.x * p + (headSize - particleSize) * (1 - p) * (Math.random() < 0.5 ? 1 : -1);
        const particleY = currentPos.y * (1 - p) + trailPos.y * p + (headSize - particleSize) * (1 - p) * (Math.random() < 0.5 ? 1 : -1);
        const r = parseInt(this.color.slice(1,3), 16) * (1 - p * 0.2);
        const g = parseInt(this.color.slice(3,5), 16) * (1 - p * 0.2);
        const b = parseInt(this.color.slice(5,7), 16) * (1 - p * 0.2);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.beginPath();
        ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2);
        ctx.fill();
    }
    return true;
  }

  land(){
    if(!spriteReady) return;
    const sourceSprite = coloredSprites[this.color];
    const w=frameW*this.scale,h=frameH*this.scale;
    backCtx.save();
    backCtx.translate(this.target.x,this.target.y);
    backCtx.rotate(this.angle);
    backCtx.drawImage(sourceSprite, this.frame * frameW, 0, frameW, frameH, -w/2, -h/2, w, h);
    backCtx.restore();
    playAudio(SPLAT_SOUNDS[Math.floor(Math.random()*SPLAT_SOUNDS.length)]);
    if(Math.random()<0.2) playAudio(WASH_SOUND);
  }
}

const flying=[];
let isMouseDown = false;
let fireInterval = null;
let mousePos = { x: 0, y: 0 };

function fire(x, y) {
    flying.push(new FlyingInk(x, y));
}

canvas.addEventListener("mousedown", e => {
    isMouseDown = true;
    const rect = canvas.getBoundingClientRect();
    mousePos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    fire(mousePos.x, mousePos.y);
    if (fireInterval) clearInterval(fireInterval);
    fireInterval = setInterval(() => fire(mousePos.x, mousePos.y), 200);
});

window.addEventListener("mouseup", () => {
    isMouseDown = false;
    if (fireInterval) {
        clearInterval(fireInterval);
        fireInterval = null;
    }
});

canvas.addEventListener("mousemove", e => {
    if (isMouseDown) {
        const rect = canvas.getBoundingClientRect();
        mousePos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
});

let isWashing = false;
let washStartTime = 0;
const washDuration = 2000;

clearBtn.addEventListener('click', () => {
    if (isWashing) return;
    isWashing = true;
    washStartTime = performance.now();
    playAudio(WASH_SOUND);
});

function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backCanvas, 0, 0);

    for (let i = flying.length - 1; i >= 0; i--) {
        if (!flying[i].update(ctx)) {
            flying.splice(i, 1);
        }
    }

    if (isWashing) {
        const now = performance.now();
        const t = Math.min(1, (now - washStartTime) / washDuration);
        const washY = t * (canvas.height + (waveImg.height || 100));
        backCtx.clearRect(0, 0, canvas.width, washY - (waveImg.height || 100) / 2);
        if (waveImg.complete && waveImg.naturalHeight > 0) {
            const waveWidth = waveImg.width;
            ctx.globalAlpha = 0.5;
            for (let i = 0; i < Math.ceil(canvas.width / waveWidth); i++) {
                ctx.drawImage(waveImg, i * waveWidth, washY - waveImg.height);
            }
            ctx.globalAlpha = 1.0;
        }
        if (t >= 1) {
            isWashing = false;
            backCtx.clearRect(0, 0, canvas.width, canvas.height);
            launcher.style.display = 'block';
            clearBtn.style.display = 'none';
            canvas.style.display = 'none';
        }
    }
    requestAnimationFrame(loop);
}

// --- Game Start ---
function startGame() {
    launcher.style.display = 'none';
    canvas.style.display = 'block';
    clearBtn.style.display = 'block';
    
    // Fire a splat in the middle to start
    setTimeout(() => fire(canvas.width / 2, canvas.height / 2), 175);

    loop();
}

launcher.addEventListener('click', startGame);
