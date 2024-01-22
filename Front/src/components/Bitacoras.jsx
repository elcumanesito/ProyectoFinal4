import { useEffect, useState } from 'react';
import { getUserInfo, logoutUser, getBitacoras} from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Bitacoras.css';

const Bitacoras = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [bitacoras, setBitacoras] = useState([])
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

        const bitacorasData = await getBitacoras();

        setBitacoras(bitacorasData);

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
    <body>

    
    <div id ="containerBitacora">
      {userInfo ? (
        <div id="containersitoBitacora">
        <div id ="menu-column">
        <h2>Administración</h2>
            <hr/>
            <ul id="menu-list">
              <li><a href="/roles">Roles</a></li>
              <li><a href="/usuarios">Usuarios</a></li>
              <li><a href="/bitacoras">Bitácoras</a></li>
              <li><a href="/paginas">Páginas</a></li>
            </ul>
          
        </div> 


          <div id="bitacorasitas">
        
          <h3>Lista de Bitacoras</h3>
          <table>
            <thead>
              <tr>
                <th>Codigo de bitacora</th>
                <th>Bitacora</th>
                <th>Fecha y hora</th>
                
              </tr>
            </thead>
            <tbody>
              {bitacoras && bitacoras.map((bitacora) => (
                <tr key={bitacora.id}>
                  <td>{bitacora.id}</td>
                  <td>{bitacora.accion}</td>
                  <td>{new Date(bitacora.created_at).toLocaleString()}</td>
                
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div className='botonsitoLogout'>
          <button onClick={handleLogout}>Logout</button>
          </div>
        
        </div>
      ) : (
        <p>Cargando información del usuario...</p>
      )}
    </div>
    </body>
  );
};

export default Bitacoras;
