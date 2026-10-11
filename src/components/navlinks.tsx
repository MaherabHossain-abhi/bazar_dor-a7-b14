import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface INavLink {
    id: string
    slug: string
    nameBn: string
    icon: string
}


const NavLinks = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");
    if (!res.ok) notFound();
    const category: INavLink[] = await res.json();

    return (
        <nav className="max-w-6xl mx-auto px-4">
            <ul className="hidden sm:flex flex-col sm:flex-row items-center gap-2 pb-2 md:flex-wrap ">
                {category.map((n) => (
                    <li key={n.id} className="">
                        <Link
                            href={`/category/${n.slug}`}
                            className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 transition hover:border-green-300 hover:bg-green-50 hover:text-green-700"
                        >
                            <span>{n.icon}</span>
                            <span>{n.nameBn}</span>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost sm:hidden">
                        <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {category.map((n) => (
                            <li key={n.id} className="">
                                <Link
                                    href={`/category/${n.slug}`}
                                    className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 transition hover:border-green-300 hover:bg-green-50 hover:text-green-700"
                                >
                                    <span>{n.icon}</span>
                                    <span>{n.nameBn}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavLinks;