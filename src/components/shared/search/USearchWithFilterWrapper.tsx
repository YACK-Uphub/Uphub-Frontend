'use client'

import {useCallback} from 'react'
import USearchWithFilter, {UDropdownItem, USearchWithFilterParams,} from './USearchWithFilter'

export default function USearchWithFilterWrapper({dropdownData}: { dropdownData: UDropdownItem[] }) {

	const onSearchSubmit = useCallback((params: USearchWithFilterParams) => {
		console.log('Search params:', params)

		//! [TODO] Trigger RTK Query here
	}, [])

	return (
		<USearchWithFilter
			onSearchSubmitAction={onSearchSubmit}
			dropdownData={dropdownData}
		/>
	)
}
