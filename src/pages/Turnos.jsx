import { useEffect, useState } from 'react'
import ipcConnect from '../api/ipcIndex';
import { toCapitalize } from '../helpers/capitalizeStr';
import DropDown from '../Components/DropDown';
import { useNavigate } from 'react-router-dom';
import CrearDia from '../Components/CrearDia';
import Alert from '../Components/Alert';

const Turnos = () => {
    const toNavigate = useNavigate()
    const [turnos, setTurnos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [turnoPerPage] = useState(10);
    const [isLoading, setLoading] = useState(false);
    const [fechas, setFechas] = useState([]);
    const [dayView, setDayView] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const openModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);
    const closeAlert = () => setIsAlertOpen(false);

    const selectDay = (day) => {
        setDayView(day);
        ipcConnect.filterData('get-turno-filter', 'fecha', fechas[day]).then(result => {
            console.log(turnos)
            setTurnos(result.sort((a, b) => a.hora.localeCompare(b.hora)))
            paginate(1)
        })
    }
    useEffect(() => {
        ipcConnect.get('get-turnos')
            .then(data => {
                setTurnos(data);
                setFechas([... new Set(data.map(turno => turno.fecha))])
            })
            
            .catch((error) => console.log(error));
    }, []);

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
    const alerta = () => setIsAlertOpen(true)

    return (
        <div className="w-full mx-auto px-4 md:px-8">
            <h1 className='text-center text-2xl font-bold text-green-600 sm:text-3xl'>Turnos</h1>
            <div className='flex gap-3 justify-center mb-0 mt-4'>
                <DropDown data={fechas} name={'Fechas'} action={selectDay} />
                <button
                    onClick={ crearDia }
                    className='font-semibold bg-green-600 p-2 rounded-md hover:bg-green-500 hover:text-white transition-colors'
                >
                    Crear día de atención
                </button>
                <button
                    onClick={ createTurno }
                    className='font-semibold bg-green-600 p-2 rounded-md hover:bg-green-500 text-white transition-colors'
                >
                    Crear turno
                </button>
                <button
                    onClick={ alerta }
                    className='font-semibold bg-green-600 p-2 rounded-md hover:bg-green-500 text-white transition-colors'
                >
                    alert
                </button>
            </div>
            <div className="mt-6 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto  text-left">
                    <thead className="bg-blue-200 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-4 text-center">Paciente</th>
                            <th className="py-3 px-4 text-center">Observaciones</th>
                            <th className="py-3 px-4 text-center">Obra Social</th>
                            <th className="py-3 px-4 text-center">Hora</th>
                            <th className="py-3 px-4 text-center">Fecha</th>
                            <th className="py-3 px-4"></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            currentTurnos
                            .sort((a, b) => a.hora.localeCompare(b.hora))
                            .map((item, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? `bg-slate-300` : ''}>
                                    <td className="px-4 py-1 whitespace-nowrap font-medium">{toCapitalize(item.paciente?.nombre)}-{toCapitalize(item.paciente?.apellido)}</td>
                                    <td className="px-4 py-1 whitespace-nowrap">{item.diagnostico?.substring(0, 22)}{item.diagnostico?.substring(0, 22).length >= 22 ? '...' : ''}</td>
                                    <td className="py-1 whitespace-nowrap text-center">{item.paciente?.obraSocial?.nombre} </td>
                                    <td className="px-4 py-1 whitespace-nowrap">{item.hora}</td>
                                    <td className="px-4 py-1 whitespace-nowrap">{item.fecha}</td>
                                    <td className="text-right px-6 whitespace-nowrap">
                                        <button onClick={() => editTurno(item)} className="py-2 leading-none px-3 font-medium text-blue-600 hover:text-blue-500 duration-150 hover:bg-gray-200 rounded-lg">
                                            Edit
                                        </button>
                                        <button onClick={() => deleteU(item._id)} className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-200 rounded-lg">
                                            Delete
                                        </button>
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {isModalOpen && <CrearDia open={isModalOpen}  closeModal={closeModal}  />}
                {isAlertOpen && <Alert open={isAlertOpen}  closeModal={closeAlert}  />}
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