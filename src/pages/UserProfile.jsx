import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ipcConnect from '../api/ipcIndex'
import { toCapitalize } from '../helpers/capitalizeStr'

const UserProfile = () => {
    const location = useLocation()
    const [userTurnos, setUserTurnos] = useState([])
    const [user, setUser] = useState({
        _id: '',
        nombre: '',
        apellido: '',
        observaciones: '',
        telefono: '',
        obraSocial: '',
        dni: '',
        edad: ''
    })
    useEffect(() => {
        console.log(location.state)
        setUser({ ...location.state })
        ipcConnect.filterData('get-turno-filter', 'paciente', location.state._id)
            .then(data=>{
                setUserTurnos(data)
                console.log(data)
            })
    }, [location.state])

    // const toNavigate = useNavigate()
    // const [turnos, setTurnos] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [turnoPerPage] = useState(10);
    // const [isLoading, setLoading] = useState(false);
    // const [fechas, setFechas] = useState([]);
    // const [dayView, setDayView] = useState(0);
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [selectedItem, setSelectedItem] = useState(null);

    // const openModal = (item) => {
    //     setSelectedItem(item);
    //     setIsModalOpen(true);
    // };

    // const closeModal = () => setIsModalOpen(false);

    // const selectDay = (day) => {
    //     setDayView(day);
    //     ipcConnect.filterData('get-turno-filter', 'fecha', fechas[day]).then(result => {
    //         console.log(turnos)
    //         setTurnos(result)
    //         paginate(1)
    //     })
    // }
    // useEffect(() => {
    //     ipcConnect.get('get-turnos')
    //         .then(data => {
    //             setTurnos(data);
    //             setFechas([... new Set(data.map(turno => turno.fecha))])
    //         })

    //         .catch((error) => console.log(error));
    // }, []);

    // const indexOfLastTurno = currentPage * turnoPerPage;
    // const indexOfFirstTurno = indexOfLastTurno - turnoPerPage;
    // const currentTurnos = turnos.slice(indexOfFirstTurno, indexOfLastTurno);

    // const paginate = pageNumber => setCurrentPage(pageNumber);

    // const deleteU = (id) => {
    //     ipcConnect.delete('delete-turno', id)
    //         .then(result => {
    //             setTurnos(result);
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }

    // const editTurno = (data) => toNavigate('/update-turno', { state: data })
    // const createTurno = () => toNavigate('/crear-turno')

    // const crearDia = () => openModal(null)

    return (
        <div className="w-full mx-auto px-4 md:px-8">
            <h1 className='text-center text-2xl font-bold text-green-600 sm:text-3xl'>Paciente: <span className='text-blue-500'>{user.nombre} {toCapitalize(user.apellido)}</span></h1>
            {/* <div className='flex gap-3 justify-center mb-0 mt-4'>
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
            </div> */}
            <div className="mt-6 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto  text-left">
                    <thead className="bg-blue-200 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-4 text-center">Fecha</th>
                            <th className="py-3 px-4 text-center">Hora</th>
                            <th className="py-3 px-4 text-center">Observaciones</th>
                            {/* <th className="py-3 px-4 text-center">Obra Social</th> */}
                            <th className="py-3 px-4"></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            userTurnos
                                .map((item, idx) => (
                                    <tr key={idx} className={idx % 2 === 0 ? `bg-slate-300` : ''}>
                                        <td className="px-4 py-1 whitespace-nowrap font-medium text-center">
                                            {item.fecha}
                                        </td>
                                        <td className="px-4 py-1 whitespace-nowrap text-center">
                                            {item.hora}
                                        </td>
                                        <td className="py-1 whitespace-nowrap text-center">
                                            {item.diagnostico}
                                        </td>
                                        {/* <td className="px-4 py-1 whitespace-nowrap">
                                            {item.}
                                        </td> */}
                                        {/* <td className="px-4 py-1 whitespace-nowrap">
                                            {item.}
                                        </td> */}
                                        <td className="text-right px-6 whitespace-nowrap">
                                            <button className="py-2 leading-none px-3 font-medium text-blue-600 hover:text-blue-500 duration-150 hover:bg-gray-200 rounded-lg">
                                                Edit
                                            </button>
                                            <button className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-200 rounded-lg">
                                                Delete
                                            </button>
                                        </td>

                                    </tr>
                                ))
                        }
                    </tbody>
                </table>

            </div>

            {/* <ol className="flex justify-center gap-1 text-xs font-medium mt-4">
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
            </ol> */}
        </div>

    )
}

export default UserProfile