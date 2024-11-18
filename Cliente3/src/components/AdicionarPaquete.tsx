import React, { useState } from 'react';
import packageService from '../Servicios/PackageService';
import guideService from '../Servicios/GuideService';
import { PaqueteCultural } from '../modelo/PaqueteCultural';
import { Guide } from '../modelo/Guide';
import '../App.css'; 
import { addSeconds, format } from 'date-fns';

const AdicionarPaquete = () => {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [guias, setGuias] = useState(''); // Mantenemos como string para el input
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddPackage = async () => {
    try {
      // Convertir string de guías a array de números
      var guiasArray = guias
        .split(',')
        .map(id => Number(id.trim()))
        .filter(id => !isNaN(id)); // Filtrar valores no numéricos

      // Buscar todas las guías
      if(guiasArray.includes(0))
        {
          guiasArray.length = 0;
        }
      

      // Formatear fechas
      const fechaIFormateada = format(new Date(fechaInicio), "yyyy-MM-dd'T'HH:mm:ss");
      const fechaFFormateada = format(new Date(fechaFin), "yyyy-MM-dd'T'HH:mm:ss");

      // Crear el nuevo paquete
      const nuevoPaquete = new PaqueteCultural(
        Number(id),
        nombre,
        Number(precio),
        fechaIFormateada,
        fechaFFormateada,
        guiasArray // NO DEBERIA, DEBERIA MANDAR LOS IDS, NO LOS GUIAS
      );
      


      const result = await packageService.crearPaquete(nuevoPaquete);
      
      if (result) {
        setSuccessMessage('Paquete cultural creado exitosamente.');
        if(guiasArray.length!=0)
          {
        guiasArray.forEach(id => {
          guideService.buscarGuiaPorId(id)
              .then(guia => {
                  if (guia) {
                      // Asignar un atributo a la guía
                      guia.setCulturalPackage = nuevoPaquete; // Cambia 'nuevoAtributo' por el nombre del atributo que deseas asignar.
                      console.log(`Guía actualizada: ${JSON.stringify(guia)}`);
                      console.log(`zzz: ${guiasArray}`);
                  } else {
                      console.error(`No se encontró la guía con ID: ${id}`);
                  }
              })
              .catch(error => {
                  console.error(`Error al buscar la guía con ID: ${id}`, error);
              });
      })};
        setErrorMessage('');
        // Limpiar formulario
        setId('');
        setNombre('');
        setPrecio('');
        setFechaInicio('');
        setFechaFin('');
        setGuias('');
      } else {
        setErrorMessage('Error al crear el paquete cultural. Intente de nuevo.');
        setSuccessMessage('');
        console.log(`zzz: ${guiasArray.length}`);
      }
    } catch (error) {
      console.error('Error al crear el paquete:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Ocurrió un error. Por favor, intente más tarde.');
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
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          className="adicionar-paquete-input"
        />
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          className="adicionar-paquete-input"
        />
        <input
          type="text"
          value={guias}
          onChange={(e) => setGuias(e.target.value)}
          placeholder="IDs de guías (separados por comas)"
          className="adicionar-paquete-input"
        />
        <button 
          onClick={handleAddPackage} 
          className="adicionar-paquete-button"
        >
          Agregar Paquete
        </button>
      </div>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default AdicionarPaquete;