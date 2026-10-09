'use client'
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import avaterImg from '@/assets/avater.jpg'

const UserInfoPage = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const closeMenu = () => (document.activeElement as HTMLElement | null)?.blur();
    const handleSignOut = async () => {
        await authClient.signOut();
        closeMenu();
    }
    return (
        <div>
            {user ?
                <>
                   <div className="dropdown dropdown-end">
      
      <div
        tabIndex={0}
        role="button"
        className="flex cursor-pointer items-center gap-2 rounded-full p-1 pr-3 transition hover:bg-gray-100"
      >
        <div className="avatar">
          <div className="w-10 rounded-full ring-2 ring-green-600 ring-offset-2 ring-offset-base-100">
            <Image
              alt={user?.name ?? 'User'}
              src={avaterImg}
              width={40}
              height={40}
              priority
            />
          </div>
        </div>
        <span className="hidden text-sm font-semibold sm:inline">{user?.name}</span>
        <span className="text-xs text-gray-500">▾</span>
      </div>

      
      <ul
        tabIndex={-1}
        className="dropdown-content menu z-50 mt-2 w-52 rounded-box bg-base-100 p-2 shadow-lg"
      >
        <li className="menu-title px-3 py-1 text-xs sm:hidden">{user?.name}</li>
        <li>
          <Link href="/profile" onClick={closeMenu}>👤 প্রোফাইল</Link>
        </li>
        <li>
          <Link href="/dashboard" onClick={closeMenu}>📊 ড্যাশবোর্ড</Link>
        </li>
        <li>
          <Link href="/settings" onClick={closeMenu}>⚙️ সেটিংস</Link>
        </li>
        <div className="divider my-0" />
        <li>
          <button onClick={handleSignOut} className="text-red-600">
            🚪 লগআউট
          </button>
        </li>
      </ul>
    </div>
                </> :
                <div className="flex gap-2 items-center ">
                    <Link href={'/sign-in'}><button className='btn btn-sm'>সাইন ইন</button></Link>
                    <Link href={'/sign-up'}> <button className='btn btn-sm bg-green-600 text-white'>সাইন আপ</button></Link>

                </div>
            }
        </div>
    );
};

export default UserInfoPage;