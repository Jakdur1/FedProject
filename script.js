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
