document.getElementById('eddigicipok').onclick = cipokLista;

async function cipokLista() {
    const response = await fetch("/cipok");
    const cipok = await response.json();

    var cipoHTML = "<h1>Az eddigi cipők listája:</h1>";
    cipoHTML += `<table id="tabla"><tr><th>Márka</th><th>Nem</th><th>Méret</th><th>Ár</th>`;
    for (const egyCipo of cipok) {
        cipoHTML += `<tr><td>${egyCipo.marka}</td><td>${egyCipo.nem}</td><td>${egyCipo.meret}</td><td>${egyCipo.ar}</td>`;
    }
    cipoHTML += `</table>`;

    document.getElementById("cipo").innerHTML = cipoHTML;
}

document.getElementById("cipoform").onsubmit = async function (event) {
    event.preventDefault();
    const marka = event.target.elements.marka.value;
    const nem= event.target.elements.nem.value;
    const meret = event.target.elements.meret.value;
    const ar= event.target.elements.ar.value;
    const res = await fetch("/cipok", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({marka,nem,meret,ar})
    });

    if (res.ok) {
        cipokLista();
    } else {
        alert("Server error");
    }
};