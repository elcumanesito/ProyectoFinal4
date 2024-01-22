const BASE_URL = "http://127.0.0.1:8000";

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Failed to register user: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error during registration:", error.message);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`Failed to login: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
};

// Tener informacion del token del user que uso al momento de logearse

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
};

export const getUserInfo = async () => {
  const headers = getAuthHeaders();

  try {
    const response = await fetch(`${BASE_URL}/api/auth/me`, {
      method: "POST",
      headers: headers
    });


    if (!response.ok) {
      throw new Error(`Failed to fetch user info: ${response.statusText}`);
    }

    return response;
  } catch (error) {
    console.error("Error during getUserInfo:", error.message);
    throw error;
  }
};


export const updateUserInfo = async (updatedInfo) => {
  const headers = getAuthHeaders();

  try {
    const response = await fetch(`${BASE_URL}/api/auth/update`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(updatedInfo),
    });

    if (!response.ok) {
      throw new Error(`Failed to update user info: ${response.statusText}`);
    }

    return response;
  } catch (error) {
    console.error("Error during updateUserInfo:", error.message);
    throw error;
  }
};

// Hacer logout del user

export const logoutUser = async () => {

  const headers = getAuthHeaders();
  try {
    const response = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: "POST",
      headers: headers
    });

    if (!response.ok) {
      throw new Error(`Failed to logout user: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error during logout:", error.message);
    throw error;
  }
};

// Cositas para los roles

export const getRoles = async () => {
  try {
    const rolesResponse = await fetch(`${BASE_URL}/api/auth/index`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!rolesResponse.ok) {
      console.error('Error fetching roles. Status:', rolesResponse.status);
      const errorText = await rolesResponse.text();
      console.error('Error details:', errorText);
      throw new Error(`Failed to fetch roles. Status: ${rolesResponse.status}. Error: ${errorText}`);
    }

    const responseBody = await rolesResponse.json();

    // console.log(responseBody); 

    return responseBody;
  } catch (error) {
    console.error("Error during data fetching:", error.message);
    throw error;
  }
};



export const addRole = async (roleData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/store`, {
      method: "POST",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roleData),
    });

    if (!response.ok) {
      throw new Error(`Failed to add role: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error adding role:", error.message);
    throw error;
  }
};

export const toggleRoleStatus = async (roleId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/${roleId}/toggle-status`, {
      method: "PATCH",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to toggle role status: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error toggling role status:", error.message);
    throw error;
  }
};

// Cositas para los usuarios

export const getUsuarios = async () => {
  try {
    const usuariosResponse = await fetch(`${BASE_URL}/api/auth/usuarios/index`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!usuariosResponse.ok) {
      console.error('Error fetching usuarios. Status:', usuariosResponse.status);
      const errorText = await usuariosResponse.text();
      console.error('Error details:', errorText);
      throw new Error(`Failed to fetch usuarios. Status: ${usuariosResponse.status}. Error: ${errorText}`);
    }

    const responseBody = await usuariosResponse.json();

    // console.log(responseBody);

    return responseBody;
  } catch (error) {
    console.error("Error during data fetching:", error.message);
    throw error;
  }
};

export const addUsuario = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/usuarios/store`, {
      method: "POST",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Failed to add usuario: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error adding usuario:", error.message);
    throw error;
  }
};

export const toggleUsuarioStatus = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/usuarios/${userId}/toggle-status`, {
      method: "PATCH",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to toggle usuario status: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error toggling usuario status:", error.message);
    throw error;
  }
};

// Obtener la lista de páginas
export const getPaginas = async () => {
  try {
    const paginasResponse = await fetch(`${BASE_URL}/api/auth/paginas`, {
      method: "GET",
      headers: getAuthHeaders(), 
    });

    if (!paginasResponse.ok) {
      console.error('Error fetching paginas. Status:', paginasResponse.status);
      const errorText = await paginasResponse.text();
      console.error('Error details:', errorText);
      throw new Error(`Failed to fetch paginas. Status: ${paginasResponse.status}. Error: ${errorText}`);
    }

    const responseBody = await paginasResponse.json();

    return responseBody;
  } catch (error) {
    console.error("Error during data fetching:", error.message);
    throw error;
  }
};

// Agregar una nueva página
export const addPagina = async (paginaData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/paginas`, {
      method: "POST",
      headers: {
        ...getAuthHeaders(), // Ajusta esto según tus necesidades de autenticación
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paginaData),
    });

    if (!response.ok) {
      throw new Error(`Failed to add pagina: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error adding pagina:", error.message);
    throw error;
  }
};

// Traer la bitacora 

export const getBitacoras = async () => {
  try {
    const bitacorasResponse = await fetch(`${BASE_URL}/api/auth/bitacora/index`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!bitacorasResponse.ok) {
      console.error('Error fetching bitacoras. Status:', bitacorasResponse.status);
      const errorText = await bitacorasResponse.text();
      console.error('Error details:', errorText);
      throw new Error(`Failed to fetch bitacoras. Status: ${bitacorasResponse.status}. Error: ${errorText}`);
    }

    const responseBody = await bitacorasResponse.json();

    // console.log(responseBody); 

    return responseBody;
  } catch (error) {
    console.error("Error during data fetching:", error.message);
    throw error;
  }
};

