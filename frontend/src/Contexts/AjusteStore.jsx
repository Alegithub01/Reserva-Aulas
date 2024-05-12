import {create} from 'zustand';

const useAjusteStore = create((set) => ({
    fechaInicio: "",
    fechaFin: "",
    nroPeriodosA: "",
    setFechaInicio: (fecha) => set({ fechaInicio: fecha }),
    setFechaFin: (fecha) => set({ fechaFin: fecha }),
    setNroPeriodosAmbiente: (nro) => set({ nroPeriodosA: nro }),
}));

export default useAjusteStore;