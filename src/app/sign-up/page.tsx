'use client'

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const SignUpPage = () => {
    const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries()) as {
            name: string;
            email: string;
            password: string;
            confirmPassword: string;
        };

        if (user.password !== user.confirmPassword) {
            toast.error('পাসওয়ার্ড মিলছে না');
            return;
        }

        const { data, error } = await authClient.signUp.email({
            ...user,
            callbackURL: '/'
        });

        if (data) {
            toast.success('সাইন আপ সফল হয়েছে');
            redirect('/');
        }

        if (error) {
            toast.error(error.message || error.statusText || 'সাইন আপ ব্যর্থ হয়েছে')
        }
    }
    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-md">
                <h2 className="text-2xl text-center text-green-600 font-extrabold">অ্যাকাউন্ট তৈরি করুন</h2>
                <p className="text-sm font-semibold text-gray-500 text-center">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
                <form action="" onSubmit={onSubmit}>
                    <fieldset className="fieldset rounded-box w-md p-4">
                        <label className="label">নাম</label>
                        <input name="name" type="name" className="input w-md" placeholder="Name" />

                        <label className="label">ইমেইল</label>
                        <input name="email" type="email" className="input w-md" placeholder="Email" />

                        <label className="label">পাসওয়ার্ড</label>
                        <input name="password" type="password" className="input w-md" placeholder="Password" required autoComplete="new-password" />

                        <label className="label">পাসওয়ার্ড নিশ্চিত করুন</label>
                        <input name="confirmPassword" type="password" className="input w-md" placeholder="Confirm Password" required autoComplete="new-password" />

                        <button type="submit" className="btn bg-green-700 text-white mt-4">সাইন আপ করুন</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};
export default SignUpPage;