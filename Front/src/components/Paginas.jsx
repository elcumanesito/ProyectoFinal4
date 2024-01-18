import { useEffect, useState } from 'react';
import { getUserInfo, logoutUser, getPaginas } from '../services/api';
import { useNavigate } from 'react-router-dom';
import NuevoPaginaModal from './NuevoPaginaModal';
import '../styles/Paginas.css';

const Paginas = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [paginas, setPaginas] = useState([]);
  const [loadingPaginas, setLoadingPaginas] = useState(true);
  const [showNuevoPaginaModal, setShowNuevoPaginaModal] = useState(false);

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

        const paginasResponse = await getPaginas();

      
        const paginasData =  paginasResponse;
        setPaginas(paginasData);
      } catch (error) {
        console.error('Error during data fetching:', error.message);
        console.error('Error details:', error);
      } finally {
        setLoadingPaginas(false);
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

  const handleNuevoPaginaClick = () => {
    setShowNuevoPaginaModal(true);
  };

  const handleNuevoPaginaClose = () => {
    setShowNuevoPaginaModal(false);
  };

  const handlePaginaAdded = (nuevaPagina) => {
    setPaginas([...paginas, nuevaPagina]);
  };

  return (
    <div>
      {userInfo ? (
        <>
          <h2>Bienvenido {userInfo.name} {userInfo.lastname}, selecciona la acción que quieras realizar en las pestañas del menú de la izquierda</h2>
          <ul>
            <li><a href="/roles">Roles</a></li>
            <li><a href="/usuarios">Usuarios</a></li>
            <li><a href="/bitacoras">Bitacoras</a></li>
            <li><a href="/paginas">Paginas</a></li>
          </ul>
          <button onClick={handleLogout}>Logout</button>

          <h3>Lista de Páginas</h3>
          {loadingPaginas ? (
            <p>Cargando información de páginas...</p>
          ) : (
            <div>
              <button onClick={handleNuevoPaginaClick}>Agregar Nueva Página</button>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>URL</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  {paginas && paginas.map((pagina) => (
                    <tr key={pagina.id}>
                      <td>{pagina.id}</td>
                      <td>{pagina.url}</td>
                      <td>{pagina.nombre}</td>
                      <td>{pagina.descripcion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {showNuevoPaginaModal && (
            <NuevoPaginaModal onClose={handleNuevoPaginaClose} onPaginaAdded={handlePaginaAdded} />
          )}
        </>
      ) : (
        <p>Cargando información del usuario...</p>
      )}
    </div>
  );
};

export default Paginas;
