'use client'
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import avaterImg from '@/assets/avater.jpg'
import React from 'react';

const ProfilePage = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleSignOut = async () => {
        await authClient.signOut();
    }

    const handleSaveChange = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries()) as { name: string };

        const { data } = await authClient.updateUser({
            ...user,
        })
        console.log(data);
    }
    return (
        <div className="max-w-6xl mx-auto container">
            <div className='max-w-xl mx-auto'>
                <h1 className='text-xl font-bold text-center sm:text-left'>আমার প্রোফাইল</h1>
                <p className='text-sm text-gray-500'>আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

                <div className="bg-white py-2 px-4 rounded-xl w-full mt-5">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <Image
                                alt={user?.name ?? 'User'}
                                src={avaterImg}
                                width={30}
                                height={30}
                                priority
                            />
                            <div className="flex flex-col gap-1">
                                <h2 className="font-bold">{user?.name}</h2>
                                <p className='text-sm'>প্রতি {user?.email}</p>
                            </div>
                        </div>
                        <button onClick={handleSignOut} className="text-green-600 cursor-pointer ">
                            ↩ সাইন আউট
                        </button>
                    </div>
                </div>

                <div className="bg-white py-6 px-4 rounded-xl w-full mt-5">
                    <h1 className='text-xl font-bold'>তথ্য</h1>
                    <form onSubmit={handleSaveChange}>
                        <fieldset className="fieldset rounded-box w-md p-4">

                            <label className="label">নাম</label>
                            <input name='name' type="name" className="input w-md" placeholder="Name" />
                            <button type='submit' className="btn bg-green-700 text-white mt-4">আপডেট</button>
                        </fieldset>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;