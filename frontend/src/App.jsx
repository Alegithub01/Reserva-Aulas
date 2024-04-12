// import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Contexts/ThemeContext";
import Layout from "./Navegacion/Layout";
import PantallaAmbientes from "./PantallaAmbientes/PantallaAmbientes";
import PantallaInicioSesion from "./PantallaInicioSesion/PantallaInicioSesion";
import PantallaRegistro from "./PantallaRegistro/PantallaRegistro";
import PantallaModulos from "./PantallaModulos/PantallaModulos";
import PantallaPrincipal from "./PantallaPrincipal/PantallaPrincipal";
import PantallaUsuarios from "./PantallaUsuarios/PantallaUsuarios";
import PanelGestionUsuarios from "./PantallaModulos/PanelGestionUsuarios";
import CrearRol from "../src/PantallaUsuarios/UsuarioModule2"
import RegistroMasivoUsuarios from "../src/PantallaUsuarios/UsuarioModule3"
import ListaUsuarios from "../src/PantallaUsuarios/UsuarioModule1"
import PanelGestionAmbientes from "./PantallaModulos/PanelGestionAmbientes";
import ListaAmbientes from "../src/PantallaAmbientes/AdminHomeModule1"
import RegistroAmbiente from "../src/PantallaAmbientes/AdminHomeModule2"
import RegistroMasivoAmbientes from "../src/PantallaAmbientes/AdminHomeModule3"
import GestionReservas from "./PantallaGestionReserva/GestionReservas";
import PanelSolicitudReservas from "./PantallaModulos/PanelSolicitudReservas";
import Solicitud from "./PantallaSolicitudReserva/Solicitud";
import Calendario from "./PantallaSolicitudReserva/Calendario";
import Reservas from "./PantallaSolicitudReserva/Reservas";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/inicioSesion"
            element={
              <div
                style={{
                  width: "100vw",
                  height: "100vh",
                }}
              >
                <PantallaInicioSesion />
              </div>
            }
          />
          <Route
            path="/registro"
            element={
              <div
                style={{
                  width: "100vw",
                  height: "100vh",
                }}
              >
                <PantallaRegistro />
              </div>
            }
          />
          <Route
            path="/ModulosAdmin"
            element={
              <Layout>
                <div
                  style={{
                    width: "100vw",
                    height: "100vh",
                  }}
                >
                  <PantallaModulos />
                </div>
              </Layout>
            }
          />
          <Route
            path="/GestionAmbientes"
            element={
              <Layout>
                <div
                  style={{
                    width: "100vw",
                    height: "calc(100vh - 50px)",
                    overflow: "auto",
                  }}
                >
                  <PantallaAmbientes />
                </div>
              </Layout>
            }
          />
          <Route
            path="/"
            element={
                <div
                  style={{
                    width: "100vw",
                    height: "100vh",
                    overflow: "auto",
                  }}
                >
                  <PantallaPrincipal />
                </div>
              }
          />
          <Route
            path="/Gestion-Usuarios"
            element={
              <Layout>
                <div
                  style={{
                    width: "100vw",
                    height: "calc(100vh - 50px)",
                    overflow: "auto",
                  }}
                >
                  <PantallaUsuarios />
                </div>
              </Layout>
            }
          />
          <Route
            path="/Panel-Gestion-Usuarios"
            element={
              <Layout>
                <div
                  style={{
                    width: "100vw",
                    height: "100vh",
                    overflow: "auto",
                  }}
                >
                  <PanelGestionUsuarios />
                </div>
              </Layout>
            }
          />
          <Route
            path="/Panel-Gestion-Ambientes"
            element={
              <Layout>
                <div
                  style={{
                    width: "100vw",
                    height: "100vh",
                    overflow: "auto",
                  }}
                >
                  <PanelGestionAmbientes />
                </div>
              </Layout>
            }
          />
          <Route
            path="/Panel-Solicitud-Reservas"
            element={
              <Layout>
                <div
                  style={{
                    width: "100vw",
                    height: "100vh",
                    overflow: "auto",
                  }}
                >
                  <PanelSolicitudReservas />
                </div>
              </Layout>
            }
          />
          <Route
            path="/Crear-Rol-Nuevo"
            element={
              <Layout>
                <div
                  style={{
                    width: "100vw",
                    height: "100vh",
                    overflow: "auto",
                  }}
                >
                  <CrearRol />
                </div>
              </Layout>
            }
          />
          <Route
            path="/Registro-Masivo-Usuarios"
            element={
              <Layout>
                <div
                  style={{
                    width: "100vw",
                    height: "100vh",
                    overflow: "auto",
                  }}
                >
                  <RegistroMasivoUsuarios />
                </div>
              </Layout>
            }
          />
          <Route
            path="/Lista-Usuarios"
            element={
              <Layout>
                <div
                  style={{
                    width: "100vw",
                    height: "100vh",
                    overflow: "auto",
                  }}
                >
                  <ListaUsuarios />
                </div>
              </Layout>
            }
          />
          <Route
            path="/Lista-Ambientes"
            element={
              <Layout>
                <div
                  style={{
                    width: "100vw",
                    height: "100vh",
                    overflow: "auto",
                  }}
                >
                  <ListaAmbientes />
                </div>
              </Layout>
            }
          />
          <Route
            path="/Registro-Ambiente"
            element={
              <Layout>
                <div
                  style={{
                    width: "100vw",
                    height: "100vh",
                    overflow: "auto",
                  }}
                >
                  <RegistroAmbiente />
                </div>
              </Layout>
            }
          />
          <Route
            path="/Registro-Masivo-Ambientes"
            element={
              <Layout>
                <div
                  style={{
                    width: "100vw",
                    height: "100vh",
                    overflow: "auto",
                  }}
                >
                  <RegistroMasivoAmbientes />
                </div>
              </Layout>
            }
          />
          <Route
            path="/Gestion-Reserva"
            element={
              <Layout>
                <div
                  style={{
                    width: "100vw",
                    height: "100vh",
                    overflow: "auto",
                  }}
                >
                  <GestionReservas />
                </div>
              </Layout>
            }
          />
          <Route
            path="/Solicitud"
            element={
              <Layout>
                <div
                  style={{
                    width: "100vw",
                    height: "100vh",
                    overflow: "auto",
                  }}
                >
                  <Solicitud />
                </div>
              </Layout>
            }
          />
          <Route
            path="/Calendario"
            element={
              <Layout>
                <div
                  style={{
                    width: "100vw",
                    height: "100vh",
                    overflow: "auto",
                  }}
                >
                  <Calendario />
                </div>
              </Layout>
            }
          />
          <Route
            path="/Reservas"
            element={
              <Layout>
                <div
                  style={{
                    width: "100vw",
                    height: "100vh",
                    overflow: "auto",
                  }}
                >
                  <Reservas />
                </div>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
