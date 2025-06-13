export const storage = {

	/**
	 * Read a value stored widthin the local storage
	 * @param key
	 */
	get<T>(key: string): T | null {
		try {
			const json = localStorage.getItem(key);
			return json ? (JSON.parse(json) as T) as T : null

		} catch {
			console.error(`storage.et: could not parse JSON for key "${key}"`)
		}
	},

	/**
	 * Write a JSON-serializable value
	 * @param key
	 * @param value
	 */
	set<T>(key: string, value: T): void {
		try {
			localStorage.setItem(key, JSON.stringify(value))
		} catch {
			console.warn(`storage.set: could not save key "${key}"`)
		}
	},

	/**
	 * Remove all value under the key
	 * @param key
	 */
	remove(key: string): void {
		try {
			localStorage.removeItem(key)
		} catch {
			console.warn(`storage.remove: could not remove key "${key}"`)
		}
	},

	/**
	 * Clear all value under the local storage
	 */
	clear(): void {
		try {
			localStorage.clear()
		} catch {
			console.warn(`storage.clear: could not clear localStorage`)
		}
	}
}
