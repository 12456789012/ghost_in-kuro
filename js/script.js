window.addEventListener("load", () => {

    console.log("Ghost in Kuro loaded");

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
            const target = document.querySelector("#system");
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
            btn.innerText = "BOOTING...";
            setTimeout(() => btn.innerText = "ACCESS GRANTED", 800);
            setTimeout(() => btn.innerText = "ENTER SYSTEM", 2000);
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
        if (transition) transition.classList.add("active");
        document.body.style.opacity = "0";
        setTimeout(() => {
            window.location.href = href;
        }, 450);
    });
});
