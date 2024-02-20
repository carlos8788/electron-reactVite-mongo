import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Homepage from './pages/Homepage';
import CreateUser from './pages/CreateUser';
import ObrasSociales from './pages/ObrasSociales';
import Users from './pages/Users';
import CreateTurno from './pages/CreateTurno';
import CreateNote from './pages/CreateNote';
import UpdateNote from './pages/UpdateNote';
import Turnos from './pages/Turnos';
import UpdateUser from './pages/UpdateUser';
import UpdateTurno from './pages/UpdateTurno';
import UserProfile from './pages/UserProfile';
import Notes from './pages/Notes';

function App() {


  return (

    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/form" element={<CreateUser />} />
          <Route path="/users" element={<Users />} />
          <Route path="/obras-sociales" element={<ObrasSociales />} />
          <Route path="/notas" element={<Notes />} />
          <Route path="/crear-nota" element={<CreateNote />} />
          <Route path="/update-nota" element={<UpdateNote />} />
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
