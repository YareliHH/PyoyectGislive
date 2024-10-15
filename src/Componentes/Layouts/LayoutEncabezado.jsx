import React from 'react';
import { useLocation } from 'react-router-dom';
import EncabezadoPublico from '../Compartidos/EncabezadoPublico';
import EncabezadoAdministrativo from '../Compartidos/EncabezadoAdministrativo';
import EncabezadoCliente from '../Compartidos/EncabezadoCliente';
import PieDePagina from '../Compartidos/PieDePagina';

const LayoutEncabezado = ({ children }) => {
  const location = useLocation();
  let encabezado;
  let pieDePagina;

  if (location.pathname.startsWith('/admin')) {
    encabezado = <EncabezadoAdministrativo />;
    pieDePagina = <PieDePagina />;
  } else if (location.pathname.startsWith('/cliente')) {
    encabezado = <EncabezadoCliente />;
    pieDePagina = <PieDePagina />;
  } else {
    encabezado = <EncabezadoPublico />;
    pieDePagina = <PieDePagina />;
  }

  return (
    <>
      <style>{`
        :root {
          --min-header-footer-height: 60px; /* Mínimo alto para el encabezado y pie de página */
        }

        body, html {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
        }

        .layout-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .content {
          flex-grow: 1;
        }

        header, footer {
          width: 100%;
          min-height: var(--min-header-footer-height); /* Mínima altura, pero permite crecimiento si es necesario */
          box-sizing: border-box; /* Asegura que el padding no aumente el tamaño del elemento */
        }

        header {
          background-color: #FFA500; /* Mantén el color del encabezado */
        }

        footer {
          background-color: #d45d00; /* Mantén el color del pie de página */
        }
      `}</style>

      <div className="layout-container">
        <header>
          {encabezado}
        </header>

        <main className="content">
          {children}
        </main>

        <footer>
          {pieDePagina}
        </footer>
      </div>
    </>
  );
};

export default LayoutEncabezado;
