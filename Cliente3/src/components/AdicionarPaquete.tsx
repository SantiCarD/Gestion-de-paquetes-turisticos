import React, { useState } from 'react';
import packageService from '../Servicios/PackageService'; // Importar el servicio de paquetes
import { PaqueteCultural } from '../modelo/PaqueteCultural'; // Importar el modelo
import '../App.css'; 
import { format } from 'date-fns';

const AdicionarPaquete = () => {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddPackage = async () => {
    // Crear una nueva instancia de CulturalPackage
    
    // Buscar cada guía y crear un array de instancias de Guide
    
    const fechaIFormateada = format(new Date(fechaInicio).toISOString(), "yyyy-MM-dd'T'HH:mm:ss");
    const fechaFFormateada = format(new Date(fechaFin).toISOString(), "yyyy-MM-dd'T'HH:mm:ss");
    
    const nuevoPaquete = new PaqueteCultural(
      Number(id), // Asumiendo que el ID se genera automáticamente en el backend
      nombre,
      Number(precio), // Asegúrate de que el precio sea un número
      fechaIFormateada,
      fechaFFormateada) // Convertir a array de IDs de guías
    ;
    try {
      const result = await packageService.crearPaquete(nuevoPaquete);
      if (result) {
        setSuccessMessage('Paquete cultural creado exitosamente.');
        setErrorMessage('');
        // Reiniciar los campos del formulario
        setNombre('');
        setPrecio('');
        setFechaInicio('');
        setFechaFin('');
      } else {
        setErrorMessage('Error al crear el paquete cultural. Intente de nuevo.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error al crear el paquete:', error);
      setErrorMessage('Ocurrió un error. Por favor, intente más tarde.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="adicionar-paquete-container">
      <h2 className="adicionar-paquete-title">Adicionar Paquete Cultural</h2>
      <div className="adicionar-paquete-form">
      <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Id del paquete"
          className="adicionar-paquete-input"
        />
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del paquete"
          className="adicionar-paquete-input"
        />
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          placeholder="Precio"
          className="adicionar-paquete-input"
        />
        <input
          type="Date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          className="adicionar-paquete-input"
        />
        <input
          type="Date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          className="adicionar-paquete-input"
        />
        <button onClick={handleAddPackage} className="adicionar-paquete-button">
          Agregar Paquete
        </button>
      </div>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default AdicionarPaquete;
