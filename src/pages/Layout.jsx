/* eslint-disable react/prop-types */
import { Sidebar } from '../Components/Sidebar';

const Layout = ({ children }) => {
    return (
        <>
            <div className="flex items-center justify-center h-screen bg-gray-300">
                <div className="grid grid-cols-1 sm:grid-cols-6">
                    <Sidebar />
                    <main className="m-4 col-span-5 sm:col-span-5 px-8 bg-white rounded-xl flex justify-center items-center ">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
};

export default Layout;