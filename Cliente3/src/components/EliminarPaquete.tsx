import React, { useState } from 'react';
import packageService from '../Servicios/PackageService'; // Servicio del paquete
import '../App.css';

const EliminarPaquete = () => {
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
        setId(paquete.getid);
        setNombre(paquete.getnombre);
        setPrecio(paquete.getprecio);
        setFechaInicio(paquete.getfechaInicio.split('T')[0]); 
        setFechaFin(paquete.getfechaFin.split('T')[0]); 
        setPaqueteEncontrado(true);
        setSuccessMessage('Paquete encontrado correctamente.');
        setErrorMessage('');
      } else {
        setErrorMessage('No se encontró ningún paquete con ese ID.');
        setPaqueteEncontrado(false);
      }
    } catch (error) {
      console.error('Error al buscar el paquete:', error);
      setErrorMessage('Error al buscar el paquete. Intente más tarde.');
      setPaqueteEncontrado(false);
    }
  };

  // Función para eliminar el paquete
  const handleDeletePackage = async () => {
    try {
      const result = await packageService.eliminarPaquete(Number(paqueteId));
      if (result) {
        setSuccessMessage('Paquete eliminado exitosamente.');
        setErrorMessage('');
        setPaqueteEncontrado(false); // Limpiar datos del paquete
        setPaqueteId(''); // Limpiar el ID ingresado
      } else {
        setErrorMessage('Error al eliminar el paquete. Intente nuevamente.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error al eliminar el paquete:', error);
      setErrorMessage('Ocurrió un error. Por favor, intente más tarde.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="buscar-container"> {/* Contenedor principal */}
      <h2 className="buscar-title">Eliminar Paquete</h2>
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
        <div className="adicionar-paquete-container"> {/* Contenedor de los datos del paquete */}
          <h3 className="guia-title">Datos del Paquete</h3>
          <input
            type="number"
            value={id}
            className="buscar-input"
            disabled
          />
          <input
            type="text"
            value={nombre}
            className="buscar-input"
            disabled
          />
          <input
            type="number"
            value={precio}
            className="buscar-input"
            disabled
          />
          <input
            type="date"
            value={fechaInicio}
            className="buscar-input"
            disabled
          />
          <input
            type="date"
            value={fechaFin}
            className="buscar-input"
            disabled
          />
          <button onClick={handleDeletePackage} className="eliminar-button">
            Eliminar Paquete
          </button>
        </div>
      )}

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default EliminarPaquete;
