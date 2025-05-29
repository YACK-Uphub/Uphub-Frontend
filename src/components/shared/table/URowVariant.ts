import {ApplicationStatus} from "@/types/application";
import {JobStatus} from "@/types/job";

export enum URowVariant {
	Default,
	Selected,
}

export const getStyleRowVariant = (variant: URowVariant): string => {
	switch (variant) {
		case URowVariant.Default:
			return "bg-white border-b-2";
		case URowVariant.Selected:
			return "border border-custom-blue-2 rounded-lg";
	}
};

export const getStyleJobStatus = (jobStatus: JobStatus): { text: string; bg: string } => {
	switch (jobStatus) {
		case JobStatus.Open:
			return {
				text: "text-green-600",
				bg: "bg-green-600",
			};
		case JobStatus.Closed:
			return {
				text: "text-red-600",
				bg: "bg-red-600",
			};
		case JobStatus.Paused:
			return {
				text: "text-yellow-600",
				bg: "bg-yellow-600",
			};
		case JobStatus.Archived:
			return {
				text: "text-gray-600",
				bg: "bg-gray-600",
			};
		default:
			return {
				text: "text-gray-600",
				bg: "bg-gray-600",
			};
	}
};
export const getStyleApplicationStatus = (applicationStatus: ApplicationStatus): { text: string; bg: string } => {
	switch (applicationStatus) {
		case ApplicationStatus.Applied:
			return {
				text: "text-blue-600",
				bg: "bg-blue-100",
			};
		case ApplicationStatus.Scheduled:
			return {
				text: "text-orange-600",
				bg: "bg-orange-100",
			};
		case ApplicationStatus.Interviewed:
			return {
				text: "text-yellow-600",
				bg: "bg-yellow-100",
			};
		case ApplicationStatus.Hired:
			return {
				text: "text-green-600",
				bg: "bg-green-100",
			};
		case ApplicationStatus.Rejected:
			return {
				text: "text-red-600",
				bg: "bg-red-100",
			};
		default:
			return {
				text: "text-gray-600",
				bg: "bg-gray-100",
			};
	}
};
