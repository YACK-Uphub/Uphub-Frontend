// utils/navConfig.ts
import {UserRole} from "@/types/user";

export const navRoutes: Record<UserRole, { name: string; path: string }[]> = {
	[UserRole.UniversityManager]: [
		{name: 'Quản lý học sinh', path: '/school/students'},
		{name: 'Quản lý thực tập sinh', path: '/school/internships'},
		{name: 'Quản lý công ty', path: '/school/companies'},
		{name: 'Quản lý chương trình', path: '/school/internship-programs'},
		{name: 'Thống kê', path: '/school/dashboard'},
	],
	[UserRole.Student]: [
		{name: 'Công việc', path: '/student/jobs'},
		{name: 'Nhà tuyển dụng', path: '/student/companies'},
		{name: 'Thống kê', path: '/student/dashboard/applications'},
	],
	[UserRole.Admin]: [
		{name: 'Danh sách tài khoản', path: '/admin/accounts/students'},
		{name: 'Quản lý gói sản phẩm', path: '/admin/plans'},
		{name: 'Quản lý giao dịch', path: '/admin/transactions'},
		{name: 'Thống kê', path: '/admin/statistics'},
		{name: 'Cài đặt', path: '/admin/settings'},
	],
	[UserRole.Company]: [
		{name: 'Tìm thực tập sinh', path: '/enterprise/candidates'},
		{name: 'Đăng tuyển việc làm', path: '/enterprise/job-posting'},
		{name: 'Đơn ứng tuyển', path: '/enterprise/applications'},
		{name: 'Lịch hẹn ứng viên', path: '/enterprise/schedule'},
	],
	[UserRole.Guest]: [
		{name: 'Trang chủ', path: '/'},
		{name: 'Về chúng tôi', path: '/about-us'},
		{name: 'Liên hệ', path: '/contact-us'},
		{name: 'TESTING', path: '/test'},
	],
};
