import { useEffect, useState } from "react"
import ipcConnect from "../api/ipcIndex"
import { toCapitalize } from "../helpers/capitalizeStr"
import Modal from "../Components/Modal"
import { useNavigate } from "react-router-dom"
import Alert from "../Components/Alert"

const Notes = () => {
    const [notes, setNotes] = useState([])
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [idNote, setIdNote] = useState(null)

    const toNavigate = useNavigate()

    const createNote = () => toNavigate('/crear-nota')

    const openModalDetail = (item) => {
        item.paciente.observaciones = item.texto
        setSelectedItem(item);
        setIsDetailOpen(true)
    }
    const closeDetail = () => setIsDetailOpen(false);
    const closeAlert = () => setIsAlertOpen(false)

    const openAlert = (id) => {
        setIdNote(id)
        setIsAlertOpen(true)
    }
    const handleDeleteConfirm = async (item) => {
        deleteNote(item)
        setIsAlertOpen(false);
    };
    const deleteNote = (id) => {

        ipcConnect.delete('delete-nota', id)
            .then(result => {
                setNotes(result);
            })
            .catch(error => {
                console.log(error)
            })
    }

    const editTurno = (data) => toNavigate('/update-nota', { state: data })

    useEffect(() => {
        ipcConnect.get('get-notas')
            .then(setNotes)
    }, [notes])



    return (
        <>
            <div className="w-full mx-auto px-4 md:px-8">
                <h1 className='text-center text-2xl font-bold text-green-600 sm:text-3xl'>Notas</h1>
                <div className='flex gap-3 justify-center mb-0 mt-4'>

                    <button
                        onClick={createNote}
                        className='font-semibold bg-green-600 p-2 rounded-md hover:bg-green-500 text-white transition-colors'
                    >
                        Crear nota
                    </button>
                    {/* <button
                    onClick={openAlert}
                    className='font-semibold bg-green-600 p-2 rounded-md hover:bg-green-500 text-white transition-colors'
                >
                    test
                </button> */}
                </div>
                <div className="mt-6 shadow-sm border rounded-lg overflow-x-auto">
                    <table className="w-full table-auto  text-left">
                        <thead className="bg-blue-200 text-gray-600 font-medium border-b">
                            <tr>
                                <th className="py-3 px-4 text-center">Telefono</th>
                                <th className="py-3 px-4 text-center">Paciente</th>
                                <th className="py-3 px-4 text-center">Hora</th>
                                <th className="py-3 text-center">Fecha</th>
                                <th className="py-3 "></th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                            {
                                notes
                                    // .sort((a, b) => a.hora.localeCompare(b.hora))
                                    .map((item, idx) => (
                                        <tr key={idx} className={idx % 2 === 0 ? `bg-slate-300` : ''}>
                                            <td className="px-4 py-1 whitespace-nowrap text-center">
                                                {item.telefono}
                                            </td>
                                            <td className="py-1 whitespace-nowrap text-center">

                                                {toCapitalize(item?.paciente?.nombre)} - {toCapitalize(item?.paciente?.apellido)}
                                            </td>
                                            <td className="px-4 py-1 whitespace-nowrap text-center">{item.hora}</td>
                                            <td className="px-4 py-1 whitespace-nowrap text-center">{item.fecha}</td>
                                            <td className="text-right pr-1  whitespace-nowrap">
                                                {/* {item.paciente?.telefono} */}
                                                <button
                                                    onClick={() => openModalDetail(item)}
                                                    className="py-2 leading-none px-3 font-medium bg-blue-700 text-white  duration-150 hover:bg-blue-400 hover:text-black rounded-lg"
                                                >
                                                    Detalles
                                                </button>
                                                <button
                                                    onClick={() => editTurno(item)}
                                                    className="mx-3 py-2 leading-none px-3 font-medium text-blue-600 hover:text-blue-500 duration-150 hover:bg-gray-200 rounded-lg"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => openAlert(item._id)}
                                                    className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-200 rounded-lg"
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>
                                    ))
                            }
                        </tbody>
                    </table>
                    {/* {isModalOpen && <CrearDia open={isModalOpen} closeModal={closeModal} />} */}
                    {isAlertOpen && <Alert open={isAlertOpen} closeModal={closeAlert} onConfirm={() => handleDeleteConfirm(idNote)} />}
                    {isDetailOpen && <Modal open={isDetailOpen} closeModal={closeDetail} data={selectedItem} />}
                </div>


            </div>
        </>

    )
}

export default Notes