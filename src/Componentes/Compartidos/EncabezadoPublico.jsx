import React, { useState, useRef, useEffect } from 'react';
import { UserOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import logo from '../Imagenes/logoGL.jpg'; // Ruta corregida

const EncabezadoPublico = () => {
  const [active, setActive] = useState('inicio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleClick = (option) => {
    setActive(option);
    setIsMobileMenuOpen(false); 
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClick = (key) => {
    switch (key) {
      case "usuarios":
        navigate('/admin/usuarios');
        break;
      case "productos":
        navigate('/admin/productos');
        break;
      case "quienesSomos":
        navigate('/admin/informacion/lista-quienes-somos');
        break;
      case "login":
        navigate('/login');
        break;
      default:
        console.log("No se reconoce la acción del menú");
    }
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <style>{`
        :root {
          --color-primary: #1E90FF; 
          --color-secondary: #FFFFFF; 
          --color-highlight: #4682B4; 
          --color-hover: #B0C4DE; 
          --color-mobile-bg: #F0F8FF; 
          --color-mobile-text: #000000; 
        }
  
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 10px;
          background-color: var(--color-primary);
          color: var(--color-secondary);
        }
  
        .logo {
          display: flex;
          align-items: center;
        }
  
        .logo img {
          width: 80px;
          height: 60px;
          margin-right: 10px;
        }
  
        .menu ul {
          display: flex;
          gap: 2px;
          list-style-type: none;
          margin: 0;
          padding: 0;
        }
  
        .menu ul li {
          font-size: 1rem;
          cursor: pointer;
          padding: 8px 12px;
          color: var(--color-secondary);
          transition: background-color 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
  
        .menu ul li:hover {
          background-color: var(--color-hover);
          border-radius: 5px;
        }
  
        .menu ul li.active {
          background-color: var(--color-highlight);
          border-radius: 5px;
        }
  
        .mobile-menu-icon {
          display: none;
          cursor: pointer;
          flex-direction: column;
          gap: 4px;
        }
  
        .hamburger {
          width: 25px;
          height: 3px;
          background-color: var(--color-secondary);
          transition: background-color 0.3s ease;
        }
  
        @media (max-width: 768px) {
          .menu ul {
            display: none;
            flex-direction: column;
            position: fixed;
            top: 0;
            left: -100%;
            width: 70%;
            height: 100%;
            background-color: var(--color-mobile-bg);
            padding: 20px;
            transition: left 0.3s ease-in-out;
            box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
          }
  
          .menu.menu-open ul {
            display: flex;
            left: 0;
          }
  
          .menu ul li {
            padding: 20px;
            border-bottom: 1px solid var(--color-hover);
            text-align: left;
            color: var(--color-mobile-text);
          }
  
          .mobile-menu-icon {
            display: flex;
          }
        }
      `}</style>

      <header className="header">
        <div className="logo">
          <img src={logo} alt="Gislive Boutique Clínica" />
          <h1>Gislive Boutique Clínica</h1>
        </div>
        <nav className={`menu ${isMobileMenuOpen ? 'menu-open' : ''}`} ref={menuRef}>
          <ul>
            <li className={active === 'usuarios' ? 'active' : ''} onClick={() => { handleClick('usuarios'); handleMenuClick('usuarios'); }}>
              <UserOutlined />
              Usuario
            </li>
            <li className={active === 'productos' ? 'active' : ''} onClick={() => { handleClick('productos'); handleMenuClick('productos'); }}>
              <AppstoreOutlined />
              Productos
            </li>
            <li className={active === 'informacion' ? 'active' : ''} onClick={() => { handleClick('informacion'); handleMenuClick('quienesSomos'); }}>
              <UserOutlined />
              Sobre nosotros
            </li>
            <li className={active === 'login' ? 'active' : ''} onClick={() => { handleClick('login'); handleMenuClick('login'); }}>
              Iniciar sesión
            </li>
          </ul>
        </nav>
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          <div className="hamburger"></div>
          <div className="hamburger"></div>
          <div className="hamburger"></div>
        </div>
      </header>
    </>
  );
};

export default EncabezadoPublico;
