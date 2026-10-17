(() => {
"use strict";
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const pick = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ---------- data ---------- */
const LEVELS = [
 ["Privet Drive", "Owls swarm over the Dursleys' house. He Who Must Not Be Named has found Harry!"],
 ["Diagon Alley", "Dark smoke rolls down the cobbles. Harry and his friends are hiding in a wand shop."],
 ["The Hogwarts Express", "The train stops on the viaduct. A dark shadow creeps along the roof."],
 ["The Great Hall", "The candles go out. Harry's friends are trapped under the tables!"],
 ["The Potions Dungeon", "Green smoke fills the room. Ron is stuck behind the cauldrons."],
 ["The Charms Classroom", "Books and feathers spin out of control. Hermione needs help!"],
 ["The Moving Staircases", "The stairs swing wildly. Neville is hanging on to the banister!"],
 ["Hagrid's Hut", "Hagrid's pumpkins are burning. Harry is inside!"],
 ["The Forbidden Forest", "The trees are alive with shadows. Luna is lost between the spiders."],
 ["The Quidditch Pitch", "A dark storm swallows the pitch. Ginny is up in the air with no broom!"],
 ["The Library", "The Restricted Section is open. Hermione is trapped behind the shelves."],
 ["The Astronomy Tower", "The Dark Mark glows above the tower. Harry is at the very top!"],
 ["The Greenhouses", "The plants have gone wild. Neville cannot get out."],
 ["The Black Lake", "The water boils. Ron's boat is sinking."],
 ["The Room of Requirement", "The room is full of dark magic. Luna and Ginny cannot find the door."],
 ["The Chamber of Secrets", "A huge shadow slides through the pipes. Harry needs you right now!"],
 ["The Divination Tower", "The crystal balls shatter. Hermione is surrounded."],
 ["Hogsmeade Village", "Snow turns black. Everybody in the village is hiding."],
 ["The Ministry of Magic", "The fountain is frozen. Harry and Ron are cornered."],
 ["The Battle at Hogwarts", "This is it! He Who Must Not Be Named stands on the bridge. Save Harry and his friends!"],
];
const SUBJECTS = { maths: ["🔢", "Maths"], science: ["🔬", "Science"], english: ["📖", "English"], phonics: ["🔤", "Phonics"], history: ["🏰", "History"] };
const SPELLS = [
 { id: "stupefy", n: "Stupefy", e: "⚡", d: "Red bolt", fx: "bolt", c: ["#ff3b3b", "#ffb0b0"] },
 { id: "expelliarmus", n: "Expelliarmus", e: "🔴", d: "Disarm blast", fx: "bolt", c: ["#ff7a1a", "#ffe08a"], big: 1 },
 { id: "lumos", n: "Lumos Maxima", e: "💡", d: "Blinding light", fx: "flash", c: ["#ffffff", "#fff3a0"] },
 { id: "patronus", n: "Expecto Patronum", e: "🦌", d: "Silver Patronus", fx: "patronus", c: ["#cfe9ff", "#ffffff"] },
 { id: "incendio", n: "Incendio", e: "🔥", d: "Stream of fire", fx: "stream", c: ["#ff4a00", "#ffd000"], up: 1 },
 { id: "aguamenti", n: "Aguamenti", e: "💧", d: "Water jet", fx: "stream", c: ["#3aa0ff", "#c8ecff"] },
 { id: "glacius", n: "Glacius", e: "❄️", d: "Freezes him", fx: "bolt", c: ["#a8e8ff", "#ffffff"], boss: "ice" },
 { id: "petrificus", n: "Petrificus Totalus", e: "🗿", d: "Turns to stone", fx: "bolt", c: ["#bbbbbb", "#777777"], boss: "grey" },
 { id: "leviosa", n: "Wingardium Leviosa", e: "🪶", d: "Lifts him up", fx: "sparkle", c: ["#ffe27a", "#ffffff"], boss: "lift" },
 { id: "riddikulus", n: "Riddikulus", e: "🎉", d: "Makes him silly", fx: "confetti", c: ["#ff5ec7", "#5effa1", "#5ec7ff", "#ffe25e"], boss: "pink" },
 { id: "bombarda", n: "Bombarda", e: "💥", d: "Big explosion", fx: "bolt", c: ["#ffd23a", "#ff5a1a"], big: 2 },
 { id: "protego", n: "Protego", e: "🛡️", d: "Shield blast", fx: "shield", c: ["#6aa8ff", "#d6e8ff"] },
 { id: "accio", n: "Accio", e: "🧲", d: "Pulls his power away", fx: "accio", c: ["#ffd23a", "#ffffff"] },
 { id: "reducto", n: "Reducto", e: "☄️", d: "Shatter", fx: "bolt", c: ["#7a5cff", "#e0d6ff"], big: 1 },
];
const PETS = [
 { id: "owl", n: "Snowy Owl", at: 0, p: "swap", pd: "Swap the question" },
 { id: "niffler", n: "Niffler", at: 3, p: "fifty", pd: "Take away 2 wrong answers" },
 { id: "crookshanks", n: "Crookshanks", at: 5, p: "fifty", pd: "Take away 2 wrong answers" },
 { id: "kneazle", n: "Kneazle", at: 7, p: "fifty", pd: "Take away 2 wrong answers" },
 { id: "hippogriff", n: "Hippogriff", at: 9, p: "swap", pd: "Swap the question" },
 { id: "thestral", n: "Thestral", at: 12, p: "swap", pd: "Swap the question" },
 { id: "dragon", n: "Baby Dragon", at: 15, p: "fifty", pd: "Take away 2 wrong answers" },
 { id: "phoenix", n: "Phoenix", at: 18, p: "life", pd: "Brings you back if you are wrong" },
];
const BOOK = [["harry", "Harry"], ["hermione", "Hermione"], ["ron", "Ron"], ["luna", "Luna"], ["neville", "Neville"], ["ginny", "Ginny"]];
const SKIN = ["#ffe0c8", "#f1c27d", "#d9a066", "#b9773f", "#8d5524", "#5c3a1e"];
const HAIR = ["#1b1b1b", "#4a2c12", "#9a5b24", "#e0b24a", "#c8321e", "#e8e8f0", "#7a3cff", "#ff5ec7"];
const STYLES = [["short", "Short"], ["long", "Long"], ["curly", "Curly"], ["bun", "Bun"]];
const HOUSES = {
 gryffindor: { n: "Gryffindor", c1: "#7f0909", c2: "#d3a625", e: "🦁" },
 hufflepuff: { n: "Hufflepuff", c1: "#e8b800", c2: "#222222", e: "🦡" },
 ravenclaw: { n: "Ravenclaw", c1: "#0e1a40", c2: "#946b2d", e: "🦅" },
 slytherin: { n: "Slytherin", c1: "#1a472a", c2: "#aaaaaa", e: "🐍" },
};
const HAT_QS = [
 ["Hmm, a new mind. What do you love most?", [["Daring adventures", "gryffindor"], ["Being kind to friends", "hufflepuff"], ["Learning new things", "ravenclaw"], ["Winning and being the best", "slytherin"]]],
 ["Ah, and what would you do if a friend was in danger?", [["Charge in to help", "gryffindor"], ["Stay by their side", "hufflepuff"], ["Make a clever plan", "ravenclaw"], ["Find the quickest way", "slytherin"]]],
 ["Last one. Pick a magical thing.", [["A flying broomstick", "gryffindor"], ["A garden of magic plants", "hufflepuff"], ["A library with every book", "ravenclaw"], ["A secret hidden room", "slytherin"]]],
];

/* ---------- state ---------- */
const SAVE = "freyaPotterV1";
let save = { char: null, house: null, best: 0, wins: 0 };
try { Object.assign(save, JSON.parse(localStorage.getItem(SAVE) || "{}")); } catch (e) {}
const store = () => { try { localStorage.setItem(SAVE, JSON.stringify(save)); } catch (e) {} };
let char = { type: "own", name: "", skin: SKIN[1], hair: HAIR[1], style: "short", glasses: false, book: null };
let house = "gryffindor", pet = "owl";
let run = null;

/* ---------- sound ---------- */
let muted = false, ac = null;
function beep(freqs, dur = 0.12, type = "sine", vol = 0.12) {
  if (muted) return;
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    freqs.forEach((f, i) => {
      const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime + i * dur;
      o.type = type; o.frequency.value = f; g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + dur);
    });
  } catch (e) {}
}
const cache = {};
function sfx(name, vol = 0.8, fallback) {
  if (muted) return;
  try { const a = cache[name] || (cache[name] = new Audio(`audio/${name}.mp3`)); const b = a.cloneNode(); b.volume = vol; b.play().catch(() => fallback && fallback()); } catch (e) { fallback && fallback(); }
}
let track = null, trackName = "";
function music(name, loop = true) {
  if (name === trackName) return; trackName = name;
  if (track) { const old = track; let v = old.volume; const f = setInterval(() => { v -= 0.05; if (v <= 0) { old.pause(); clearInterval(f); } else old.volume = v; }, 60); }
  track = new Audio(`audio/${name}.mp3`); track.loop = loop; track.volume = muted ? 0 : 0.35; track.play().catch(() => { trackName = ""; });
}
const sRight = () => sfx("sfx_right", 0.8, () => beep([523, 659, 784, 1047], 0.1, "triangle"));
const sWrong = () => sfx("sfx_wrong", 0.8, () => beep([300, 220, 160], 0.2, "sawtooth", 0.1));
const sCast = s => sfx(SFXMAP[s.id] || "sfx_bolt");
const SFXMAP = { stupefy: "sfx_bolt", expelliarmus: "sfx_bolt", reducto: "sfx_bolt", bombarda: "sfx_explosion", incendio: "sfx_fire", aguamenti: "sfx_water", lumos: "sfx_light", patronus: "sfx_patronus", protego: "sfx_shield", glacius: "sfx_ice", petrificus: "sfx_stone", riddikulus: "sfx_confetti", leviosa: "sfx_levitate", accio: "sfx_accio" };
const sClick = () => beep([660], 0.05, "triangle", 0.06);
$("#mute").onclick = () => { muted = !muted; $("#mute").textContent = muted ? "🔇" : "🔊"; if (track) track.volume = muted ? 0 : 0.35; if (muted) { try { speechSynthesis.cancel(); } catch (e) {} } };
document.addEventListener("click", e => { if (!trackName) music("music_menu"); if (e.target.closest("button")) sClick(); }, true);

/* ---------- screens ---------- */
function show(id) { $$(".screen").forEach(s => s.hidden = s.id !== id); window.scrollTo(0, 0); music(id === "s-level" ? "music_play" : id === "s-win" ? "music_win" : "music_menu", id !== "s-win"); }
function setHouse(h) {
  const H = HOUSES[h]; document.documentElement.style.setProperty("--house", H.c1); document.documentElement.style.setProperty("--house2", H.c2);
}

/* ---------- avatar ---------- */
function avatarSVG(c, robe = "#2a2a3a") {
  const hair = c.hair, skin = c.skin;
  const back = { short: "", long: `<path d="M50 90 Q40 190 70 200 L130 200 Q160 190 150 90 Z" fill="${hair}"/>`, curly: `<g fill="${hair}"><circle cx="50" cy="85" r="26"/><circle cx="150" cy="85" r="26"/><circle cx="60" cy="125" r="20"/><circle cx="140" cy="125" r="20"/></g>`, bun: `<circle cx="100" cy="18" r="22" fill="${hair}"/>` }[c.style];
  const front = { short: `<path d="M52 85 Q55 35 100 35 Q145 35 148 85 Q130 55 100 58 Q70 55 52 85Z" fill="${hair}"/>`, long: `<path d="M52 90 Q52 33 100 33 Q148 33 148 90 Q128 56 100 58 Q72 56 52 90Z" fill="${hair}"/>`, curly: `<g fill="${hair}"><circle cx="70" cy="48" r="22"/><circle cx="100" cy="40" r="24"/><circle cx="130" cy="48" r="22"/><circle cx="55" cy="72" r="14"/><circle cx="145" cy="72" r="14"/></g>`, bun: `<path d="M52 85 Q55 35 100 35 Q145 35 148 85 Q130 55 100 58 Q70 55 52 85Z" fill="${hair}"/>` }[c.style];
  const gl = c.glasses ? `<g fill="none" stroke="#222" stroke-width="4"><circle cx="78" cy="92" r="14"/><circle cx="122" cy="92" r="14"/><path d="M92 92h16"/></g>` : "";
  return `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">${back}
  <path d="M25 240 Q30 150 100 145 Q170 150 175 240Z" fill="${robe}"/><path d="M85 148 L100 190 L115 148Z" fill="#fff8"/>
  <rect x="88" y="125" width="24" height="30" fill="${skin}"/>
  <ellipse cx="100" cy="90" rx="48" ry="52" fill="${skin}"/>${front}
  <circle cx="78" cy="92" r="5" fill="#222"/><circle cx="122" cy="92" r="5" fill="#222"/>
  <path d="M82 118 Q100 134 118 118" stroke="#a33" stroke-width="4" fill="none" stroke-linecap="round"/>
  <circle cx="68" cy="110" r="7" fill="#ff8a8a55"/><circle cx="132" cy="110" r="7" fill="#ff8a8a55"/>${gl}</svg>`;
}
function renderAvatar() { $("#avatar").innerHTML = avatarSVG(char); }
function swatches(el, list, key, labelFn) {
  el.innerHTML = "";
  list.forEach(v => {
    const val = Array.isArray(v) ? v[0] : v;
    const b = document.createElement("button"); b.type = "button";
    if (labelFn) { b.textContent = labelFn(v); b.classList.add("txt"); } else b.style.background = val;
    b.setAttribute("aria-label", String(val));
    b.onclick = () => { char[key] = val; $$("button", el).forEach(x => x.classList.remove("on")); b.classList.add("on"); renderAvatar(); };
    if (char[key] === val) b.classList.add("on");
    el.appendChild(b);
  });
}

/* ---------- make character ---------- */
function startMake() {
  show("s-make");
  swatches($("#sw-skin"), SKIN, "skin"); swatches($("#sw-hair"), HAIR, "hair"); swatches($("#sw-style"), STYLES, "style", v => v[1]);
  $("#glasses").checked = char.glasses; renderAvatar();
  $("#book-grid").innerHTML = BOOK.map(([id, n]) => `<button class="card" data-b="${id}"><img src="img/ch_${id}.jpg" alt="${n}"><span>${n}</span></button>`).join("");
  $$("#book-grid .card").forEach(b => b.onclick = () => { char.type = "book"; char.book = b.dataset.b; char.name = BOOK.find(x => x[0] === char.book)[1]; $$("#book-grid .card").forEach(x => x.classList.toggle("on", x === b)); });
}
$("#glasses").onchange = e => { char.glasses = e.target.checked; renderAvatar(); };
$$(".tab").forEach(t => t.onclick = () => {
  $$(".tab").forEach(x => x.classList.toggle("on", x === t));
  $("#own").hidden = t.dataset.tab !== "own"; $("#book").hidden = t.dataset.tab !== "book";
  char.type = t.dataset.tab === "own" ? "own" : "book";
});
$("#b-new").onclick = startMake;
$("#b-make-next").onclick = () => {
  if (char.type === "own") { char.name = $("#name").value.trim() || "Young Wizard"; char.book = null; }
  else if (!char.book) { alert("Pick a character first!"); return; }
  startSort();
};

/* ---------- sorting ---------- */
function startSort() {
  show("s-sort"); $("#house-result").hidden = true; $("#hat-opts").hidden = false;
  const tally = {}; let i = 0;
  const ask = () => {
    if (i >= HAT_QS.length) return done();
    const [q, opts] = HAT_QS[i];
    $("#hat-say").textContent = (i === 0 ? `Hmm, ${char.name}... ` : "") + q;
    $("#hat-opts").innerHTML = ""; shuffle(opts).forEach(([t, h]) => {
      const b = document.createElement("button"); b.className = "ans"; b.textContent = t;
      b.onclick = () => { tally[h] = (tally[h] || 0) + 1; i++; ask(); }; $("#hat-opts").appendChild(b);
    });
  };
  const done = () => {
    const max = Math.max(...Object.values(tally)); house = pick(Object.keys(tally).filter(h => tally[h] === max));
    $("#hat-opts").hidden = true; $("#hat-say").textContent = "Hmmmmm... I know just where to put you..."; sfx("sfx_hat");
    setTimeout(() => {
      const H = HOUSES[house]; setHouse(house);
      $("#hat-say").textContent = `${H.n.toUpperCase()}!`; $("#crest").textContent = H.e; $("#house-name").textContent = `Welcome to ${H.n}, ${char.name}!`;
      $("#house-result").hidden = false; sRight();
    }, 1800);
  };
  ask();
}
$("#b-sort-next").onclick = startPets;

/* ---------- pets ---------- */
function startPets() {
  show("s-pet"); pet = "owl";
  $("#pet-note").textContent = `Your best level so far: ${save.best}. Reach new levels to unlock more pets.`;
  $("#pet-grid").innerHTML = PETS.map(p => {
    const open = save.best >= p.at;
    return `<button class="card ${open ? "" : "locked"} ${p.id === pet ? "on" : ""}" data-p="${p.id}" ${open ? "" : "disabled"}><img src="img/pet_${p.id}.jpg" alt="${p.n}"><b>${p.n}</b><small>${open ? p.pd : "Reach level " + p.at}</small></button>`;
  }).join("");
  $$("#pet-grid .card").forEach(b => b.onclick = () => { pet = b.dataset.p; $$("#pet-grid .card").forEach(x => x.classList.toggle("on", x === b)); $("#b-pet-next").disabled = false; });
  $("#b-pet-next").disabled = true; $$("#pet-grid .card")[0].click();
}
$("#b-pet-next").onclick = () => { save.char = char; save.house = house; store(); startRun(); };

/* ---------- run ---------- */
function startRun() {
  const P = PETS.find(p => p.id === pet);
  run = { level: 1, used: new Set(), charges: 1, power: P.p, spell: null, subject: "maths", q: null, retried: false };
  if (char.type === "book") $("#hero").src = `img/ch_${char.book}.jpg`;
  $("#hero").classList.toggle("svg", char.type === "own");
  if (char.type === "own") $("#hero").src = "data:image/svg+xml;utf8," + encodeURIComponent(avatarSVG(char, HOUSES[house].c1));
  $("#pet-hud").innerHTML = `<img src="img/pet_${pet}.jpg" alt="${P.n}"><span id="charges"></span>`;
  show("s-level"); beginLevel();
}
function beginLevel() {
  const L = run.level, [name, story] = LEVELS[L - 1];
  $("#stage-img").src = `img/l${String(L).padStart(2, "0")}.jpg`;
  $("#stage").classList.remove("dark"); const b = $("#boss-img"); b.className = ""; b.style.transform = "";
  $("#lvl-label").textContent = `Level ${L} of 20: ${name}`;
  $("#bosshp i").style.width = `${100 - ((L - 1) / 20) * 100}%`;
  $("#story").textContent = story; updateCharges();
  [$("#p-subject"), $("#p-spell"), $("#p-q"), $("#p-msg")].forEach(x => x.hidden = true);
  if (L > save.best) { save.best = L; store(); }
  if (L === 1) { run.subject = "maths"; $("#story").textContent += " Level 1 is always maths."; chooseSpell(); }
  else {
    $("#p-subject").hidden = false; $("#subjects").innerHTML = "";
    Object.entries(SUBJECTS).forEach(([k, [e, n]]) => {
      const bt = document.createElement("button"); bt.className = "subj"; bt.innerHTML = `${e}<br>${n}`;
      bt.onclick = () => { run.subject = k; $("#p-subject").hidden = true; chooseSpell(); }; $("#subjects").appendChild(bt);
    });
  }
}
function updateCharges() {
  const P = PETS.find(p => p.id === pet);
  const el = $("#charges"); if (el) el.textContent = `x${run.charges}`;
  const bt = $("#b-pow"); bt.textContent = `${{ fifty: "✂️", swap: "🔄", life: "🔥" }[run.power]} ${P.n}: ${P.pd} (x${run.charges})`;
  bt.disabled = run.charges <= 0 || run.power === "life";
  bt.title = run.power === "life" ? "Works by itself if you get a question wrong" : "";
}
function chooseSpell() {
  $("#p-spell").hidden = false;
  $("#spells").innerHTML = SPELLS.map(s => `<button class="spell" data-s="${s.id}"><span>${s.e}</span><b>${s.n}</b>${s.d}</button>`).join("");
  $$("#spells .spell").forEach(b => b.onclick = () => { run.spell = SPELLS.find(s => s.id === b.dataset.s); $("#p-spell").hidden = true; askQuestion(); });
}
function nextQuestion() {
  let pool = window.QUESTIONS.filter(q => q.s === run.subject && !run.used.has(q));
  if (!pool.length) { run.used.clear(); pool = window.QUESTIONS.filter(q => q.s === run.subject); }
  const q = pick(pool); run.used.add(q); return q;
}
function askQuestion(q) {
  run.q = q || nextQuestion(); const Q = run.q;
  $("#p-q").hidden = false;
  $("#q-sub").textContent = `${SUBJECTS[Q.s][0]} ${SUBJECTS[Q.s][1]}`;
  $("#q-text").textContent = Q.q;
  const box = $("#answers"); box.innerHTML = "";
  shuffle(Q.o).forEach(o => {
    const b = document.createElement("button"); b.className = "ans"; b.textContent = o; b.onclick = () => answer(b, o); box.appendChild(b);
  });
  updateCharges(); sayQ();
}
function sayQ() { try { if (muted || !window.speechSynthesis) return; } catch (e) {} }
$("#b-say").onclick = () => { try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance($("#q-text").textContent + ". " + $$("#answers .ans:not(.gone)").map(b => b.textContent).join(". ")); u.lang = "en-GB"; u.rate = .9; speechSynthesis.speak(u); } catch (e) {} };
$("#b-pow").onclick = () => {
  if (run.charges <= 0) return;
  if (run.power === "swap") { run.charges--; askQuestion(); }
  else if (run.power === "fifty") {
    run.charges--; const wrong = $$("#answers .ans").filter(b => b.textContent !== run.q.a);
    shuffle(wrong).slice(0, 2).forEach(b => b.classList.add("gone")); updateCharges();
  }
};
let busy = false;
async function answer(btn, val) {
  if (busy) return; busy = true;
  const good = val === run.q.a; $$("#answers .ans").forEach(b => b.disabled = true);
  if (good) {
    btn.classList.add("right"); sRight(); await sleep(500); await castSpell(run.spell); await afterWin();
  } else {
    btn.classList.add("wrong"); $$("#answers .ans").find(b => b.textContent === run.q.a).classList.add("right"); sWrong();
    if (run.power === "life" && run.charges > 0 && !run.retried) {
      run.charges--; run.retried = true; banner("Phoenix tears! Try again"); sfx("sfx_phoenix"); await sleep(1800);
      busy = false; run.q.o = run.q.o.filter(o => o !== val); askQuestion(run.q); updateCharges(); return;
    }
    $("#stage").classList.add("dark"); banner("Defeated!"); await sleep(600); lose();
  }
  busy = false;
}
function banner(t) { const b = $("#stage-banner"); b.textContent = t; b.classList.add("show"); setTimeout(() => b.classList.remove("show"), 1600); }
async function afterWin() {
  $("#p-q").hidden = true; run.retried = false;
  const boss = $("#boss-img"); boss.classList.add("gone");
  $("#bosshp i").style.width = `${100 - (run.level / 20) * 100}%`;
  if (run.level === 20) { banner("He is gone for ever!"); await sleep(2200); return win(); }
  banner(pick(["He retreats!", "Well cast!", "Brilliant!", "Harry is safe!", "Fantastic!"]));
  if ([6, 11, 16].includes(run.level)) run.charges++;
  const np = PETS.find(p => p.at === run.level + 1 && p.at > save.best - 1);
  $("#p-msg").hidden = false;
  $("#msg").textContent = `Level ${run.level} complete! ` + (np && np.at > 0 ? `Reach the next level to unlock the ${np.n} for your next run.` : "On to the next place...");
  $("#b-msg").textContent = "Next level"; $("#b-msg").onclick = () => { run.level++; beginLevel(); };
  if (run.level + 1 > save.best) { save.best = run.level + 1; store(); }
}
function lose() {
  $("#p-q").hidden = true; $("#p-msg").hidden = false;
  $("#msg").innerHTML = `Oh no! The right answer was <b>${run.q.a}</b>.<br>He Who Must Not Be Named wins this time. You start again at level 1. Your pets stay unlocked.`;
  $("#b-msg").textContent = "Try again"; $("#b-msg").onclick = () => { $("#p-msg").hidden = true; startPets(); };
}

/* ---------- spell effects ---------- */
const cv = $("#fx"), cx = cv.getContext("2d");
let parts = [], raf = 0;
function fit() { const r = $("#stage").getBoundingClientRect(); cv.width = r.width * devicePixelRatio; cv.height = r.height * devicePixelRatio; cx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0); }
addEventListener("resize", fit);
const W = () => cv.width / devicePixelRatio, H = () => cv.height / devicePixelRatio;
function P(o) { parts.push(Object.assign({ x: 0, y: 0, vx: 0, vy: 0, g: 0, life: 40, max: 40, s: 4, c: "#fff", glow: 1, em: null }, o, { max: o.life || 40 })); }
function tick() {
  cx.clearRect(0, 0, W(), H());
  parts = parts.filter(p => p.life > 0);
  for (const p of parts) {
    p.x += p.vx; p.y += p.vy; p.vy += p.g; p.life--;
    const a = Math.max(0, p.life / p.max); cx.globalAlpha = a;
    if (p.em) { cx.font = `${p.s}px serif`; cx.textAlign = "center"; cx.fillText(p.em, p.x, p.y); }
    else { cx.fillStyle = p.c; if (p.glow) { cx.shadowColor = p.c; cx.shadowBlur = 14; } cx.beginPath(); cx.arc(p.x, p.y, p.s * (0.4 + a * 0.6), 0, 7); cx.fill(); cx.shadowBlur = 0; }
  }
  cx.globalAlpha = 1;
  if (parts.length || fxFns.length) { fxFns = fxFns.filter(f => f()); raf = requestAnimationFrame(tick); } else raf = 0;
}
let fxFns = [];
function run_(fn) { fxFns.push(fn); if (!raf) raf = requestAnimationFrame(tick); }
const frames = n => new Promise(res => { let i = 0; run_(() => { i++; if (i >= n) { res(); return false; } return true; }); });
function burst(x, y, cols, n = 50, sp = 6, life = 40) { for (let i = 0; i < n; i++) { const a = Math.random() * 7, v = Math.random() * sp; P({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: life * (0.5 + Math.random()), s: 3 + Math.random() * 5, c: pick(cols) }); } }
const hero = () => ({ x: W() * 0.2, y: H() * 0.78 }), bossPos = () => ({ x: W() * 0.79, y: H() * 0.3 });

async function castSpell(s) {
  fit(); sCast(s); const h = hero(), b = bossPos(), boss = $("#boss-img");
  const react = () => { boss.classList.add("shake"); setTimeout(() => boss.classList.remove("shake"), 600); };
  banner(s.n + "!");
  if (s.fx === "bolt") {
    let t = 0; const N = 28;
    await new Promise(res => run_(() => { t++; const k = t / N, x = h.x + (b.x - h.x) * k, y = h.y + (b.y - h.y) * k - Math.sin(k * Math.PI) * 30;
      for (let i = 0; i < 4; i++) P({ x, y, vx: (Math.random() - .5) * 2, vy: (Math.random() - .5) * 2, life: 25, s: 6 + (s.big || 0) * 3, c: pick(s.c) });
      if (t >= N) { res(); return false; } return true; }));
    burst(b.x, b.y, s.c, 60 + (s.big || 0) * 50, 7 + (s.big || 0) * 3, 45); react();
    if (s.big === 2) { $("#stage").animate([{ transform: "translate(0)" }, { transform: "translate(-8px,6px)" }, { transform: "translate(8px,-6px)" }, { transform: "translate(0)" }], { duration: 400 }); }
    await frames(40);
  } else if (s.fx === "flash") {
    const d = document.createElement("div"); d.style.cssText = "position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none"; $("#stage").appendChild(d);
    await d.animate([{ opacity: 0 }, { opacity: .95 }, { opacity: 0 }], { duration: 1100 }).finished; d.remove();
    burst(b.x, b.y, s.c, 40, 5, 40); react();
  } else if (s.fx === "patronus") {
    const e = hero(); let t = 0; const N = 70;
    await new Promise(res => run_(() => { t++; const k = t / N, x = e.x + (b.x - e.x) * k, y = e.y - 40 - Math.sin(k * Math.PI) * 50;
      for (let i = 0; i < 6; i++) P({ x: x + (Math.random() - .5) * 30, y: y + (Math.random() - .5) * 30, vy: -.3, life: 35, s: 4 + Math.random() * 5, c: pick(s.c) });
      if (t % 1 === 0) P({ x, y, em: "🦌", s: 70, life: 2, max: 2, glow: 0 });
      if (t >= N) { res(); return false; } return true; }));
    burst(b.x, b.y, s.c, 80, 6, 50); react(); await frames(40);
  } else if (s.fx === "stream") {
    let t = 0; const N = 55;
    await new Promise(res => run_(() => { t++; for (let i = 0; i < 8; i++) { const ang = Math.atan2(b.y - h.y, b.x - h.x) + (Math.random() - .5) * .25, v = 7 + Math.random() * 3;
        P({ x: h.x, y: h.y, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v + (s.up ? -1 : 0), g: s.up ? -.05 : .08, life: 40, s: 5 + Math.random() * 6, c: pick(s.c) }); }
      if (t === 25) react(); if (t >= N) { res(); return false; } return true; }));
    await frames(35);
  } else if (s.fx === "sparkle") {
    boss.classList.add("lift"); let t = 0;
    await new Promise(res => run_(() => { t++; P({ x: b.x + (Math.random() - .5) * 200, y: b.y + (Math.random() - .5) * 120, vy: -1.2, life: 40, s: 4 + Math.random() * 4, c: pick(s.c) }); if (t >= 85) { res(); return false; } return true; }));
    boss.classList.remove("lift");
  } else if (s.fx === "confetti") {
    boss.classList.add("pink");
    for (let i = 0; i < 160; i++) P({ x: b.x + (Math.random() - .5) * 120, y: b.y - 40, vx: (Math.random() - .5) * 8, vy: -4 - Math.random() * 6, g: .22, life: 90, s: 4 + Math.random() * 4, c: pick(s.c), glow: 0 });
    for (let i = 0; i < 6; i++) P({ x: b.x + (i - 3) * 30, y: b.y, em: pick(["🤡", "🎈", "🎉", "🤪"]), vy: -1, life: 60, s: 40, glow: 0 });
    await frames(90);
  } else if (s.fx === "shield") {
    let t = 0; const N = 40;
    await new Promise(res => run_(() => { t++; const r = 20 + t * 2.5;
      cx.save(); cx.globalAlpha = Math.max(0, 1 - t / N); cx.strokeStyle = s.c[0]; cx.lineWidth = 8; cx.shadowColor = s.c[1]; cx.shadowBlur = 20; cx.beginPath(); cx.arc(h.x, h.y, r, 0, 7); cx.stroke(); cx.restore();
      if (t >= N) { res(); return false; } return true; }));
    let u = 0; await new Promise(res => run_(() => { u++; const k = u / 20; const x = h.x + (b.x - h.x) * k, y = h.y + (b.y - h.y) * k;
      for (let i = 0; i < 5; i++) P({ x, y, vx: (Math.random() - .5) * 3, vy: (Math.random() - .5) * 3, life: 25, s: 7, c: pick(s.c) }); if (u >= 20) { res(); return false; } return true; }));
    burst(b.x, b.y, s.c, 70, 7, 45); react(); await frames(40);
  } else if (s.fx === "accio") {
    for (let i = 0; i < 14; i++) { const em = pick(["✨", "⭐", "📚", "🪄", "💫"]), sx = b.x + (Math.random() - .5) * 120, sy = b.y + (Math.random() - .5) * 80;
      const dx = (h.x - sx) / 60, dy = (h.y - sy) / 60; P({ x: sx, y: sy, vx: dx, vy: dy, em, s: 34, life: 60, glow: 0 }); }
    react(); await frames(75);
  }
  if (s.boss === "grey" || s.boss === "ice") { boss.classList.add(s.boss); await sleep(500); }
  boss.classList.remove("pink");
}

/* ---------- win & certificate ---------- */
function win() {
  save.wins = (save.wins || 0) + 1; save.best = 20; store(); show("s-win"); drawCert();
}
function drawCert() {
  const c = $("#cert"), g = c.getContext("2d"), w = c.width, h = c.height, H = HOUSES[house];
  g.fillStyle = "#fff8e7"; g.fillRect(0, 0, w, h);
  g.strokeStyle = "#a47a12"; g.lineWidth = 14; g.strokeRect(30, 30, w - 60, h - 60);
  g.strokeStyle = H.c1; g.lineWidth = 6; g.strokeRect(54, 54, w - 108, h - 108);
  g.textAlign = "center"; g.fillStyle = "#3b2b00";
  g.font = "bold 74px Georgia"; g.fillText("Certificate of Magic", w / 2, 190);
  g.font = "34px Georgia"; g.fillText("This is to say that", w / 2, 270);
  g.fillStyle = H.c1; g.font = "bold 112px Georgia"; g.fillText(char.name, w / 2, 410);
  g.fillStyle = "#3b2b00"; g.font = "36px Georgia";
  ["of " + H.n + " House has finished all 20 levels,", "answered every question, and defeated", "He Who Must Not Be Named.", "Harry and his friends are safe!"].forEach((t, i) => g.fillText(t, w / 2, 500 + i * 52));
  g.font = "100px serif"; g.fillText(H.e, w / 2, 770);
  g.font = "28px Georgia"; g.fillText(new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }), w / 2, 880);
  g.font = "italic 26px Georgia"; g.fillText("The Wizard's Challenge, a game by Freya", w / 2, 925);
}
$("#b-print").onclick = () => print();
$("#b-save").onclick = () => { const a = document.createElement("a"); a.download = `certificate-${char.name}.png`; a.href = $("#cert").toDataURL("image/png"); a.click(); };
$("#b-again").onclick = () => startPets();

/* ---------- boot ---------- */
if (save.char) {
  char = save.char; house = save.house || "gryffindor"; setHouse(house);
  $("#b-continue").hidden = false; $("#cont-name").textContent = char.name;
  $("#b-continue").onclick = startPets;
}
})();
