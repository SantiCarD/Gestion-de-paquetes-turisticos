import React, { useState } from 'react';
import guideService from '../Servicios/GuideService'; // Servicio de la guía
import '../App.css'; // Asegúrate de importar el CSS

const EliminarGuia = () => {
  const [guiaId, setGuiaId] = useState<string>(''); // Usamos string para ID
  const [guia, setGuia] = useState<any | null>(null); // Asegúrate de definir bien el tipo

  // Función para buscar la guía por ID
  const buscarGuia = async () => {
    try {
      const guiaEncontrada = await guideService.buscarGuiaPorId(Number(guiaId));
      if (guiaEncontrada) {
        setGuia(guiaEncontrada);
      } else {
        alert('Guía no encontrada');
        setGuia(null);
      }
    } catch (error) {
      console.error('Error al buscar la guía:', error);
      alert('Ocurrió un error al buscar la guía');
    }
  };

  // Función para eliminar la guía
  const handleDelete = async () => {
    if (guia) {
      try {
        const success = await guideService.eliminarGuia(Number(guiaId));
        if (success) {
          alert('Guía eliminada con éxito');
          setGuia(null);
          setGuiaId('');
        } else {
          alert('Error al eliminar la guía');
        }
      } catch (error) {
        console.error('Error al eliminar la guía:', error);
        alert('Ocurrió un error al eliminar la guía');
      }
    }
  };

  return (
    <div className="buscar-container">
      <h2 className="buscar-title">Eliminar Guía</h2>
      <div className="buscar-input-container">
        <input
          type="number"
          value={guiaId}
          onChange={(e) => setGuiaId(e.target.value)}
          placeholder="ID de la guía"
          className="buscar-input"
        />
        <button onClick={buscarGuia} className="buscar-button">Buscar Guía</button>
      </div>

      {guia && (
  <div className="adicionar-paquete-container"> {/* Contenedor de los datos de la guía */}
    <h3 className="guia-title">Datos de la Guía</h3>
    <input
      type="number"
      value={guia.getId}
      className="buscar-input"
      disabled
    />
    <input
      type="text"
      value={guia.getNombre}
      className="buscar-input"
      disabled
    />
    <input
      type="number"
      value={guia.getCalificacion}
      className="buscar-input"
      disabled
    />
    <input
      type="number"
      value={guia.getEdad}
      className="buscar-input"
      disabled
    />
    <input
      type="date"
      value={guia.getFechaNacimiento}
      className="buscar-input"
      disabled
    />
    <button onClick={handleDelete} className="eliminar-button">
      Eliminar
    </button>
  </div>
)}

    </div>
  );
};

export default EliminarGuia;
