import React, { useState } from 'react';
import PackageService from '../Servicios/PackageService'; // Asegúrate de que la ruta sea correcta
import { PaqueteCultural } from '../modelo/PaqueteCultural';

const BuscarPaquetePorId = () => {
  const [nombre, setNombre] = useState('');
  const [paquete, setPaquete] = useState<PaqueteCultural | null>(null);

  const handleSearch = async () => {
    try {
      const result = await PackageService.buscarPaquetePorNombre(nombre);
      setPaquete(result);
      if (result) {
        alert(`Nombre del paquete: ${result.getnombre}`); // Asegúrate de que 'id' es el nombre correcto del atributo
      } else {
        alert('No se encontró ningún paquete con ese Nombre');
      }
    } catch (error) {
      console.error('Error al buscar el paquete:', error);
      alert('Ocurrió un error al buscar el paquete');
    }
  };

  return (
    <div className="buscar-container">
      <h2 className="buscar-title">Buscar Paquete por Nombre</h2>
      <div className="buscar-input-container">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ingrese el nombre del paquete"
          className="buscar-input"
        />
        <button onClick={handleSearch} className="buscar-button">
          Buscar
        </button>
      </div>

      {paquete && (
        <div className="paquete-card, buscar-inputt">
          <h3 className="paquete-title">Paquete Encontrado:</h3>
          <p className="paquete-attribute">ID: {paquete.getid}</p>
          <p className="paquete-attribute">Nombre: {paquete.getnombre}</p>
          <p className="paquete-attribute">Precio: {paquete.getprecio}</p>
          <p className="paquete-attribute">Fecha de Inicio: {new Date(paquete.getfechaInicio).toLocaleDateString()}</p>
          <p className="paquete-attribute">Fecha de Fin: {new Date(paquete.getfechaFin).toLocaleDateString()}</p>
          {/* Agrega más atributos según sea necesario */}
        </div>
      )}
    </div>
  );
};

export default BuscarPaquetePorId;
