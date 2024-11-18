import React, { useState } from 'react';
import guideService from '../Servicios/GuideService'; // Servicio de guías
import '../App.css';
import { Guide } from '../modelo/Guide';

const ActualizarGuia = () => {
  const [guiaId, setGuiaId] = useState<number | ''>(''); // ID de la guía a buscar
  const [id, setId] = useState<number | ''>(''); // ID de la guía
  const [nombre, setNombre] = useState(''); // Nombre de la guía
  const [calificacion, setCalificacion] = useState<number | ''>(''); // Calificación de la guía
  const [edad, setEdad] = useState<number | ''>(''); // Edad de la guía
  const [fechaNacimiento, setFechaNacimiento] = useState(''); // Fecha de nacimiento de la guía
  const [guiaEncontrada, setGuiaEncontrada] = useState(false); // Si la guía fue encontrada
  const [successMessage, setSuccessMessage] = useState(''); // Mensaje de éxito
  const [errorMessage, setErrorMessage] = useState(''); // Mensaje de error

  // Función para buscar la guía por ID
  const buscarGuiaPorId = async () => {
    try {
      const guia = await guideService.buscarGuiaPorId(Number(guiaId));
      if (guia) {
        // Rellenar los campos con los datos de la guía encontrada
        setId(guia.getId);
        setNombre(guia.getNombre);
        setCalificacion(guia.getCalificacion);
        setEdad(guia.getEdad);
        setFechaNacimiento(guia.getFechaNacimiento.split('T')[0]); // Solo la fecha
        setGuiaEncontrada(true);
        setSuccessMessage('Guía cargada correctamente.');
        setErrorMessage('');
      } else {
        setErrorMessage('No se encontró ninguna guía con ese ID.');
        setGuiaEncontrada(false);
      }
    } catch (error) {
      console.error('Error al buscar la guía:', error);
      setErrorMessage('Error al cargar la guía. Intente más tarde.');
      setGuiaEncontrada(false);
    }
  };

  // Función para actualizar la guía
  const handleUpdateGuide = async () => {
    const guiaActualizada = new Guide(
      Number(id),
      nombre,
      Number(calificacion),
      Number(edad),
      fechaNacimiento
    );

    try {
      const result = await guideService.actualizarGuia(Number(guiaId), guiaActualizada);
      if (result) {
        setSuccessMessage('Guía actualizada exitosamente.');
        setErrorMessage('');
        setGuiaEncontrada(false); // Limpiar datos de la guía
        setGuiaId(''); // Limpiar el ID ingresado
      } else {
        setErrorMessage('Error al actualizar la guía. Intente nuevamente.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error al actualizar la guía:', error);
      setErrorMessage('Ocurrió un error. Por favor, intente más tarde.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="buscar-container"> {/* Clase para el contenedor principal */}
      <h2 className="buscar-title">Actualizar Guía</h2>
      <div className="buscar-input-container">
        <input
          type="number"
          value={guiaId}
          onChange={(e) => setGuiaId(e.target.valueAsNumber)}
          placeholder="ID de la guía"
          className="buscar-input"
        />
        <button onClick={buscarGuiaPorId} className="buscar-button">
          Buscar Guía
        </button>
      </div>

      {guiaEncontrada && (
        <div className="adicionar-guia-container"> {/* Clase para el contenedor de la guía */}
          <h3 className="guia-title">Datos de la Guía</h3>
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.valueAsNumber)}
            placeholder="ID de la guía"
            className="buscar-input"
            disabled // Deshabilitado porque el ID no debería cambiar
          />
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre de la guía"
            className="buscar-input"
          />
          <input
            type="number"
            value={calificacion}
            onChange={(e) => setCalificacion(e.target.valueAsNumber)}
            placeholder="Calificación"
            className="buscar-input"
          />
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.valueAsNumber)}
            placeholder="Edad"
            className="buscar-input"
          />
          <input
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            className="buscar-input"
          />
          <button onClick={handleUpdateGuide} className="actualizar-button">
            Actualizar Guía
          </button>
        </div>
      )}

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default ActualizarGuia;
