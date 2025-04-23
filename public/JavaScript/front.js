// Hent lagret dynamisk bakgrunnsinnstilling fra localStorage
let dynamicBackground = localStorage.getItem("dynamicBackground") === "true"; // Henter fra localStorage

// Hent lagret bakgrunns-overlay-farge fra localStorage (hvis tilgjengelig)
let savedColor = localStorage.getItem("savedColor") || "rgba(0, 0, 0, 0.4)"; // Standardverdi hvis ingen farge er lagret

// Hvis dynamisk bakgrunn er aktivert, legg til klassen
if (dynamicBackground) {
  document.body.classList.add('dynamic-background');
  // Sett den lagrede bakgrunns-overlay-fargen
  document.body.style.setProperty('--overlay-color', savedColor);
} else {
  document.body.classList.remove('dynamic-background');
}

// Lytt etter musebevegelser for å oppdatere bakgrunnsfargen når effekten er aktiv
document.addEventListener("mousemove", function (e) {
  if (!dynamicBackground) return; // Hvis dynamisk bakgrunn ikke er aktiv, gjør ingenting

  // Få musens posisjon i forhold til vinduet
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  // Beregn en ny farge basert på musens posisjon
  const red = Math.floor(x * 220);
  const green = Math.floor(y * 220);
  const blue = Math.floor((1 - x) * 220);

  // Dynamisk bakgrunns-overlay-farge
  const newColor = `rgba(${red}, ${green}, ${blue}, 0.2)`;
  document.body.style.setProperty('--overlay-color', newColor);

  // Lagre den nye fargen i localStorage
  localStorage.setItem("savedColor", newColor);
});

// Lytt etter endring på dropdown for å slå på/av dynamisk bakgrunn
document.getElementById("toggleEffect").addEventListener("change", function () {
  dynamicBackground = this.value === "on"; // Oppdater dynamisk bakgrunnsstatus basert på valget
  localStorage.setItem("dynamicBackground", dynamicBackground); // Lagre innstillingen i localStorage

  // Legg til eller fjern "dynamic-background" klassen basert på innstillingen
  if (!dynamicBackground) {
    document.body.classList.remove('dynamic-background'); // Fjern bakgrunnseffekten
  } else {
    document.body.classList.add('dynamic-background'); // Aktiver bakgrunnseffekten
    // Når effekten er slått på, sett lagret bakgrunns-overlay-farge
    document.body.style.setProperty('--overlay-color', savedColor);
  }
});

// Aktiverer "active"-klassen på lenkene i navigasjonen basert på gjeldende side
const topClass = document.querySelectorAll(".top-bar a");
const currentPath = window.location.pathname.split("/").pop(); // Får filnavnet fra URL (f.eks. "om.html")

topClass.forEach(link => {
  const linkPath = link.getAttribute("href");
  // Hvis lenken matcher gjeldende side, legg til "active" klassen
  if (linkPath === currentPath) {
    link.classList.add("active");
  }
});
