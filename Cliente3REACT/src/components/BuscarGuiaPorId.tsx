import React, { useState } from 'react';
import guideService from '../Servicios/GuideService';
import { Guide } from '../modelo/Guide';

const BuscarGuiaPorId = () => {
  const [id, setId] = useState('');
  const [guia, setGuia] = useState<Guide | null>(null);

  const handleSearch = async () => {
    try {
      const result = await guideService.buscarGuiaPorId(Number(id));
      setGuia(result);
      if (result) {
        alert(`ID de la guía: ${result.getId}`);
      } else {
        alert('No se encontró ninguna guía con ese ID');
      }
    } catch (error) {
      console.error('Error al buscar la guía:', error);
      alert('Ocurrió un error al buscar la guía');
    }
  };

  return (
    <div className="buscar-container">
      <h2 className="buscar-title">Buscar Guía por ID</h2>
      <div className="buscar-input-container">
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Ingrese el ID de la guía"
          className="buscar-input"
        />
        <button onClick={handleSearch} className="buscar-button">
          Buscar
        </button>
      </div>

      {guia && (
        <div className="paquete-card buscar-inputt">
          <h3 className="paquete-title">Guía Encontrada:</h3>
          <p className="paquete-attribute">ID: {guia.getId}</p>
          <p className="paquete-attribute">Nombre: {guia.getNombre}</p>
          <p className="paquete-attribute">Calificación: {guia.getCalificacion}</p>
          <p className="paquete-attribute">Edad: {guia.getEdad}</p>
          <p className="paquete-attribute">
            Fecha de Nacimiento: {new Date(guia.getFechaNacimiento).toLocaleDateString()}
          </p>
          <p className="paquete-attribute">Paquete Cultural:{guia.toString()}</p>
        </div>
      )}
    </div>
  );
};

export default BuscarGuiaPorId;
