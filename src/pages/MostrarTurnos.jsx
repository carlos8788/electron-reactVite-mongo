import { useEffect, useState } from "react";
import ipcConnect from "../api/ipcIndex";
import { today } from "../helpers/today";
import { splitStr } from "../helpers/splitStr";

const MostrarTurnos = () => {
    const [turnos, setTurnos] = useState([])
    useEffect(() => {
        ipcConnect.filterData('get-turno-filter', 'fecha', today).then(result => {
            setTurnos(result.sort((a, b) => a.hora.localeCompare(b.hora)))

        })
    }, []);
    return (
      <div className="fixed inset-0 z-50 bg-slate-200 ">
        <h2 className="text-center mt-5 font-bold text-xl">Turnos {today.split('-').reverse().join('/')}</h2>
        <div className="mt-2 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto  text-left">
                    <thead className="bg-blue-200 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-4 text-center">Paciente</th>
                            <th className="py-3 px-4 text-center">Obra Social</th>
                            <th className="py-3 px-4 text-center">Hora</th>
                            <th className="py-3 text-center">Comentario</th>
                            <th className="py-3 "></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-900 divide-y">
                        {
                            turnos
                                .sort((a, b) => a.hora.localeCompare(b.hora))
                                .map((item, idx) => (
                                    <tr key={idx} className={idx % 2 === 0 ? `bg-slate-100 text-pink-600` : ''}>
                                        <td className="px-4 py-1 whitespace-nowrap font-medium">                                            
                                            {splitStr(item.paciente?.nombre)} - {splitStr(item.paciente?.apellido)}
                                        </td>
                                        <td className="py-1 whitespace-nowrap text-center">
                                            {item.paciente?.obraSocial?.nombre.substring(0, 10)}{item.obraSocial?.nombre.substring(0, 10).length >= 10 ? '...' : ''}
                                            {/* {item.paciente?.telefono} */}
                                        </td>
                                        <td className="px-4 py-1 whitespace-nowrap text-center">{item.hora}</td>
                                        <td className="px-4 py-1 whitespace-nowrap text-center">{item.diagnostico}</td>


                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
      </div>
    );
  };
  

export default MostrarTurnos;
