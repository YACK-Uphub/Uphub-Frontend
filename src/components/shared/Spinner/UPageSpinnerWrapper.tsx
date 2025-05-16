'use client'

import {usePathname} from 'next/navigation'
import {ReactNode, useEffect, useState} from 'react'
import {UPageSpinner} from "@/components/shared/Spinner/UPageSpinner";

export default function UPageSpinnerWrapper({children}: { children: ReactNode }) {
	const pathname = usePathname()
	const [loading, setLoading] = useState(false)

	/**
	 * Custom loading based on the pathname's changes
	 */
	useEffect(() => {
		setLoading(true)
		const timeout = setTimeout(() => setLoading(false), 600) // simulate minimal load delay
		return () => clearTimeout(timeout)
	}, [pathname])

	return (
		<>
			{loading && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
					<UPageSpinner size={56}/>
					<p className="ml-3 mt-2 text-lg text-custom-gray">Đang tải trang nè...</p>
				</div>
			)}
			{children}
		</>
	)
}
