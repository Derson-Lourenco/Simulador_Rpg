document.addEventListener("DOMContentLoaded", function () {
  let charactersList = JSON.parse(localStorage.getItem('charactersList')) || [];
  let listaArenaA = JSON.parse(localStorage.getItem('listaArenaA')) || [];
  let listaArenaB = JSON.parse(localStorage.getItem('listaArenaB')) || [];

  let cellAcao;

  function excluirPersonagem(index) {
    charactersList.splice(index, 1);
    salvarNoLocalStorage();
    exibirPersonagensSalvos();
    window.location.reload();
  }

  function salvarNoLocalStorage() {
    localStorage.setItem('charactersList', JSON.stringify(charactersList));
  }

  function salvarListaArenaA() {
    localStorage.setItem('listaArenaA', JSON.stringify(listaArenaA));
  }

  function salvarListaArenaB() {
    localStorage.setItem('listaArenaB', JSON.stringify(listaArenaB));
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
        row.classList.add('cor-text');

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

        if (window.location.pathname.includes('arena.html')) {
          const arenaAButton = document.createElement('button');
          arenaAButton.innerHTML = '<i class="fa-solid fa-a"></i>';
          arenaAButton.addEventListener('click', () => {
            adicionarNaListaArenaA(character);
          });

          const arenaBButton = document.createElement('button');
          arenaBButton.innerHTML = '<i class="fa-solid fa-b"></i>';
          arenaBButton.addEventListener('click', () => {
            adicionarNaListaArenaB(character);
          });

          cellAcao = row.insertCell(7);
          cellAcao.appendChild(arenaAButton);
          cellAcao.appendChild(arenaBButton);
        } else {
          const viewButton = document.createElement('button');
          viewButton.innerHTML = '<i class="fa-solid fa-eye"></i>';
          viewButton.addEventListener('click', () => {
            console.log(`Visualizar detalhes do personagem: ${character.nome}`);
          });

          const editButton = document.createElement('button');
          editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
          editButton.addEventListener('click', () => {
            console.log(`Editar personagem: ${character.nome}`);
          });

          const deleteButton = document.createElement('button');
          deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
          deleteButton.addEventListener('click', () => {
            excluirPersonagem(index);
          });

          cellAcao = row.insertCell(7);
          cellAcao.appendChild(viewButton);
          cellAcao.appendChild(editButton);
          cellAcao.appendChild(deleteButton);
        }
      });
    } else {
      console.error('Elemento <tbody> não encontrado no DOM.');
    }
  }

  function adicionarNaListaArenaA(character) {
    listaArenaA.push(character);
    salvarListaArenaA();
    exibirListasNaSimulacao();
  }

  function adicionarNaListaArenaB(character) {
    listaArenaB.push(character);
    salvarListaArenaB();
    exibirListasNaSimulacao();
  }

  function exibirListasNaSimulacao() {
    const simulacaoDiv = document.querySelector('.simulacao.container');
  
    if (simulacaoDiv) {
      simulacaoDiv.innerHTML = '';
  
      const listaArenaAContainer = document.createElement('div');
      listaArenaAContainer.classList.add('lista-arena');
      listaArenaAContainer.innerHTML = '<h2>Lista Arena A</h2>';
      listaArenaA.forEach((character) => {
        const characterInfo = document.createElement('p');
        characterInfo.textContent = `${character.nome} - ${character.classPersonagem}`;
        listaArenaAContainer.appendChild(characterInfo);
      });
  
      const listaArenaBContainer = document.createElement('div');
      listaArenaBContainer.classList.add('lista-arena');
      listaArenaBContainer.innerHTML = '<h2>Lista Arena B</h2>';
      listaArenaB.forEach((character) => {
        const characterInfo = document.createElement('p');
        characterInfo.textContent = `${character.nome} - ${character.classPersonagem}`;
        listaArenaBContainer.appendChild(characterInfo);
      });
  
      simulacaoDiv.appendChild(listaArenaAContainer);
      simulacaoDiv.appendChild(listaArenaBContainer);
  
      const simulacaoButton = document.createElement('button');
      simulacaoButton.textContent = 'Simulação';
      simulacaoButton.addEventListener('click', () => {
        console.log('Lista Arena A:', listaArenaA);
        console.log('Lista Arena B:', listaArenaB);
      });
  
      const cancelarButton = document.createElement('button');
      cancelarButton.textContent = 'Cancelar';
      cancelarButton.addEventListener('click', () => {
        listaArenaA = [];
        listaArenaB = [];
        salvarListaArenaA();
        salvarListaArenaB();
        exibirListasNaSimulacao();
      });
  
      simulacaoDiv.appendChild(simulacaoButton);
      simulacaoDiv.appendChild(cancelarButton);
    } else {
      console.error('Elemento .simulacao.container não encontrado no DOM.');
    }
  }

  exibirTodosOsPersonagens();
  exibirListasNaSimulacao();

  const form = document.getElementById('personagemForm');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const nome = document.getElementById('nome').value;
      const raca = document.getElementById('raca').value;
      const vida = document.getElementById('vida').value;
      const classPersonagem = document.getElementById('ClassPersonagem').value;
      const ataque = document.getElementById('ataque').value;
      const defesa = document.getElementById('defesa').value;

      const newCharacter = {
        nome,
        raca,
        vida,
        classPersonagem,
        ataque,
        defesa
      };

      charactersList.push(newCharacter);

      salvarNoLocalStorage();
      exibirTodosOsPersonagens();

      form.reset();
    });
  } else {
    console.error('Formulário não encontrado no DOM.');
  }
});
