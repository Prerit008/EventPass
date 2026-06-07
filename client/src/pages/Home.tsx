import { useState, useEffect, useRef } from 'react';

export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const lastFocusedElementRef = useRef(null);

    const openMenu = () => {
        lastFocusedElementRef.current = document.activeElement;
        setIsMenuOpen(true);

        // Move focus into menu after state update
        setTimeout(() => {
            menuRef.current?.focus();
        }, 0);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);

        // Restore focus after state update
        setTimeout(() => {
            lastFocusedElementRef.current?.focus();
        }, 0);
    };

    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMenu();
            }
        };

        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isMenuOpen]);

    return (
        <>
            {/* navbar */}
            <nav
                className="flex py-2 px-4 md:px-8 border-b border-slate-200 min-h-[68px] relative z-20"
                aria-label="Main navigation"
            >
                <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-6 w-full">
                    <a
                        href="#"
                        className="min-w-9 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                    >
                        <span className="sr-only">Your Company</span>
                        <img
                            src="https://readymadeui.com/logo-alt.svg"
                            alt="readymadeui logo"
                            className="h-9 w-auto"
                        />
                    </a>

                    <div
                        id="collapseMenu"
                        ref={menuRef}
                        tabIndex={-1}
                        className={`${isMenuOpen ? "block" : "hidden"} lg:block max-lg:bg-white max-lg:border-l max-lg:border-slate-300 max-lg:w-1/2 max-lg:fixed max-lg:top-0 max-lg:right-0 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto max-sm:w-full z-50 outline-none`}
                    >
                        <div className="py-2 px-4 flex justify-between items-center border-b border-slate-300 sticky top-0 bg-white lg:hidden max-lg:min-h-[68px]">
                            <a
                                href="#"
                                className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                            >
                                <span className="sr-only">Your Company</span>
                                <img
                                    src="https://readymadeui.com/logo-alt.svg"
                                    alt="readymadeui logo dialog"
                                    className="h-9 w-auto"
                                />
                            </a>
                            <button type="button" aria-controls="collapseMenu"
                                onClick={closeMenu}
                                id="toggleClose"
                                className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                            >
                                <span className="sr-only">Close main menu</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-4 fill-slate-900"
                                    aria-hidden="true"
                                    viewBox="0 0 329.269 329"
                                >
                                    <path
                                        d="M194.8 164.77 323.013 36.555c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0L164.633 134.605 36.422 6.391c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.215L6.259 292.984c-8.344 8.34-8.344 21.825 0 30.164a21.27 21.27 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.214 128.216 128.214a21.27 21.27 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164zm0 0"
                                        data-original="#000000"
                                    />
                                </svg>
                            </button>
                        </div>

                        <ul className="flex flex-col gap-8 font-semibold text-sm text-slate-900 lg:flex-row max-lg:p-6 lg:ml-12">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                                    aria-current="page"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                                >
                                    Features
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                                >
                                    How it works
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                                >
                                    Integrations
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                                >
                                    FAQs
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="flex items-center gap-4 ml-auto">
                        <a
                            href="#"
                            className="text-slate-900 text-sm font-semibold hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                        >
                            Log in
                        </a>
                        <a
                            href="#"
                            className="py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        >
                            Sign up
                        </a>

                        <button
                            type="button"
                            aria-controls="collapseMenu"
                            aria-expanded={isMenuOpen}
                            aria-haspopup="true"
                            id="toggleOpen"
                            onClick={openMenu}
                            className="cursor-pointer lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="size-7 fill-slate-900"
                                aria-hidden="true"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* hero section */}
            <section className="px-4 mt-12 md:mt-16 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 justify-center items-center gap-x-12 gap-y-16">
                        <div>
                            <div className="max-w-3xl mx-auto text-center lg:mx-0 lg:text-left">
                                <p className="mb-2 font-medium text-blue-700 text-sm uppercase"><span
                                    className="rotate-90 inline-block mr-2">|</span> app that help your business grow</p>
                                <h1 className="text-4xl text-slate-900 font-bold !leading-tight mb-6 md:text-5xl">Simple
                                    Solutions for Complex Problems</h1>
                                <p className="text-slate-600 text-lg leading-relaxed">Our intuitive platform streamlines
                                    every aspect of your business operations.
                                    Effortlessly manage projects, track inventory, and automate workflows, Connect meaningfully with
                                    customers through.</p>

                                <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                                    <a href="#"
                                        className="py-2.5 px-4 text-sm rounded-md font-semibold text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                                        Get Started Free
                                    </a>
                                    <a href="#"
                                        className="py-2.5 px-4 text-slate-900 text-sm font-semibold rounded-md bg-white border border-slate-300 transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                                        Integrations
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center flex-wrap max-lg:justify-center gap-4 mt-8">
                                <div className="flex -space-x-2">
                                    <img className="w-10 h-10 rounded-full border-2 border-white" src="https://readymadeui.com/team-1.webp"
                                        alt="team img-1" />
                                    <img className="w-10 h-10 rounded-full border-2 border-white" src="https://readymadeui.com/team-2.webp"
                                        alt="team img-2" />
                                    <img className="w-10 h-10 rounded-full border-2 border-white" src="https://readymadeui.com/team-3.webp"
                                        alt="team img-3" />
                                </div>
                                <div className="text-slate-600 text-base">
                                    <span className="font-semibold">Over 10,000</span> Professionals trust us
                                </div>
                            </div>
                        </div>

                        <div className="w-full aspect-[42/33]">
                            <img src="https://readymadeui.com/images/mobile-app-img-5.webp" alt="hero image"
                                className="w-full h-full object-contain" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}