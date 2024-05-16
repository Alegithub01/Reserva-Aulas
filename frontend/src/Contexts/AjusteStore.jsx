import {create} from 'zustand';

const useAjusteStore = create((set) => ({
    fechaInicio: "2024-01-01",
    fechaFin: "2025-01-01",
    nroPeriodosA: "",
    setFechaInicio: (fecha) => set({ fechaInicio: fecha }),
    setFechaFin: (fecha) => set({ fechaFin: fecha }),
    setNroPeriodosAmbiente: (nro) => set({ nroPeriodosA: nro }),
}));

export default useAjusteStore;