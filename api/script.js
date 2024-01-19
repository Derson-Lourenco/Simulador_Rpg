document.addEventListener('DOMContentLoaded', function () {
  const charactersList = JSON.parse(localStorage.getItem('charactersList')) || [];
  let cellAcao, cellArena;
  const listaArenaA = [];
  const listaArenaB = [];


  function excluirPersonagem(index, charactersList) {
    charactersList.splice(index, 1);
    salvarNoLocalStorage();
    exibirPersonagensSalvos();
    location.reload();
  }

  function salvarNoLocalStorage() {
    localStorage.setItem('charactersList', JSON.stringify(charactersList));
  }

  function exibirPersonagensSalvos() {
    console.log("Personagens atualizados:", charactersList);
  }

  function exibirTodosOsPersonagens() {
    const tableBody = document.querySelector('tbody');

    if (tableBody) {
      tableBody.innerHTML = '';

      charactersList.forEach((character, index) => {
        const row = tableBody.insertRow();

        const cellNum = row.insertCell(0);
        const cellNome = row.insertCell(1);
        const cellRaca = row.insertCell(2);
        const cellVida = row.insertCell(3);
        const cellClasse = row.insertCell(4);
        const cellAtaque = row.insertCell(5);
        const cellDefesa = row.insertCell(6);

        cellNum.textContent = index + 1;
        cellNome.textContent = character.nome;
        cellRaca.textContent = character.raca;
        cellVida.textContent = character.vida;
        cellClasse.textContent = character.classPersonagem;
        cellAtaque.textContent = character.ataque;
        cellDefesa.textContent = character.defesa;

        row.cells[0].classList.add('cor-text');
        row.cells[1].classList.add('cor-text');
        row.cells[2].classList.add('cor-text');
        row.cells[3].classList.add('cor-text');
        row.cells[4].classList.add('cor-text');
        row.cells[5].classList.add('cor-text');
        row.cells[6].classList.add('cor-text');

        adicionarBotoesPadrao(row, index);
        adicionarBotoesArena(row, index);
      });
    } else {
      console.error('Elemento <tbody> não encontrado no DOM.');
    }
  }

  function adicionarBotoesPadrao(row, index) {
    const isPersonagensPage = window.location.pathname.endsWith('personagens.html');
    const isArenaPage = window.location.pathname.endsWith('arena.html');
  
    if (isPersonagensPage) {
      const editButton = document.createElement('button');
      editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
      editButton.addEventListener('click', () => {
        editarPersonagem(index);
      });
  
      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
      deleteButton.addEventListener('click', () => {
        excluirPersonagem(index, charactersList); // Adicione charactersList como argumento
      });
  
      cellAcao = row.insertCell(7);
      cellAcao.appendChild(editButton);
      cellAcao.appendChild(deleteButton);
    }
  }


  function adicionarBotoesArena(row, index) {
    const isArenaPage = window.location.pathname.endsWith('arena.html');

    if (isArenaPage) {
      // Adicionar botões de Arena apenas na página arena.html
      const btnEscolherLadoA = document.createElement('button');
      btnEscolherLadoA.textContent = 'A';
      btnEscolherLadoA.addEventListener('click', () => {
        escolherArena(charactersList[index], 'A');
      });

      const btnEscolherLadoB = document.createElement('button');
      btnEscolherLadoB.textContent = 'B';
      btnEscolherLadoB.addEventListener('click', () => {
        escolherArena(charactersList[index], 'B');
      });

      cellArena = row.insertCell(7);
      cellArena.appendChild(btnEscolherLadoA);
      cellArena.appendChild(btnEscolherLadoB);
    }
  }

  function editarPersonagem(index) {
    const personagemSelecionado = charactersList[index];
    document.getElementById('nome').value = personagemSelecionado.nome;
    document.getElementById('raca').value = personagemSelecionado.raca;
    document.getElementById('vida').value = personagemSelecionado.vida;
    document.getElementById('ClassPersonagem').value = personagemSelecionado.classPersonagem;
    document.getElementById('ataque').value = personagemSelecionado.ataque;
    document.getElementById('defesa').value = personagemSelecionado.defesa;
    document.getElementById('editIndex').value = index;

    const submitButton = document.getElementById('ButãoCadastro');
    submitButton.textContent = 'Salvar Edição';

    const form = document.getElementById('personagemForm');
    form.removeEventListener('submit', cadastrarPersonagem);
    form.addEventListener('submit', salvarEdicaoPersonagem);
  }

  function salvarEdicaoPersonagem(event) {
    event.preventDefault();

    const index = document.getElementById('editIndex').value;
    const nome = document.getElementById('nome').value;
    const raca = document.getElementById('raca').value;
    const vida = document.getElementById('vida').value;
    const classPersonagem = document.getElementById('ClassPersonagem').value;
    const ataque = document.getElementById('ataque').value;
    const defesa = document.getElementById('defesa').value;

    const personagemEditado = {
      nome,
      raca,
      vida,
      classPersonagem,
      ataque,
      defesa
    };

    charactersList[index] = personagemEditado;
    salvarNoLocalStorage();
    exibirTodosOsPersonagens();

    document.getElementById('ButãoCadastro').textContent = 'Cadastrar';
    document.getElementById('editIndex').value = '';

    event.target.removeEventListener(event.type, salvarEdicaoPersonagem);
  }

  function escolherArena(personagem, lado) {
    // Atribuir ordem de ataque aleatória
    personagem.ordemAtaque = Math.floor(Math.random() * 100) + 1;

    if (lado === 'A') {
      listaArenaA.push(personagem);
      exibirPersonagensArenaA();
    } else if (lado === 'B') {
      listaArenaB.push(personagem);
      exibirPersonagensArenaB();
    }
  }

  function exibirPersonagensArenaA() {
    const listaArenaAElement = document.getElementById('listaArenaA');
    if (listaArenaAElement) {
      listaArenaAElement.innerHTML = '';
      listaArenaA.forEach((personagem, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          ${index + 1}. ${personagem.nome} - 
          Vida: ${personagem.vida}, 
          Ataque: ${personagem.ataque}, 
          Defesa: ${personagem.defesa}`;
        listItem.classList.add('cor-text'); // Adiciona a mesma classe 'cor-text' aos elementos da Lista A
        listaArenaAElement.appendChild(listItem);
      });
    }
  }
  
  function exibirPersonagensArenaB() {
    const listaArenaBElement = document.getElementById('listaArenaB');
    if (listaArenaBElement) {
      listaArenaBElement.innerHTML = '';
      listaArenaB.forEach((personagem, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          ${index + 1}. ${personagem.nome} - 
          Vida: ${personagem.vida}, 
          Ataque: ${personagem.ataque}, 
          Defesa: ${personagem.defesa}`;
        listItem.classList.add('cor-text'); // Adiciona a mesma classe 'cor-text' aos elementos da Lista B
        listaArenaBElement.appendChild(listItem);
      });
    }
  }
  

  function isArenaPage() {
    // Verifica se a página atual é a arena.html
    return window.location.pathname.endsWith('arena.html');
  }

  const btnCancelar = document.getElementById('btnCancelar');

  if (btnCancelar) {
    btnCancelar.addEventListener('click', () => {
      // Limpar as listas ArenaA e ArenaB apenas na página arena.html
      if (isArenaPage()) {
        listaArenaA.length = 0;
        listaArenaB.length = 0;
        exibirPersonagensArenaA();
        exibirPersonagensArenaB();
        limparResultadoBatalha();
      }
    });
  } else {
    console.error('Botão Cancelar não encontrado no DOM.');
  }

  const form = document.getElementById('personagemForm');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const nome = document.getElementById('nome').value;
      const raca = document.getElementById('raca').value;
      const vida = document.getElementById('vida').value;
      const classPersonagem = document.getElementById('ClassPersonagem').value;
      const ataque = document.getElementById('ataque').value;
      const defesa = document.getElementById('defesa').value;
      const editIndex = document.getElementById('editIndex').value;

      if (editIndex !== '') {
        const personagemEditado = {
          nome,
          raca,
          vida,
          classPersonagem,
          ataque,
          defesa
        };
        charactersList[editIndex] = personagemEditado;
      } else {
        const newCharacter = {
          nome,
          raca,
          vida,
          classPersonagem,
          ataque,
          defesa,
        };
        charactersList.push(newCharacter);
      }

      document.getElementById('editIndex').value = '';

      salvarNoLocalStorage();
      exibirTodosOsPersonagens();

      form.reset();
    });
  } else {
    console.error('Formulário não encontrado no DOM.');
  }

  // Exibir personagens ao carregar a página
  exibirTodosOsPersonagens();

  // Adicionando a funcionalidade de simulação de batalha
  const btnSimularBatalha = document.getElementById('btnSimularBatalha');

  if (btnSimularBatalha) {
    btnSimularBatalha.addEventListener('click', () => {
      // Verificar se há personagens nas listas A e B
      if (listaArenaA.length > 0 && listaArenaB.length > 0) {
        // Simular a batalha
        simularBatalha();
      } else {
        alert('Adicione personagens às listas A e B para simular a batalha.');
      }
    });
  } else {
    console.error('Botão Simular Batalha não encontrado no DOM.');
  }

  function limparResultadoBatalha() {
    const resultadoElement = document.getElementById('resultadoBatalha');

    if (resultadoElement) {
      resultadoElement.innerHTML = '';
    } else {
      console.error('Elemento <div id="resultadoBatalha"> não encontrado no DOM.');
    }
  }

  function exibirResultadoBatalha(vencedor) {
    const resultadoElement = document.getElementById('resultadoBatalha');
  
    if (resultadoElement) {
      limparResultadoBatalha(); // Limpar resultados anteriores
  
      if (vencedor) {
        const vencedorElement = document.createElement('div');
        vencedorElement.textContent = `Vencedor: ${vencedor.nome}`;
        vencedorElement.classList.add('cor-text', 'vencedor'); // Adicione a classe 'cor-text' e 'vencedor'
        resultadoElement.appendChild(vencedorElement);
      } else {
        const empateElement = document.createElement('div');
        empateElement.textContent = 'A batalha terminou em empate.';
        empateElement.classList.add('cor-text'); // Adicione a classe 'cor-text' ao resultado de empate
        resultadoElement.appendChild(empateElement);
      }
  
      resultadoElement.style.textAlign = 'center'; // Adicione esta linha para centralizar o texto
  
      // Limpar listas ArenaA e ArenaB após exibir o resultado
      listaArenaA.length = 0;
      listaArenaB.length = 0;
      exibirPersonagensArenaA();
      exibirPersonagensArenaB();
    } else {
      console.error('Elemento <div id="resultadoBatalha"> não encontrado no DOM.');
    }
  }
  
  


  function simularBatalha() {
    let turno = 1;

    while (listaArenaA.length > 0 && listaArenaB.length > 0) {
      // Ordenar as listas com base na ordem de ataque
      listaArenaA.sort((a, b) => a.ordemAtaque - b.ordemAtaque);
      listaArenaB.sort((a, b) => a.ordemAtaque - b.ordemAtaque);

      const personagemAtacanteA = listaArenaA[0];
      const personagemAtacanteB = listaArenaB[0];

      // Simular ataque do lado A
      if (personagemAtacanteA) {
        const valorAtaqueA = Math.floor(Math.random() * personagemAtacanteA.ataque) + 1;

        const personagemAlvoB = listaArenaB[Math.floor(Math.random() * listaArenaB.length)];
        if (personagemAlvoB) {
          const valorDefesaB = Math.floor(Math.random() * personagemAlvoB.defesa) + 1;

          const danoA = Math.max(valorAtaqueA - valorDefesaB, 0);

          personagemAlvoB.vida -= danoA;

          if (personagemAlvoB.vida <= 0) {
            listaArenaB.splice(listaArenaB.indexOf(personagemAlvoB), 1);
          }
        }
      }

      // Simular ataque do lado B
      if (personagemAtacanteB) {
        const valorAtaqueB = Math.floor(Math.random() * personagemAtacanteB.ataque) + 1;

        const personagemAlvoA = listaArenaA[Math.floor(Math.random() * listaArenaA.length)];
        if (personagemAlvoA) {
          const valorDefesaA = Math.floor(Math.random() * personagemAlvoA.defesa) + 1;

          const danoB = Math.max(valorAtaqueB - valorDefesaA, 0);

          personagemAlvoA.vida -= danoB;

          if (personagemAlvoA.vida <= 0) {
            listaArenaA.splice(listaArenaA.indexOf(personagemAlvoA), 1);
          }
        }
      }

      turno++;
    }

    // Verificar o vencedor
    if (listaArenaA.length > 0) {
      exibirResultadoBatalha(listaArenaA[0]);
    } else if (listaArenaB.length > 0) {
      exibirResultadoBatalha(listaArenaB[0]);
    } else {
      exibirResultadoBatalha(null); // Empate
    }
  }
  
});