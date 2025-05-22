import UButton from "@/components/shared/UButton";
import ChevronDoubleRightIcon from "@heroicons/react/24/solid/ChevronDoubleRightIcon";

interface UBecomeMemberCardProps {
	onClickSignup: () => void;
	isMemberSignup: boolean;
}

export default function UBecomeMemberCard({onClickSignup, isMemberSignup = true}: UBecomeMemberCardProps) {

	return (
		<div
			className={`${
				isMemberSignup
					? "bg-custom-white text-custom-black"
					: "bg-custom-blue-2 text-custom-white"
			} text-custom-black p-6 rounded-xl w-full h-full flex flex-col gap-6 shadow`}
		>
			{/* Header */}
			<h2 className="h-1/4 text-2xl font-semibold">
				{isMemberSignup
					? "Trở Thành Ứng viên"
					: "Trở Thành Nhà Tuyển Dụng"}
			</h2>

			{/* Paragraph */}
			<p className="flex-1 opacity-80">
				{isMemberSignup
					? "Đăng ký ngay để tìm kiếm cơ hội việc làm phù hợp với bạn."
					: "Đăng ký ngay để tìm kiếm và tuyển dụng nhân tài cho doanh nghiệp của bạn."}
			</p>

			{/* Button */}
			<div className={"self-end"}>
				<UButton
					onClick={onClickSignup}
					label={"Đăng Kí Ngay"}
					iconPosition={"right"}
					textColor={"text-custom-blue-3"}
					backgroundColor={"bg-custom-white"}
					border={"border border-custom-blue-3"}
					icon={<ChevronDoubleRightIcon className="h-6 w-6 text-custom-blue-3"/>}
				/>
			</div>
		</div>
	)
}