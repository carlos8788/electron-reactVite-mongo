import { Dialog, Transition } from '@headlessui/react'
import { Fragment, } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CrearDia({ open = true, closeModal }) {
    const toNavigate = useNavigate()

    const redirectTurnos = () => toNavigate('/turnos')

    return (
        <>
            <Transition appear show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Crear día de atención
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <form
                                            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-xl sm:p-6 lg:p-8 bg-slate-200 "
                                        >
                                            <div className="flex justify-center flex-col">
                                                <div className='flex gap-y-2 flex-col justify-between'>
                                                    <div className='bg-slate-100 rounded-md'>
                                                        <label htmlFor="intervalo" className="p-2">Intérvalo</label>

                                                        <div className="relative">
                                                            <select
                                                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                                                name='intervalo'
                                                            >
                                                                <option value="10">10 minutos</option>
                                                                <option value="15">15 minutos</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className='bg-slate-100 rounded-md'>
                                                        <label htmlFor="OrderNotes" className="p-2">Rango horario (inicio)</label>

                                                        <div className="relative">
                                                            <input
                                                                type="time"
                                                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                                                placeholder="Ingrese apellido"
                                                                name='hora_inicio'

                                                            />
                                                        </div>
                                                    </div>

                                                    <div className='bg-slate-100 rounded-md'>
                                                        <label htmlFor="OrderNotes" className="p-2">Rango horario (fin)</label>
                                                        <div className="relative">
                                                            <input
                                                                type="time"
                                                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                                                placeholder="Ingrese apellido"
                                                                name='hora_fin'
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
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-4 flex justify-between gap-4">
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center rounded-md border border-transparent bg-slate-100 px-4 py-2 text-sm font-medium text-red-500 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
                                                        onClick={closeModal}
                                                    >
                                                        Cerrar
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="inline-flex justify-center rounded-md border border-transparent bg-slate-100 px-4 py-2 text-sm font-medium text-green-500 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
                                                    >
                                                        Registrar día
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>


                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
