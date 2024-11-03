import React, { useEffect, useState } from 'react';
import packageService from '../Servicios/PackageService';
import { PaqueteCultural } from '../modelo/PaqueteCultural';
import '../App.css';

const ListarPaquetesCulturales = () => {
  const [paquetes, setPaquetes] = useState<Array<PaqueteCultural>>([]);

  useEffect(() => {
    const fetchPaquetes = async () => {
      try {
        const result = await packageService.listarPaquetes();
        console.log('Paquetes recibidos:', result); // Verifica la estructura en consola
        setPaquetes(result);
      } catch (error) {
        console.error('Error al obtener los paquetes:', error);
      }
    };

    fetchPaquetes();
  }, []);

  return (
    <div className="listar-container">
      <h2 className="listar-title">Lista de Paquetes Culturales</h2>
      <table className="listar-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
          </tr>
        </thead>
        <tbody>
          {paquetes.map((paquete) => (
            <tr key={paquete.getid}>
              <td>{paquete.getid}</td>
              <td>{paquete.getnombre}</td>
              <td>{paquete.getprecio}</td>
              <td>{paquete.getfechaInicio.split('T')[0]}</td>
              <td>{paquete.getfechaFin.split('T')[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarPaquetesCulturales;
