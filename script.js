// Função para carregar projetos do localStorage
function carregarProjetos() {
  const projetos = JSON.parse(localStorage.getItem('projetos')) || [];
  projetos.forEach(projeto => adicionarProjetoNaLista(projeto));
}

// Função para adicionar um projeto na lista
function adicionarProjetoNaLista(projeto) {
  const projetosUl = document.getElementById('projetos');
  const li = document.createElement('li');
  
  li.innerHTML = `
      <span>${projeto.nome} - ${projeto.responsavel} - ${projeto.semanas} semanas</span>
      <button class="concluir">Concluir</button>
  `;
  
  projetosUl.appendChild(li);
  
  // Adicionar funcionalidade de concluir
  li.querySelector('.concluir').addEventListener('click', function() {
      li.querySelector('span').classList.toggle('feito');
      this.textContent = this.textContent === 'Concluir' ? 'Feito' : 'Concluir';
      this.disabled = true; // Desabilitar o botão após conclusão
  });
}

// Função para salvar projetos no localStorage
function salvarProjeto(nome, responsavel, semanas) {
  const projetos = JSON.parse(localStorage.getItem('projetos')) || [];
  projetos.push({ nome, responsavel, semanas });
  localStorage.setItem('projetos', JSON.stringify(projetos));
}

// Evento de clique para adicionar projeto
document.getElementById('adicionar').addEventListener('click', function() {
  const nomeProjeto = document.getElementById('nome-projeto').value;
  const responsavel = document.getElementById('responsavel').value;
  const semanas = parseInt(document.getElementById('semanas').value);

  if (nomeProjeto && responsavel && semanas > 0) {
      adicionarProjetoNaLista({ nome: nomeProjeto, responsavel, semanas });
      salvarProjeto(nomeProjeto, responsavel, semanas);

      // Resetar campos do formulário
      document.getElementById('nome-projeto').value = '';
      document.getElementById('responsavel').value = '';
      document.getElementById('semanas').value = '';
  } else {
      alert('Por favor, preencha todos os campos.');
  }
});

// Carregar projetos ao iniciar a página
carregarProjetos();
