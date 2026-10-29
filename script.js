"use strict";

document.addEventListener("DOMContentLoaded", function () {

    const intro = document.getElementById("intro");
    const main = document.getElementById("main");
    const bootText = document.getElementById("bootText");
    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");

    const startBtn = document.getElementById("startBtn");
    const missionCards = document.querySelectorAll(".mission-card");

    const xpBar = document.getElementById("xpBar");
    const xpText = document.getElementById("xpText");
    const level = document.getElementById("level");

    const photoViewer = document.getElementById("photoViewer");
    const largePhoto = document.getElementById("largePhoto");
    const photoCaption = document.getElementById("photoCaption");
    const closeViewer = document.getElementById("closeViewer");

    const popup = document.getElementById("popup");
    const popupContent = document.getElementById("popupContent");
    const closePopup = document.getElementById("closePopup");

    const finalBtn = document.getElementById("finalBtn");
    const birthdayReveal = document.getElementById("birthdayReveal");
    const replayBtn = document.getElementById("replayBtn");

    const birthdayMusic = document.getElementById("birthdayMusic");
    const musicBtn = document.getElementById("musicBtn");

    // INTRO LOADING
    let progress = 0;

    const loading = setInterval(function () {
        progress += 5;

        if (progressBar) {
            progressBar.style.width = progress + "%";
        }

        if (progressText) {
            progressText.textContent = progress + "%";
        }

        if (progress >= 100) {
            clearInterval(loading);

            if (bootText) {
                bootText.textContent = "SYSTEM READY!";
            }

            setTimeout(function () {
                if (intro) {
                    intro.style.display = "none";
                }

                if (main) {
                    main.classList.remove("hidden");
                }
            }, 500);
        }
    }, 80);

    // XP SYSTEM
    let completedMissions = new Set();

    function updateXP() {
        const xp = completedMissions.size * 100 / 3;

        if (xpBar) {
            xpBar.style.width = xp + "%";
        }

        if (xpText) {
            xpText.textContent = completedMissions.size * 100 / 3 >= 100
                ? "300 / 300 XP"
                : (completedMissions.size * 100) + " / 300 XP";
        }

        if (level) {
            level.textContent = completedMissions.size === 3
                ? "LEVEL 04"
                : "LEVEL 0" + (completedMissions.size + 1);
        }

        if (completedMissions.size === 3 && finalBtn) {
            finalBtn.textContent = "🎂 ALL MISSIONS COMPLETE — EXECUTE!";
        }
    }

    // START BUTTON
    if (startBtn) {
        startBtn.addEventListener("click", function () {
            document.getElementById("missions").scrollIntoView({
                behavior: "smooth"
            });
        });
    }

    // POPUP FUNCTION
    function showPopup(content) {
        if (!popup || !popupContent) return;

        popupContent.innerHTML = content;
        popup.classList.remove("hidden");
    }

    // MISSION CARDS
    missionCards.forEach(function (card) {
        card.addEventListener("click", function () {

            const mission = Number(card.dataset.mission);

            if (mission === 0) {
                document.getElementById("gallery").scrollIntoView({
                    behavior: "smooth"
                });

                completedMissions.add(0);
                card.querySelector(".mission-status").textContent = "COMPLETED";

            } else if (mission === 1) {
                document.getElementById("achievements").scrollIntoView({
                    behavior: "smooth"
                });

                completedMissions.add(1);
                card.querySelector(".mission-status").textContent = "COMPLETED";

            } else if (mission === 2) {
                showPopup(`
                    <p class="eyebrow">// ENCRYPTED MESSAGE</p>
                    <h2>HEY, JAY! 💌</h2>
                    <p>
                        Life is better with a brother like you.
                        Thanks for all the laughs, memories and madness.
                        <br><br>
                        Stay happy, stay strong, and keep being awesome!
                        <br><br>
                        <strong>Happy Birthday, Legend! 👑</strong>
                    </p>
                `);

                completedMissions.add(2);
                card.querySelector(".mission-status").textContent = "COMPLETED";
            }

            card.classList.add("completed");
            updateXP();
        });
    });

    // PHOTO VIEWER
    document.querySelectorAll("#photoGrid img").forEach(function (img) {

        img.addEventListener("click", function () {

            if (!photoViewer || !largePhoto) return;

            largePhoto.src = img.src;
            photoCaption.textContent = img.alt;

            photoViewer.classList.remove("hidden");
        });

        // Missing image detection
        img.addEventListener("error", function () {
            console.error("Photo could not load:", img.src);
            img.alt = "Photo not found: " + img.getAttribute("src");
        });
    });

    if (closeViewer) {
        closeViewer.addEventListener("click", function () {
            photoViewer.classList.add("hidden");
            largePhoto.src = "";
        });
    }

    if (photoViewer) {
        photoViewer.addEventListener("click", function (event) {
            if (event.target === photoViewer) {
                photoViewer.classList.add("hidden");
                largePhoto.src = "";
            }
        });
    }

    // CLOSE POPUP
    if (closePopup) {
        closePopup.addEventListener("click", function () {
            popup.classList.add("hidden");
        });
    }

    if (popup) {
        popup.addEventListener("click", function (event) {
            if (event.target === popup) {
                popup.classList.add("hidden");
            }
        });
    }

    // FINAL BIRTHDAY SURPRISE
    if (finalBtn) {
        finalBtn.addEventListener("click", function () {

            if (birthdayReveal) {
                birthdayReveal.classList.remove("hidden");

                birthdayReveal.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }

            // Play music only after the user clicks
            if (birthdayMusic) {
                birthdayMusic.play().then(function () {
                    if (musicBtn) {
                        musicBtn.textContent = "♫ MUSIC ON";
                    }
                }).catch(function () {
                    console.log("Music unavailable or blocked.");
                });
            }

            launchCelebration();
        });
    }

    // REPLAY
    if (replayBtn) {
        replayBtn.addEventListener("click", function () {
            launchCelebration();

            if (birthdayReveal) {
                birthdayReveal.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        });
    }

// BIRTHDAY MUSIC TOGGLE
(function () {
    function initMusicToggle() {
        const music = document.getElementById("birthdayMusic");
        const button = document.getElementById("musicBtn");

        if (!music || !button) {
            console.error("Music element ya button nahi mila.");
            return;
        }

        button.onclick = async function () {
            if (music.paused) {
                try {
                    await music.play();
                    button.textContent = "♫ MUSIC ON";
                } catch (error) {
                    console.error("Music error:", error);
                    button.textContent = "♪ MUSIC OFF";
                    alert("Song play nahi hua. birthday.mp3 file ka path check karo.");
                }
            } else {
                music.pause();
                button.textContent = "♪ MUSIC OFF";
            }
        };
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initMusicToggle);
    } else {
        initMusicToggle();
    }
})();


    // CELEBRATION EFFECT
    function launchCelebration() {
        const emojis = ["🎉", "🎂", "🎈", "✨", "🎁"];

        for (let i = 0; i < 45; i++) {
            const item = document.createElement("span");

            item.textContent = emojis[
                Math.floor(Math.random() * emojis.length)
            ];

            item.style.position = "fixed";
            item.style.left = Math.random() * 100 + "vw";
            item.style.top = "-40px";
            item.style.fontSize = (20 + Math.random() * 22) + "px";
            item.style.zIndex = "99999";
            item.style.pointerEvents = "none";

            document.body.appendChild(item);

            const duration = 2000 + Math.random() * 2500;

            item.animate([
                {
                    transform: "translateY(0) rotate(0deg)",
                    opacity: 1
                },
                {
                    transform: "translateY(110vh) rotate(600deg)",
                    opacity: 0.2
                }
            ], {
                duration: duration,
                easing: "ease-in"
            });

            setTimeout(function () {
                item.remove();
            }, duration);
        }
    }

    // MATRIX BACKGROUND
    const canvas = document.getElementById("matrix");

    if (canvas) {
        const ctx = canvas.getContext("2d");

        const letters = "01JAYSRIVASTAV";
        const fontSize = 14;
        let columns = 0;
        let drops = [];

        function resizeMatrix() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            columns = Math.floor(canvas.width / fontSize);
            drops = Array(columns).fill(1);
        }

        function drawMatrix() {
            ctx.fillStyle = "rgba(5, 8, 18, 0.08)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#00ff88";
            ctx.font = fontSize + "px monospace";

            for (let i = 0; i < drops.length; i++) {
                const char = letters[
                    Math.floor(Math.random() * letters.length)
                ];

                ctx.fillText(
                    char,
                    i * fontSize,
                    drops[i] * fontSize
                );

                if (
                    drops[i] * fontSize > canvas.height &&
                    Math.random() > 0.975
                ) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        }

        resizeMatrix();
        window.addEventListener("resize", resizeMatrix);
        setInterval(drawMatrix, 50);
    }

    console.log("JAY.EXE birthday protocol initialized.");
});