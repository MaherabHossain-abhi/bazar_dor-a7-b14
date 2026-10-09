import Image from 'next/image';
import BannerImg from '@/assets/bazar-hero.png'

const BannerPage = () => {
    const date = new Date();
    return (
        <div className='flex justify-between max-w-6xl mx-auto items-start container px-2 py-1 rounded-2xl bg-white'>

            <div className="py-2 flex flex-col gap-4">
                <p className='w-fit text-sm bg-green-100 font-semibold text-green-700 p-2 rounded-3xl'>{date.toLocaleDateString("bn-BD", {
                        dateStyle: 'full'
                    })}
                </p>
                <h1 className="text-xl font-bold md:text-[26px]">
                    আজকের বাজারের দাম এক নজরে
                </h1>
                <p className=" font-semibold text-xs text-gray-500 sm:text-base">
                    চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
                    গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                </p>

                <button className='btn btn-success w-fit text-white'>সব পণ্য দেখুন</button>
            </div>


            <div className="w-[45%] flex justify-end items-center">
                <Image
                    src={BannerImg}
                    alt='Banner'
                    width={350}
                    height={350}
                    loading='eager'
                    className='w-80 h-auto'
                />
            </div>
        </div>
    );
};

export default BannerPage;