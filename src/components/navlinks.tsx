import Link from 'next/link';

interface INavLink {
    id: string
    slug: string
    nameBn: string
    icon: string
}


const NavLinks = async () => {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories");
    const category: INavLink[] = await res.json();

    return (
        <div className='flex gap-5 items-center mt-6'>
            {category.map(n => {
                return (
                    <div key={n.id} className="flex items-center gap-1">
                        <p className='text-sm font-bold'>{n.icon}</p>
                        <Link className='text-sm font-bold' href={n.slug}>{n.nameBn}</Link>
                    </div>
                )
            })}
        </div>
    );
};

export default NavLinks;