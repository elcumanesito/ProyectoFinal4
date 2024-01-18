import { useEffect, useState } from 'react';
import { getUserInfo, logoutUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
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
    <div id="dashboard-container">
      {userInfo ? (
        <div id="dashboard-content">
          <div id="menu-column">
            
            <ul id="menu-list">
              <li><a href="/roles">Roles</a></li>
              <li><a href="/usuarios">Usuarios</a></li>
              <li><a href="/bitacoras">Bitácoras</a></li>
              <li><a href="/paginas">Páginas</a></li>
            </ul>

          </div>
          <h2 id="welcome-message">Bienvenido {userInfo.name} {userInfo.lastname}, selecciona la acción que quieras realizar en las pestañas del menú de la izquierda</h2>
          {/* Botón de logout */}
          <button id="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Cargando información del usuario...</p>
      )}
    </div>
  );
};

export default Dashboard;

