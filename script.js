document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     1) 인트로 타이핑 효과
  ========================================== */
  const line1Text = "Welcome";
  const line2Text = "Na-Yeon’s World !";

  const line1El = document.getElementById("intro-line1");
  const line2El = document.getElementById("intro-line2");
  const introScreen = document.getElementById("intro-screen");
  const mainContent = document.getElementById("main-content");
  const skipBtn = document.getElementById("skip-intro");

  const typingSpeed = 120;
  const afterDelay = 800;

  const cursorSpan = document.createElement("span");
  cursorSpan.className = "cursor";
  cursorSpan.textContent = "|";

  let i = 0;
  let j = 0;
  let ended = false;

  function typeLine1() {
    if (i <= line1Text.length) {
      line1El.textContent = line1Text.slice(0, i);
      line1El.appendChild(cursorSpan);
      i++;
      setTimeout(typeLine1, typingSpeed);
    } else {
      line1El.textContent = line1Text;
      setTimeout(typeLine2, typingSpeed);
    }
  }

  function typeLine2() {
    if (j <= line2Text.length) {
      line2El.textContent = line2Text.slice(0, j);
      line2El.appendChild(cursorSpan);
      j++;
      setTimeout(typeLine2, typingSpeed);
    } else {
      line2El.textContent = line2Text;
      setTimeout(endIntro, afterDelay);
    }
  }

  function endIntro() {
    if (ended) return;
    ended = true;

    introScreen.classList.add("hide");

    introScreen.addEventListener(
      "transitionend",
      () => {
        introScreen.style.display = "none";
        mainContent.classList.add("show");
      },
      { once: true }
    );
  }

  if (skipBtn) {
    skipBtn.addEventListener("click", endIntro);
  }

  /* =========================================
     2) HOME 파티클 효과 — 통합된 버전
  ========================================== */
  function initHomeParticles() {
    const canvas = document.getElementById("home-particles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const base = Math.floor((W * H) / 70000);
    const count = Math.max(80, base);

    const particles = [];
    for (let k = 0; k < count; k++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 0.8 + Math.random() * 4.0,
        vx: -0.35 + Math.random() * 0.7,
        vy: -0.12 + Math.random() * 0.24,
        alpha: 0.45 + Math.random() * 0.55
      });
    }

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);

    function draw() {
      ctx.clearRect(0, 0, W, H);

      for (let p of particles) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255," + (p.alpha * 0.95) + ")";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx * 0.6;
        p.y += p.vy * 0.6;

        p.vy += (Math.random() - 0.5) * 0.02;

        if (p.x < -30) p.x = W + 30;
        if (p.x > W + 30) p.x = -30;
        if (p.y < -30) p.y = H + 30;
        if (p.y > H + 30) p.y = -30;
      }

      requestAnimationFrame(draw);
    }

    draw();
  }

  /* =========================================
     실행
  ========================================== */
  typeLine1();        // 타이핑 시작
  initHomeParticles(); // 파티클 효과 실행
});
