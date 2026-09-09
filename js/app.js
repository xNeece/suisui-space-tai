const intro = document.getElementById("intro");
const app = document.getElementById("app");
const enterButton = document.getElementById("enterButton");
const introVideo = document.getElementById("introVideo");
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const fullscreenToggle = document.getElementById("fullscreenToggle");
const stars = document.getElementById("stars");
const notifications = document.getElementById("notifications");
const liveDate = document.getElementById("liveDate");
const profileVideo = document.querySelector(".profile-video");
const profileVideoFallback = document.querySelector(".profile-video-fallback");

/* ---------- Vídeo WEBM del perfil ---------- */
if (profileVideo && profileVideoFallback) {
  const showVideo = () => {
    profileVideoFallback.classList.add("is-hidden");
    profileVideoFallback.setAttribute("aria-hidden", "true");
  };
  const showVideoFallback = () => {
    profileVideoFallback.classList.remove("is-hidden");
    profileVideoFallback.setAttribute("aria-hidden", "false");
  };
  profileVideo.addEventListener("loadeddata", showVideo);
  profileVideo.addEventListener("canplay", showVideo);
  profileVideo.addEventListener("error", showVideoFallback);
  if (profileVideo.readyState >= 2) showVideo();
}

/* ---------- Fondo de partículas ---------- */
for (let i = 0; i < 80; i++) {
  const s = document.createElement("span");
  s.className = "star";
  s.style.left = `${Math.random() * 100}%`;
  s.style.top = `${Math.random() * 100}%`;
  s.style.opacity = `${0.2 + Math.random() * 0.65}`;
  s.style.animationDuration = `${10 + Math.random() * 24}s`;
  s.style.animationDelay = `${-Math.random() * 24}s`;
  s.style.transform = `scale(${0.5 + Math.random() * 1.5})`;
  stars.appendChild(s);
}

/* ---------- Fecha y hora ---------- */
function updateDate() {
  const now = new Date();
  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(now);
  const parts = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).formatToParts(now);

  const get = type => parts.find(part => part.type === type)?.value ?? "";
  liveDate.textContent = `${weekday}, ${get("day")}/${get("month")}/${get("year")}, ${get("hour")}:${get("minute")}:${get("second")}`;
}
updateDate();
setInterval(updateDate, 1000);

/* ---------- Entrada ---------- */
function enterSpace() {
  if (intro.classList.contains("is-hidden")) return;

  // La música solo se intenta reproducir después de una acción del usuario.
  music.play().catch(() => {
    // Si no hay todavía un music.mp3 válido, la interfaz igualmente continúa.
  });

  musicToggle.textContent = "♫";
  intro.classList.add("is-hidden");
  app.classList.remove("is-hidden");
  document.body.classList.add("space-entered");
}

enterButton.addEventListener("click", enterSpace);

// También permite usar Enter/Espacio cuando el botón tiene el foco.
enterButton.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    enterSpace();
  }
});

/* ---------- Música ----------
 * El icono solo abre/cierra el pequeño reproductor.
 * La reproducción se controla exclusivamente desde el panel.
 */

/* ---------- Pantalla completa ---------- */
fullscreenToggle.addEventListener("click", async () => {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch {}
});

/* ---------- Menú lateral: cambio de interfaz ---------- */
const appRoot = document.getElementById("app");
const contentShell = document.querySelector(".content-shell");

let viewTransitionTimer = null;
let viewTransitionToken = 0;

function changeView(target) {
  const current = appRoot.dataset.view;
  if (!target || target === current) return;

  const token = ++viewTransitionToken;
  if (viewTransitionTimer) clearTimeout(viewTransitionTimer);

  const currentPanel = document.querySelector(`[data-panel="${current}"]`);
  const nextPanel = document.querySelector(`[data-panel="${target}"]`);

  // Primero hacemos salir suavemente la vista actual.
  // Así evitamos el parpadeo que producía cambiar de display:none a display:grid de golpe.
  if (currentPanel) {
    currentPanel.classList.remove("view-leave", "render-enter");
    void currentPanel.offsetWidth;
    currentPanel.classList.add("view-leave");
  }

  viewTransitionTimer = setTimeout(() => {
    if (token !== viewTransitionToken) return;

    appRoot.dataset.view = target;

    if (nextPanel) {
      nextPanel.classList.remove("view-enter", "view-leave", "render-enter");
      void nextPanel.offsetWidth;
      nextPanel.classList.add("view-enter", "render-enter");

      setTimeout(() => {
        if (token === viewTransitionToken) {
          nextPanel.classList.remove("view-enter", "render-enter");
        }
      }, 900);
    }

    if (currentPanel) currentPanel.classList.remove("view-leave");
  }, 190);
}

// Perfil es la pantalla inicial.
appRoot.dataset.view = "profile";

document.querySelectorAll(".nav-item").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    changeView(button.dataset.section);
  });
});

/* ---------- Mensajes flotantes ---------- */
const messages = [
  { name: "Chisa", text: "¡Hola, Suisui! Hace tiempo que no hablamos. ¿Cómo van las cosas? A ver cuándo nos ponemos al día.", avatar: "assets/images/avatar-01.png" },
  { name: "Jinhsi", text: "Nos tomó tres días... pero ambos lo logramos a tiempo. Permíteme presentarme formalmente. Soy Jinhsi... Me da una alegría inmensa verte, Suisui.", avatar: "assets/images/avatar-02.png" },
  { name: "Hsin", text: "Tu espacio se siente muy tranquilo hoy.", avatar: "assets/images/avatar-03.png" },
  { name: "Yangyang", text: "Nos vemos donde termina el océano ♡", avatar: "assets/images/avatar-04.png" },
  { name: "Chisa", text: "¡Suisui! Te extrañaba por aquí. Espero que estés súper bien. ¡Te mando un abrazo fuerte!", avatar: "assets/images/avatar-01.png" },
  { name: "Jinhsi", text: "*\"Quiero proteger Jinzhou a mi propia manera, como Jinhsi, como ciudadana y como su Magistrada. Sui, comencemos.\"*", avatar: "assets/images/avatar-02.png" },
  { name: "Chisa", text: "¡Hola, Suisui! Paso a saludarte. Cuéntame cómo has estado cuando tengas un momento.", avatar: "assets/images/avatar-01.png" },
  { name: "Jinhsi", text: "Gracias por visitar mi pequeño rincón.", avatar: "assets/images/avatar-02.png" }
];

let messageIndex = 0;
const MAX_MESSAGES = 3;

function showMessage() {
  const item = messages[messageIndex % messages.length];
  messageIndex++;

  const bubble = document.createElement("article");
  bubble.className = "message-bubble";
  bubble.innerHTML = `
    <img src="${item.avatar}" alt="">
    <span class="message-name">${item.name}</span>
    <span class="message-text">${item.text}</span>
  `;

  notifications.prepend(bubble);

  while (notifications.children.length > MAX_MESSAGES) {
    notifications.lastElementChild.remove();
  }
}

for (let i = 0; i < 2; i++) {
  setTimeout(showMessage, 1800 + i * 1600);
}
// Ritmo más pausado: un mensaje nuevo cada 7 segundos.
setInterval(showMessage, 7000);

/* ---------- Reproductor desplegable ---------- */
const musicControl = document.querySelector(".music-control");
const musicPopover = document.getElementById("musicPopover");
const playPause = document.getElementById("playPause");
const prevTrack = document.getElementById("prevTrack");
const nextTrack = document.getElementById("nextTrack");
const musicProgress = document.getElementById("musicProgress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const trackTitle = document.getElementById("trackTitle");

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function openMusicPanel() {
  musicPopover.classList.add("is-open");
  musicPopover.setAttribute("aria-hidden", "false");
  musicToggle.setAttribute("aria-expanded", "true");
}
function closeMusicPanel() {
  musicPopover.classList.remove("is-open");
  musicPopover.setAttribute("aria-hidden", "true");
  musicToggle.setAttribute("aria-expanded", "false");
}

musicToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  musicPopover.classList.contains("is-open") ? closeMusicPanel() : openMusicPanel();
});
musicPopover.addEventListener("click", event => event.stopPropagation());
document.addEventListener("click", event => {
  if (!musicControl.contains(event.target)) closeMusicPanel();
});

function syncMusicUI() {
  const playing = !music.paused;
  playPause.textContent = playing ? "❚❚" : "▶";
  musicPopover.classList.toggle("is-playing", playing);
  musicToggle.textContent = playing ? "♫" : "♪";
  if (Number.isFinite(music.duration) && music.duration > 0) {
    musicProgress.value = (music.currentTime / music.duration) * 100;
    duration.textContent = formatTime(music.duration);
  }
  currentTime.textContent = formatTime(music.currentTime);
}

music.addEventListener("loadedmetadata", syncMusicUI);
music.addEventListener("timeupdate", syncMusicUI);
music.addEventListener("play", syncMusicUI);
music.addEventListener("pause", syncMusicUI);

playPause.addEventListener("click", async () => {
  if (music.paused) {
    try { await music.play(); } catch {}
  } else music.pause();
  syncMusicUI();
});

musicProgress.addEventListener("input", () => {
  if (Number.isFinite(music.duration)) {
    music.currentTime = (Number(musicProgress.value) / 100) * music.duration;
  }
});

// Preparado para varias canciones: agrega archivos al array cuando quieras.
const tracks = [
  { src: "assets/audio/music.mp3", title: "Suisui Story Theme", artist: "Wuthering Waves • 3.5 OST"},
  { src: "assets/audio/music-04.mp3", title: "A Fairy Tale", artist: "Wuthering Waves • OST"},
  { src: "assets/audio/music-03.mp3", title: "When Spring Returns", artist: "Yxelixi • Official"},
  { src: "assets/audio/music-02.mp3", title: "Suisui Hunting Theme", artist: "Wuthering Waves • 3.5 OST" },
  { src: "assets/audio/music-05.mp3", title: "Thawing Fates", artist: "Wuthering Waves • EP 1.1" },
  { src: "assets/audio/music-06.mp3", title: "A Million Possibilities", artist: "Wuthering Waves • EP 1.4" }
];
let trackIndex = 0;

function loadTrack(index, autoplay = false) {
  trackIndex = (index + tracks.length) % tracks.length;
  const track = tracks[trackIndex];
  music.src = track.src;
  trackTitle.textContent = track.title;
  const artist = document.getElementById("trackArtist");
  artist.textContent = track.artist;
  music.load();
  if (autoplay) music.play().catch(() => {});
}
prevTrack.addEventListener("click", () => loadTrack(trackIndex - 1, !music.paused));
nextTrack.addEventListener("click", () => loadTrack(trackIndex + 1, true));

// Avanza automáticamente al siguiente tema cuando termina el actual.
music.addEventListener("ended", () => loadTrack(trackIndex + 1, true));
syncMusicUI();

/* V2.5 — parallax suave para las imágenes de Galería */
(() => {
  const gallery = document.querySelector('.gallery-grid');
  if (!gallery || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gallery.querySelectorAll('.gallery-slot').forEach(slot => {
    slot.addEventListener('pointermove', event => {
      const rect = slot.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      const moveX = px * 10;
      const moveY = py * 8;
      const rotateY = px * 4;
      const rotateX = py * -4;

      slot.style.setProperty('--parallax-x', `${moveX.toFixed(2)}px`);
      slot.style.setProperty('--parallax-y', `${moveY.toFixed(2)}px`);
      slot.style.setProperty('--parallax-rotate-x', `${rotateX.toFixed(2)}deg`);
      slot.style.setProperty('--parallax-rotate-y', `${rotateY.toFixed(2)}deg`);
      slot.style.setProperty('--gloss-x', `${(px * 100 + 50).toFixed(1)}%`);
      slot.style.setProperty('--gloss-y', `${(py * 100 + 50).toFixed(1)}%`);
    });

    slot.addEventListener('pointerleave', () => {
      slot.style.setProperty('--parallax-x', '0px');
      slot.style.setProperty('--parallax-y', '0px');
      slot.style.setProperty('--parallax-rotate-x', '0deg');
      slot.style.setProperty('--parallax-rotate-y', '0deg');
    });
  });
})();

/* V2.7 — decoración ambiental para cada render de sección */
(() => {
  const renderHosts = document.querySelectorAll('.view-character');
  if (!renderHosts.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  renderHosts.forEach(host => {
    if (host.querySelector('.render-particle')) return;

    for (let i = 1; i <= 7; i++) {
      const particle = document.createElement('span');
      particle.className = `render-particle p${i}`;
      particle.setAttribute('aria-hidden', 'true');
      host.appendChild(particle);
    }

    for (let i = 8; i <= 11; i++) {
      const petal = document.createElement('span');
      petal.className = `render-petal p${i}`;
      petal.setAttribute('aria-hidden', 'true');
      host.appendChild(petal);
    }

    const ringOne = document.createElement('span');
    ringOne.className = 'render-ring';
    ringOne.setAttribute('aria-hidden', 'true');
    host.appendChild(ringOne);

    const ringTwo = document.createElement('span');
    ringTwo.className = 'render-ring ring-two';
    ringTwo.setAttribute('aria-hidden', 'true');
    host.appendChild(ringTwo);
  });
})();


/* V2.9 — barrido glossy holográfico de una sola pasada */
(() => {
  const gallery = document.querySelector('.gallery-grid');
  if (!gallery || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gallery.querySelectorAll('.gallery-slot').forEach(slot => {
    const resetGloss = () => {
      slot.classList.remove('is-glossy');
      slot.style.setProperty('--gloss-progress', '-140%');
      slot.style.removeProperty('--gloss-x');
      slot.style.removeProperty('--gloss-y');
    };

    slot.addEventListener('pointerenter', () => {
      resetGloss();
      // Fuerza un nuevo ciclo cada vez que el cursor entra en la tarjeta.
      void slot.offsetWidth;
      slot.classList.add('is-glossy');
    });

    slot.addEventListener('animationend', event => {
      if (event.animationName !== 'galleryGlossSweep') return;
      resetGloss();
    });

    slot.addEventListener('pointerleave', resetGloss);
  });
})();

/* V3.2 — glossy de una sola pasada para las tarjetas de amigos */
(() => {
  const friends = document.querySelectorAll('.friend');
  if (!friends.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  friends.forEach(friend => {
    const resetGloss = () => {
      friend.classList.remove('is-glossy');
      friend.style.setProperty('--friend-gloss', '-145%');
    };

    friend.addEventListener('pointerenter', () => {
      resetGloss();
      void friend.offsetWidth;
      friend.classList.add('is-glossy');
    });

    friend.addEventListener('animationend', event => {
      if (event.animationName !== 'friendGlossSweep') return;
      friend.classList.remove('is-glossy');
      friend.style.setProperty('--friend-gloss', '145%');
    });

    friend.addEventListener('pointerleave', resetGloss);
  });
})();


/* V3.7 — glossy de una sola pasada para los items equipados */
(() => {
  const items = document.querySelectorAll('.item-card');
  if (!items.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  items.forEach(item => {
    const resetGloss = () => {
      item.classList.remove('is-glossy');
      item.style.setProperty('--item-gloss', '-145%');
    };

    item.addEventListener('pointerenter', () => {
      resetGloss();
      void item.offsetWidth;
      item.classList.add('is-glossy');
    });

    item.addEventListener('animationend', event => {
      if (event.animationName !== 'itemGlossSweep') return;
      item.classList.remove('is-glossy');
      item.style.setProperty('--item-gloss', '145%');
    });

    item.addEventListener('pointerleave', resetGloss);
  });
})();
/* =========================================================
 V 4*.0 — efectos del WEBM del perfil
 Partículas + destellos + rayos + líneas de energía
 ========================================================= */
(() => {
  const profileWrap = document.querySelector(".profile-video-wrap");

  if (!profileWrap) return;

  // Evita duplicar los efectos si el script se carga más de una vez.
  if (profileWrap.querySelector(".profile-video-effects")) return;

  const effects = document.createElement("div");
  effects.className = "profile-video-effects";
  effects.setAttribute("aria-hidden", "true");

  // Partículas.
  for (let i = 1; i <= 8; i++) {
    const particle = document.createElement("span");
    particle.className = `profile-particle p${i}`;
    effects.appendChild(particle);
  }

  // Destellos.
  for (let i = 1; i <= 3; i++) {
    const spark = document.createElement("span");
    spark.className = `profile-spark s${i}`;
    effects.appendChild(spark);
  }

  // Rayos.
  for (let i = 1; i <= 3; i++) {
    const lightning = document.createElement("span");
    lightning.className = `profile-lightning l${i}`;
    effects.appendChild(lightning);
  }

  // Líneas de energía.
  for (let i = 1; i <= 2; i++) {
    const line = document.createElement("span");
    line.className = `profile-energy-line e${i}`;
    effects.appendChild(line);
  }

  profileWrap.appendChild(effects);
})();
