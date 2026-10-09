import Image from 'next/image';
import logoImg from '@/assets/logo-icon.png';
import Link from 'next/link';
import NavLinks from './navlinks';
import UserInfoPage from './UserInfo';

const HeaderPage = () => {
    const date = new Date();



    return (
        <header className="bg-white">
            <div className='flex justify-between items-center py-3 max-w-6xl mx-auto container'>
                <Link href={'/'}>
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-2xl bg-green-700">
                            <Image
                                src={logoImg}
                                alt='logo'
                                width={30}
                                height={30}
                                loading='eager'
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className='text-[16px] font-extrabold'>বাজার দর</h1>
                            <p className='text-xs font-semibold text-gray-500'>{date.toLocaleDateString("bn-BD", {
                                dateStyle: 'full'
                            })}</p>
                        </div>
                    </div>
                </Link>

                {/* Sign up & sign in button  */}
                <UserInfoPage />

            </div>
            <NavLinks />
        </header>
    );
};

export default HeaderPage;