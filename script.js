document.addEventListener('DOMContentLoaded', () => {
  // 🔒 BLOQUEIO PARA USUÁRIOS DE PC
  const isDesktop = !/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isDesktop) {
    document.body.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; text-align: center; font-family: sans-serif; padding: 20px;">
        <div>
          <h1>⚠️ Acesso restrito</h1>
          <p>Este site está disponível apenas para dispositivos móveis.</p>
        </div>
      </div>
    `;
    return;
  }

  // 🔽 O RESTO DO SEU SCRIPT ABAIXO

  const btnOutro = document.getElementById('btnOutroLocal');
  btnOutro.addEventListener('click', escolherOutroLocal);
});

const celulas = [
  {
    nome: "Célula Centro",
    endereco: "Rua Halfeld, 100 - Centro, Juiz de Fora - MG",
    lat: -21.7645,
    lng: -43.3496,
    telefone: "5531999990001"
  },
  {
    nome: "Célula São Mateus",
    endereco: "Av. Getúlio Vargas, 500 - São Mateus, Juiz de Fora - MG",
    lat: -21.7802,
    lng: -43.3558,
    telefone: "5531999990002"
  },
  {
    nome: "Célula Granbery",
    endereco: "Rua Santo Antônio, 320 - Granbery, Juiz de Fora - MG",
    lat: -21.7549,
    lng: -43.3641,
    telefone: "5531999990003"
  },
  {
    nome: "Célula Benfica",
    endereco: "Rua jardim, 700 - Benfica, Juiz de Fora - MG",
    lat: -21.704802,
    lng: -43.4332869,
    telefone: "5531999990004"
  },
  {
    nome: "Célula Santa Catarina",
    endereco: "Rua Rio Branco, 210 - Santa Catarina, Juiz de Fora - MG",
    lat: -21.7495,
    lng: -43.3600,
    telefone: "5531999990005"
  },
  {
    nome: "Célula Aeroporto",
    endereco: "Av. Brasil, 1200 - Aeroporto, Juiz de Fora - MG",
    lat: -21.7622,
    lng: -43.3425,
    telefone: "5531999990006"
  },
  {
    nome: "Célula Linhares",
    endereco: "Rua Pimenta, 550 - Linhares, Juiz de Fora - MG",
    lat: -21.7734,
    lng: -43.3510,
    telefone: "5531999990007"
  },
  {
    nome: "Célula Teixeiras",
    endereco: "Rua Teixeiras, 90 - Teixeiras, Juiz de Fora - MG",
    lat: -21.7555,
    lng: -43.3585,
    telefone: "5531999990008"
  },
  {
    nome: "Célula Santa Luzia",
    endereco: "Rua Santa Luzia, 430 - Santa Luzia, Juiz de Fora - MG",
    lat: -21.7677,
    lng: -43.3452,
    telefone: "5531999990009"
  },
  {
    nome: "Célula Nova Era",
    endereco: "Av. Rio Branco, 820 - Nova Era, Juiz de Fora - MG",
    lat: -21.7599,
    lng: -43.3612,
    telefone: "5531999990010"
  }
];

let celulaAtual = null;
let listaOrdenada = [];
let indiceAtual = 0;
let posicaoUsuario = null;

function procurarCelula() {
  if (!navigator.geolocation) {
    alert("Geolocalização não suportada pelo seu navegador.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    pos => {
      posicaoUsuario = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
      listaOrdenada = ordenarCelulasPorDistancia(posicaoUsuario.lat, posicaoUsuario.lng);
      indiceAtual = 0;
      mostrarCelula(listaOrdenada[indiceAtual]);
    },
    err => {
      alert("Não foi possível obter sua localização. Por favor, permita o acesso à localização e tente novamente.");
    }
  );
}

function ordenarCelulasPorDistancia(latUser, lngUser) {
  function distancia(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = grausParaRad(lat2 - lat1);
    const dLon = grausParaRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(grausParaRad(lat1)) * Math.cos(grausParaRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function grausParaRad(graus) {
    return graus * Math.PI / 180;
  }

  let celulasComDistancia = celulas.map(celula => {
    return {
      ...celula,
      distancia: distancia(latUser, lngUser, celula.lat, celula.lng)
    };
  });

  celulasComDistancia.sort((a, b) => a.distancia - b.distancia);
  return celulasComDistancia;
}

function mostrarCelula(celula) {
  if (!celula) {
    alert("Não há mais células próximas. Você pode tentar procurar novamente.");
    voltarParaInicio();
    return;
  }
  celulaAtual = celula;
  document.getElementById('nomeCelula').innerText = `🔥 ${celula.nome}`;
  document.getElementById('enderecoCelula').innerText = celula.endereco;

  document.getElementById('cardCelula').style.display = 'block';
  document.getElementById('botoes-iniciais').style.display = 'none';
}

function verNoMapa() {
  if (!celulaAtual) return;
  const endereco = encodeURIComponent(celulaAtual.endereco);
  const url = `https://www.google.com/maps/search/?api=1&query=${endereco}`;
  window.open(url, '_blank');
}

function entrarEmContato() {
  if (!celulaAtual) return;
  window.open(`https://wa.me/${celulaAtual.telefone}`, "_blank");
}

function escolherOutroLocal() {
  indiceAtual++;
  if (indiceAtual >= listaOrdenada.length) {
    alert("Você já viu todas as células próximas.");
    voltarParaInicio();
  } else {
    mostrarCelula(listaOrdenada[indiceAtual]);
  }
}

function voltarParaInicio() {
  document.getElementById('cardCelula').style.display = 'none';
  document.getElementById('botoes-iniciais').style.display = 'flex';
  celulaAtual = null;
  listaOrdenada = [];
  indiceAtual = 0;
  posicaoUsuario = null;
}
