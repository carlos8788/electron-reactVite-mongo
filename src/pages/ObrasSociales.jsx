import { useEffect, useState } from "react"
import ipcConnect from "../api/ipcIndex";
import Loader from "../Components/Loader";
import Search from "../Components/Search";

const ObrasSociales = () => {

    const [obraSocial, setObraSocial] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const [isLoading, setLoading] = useState(false);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentObrasSociales = obraSocial.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        setLoading(true)
        ipcConnect.get('get-obraSocials')
            .then(data => {
                setLoading(false)
                setObraSocial(data)
            })
            .catch(error => console.error(error))
        ipcConnect.filterData('get-data-filter', 'nombre', 'maria').then(data => console.log(data))

    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.search.value)
    }

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <Search placeholder={'Buscar una obra social'} handleSubmit={handleSubmit}/>

            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto my-auto">
                {isLoading
                    ? <Loader />
                    : <table className="w-full table-auto  text-left">
                        <thead className="bg-blue-200 text-gray-600 font-medium border-b">
                            <tr>
                                <th className="py-3 px-6">Nombre</th>
                                <th className="py-3 px-6">Dirección</th>
                                {/* <th className="py-3 px-6">Number</th> */}
                                <th className="py-3 px-6">Teléfono</th>
                                <th className="py-3 px-6">Padrón</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                            {
                                currentObrasSociales.map((item, idx) => (
                                    <tr key={idx} className={idx % 2 === 0 ? `bg-slate-300` : ''}>
                                        <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                                            {/* <img src={item.avatar} className="w-10 h-10 rounded-full" /> */}
                                            <div>
                                                <span className="block text-gray-700 text-sm font-medium">{item.nombre}</span>
                                                {/* <span className="block text-gray-700 text-xs">{item.email}</span> */}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.direccion}</td>
                                        {/* <td className="px-6 py-4 whitespace-nowrap">{item.salary}</td> */}
                                        <td className="px-6 py-4 whitespace-nowrap">{item.telefono}</td>
                                        <td className="text-right px-6 whitespace-nowrap">
                                            {item.padron}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>}
            </div>

            <ol className="flex justify-center gap-1 text-xs font-medium mt-4">
                {Array.from({ length: Math.ceil(obraSocial.length / usersPerPage) }, (_, i) => (
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

export default ObrasSociales