
import { useEffect, useRef, useState } from 'react';
import ipcConnect from '../api/ipcIndex';
import { useLocation, useNavigate } from 'react-router-dom';


export default function UpdateUser() {
    const emptyForm = {
        nombre: '',
        apellido: '',
        observaciones: '',
        telefono: '',
        dni: '',
        edad: '',
        obraSocial: '',
        _id: '',
    }
    const [obrasSociales, setObrasSociales] = useState([])
    const formRef = useRef(null)
    const [formData, setFormData] = useState(emptyForm);
    const [initialData, setInitialData] = useState({})

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state) setInitialData(location.state);
    }, [location.state]);

    const user = {
        _id: initialData?._id,
        nombre: initialData.nombre || '',
        apellido: initialData.apellido || '',
        observaciones: initialData.observaciones || '',
        telefono: initialData.telefono || '',
        dni: initialData.dni?.trim() || '',
        edad: initialData.edad || '',
        obraSocial: initialData.obraSocial || '',
    }

    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            ...user
        }));
    }, [initialData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };


    useEffect(() => {
        ipcConnect.get('get-obraSocials')
            .then(setObrasSociales)
            .catch(error => console.log(error))
    }, [])

    const updateUser = (formData) => {
        ipcConnect.update('update-user', formData)
            .catch(error => {
                console.error('Error al crear usuario:', error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData.entries());
        console.log(userData)
        updateUser(userData)
        setFormData(emptyForm)
        navigate('/users')
    };

    return (
        <section className="py-1 font-medium text-gray-600">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 gap-x-12 items-start justify-between lg:flex md:px-8">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-lg">
                        <h1 className="text-center text-2xl font-bold text-green-600 sm:text-3xl">Actualizar Paciente</h1>
                        <form onSubmit={handleSubmit} ref={formRef} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-xl sm:p-6 lg:p-8 bg-slate-200">
                            <p className="text-center text-lg font-medium">Actualice un paciente</p>
                            <div className="flex gap-x-10">
                                <div className='flex gap-y-2 flex-col'>
                                    <div className='bg-slate-100 rounded-md'>
                                        <label htmlFor="nombre" className="sr-only"></label>

                                        <div className="relative">
                                            <input
                                                type="text"
                                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm hidden"
                                                name='_id'
                                                defaultValue={formData?._id}
                                                readOnly={true}
                                            />
                                            <input
                                                type="text"
                                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                                placeholder="Ingrese nombre"
                                                name='nombre'
                                                value={formData?.nombre}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='bg-slate-100 rounded-md'>
                                        <label htmlFor="apellido" className="sr-only"></label>

                                        <div className="relative">
                                            <input
                                                type="text"
                                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                                placeholder="Ingrese apellido"
                                                name='apellido'
                                                value={formData?.apellido}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className='bg-slate-100 rounded-md'>
                                        <label htmlFor="observaciones" className="sr-only"></label>

                                        <div className="relative">
                                            <input
                                                type="text"
                                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                                placeholder="Observaciones breve"
                                                name='observaciones'
                                                value={formData?.observaciones}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className='bg-slate-100 rounded-md'>
                                        <label htmlFor="telefono" className="sr-only"></label>

                                        <div className="relative">
                                            <input
                                                type="text"
                                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                                placeholder="Ingrese telefono"
                                                name='telefono'
                                                value={formData?.telefono}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex gap-y-2 flex-col'>
                                    <div className='bg-slate-100 rounded-md'>
                                        <label htmlFor="obraSocial" className="sr-only"></label>
                                        <select name="obraSocial" className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm">
                                            {
                                                obrasSociales
                                                    .sort((a, b) => a.nombre.localeCompare(b.nombre))
                                                    .map(obrasSocial =>
                                                        <option key={obrasSocial._id} value={obrasSocial._id} >
                                                            {obrasSocial.nombre}
                                                        </option>
                                                    )
                                            }
                                        </select>
                                    </div>
                                    <div className='bg-slate-100 rounded-md'>
                                        <label htmlFor="dni" className="sr-only"></label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                                placeholder="Ingrese dni"
                                                name='dni'
                                                value={formData?.dni}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className='bg-slate-100 rounded-md'>
                                        <label htmlFor="edad" className="sr-only"></label>

                                        <div className="relative">
                                            <input
                                                type="number"
                                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                                placeholder="Ingrese edad"
                                                name='edad'
                                                value={formData?.edad}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='bg-slate-100 rounded-md'>
                                        <label htmlFor="fechaNacimiento" className="sr-only"></label>

                                        <div className="relative">
                                            <input
                                                type="date"
                                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                                placeholder="Ingrese Fecha de Nacimiento"
                                                name='fechaNacimiento'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="block w-full rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white"
                            >
                                Actualizar
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}



