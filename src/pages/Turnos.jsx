import { useEffect, useState } from 'react'
import ipcConnect from '../api/ipcIndex';
import { toCapitalize } from '../helpers/capitalizeStr';
import DropDown from '../Components/DropDown';
import { useNavigate } from 'react-router-dom';
import CrearDia from '../Components/CrearDia';
import Alert from '../Components/Alert';
import Modal from '../Components/Modal';

const Turnos = () => {
    const toNavigate = useNavigate()
    const [turnos, setTurnos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [turnoPerPage] = useState(10);
    // const [isLoading, setLoading] = useState(false);
    const [fechas, setFechas] = useState([]);
    const [dayView, setDayView] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [id, setId] = useState(null)

    const openModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const openModalDetail = (item) => {
        console.log(item)
        setSelectedItem(item.paciente);
        setIsDetailOpen(true)
    }
    const closeDetail = () => setIsDetailOpen(false);


    const closeModal = () => setIsModalOpen(false);
    const closeAlert = () => setIsAlertOpen(false)


    const openAlert = (id) => {
        setId(id)
        setIsAlertOpen(true)
    }
    const handleDeleteConfirm = async (item) => {
        // Lógica para manejar la confirmación de eliminación
        console.log("Eliminar:", item);
        // Luego cierra el alerta
        deleteU(item)
        setIsAlertOpen(false);
    };

    const selectDay = (day) => {
        setDayView(day);
        ipcConnect.filterData('get-turno-filter', 'fecha', fechas[day]).then(result => {
            setTurnos(result.sort((a, b) => a.hora.localeCompare(b.hora)))
            paginate(1)
        })
    }

    const getDays = () => {
        const date = new Date()
        let setDay = Number(date.getDate());
        for (let i = 0; i < 7; i++) {
            const day = date.getFullYear() + '-' + date.getMonth() + 1 + '-' + setDay;
            const fecha = fechas.findIndex(item => item === day)
            setDay++;
            if (fecha !== -1) return selectDay(fecha)
        }
    }

    useEffect(() => {
        ipcConnect.get('get-turnos')
            .then(data => {
                setTurnos(data);
                setFechas([... new Set(data.map(turno => turno.fecha))])
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(getDays, [fechas])

    const indexOfLastTurno = currentPage * turnoPerPage;
    const indexOfFirstTurno = indexOfLastTurno - turnoPerPage;
    const currentTurnos = turnos.slice(indexOfFirstTurno, indexOfLastTurno);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const deleteU = (id) => {

        ipcConnect.delete('delete-turno', id)
            .then(result => {
                setTurnos(result);
            })
            .catch(error => {
                console.log(error)
            })
    }

    const editTurno = (data) => toNavigate('/update-turno', { state: data })
    const createTurno = () => toNavigate('/crear-turno')

    const crearDia = () => openModal(null)

    return (
        <div className="w-full mx-auto px-4 md:px-8">
            <h1 className='text-center text-2xl font-bold text-green-600 sm:text-3xl'>Turnos</h1>
            <div className='flex gap-3 justify-center mb-0 mt-4'>
                <DropDown data={fechas} name={'Fechas'} action={selectDay} />
                <button
                    onClick={crearDia}
                    className='font-semibold bg-green-600 p-2 rounded-md hover:bg-green-500 hover:text-white transition-colors'
                >
                    Crear día de atención
                </button>
                <button
                    onClick={createTurno}
                    className='font-semibold bg-green-600 p-2 rounded-md hover:bg-green-500 text-white transition-colors'
                >
                    Crear turno
                </button>
                <button
                    onClick={openAlert}
                    className='font-semibold bg-green-600 p-2 rounded-md hover:bg-green-500 text-white transition-colors'
                >
                    test
                </button>
            </div>
            <div className="mt-6 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto  text-left">
                    <thead className="bg-blue-200 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-4 text-center">Paciente</th>
                            <th className="py-3 px-4 text-center">Obra Social</th>
                            <th className="py-3 px-4 text-center">Hora</th>
                            <th className="py-3 text-center">Fecha</th>
                            <th className="py-3 "></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            currentTurnos
                                .sort((a, b) => a.hora.localeCompare(b.hora))
                                .map((item, idx) => (
                                    <tr key={idx} className={idx % 2 === 0 ? `bg-slate-300` : ''}>
                                        <td className="px-4 py-1 whitespace-nowrap font-medium">
                                            {toCapitalize(item.paciente?.nombre)}-{toCapitalize(item.paciente?.apellido)}
                                        </td>
                                        <td className="py-1 whitespace-nowrap text-center">
                                            {item.paciente?.obraSocial?.nombre.substring(0, 10)}{item.obraSocial?.nombre.substring(0, 10).length >= 10 ? '...' : ''}
                                        </td>
                                        <td className="px-4 py-1 whitespace-nowrap text-center">{item.hora}</td>
                                        <td className="px-4 py-1 whitespace-nowrap text-center">{item.fecha}</td>
                                        <td className="text-right pr-1  whitespace-nowrap">
                                            <button
                                                onClick={() => openModalDetail(item)}
                                                className="py-2 leading-none px-3 font-medium bg-blue-700 text-white  duration-150 hover:bg-blue-400 hover:text-black rounded-lg"
                                            >
                                                Detalles
                                            </button>
                                            <button
                                                onClick={() => editTurno(item)}
                                                className="py-2 leading-none px-3 font-medium text-blue-600 hover:text-blue-500 duration-150 hover:bg-gray-200 rounded-lg"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => openAlert(item._id)}
                                                className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-200 rounded-lg"
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
                {isModalOpen && <CrearDia open={isModalOpen} closeModal={closeModal} />}
                {isAlertOpen && <Alert open={isAlertOpen} closeModal={closeAlert} onConfirm={() => handleDeleteConfirm(id)} />}
                {isDetailOpen && <Modal open={isDetailOpen} closeModal={closeDetail} data={selectedItem} />}
            </div>

            <ol className="flex justify-center gap-1 text-xs font-medium mt-4">
                {Array.from({ length: Math.ceil(turnos.length / turnoPerPage) }, (_, i) => (
                    <li key={i + 1}>
                        <a
                            onClick={() => paginate(i + 1)}
                            className={`relative block rounded px-3 py-1.5 text-sm transition-all duration-300 w-8 cursor-pointer
                            ${currentPage === i + 1 ? 'bg-green-900 text-white' : 'bg-green-500 text-neutral-600 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'}`}
                        >
                            {i + 1}
                        </a>
                    </li>
                ))}
            </ol>
        </div>

    )
}

export default Turnos