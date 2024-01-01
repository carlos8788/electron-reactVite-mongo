import React from 'react'

const Homepage = () => {
    const stats = [
        {
            data: "35K",
            title: "Lorem"
        },
        {
            data: "10K+",
            title: "Lorem"
        },
        {
            data: "40+",
            title: "Lorem"
        },
        {
            data: "30M+",
            title: "Lorem "
        },
    ]
    return (
        <section className="py-14 font-medium text-gray-600">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 gap-x-12 items-start justify-between lg:flex md:px-8">
                <div className="sm:hidden lg:block lg:max-w-xl">
                    <img src="https://logos-download.com/wp-content/uploads/2016/09/Node_logo_NodeJS.png" className="rounded-lg" alt="" />
                </div>
                <div className="mt-6 gap-12 sm:mt-0 md:flex lg:block">
                    <div className="max-w-2xl">
                        <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            Lorem, ipsum dolor.
                        </h3>
                        <p className="mt-3 max-w-xl">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis sollicitudin quam ut tincidunt.
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

