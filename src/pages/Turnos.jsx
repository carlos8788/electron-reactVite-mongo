import { useEffect, useState } from 'react'
import ipcConnect from '../api/ipcIndex';
import { toCapitalize } from '../helpers/capitalizeStr';

const Turnos = () => {

    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(12);
    const [isLoading, setLoading] = useState(false);


    useEffect(() => {
        ipcConnect.get('get-turnos')
            .then(setUsers)
            .catch((error) => console.log(error));
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const deleteU = (id) =>{
        ipcConnect.delete('delete-turno', id)
            .then(result => {
                setUsers(result);
            })
            .catch(error => {
                console.log(error)
            })
    } 

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto  text-left">
                    <thead className="bg-blue-200 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6">Paciente</th>
                            <th className="py-3 px-6">Observaciones</th>
                            <th className="py-3 px-6">Obra Social</th>
                            <th className="py-3 px-6">Hora</th>
                            <th className="py-3 px-6">Fecha</th>
                            <th className="py-3 px-6"></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            currentUsers.map((item, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? `bg-slate-300` : ''}>
                                    <td className="px-6 py-1 whitespace-nowrap font-medium">{toCapitalize(item.paciente?.nombre)}-{toCapitalize(item.paciente?.apellido)}</td>
                                    <td className="px-6 py-1 whitespace-nowrap">{item.diagnostico}</td>
                                    <td className="px-6 py-1 whitespace-nowrap">{item.paciente.obraSocial?.nombre} </td>
                                    <td className="px-6 py-1 whitespace-nowrap">{item.hora}</td>
                                    <td className="px-6 py-1 whitespace-nowrap">{item.fecha}</td>
                                    <td className="text-right px-6 whitespace-nowrap">
                                        <button onClick={() => deleteU(item._id)} className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-200 rounded-lg">
                                            Delete
                                        </button>
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
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

export default Turnos