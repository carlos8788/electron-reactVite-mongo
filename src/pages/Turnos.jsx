import { useEffect, useState } from 'react'
import ipcConnect from '../api/ipcIndex';
import { toCapitalize } from '../helpers/capitalizeStr';
import DropDown from '../Components/DropDown';

const Turnos = () => {

    const [turnos, setTurnos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [turnoPerPage] = useState(10);
    const [isLoading, setLoading] = useState(false);
    const [fechas, setFechas] = useState([]);
    const [dayView, setDayView] = useState(0);


    const selectDay = (day) => {
        setDayView(day);
        ipcConnect.filterData('get-turno-filter', 'fecha', fechas[day]).then(result => setTurnos(result))
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


    return (
        <div className="w-full mx-auto px-4 md:px-8">
            <h1 className='text-center text-2xl font-bold text-green-600 sm:text-3xl'>Turnos</h1>
            <div className='flex gap-3 justify-center mb-0 mt-4'>
                <DropDown data={fechas} name={'Fechas'} action={selectDay} />
                <button className='font-semibold bg-green-600 p-2 rounded-md hover:bg-green-500 hover:text-white transition-colors'>Hola Mundo</button>

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
                            currentTurnos.map((item, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? `bg-slate-300` : ''}>
                                    <td className="px-4 py-1 whitespace-nowrap font-medium">{toCapitalize(item.paciente?.nombre)}-{toCapitalize(item.paciente?.apellido)}</td>
                                    <td className="px-4 py-1 whitespace-nowrap">{item.diagnostico?.substring(0, 22)}{item.diagnostico?.substring(0, 22).length >= 22 ? '...' : ''}</td>
                                    <td className="px-4 py-1 whitespace-nowrap text-center">{item.paciente.obraSocial?.nombre} </td>
                                    <td className="px-4 py-1 whitespace-nowrap">{item.hora}</td>
                                    <td className="px-4 py-1 whitespace-nowrap">{item.fecha}</td>
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