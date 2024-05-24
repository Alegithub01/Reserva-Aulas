// src/stores/AmbienteStore.js
import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

const useAmbienteStore = create(subscribeWithSelector((set, get) => ({
  ambientesSeleccionados: [],
  setAmbientesSeleccionados: (ambientes) => set({ ambientesSeleccionados: ambientes }),
})));

// useAmbienteStore.subscribe(
//   state => state.ambientesSeleccionados,
//   ambientesSeleccionados => {
//     console.log("Ambientes en el store:", ambientesSeleccionados);
//   }
// );

export default useAmbienteStore;
