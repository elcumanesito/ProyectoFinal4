import { useEffect, useState } from 'react';
import { getUserInfo, logoutUser, getUsuarios, toggleUsuarioStatus} from '../services/api';
import { useNavigate } from 'react-router-dom';
import NuevoUsuarioModal from './NuevoUsuarioModal';
import '../styles/Usuarios.css';

const Usuarios = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(true);
  const [showNuevoUsuarioModal, setShowNuevoUsuarioModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await getUserInfo();

        if (!userResponse.ok) {
          throw new Error(`Failed to fetch user info: ${userResponse.statusText}`);
        }

        const userData = await userResponse.json();
        setUserInfo(userData);

        const usuariosResponse = await getUsuarios();
     

        const usuariosData =  usuariosResponse;
        setUsuarios(usuariosData);
      } catch (error) {
        console.error('Error during data fetching:', error.message);
        console.error('Error details:', error);
      } finally {
        setLoadingUsuarios(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  const handleToggleUsuarioStatus = async (userId) => {
    try {
      await toggleUsuarioStatus(userId);
      const usuariosResponse = await getUsuarios();
      if (!usuariosResponse.ok) {
        throw new Error(`Failed to fetch usuarios: ${usuariosResponse.statusText}`);
      }
      const usuariosData = await usuariosResponse.json();
      setUsuarios(usuariosData);
    } catch (error) {
      console.error('Error toggling usuario status:', error.message);
    }
  };

  const handleNuevoUsuarioClick = () => {
    setShowNuevoUsuarioModal(true);
  };

  const handleNuevoUsuarioClose = () => {
    setShowNuevoUsuarioModal(false);
  };

  const handleUsuarioAdded = (nuevoUsuario) => {
    setUsuarios([...usuarios, nuevoUsuario]);
  };

  return (
    <body>
      
    
    <div id="containerUsuario">
      {userInfo ? (
        <div id ="containersitoUsuario">
         
         <div id="menu-column">
            <h2>Administración</h2>
            <hr/>
            <ul id="menu-list">
              <li><a href="/roles">Roles</a></li>
              <li><a href="/usuarios">Usuarios</a></li>
              <li><a href="/bitacoras">Bitácoras</a></li>
              <li><a href="/paginas">Páginas</a></li>
            </ul>

          </div>
          
          <div id= "usuariositos">

          <div id= "tituloUsuarios">
          <h3>Lista de Usuarios</h3>
          <button onClick={handleNuevoUsuarioClick}>Agregar Nuevo Usuario</button>
          </div>
         
          {loadingUsuarios ? (
            <p>Cargando información de usuarios...</p>
          ) : (
            <div>
              
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Correo</th>
                    <th>Estado</th>
                    <th>Fecha de Creación</th>
                    <th>Código de Rol</th>
                    <th>Última Modificación</th>
                    <th>Cambiar Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios && usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>{usuario.id}</td>
                      <td>{usuario.email}</td>
                      <td>{usuario.estado}</td>
                      <td>{new Date(usuario.created_at).toLocaleString()}</td>
                      <td>{usuario.id_rol}</td>
                      <td>{new Date(usuario.updated_at).toLocaleString()}</td>
                      <td><button onClick={() => handleToggleUsuarioStatus(usuario.id)}>Cambiar Estado</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {showNuevoUsuarioModal && (
            <NuevoUsuarioModal onClose={handleNuevoUsuarioClose} onUsuarioAdded={handleUsuarioAdded} />
          )}
          </div>
            <div className='botonsitoLogout'>
          <button id="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      ) : (
        <p>Cargando información del usuario...</p>
      )}
    </div>
    </body>
  );
};

export default Usuarios;
