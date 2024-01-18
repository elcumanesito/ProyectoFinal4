/* eslint-disable react/prop-types */
import { useState } from 'react';
import { addUsuario } from '../services/api';

const NuevoUsuarioModal = ({ onClose, onUsuarioAdded }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAgregarUsuario = async () => {
    try {
      const nuevoUsuario = {
        name: nombre,
        lastname: apellido,
        email,
        password,
      };

      const response = await addUsuario(nuevoUsuario);

      if (!response.ok) {
        throw new Error(`Failed to add usuario: ${response.statusText}`);
      }

      const usuarioAgregado = await response.json();
      onUsuarioAdded(usuarioAgregado);
      onClose();
    } catch (error) {
      console.error('Error adding usuario:', error.message);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Agregar Nuevo Usuario</h2>
        <div>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div>
          <label>Apellido:</label>
          <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleAgregarUsuario}>Agregar Usuario</button>
      </div>
    </div>
  );
};

export default NuevoUsuarioModal;
