import { useEffect, useRef, useState } from 'react';
import ipcConnect from '../api/ipcIndex';
import { useNavigate } from 'react-router-dom';

const CreateNote = () => {
    const formRef = useRef(null)
    const navigate = useNavigate()
    const [date, setDate] = useState({})

    useEffect(() => {
        const today = new Date();

        const fecha = today.getFullYear() + '-' +
            (today.getMonth() + 1).toString().padStart(2, '0') + '-' +
            today.getDate().toString().padStart(2, '0');

        const hora = today.getHours() + ':' + today.getMinutes()

        setDate({ hora, fecha })

    }, []);
    

    const registerTurno = (formData) => {
        // console.log(formData)
        ipcConnect.create('create-nota', formData)
            .catch(error => {
                console.error('Error al crear nota:', error);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataForm = new FormData(e.target);
        const data = Object.fromEntries(dataForm);
        const paciente = await ipcConnect.filterData('get-data-filter', 'telefono', data.telefono)
        const consulta = { ...data, paciente: paciente[0]?._id, hora: date.hora, fecha: date.fecha }
        registerTurno(consulta);
        navigate('/notas')
    };
    return (
        <section className="py-1 font-medium text-gray-600">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 gap-x-12 items-start justify-between lg:flex md:px-8">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-lg">
                        <h1 className="text-center text-2xl font-bold text-green-600 sm:text-3xl">Crear nota</h1>
                        <form
                            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-xl sm:p-6 lg:p-8 bg-slate-200"
                            onSubmit={handleSubmit}
                        >
                            <div className="flex gap-x-10">
                                <div className='flex gap-y-2 flex-col'>
                                    <div className='bg-slate-100 rounded-md'>
                                        <label htmlFor="paciente" className="sr-only"></label>

                                        <div className="relative">
                                            <input
                                                type="text"
                                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                                placeholder="Ingrese teléfono"
                                                name='telefono'
                                            />
                                        </div>
                                    </div>


                                    <div className='bg-slate-100 rounded-md'>
                                        <label htmlFor="OrderNotes" className="sr-only"></label>
                                        <textarea
                                            id="OrderNotes"
                                            className="w-full resize-none rounded-lg border align-top focus:ring-0 sm:text-sm pl-4 pt-2"
                                            rows="4"
                                            placeholder="Nota..."
                                            name='texto'
                                        ></textarea>
                                    </div>


                                </div>
                            </div>
                            <button
                                type="submit"
                                className="block w-full rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white"
                            >
                                Crear nota
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreateNote