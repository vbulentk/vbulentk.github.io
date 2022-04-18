const kelime = document.querySelector("#kelime");
const kelimeYaz = document.querySelector("#kelimeYaz");
const kelimeOku = document.querySelector("#kelimeOku");

kelime.addEventListener("keyup", (e) => {
  if (e.which === 13) {
    kelimeAdd();
  }
});

function kelimeAdd() {
  if (kelime.value === "") {
    myalert();
  } else {
    let kelimeAl = kelime.value;

    sozlukTdk(kelime);
    kelimeYaz.innerHTML = kelimeAl;
    kelime.value = "";
  }
}

function sozlukTdk(kelime) {
  console.log("https://sozluk.gov.tr/gts?ara=" + kelime.value);
  fetch("https://sozluk.gov.tr/gts?ara=" + kelime.value)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      kelimeOku.innerHTML = data[0].anlamlarListe[0].anlam;
      kelimeOku.innerHTML = `
                <p class="word-example">
                   ${data[0].anlamlarListe[0].anlam}
                </p>`;
    })
    .catch(function () {
      kelimeOku.innerHTML = `<h3 class="error">Kelime Bulunamadı.</h3>`;
    });
}
function myalert() {
  kelimeOku.innerHTML = "";
  kelimeYaz.innerHTML = "";
  kelimeOku.innerHTML = `<h3 class="error">Lütfen bir kelime Girin</h3>`;
}
