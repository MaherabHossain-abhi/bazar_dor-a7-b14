'use client';

import { useSyncExternalStore } from 'react';
import Image from 'next/image';
import logoImg from '@/assets/logo-icon.png';
import Link from 'next/link';
import NavLinks from './navlinks';
import MaruquePage from './marque';

const emptySubscribe = () => () => {};

const HeaderPage = () => {
  const formattedDate = useSyncExternalStore(
    emptySubscribe,
    () => new Date().toLocaleDateString('bn-BD', { dateStyle: 'full' }),
    () => ''
  );

  return (
    <header className="max-w-6xl mx-auto container">
      <div className="flex justify-between items-center py-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-2xl bg-green-700">
            <Image
              src={logoImg}
              alt="logo"
              width={30}
              height={30}
              loading="eager"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-[16px] font-extrabold">বাজার দর</h1>
            <p className="text-xs font-semibold text-gray-500">
              {formattedDate}
            </p>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <Link href={'/sign-in'}>
            <button className="btn btn-sm">সাইন ইন</button>
          </Link>
          <Link href={'/sign-up'}>
            <button className="btn btn-sm bg-green-600 text-white">
              সাইন আপ
            </button>
          </Link>
        </div>
      </div>
      <nav>
        <NavLinks />
      </nav>
      <div>
        <MaruquePage />
      </div>
    </header>
  );
};

export default HeaderPage;