import {JobStatus} from "@/models";

export enum URowVariant {
	Default,
	Selected,
}

export const getStyleRowVariant = (variant: URowVariant): string => {
	switch (variant) {
		case URowVariant.Default:
			return 'bg-white border-2';
		case URowVariant.Selected:
			return 'border border-custom-blue-2'
	}
};

export const getStyleJobStatus = (jobStatus: JobStatus): { text: string; bg: string } => {
	switch (jobStatus) {
		case JobStatus.Open:
			return {
				text: 'text-green-600',
				bg: 'bg-green-600',
			};
		case JobStatus.Closed:
			return {
				text: 'text-red-600',
				bg: 'bg-red-600',
			};
		case JobStatus.Paused:
			return {
				text: 'text-yellow-600',
				bg: 'bg-yellow-600',
			};
		case JobStatus.Archived:
			return {
				text: 'text-gray-600',
				bg: 'bg-gray-600',
			};
		default:
			return {
				text: 'text-gray-600',
				bg: 'bg-gray-600',
			};
	}
};
