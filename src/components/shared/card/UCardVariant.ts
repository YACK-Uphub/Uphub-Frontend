export enum UCardVariant {
	Normal,
	LightBlue,
	Border,
	Yellow,
	Transparent,
}

export const getStyleCardVariant = (variant: UCardVariant): string => {
	switch (variant) {
		case UCardVariant.Transparent:
			return "bg-transparent";
		case UCardVariant.Border:
			return "bg-custom-white border border-custom-blue-2";
		case UCardVariant.LightBlue:
			return "bg-custom-blue-1/30";
		case UCardVariant.Normal:
			return "bg-custom-white";
		case UCardVariant.Yellow:
			return "bg-gradient-to-r from-yellow-100 via-yellow-130 to-yellow-200";
	}
}

