import React from 'react';
import '../Componentes/Estilos/paginaP.css'; // Ajusta la ruta según tu estructura

const PaginaPrincipal = () => {
  return (
    <section className="logo-clientes">
      <div className="clientes-container">
        <div className="clientes-fila">
          <div className="cliente-tarjeta tarjeta1">
            <img src="https://i.pinimg.com/564x/09/20/1c/09201c1b05f91d5dde2e779d80543536.jpg"alt="Logo1" 
            />
          </div>
          <div className="cliente-tarjeta tarjeta2">
            <img src="https://i.pinimg.com/564x/bd/59/b8/bd59b85c8336650a9254393e2395d073.jpg"alt="Logo2" 
            />
          </div>
          <div className="cliente-tarjeta tarjeta3">
            <img src="https://i.pinimg.com/736x/d9/d4/0e/d9d40e89aa51c7449cd9e50b6a25829f.jpg" alt="Logo3" 
            />
          </div>
          <div className="cliente-tarjeta tarjeta4">
            <img src="https://i.pinimg.com/736x/6d/e7/cc/6de7ccb165aeeb4aca55d92102e512e5.jpg" alt="Logo4" 
            />
          </div>
        </div>
        <div className="clientes-fila">
          <div className="cliente-tarjeta tarjeta5">
            <img src="https://i.pinimg.com/564x/78/cd/7e/78cd7e1b1d841c78e776420790fd6923.jpg" alt="Logo5" 
            />
          </div>
          <div className="cliente-tarjeta tarjeta6">
            <img src="https://i.pinimg.com/564x/48/3a/07/483a073bcb4ddcbf070155828e83c81e.jpg"alt="Logo6" 
            />
          </div>
          <div className="cliente-tarjeta tarjeta7">
            <img src="https://i.pinimg.com/564x/f8/8f/6b/f88f6bbd42440eef70181e0b2e05cee3.jpg"alt="Logo7" 
            />
          </div>
          <div className="cliente-tarjeta tarjeta8">
            <img src="https://i.pinimg.com/564x/81/45/cb/8145cb2cc1fcfcd336bf6c27ab3b685d.jpg"alt="Logo8" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaginaPrincipal;
