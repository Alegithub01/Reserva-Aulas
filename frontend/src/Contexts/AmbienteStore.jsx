import create from 'zustand';

const AmbienteStore = create(set => ({
  ambientes: [],

  agregarAmbiente: (ambiente) => set(state => {
    const nuevosAmbientes = [...state.ambientes, ambiente];
    console.log("Ambiente agregado. Lista actualizada:", nuevosAmbientes);
    return { ambientes: nuevosAmbientes };
  }),

  eliminarAmbiente: (id) => set(state => {
    const ambientesActualizados = state.ambientes.filter(ambiente => ambiente.id !== id);
    console.log("Ambiente eliminado. Lista actualizada:", ambientesActualizados);
    return { ambientes: ambientesActualizados };
  }),

  esAmbienteSeleccionado: (id) => state => state.ambientes.some(ambiente => ambiente.id === id)
}));

export default AmbienteStore;
