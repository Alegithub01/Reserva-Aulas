// usuarioStore.js
import create from 'zustand';

const UsuarioStore = create((set) => ({
  nombre: 'Jhon Doe',
  correo: 'Jhondoe@gmail.com',

  actualizarNombre: (nuevoNombre) => set({ nombre: nuevoNombre }),
  actualizarCorreo: (nuevoCorreo) => set({ correo: nuevoCorreo }),

  actualizarUsuario: ({ nuevoNombre, nuevoCorreo }) => set({
    nombre: nuevoNombre || 'Jhon Doe',
    correo: nuevoCorreo || 'jhondoe@gmail.com',
  }),
}));

export default UsuarioStore;