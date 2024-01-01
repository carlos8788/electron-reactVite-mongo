import React from 'react'
import Login from './Login'

const Homepage = () => {
    const stats = [
        {
            data: "35K",
            title: "Horas"
        },
        {
            data: "10K+",
            title: "Videos"
        },
        {
            data: "40+",
            title: "Clases"
        },

    ]
    return (
        <section className="py-14 font-medium text-gray-600">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 gap-x-12 items-start justify-between lg:flex md:px-8">
                <div className="sm:hidden lg:block lg:max-w-xl">
                    <Login/>
                </div>
                <div className="mt-6 gap-12 sm:mt-0 md:flex lg:block">
                    <div className="max-w-2xl">
                        <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            Cursos de programación
                        </h3>
                        <p className="mt-3 max-w-xl">
                            Cursos de Python, JavaScrip, PHP y Java
                        </p>
                    </div>
                    <div className="flex-none mt-6 md:mt-0 lg:mt-6">
                        <ul className="inline-grid gap-y-8 gap-x-14 grid-cols-2">
                            {
                                stats.map((item, idx) => (
                                    <li key={idx} className="">
                                        <h4 className="text-4xl text-indigo-600 font-semibold">{item.data}</h4>
                                        <p className="mt-3 font-medium">{item.title}</p>
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

