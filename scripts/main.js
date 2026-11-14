const ao5Button = document.getElementById("ao5-button");
const mo3Button = document.getElementById("mo3-button");
const topH2 = document.getElementById("top-h2");
const prForm = document.getElementById("pr-form");
const timesH2 = document.getElementById("times-h2");
const prInput = document.getElementById("pr-input");
const timesContainer = document.getElementById("times-container");
const timeInput1 = document.getElementById("time1");
const timeInput2 = document.getElementById("time2");
const timeInput3 = document.getElementById("time3");
const timeInput4 = document.getElementById("time4");
const timeInput5 = document.getElementById("time5");
const averageH2 = document.getElementById("average-h2");
const bpaH2 = document.getElementById("bpa-h2");
const wpaH2 = document.getElementById("wpa-h2");
const needToBeatH2 = document.getElementById("need-to-beat-h2");
let prValue = null;
let times = [];
let bpa = null;
let wpa = null;
let needToBeat = null;
let average = null;
let format = "";

prForm.addEventListener("submit", (event) => {
    event.preventDefault();
});

document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    });
});

prInput.addEventListener("input", () => {
    prValue = formatTimeField(prInput);
    console.log("PR Value:", prValue);
    update();
});

timeInput1.addEventListener("input", () => {
    const timeValue = formatTimeField(timeInput1);
    times[0] = timeValue;
    console.log("Time 1 Value:", timeValue);
    update();
});

timeInput2.addEventListener("input", () => {
    const timeValue = formatTimeField(timeInput2);
    times[1] = timeValue;
    console.log("Time 2 Value:", timeValue);
    update();
});

timeInput3.addEventListener("input", () => {
    const timeValue = formatTimeField(timeInput3);
    times[2] = timeValue;
    console.log("Time 3 Value:", timeValue);
    update();
});

timeInput4.addEventListener("input", () => {
    const timeValue = formatTimeField(timeInput4);
    times[3] = timeValue;
    console.log("Time 4 Value:", timeValue);
    update();
});

timeInput5.addEventListener("input", () => {
    const timeValue = formatTimeField(timeInput5);
    times[4] = timeValue;
    console.log("Time 5 Value:", timeValue);
    update();
});

function formatTimeField(timeInput) {
    const digits = timeInput.value.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
    if (!digits) {
        timeInput.value = "";
        return;
    }

    const centiseconds = digits.slice(-2).padStart(2, "0");
    const seconds = digits.slice(-4, -2);
    const minutes = digits.slice(0, -4);

    if (minutes) {
        timeInput.value = `${minutes}:${seconds.padStart(2, "0")}.${centiseconds}`;
    } else if (digits.length <= 2) {
        timeInput.value = `0.${centiseconds}`;
    } else {
        timeInput.value = `${seconds}.${centiseconds}`;
    }

    time = 6000 * parseInt(minutes || "0", 10) + 100 * parseInt(seconds || "0", 10) + parseInt(centiseconds, 10);
    return time;
}

function formatTime(time) {
    if (time === null || time === undefined) {
        return "None";
    }

    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const centiseconds = time % 100;

    if (minutes > 0) {
        return `${minutes}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
    } else {
        return `${seconds}.${centiseconds.toString().padStart(2, "0")}`;
    }
}

ao5Button.addEventListener("click", () => {
    ao5Button.style.display = "none";
    mo3Button.style.display = "none";
    topH2.textContent = "Enter PR:";
    prForm.style.display = "block";
    timesH2.style.display = "block";
    timesContainer.style.display = "flex";
    bpaH2.style.display = "block";
    wpaH2.style.display = "block";
    needToBeatH2.style.display = "block";
    averageH2.textContent = "AO5: None";
    averageH2.style.display = "block";
    format = "ao5";
});

mo3Button.addEventListener("click", () => {
    ao5Button.style.display = "none";
    mo3Button.style.display = "none";
    topH2.textContent = "Enter PR:";
    prForm.style.display = "block";
    timesH2.style.display = "block";
    timeInput4.style.display = "none";
    timeInput5.style.display = "none";
    timesContainer.style.display = "flex";
    needToBeatH2.style.display = "block";
    averageH2.textContent = "MO3: None";
    averageH2.style.display = "block";
    format = "mo3";
});

function update() {
    if (prValue !== null) {
        if (format === "ao5") {
            const validTimes = times.filter((time) => (time !== undefined && time !== 0));
            console.log("Valid Times:", validTimes);
            const sortedTimes = [...validTimes].sort((a, b) => a - b);
            if (validTimes.length === 5) {
                const middleThree = sortedTimes.slice(1, 4);
                average = Math.round(middleThree.reduce((sum, time) => sum + time, 0) / 3);
                bpa = null;
                wpa = null;
                needToBeat = null;
            }
            else if (validTimes.length === 4) {
                const lowestThree = sortedTimes.slice(0, 3);
                const middleTwo = sortedTimes.slice(1, 3);
                bpa = Math.round(lowestThree.reduce((sum, time) => sum + time, 0) / 3);
                const highestThree = sortedTimes.slice(1, 4);
                wpa = Math.round(highestThree.reduce((sum, time) => sum + time, 0) / 3);
                average = null;
                if (bpa > prValue) {
                    needToBeat = null;
                }
                else if (wpa <= prValue) {
                    needToBeat = 0;
                }
                else {
                    needToBeat = Math.round(prValue * 3 - middleTwo.reduce((sum, time) => sum + time, 0)) + 1;
                }
            }
            else if (validTimes.length === 3) {
                average = null;
                bpa = null;
                wpa = null;
                const highestTwo = sortedTimes.slice(1, 3);
                needToBeat = Math.round(prValue * 3 - highestTwo.reduce((sum, time) => sum + time, 0)) + 1;
                if (needToBeat < sortedTimes[0]) {
                    needToBeat = null;
                }
            }
            else{
                average = null;
                bpa = null;
                wpa = null;
                needToBeat = null;
            }
            averageH2.textContent = `AO5: ${formatTime(average)}`;
            bpaH2.textContent = `BPA: ${formatTime(bpa)}`;
            wpaH2.textContent = `WPA: ${formatTime(wpa)}`;
            needToBeatH2.textContent = `Needed to tie PR: ${formatTime(needToBeat)}`;
            if (needToBeat === 0) {
                needToBeatH2.textContent = "Needed to tie PR: PR Guaranteed!";
            }
        }
        else if (format === "mo3") {
            const validTimes = times.filter((time) => (time !== undefined && time !== 0));
            if (validTimes.length === 3) {
                average = Math.round(validTimes.reduce((sum, time) => sum + time, 0) / 3);
                needToBeat = null;
            }
            else if (validTimes.length === 2) {
                average = null;
                needToBeat = Math.round(prValue * 3 - validTimes.reduce((sum, time) => sum + time, 0)) + 1;
            }
            else {
                average = null;
                needToBeat = null;
            }
            averageH2.textContent = `MO3: ${formatTime(average)}`;
            needToBeatH2.textContent = `Needed to tie PR: ${formatTime(needToBeat)}`;
        }  
    }   
}