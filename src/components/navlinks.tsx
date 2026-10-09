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
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories");
    if (!res.ok) notFound();
    const category: INavLink[] = await res.json();

    return (
        <nav className="mt-6 -mx-4 px-4 md:mx-0 md:px-0">
            <ul className="flex flex-col sm:flex-row items-center gap-2 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible ">
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
        </nav>
    );
};

export default NavLinks;