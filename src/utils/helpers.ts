/**
 * A function to convert number into VND currency
 * @param value
 */
export const formatCurrnency = (value: number) => {
	return new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
	}).format(value);
};

/**
 * Format into 15 thang 5, 2015
 * @param date
 * @param locale
 */
export const formatDate = (date: Date | string, locale = "vi-VN") => {
	return new Intl.DateTimeFormat(locale, {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(new Date(date));
};

/**
 * Retun a string having captilized at the first letter
 * @param text
 */
export const formatCapitilizeFirstLetter = (text: string) => {
	if (!text) return "";
	return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Writing a debounce function to stop user clicking too much
 * @param func
 * @param delay
 */
export const debounce = <T extends (...args: never[]) => void>(
	func: T,
	delay: number = 1000
): ((...args: Parameters<T>) => void) => {
	let timeoutId: ReturnType<typeof setTimeout>;

	// return the same args taking from the func
	return (...args: Parameters<T>) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => func(...args), delay);
	};
};

export function formatNewLine(text: string): string[] {
	return text.split("\n");
}
