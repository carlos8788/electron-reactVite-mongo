import { useEffect, useState } from 'react'
import Login from '../Components/Login'
import ipcConnect from '../api/ipcIndex'

const Homepage = () => {

    const [dia, setDia] = useState(null)
    const [horario, setHorario] = useState(null)
    const [pacientes, setPacientes] = useState(null)
    function addDay(date) {
        const result = new Date(date);
        result.setDate(result.getDate() + 1);
        return result;
    }


    function findTurnoByDate(fechas, date = new Date()) {
        const formattedDate = date.toISOString().split('T')[0];
        const turnoFound = fechas.find(turno => turno.fecha === formattedDate);

        if (turnoFound) {
            const fecha = turnoFound.fecha.split('-').reverse().join('/');
            ipcConnect.filterData('get-turno-filter', 'fecha', turnoFound.fecha).then(data => setPacientes(data.length))
            const horarioObtained = date.getDay() === 2 ? '09:00 a 11:00' : '17:00 a 19:30'            
            setHorario(horarioObtained)
            setDia(fecha);
        } else {
            const nextDate = addDay(date);
            return findTurnoByDate(fechas, nextDate);
        }
    }

    useEffect(() => {
        ipcConnect.get('get-turnos').then(data => findTurnoByDate(data))
    }, [])

    const stats = [
        {
            data: "Próximo día de atención",
            title: dia
        },
        {
            data: "Horario",
            title: horario
        },
        {
            data: "Cantidad de pacientes",
            title: pacientes
        },
    ]
    return (
        <section className="py-14 font-medium text-gray-600">

            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 gap-x-12 items-center justify-between lg:flex md:px-8">
                <div className="sm:hidden lg:block lg:max-w-xl">
                    <Login />
                </div>
                <div className="mt-6 gap-12 sm:mt-0 md:flex lg:block">
                    <div className="max-w-2xl">
                        <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            Clínica BioMED
                        </h3>
                        <p className="mt-3 max-w-xl">
                            Dermatología, Ginecología, Clínica y Laboratorios
                        </p>
                    </div>
                    <div className="flex-none mt-6 md:mt-0 lg:mt-6">
                        <ul className="inline-grid gap-y-8 gap-x-14 grid-cols-1">
                            {
                                stats.map((item, idx) => (
                                    <li key={idx} className="">
                                        <h4 className="text-2xl text-indigo-600 font-semibold">{item.data}</h4>
                                        <p className="mt-3 font-medium text-2xl">{item.title}</p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Homepage

