/* eslint-disable react/prop-types */
import { useState } from 'react';
import { addPagina } from '../services/api';

const NuevoPaginaModal = ({ onClose, onPaginaAdded }) => {
  const [url, setUrl] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleAgregarPagina = async () => {
    try {
      const nuevaPagina = {
        url,
        nombre,
        descripcion,
      };

      const response = await addPagina(nuevaPagina);

      if (!response.ok) {
        throw new Error(`Failed to add pagina: ${response.statusText}`);
      }

      const paginaAgregada = await response.json();
      onPaginaAdded(paginaAgregada);
      onClose();
    } catch (error) {
      console.error('Error adding pagina:', error.message);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Agregar Nueva Página</h2>
        <div>
          <label>URL:</label>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <div>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </div>
        <button onClick={handleAgregarPagina}>Agregar Página</button>
      </div>
    </div>
  );
};

export default NuevoPaginaModal;
