import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Homepage from './Components/Homepage';
import CreateUser from './pages/CreateUser';
// import Users from './Components/Users';
import ObrasSociales from './pages/ObrasSociales';
import Users from './pages/Users';
import UsersExcel from './pages/UsersExcel';
import CreateTurno from './pages/CreateTurno';
import Turnos from './pages/Turnos';
import UpdateUser from './pages/UpdateUser';
import UpdateTurno from './pages/UpdateTurno';
import UserProfile from './pages/UserProfile';
import CreateNote from './pages/CreateNote';

function App() {


  return (

    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/form" element={<CreateUser />} />
          <Route path="/users" element={<Users />} />
          <Route path="/obras-sociales" element={<ObrasSociales />} />
          <Route path="/crear-nota" element={<CreateNote />} />
          <Route path="/crear-turno" element={<CreateTurno />} />
          <Route path="/update-turno" element={<UpdateTurno />} />
          <Route path="/turnos" element={<Turnos />} />
          <Route path="/update-user" element={<UpdateUser />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      </Layout>
    </Router>

  );
}

export default App
