import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Homepage from './Components/Homepage';
import Form from './Components/Form';
import Users from './Components/Users';

function App() {


  return (

    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/form" element={<Form />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Layout>
    </Router>

  );
}

export default App
