
const ListaTurnos = () => {
    const handleOpenWindow = () => {
        window.electron.ipcRenderer.send('open-secondary-window');
    };

    return (
        <button onClick={handleOpenWindow} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Abrir Ventana Secundaria
        </button>
    );
};

export default ListaTurnos;
