const reservationForm = document.querySelector("#reservation-form");
const reservationResult = document.querySelector("#reservation-result");
const reservationSummary = document.querySelector("#reservation-summary");
const smsLink = document.querySelector("#sms-link");
const dateInput = document.querySelector("#reservation-date");
const submitButton = reservationForm.querySelector(".submit-button");

const phonePattern = /^\+?[0-9][0-9 ()-]{5,18}[0-9]$/;

function getLocalDate(date = new Date()) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function cleanField(value) {
  return String(value ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isValidDate(dateString) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return false;
  const date = new Date(`${dateString}T12:00:00`);
  return !Number.isNaN(date.getTime()) && getLocalDate(date) === dateString;
}

dateInput.min = getLocalDate();

reservationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!reservationForm.reportValidity()) return;

  const formData = new FormData(reservationForm);
  const name = cleanField(formData.get("name"));
  const phone = cleanField(formData.get("phone"));
  const email = cleanField(formData.get("email"));
  const date = String(formData.get("date") ?? "");
  const time = String(formData.get("time") ?? "");
  const guests = String(formData.get("guests") ?? "");
  const note = cleanField(formData.get("note"));

  if (name.length < 2) {
    document.querySelector("#guest-name").setCustomValidity("Zadajte meno a priezvisko.");
    document.querySelector("#guest-name").reportValidity();
    document.querySelector("#guest-name").setCustomValidity("");
    return;
  }

  if (!phonePattern.test(phone) || phone.replace(/\D/g, "").length < 7) {
    document.querySelector("#guest-phone").setCustomValidity("Zadajte platné telefónne číslo.");
    document.querySelector("#guest-phone").reportValidity();
    document.querySelector("#guest-phone").setCustomValidity("");
    return;
  }

  if (!isValidDate(date) || date < dateInput.min) {
    dateInput.setCustomValidity("Vyberte dnešný alebo budúci dátum.");
    dateInput.reportValidity();
    dateInput.setCustomValidity("");
    return;
  }

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

  const guestLabel = guests === "1" ? "hosť" : guests === "9+" ? "hostí" : "hostí";
  reservationSummary.textContent = `${date} o ${time} · ${guests} ${guestLabel} · ${name}`;
  smsLink.href = `sms:+421944217722?body=${encodeURIComponent(message)}`;
  reservationResult.hidden = false;

  submitButton.textContent = "Žiadosť pripravená";
  submitButton.disabled = true;
  requestAnimationFrame(() => {
    reservationResult.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "center",
    });
    smsLink.focus({ preventScroll: true });
  });
});

reservationForm.addEventListener("input", (event) => {
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
    event.target.setCustomValidity("");
  }

  submitButton.textContent = "Pripraviť žiadosť";
  submitButton.disabled = false;
});
