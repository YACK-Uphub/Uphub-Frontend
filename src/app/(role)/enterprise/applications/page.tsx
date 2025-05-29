import React from 'react';
import type {Metadata} from 'next';
import UButton from "@/components/shared/UButton";
import BriefcaseIcon from '@heroicons/react/24/outline/BriefcaseIcon';
import {UBusinessApplicationList} from "@/features/application/components/UBusinessApplicationList";

export const metadata: Metadata = {
	title: "Applications",
	description: "Manage internship applications for your company on UpHub",
};

const ApplicationsPage = () => {

	// ======= WILL CHANGE WHEN USING AUTH =====
	const companyUser = "FPT Software";

	return (
		<div>
			{/* Header */}
			<section className={"border-b-2 py-4 px-12 xl:px-0"}>
				<div className={"mx-auto max-w-7xl"}>
					<div className={"flex items-center justify-between"}>
						<div className={"flex gap-2"}>
							<BriefcaseIcon height={24} width={24} className={"text-custom-blue-2"}></BriefcaseIcon>
							<h1 className={"text-shadow-md"}>{companyUser}</h1>
						</div>

						<UButton
							label={"Đăng tuyển việc làm"}
							backgroundColor={"bg-custom-white"}
							textColor={"text-custom-blue-2"}
							borderRadius={"rounded-sm"}
							border={"border border-2 border-custom-blue-2"}
							onClick={null}/>
					</div>
				</div>
			</section>

			{/* Filter Area */}
			<section className={"py-16 px-12 xl:px-0"}>
				<div className={"mx-auto max-w-7xl flex justify-between items-center"}>
					<h2 className={"font-bold text-xl"}>Các đơn ứng tuyển</h2>
					<div className={"flex gap-4"}>
						<UButton
							label={"Lọc thông minh"}
							backgroundColor={"bg-custom-yellow-3"}
							textColor={"text-custom-blue-3"}
							borderRadius={"rounded-sx"}
							border={"border shadow-1xl"}
							onClick={null}/>
						<UButton
							label={"Sắp xếp"}
							backgroundColor={"bg-custom-blue-3"}
							textColor={"text-custom-white"}
							borderRadius={"rounded-sx"}
							border={"border"}
							onClick={null}/>
					</div>
				</div>
			</section>

			{/* Application List */}
			<section className={"mx-auto max-w-7xl"}>
				<div className={"p-10 bg-custom-gray/15"}>
					<UBusinessApplicationList></UBusinessApplicationList>
				</div>
			</section>

		</div>
	);
};

export default ApplicationsPage;