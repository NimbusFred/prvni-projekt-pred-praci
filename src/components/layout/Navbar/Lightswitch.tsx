import { Fragment, useContext } from 'react';
import { ModeContext } from '../../../context/ThemeProvider';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

function Lightswitch() {
    const { theme, toggleTheme } = useContext(ModeContext);

    const themes = ['light', 'dark', 'red'];

    const handleClick = (selectedTheme: string) => {
        toggleTheme(selectedTheme);
    };

    return (
        <div className='Lightswitch'>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        Theme
                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {themes.map((t) => (
                                <Menu.Item key={t}>
                                    {({ active }) => (
                                        <a
                                            onClick={() => handleClick(t)}
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            {t.charAt(0).toUpperCase() + t.slice(1)} mode
                                        </a>
                                    )}
                                </Menu.Item>
                            ))}

                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}

export default Lightswitch;
