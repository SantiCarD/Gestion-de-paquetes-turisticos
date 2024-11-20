import React, { useState } from 'react';
import guideService from '../Servicios/GuideService'; // Importar el servicio de guías
import { Guide } from '../modelo/Guide'; // Importar el modelo
import '../App.css'; 
import { format } from 'date-fns';

const AdicionarGuia = () => {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [calificacion, setCalificacion] = useState('');
  const [edad, setEdad] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddGuide = async () => {
    // Crear una nueva instancia de Guide
    const fechaFFormateada = format(new Date(fechaNacimiento).toISOString(), "yyyy-MM-dd'T'HH:mm:ss");
    const nuevaGuia = new Guide(
      Number(id),
      nombre,
      Number(calificacion),
      Number(edad),
      fechaFFormateada
    );

    try {
      const result = await guideService.adicionarGuia(nuevaGuia);
      if (result) {
        setSuccessMessage('Guía añadida con éxito.');
        setErrorMessage('');
        // Reiniciar los campos del formulario
        setId('');
        setNombre('');
        setCalificacion('');
        setEdad('');
        setFechaNacimiento('');
      } else {
        setErrorMessage('Error al añadir la guía. Intente de nuevo.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error al añadir la guía:', error);
      setErrorMessage('Ocurrió un error. Por favor, intente más tarde.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="adicionar-paquete-container">
      <h2 className="adicionar-paquete-title">Añadir Guía</h2>
      <div className="adicionar-paquete-form">
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Id"
          className="adicionar-paquete-input"
        />
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          className="adicionar-paquete-input"
        />
        <input
          type="number"
          value={calificacion}
          onChange={(e) => setCalificacion(e.target.value)}
          placeholder="Calificación"
          className="adicionar-paquete-input"
        />
        <input
          type="number"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          placeholder="Edad"
          className="adicionar-paquete-input"
        />
        <input
          type="date"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          className="adicionar-paquete-input"
        />
        <button onClick={handleAddGuide} className="adicionar-paquete-button">
          Añadir Guía
        </button>
      </div>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default AdicionarGuia;
