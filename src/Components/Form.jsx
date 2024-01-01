
import { useRef } from 'react';
import ipcConnect from '../ipcConnect'


const Form = () => {
    const formRef = useRef(null)

    const registerUser = (formData) => {
        ipcConnect.createUser(formData)
            .then(response => {
                console.log('Usuario creado:', response);
                formRef.current.reset();
            })
            .catch(error => {
                console.error('Error al crear usuario:', error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData.entries());
        registerUser(userData)

    };

    return (
        <section classNameName="py-14 font-medium text-gray-600">
            <div classNameName="max-w-screen-xl mx-auto px-4 text-gray-600 gap-x-12 items-start justify-between lg:flex md:px-8">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-lg">
                        <h1 className="text-center text-2xl font-bold text-green-600 sm:text-3xl">Registro</h1>

                        <form onSubmit={handleSubmit} ref={formRef} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-xl sm:p-6 lg:p-8 bg-slate-200">
                            <p className="text-center text-lg font-medium">Sign up to your account</p>
                            <div className='bg-slate-100 rounded-md'>
                                <label for="username" className="sr-only">Username</label>

                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        placeholder="Enter username"
                                        name='username'
                                    />

                                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="h-4 w-4 text-gray-400"
                                        >
                                            <path
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>

                                    </span>
                                </div>
                            </div>
                            <div className='bg-slate-100 rounded-md'>
                                <label for="email" className="sr-only">Email</label>

                                <div className="relative">
                                    <input
                                        type="email"
                                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        placeholder="Enter email"
                                        name='email'
                                    />

                                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            <div className='bg-slate-100 rounded-md'>
                                <label for="password" className="sr-only">Password</label>

                                <div className="relative">
                                    <input
                                        type="password"
                                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        placeholder="Enter password"
                                        name='password'
                                    />

                                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="block w-full rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white"
                            >
                                Sign up
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Form

