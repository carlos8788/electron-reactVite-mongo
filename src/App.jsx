import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Homepage from './Components/Homepage';
import Form from './Components/Form';
// import Users from './Components/Users';
import ObrasSociales from './pages/ObrasSociales';
import Users from './pages/Users';
import UsersExcel from './pages/UsersExcel';
import CreateTurno from './pages/CreateTurno';
import Turnos from './pages/Turnos';
import UpdateUser from './pages/UpdateUser';

function App() {


  return (

    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/form" element={<Form />} />
          <Route path="/users" element={<Users />} />
          <Route path="/obras-sociales" element={<ObrasSociales />} />
          <Route path="/users-excel" element={<UsersExcel />} />
          <Route path="/crear-turno" element={<CreateTurno />} />
          <Route path="/turnos" element={<Turnos />} />
          <Route path="/update-user" element={<UpdateUser />} />
        </Routes>
      </Layout>
    </Router>

  );
}

export default App
