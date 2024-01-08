import { useEffect, useState } from 'react'
import ipcConnect from '../api/ipcIndex'
import Search from '../Components/Search';
import Loader from '../Components/Loader';

const UsersExcel = () => {
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [isLoading, setLoading] = useState(false);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentObrasSociales = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        ipcConnect.get('excel')
            .then(data => {
                // console.log(data)
                setUsers(data.data)
            })

    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(event.target.search.value)
        ipcConnect.filterData('get-obraSocial-filter', 'nombre', event.target.search.value).then(setUsers)
    }

    const toCapitalize = (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const toCompleteHR = (hour) => {
        if (!hour) return 'SOBRETURNO';
        if (hour.toString().length === 5) return `${hour}`.replace('.', ':')
        if (hour.toString().length === 4) return `${hour}0`.replace('.', ':')
        if (hour.toString().length === 2) return `${hour}.00`.replace('.', ':')

    }
    

    return (
        <div className="w-screen-xl mx-auto px-4 md:px-8">
            <Search placeholder={'Buscar un paciente'} handleSubmit={handleSubmit} />

            <div className="mt-6 shadow-sm border rounded-lg overflow-x-auto my-auto">
                {isLoading
                    ? <Loader />
                    : (currentObrasSociales.length === 0) ? <h2>No se encontraron coincidencias</h2>
                        : <table className="w-full table-auto  text-left">
                            <thead className="bg-blue-200 text-gray-600 font-medium border-b">
                                <tr>
                                    <th className="py-1 px-6">Nombre</th>
                                    <th className="py-1 px-6">Apellido</th>
                                    <th className="py-1 px-6">Hora</th>
                                    <th className="py-1 px-6">Observaciones</th>
                                    <th className="py-1 px-6">Teléfono</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 divide-y">
                                {
                                    currentObrasSociales.map((item, idx) => (
                                        <tr key={idx} className={idx % 2 === 0 ? `bg-slate-300` : ''}>
                                            <td className="flex items-center gap-x-3 py-1 px-6 whitespace-nowrap">
                                                <div>
                                                    <span className="block text-gray-700 text-sm font-medium">{toCapitalize(item.Nombre)}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-1 whitespace-nowrap ">
                                                <span className="block text-gray-700 text-sm font-medium">
                                                    {toCapitalize(item.Apellido)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-1 whitespace-nowrap">{toCompleteHR(item.Hora)}</td>
                                            <td className="px-6 py-1 whitespace-nowrap">{item.Observaciones}</td>
                                            <td className="text-right px-6 py-1 whitespace-nowrap">
                                                {item.Telefono}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>}
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