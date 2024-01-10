import { useEffect, useState } from 'react'
import ipcConnect from '../api/ipcIndex'
import Loader from '../Components/Loader';
import Modal from '../Components/Modal';
import DropDown from '../Components/DropDown';

const UsersExcel = () => {
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(12);
    const [isLoading, setLoading] = useState(false);
    const [days, setDays] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentObrasSociales = users.slice(indexOfFirstUser, indexOfLastUser);

    const openModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const selectDay = (day) => ipcConnect.get('excel', day).then(data => setUsers(data.data))

    useEffect(() => {
        ipcConnect.get('excel')
            .then(setLoading(true))
            .then(data => {
                setDays(prepareData(data.pages))
                setUsers(data.data)
                setLoading(false);
            })

    }, [])

    const prepareData = (data) => data.map(item => `${item.substring(0, 2)}/${item.substring(2, 4)}/2024`)

    const toCapitalize = (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const toCompleteHR = (hour) => {
        if (!hour) return 'SOBRETURNO';
        if (hour.toString().length === 5) return `${hour}`.replace('.', ':')
        if (hour.toString().length === 4) return `${hour}0`.replace('.', ':')
        if (hour.toString().length === 3) return `0${hour}0`.replace('.', ':')
        if (hour.toString().length === 2) return `${hour}.00`.replace('.', ':')
        if (hour.toString().length === 1) return `0${hour}.00`.replace('.', ':')
    }

    // const exportUserToDB = () => {

    // }

    return (
        <div className="w-screen-xl mx-auto px-4 md:px-8">
            <div className="flex gap-4">

                <button 
                // onClick={exportUserToDB}
                className="py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-1/2 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                    Export to DB
                </button>
                <DropDown data={days} name={'Fechas'} action={selectDay} />
            </div>
            <div className="mt-6 shadow-sm border rounded-lg overflow-x-auto my-auto">
                {isLoading
                    ? <Loader />
                    : (currentObrasSociales.length === 0) ? <h2>No se encontraron coincidencias</h2>
                        : <table className="w-full table-auto  text-left">
                            <thead className="bg-green-200 text-gray-600 font-medium border-b">
                                <tr>
                                    <th className="py-1 px-6">Nombre</th>
                                    <th className="py-1 px-6">Apellido</th>
                                    <th className="py-1 px-6">Hora</th>
                                    <th className="py-1 px-6">Observaciones</th>
                                    <th className="py-1 px-6">Teléfono</th>
                                    <th className="py-1 px-6"></th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 divide-y">
                                {
                                    currentObrasSociales.map((item, idx) => (
                                        <tr key={idx} className={idx % 2 === 0 ? `bg-slate-300` : ''} >

                                            <td className="flex items-center gap-x-3 py-1 px-6 whitespace-nowrap">
                                                <div>
                                                    <span className="block text-gray-700 text-sm font-medium">{toCapitalize(item.nombre)}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-1 whitespace-nowrap ">
                                                <span className="block text-gray-700 text-sm font-medium">
                                                    {toCapitalize(item.apellido)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-1 whitespace-nowrap">{toCompleteHR(item.hora)}</td>
                                            <td className="px-6 py-1 whitespace-nowrap">{item.observaciones}</td>
                                            <td className="text-right px-6 py-1 whitespace-nowrap">
                                                {item.telefono}
                                            </td>
                                            <td className="text-right px-6 py-1 whitespace-nowrap">
                                                <button
                                                    className='bg-blue-600 px-2 rounded-md text-white hover:bg-blue-500 transition-colors ease-out focus:bg-blue-700'
                                                    onClick={() => openModal(item)}>
                                                    Detalles
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>}
                {isModalOpen && <Modal open={isModalOpen} data={selectedItem} closeModal={closeModal} />}
            </div>
            <ol className="flex justify-center gap-1 text-xs font-medium mt-4">
                {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
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

export default UsersExcel