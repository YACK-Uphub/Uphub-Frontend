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
 * Format date into 02:34 AM
 * @param date
 */
export const formatDateToTime = (date: Date | string | number): string => {
	const time = new Date(date).toLocaleTimeString([], {
		hour: '2-digit', minute: '2-digit'
	})

	return time;
}

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


export function formatAIMessageToHTML(message: string, role: string): string {
	if (!message) return "";

	let parsed = message.trim();

	// Step 0: Fix malformed duplicated URLs like: url(url
	parsed = parsed.replace(/(https?:\/\/[^\s(]+)\(\1\)/g, "$1");

	// Step 1: Remove markdown bold
	parsed = parsed.replace(/\*\*(.*?)\*\*/g, "$1");

	// Step 2: Replace job links with styled "Tại Đây"
	parsed = parsed.replace(
		/https?:\/\/[^\s\]]*\/jobs\/(\d+)/g,
		(_, jobId) => `<a href="/${role}/jobs/${jobId}" target="_blank" rel="noopener noreferrer" style="color: #2454b6; text-decoration: none; font-weight: 500; padding: 2px 6px; background-color: #ffd147; border-radius: 20%; border: 1px solid #2454b6">Tại Đây</a>`
	);

	// Step 3: Replace company links with styled "Tại Đây"
	parsed = parsed.replace(
		/https?:\/\/[^\s\]]*\/companies\/(\d+)/g,
		(_, companyId) => `<a href="/${role}/companies/${companyId}" target="_blank" rel="noopener noreferrer" style="color: #2454b6; text-decoration: none; font-weight: 500; padding: 2px 6px; background-color: #ffd147; border-radius: 20%; border: 1px solid #2454b6">Tại Đây</a>`
	);

	// Step 4: Remove leftover markdown-style links [text](url)
	parsed = parsed.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

	// Step 5: Cleanup artifacts
	parsed = parsed
	.replace(/[\[\]]/g, "")
	.replace(/\*/g, "");

	// Step 6: Format line breaks
	parsed = parsed.replace(/\n+/g, "<br><br>");

	return parsed;
}







