import { useEffect, useState } from 'react';
import { getUserInfo, logoutUser} from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Bitacoras.css';

const Bitacoras = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();

        if (!response.ok) {
          throw new Error(`Failed to fetch user info: ${response.statusText}`);
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('Error during fetchUserInfo:', error.message);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  return (
    <div>
      {userInfo ? (
        <>
          <h2>Bienvenido {userInfo.name} {userInfo.lastname}, selecciona la acción que quieras realizar en las pestañas del menú de la izquierda</h2>
          {/* Aquí puedes agregar tu menú lateral con enlaces a las diferentes vistas */}
          <ul>
            <li><a href="/roles">Roles</a></li>
            <li><a href="/usuarios">Usuarios</a></li>
            <li><a href="/bitacoras">Bitacoras</a></li>
            <li><a href="/paginas">Paginas</a></li>
          </ul>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Cargando información del usuario...</p>
      )}
    </div>
  );
};

export default Bitacoras;
