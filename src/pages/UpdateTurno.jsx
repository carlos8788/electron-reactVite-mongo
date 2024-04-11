import { useEffect, useRef, useState } from 'react';
import ipcConnect from '../api/ipcIndex';
import { useLocation, useNavigate } from 'react-router-dom';
import { prepareDNI } from '../helpers/paciente.dto';
import { toCapitalize } from '../helpers/capitalizeStr';

const UpdateTurno = () => {
    const emptyForm = {
        paciente: '',
        diagnostico: '',
        hora: '',
        fecha: ''
    }

    const navigate = useNavigate()
    const [formData, setFormData] = useState(emptyForm);
    const [initialData, setInitialData] = useState('')
    const [users, setUsers] = useState([])
    const location = useLocation();
    useEffect(() => {
        console.log(location.state)
        setFormData({
            _id: location.state._id,
            paciente: location.state?.paciente?.dni,
            diagnostico: location.state?.diagnostico,
            hora: location.state.hora,
            fecha: location.state.fecha
        })
        if (location.state) setInitialData(location.state);
    }, [location.state]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const updateTurno = (formData) => {
        console.log('llega?')
        ipcConnect.update('update-turno', formData)
            .catch(error => {
                console.error('Error al actualizar turno:', error);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataForm = new FormData(e.target);
        const data = Object.fromEntries(dataForm.entries());
        data.paciente = prepareDNI(data.paciente.trim())
        const paciente = await ipcConnect.getOne('get-user-dni', data.paciente)
        setFormData(prevData => ({
            ...prevData,
            paciente: paciente?._id
        }));
        updateTurno({ ...formData, paciente: paciente?._id })
        setFormData(emptyForm)
        navigate('/turnos')
    };

    const handleSearch = (e) => {
        console.log(e.target.value)
        ipcConnect.filterData('get-data-filter', 'apellido', e.target.value).then(setUsers)
    }

    const handleSelect = (e) => setFormData(prevData => ({ ...prevData, paciente: e.target.value }))

    return (
        <section className="py-1 font-medium text-gray-600">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 gap-x-12 items-start justify-between lg:flex md:px-8">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-lg">
                        <h1 className="text-center text-2xl font-bold text-green-600 sm:text-3xl">Actualizar turno</h1>
                        <div className='bg-slate-100 rounded-md flex gap-5'>
                            <label htmlFor="user" className="sr-only"></label>

                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-gray-500 p-4 pe-12 text-sm shadow-md"
                                    placeholder="Ingrese Apellido"
                                    name='user'
                                    onChange={handleSearch}

                                />
                            </div>
                            <select name="users" className='w-full rounded-lg border-gray-500 text-sm shadow-md' onChange={handleSelect}>
                                <option value="">Seleccione un paciente</option>
                                {users.map(user => <option key={user._id} value={user.dni}> {toCapitalize(user.nombre)} {toCapitalize(user.apellido)}</option>)}

                            </select>
                        </div>
                        <form
                            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-xl sm:p-6 lg:p-8 bg-slate-200"
                            onSubmit={handleSubmit}
                        >
                            <div className="flex gap-x-10 justify-center">
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
                                                value={formData.hora}
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
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="block w-full rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white"
                            >
                                Actualizar turno
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UpdateTurno