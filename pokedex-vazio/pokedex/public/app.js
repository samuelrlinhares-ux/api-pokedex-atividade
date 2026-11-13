const form = document.getElementById('busca');
const aviso = document.getElementById('aviso');
const resultado = document.getElementById('resultado');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const termo = form.termo.value.trim();

  try {
    const resposta = await fetch(`/api/pokemons/${encodeURIComponent(termo)}`);
    const corpo = await resposta.json();
    if (!resposta.ok) throw new Error(corpo.erro);

    // textContent: o texto da API nunca vira código HTML.
    document.getElementById('numero').textContent = `#${String(corpo.numero).padStart(3, '0')}`;
    document.getElementById('nome').textContent = corpo.nome;
    document.getElementById('tipos').textContent = corpo.tipos.join(' / ');
    document.getElementById('imagem').src = corpo.imagem ?? '';
    document.getElementById('imagem').alt = corpo.nome;

    aviso.hidden = true;
    resultado.hidden = false;
  } catch (erro) {
    aviso.textContent = erro.message;
    aviso.hidden = false;
    resultado.hidden = true;
  }
});
