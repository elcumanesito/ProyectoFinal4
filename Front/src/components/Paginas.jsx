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
    <body>
    <div id="containerPagina">
      {userInfo ? (
          <div id="containersitoPagina">
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
          <div id="paginisitas">
            <div id ="tituloPagina">
          <h3>Lista de Páginas</h3>
          <button onClick={handleNuevoPaginaClick}>Agregar Nueva Página</button>
          </div>
          {loadingPaginas ? (
            <p>Cargando información de páginas...</p>
          ) : (
            <div>
              
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

export default Paginas;
