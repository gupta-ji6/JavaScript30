// import ConfettiGenerator from "confetti-js";
const pressed = [];
const secretCode = "guptaji";
console.info(`Hint: Type ${secretCode} on your keyboard`);
let confettiSettings = { target: "my-canvas", animate: true,size: 4, clock: 100 };

window.addEventListener("keyup", e => {
  pressed.push(e.key);
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
  console.log(pressed);
  if (pressed.join("").includes(secretCode)) {
    var confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
  } else {
    var confettii = new ConfettiGenerator(confettiSettings);
    confettii.clear();
  }
});
