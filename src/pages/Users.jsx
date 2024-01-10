import { useState, useEffect } from 'react'
import Search from '../Components/Search';
import ipcConnect from '../api/ipcIndex';

const Users = () => {

    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const [isLoading, setLoading] = useState(false);


    useEffect(() => {
        ipcConnect.get('get-users')
            .then((allUsers) => setUsers(allUsers))
            .catch((error) => console.log(error));
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = pageNumber => setCurrentPage(pageNumber);


    const deleteU = (id) => {
        setLoading(true);

        ipcConnect.delete('delete-user',id)
            .then(result => {
                console.log(result)
                setLoading(false)
                setUsers(result);
            })
            .catch(error => {
                console.log(error)
            })
    }

    // const updateU = (id) => ipcConnect.updateUser(id).then(result => console.log(result))

    const Spinner = () => {
        return (
            <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span>
            </div>
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        ipcConnect.filterData('get-data-filter', 'dni', event.target.search.value).then(data => {
            setUsers(data)
        })
        
    }

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">

            <Search placeholder={'Busque un usuario por DNI'} handleSubmit={handleSubmit}/>

            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto  text-left">
                    <thead className="bg-blue-200 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6">Username</th>
                            <th className="py-3 px-6">Email</th>
                            <th className="py-3 px-6">Course</th>
                            <th className="py-3 px-6"></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            currentUsers.map((item, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? `bg-slate-300` : ''}>
                                    <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                                        <div>
                                            <span className="block text-gray-700 text-sm font-medium">{item.nombre} {item.apellido}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.dni}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.obraSocial.nombre} </td>
                                    <td className="text-right px-6 whitespace-nowrap">
                                        <a onClick={() => console.log(item._id)} className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-200 rounded-lg">
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

export default Users
