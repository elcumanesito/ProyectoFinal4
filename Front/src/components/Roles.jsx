import { useState, useEffect } from 'react';
import { getUserInfo, logoutUser } from '../services/api';
import { getRoles, addRole, toggleRoleStatus } from '../services/api'; // funciones para roles
import { useNavigate } from 'react-router-dom';
import '../styles/Roles.css';

const Roles = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [roles, setRoles] = useState([]); //  para almacenar la lista de roles
  const [newRole, setNewRole] = useState(''); //  para el formulario de nuevo rol
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
  
        // Obtener la lista de roles al montar el componente
        const rolesData = await getRoles();
        
        setRoles(rolesData);

      } catch (error) {
        console.error('Error details:', error);
        console.log('Error Response:', error.response);
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

  const handleAddRole = async () => {
    try {
      await addRole({ rol: newRole });
      // Después de agregar un nuevo rol, recargar la lista de roles
      const rolesResponse = await getRoles();
      if (!rolesResponse.ok) {
        throw new Error(`Failed to fetch roles: ${rolesResponse.statusText}`);
      }
      const rolesData = await rolesResponse.json();
      setRoles(rolesData);
      setNewRole(''); // Limpiar el campo después de agregar
    } catch (error) {
      console.error('Error adding role:', error.message);
    }
  };

  const handleToggleStatus = async (roleId) => {
    try {
      await toggleRoleStatus(roleId);
      console.log('After toggleRoleStatus');
  
      // Después de cambiar el estado de un rol, recargar la lista de roles
      const rolesResponse = await getRoles();
      console.log('After getRoles');
  
      if (!rolesResponse.ok) {
        throw new Error(`Failed to fetch roles: ${rolesResponse.statusText}`);
      }
  
      const rolesData = await rolesResponse.json(); 
      setRoles(rolesData);
    } catch (error) {
      console.error('Error toggling role status:', error.message);
    }
  };

  return (
    <body>
    <div id="containerRol">
      {userInfo ? (     
          <div id="containersitoRol">
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
          
          
          <div id="rolesitos">
          {/* Lista de roles */}
          <h3>Lista de Roles</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Creado en</th>
                <th>Actualizado en</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {roles && roles.map((rol) => (
                <tr key={rol.id}>
                  <td>{rol.id}</td>
                  <td>{rol.rol}</td>
                  <td>{rol.estado}</td>
                  <td>{new Date(rol.created_at).toLocaleString()}</td>
                  <td>{new Date(rol.updated_at).toLocaleString()}</td>
                  <td>
                    <button onClick={() => handleToggleStatus(rol.id)}>Cambiar Estado</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Formulario para agregar nuevo rol */}
          <div>
            <h3>Agregar Nuevo Rol</h3>
            <input type="text" value={newRole} onChange={(e) => setNewRole(e.target.value)} />
            <button onClick={handleAddRole}>Agregar Rol</button>

            </div>
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

export default Roles;
