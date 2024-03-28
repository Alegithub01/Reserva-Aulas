// import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Contexts/ThemeContext";
import Layout from "./Navegacion/Layout";
import AdminHomeScreen from "./AdminHomeScreen/AdminHomeScreen";
import PantallaInicioSesion from "./PantallaInicioSesion/PantallaInicioSesion";
import PantallaRegistro from "./PantallaRegistro/PantallaRegistro";
import PantallaModulos from "./PantallaModulos/PantallaModulos";

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
                <PantallaRegistro/>
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
                <PantallaModulos/>
              </div>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <div
                  style={{
                    width: "100vw",
                    height: "calc(100vh - 50px)",
                    overflow: "auto",
                  }}
                >
                  <AdminHomeScreen />
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
