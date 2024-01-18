import { useEffect, useState } from 'react';
import { getUserInfo, logoutUser, updateUserInfo } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Personal_info.css';

const PersonalInfo = () => {
  const [userInfo, setUserInfo] = useState();
  const [error, setError] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
  });

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
        setEditedInfo({
          name: data.name,
          lastname: data.lastname,
          email: data.email,
          password: '',
        });
      } catch (error) {
        console.error('Error during fetchUserInfo:', error.message);
        setError(error.message);
      }
    };

    fetchUserInfo();
  }, []);

  const hidePassword = () => '********';

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await updateUserInfo(editedInfo);
      
      if (!response.ok) {
        throw new Error(`Failed to update user info: ${response.statusText}`);
      }

      const updatedData = await response.json();
      setUserInfo(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error during handleSaveClick:', error.message);
      setError(error.message);
    }
  };

  const handleCancelClick = () => {
    setEditedInfo({
      name: userInfo.name,
      lastname: userInfo.lastname,
      email: userInfo.email,
      password: '',
    });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  
  const handleLogout = async () => {
    try {
      await logoutUser(); // Usa el método logoutUser de api.jsx
      navigate('/login'); // Redirige a la vista de Login
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard'); 
  };

  return (
    <div>
      <div id="personal-info">
        <h2>Información Personal</h2>
        
        {error && (
          <p id="error-message">Error al cargar la información del usuario: {error}</p>
        )}

        {userInfo && (
          <div id="user-details">
            <p>Email: {userInfo.email}</p>
            <p>Nombre: {userInfo.name}</p>    
            <p>Apellido: {userInfo.lastname}</p>
            <p>Contraseña: {hidePassword()}</p>

            <button onClick={handleEditClick}>Editar Información</button>

            {isEditing && (
              <div id="edit-modal">
                <form>
                  <label>Nombre:</label>
                  <input
                    type="text"
                    name="name"
                    value={editedInfo.name}
                    onChange={handleInputChange}
                  />

                  <label>Apellido:</label>
                  <input
                    type="text"
                    name="lastname"
                    value={editedInfo.lastname}
                    onChange={handleInputChange}
                  />

                  <label>Email:</label>
                  <input
                    type="text"
                    name="email"
                    value={editedInfo.email}
                    onChange={handleInputChange}
                  />

                  <label>Contraseña:</label>
                  <input
                    type="password"
                    name="password"
                    value={editedInfo.password}
                    onChange={handleInputChange}
                  />

                  <div id="edit-buttons">
                    <button type="button" onClick={handleSaveClick}>Guardar</button>
                    <button type="button" onClick={handleCancelClick}>Cancelar</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>

      <div id="logout-buttons">
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleGoToDashboard}>Ir a Dashboard</button>
      </div>
    </div>
  );
};

export default PersonalInfo;
