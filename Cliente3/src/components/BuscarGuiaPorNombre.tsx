import React, { useState } from 'react';
import guideService from '../Servicios/GuideService'; // Asegúrate de que la ruta sea correcta
import { Guide } from '../modelo/Guide';

const BuscarGuiaPorNombre = () => {
  const [nombre, setNombre] = useState('');
  const [guia, setGuia] = useState<Guide | null>(null);

  const handleSearch = async () => {
    try {
      const result = await guideService.buscarGuiaPorNombre(nombre);
      setGuia(result);
      if (result) {
        alert(`Nombre de la guía: ${result.getNombre}`);
      } else {
        alert('No se encontró ninguna guía con ese nombre');
      }
    } catch (error) {
      console.error('Error al buscar la guía:', error);
      alert('Ocurrió un error al buscar la guía');
    }
  };

  return (
    <div className="buscar-container">
      <h2 className="buscar-title">Buscar Guía por Nombre</h2>
      <div className="buscar-input-container">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ingrese el nombre de la guía"
          className="buscar-input"
        />
        <button onClick={handleSearch} className="buscar-button">
          Buscar
        </button>
      </div>

      {guia && (
        <div className="guia-card buscar-inputt">
          <h3 className="guia-title">Guía Encontrada:</h3>
          <p className="guia-attribute">ID: {guia.getId}</p>
          <p className="guia-attribute">Nombre: {guia.getNombre}</p>
          <p className="guia-attribute">Calificación: {guia.getCalificacion}</p>
          <p className="guia-attribute">Edad: {guia.getEdad}</p>
          <p className="guia-attribute">
            Fecha de Nacimiento: {new Date(guia.getFechaNacimiento).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default BuscarGuiaPorNombre;
