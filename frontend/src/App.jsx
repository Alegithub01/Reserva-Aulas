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


function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
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
              <div
                style={{
                  width: "100vw",
                  height: "100vh",
                }}
              >
                <PantallaModulos />
              </div>
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

            path="/PantallaPrincipal"
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
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
