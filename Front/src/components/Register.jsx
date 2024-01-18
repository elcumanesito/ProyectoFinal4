import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../services/api';
import '../styles/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.registerUser(formData);
      console.log(response);

      // Después de un registro exitoso, redirige al usuario a la página de login
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="container"> {/* Usa la clase container para aplicar estilos */}
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:
          <input type="text" name="name" onChange={handleChange} />
        </label>
        <br />
        <label>Email:
          <input type="email" name="email" onChange={handleChange} />
        </label>
        <br />
        <label>Password:
          <input type="password" name="password" onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Registrar</button>
      </form>
      
      {/* Botón para redireccionar manualmente a la vista de login */}
      <button onClick={redirectToLogin}>Si ya tienes un usuario, ingresa aquí</button>
    </div>
  );
};

export default Register;

