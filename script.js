html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: #121212;
  color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

body {
  padding: 1rem;
}

.container {
  width: 100%;
  max-width: 480px;
  padding: 0 1rem;
  box-sizing: border-box;
}

/* Título */
h2 {
  margin-bottom: 2rem;
  font-size: 2.5rem;
  color: #eee;
  line-height: 1.2;
}

/* Botões padrão */
button {
  background-color: #444;
  color: #eee;
  border: 1px solid #666;
  padding: 1.4rem 2rem;
  border-radius: 12px;
  font-size: 1.3rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.3s, border-color 0.3s;
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
  display: block;
}

button:hover {
  background-color: #666;
  border-color: #888;
}

/* Card */
.card {
  background-color: #222;
  border: 1px solid #444;
  border-radius: 16px;
  padding: 2.2rem 1.8rem;
  margin-top: 2rem;
  max-width: 480px;
  width: 100%;
  box-sizing: border-box;
  backdrop-filter: blur(10px);
  box-shadow: 0 6px 16px rgba(255, 255, 255, 0.1);
  font-size: 1.15rem;
  color: #ddd;
}

/* Botão "Escolher outro local" */
#btnOutroLocal {
  background-color: #555;
  border: 1px solid #777;
  color: #eee;
  padding: 1.4rem 2rem;
  font-size: 1.3rem;
  border-radius: 12px;
  width: 100%;
  max-width: 320px;
  margin: 1.5rem auto 0;
  display: block;
}

#btnOutroLocal:hover {
  background-color: #777;
  border-color: #aaa;
}

/* Botões dentro do card (Ver no mapa, Entrar em contato) */
.acoes {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 1rem;
  align-items: center;
}

.acoes button {
  width: 100%;
  max-width: 320px;
  font-size: 1.3rem;
  padding: 1.4rem 2rem;
}

/* Responsividade simples */
@media (min-width: 700px) {
  .acoes {
    flex-direction: row;
    justify-content: center;
    gap: 1.5rem;
  }

  .acoes button {
    width: auto;
    min-width: 180px;
  }

  .botoes {
    flex-direction: row;
  }
}

.botoes {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  width: 100%;
  max-width: 480px;
}
