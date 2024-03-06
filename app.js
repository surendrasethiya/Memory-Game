// app.js

const emojis = ["😁", "😁", "😍", "😍", "😘", "😘", "😢", "😢", "🥵", "🥵", "🥶", "🥶", "🤕", "🤕", "🤩", "🤩"];
let shuf_emojis = emojis.sort(() => Math.random() - 0.5);

let score = 0;
let timer = 0;
let timerInterval;

function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        document.getElementById("timer").textContent = timer;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetGame() {
    stopTimer();
    timer = 0;
    document.getElementById("timer").textContent = timer;
    score = 0;
    document.getElementById("score").textContent = "Score: 0";
    document.querySelector(".game").innerHTML = "";
    shuf_emojis = emojis.sort(() => Math.random() - 0.5);
    createGame();
}

function createGame() {
    startTimer();
    for (let i = 0; i < emojis.length; i++) {
        let box = document.createElement("div");
        box.className = "item";
        box.innerHTML = shuf_emojis[i];

        box.onclick = function () {
            this.classList.add('boxOpen');
            setTimeout(() => {
                if (document.querySelectorAll('.boxOpen').length > 1) {
                    if (document.querySelectorAll('.boxOpen')[0].innerHTML ==
                        document.querySelectorAll('.boxOpen')[1].innerHTML) {
                        document.querySelectorAll('.boxOpen').forEach(item => {
                            item.classList.add('boxmatch');
                            item.classList.remove('boxOpen');
                        });
                        score++;
                        document.getElementById("score").textContent = "Score: " + score;
                        if (document.querySelectorAll('.boxmatch').length == emojis.length) {
                            stopTimer();
                            alert("Congratulations! You won in " + timer + " seconds!");
                        }
                    } else {
                        document.querySelectorAll('.boxOpen').forEach(item => {
                            item.classList.remove('boxOpen');
                        });
                    }
                }
            }, 500);
        }
        document.querySelector(".game").appendChild(box);
    }
}

// Initialize the game
createGame();
