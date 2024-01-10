/* eslint-disable react/prop-types */
import { Menu, Transition } from '@headlessui/react'
import { Fragment} from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function DropDown({ data = [], name, action = () => { } }) {
    return (
        <div className=" top-16 w-56 text-right">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md bg-green-600 px-4 py-3 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                        {name}
                        <ChevronDownIcon
                            className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            {data.map((item, i) => {
                                return (
                                    <Menu.Item key={i}>
                                        {({ active }) => (
                                            <button
                                                onClick={() => action(i)}
                                                className={`${active ? 'bg-green-500 text-white ' : 'text-gray-900'
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm `}
                                            >
                                                {item}
                                            </button>
                                        )}
                                    </Menu.Item>
                                )
                            })}

                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}
