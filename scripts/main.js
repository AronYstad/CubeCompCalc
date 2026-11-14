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
let prValue = null;
let times = [];

prInput.addEventListener("input", () => {
    prValue = formatTimeField(prInput);
    console.log("PR Value:", prValue);
});

timeInput1.addEventListener("input", () => {
    const timeValue = formatTimeField(timeInput1);
    times[0] = timeValue;
    console.log("Time 1 Value:", timeValue);
});

timeInput2.addEventListener("input", () => {
    const timeValue = formatTimeField(timeInput2);
    times[1] = timeValue;
    console.log("Time 2 Value:", timeValue);
});

timeInput3.addEventListener("input", () => {
    const timeValue = formatTimeField(timeInput3);
    times[2] = timeValue;
    console.log("Time 3 Value:", timeValue);
});

timeInput4.addEventListener("input", () => {
    const timeValue = formatTimeField(timeInput4);
    times[3] = timeValue;
    console.log("Time 4 Value:", timeValue);
});

timeInput5.addEventListener("input", () => {
    const timeValue = formatTimeField(timeInput5);
    times[4] = timeValue;
    console.log("Time 5 Value:", timeValue);
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

ao5Button.addEventListener("click", () => {
    ao5Button.style.display = "none";
    mo3Button.style.display = "none";
    topH2.textContent = "Enter PR:";
    prForm.style.display = "block";
    timesH2.style.display = "block";
    timesContainer.style.display = "flex";
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
});