
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LayoutEncabezado from './Componentes/Layouts/LayoutEncabezado';
import PaginaPrincipal from './Paginas/PaginaPrincipal';
import PaginaAdministrativa from './Paginas/PaginaAdministrativa';
import PaginaCliente from './Paginas/PaginaCliente';
import Login from './Componentes/Autenticacion/Login';
import Registro from './Componentes/Autenticacion/Registro';
import Recuperacion from './Componentes/Autenticacion/Recuperacion';
//YARE PITSOTL pon atencion 
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutEncabezado><PaginaPrincipal /></LayoutEncabezado>} />
        <Route path="/login" element={<LayoutEncabezado><Login /></LayoutEncabezado>} />
        <Route path="/registro" element={<LayoutEncabezado><Registro /></LayoutEncabezado>} />
        <Route path="/admin" element={<LayoutEncabezado><PaginaAdministrativa /></LayoutEncabezado>} />
        <Route path="/cliente" element={<LayoutEncabezado><PaginaCliente /></LayoutEncabezado>} />
        <Route path="/Recuperacion" element = {<Recuperacion />}/>
      </Routes>
    </>
  );
};

export default App;
