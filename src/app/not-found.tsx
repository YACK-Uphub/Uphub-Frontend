'use client';

import React from 'react';
import {useRouter} from 'next/navigation';
import type {Metadata} from 'next';
import UButton from "@/components/shared/UButton";

export const metadata: Metadata = {
	title: "Not Found",
	description: "The page you are looking for does not exist",
};

const NotFoundPage = () => {

	const router = useRouter();
	const goBackToHomePage = () => router.push('/');

	return (
		<div className="h-full flex flex-col items-center justify-center bg-custom-white px-4">
			<h1 className="text-4xl font-bold text-custom mb-4 text-custom-blue-3">
				404 | Trang không tồn tại
			</h1>
			<p className="text-custom-black mb-6">
				Trang bạn tìm kiếm không tồn tại hoặc đã bị xóa.
			</p>
			<div className="flex gap-4">
				<UButton
					onClick={goBackToHomePage}
					label={"Quay trở lại trang chủ"}
					backgroundColor={"bg-custom-blue-3"}
				/>
			</div>
		</div>
	);
};

export default NotFoundPage;
