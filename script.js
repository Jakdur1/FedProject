document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".order_button");
  const blocks = document.querySelectorAll(".block");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      alert("Objednávka pridaná!");
      console.log("order");
    });
  });
});


document.addEventListener("mousemove", function (e) {
  let dx = e.pageX - window.innerWidth / 2;
  let dy = e.pageY - window.innerHeight / 2;
  let angleX = (20 * dx) / window.innerWidth / 2;
  let angleY = (20 * dy) / window.innerHeight / 2;

  blocks.forEach(function (block) {
    block.style.transform = `rotateX(${-angleY}deg) rotateY(${angleX}deg)`;
  });
});
