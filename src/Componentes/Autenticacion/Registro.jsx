import React, { useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const MySwal = withReactContent(Swal);

function FormularioRegistro() {
  const navigate = useNavigate();
  const [preguntas, setPreguntas] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    tipo: "Cliente",
    correo: "",
    datos_cliente: {
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      telefono: "",
      pregunta: {
        _id: "",
        respuesta: "", 
      },
    },
  });


  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/preguntas");
        setPreguntas(response.data);
      } catch (error) {
        console.error("Error al cargar las preguntas:", error);
      }
    };

    fetchPreguntas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "datos_cliente.pregunta._id") {
      console.log("ID de pregunta seleccionada:", value); 
      setFormData((prevData) => ({
        ...prevData,
        datos_cliente: {
          ...prevData.datos_cliente,
          pregunta: {
            _id: value, 
            respuesta: prevData.datos_cliente.pregunta.respuesta,
          },
        },
      }));
    } else if (name === "datos_cliente.pregunta.respuesta") {
      console.log("Respuesta actualizada:", value); 
      setFormData((prevData) => ({
        ...prevData,
        datos_cliente: {
          ...prevData.datos_cliente,
          pregunta: {
            ...prevData.datos_cliente.pregunta,
            respuesta: value, 
          },
        },
      }));
    } else if (name.startsWith("datos_cliente.")) {
      const fieldName = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        datos_cliente: {
          ...prevData.datos_cliente,
          [fieldName]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    console.log("Estado del formulario:", formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hashedPassword = await bcrypt.hash(formData.password, 10);

    const formDataWithEncryptedPassword = {
      nombre: formData.datos_cliente.nombre,
      apellidopa: formData.datos_cliente.apellidoPaterno,
      apellidoma: formData.datos_cliente.apellidoMaterno,
      gmail: formData.correo,
      user: formData.username,
      telefono: formData.datos_cliente.telefono,
      password: hashedPassword,
      id_pregunta: formData.datos_cliente.pregunta._id, 
      respuesta: formData.datos_cliente.pregunta.respuesta,
      tipo: formData.tipo,
    };

    console.log("Datos a enviar al servidor:", formDataWithEncryptedPassword);

    try {
      await axios.post("http://localhost:5000/api/registro", formDataWithEncryptedPassword);
      MySwal.fire({
        title: "Tu registro se realizó correctamente",
        text: " " + formData.username + "",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      MySwal.fire({
        icon: "error",
        title: "ERROR.",
        text: "No te pudiste registrar.",
      });
    }
  };

  const estilos = {
    contenedor: {
      textAlign: "left",
      backgroundColor: "#e0f7fa",
      padding: "15px",
      borderRadius: "15px",
      maxWidth: "400px",
      width: "90%",
      margin: "auto",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      marginTop: '30px',
    },
    titulo: {
      fontSize: "28px",
      marginBottom: "20px",
      color: "#004d40",
      textAlign: "center",
    },
    campo: {
      marginBottom: "15px",
      textAlign: "left",
    },
    etiqueta: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
      color: "#00695c",
    },
    input: {
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #b2dfdb",
      fontSize: "16px",
      boxSizing: "border-box",
    },
    boton: {
      backgroundColor: "#2778c4",
      color: "white",
      padding: "10px 15px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      marginTop: "20px",
      display: "block",
      width: "100%",
    },
  };

  return (
    <div style={estilos.contenedor}>
      <h1 style={estilos.titulo}>Registro</h1>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div style={estilos.campo}>
          <label style={estilos.etiqueta}>&#128100; Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            name="datos_cliente.nombre"
            style={estilos.input}
            value={formData.datos_cliente.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div style={estilos.campo}>
          <label style={estilos.etiqueta}>&#128100; Apellido Paterno</label>
          <input
            type="text"
            placeholder="Apellido Paterno"
            name="datos_cliente.apellidoPaterno"
            style={estilos.input}
            value={formData.datos_cliente.apellidoPaterno}
            onChange={handleChange}
            required
          />
        </div>

        <div style={estilos.campo}>
          <label style={estilos.etiqueta}>&#128100; Apellido Materno</label>
          <input
            type="text"
            placeholder="Apellido Materno"
            name="datos_cliente.apellidoMaterno"
            style={estilos.input}
            value={formData.datos_cliente.apellidoMaterno}
            onChange={handleChange}
            required
          />
        </div>

        <div style={estilos.campo}>
          <label style={estilos.etiqueta}>&#9993; Correo Electrónico</label>
          <input
            type="email"
            placeholder="Correo electrónico"
            name="correo"
            style={estilos.input}
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>
        <div style={estilos.campo}>
          <label style={estilos.etiqueta}>&#128222; Teléfono</label>
          <input
            type="tel"
            placeholder="Teléfono"
            name="datos_cliente.telefono"
            style={estilos.input}
            value={formData.datos_cliente.telefono}
            onChange={handleChange}
            required
          />
        </div>
      <div style={estilos.campo}>
        <label style={estilos.etiqueta}>&#128272; Contraseña</label>
        <input
          type="password"
          placeholder="Contraseña"
          name="password"
          style={estilos.input}
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div style={estilos.campo}>
        <label style={estilos.etiqueta}>&#128272; Confirmar Contraseña</label>
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          name="confirmPassword"  // Cambia el nombre a "confirmPassword"
          style={estilos.input}
          value={formData.confirmPassword}  // Asegúrate de que formData tenga esta propiedad
          onChange={handleChange}
          required
        />
      </div>


        <button type="submit" style={estilos.boton}>Registrar</button>
      </form>

      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <Link to="/login">Ya tienes una cuenta? Inicia sesión</Link>
      </div>
    </div>
  );
}

export default FormularioRegistro;
