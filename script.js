const celulas = [
   {
    nome: "Célula Norte",
    endereco: "Rua B, Zona Norte",
    mapa: "https://www.google.com/maps/place/-23.48052,-46.620308",
    whatsapp: "https://wa.me/5511888888888"
  }
,    
{
    nome: "Célula aqula",
    endereco: "Rua A, Centro",
    mapa: "https://www.google.com/maps/place/-21.705275, -43.418146",
    whatsapp: "https://wa.me/5511999999999"
  }
 
];

let celulasOrdenadas = [];
let indexAtual = 0;

function localizarUsuario() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const userLat = pos.coords.latitude;
      const userLon = pos.coords.longitude;

      const celulasComCoords = celulas.map(c => {
        const coords = extrairCoordenadasDoLink(c.mapa);
        return {
          ...c,
          lat: coords.lat,
          lon: coords.lon,
          distancia: calcularDistancia(userLat, userLon, coords.lat, coords.lon)
        };
      });

      celulasComCoords.sort((a, b) => a.distancia - b.distancia);
      celulasOrdenadas = celulasComCoords;
      indexAtual = 0;
      exibirCelula(celulasOrdenadas[0]);
    }, () => alert("Erro ao obter localização."));
  } else {
    alert("Seu navegador não suporta geolocalização.");
  }
}

function extrairCoordenadasDoLink(link) {
  const match = link.match(/([-]?\d{1,3}\.\d+),\s*([-]?\d{1,3}\.\d+)/);
  if (match) {
    return {
      lat: parseFloat(match[1]),
      lon: parseFloat(match[2])
    };
  } else {
    alert("Erro ao ler coordenadas do link do mapa.");
    return { lat: 0, lon: 0 };
  }
}

function exibirCelula(celula) {
  const div = document.getElementById('resultado');
  div.innerHTML = `
    <h3>🔍 Célula mais próxima</h3>
    <p><strong>${celula.nome}</strong></p>
    <p>${celula.endereco}</p>
    <a href="${celula.mapa}" target="_blank">📍 Ver no Mapa</a><br><br>
    <button class="btn-aceitar" onclick="window.open('${celula.whatsapp}', '_blank')">✅ Aceitar</button>
    <button class="btn-recusar" onclick="verProxima()">❌ Recusar</button>
  `;
  div.style.display = 'block';
}

function verProxima() {
  indexAtual++;
  if (indexAtual < celulasOrdenadas.length) {
    exibirCelula(celulasOrdenadas[indexAtual]);
  } else {
    document.getElementById('resultado').innerHTML = "<p>Não há mais células próximas disponíveis.</p>";
  }
}

function calcularDistancia(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
