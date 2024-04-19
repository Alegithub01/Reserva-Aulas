// useCalendarStore.js

import create from 'zustand';

const useCalendarStore = create((set) => ({
  aula: null,
  dia: null,
  hora: null,
  setAula: (aula) => set({ aula }),
  setDia: (dia) => set({ dia }),
  setHora: (hora) => set({ hora }),
  setSelected: (aula, dia, hora) => set({ aula, dia, hora })
}));

export default useCalendarStore;
