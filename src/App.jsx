import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Homepage from './Components/Homepage';
import Form from './Components/Form';
// import Users from './Components/Users';
import ObrasSociales from './pages/ObrasSociales';
import Users from './pages/Users';
import UsersExcel from './pages/UsersExcel';

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
        </Routes>
      </Layout>
    </Router>

  );
}

export default App
