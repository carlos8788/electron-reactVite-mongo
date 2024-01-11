import { useEffect, useRef, useState } from 'react';
import ipcConnect from '../api/ipcIndex';
import { useLocation } from 'react-router-dom';

const CreateTurno = () => {
    const emptyForm = {
        paciente: '',
        diagnostico: '',
        hora: '',
        fecha: ''
    }

    const formRef = useRef(null)
    const [formData, setFormData] = useState(emptyForm);
    const [initialData, setInitialData] = useState('')

    const location = useLocation();
    useEffect(() => {
        if (location.state) setInitialData(location.state);
    }, [location.state]);

    useEffect(() => {
        const today = new Date();

        const formattedDate = today.getFullYear() + '-' +
            (today.getMonth() + 1).toString().padStart(2, '0') + '-' +
            today.getDate().toString().padStart(2, '0');

        setFormData(prevFormData => ({
            ...prevFormData,
            paciente: initialData,
            fecha: formattedDate
        }));
    }, [initialData]);



    useEffect(() => {
        ipcConnect.get('get-turnos').then(data => console.log(data))
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };



    const registerTurno = (formData) => {
        // console.log(formData)
        ipcConnect.create('create-turno', formData)
            .catch(error => {
                console.error('Error al crear usuario:', error);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataForm = new FormData(e.target);
        const data = Object.fromEntries(dataForm.entries());
        const paciente = await ipcConnect.getOne('get-user-dni', data.paciente)
        setFormData(prevData => ({
            ...prevData,
            paciente: paciente._id
        }));
        registerTurno({ ...formData, paciente: paciente._id });
        setFormData(emptyForm)
    };
    return (
        <section className="py-1 font-medium text-gray-600">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 gap-x-12 items-start justify-between lg:flex md:px-8">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-lg">
                        <h1 className="text-center text-2xl font-bold text-green-600 sm:text-3xl">Crear turno</h1>
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
                                                placeholder="Ingrese DNI"
                                                name='paciente'
                                                value={formData.paciente}
                                                onChange={handleInputChange}

                                            />
                                        </div>
                                    </div>
                                    <div className='bg-slate-100 rounded-md'>
                                        <label htmlFor="hora" className="sr-only"></label>

                                        <div className="relative">
                                            <input
                                                type="time"
                                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                                placeholder="Ingrese apellido"
                                                name='hora'
                                                onChange={handleInputChange}

                                            />
                                        </div>
                                    </div>

                                    <div className='bg-slate-100 rounded-md'>
                                        <label htmlFor="fecha" className="sr-only"></label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                                placeholder="Fecha"
                                                name='fecha'
                                                value={formData.fecha}
                                                onChange={handleInputChange}

                                            />
                                        </div>
                                    </div>

                                    <div className='bg-slate-100 rounded-md'>
                                        <label htmlFor="OrderNotes" className="sr-only"></label>
                                        <textarea
                                            id="OrderNotes"
                                            className="w-full resize-none rounded-lg border align-top focus:ring-0 sm:text-sm pl-4 pt-2"
                                            rows="4"
                                            placeholder="Observaciones"
                                            name='diagnostico'
                                            value={formData.diagnostico}
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>
                                </div>

                            </div>
                            <button
                                type="submit"
                                className="block w-full rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white"
                            >
                                Registrar turno
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreateTurno