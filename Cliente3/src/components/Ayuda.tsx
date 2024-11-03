import React from 'react';

const Ayuda = () => {
  return (
    <div className="ayuda-container">
      <div className="dev-card">
        <img src={'./assets/images/camiloImg.png'} alt="Santiago" className="dev-image" />
        <h3>Santiago</h3>
        <p>Teléfono: 123-456-7890</p>
      </div>
      <div className="dev-card">
        <img src={'./assets/images/camiloImg.png'} alt="Otro Desarrollador" className="dev-image" />
        <h3>Otro Desarrollador</h3>
        <p>Teléfono: 098-765-4321</p>
      </div>
    </div>
  );
};

export default Ayuda;
