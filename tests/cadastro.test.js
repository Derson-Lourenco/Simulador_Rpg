// cadastro.test.js

const { excluirPersonagem, exibirTodosOsPersonagens } = require('../api/script');
const { JSDOM } = require('jsdom');

// Crie um ambiente simulado do DOM usando jsdom
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;

describe('Testes para funções do script', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('deve excluir personagem', () => {
    // Setup
    const charactersList = [
      { nome: 'Personagem 1', raca: 'Humano' },
      { nome: 'Personagem 2', raca: 'Elfo' },
      { nome: 'Personagem 3', raca: 'Anão' },
    ];

    // Mock localStorage.getItem para retornar a lista de personagens
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValueOnce(JSON.stringify(charactersList));

    // Chame a função que você deseja testar
    excluirPersonagem(1);

    // Asserts
    const charactersAfterDeletion = [
      { nome: 'Personagem 1', raca: 'Humano' },
      { nome: 'Personagem 3', raca: 'Anão' },
    ];

    // Verifique se a função corretamente removeu o personagem da lista
    expect(window.localStorage.setItem).toHaveBeenCalledWith('charactersList', JSON.stringify(charactersAfterDeletion));

    // Pode adicionar mais asserts conforme necessário, dependendo do comportamento esperado
  });

  test('deve exibir todos os personagens na tabela', () => {
    // Mock localStorage.getItem para retornar uma lista de personagens
    const charactersList = [
      { nome: 'Personagem 1', raca: 'Humano' },
      { nome: 'Personagem 2', raca: 'Elfo' },
    ];

    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValueOnce(JSON.stringify(charactersList));

    // Chame a função que você deseja testar
    exibirTodosOsPersonagens();

    // Adicione asserts conforme necessário para verificar se a tabela foi corretamente preenchida
    // Pode inspecionar o estado do DOM para isso usando @testing-library/dom
    // Exemplo: expect(document.querySelector('tbody').children.length).toBe(2);
  });
});
