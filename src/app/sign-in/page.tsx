'use client';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

const SignInPage = () => {
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries()) as {
            email: string;
            password: string;
        };

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
            callbackURL: '/',
        });

        if (data) {
            toast.success('সাইন ইন সফল হয়েছে');
            router.push('/');
            router.refresh();
        }

        if (error) {
            toast.error(error.message || error.statusText || 'সাইন ইন ব্যর্থ হয়েছে');
        }
    };

    return (
        <div className="flex flex-col max-w-xl mx-auto justify-center mt-15">
            <h2 className="text-2xl text-center text-red-600 font-bold">সাইন ইন</h2>
            <form onSubmit={onSubmit}>
                <fieldset className="fieldset rounded-box w-md p-4">
                    <label className="label">ইমেইল</label>
                    <input
                        name="email"
                        type="email"
                        className="input w-md"
                        placeholder="Email"
                        required
                    />

                    <label className="label">পাসওয়ার্ড</label>
                    <input
                        name="password"
                        type="password"
                        className="input w-md"
                        placeholder="Password"
                        required
                        autoComplete="current-password"
                    />

                    <button type="submit" className="btn bg-red-700 text-white mt-4">
                        সাইন ইন করুন
                    </button>
                </fieldset>
            </form>
        </div>
    );
};

export default SignInPage;