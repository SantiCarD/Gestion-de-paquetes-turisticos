import React from 'react';
import '../App.css'; // Asegúrate de que los estilos se importen

const VolverMenu = () => {
  const handleVolver = () => {
    window.location.href = './'; // Redirige al menú principal
  };

  return (
    <button onClick={handleVolver} className="volver-btn">
      Volver al Menú Principal
    </button>
  );
};

export default VolverMenu;
