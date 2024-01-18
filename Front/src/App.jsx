

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Personal_info from './components/Personal_info';
import Dashboard from './components/Dashboard';
import Roles from './components/Roles';
import Usuarios from './components/Usuarios';
import Paginas from './components/Paginas';
import Bitacoras from './components/Bitacoras';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/personal_info" element={<Personal_info/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/roles" element={<Roles/>} />
        <Route path="/usuarios" element={<Usuarios/>} />
        <Route path="/paginas" element={<Paginas/>} />
        <Route path="/bitacoras" element={<Bitacoras/>} />
      </Routes>
    </Router>
  );
};

export default App;
