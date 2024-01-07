/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */

import PropTypes from 'prop-types';
const Search = ({ placeholder, handleSubmit }) => {
    
    return (
        <form onSubmit={handleSubmit}>
            <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium  sr-only">
                Search
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20">
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokLinejoin="round"
                            strokWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    type="search"
                    name="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder={placeholder}
                />
                <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 ">
                    Search
                </button>
            </div>
        </form>

    )
}

Search.PropTypes = {
    placeholder: PropTypes.string,
    handleSubmit: PropTypes.func
}

export default Search