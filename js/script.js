window.addEventListener("load", () => {

    console.log("Ghost in Kuro loaded");

    /* BACKGROUND AUDIO */
    const audioSource = "assets/musique%20de%20fond/uniquecreativeaudio-ambient-sci-fi-electronic-dreamer-calm-synth-instrumental-294746.mp3";
    let audioToggle = document.querySelector(".audio-toggle");
    let backgroundAudio = document.querySelector("#background-audio");

    if (!backgroundAudio) {
        backgroundAudio = document.createElement("audio");
        backgroundAudio.id = "background-audio";
        backgroundAudio.loop = true;
        backgroundAudio.preload = "auto";
        document.body.prepend(backgroundAudio);
    }

    if (!audioToggle) {
        audioToggle = document.createElement("button");
        audioToggle.className = "audio-toggle";
        audioToggle.type = "button";
        audioToggle.textContent = "SOUND OFF";
        document.body.appendChild(audioToggle);
    }

    backgroundAudio.src = audioSource;
    backgroundAudio.volume = 0.18;

    const savedAudioTime = Number(sessionStorage.getItem("ghostAudioTime") || "0");
    const saveAudioTime = () => {
        if (!Number.isNaN(backgroundAudio.currentTime)) {
            sessionStorage.setItem("ghostAudioTime", String(backgroundAudio.currentTime));
        }
    };

    const setAudioState = (enabled) => {
        audioToggle.textContent = enabled ? "SOUND ON" : "SOUND OFF";
        audioToggle.classList.toggle("active", enabled);
        localStorage.setItem("ghostAudio", enabled ? "on" : "off");
    };

    const startAudio = async () => {
        try {
            backgroundAudio.muted = false;
            await backgroundAudio.play();
            setAudioState(true);
        } catch (error) {
            audioToggle.textContent = "SOUND READY";
            audioToggle.classList.remove("active");
            console.warn("Audio playback failed:", error);
        }
    };

    backgroundAudio.addEventListener("loadedmetadata", () => {
        if (savedAudioTime > 0 && savedAudioTime < backgroundAudio.duration) {
            backgroundAudio.currentTime = savedAudioTime;
        }
    });

    backgroundAudio.addEventListener("timeupdate", saveAudioTime);
    backgroundAudio.addEventListener("error", () => {
        audioToggle.textContent = "SOUND ERROR";
        audioToggle.classList.remove("active");
    });
    window.addEventListener("pagehide", saveAudioTime);

    audioToggle.addEventListener("click", () => {
        if (backgroundAudio.paused) {
            startAudio();
        } else {
            backgroundAudio.pause();
            setAudioState(false);
        }
    });

    if (localStorage.getItem("ghostAudio") === "on") {
        startAudio();
    }
    /* CANVAS */
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

    /* MOUSE GLOW */
    const glow = document.querySelector(".mouse-glow");
    if (glow) {
        window.addEventListener("mousemove", (e) => {
            glow.style.left = e.clientX + "px";
            glow.style.top = e.clientY + "px";
        });
    }

    /* NAV HOVER */
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("mouseenter", () => {
            link.style.textShadow = "0 0 12px rgba(160,120,255,0.8)";
        });
        link.addEventListener("mouseleave", () => {
            link.style.textShadow = "none";
        });
    });

    /* ACTIVE PAGE */
    const page = location.pathname.split("/").pop();
    document.querySelectorAll(".nav-links a").forEach(a => {
        const href = a.getAttribute("href");
        const isCollectionItem = page.startsWith("product-") && href === "collections.html";
        if (href === page || isCollectionItem) {
            a.style.color = "rgba(180,120,255,1)";
            a.style.textShadow = "0 0 12px rgba(160,120,255,0.8)";
        }
    });

    /* ENTER BUTTON */
    document.querySelectorAll(".enter-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const label = btn.dataset.label || btn.textContent;
            btn.dataset.label = label;
            const href = btn.getAttribute("href");
            const target = href && href.startsWith("#") ? document.querySelector(href) : document.querySelector("#system");
            if (target) {
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.scrollY;
                const start = window.scrollY;
                const distance = top - start;
                const duration = 950;
                const startedAt = performance.now();

                const animateScroll = (now) => {
                    const progress = Math.min((now - startedAt) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    window.scrollTo(0, start + distance * eased);
                    if (progress < 1) requestAnimationFrame(animateScroll);
                };

                requestAnimationFrame(animateScroll);
            }
            btn.innerText = "BOOTING...";
            setTimeout(() => btn.innerText = "ACCESS GRANTED", 800);
            setTimeout(() => btn.innerText = label, 2000);
        });
    });
    /* STARS */
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

});

/* CURSOR */
const cursor = document.querySelector(".cursor-dot");
window.addEventListener("mousemove", (e) => {
    if (!cursor) return;
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    const trail = document.createElement("div");
    trail.classList.add("cursor-trail");
    trail.style.left = e.clientX + "px";
    trail.style.top = e.clientY + "px";
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 600);
});

/* PAGE TRANSITIONS */
const transition = document.querySelector(".aaa-transition");
document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (!href || href.startsWith("#")) return;
        e.preventDefault();
        const backgroundAudio = document.querySelector("#background-audio");
        if (backgroundAudio && !Number.isNaN(backgroundAudio.currentTime)) {
            sessionStorage.setItem("ghostAudioTime", String(backgroundAudio.currentTime));
        }
        if (transition) transition.classList.add("active");
        document.body.style.opacity = "0";
        setTimeout(() => {
            window.location.href = href;
        }, 450);
    });
});