const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const shardCountLabel = document.getElementById("shardCount");
const healthValueLabel = document.getElementById("healthValue");
const statusTextLabel = document.getElementById("statusText");
const coreValueLabel = document.getElementById("coreValue");
const levelNameLabel = document.getElementById("levelName");

const keys = new Set();
const golemImage = new Image();
const crystalImage = new Image();
const trophyImage = new Image();
const canyonImage = new Image();
const layeredBlockImage = new Image();
const questionArchImage = new Image();
const goldMountainImage = new Image();
const crystalCanvas = document.createElement("canvas");
const crystalCtx = crystalCanvas.getContext("2d");
let golemSpriteReady = false;
let crystalReady = false;
let trophyReady = false;
let canyonReady = false;
let layeredBlockReady = false;
let questionArchReady = false;
let goldMountainReady = false;

golemImage.src = "./golem-vector.svg";
golemImage.onload = () => {
  golemSpriteReady = true;
};

crystalImage.src = "./crystal-reference.png";
crystalImage.onload = () => {
  crystalCanvas.width = crystalImage.width;
  crystalCanvas.height = crystalImage.height;
  crystalCtx.clearRect(0, 0, crystalImage.width, crystalImage.height);
  crystalCtx.drawImage(crystalImage, 0, 0);

  const imageData = crystalCtx.getImageData(0, 0, crystalImage.width, crystalImage.height);
  const px = imageData.data;
  const bg = { r: px[0], g: px[1], b: px[2] };

  for (let i = 0; i < px.length; i += 4) {
    const diff = Math.abs(px[i] - bg.r) + Math.abs(px[i + 1] - bg.g) + Math.abs(px[i + 2] - bg.b);
    if (diff < 70) {
      px[i + 3] = 0;
    }
  }

  crystalCtx.putImageData(imageData, 0, 0);
  crystalReady = true;
};

trophyImage.src = "./env-trophy.png";
trophyImage.onload = () => {
  trophyReady = true;
};

canyonImage.src = "./env-canyon.png";
canyonImage.onload = () => {
  canyonReady = true;
};

layeredBlockImage.src = "./env-layered-block.png";
layeredBlockImage.onload = () => {
  layeredBlockReady = true;
};

questionArchImage.src = "./env-question-arch.png";
questionArchImage.onload = () => {
  questionArchReady = true;
};

goldMountainImage.src = "./env-gold-mountain.png";
goldMountainImage.onload = () => {
  goldMountainReady = true;
};

const world = {
  gravity: 0.58,
  width: 2600,
  height: 540,
  requiredShards: 3,
};

const LEVELS = [
  {
    name: "Core Sanctum",
    status: "Sanctum açıldı",
    background: "sanctum",
    width: 2480,
    requiredShards: 4,
    startPoint: { x: 96, y: 330 },
    checkpoint: { x: 1210, y: 282, w: 28, h: 74, active: false },
    exitDoor: { x: 2295, y: 302, w: 84, h: 118 },
    platforms: [
      { x: 0, y: 456, w: 420, h: 84, type: "ground" },
      { x: 470, y: 404, w: 190, h: 24, type: "ledge" },
      { x: 740, y: 356, w: 240, h: 26, type: "ledge" },
      { x: 1050, y: 310, w: 180, h: 24, type: "ledge" },
      { x: 1180, y: 430, w: 190, h: 110, type: "altar" },
      { x: 1435, y: 344, w: 220, h: 24, type: "ledge" },
      { x: 1730, y: 286, w: 210, h: 24, type: "ledge" },
      { x: 1995, y: 360, w: 170, h: 24, type: "ledge" },
      { x: 2210, y: 420, w: 270, h: 120, type: "ground" },
    ],
    pillars: [
      { x: 220, h: 144, w: 30 },
      { x: 620, h: 188, w: 40 },
      { x: 1160, h: 220, w: 46 },
      { x: 1590, h: 166, w: 34 },
      { x: 2100, h: 204, w: 42 },
    ],
    hazards: [
      { x: 424, y: 505, w: 38, h: 35 },
      { x: 1368, y: 505, w: 48, h: 35 },
      { x: 2174, y: 505, w: 32, h: 35 },
    ],
    enemies: [
      { type: "crawler", x: 812, y: 320, w: 44, h: 36, minX: 770, maxX: 930, speed: 1.25 },
      { type: "crawler", x: 1460, y: 308, w: 44, h: 36, minX: 1450, maxX: 1600, speed: 1.18, dir: -1 },
      { type: "sentry", x: 1785, y: 242, w: 48, h: 44, minX: 1750, maxX: 1900, speed: 0.72, dir: 1, health: 3 },
      { type: "sentry", x: 2052, y: 316, w: 48, h: 44, minX: 2012, maxX: 2138, speed: 0.68, dir: -1, health: 3 },
    ],
    shards: [
      { x: 558, y: 362, collected: false },
      { x: 1136, y: 266, collected: false },
      { x: 1516, y: 300, collected: false },
      { x: 2058, y: 322, collected: false },
    ],
  },
];

let currentLevelIndex = 0;
let levelWon = false;
let startPoint = { x: 96, y: 330 };
let checkpoint = { x: 1280, y: 296, w: 28, h: 74, active: false };
let exitDoor = { x: 2470, y: 370, w: 72, h: 90 };
let platforms = [];
let pillars = [];
let hazards = [];

function makeEnemy(config) {
  return {
    ...config,
    baseX: config.x,
    dir: config.dir ?? 1,
    dead: false,
    hitFlash: 0,
    health: config.health ?? 2,
  };
}

let enemies = [];
let shards = [];

let particles = [];
let lastTime = 0;
let shake = 0;
let checkpointReached = false;

function loadLevel(index, statusMessage = null, preserved = {}) {
  const level = LEVELS[index];
  currentLevelIndex = index;
  world.width = level.width;
  world.requiredShards = level.requiredShards;
  startPoint = { ...level.startPoint };
  checkpoint = { ...level.checkpoint, active: false };
  exitDoor = { ...level.exitDoor };
  platforms = level.platforms.map((platform) => ({ ...platform }));
  pillars = level.pillars.map((pillar) => ({ ...pillar }));
  hazards = level.hazards.map((hazard) => ({ ...hazard }));
  enemies = level.enemies.map((enemy) => makeEnemy({ ...enemy }));
  shards = level.shards.map((shard) => ({ ...shard, collected: false }));
  checkpointReached = false;
  levelWon = false;
  player = createPlayer();
  if (preserved.health != null) player.health = preserved.health;
  if (preserved.core != null) player.core = preserved.core;
  if (preserved.facing != null) player.facing = preserved.facing;
  particles = [];
  if (levelNameLabel) levelNameLabel.textContent = level.name;
  statusTextLabel.textContent = statusMessage ?? level.status;
}

function createPlayer() {
  return {
    x: checkpointReached ? checkpoint.x - 40 : startPoint.x,
    y: checkpointReached ? checkpoint.y - 24 : startPoint.y,
    w: 56,
    h: 78,
    vx: 0,
    vy: 0,
    speed: 4.4,
    jump: -12.2,
    grounded: false,
    facing: 1,
    health: 5,
    invuln: 0,
    shards: 0,
    core: 0,
    attackTimer: 0,
    attackCooldown: 0,
    pulseCooldown: 0,
    attackQueued: false,
  };
}

let player = createPlayer();

function spawnParticles(x, y, color, count, force = 1.5) {
  for (let i = 0; i < count; i++) {
    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * force * 2.4,
      vy: (Math.random() - 0.7) * force * 2.2,
      life: 28 + Math.random() * 18,
      color,
      size: 2 + Math.random() * 4,
    });
  }
}

function resetLevel(status = "Hazır", keepCheckpoint = true) {
  const preserved = {
    health: 5,
    core: 0,
    facing: player.facing,
  };
  loadLevel(currentLevelIndex, status, preserved);
  if (keepCheckpoint && checkpointReached) {
    checkpoint.active = true;
    player.x = checkpoint.x - 40;
    player.y = checkpoint.y - 24;
  }
}

function advanceLevel() {
  levelWon = true;
  statusTextLabel.textContent = "Sanctum temizlendi, çekirdek uyandı";
  spawnParticles(player.x + player.w / 2, player.y + 18, "#f6cade", 38, 3.2);
}

function overlaps(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function circleBoxCollision(circle, box) {
  const closestX = Math.max(box.x, Math.min(circle.x, box.x + box.w));
  const closestY = Math.max(box.y, Math.min(circle.y, box.y + box.h));
  const dx = circle.x - closestX;
  const dy = circle.y - closestY;
  return dx * dx + dy * dy < circle.r * circle.r;
}

function updateHud() {
  shardCountLabel.textContent = `${player.shards} / ${world.requiredShards}`;
  healthValueLabel.textContent = String(player.health);
  coreValueLabel.textContent = `${Math.min(player.core, 3)} / 3`;
  if (levelNameLabel) levelNameLabel.textContent = LEVELS[currentLevelIndex].name;
}

function hurtPlayer(reason, forceX = 0) {
  if (player.invuln > 0) return;

  player.health -= 1;
  player.invuln = 80;
  player.vx = forceX;
  player.vy = -5.5;
  shake = 10;
  spawnParticles(player.x + player.w / 2, player.y + player.h / 2, "#f0b1cb", 12, 2);
  statusTextLabel.textContent = reason;

  if (player.health <= 0) {
    checkpointReached = checkpoint.active;
    resetLevel("Golem dağıldı, tekrar toplandı");
  }
}

function getAttackBox() {
  return {
    x: player.facing === 1 ? player.x + player.w - 6 : player.x - 46,
    y: player.y + 10,
    w: 46,
    h: 46,
  };
}

function performAttack() {
  if (player.attackCooldown > 0) return;
  player.attackTimer = 12;
  player.attackCooldown = 18;
  shake = Math.max(shake, 5);
  spawnParticles(player.x + player.w / 2, player.y + 42, "#c99c73", 7, 1.3);

  const attackBox = getAttackBox();
  let hitAny = false;

  for (const enemy of enemies) {
    if (enemy.dead) continue;
    if (!overlaps(attackBox, enemy)) continue;

    enemy.health -= 1;
    enemy.hitFlash = 8;
    enemy.dir = player.facing;
    enemy.x += player.facing * 18;
    spawnParticles(enemy.x + enemy.w / 2, enemy.y + enemy.h / 2, "#e9a3c0", 10, 2.2);
    hitAny = true;

    if (enemy.health <= 0) {
      enemy.dead = true;
      player.core = Math.min(3, player.core + 1);
      spawnParticles(enemy.x + enemy.w / 2, enemy.y + enemy.h / 2, "#7de3c0", 18, 2.8);
      statusTextLabel.textContent = "Düşman parçalandı";
    }
  }

  if (!hitAny) {
    statusTextLabel.textContent = "Taş yumruk havayı yardı";
  }
}

function performCorePulse() {
  if (player.core < 3 || player.pulseCooldown > 0) return;

  player.core = 0;
  player.pulseCooldown = 90;
  shake = 14;
  spawnParticles(player.x + player.w / 2, player.y + 30, "#f3bfd5", 28, 3.6);

  for (const enemy of enemies) {
    if (enemy.dead) continue;
    const dx = enemy.x + enemy.w / 2 - (player.x + player.w / 2);
    const dy = enemy.y + enemy.h / 2 - (player.y + player.h / 2);
    const dist = Math.hypot(dx, dy);
    if (dist > 170) continue;

    enemy.dead = true;
    spawnParticles(enemy.x + enemy.w / 2, enemy.y + enemy.h / 2, "#f0cfe0", 22, 3.2);
  }

  statusTextLabel.textContent = "Core Pulse patladı";
}

function updatePlayer() {
  if (levelWon) return;
  const previousX = player.x;
  const previousY = player.y;

  const left = keys.has("a") || keys.has("arrowleft");
  const right = keys.has("d") || keys.has("arrowright");

  if (left && !right) {
    player.vx = -player.speed;
    player.facing = -1;
  } else if (right && !left) {
    player.vx = player.speed;
    player.facing = 1;
  } else {
    player.vx *= player.grounded ? 0.74 : 0.94;
    if (Math.abs(player.vx) < 0.08) player.vx = 0;
  }

  if (player.attackCooldown > 0) player.attackCooldown -= 1;
  if (player.attackTimer > 0) player.attackTimer -= 1;
  if (player.pulseCooldown > 0) player.pulseCooldown -= 1;
  if (player.invuln > 0) player.invuln -= 1;

  player.vy += world.gravity;
  player.grounded = false;

  player.x += player.vx;
  for (const platform of platforms) {
    const verticalOverlap = player.y + player.h > platform.y + 4 && player.y < platform.y + platform.h - 4;
    if (!verticalOverlap) continue;
    if (!overlaps(player, platform)) continue;

    const prevRight = player.x + player.w - player.vx;
    const prevLeft = player.x - player.vx;

    if (prevRight <= platform.x) {
      player.x = platform.x - player.w;
      player.vx = 0;
    } else if (prevLeft >= platform.x + platform.w) {
      player.x = platform.x + platform.w;
      player.vx = 0;
    }
  }

  player.y += player.vy;

  if (player.y > world.height + 200) {
    checkpointReached = checkpoint.active;
    resetLevel("Derinliğe düştün");
    return;
  }

  if (player.vy >= 0) {
    for (const platform of platforms) {
      const previousBottom = previousY + player.h;
      const currentBottom = player.y + player.h;
      const crossedTop = previousBottom <= platform.y && currentBottom >= platform.y;
      const horizontalOverlap = player.x + player.w > platform.x + 6 && player.x < platform.x + platform.w - 6;

      if (!crossedTop || !horizontalOverlap) continue;

      player.y = platform.y - player.h;
      player.vy = 0;
      player.grounded = true;
      break;
    }
  }

  for (const platform of platforms) {
    if (!overlaps(player, platform)) continue;

    const prevBottom = player.y + player.h - player.vy;
    const prevTop = player.y - player.vy;
    if (prevBottom <= platform.y) {
      player.y = platform.y - player.h;
      player.vy = 0;
      player.grounded = true;
    } else if (prevTop >= platform.y + platform.h) {
      player.y = platform.y + platform.h;
      player.vy = 0;
    }
  }

  player.x = Math.max(0, Math.min(world.width - player.w, player.x));

  if (!checkpoint.active && overlaps(player, checkpoint)) {
    checkpoint.active = true;
    checkpointReached = true;
    statusTextLabel.textContent = "Taş sütun rezonansa girdi";
    spawnParticles(checkpoint.x + 8, checkpoint.y + 24, "#f1c0d6", 20, 2.6);
  }

  for (const hazard of hazards) {
    if (overlaps(player, hazard)) {
      hurtPlayer("Lav çatlağı can yaktı", player.x < hazard.x ? -4 : 4);
    }
  }

  for (const enemy of enemies) {
    if (enemy.dead) continue;
    enemy.x += enemy.speed * enemy.dir;
    if (enemy.x <= enemy.minX || enemy.x + enemy.w >= enemy.maxX) {
      enemy.dir *= -1;
    }

    if (enemy.hitFlash > 0) enemy.hitFlash -= 1;

    if (overlaps(player, enemy)) {
      const stomp = player.vy > 1.5 && player.y + player.h - 10 < enemy.y + 12;
      if (stomp) {
        enemy.dead = true;
        player.vy = -8.2;
        player.core = Math.min(3, player.core + 1);
        spawnParticles(enemy.x + enemy.w / 2, enemy.y + enemy.h / 2, "#bce7d7", 16, 2.8);
        statusTextLabel.textContent = "Ezme vuruşu";
      } else {
        hurtPlayer("Maden yaratığı çarptı", player.x < enemy.x ? -5 : 5);
      }
    }
  }

  for (const shard of shards) {
    if (shard.collected) continue;
    if (circleBoxCollision({ x: shard.x, y: shard.y, r: 16 }, player)) {
      shard.collected = true;
      player.shards += 1;
      player.core = Math.min(3, player.core + 1);
      spawnParticles(shard.x, shard.y, "#f0bfd7", 20, 2.4);
      statusTextLabel.textContent = "Core parçası toplandı";
    }
  }

  if (player.shards >= world.requiredShards && overlaps(player, exitDoor)) {
    advanceLevel();
  }
}

function updateParticles() {
  particles = particles.filter((particle) => particle.life > 0);
  for (const particle of particles) {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += 0.12;
    particle.life -= 1;
  }
}

function roundedRectPath(x, y, w, h, radius) {
  const r = Math.min(radius, w * 0.2, h * 0.35);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawPlatformBlock(x, y, w, h, type = "ledge") {
  const gradient = ctx.createLinearGradient(x, y, x, y + h);
  if (type === "altar") {
    gradient.addColorStop(0, "#c39c75");
    gradient.addColorStop(0.22, "#98704f");
    gradient.addColorStop(1, "#5f4635");
  } else {
    gradient.addColorStop(0, "#af8a67");
    gradient.addColorStop(0.25, "#88664e");
    gradient.addColorStop(1, "#654b39");
  }
  ctx.fillStyle = gradient;
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = "rgba(255, 224, 200, 0.16)";
  ctx.fillRect(x, y, w, 6);
  if (type === "altar") {
    ctx.fillStyle = "rgba(255, 210, 232, 0.18)";
    ctx.fillRect(x + 10, y + 10, w - 20, 8);
  }
}

function drawBackground(cameraX) {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#1f171b");
  gradient.addColorStop(0.42, "#151115");
  gradient.addColorStop(1, "#0c0a0d");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const haze = ctx.createRadialGradient(
    canvas.width * 0.52,
    180,
    40,
    canvas.width * 0.52,
    180,
    420
  );
  haze.addColorStop(0, "rgba(235,165,193,0.16)");
  haze.addColorStop(0.45, "rgba(235,165,193,0.06)");
  haze.addColorStop(1, "rgba(235,165,193,0)");
  ctx.fillStyle = haze;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.globalAlpha = 0.18;
  for (let i = -1; i < 4; i++) {
    const slabX = i * 360 - cameraX * 0.06;
    ctx.fillStyle = i % 2 === 0 ? "rgba(74,56,48,0.34)" : "rgba(56,43,38,0.28)";
    ctx.beginPath();
    ctx.moveTo(slabX + 20, 150);
    ctx.lineTo(slabX + 300, 150);
    ctx.lineTo(slabX + 270, 352);
    ctx.lineTo(slabX + 44, 352);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  for (const pillar of pillars) {
    const px = pillar.x - cameraX * 0.55;
    const py = canvas.height - pillar.h - 76;
    const pillarGradient = ctx.createLinearGradient(px, py, px, py + pillar.h);
    pillarGradient.addColorStop(0, "rgba(92,72,60,0.32)");
    pillarGradient.addColorStop(1, "rgba(37,28,24,0.18)");
    ctx.fillStyle = pillarGradient;
    ctx.fillRect(px, py, pillar.w, pillar.h);
  }

  for (let i = 0; i < 6; i++) {
    const x = ((i * 380) - cameraX * 0.12) % (canvas.width + 420) - 160;
    ctx.fillStyle = i % 2 === 0 ? "rgba(255,244,231,0.025)" : "rgba(88,64,54,0.045)";
    ctx.beginPath();
    ctx.moveTo(x, 290);
    ctx.lineTo(x + 120, 214);
    ctx.lineTo(x + 270, 246);
    ctx.lineTo(x + 190, 322);
    ctx.closePath();
    ctx.fill();
  }

  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.shadowColor = "rgba(235,165,193,0.72)";
  ctx.shadowBlur = 22;
  for (let i = 0; i < 4; i++) {
    const crystalX = ((i * 260) - cameraX * 0.16) % (canvas.width + 320) - 60;
    const crystalY = 128 + (i % 2) * 52;
    ctx.fillStyle = "#d99cbc";
    ctx.beginPath();
    ctx.moveTo(crystalX, crystalY - 18);
    ctx.lineTo(crystalX + 14, crystalY - 6);
    ctx.lineTo(crystalX + 11, crystalY + 16);
    ctx.lineTo(crystalX - 10, crystalY + 18);
    ctx.lineTo(crystalX - 16, crystalY + 1);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  const vignette = ctx.createLinearGradient(0, 0, canvas.width, 0);
  vignette.addColorStop(0, "rgba(8,6,8,0.34)");
  vignette.addColorStop(0.2, "rgba(8,6,8,0)");
  vignette.addColorStop(0.8, "rgba(8,6,8,0)");
  vignette.addColorStop(1, "rgba(8,6,8,0.34)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawEnvironment(cameraX) {
  for (const platform of platforms) {
    const x = platform.x - cameraX;
    drawPlatformBlock(x, platform.y, platform.w, platform.h, platform.type);
  }

  for (const hazard of hazards) {
    const x = hazard.x - cameraX;
    ctx.fillStyle = "#2b1914";
    ctx.fillRect(x, hazard.y, hazard.w, hazard.h);
    ctx.fillStyle = "#f08c5d";
    ctx.fillRect(x + 4, hazard.y + 12, hazard.w - 8, hazard.h - 12);
    ctx.fillStyle = "rgba(255,229,180,0.4)";
    ctx.fillRect(x + 7, hazard.y + 17, hazard.w - 14, 4);
    ctx.strokeStyle = "rgba(255,155,110,0.65)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + 8, hazard.y + 15);
    ctx.lineTo(x + hazard.w * 0.35, hazard.y + 22);
    ctx.lineTo(x + hazard.w * 0.6, hazard.y + 18);
    ctx.lineTo(x + hazard.w - 8, hazard.y + 24);
    ctx.stroke();
  }

  const checkpointX = checkpoint.x - cameraX;
  const flagColor = checkpoint.active ? "#f6cade" : "#7c6573";
  ctx.fillStyle = "#503f49";
  ctx.fillRect(checkpointX, checkpoint.y, checkpoint.w, checkpoint.h);
  ctx.fillStyle = flagColor;
  ctx.beginPath();
  ctx.moveTo(checkpointX + checkpoint.w, checkpoint.y + 8);
  ctx.lineTo(checkpointX + checkpoint.w + 26, checkpoint.y + 18);
  ctx.lineTo(checkpointX + checkpoint.w, checkpoint.y + 30);
  ctx.closePath();
  ctx.fill();
}

function drawShards(cameraX, time) {
  for (const shard of shards) {
    if (shard.collected) continue;
    const bob = Math.sin(time * 0.003 + shard.x * 0.01) * 6;
    if (crystalReady) {
      ctx.save();
      ctx.globalAlpha = 0.92;
      ctx.shadowColor = "rgba(240,191,215,0.9)";
      ctx.shadowBlur = 18 + Math.sin(time * 0.01 + shard.x) * 2;
      ctx.drawImage(crystalCanvas, shard.x - cameraX - 14, shard.y + bob - 18, 28, 32);
      ctx.restore();
    } else {
      ctx.save();
      ctx.translate(shard.x - cameraX, shard.y + bob);
      ctx.shadowColor = "rgba(240,191,215,0.75)";
      ctx.shadowBlur = 20;
      ctx.fillStyle = "#eaa9c5";
      ctx.beginPath();
      ctx.moveTo(0, -18);
      ctx.lineTo(15, -4);
      ctx.lineTo(12, 18);
      ctx.lineTo(-8, 20);
      ctx.lineTo(-18, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }
}

function drawEnemies(cameraX) {
  for (const enemy of enemies) {
    if (enemy.dead) continue;
    const x = enemy.x - cameraX;
    const flash = enemy.hitFlash > 0;

    if (enemy.type === "crawler") {
      ctx.fillStyle = flash ? "#f2cadb" : "#436c5c";
      ctx.fillRect(x, enemy.y + 10, enemy.w, enemy.h - 10);
      ctx.fillStyle = flash ? "#fff0f6" : "#8fd0b1";
      ctx.fillRect(x + 6, enemy.y + 14, enemy.w - 12, 7);
    } else {
      ctx.fillStyle = flash ? "#f2cadb" : "#4b5d78";
      ctx.fillRect(x + 4, enemy.y + 8, enemy.w - 8, enemy.h - 8);
      ctx.fillStyle = flash ? "#fff0f6" : "#a8b6d4";
      ctx.fillRect(x + 11, enemy.y + 16, enemy.w - 22, 10);
      ctx.fillStyle = "#e9a3c0";
      ctx.beginPath();
      ctx.moveTo(x + enemy.w / 2, enemy.y + 18);
      ctx.lineTo(x + enemy.w / 2 + 8, enemy.y + 26);
      ctx.lineTo(x + enemy.w / 2 - 1, enemy.y + 34);
      ctx.lineTo(x + enemy.w / 2 - 10, enemy.y + 24);
      ctx.closePath();
      ctx.fill();
    }
  }
}

function drawExit(cameraX, time) {
  const unlocked = player.shards >= world.requiredShards;
  const glow = unlocked ? 12 + Math.sin(time * 0.006) * 4 : 0;
  const x = exitDoor.x - cameraX;

  ctx.save();
  if (unlocked) {
    ctx.shadowColor = "rgba(240, 191, 215, 0.72)";
    ctx.shadowBlur = glow;
  }
  ctx.fillStyle = unlocked ? "#dca0bb" : "#4d3240";
  ctx.fillRect(x, exitDoor.y, exitDoor.w, exitDoor.h);
  ctx.fillStyle = unlocked ? "#ffdce8" : "#7e5b6b";
  ctx.fillRect(x + 10, exitDoor.y + 10, exitDoor.w - 20, exitDoor.h - 20);
  ctx.restore();
}

function drawPlayer(cameraX, time) {
  const flash = player.invuln > 0 && Math.floor(player.invuln / 5) % 2 === 0;
  if (flash) return;

  const x = player.x - cameraX;
  const y = player.y;
  const bob = Math.sin(time * 0.018 + player.x * 0.08) * Math.min(1.2, Math.abs(player.vx) * 0.28);
  const attackOffset = player.attackTimer > 0 ? player.facing * 10 : 0;
  const attackT = Math.max(0, player.attackTimer / 12);
  const walkAmount = player.grounded ? Math.min(1, Math.abs(player.vx) / player.speed) : 0;
  const idleAmount = player.grounded && Math.abs(player.vx) < 0.08 ? 1 : 0;
  const idlePhase = time * 0.0032;
  const idleFloat = Math.sin(idlePhase) * 1.1 * idleAmount;
  const idleHeadFloat = Math.sin(idlePhase + 0.22) * 0.8 * idleAmount;
  const idleArmFloat = Math.sin(idlePhase + 0.75) * 0.55 * idleAmount;
  const idleLegFloat = Math.sin(idlePhase + 1.35) * 0.35 * idleAmount;
  const walkPhase = time * 0.018 + player.x * 0.09;
  const armSwingFront = Math.sin(walkPhase) * 12 * walkAmount;
  const armSwingBack = Math.sin(walkPhase + Math.PI) * 12 * walkAmount;
  const legSwingFront = Math.sin(walkPhase + Math.PI) * 10 * walkAmount;
  const legSwingBack = Math.sin(walkPhase) * 10 * walkAmount;
  const rightShoulderPush = attackT * 16;
  const rightForearmPush = attackT * 28;

  ctx.save();

  ctx.fillStyle = "rgba(0,0,0,0.22)";
  ctx.beginPath();
  ctx.ellipse(x + 28, y + 76, 26, 9, 0, 0, Math.PI * 2);
  ctx.fill();

  const ox = x - 26 + attackOffset;
  const oy = y - 52 + bob + idleFloat;

  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.strokeStyle = "#232126";
  ctx.lineWidth = 2.2;

  const fillShape = (color, points) => {
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
  };

  fillShape("#6f4d38", [
    [ox + 18, oy + 28 + idleArmFloat],
    [ox + 7 + armSwingBack * 0.25, oy + 36 + idleArmFloat],
    [ox + 2 + armSwingBack * 0.45, oy + 54 + idleArmFloat],
    [ox + 7 + armSwingBack * 0.7, oy + 84 + idleArmFloat],
    [ox + 20 + armSwingBack * 0.55, oy + 82 + idleArmFloat],
    [ox + 25, oy + 45 + idleArmFloat],
  ]);

  fillShape("#d0b28a", [
    [ox + 0 + armSwingBack * 0.72, oy + 84 + idleArmFloat],
    [ox + 19 + armSwingBack * 0.64, oy + 84 + idleArmFloat],
    [ox + 22 + armSwingBack * 0.68, oy + 95 + idleArmFloat],
    [ox + 18 + armSwingBack * 0.68, oy + 100 + idleArmFloat],
    [ox + 3 + armSwingBack * 0.7, oy + 99 + idleArmFloat],
    [ox - 2 + armSwingBack * 0.76, oy + 91 + idleArmFloat],
  ]);

  fillShape("#8a6548", [
    [ox + 90, oy + 29 + idleArmFloat],
    [ox + 103 + armSwingFront * 0.25 + rightShoulderPush * 0.45, oy + 35 - attackT * 2 + idleArmFloat],
    [ox + 108 + armSwingFront * 0.46 + rightForearmPush * 0.4, oy + 48 - attackT * 1 + idleArmFloat],
    [ox + 102 + armSwingFront * 0.72 + rightForearmPush * 0.72, oy + 78 - attackT * 4 + idleArmFloat],
    [ox + 90 + armSwingFront * 0.58 + rightForearmPush * 0.56, oy + 80 - attackT * 3 + idleArmFloat],
    [ox + 84 + rightShoulderPush * 0.18, oy + 46 + idleArmFloat],
  ]);

  fillShape("#d0b28a", [
    [ox + 87 + armSwingFront * 0.62 + rightForearmPush * 0.54, oy + 80 - attackT * 4],
    [ox + 106 + armSwingFront * 0.76 + rightForearmPush * 0.84, oy + 80 - attackT * 4],
    [ox + 113 + armSwingFront * 0.82 + rightForearmPush, oy + 89 - attackT * 3],
    [ox + 108 + armSwingFront * 0.76 + rightForearmPush * 0.88, oy + 100 - attackT * 2],
    [ox + 92 + armSwingFront * 0.66 + rightForearmPush * 0.6, oy + 100 - attackT * 2],
    [ox + 85 + armSwingFront * 0.6 + rightForearmPush * 0.45, oy + 90 - attackT * 3],
  ]);

  fillShape("#7a563f", [
    [ox + 35, oy + 4 + idleHeadFloat],
    [ox + 49, oy - 1 + idleHeadFloat],
    [ox + 64, oy + 4 + idleHeadFloat],
    [ox + 66, oy + 16 + idleHeadFloat],
    [ox + 60, oy + 20 + idleHeadFloat],
    [ox + 41, oy + 20 + idleHeadFloat],
    [ox + 34, oy + 16 + idleHeadFloat],
  ]);

  fillShape("#8f6748", [
    [ox + 14, oy + 34],
    [ox + 31, oy + 24],
    [ox + 82, oy + 24],
    [ox + 95, oy + 34],
    [ox + 91, oy + 49],
    [ox + 74, oy + 60],
    [ox + 27, oy + 60],
    [ox + 12, oy + 48],
  ]);

  fillShape("#b6936d", [
    [ox + 31, oy + 31],
    [ox + 72, oy + 31],
    [ox + 76, oy + 37],
    [ox + 71, oy + 53],
    [ox + 38, oy + 53],
    [ox + 29, oy + 40],
  ]);

  if (crystalReady) {
    const crystalGlow = 10 + Math.sin(time * 0.012) * 2.8 + player.core * 1.6;
    ctx.save();
    ctx.globalAlpha = 0.72;
    ctx.shadowColor = "rgba(245, 181, 214, 0.95)";
    ctx.shadowBlur = crystalGlow;
    ctx.drawImage(crystalCanvas, ox + 45, oy + 30, 18, 20);
    ctx.restore();
  }

  fillShape("#7d5a40", [
    [ox + 39, oy + 64],
    [ox + 58, oy + 64],
    [ox + 55, oy + 72],
    [ox + 42, oy + 72],
  ]);

  fillShape("#6f4d38", [
    [ox + 18, oy + 28],
    [ox + 7 + armSwingBack * 0.25, oy + 36],
    [ox + 2 + armSwingBack * 0.45, oy + 54],
    [ox + 7 + armSwingBack * 0.7, oy + 84],
    [ox + 20 + armSwingBack * 0.55, oy + 82],
    [ox + 25, oy + 45],
  ]);

  fillShape("#d0b28a", [
    [ox + 0 + armSwingBack * 0.72, oy + 84],
    [ox + 19 + armSwingBack * 0.64, oy + 84],
    [ox + 22 + armSwingBack * 0.68, oy + 95],
    [ox + 18 + armSwingBack * 0.68, oy + 100],
    [ox + 3 + armSwingBack * 0.7, oy + 99],
    [ox - 2 + armSwingBack * 0.76, oy + 91],
  ]);

  fillShape("#6d4b37", [
    [ox + 59, oy + 86 + idleLegFloat],
    [ox + 69 + legSwingBack * 0.34, oy + 84 + idleLegFloat],
    [ox + 73 + legSwingBack * 0.62, oy + 118 + idleLegFloat],
    [ox + 62 + legSwingBack * 0.48, oy + 122 + idleLegFloat],
    [ox + 57 + legSwingBack * 0.16, oy + 99 + idleLegFloat],
  ]);

  fillShape("#8b6448", [
    [ox + 27 + legSwingFront * 0.42, oy + 116 + idleLegFloat],
    [ox + 45 + legSwingFront * 0.56, oy + 114 + idleLegFloat],
    [ox + 48 + legSwingFront * 0.7, oy + 132 + idleLegFloat],
    [ox + 28 + legSwingFront * 0.44, oy + 133 + idleLegFloat],
    [ox + 21 + legSwingFront * 0.28, oy + 125 + idleLegFloat],
  ]);

  fillShape("#8b6448", [
    [ox + 57 + legSwingBack * 0.42, oy + 116 + idleLegFloat],
    [ox + 75 + legSwingBack * 0.56, oy + 114 + idleLegFloat],
    [ox + 79 + legSwingBack * 0.7, oy + 132 + idleLegFloat],
    [ox + 60 + legSwingBack * 0.44, oy + 133 + idleLegFloat],
    [ox + 52 + legSwingBack * 0.28, oy + 125 + idleLegFloat],
  ]);

  fillShape("#6f4e39", [
    [ox + 35, oy + 74],
    [ox + 64, oy + 74],
    [ox + 67, oy + 80],
    [ox + 63, oy + 89],
    [ox + 38, oy + 89],
    [ox + 31, oy + 80],
  ]);

  fillShape("#7f5b42", [
    [ox + 34, oy + 86 + idleLegFloat],
    [ox + 44 + legSwingFront * 0.34, oy + 84 + idleLegFloat],
    [ox + 46 + legSwingFront * 0.62, oy + 117 + idleLegFloat],
    [ox + 35 + legSwingFront * 0.48, oy + 122 + idleLegFloat],
    [ox + 30 + legSwingFront * 0.16, oy + 99 + idleLegFloat],
  ]);

  fillShape("#c4a179", [
    [ox + 30 + legSwingFront * 0.44, oy + 118 + idleLegFloat],
    [ox + 44 + legSwingFront * 0.54, oy + 117 + idleLegFloat],
    [ox + 47 + legSwingFront * 0.58, oy + 120 + idleLegFloat],
    [ox + 47 + legSwingFront * 0.56, oy + 126 + idleLegFloat],
    [ox + 44 + legSwingFront * 0.52, oy + 129 + idleLegFloat],
    [ox + 32 + legSwingFront * 0.42, oy + 129 + idleLegFloat],
    [ox + 29 + legSwingFront * 0.4, oy + 126 + idleLegFloat],
    [ox + 28 + legSwingFront * 0.4, oy + 121 + idleLegFloat],
  ]);

  fillShape("#c4a179", [
    [ox + 60 + legSwingBack * 0.44, oy + 118 + idleLegFloat],
    [ox + 74 + legSwingBack * 0.54, oy + 117 + idleLegFloat],
    [ox + 77 + legSwingBack * 0.58, oy + 120 + idleLegFloat],
    [ox + 77 + legSwingBack * 0.56, oy + 126 + idleLegFloat],
    [ox + 74 + legSwingBack * 0.52, oy + 129 + idleLegFloat],
    [ox + 62 + legSwingBack * 0.42, oy + 129 + idleLegFloat],
    [ox + 59 + legSwingBack * 0.4, oy + 126 + idleLegFloat],
    [ox + 58 + legSwingBack * 0.4, oy + 121 + idleLegFloat],
  ]);

  ctx.fillStyle = "#d7c5bb";
  ctx.beginPath();
  ctx.arc(ox + 49, oy + 11 + idleHeadFloat, 1.8, 0, Math.PI * 2);
  ctx.arc(ox + 56, oy + 10 + idleHeadFloat, 1.8, 0, Math.PI * 2);
  ctx.fill();

  if (player.attackTimer > 0) {
    const punchX = player.facing === 1
      ? ox + 114 + armSwingFront * 0.76 + rightForearmPush
      : ox - 2 + armSwingBack * 0.76 - attackT * 18;
    const punchY = player.facing === 1 ? oy + 91 - attackT * 2 : oy + 91;

    ctx.strokeStyle = "rgba(255, 228, 236, 0.92)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(punchX - player.facing * 10, punchY - 10);
    ctx.lineTo(punchX + player.facing * 13, punchY);
    ctx.lineTo(punchX - player.facing * 10, punchY + 10);
    ctx.stroke();

    ctx.fillStyle = "rgba(244, 201, 221, 0.98)";
    ctx.beginPath();
    ctx.moveTo(punchX + player.facing * 18, punchY);
    ctx.lineTo(punchX + player.facing * 7, punchY - 9);
    ctx.lineTo(punchX + player.facing * 2, punchY);
    ctx.lineTo(punchX + player.facing * 7, punchY + 9);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgba(255, 244, 248, 0.9)";
    ctx.beginPath();
    ctx.arc(punchX + player.facing * 10, punchY, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawParticles(cameraX) {
  for (const particle of particles) {
    ctx.globalAlpha = Math.max(0, particle.life / 40);
    ctx.fillStyle = particle.color;
    ctx.fillRect(particle.x - cameraX, particle.y, particle.size, particle.size);
  }
  ctx.globalAlpha = 1;
}

function drawInstruction() {
  ctx.fillStyle = "rgba(255, 240, 247, 0.9)";
  ctx.font = "18px Georgia";
  ctx.fillText("J ile yumruk at, K ile Core Pulse patlat", 28, 42);
  ctx.fillStyle = "rgba(233, 190, 211, 0.72)";
  ctx.font = "15px Georgia";
  const line = levelWon
    ? "R ile yeniden başlat, Sanctum temizlendi"
    : "Dört shard topla, altar hattını temizle ve çekirdeği uyandır";
  ctx.fillText(line, 28, 68);
}

function render(time) {
  const cameraX = Math.max(0, Math.min(world.width - canvas.width, player.x - canvas.width * 0.38));
  const shakeX = shake > 0 ? (Math.random() - 0.5) * shake : 0;
  const shakeY = shake > 0 ? (Math.random() - 0.5) * shake : 0;

  ctx.save();
  ctx.translate(shakeX, shakeY);

  drawBackground(cameraX);
  drawEnvironment(cameraX);
  drawShards(cameraX, time);
  drawEnemies(cameraX);
  drawExit(cameraX, time);
  drawPlayer(cameraX, time);
  drawParticles(cameraX);
  drawInstruction();

  ctx.restore();

  if (shake > 0) shake *= 0.82;
}

function tick(time = 0) {
  const delta = time - lastTime;
  lastTime = time;
  if (delta > 80) {
    requestAnimationFrame(tick);
    return;
  }

  updatePlayer();
  updateParticles();
  updateHud();
  render(time);

  requestAnimationFrame(tick);
}

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if ([" ", "spacebar", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) {
    event.preventDefault();
  }
  keys.add(key);

  if ((key === " " || key === "spacebar") && player.grounded) {
    player.vy = player.jump;
    player.grounded = false;
    spawnParticles(player.x + player.w / 2, player.y + player.h, "#c39977", 8, 1.3);
  }

  if (key === "j") performAttack();
  if (key === "k") performCorePulse();
  if (key === "r") {
    loadLevel(0, "Run yeniden başladı", { health: 5, core: 0, facing: 1 });
  }
});

window.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();
  if ([" ", "spacebar", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) {
    event.preventDefault();
  }
  keys.delete(key);
});

updateHud();
loadLevel(0);
tick();
