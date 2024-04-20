// useCalendarStore.js

import create from 'zustand';

const useCalendarStore = create((set) => ({
  aula: "",
  dia: "",
  horario: "",
  setAula: (aula) => set({ aula }),
  setDia: (dia) => set({ dia }),
  setHora: (horario) => set({ horario}),
  setSelected: (aula, dia, horario) => set({ aula, dia, horario })
}));

export default useCalendarStore;
