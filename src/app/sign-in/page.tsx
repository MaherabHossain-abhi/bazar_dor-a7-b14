'use client'
import GoogleBtn from '@/components/GoogleBtn';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';

import React from 'react';
import { toast } from 'react-toastify';

const SignInPage = () => {
    const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries()) as { email: string, password: string };

        const { data, error } = await authClient.signIn.email({
            ...user,
            callbackURL: '/'
        })

        if (data) {
            toast.success('সাইন ইন সফল হয়েছে');
        }
        if (error) {
            toast.error(error.message || error.statusText || 'সাইন ইন ব্যর্থ হয়েছে')
        }
    }
    return (
        <div className="flex items-center min-h-screen justify-center px-4 py-8 sm:py-12">
            <div className="w-full max-w-sm sm:max-w-md bg-base-100 sm:shadow-xl sm:rounded-2xl p-2 sm:p-6">
                <h2 className="text-2xl text-center text-green-600 font-bold">সাইন ইন
                </h2>
                <p className="text-sm font-semibold text-gray-500 text-center">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
                <form action="" onSubmit={onSubmit}>
                    <fieldset className="fieldset rounded-box w-full p-4">

                        <label className="label">ইমেইল</label>
                        <input name='email' type="email" className="input" placeholder="you@example.com" />

                        <label className="label">পাসওয়ার্ড</label>
                        <input name='password' type="password" className="input" placeholder="পাসওয়ার্ড" />

                        <button type='submit' className="btn bg-green-600 text-white mt-4">সাইন ইন করুন</button>
                    </fieldset>
                </form>
                <div className="flex flex-col justify-center">
                    <p className="text-sm text-center w-full my-2">অথবা</p>
                    <div className="">
                        <GoogleBtn />
                    </div>
                    <p className="text-sm font-semibold text-gray-500 my-1 text-center">অ্যাকাউন্ট আছে? <Link className="text-blue-600" href={'/sign-up'}>সাইন আপ করুন</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;