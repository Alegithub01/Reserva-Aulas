import {create} from 'zustand';

const useNavegacionStore = create((set) => ({
    nClick: 0,
    setClicks: (num) => set({ nClick: num }),
}));

export default useNavegacionStore;