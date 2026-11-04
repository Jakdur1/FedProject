const reservationForm = document.querySelector("#reservation-form");
const reservationResult = document.querySelector("#reservation-result");
const reservationSummary = document.querySelector("#reservation-summary");
const smsLink = document.querySelector("#sms-link");
const dateInput = document.querySelector("#reservation-date");

const today = new Date();
const localToday = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0"),
].join("-");

dateInput.min = localToday;

reservationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!reservationForm.reportValidity()) return;

  const formData = new FormData(reservationForm);
  const name = formData.get("name").trim();
  const phone = formData.get("phone").trim();
  const email = formData.get("email").trim();
  const date = formData.get("date");
  const time = formData.get("time");
  const guests = formData.get("guests");
  const note = formData.get("note").trim();
  const message = [
    "Dobrý deň, prosím o rezerváciu stola v Tao's.",
    `Meno: ${name}`,
    `Telefón: ${phone}`,
    email ? `E-mail: ${email}` : "",
    `Dátum: ${date}`,
    `Čas: ${time}`,
    `Počet hostí: ${guests}`,
    note ? `Poznámka: ${note}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  reservationSummary.textContent = `${date} o ${time} · ${guests} ${
    guests === "1" ? "hosť" : "hostí"
  } · ${name}`;
  smsLink.href = `sms:+421944217722?body=${encodeURIComponent(message)}`;
  reservationResult.hidden = false;
  reservationResult.scrollIntoView({ behavior: "smooth", block: "center" });
});
