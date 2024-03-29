import { useState, useEffect } from 'react'
import Search from '../Components/Search';
import ipcConnect from '../api/ipcIndex';
import { toCapitalize } from '../helpers/capitalizeStr';
import { useNavigate } from 'react-router-dom';
import Modal from '../Components/Modal';
import { agruparPorPrimeraLetra } from '../helpers/primerLetra';
import Pagination from '../Components/Pagination';

const Users = () => {
    const toNavigate = useNavigate()

    const createTurno = (dni) => toNavigate('/crear-turno', { state: dni })

    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(6);
    const [isLoading, setLoading] = useState(false);
    const [order, setOrder] = useState(false);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


    const [letras, setLetras] = useState({})
    const [letraActual, setLetraActual] = useState(null)

    const openModal = (item) => {
        const setItem = { paciente: item }
        setSelectedItem(setItem);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);


    useEffect(() => {
        ipcConnect.get('get-users')
            .then((allUsers) => {
                setUsers(allUsers)
                setLetras(agruparPorPrimeraLetra(allUsers))
            })
            .catch((error) => console.log(error));
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users?.slice(indexOfFirstUser, indexOfLastUser);

    const deleteU = (id) => {
        setLoading(true);

        ipcConnect.delete('delete-user', id)
            .then(result => {

                setLoading(false)
                setUsers(result);
            })
            .catch(error => {
                console.log(error)
            })
    }


    const editUser = (data) => toNavigate('/update-user', { state: data })

    const handleSubmit = (event) => {
        event.preventDefault();
        const field = Number(event.target.search.value) ? 'dni' : 'apellido';
        ipcConnect.filterData('get-data-filter', field, event.target.search.value).then(data => {
            console.log(data)
            setUsers(data)
        })

    }

    const orderField = () => {
        setOrder(!order)
        order
            ? users.sort((a, b) => a.apellido.localeCompare(b.apellido))
            : users.sort((a, b) => b.apellido.localeCompare(a.apellido))
    }

    const mostrarPacientesPorApellido = (letra) => {
        setLetraActual(letra)
        setUsers(letras[letra])
    }

    return (
        <div className="w-full mx-auto px-4 md:px-8">

            <Search placeholder={'Busque un usuario por DNI o Apellido'} handleSubmit={handleSubmit} />

            <ol className="flex justify-center gap-1 text-xs font-medium mt-4">
                {
                    Object.keys(letras)
                        .sort((a, b) => a.localeCompare(b))
                        .map((letra, i) => (
                            <li key={i + 1}>
                                <a
                                    onClick={() => mostrarPacientesPorApellido(letra)}
                                    className={`relative block rounded px-3 py-1.5 text-sm transition-all duration-300 w-8 cursor-pointer
                            ${letraActual === letra ? 'bg-green-900 text-white' : 'bg-green-500 text-neutral-600 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'}`}
                                >
                                    {letra}
                                </a>
                            </li>
                        ))}
            </ol>
            <div className="mt-8 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto  text-left">
                    <thead className="bg-blue-200 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6 text-center cursor-pointer hover:bg-blue-600 hover:text-white transition" onClick={orderField}>Paciente {order ? '↓' : '↑'}</th>
                            <th className="py-3 px-6 text-center">DNI</th>
                            <th className="py-3 px-6 text-center">Obra Social</th>
                            <th className="py-3 px-6 text-center"></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            currentUsers
                                .map((item, idx) => (
                                    <tr key={idx} className={idx % 2 === 0 ? `bg-slate-300` : ''}>
                                        <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                                            <div>
                                                <span className="block text-gray-700 text-sm font-medium">{toCapitalize(item?.nombre)} - {toCapitalize(item.apellido)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.dni}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center font-semibold">{item.obraSocial?.nombre || 'No hay datos'} </td>
                                        <td className="text-right px-6 whitespace-nowrap">
                                            <button onClick={() => createTurno(item.dni)} className="py-2 leading-none px-3 font-medium text-green-600 hover:text-green-500 duration-150 hover:bg-gray-200 rounded-lg">
                                                Dar Turno
                                            </button>
                                            <button
                                                onClick={() => openModal(item)}
                                                className="py-2 leading-none px-3 font-medium bg-blue-700 text-white  duration-150 hover:bg-blue-400 hover:text-black rounded-lg"
                                            >
                                                Detalles
                                            </button>
                                            <a onClick={() => editUser(item)} className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-200 rounded-lg cursor-pointer">
                                                Edit
                                            </a>
                                            <button onClick={() => deleteU(item._id)} className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-200 rounded-lg">
                                                Delete
                                            </button>

                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
                {isModalOpen && <Modal open={isModalOpen} data={selectedItem} closeModal={closeModal} addUser={false} />}
            </div>
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalUsers={users.length}
                usersPerPage={usersPerPage}
            />
        </div>

    )
}

export default Users
