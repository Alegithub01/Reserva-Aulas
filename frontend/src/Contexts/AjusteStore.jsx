import {create} from 'zustand';

const useAjusteStore = create((set) => ({
    fechaInicio: "2024-01-01",
    fechaFin: "2025-01-01",
    nroPeriodosAul: "1",
    nroPeriodosAud: "1",
    nroPeriodosLab: "10",
    setFechaInicio: (fecha) => set({ fechaInicio: fecha }),
    setFechaFin: (fecha) => set({ fechaFin: fecha }),
    setNroPeriodosAul: (nro) => set({ nroPeriodosAul: nro }),
    setNroPeriodosAud: (nro) => set({ nroPeriodosAud: nro }),
    setNroPeriodosLab: (nro) => set({ nroPeriodosLab: nro }),
}));

export default useAjusteStore;