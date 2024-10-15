import React, { useState, useEffect } from 'react';
import { Layout, Typography } from 'antd';
import {FacebookOutlined,TwitterOutlined,InstagramOutlined,} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Footer } = Layout;
const { Text } = Typography;

const PieDePagina = () => {
  const [datosEmpresa, setDatosEmpresa] = useState({
    redesSociales: {
      facebook: "",
      twitter: "",
      instagram: ""
    },
    telefonoContacto: "",
    emailContacto: "",
    direccion: ""
  });

  useEffect(() => {
    fetch('http://localhost:3001/api/datosEmpresa')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching datosEmpresa: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Datos de datosEmpresa:', data);
        if (data.length > 0) {
          setDatosEmpresa(data[0]);
        }
      })
      .catch(error => {
        console.error('Error fetching datosEmpresa:', error);
      });
  }, []);

  return (
    <Layout>
      <Footer style={{
        backgroundColor: '#1E90FF', // Color azul intenso
        textAlign: 'center',
        padding: '40px 20px',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center', // Centrar las secciones
          width: '100%',
          maxWidth: '1200px', // Establecer un ancho máximo para la sección
          marginBottom: '20px'
        }}>
          <div style={{ flex: 1, textAlign: 'center', marginRight: '20px' }}>
            <h2 style={headerStyle}>Síguenos en nuestras redes sociales</h2>
            <a href={datosEmpresa.redesSociales.facebook} style={linkStyle} target="_blank" rel="noopener noreferrer">
              <FacebookOutlined style={iconStyle} /> Facebook</a>
            <a href={datosEmpresa.redesSociales.twitter} style={linkStyle} target="_blank" rel="noopener noreferrer">
              <TwitterOutlined style={iconStyle} /> Twitter</a>
            <a href={datosEmpresa.redesSociales.instagram} style={linkStyle} target="_blank" rel="noopener noreferrer">
              <InstagramOutlined style={iconStyle} /> Instagram</a>
          </div>
          <div style={{ flex: 1, textAlign: 'center', marginRight: '20px' }}>
            <h2 style={headerStyle}>Atención al cliente</h2>
            <p style={textStyle}>Teléfono: {datosEmpresa.telefonoContacto}</p>
            <p style={textStyle}>Correo electrónico: {datosEmpresa.emailContacto}</p>
            <p style={textStyle}>Ubicación: {datosEmpresa.direccion}</p>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <h2 style={headerStyle}>Datos de la empresa</h2>
            <Link to="/empresa" style={linkStyle}>¿Quiénes Somos?</Link>
            <Link to="/privacidad" style={linkStyle}>Política de Privacidad</Link>
          </div>
        </div>
        {/* Derechos de autor dentro del pie de página */}
        <div style={{
          marginTop: '20px',
          color: '#ffffff',
          fontSize: '16px',
        }}>
          &copy; {new Date().getFullYear()} Todos los derechos reservados.
        </div>
      </Footer>
    </Layout>
  );
};

// Estilos comunes
const linkStyle = {
  color: '#ffffff',
  fontSize: '16px',
  display: 'block',
  marginBottom: '10px',
  textDecoration: 'none'
};

const iconStyle = {
  fontSize: '18px',
  color: '#ffffff',
  marginRight: '5px'
};

const textStyle = {
  color: '#ffffff',
  fontSize: '16px',
  marginBottom: '10px'
};

const headerStyle = {
  color: '#ffffff',
  fontSize: '18px',
  marginBottom: '10px',
};

export default PieDePagina;
