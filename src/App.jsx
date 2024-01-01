import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Homepage from './Components/Homepage';

function App() {


  return (

    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/about" element={<AboutPage />} /> */}
          {/* <Route path="/users" element={<UserPage />} /> */}
        </Routes>
      </Layout>
    </Router>

  );
}

export default App
