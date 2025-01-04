let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // "O" starts first
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return; // Prevent overwriting an already filled box

        box.innerText = turnO ? "O" : "X";
        box.disabled = true;
        turnO = !turnO;

        checkWinner();
    });
});

const resetGame = () => {
    turnO = true;
    enableBoxes();
    removeStrikes();
    msgContainer.classList.add("hide");
};

const disableBoxes = () => {
    boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
    removeStrikes();
};

const removeStrikes = () => {
    document.querySelectorAll(".strike").forEach((strike) => strike.remove());
};

const highlightWinner = (pattern) => {
    const [a, b, c] = pattern;
    const strike = document.createElement("div");
    strike.classList.add("strike");

    const firstBox = boxes[a];
    const thirdBox = boxes[c];

    // Determine the orientation of the strike (horizontal, vertical, or diagonal)
    if (a === 0 && b === 1 && c === 2) { // Top row
        strike.style.width = `${thirdBox.offsetLeft + thirdBox.offsetWidth - firstBox.offsetLeft}px`;
        strike.style.top = `${firstBox.offsetTop + firstBox.offsetHeight / 2 - 2}px`;
        strike.style.left = `${firstBox.offsetLeft}px`;
        strike.style.height = "4px";
    } else if (a === 3 && b === 4 && c === 5) { // Middle row
        strike.style.width = `${thirdBox.offsetLeft + thirdBox.offsetWidth - firstBox.offsetLeft}px`;
        strike.style.top = `${firstBox.offsetTop + firstBox.offsetHeight / 2 - 2}px`;
        strike.style.left = `${firstBox.offsetLeft}px`;
        strike.style.height = "4px";
    } else if (a === 6 && b === 7 && c === 8) { // Bottom row
        strike.style.width = `${thirdBox.offsetLeft + thirdBox.offsetWidth - firstBox.offsetLeft}px`;
        strike.style.top = `${firstBox.offsetTop + firstBox.offsetHeight / 2 - 2}px`;
        strike.style.left = `${firstBox.offsetLeft}px`;
        strike.style.height = "4px";
    }

    // Vertical Strikes
    else if (a === 0 && b === 3 && c === 6) { // Left column
        strike.style.height = `${thirdBox.offsetTop + thirdBox.offsetHeight - firstBox.offsetTop}px`;
        strike.style.width = "4px";
        strike.style.left = `${firstBox.offsetLeft + firstBox.offsetWidth / 2 - 2}px`;
        strike.style.top = `${firstBox.offsetTop}px`;
    } else if (a === 1 && b === 4 && c === 7) { // Middle column
        strike.style.height = `${thirdBox.offsetTop + thirdBox.offsetHeight - firstBox.offsetTop}px`;
        strike.style.width = "4px";
        strike.style.left = `${firstBox.offsetLeft + firstBox.offsetWidth / 2 - 2}px`;
        strike.style.top = `${firstBox.offsetTop}px`;
    } else if (a === 2 && b === 5 && c === 8) { // Right column
        strike.style.height = `${thirdBox.offsetTop + thirdBox.offsetHeight - firstBox.offsetTop}px`;
        strike.style.width = "4px";
        strike.style.left = `${firstBox.offsetLeft + firstBox.offsetWidth / 2 - 2}px`;
        strike.style.top = `${firstBox.offsetTop}px`;
    }

    // Diagonal Strikes
    else if (a === 0 && b === 4 && c === 8) { // Diagonal top-left to bottom-right
        strike.style.width = `${Math.sqrt(Math.pow(thirdBox.offsetLeft - firstBox.offsetLeft, 2) + Math.pow(thirdBox.offsetTop - firstBox.offsetTop, 2))}px`;
        strike.style.transform = `rotate(45deg)`;
        strike.style.top = `(${firstBox.offsetTop + firstBox.offsetHeight / 2} + 2)px`;
        strike.style.left = `(${firstBox.offsetLeft + firstBox.offsetWidth / 2} + 2)px`;
        strike.style.height = "4px";
    } else if (a === 2 && b === 4 && c === 6) { // Diagonal top-right to bottom-left
        strike.style.width = `${Math.sqrt(Math.pow(thirdBox.offsetLeft - firstBox.offsetLeft, 2) + Math.pow(thirdBox.offsetTop - firstBox.offsetTop, 2))}px`;
        strike.style.transform = `rotate(-45deg)`;
        strike.style.top = `$({firstBox.offsetTop + firstBox.offsetHeight / 2} - 2)px`;
        strike.style.left = `$({firstBox.offsetLeft + firstBox.offsetWidth / 2} - 2)px`;
        strike.style.height = "4px";
    }

    // Append the strike to the game container
    document.querySelector(".game").appendChild(strike);
};

const showWinner = (winner, pattern) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    highlightWinner(pattern);
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let post1Val = boxes[pattern[0]].innerText;
        let post2Val = boxes[pattern[1]].innerText;
        let post3Val = boxes[pattern[2]].innerText;

        if (post1Val && post2Val && post3Val && post1Val === post2Val && post2Val === post3Val) {
            showWinner(post1Val, pattern);
            return;
        }
    }
    checkDraw();
};

const checkDraw = () => {
    let allFilled = Array.from(boxes).every((box) => box.innerText !== "");
    if (allFilled) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
