import { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';


const Login = () => {
  const [formData, setFormData] = useState({
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
      const response = await loginUser(formData);
      const { access_token } = response;
      console.log(response);
      
      // Almacena el token en el almacenamiento local 
      localStorage.setItem('token', access_token);

      // Redirige al usuario a la página PersonalInfo
      navigate('/personal_info');
      
    } catch (error) {
      console.error(error);
    }
  };

  
    return (
      <div id='body-log'>
      <div className="container"> {/* Usa la clase container para aplicar estilos */}
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:
            <input type="email" name="email" onChange={handleChange} />
          </label>
          <br />
          <label>Password:
            <input type="password" name="password" onChange={handleChange} />
          </label>
          <br />
          <div id='lb1'>
          <button type="submit">Iniciar Sesión</button>
          </div>
        </form>
      </div>
      </div>
    );
  };
  

export default Login;