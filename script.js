
function carregarProjetos() {
  const projetos = JSON.parse(localStorage.getItem('projetos')) || [];
  projetos.forEach(projeto => adicionarProjetoNaLista(projeto));
}


function adicionarProjetoNaLista(projeto) {
  const projetosUl = document.getElementById('projetos');
  const li = document.createElement('li');
  
  li.innerHTML = `
      <span>${projeto.nome} - ${projeto.responsavel} - ${projeto.semanas} semanas</span>
      <button class="concluir">Concluir</button>
  `;
  
  projetosUl.appendChild(li);
  

  li.querySelector('.concluir').addEventListener('click', function() {
      li.querySelector('span').classList.toggle('feito');
      this.textContent = this.textContent === 'Concluir' ? 'Feito' : 'Concluir';
      this.disabled = true; 
  });
}


function salvarProjeto(nome, responsavel, semanas) {
  const projetos = JSON.parse(localStorage.getItem('projetos')) || [];
  projetos.push({ nome, responsavel, semanas });
  localStorage.setItem('projetos', JSON.stringify(projetos));
}

document.getElementById('adicionar').addEventListener('click', function() {
  const nomeProjeto = document.getElementById('nome-projeto').value;
  const responsavel = document.getElementById('responsavel').value;
  const semanas = parseInt(document.getElementById('semanas').value);

  if (nomeProjeto && responsavel && semanas > 0) {
      adicionarProjetoNaLista({ nome: nomeProjeto, responsavel, semanas });
      salvarProjeto(nomeProjeto, responsavel, semanas);


      document.getElementById('nome-projeto').value = '';
      document.getElementById('responsavel').value = '';
      document.getElementById('semanas').value = '';
  } else {
      alert('Por favor, preencha todos os campos.');
  }
});

carregarProjetos();
