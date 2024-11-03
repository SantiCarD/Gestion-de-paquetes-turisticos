/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import TravellImg from './assets/images/TravellImg.png';
import Ayuda from './components/Ayuda';
import BuscarPaquetePorId from './components/BuscarPaquetePorId';
import BuscarPaquetePorNombre from './components/BuscarPaquetePorNombre';
import AdicionarPaquete from './components/AdicionarPaquete';
import ActualizarPaquete from './components/ActualizarPaquete';
import EliminarPaquete from './components/EliminarPaquete';
import ListarPaquetesCulturales from './components/ListarPaquetesCulturales';

const Form1 = ({ setCurrentView }) => (
  <div className="paquete-cultural-main-content">
    <h1 className="text-2xl font-bold mb-4">Proyecto Turismo</h1>
    <nav>
      <ul className="flex space-x-4">
        <li>
          <button className="paquete-cultural-button" onClick={() => setCurrentView('paqueteCultural')}>
            Paquete Cultural
          </button>
        </li>
        <li>
          <button className="paquete-cultural-button" onClick={() => setCurrentView('ayuda')}>
            Ayuda
          </button>
        </li>
      </ul>
    </nav>
    <img src={TravellImg} alt="Travell" className="w-full h-full object-cover" />
  </div>
);

const App = () => {
  const [currentView, setCurrentView] = useState('main');
  const [currentSubView, setCurrentSubView] = useState(null);

  const renderView = () => {
    switch (currentView) {
      case 'paqueteCultural':
        return (
          <div className="flex flex-col mb-4">
            <div className="paquete-cultural-header">
              <div className="nav-controls">
                <nav className="paquete-cultural-nav">
                  <button className="paquete-cultural-button" onClick={() => setCurrentSubView('adicionar')}>
                    Adicionar
                  </button>
                  <button className="paquete-cultural-button" onClick={() => setCurrentSubView('buscarporid')}>
                    Buscar por ID
                  </button>
                  <button className="paquete-cultural-button" onClick={() => setCurrentSubView('buscarpornombre')}>
                    Buscar por Nombre
                  </button>
                  <button className="paquete-cultural-button" onClick={() => setCurrentSubView('actualizar')}>
                    Actualizar
                  </button>
                  <button className="paquete-cultural-button" onClick={() => setCurrentSubView('eliminar')}>
                    Eliminar
                  </button>
                  <button className="paquete-cultural-button" onClick={() => setCurrentSubView('listar')}>
                    Listar
                  </button>
                </nav>
                <button className="volver-menu-principal-button" onClick={() => setCurrentView('main')}>
                  Volver al Menú Principal
                </button>
              </div>
            </div>
            <h2 className="paquete-cultural-title">Paquete Cultural</h2>
            <div className="paquete-cultural-main-content">
              {renderSubView()}
            </div>
          </div>
        );
      case 'ayuda':
        return (
          <div>
            <div className="paquete-cultural-header">
              <div className="nav-controls">
                <div></div> {/* Espaciador vacío para mantener el botón a la derecha */}
                <button className="volver-menu-principal-button" onClick={() => setCurrentView('main')}>
                  Volver al Menú Principal
                </button>
              </div>
            </div>
            <h2 className="paquete-cultural-title">Ayuda</h2>
            <div className="paquete-cultural-main-content">
              <Ayuda />
            </div>
          </div>
        );
      default:
        return <Form1 setCurrentView={setCurrentView} />;
    }
  };

  const renderSubView = () => {
    switch (currentSubView) {
      case 'adicionar':
        return <AdicionarPaquete />;
      case 'buscarporid':
        return <BuscarPaquetePorId />;
      case 'buscarpornombre':
        return <BuscarPaquetePorNombre />;
      case 'actualizar':
        return <ActualizarPaquete />;
      case 'eliminar':
        return <EliminarPaquete />;
      case 'listar':
        return <ListarPaquetesCulturales />;
      default:
        return <ListarPaquetesCulturales />;
    }
  };

  return (
    <div className="container mx-auto">
      {renderView()}
    </div>
  );
};

export default App;