import Login from './Login'

const Homepage = () => {
    const stats = [
        {
            data: "Consultorios",
            title: "5"
        },
        {
            data: "Horario",
            title: "8:00 a 19:00"
        },
        {
            data: "Días",
            title: "Lunes a Sábados"
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
                            Clínica BioMED
                        </h3>
                        <p className="mt-3 max-w-xl">
                            Dermatología, Ginecología, Clínica y Laboratorios
                        </p>
                    </div>
                    <div className="flex-none mt-6 md:mt-0 lg:mt-6">
                        <ul className="inline-grid gap-y-8 gap-x-14 grid-cols-2">
                            {
                                stats.map((item, idx) => (
                                    <li key={idx} className="">
                                        <h4 className="text-3xl text-indigo-600 font-semibold">{item.data}</h4>
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

