export enum CardVariant {
	Normal,
	LightBlue,
	Border,
	Yellow,
}

export const getVariantClass = (variant: CardVariant): string => {
	switch (variant) {
		case CardVariant.Border:
			return "bg-custom-white border border-custom-blue-2";
		case CardVariant.LightBlue:
			return "bg-custom-blue-1";
		case CardVariant.Normal:
			return "bg-custom-white";
		case CardVariant.Yellow:
			return "bg-[linear-gradient(270deg,rgba(255,255,255,0.99)_0%,rgba(247,246,243,0.79)_25%,rgba(237,234,228,0.82)_52%,rgba(255,215,94,0.27)_100%)]";
	}
}