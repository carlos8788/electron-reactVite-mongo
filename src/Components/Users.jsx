import React, { useState, useEffect } from 'react'
import ipcConnect from '../ipcConnect';
import { Link } from 'react-router-dom';

const Users = () => {

    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const [isLoading, setLoading] = useState(false);


    useEffect(() => {
        ipcConnect.getUsers()
            .then((allUsers) => setUsers(allUsers))
            .catch((error) => console.log(error));
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    ipcConnect.getUsers().then(
        (data) => {
            setUsers(data)
            // console.log(users)
        }).catch((error) => console.log(error));

    const deleteU = (id) => {
        setLoading(true);

        ipcConnect.deleteUser(id)
            .then(result => {
                console.log(result)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const updateU = (id) => ipcConnect.updateUser(id).then(result => console.log(result))

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

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        Team members
                    </h3>
                    <p className="text-gray-600 mt-2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </div>
                <div className="mt-3 md:mt-0">
                    <Link
                        to={'/form'}
                        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-green-600 rounded-lg hover:bg-green-700 active:bg-green-800 md:text-sm"
                    >
                        Add member
                    </Link>
                </div>
            </div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto  text-left">
                    <thead className="bg-blue-200 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6">Username</th>
                            <th className="py-3 px-6">Email</th>
                            {/* <th className="py-3 px-6">Number</th> */}
                            <th className="py-3 px-6">Course</th>
                            <th className="py-3 px-6"></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            currentUsers.map((item, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? `bg-slate-300` : ''}>
                                    <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                                        {/* <img src={item.avatar} className="w-10 h-10 rounded-full" /> */}
                                        <div>
                                            <span className="block text-gray-700 text-sm font-medium">{item.nombre} {item.apellido}</span>
                                            {/* <span className="block text-gray-700 text-xs">{item.email}</span> */}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.dni}</td>
                                    {/* <td className="px-6 py-4 whitespace-nowrap">{item.salary}</td> */}
                                    <td className="px-6 py-4 whitespace-nowrap">{item.obraSocial.nombre} </td>
                                    <td className="text-right px-6 whitespace-nowrap">
                                        <a href="javascript:void()" onClick={() => console.log(item._id)} className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-200 rounded-lg">
                                            Edit
                                        </a>
                                        <button href="javascript:void()" onClick={() => deleteU(item._id)} className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-200 rounded-lg">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                        {isLoading && <Spinner />}
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
