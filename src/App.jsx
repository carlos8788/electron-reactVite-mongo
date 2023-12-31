import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ipcConnect from './ipcConnect';
function App() {
  const [count, setCount] = useState(0)
  const [person, setPerson] = useState({})

  useEffect(() => {
    // Escucha la respuesta de la creación del usuario
    const handleUserCreated = (user) => {
      console.log('Usuario creado', user);
      setPerson(user);
      console.log(person);
    };

    window.electron.ipcRenderer.on('user-created', handleUserCreated);

    // Envía un mensaje para crear el usuario
    ipcConnect.createUser({
      username: 'Luis',
      password: '123456',
      email: 'luis@example.com'
    });
    console.log('Intentando crear usuario');

    // Desmontar listeners cuando el componente se desmonte
    // return () => {
    //   window.electron.ipcRenderer.removeAllListeners('user-created');
    // };
  }, []);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
