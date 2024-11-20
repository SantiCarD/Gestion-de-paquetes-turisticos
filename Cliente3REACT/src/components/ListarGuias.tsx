import React, { useState } from 'react';
import guideService from '../Servicios/GuideService';
import { Guide } from '../modelo/Guide';
import '../App.css'; // Asegúrate de importar el CSS

const ListarGuias = () => {
  const [guias, setGuias] = useState<Array<Guide>>([]);
  const [isLoading, setIsLoading] = useState(false); // Para mostrar un mensaje de carga

  const listarGuias = async () => {
    setIsLoading(true); // Inicia la carga
    try {
      const result = await guideService.listarGuias();
      console.log('Guías recibidas:', result); // Verifica la estructura en consola
      setGuias(result);
    } catch (error) {
      console.error('Error al obtener las guías:', error);
    } finally {
      setIsLoading(false); // Finaliza la carga
    }
  };

  return (
    <div className="listar-container">
      <h2 className="listar-title">Lista de Guías</h2>
      <button onClick={listarGuias} className="listar-button">
        Listar Guías
      </button>

      {isLoading && <p>Cargando...</p>} {/* Mensaje de carga */}

      <table className="listar-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Calificación</th>
            <th>Edad</th>
            <th>Fecha de Nacimiento</th>
          </tr>
        </thead>
        <tbody>
          {guias.map((guia) => (
            <tr key={guia.getId}>
              <td>{guia.getId}</td>
              <td>{guia.getNombre}</td>
              <td>{guia.getCalificacion}</td>
              <td>{guia.getEdad}</td>
              <td>{guia.getFechaNacimiento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarGuias;
