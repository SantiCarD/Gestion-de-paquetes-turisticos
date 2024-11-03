import React, { useState } from 'react';
import packageService from '../Servicios/PackageService'; // Servicio del paquete
import '../App.css';
import { PaqueteCultural } from '../modelo/PaqueteCultural';
import { format } from 'date-fns';
const ActualizarPaquete = () => {
  const [paqueteId, setPaqueteId] = useState<number | ''>('');
  const [id, setId] = useState<number | ''>('');
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState<number | ''>('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [paqueteEncontrado, setPaqueteEncontrado] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Función para buscar el paquete por ID
  const buscarPaquetePorId = async () => {
    try {
      const paquete = await packageService.buscarPaquetePorId(Number(paqueteId));
      if (paquete) {
        // Rellenar los campos con los datos del paquete encontrado
        setId(paquete.getid);
        setNombre(paquete.getnombre);
        setPrecio(paquete.getprecio);
        setFechaInicio(paquete.getfechaInicio.split('T')[0]); // Solo la parte de la fecha
        setFechaFin(paquete.getfechaFin.split('T')[0]); // Solo la parte de la fecha
        setPaqueteEncontrado(true);
        setSuccessMessage('Paquete cargado correctamente.');
        setErrorMessage('');
      } else {
        setErrorMessage('No se encontró ningún paquete con ese ID.');
        setPaqueteEncontrado(false);
      }
    } catch (error) {
      console.error('Error al buscar el paquete:', error);
      setErrorMessage('Error al cargar el paquete. Intente más tarde.');
      setPaqueteEncontrado(false);
    }
  };

  // Función para actualizar el paquete
  const handleUpdatePackage = async () => {
    const fechaIFormateada = format(new Date(fechaInicio).toISOString(), "yyyy-MM-dd'T'HH:mm:ss");
    const fechaFFormateada = format(new Date(fechaFin).toISOString(), "yyyy-MM-dd'T'HH:mm:ss");
    const paqueteActualizado = new PaqueteCultural(
        Number(id),
        nombre,
        Number(precio),
        fechaIFormateada,
        fechaFFormateada
    );
    
    try {
      const result = await packageService.actualizarPaquete(Number(paqueteId), paqueteActualizado);
      if (result) {
        setSuccessMessage('Paquete actualizado exitosamente.');
        setErrorMessage('');
        setPaqueteEncontrado(false); // Limpiar datos del paquete
        setPaqueteId(''); // Limpiar el ID ingresado
      } else {
        setErrorMessage('Error al actualizar el paquete. Intente nuevamente.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error al actualizar el paquete:', error);
      setErrorMessage('Ocurrió un error. Por favor, intente más tarde.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="buscar-container"> {/* Clase para el contenedor principal */}
      <h2 className="buscar-title">Actualizar Paquete</h2>
      <div className="buscar-input-container">
        <input
          type="number"
          value={paqueteId}
          onChange={(e) => setPaqueteId(e.target.valueAsNumber)}
          placeholder="ID del paquete"
          className="buscar-input"
        />
        <button onClick={buscarPaquetePorId} className="buscar-button">
          Buscar Paquete
        </button>
      </div>

      {paqueteEncontrado && (
        <div className="adicionar-paquete-container"> {/* Clase para el contenedor de la guía */}
          <h3 className="guia-title">Datos del Paquete</h3>
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.valueAsNumber)}
            placeholder="ID del paquete"
            className="buscar-input"
            disabled // Deshabilitado porque el ID no debería cambiar
          />
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del paquete"
            className="buscar-input"
          />
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.valueAsNumber)}
            placeholder="Precio"
            className="buscar-input"
          />
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="buscar-input"
          />
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="buscar-input"
          />
          <button onClick={handleUpdatePackage} className="actualizar-button">
            Actualizar Paquete
          </button>
        </div>
      )}

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default ActualizarPaquete;
