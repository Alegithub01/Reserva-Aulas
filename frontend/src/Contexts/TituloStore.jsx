import create from 'zustand';

const useTituloStore = create(set => ({
  titulo: 'Lorem Ipsum',
  setTitulo: titulo => set(() => ({ titulo })),
}));

export default useTituloStore;