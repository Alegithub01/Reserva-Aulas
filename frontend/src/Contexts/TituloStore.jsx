import create from 'zustand';

const useTituloStore = create(set => ({
  titulo: ' ',
  setTitulo: titulo => set(() => ({ titulo })),
}));

export default useTituloStore;