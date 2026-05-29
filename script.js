/* =========================
   SAFE INIT (EVITE ÉCRAN BLANC)
========================= */

window.addEventListener("load", () => {

    console.log("Ghost in Kuro loaded");

    /* =========================
       SAFE CANVAS CHECK
    ========================= */

    const canvas = document.getElementById("pcb-canvas");

    if (canvas) {

        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            requestAnimationFrame(animate);
        }

        animate();
    }

    /* =========================
       MOUSE GLOW SAFE
    ========================= */

    const glow = document.querySelector(".mouse-glow");

    if (glow) {
        window.addEventListener("mousemove", (e) => {
            glow.style.left = e.clientX + "px";
            glow.style.top = e.clientY + "px";
        });
    }

    /* =========================
       NAV HOVER SAFE
    ========================= */

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("mouseenter", () => {
            link.style.textShadow = "0 0 12px rgba(160,120,255,0.8)";
        });

        link.addEventListener("mouseleave", () => {
            link.style.textShadow = "none";
        });
    });

});

// =========================
// PAGE TRANSITIONS
// =========================

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", (e) => {

        const href = link.getAttribute("href");

        if (!href || href.startsWith("#")) return;

        e.preventDefault();

        document.body.style.opacity = "0";

        setTimeout(() => {
            window.location.href = href;
        }, 300);
    });
});

const page = location.pathname.split("/").pop();

document.querySelectorAll(".nav-links a").forEach(a => {
    if (a.getAttribute("href") === page) {
        a.style.color = "rgba(180,120,255,1)";
        a.style.textShadow = "0 0 12px rgba(160,120,255,0.8)";
    }
});

document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
        card.style.transform = "scale(1.05)";
    });
});

document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (!href) return;

        e.preventDefault();
        document.body.style.opacity = "0";

        setTimeout(() => {
            window.location.href = href;
        }, 300);
    });
});

document.querySelectorAll(".enter-btn").forEach(btn => {
    btn.addEventListener("click", () => {

        btn.innerText = "BOOTING SYSTEM...";

        setTimeout(() => {
            btn.innerText = "SYSTEM READY";
        }, 1200);

        setTimeout(() => {
            btn.innerText = "ENTER SYSTEM";
        }, 2200);

    });
});

// =====================
// CURSOR DOT + TRAIL
// =====================

const cursor = document.querySelector(".cursor-dot");

window.addEventListener("mousemove", (e) => {

    // cercle principal suit la souris
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    // trail
    const trail = document.createElement("div");
    trail.classList.add("cursor-trail");

    trail.style.left = e.clientX + "px";
    trail.style.top = e.clientY + "px";

    document.body.appendChild(trail);

    setTimeout(() => {
        trail.remove();
    }, 600);

});

// =====================
// STARS GENERATION
// =====================

const starsContainer = document.querySelector(".stars");

if (starsContainer) {

    for (let i = 0; i < 40; i++) {

        const star = document.createElement("div");
        star.classList.add("star");

        star.style.top = Math.random() * 60 + "vh";
        star.style.left = Math.random() * 100 + "vw";
        star.style.animationDuration = (2 + Math.random() * 3) + "s";

        starsContainer.appendChild(star);
    }
}

const transition = document.querySelector(".aaa-transition");

document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", (e) => {

        const href = link.getAttribute("href");
        if (!href || href.startsWith("#")) return;

        e.preventDefault();

        transition.classList.add("active");

        setTimeout(() => {
            window.location.href = href;
        }, 450);
    });
});
