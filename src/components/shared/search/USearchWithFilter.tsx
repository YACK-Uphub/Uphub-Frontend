'use client'
import {MagnifyingGlassIcon, MapPinIcon} from '@heroicons/react/24/solid'
import {useMemo, useState} from "react";
import UButton from "@/components/shared/UButton";

export interface USearchWithFilterParams {
	searchKeyword: string
	dropdownItemId: string | number,
	extraSelectionIds: string[] | number[],
}

export interface UDropdownItem {
	id: string | number,
	name: string
}

export interface USearchWithFilterProps {
	dropdownData: UDropdownItem[]
	onSearchSubmit: (params: USearchWithFilterParams) => void
}

export default function USearchWithFilter({onSearchSubmit, dropdownData}: USearchWithFilterProps) {

	const [keyword, setKeyword] = useState<string>("");
	const [inputTextForSuggestion, setinputTextForSuggestion] = useState<string>("")
	const [selectedDropdownItemId, setSelectedDropdownItemId] = useState<string | number | null>(null)
	const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
	// const [extraSelectionIds, setExtraSelectionId] = useState<string | null>(null)

	/**
	 * Calculate the suggestion based on location input from user
	 */
	const filteredSuggestions: UDropdownItem[] = useMemo(() => {
		if (inputTextForSuggestion.length <= 0) return [];
		return dropdownData.filter(l => l.name.toLocaleLowerCase().includes(inputTextForSuggestion.toLowerCase()));
	}, [inputTextForSuggestion, dropdownData])

	/**
	 * Handle select dropdown item from a suggestion list
	 * @param dropdownItem
	 */
	const handleSelectedDropdownItemId = (dropdownItem: UDropdownItem): void => {
		if (location != null) {
			setinputTextForSuggestion(dropdownItem.name);
			setSelectedDropdownItemId(dropdownItem.id);
			setShowSuggestions(false);
		}
	}

	/**
	 * Handle typing location name
	 * @param dropdownItemName
	 */
	const handleInputTextForSuggestion = (dropdownItemName: string): void => {
		if (dropdownItemName != null) {
			setinputTextForSuggestion(dropdownItemName)	  // set typing on input text
			setShowSuggestions(true)											// show suggestion
			setSelectedDropdownItemId(null) 							// reset id when typing
		}
	}

	/**
	 * Handle submission on search and filter
	 */
	const handleSubmission = (): void => {
		onSearchSubmit({
			searchKeyword: keyword,
			dropdownItemId: selectedDropdownItemId,
			extraSelectionIds: [],
		});
	}

	return (
		<div
			className="flex max-w-5xl items-center gap-4 rounded-full px-2 py-1 shadow-xl bg-custom-white md:px-4 md:py-2 flex-wrap md:flex-nowrap">

			{/* Job Search Input - Shrinks */}
			<div className="flex items-center gap-2 flex-2 min-w-0">
				<MagnifyingGlassIcon className="h-5 w-5 text-custom-blue-3"/>
				<input
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
					type="text"
					placeholder="Công việc, kỹ năng, công ty..."
					className="flex-1 min-w-0 bg-transparent text-sm focus:outline-none"
				/>
			</div>

			{/* Divider */}
			<div className="h-6 w-px bg-custom-gray hidden md:block"/>

			{/* Location Input - Shrinks */}
			<div className="flex flex-col relative flex-1 min-w-0">
				<div className="flex items-center gap-2">
					<MapPinIcon className="h-5 w-5 text-custom-blue-3"/>
					<input
						type="text"
						placeholder="Khu vực"
						value={inputTextForSuggestion}
						onChange={(e) => handleInputTextForSuggestion(e.target.value)}
						className="flex-1 min-w-0 bg-transparent text-sm focus:outline-none"
					/>
				</div>

				{/* Suggestions Dropdown */}
				{showSuggestions && filteredSuggestions.length > 0 && (
					<ul
						className="absolute top-12 left-5 z-10 max-h-64 w-64 overflow-y-auto rounded-md border shadow-xl bg-custom-white border-custom-yellow-1">
						{filteredSuggestions.map(item => (
							<li
								key={item.id}
								className="cursor-pointer px-4 py-2 text-sm hover:bg-custom-blue-1"
								onClick={() => handleSelectedDropdownItemId(item)}
							>
								{item.name}
							</li>
						))}
					</ul>
				)}
			</div>

			{/* Divider */}
			<div className="h-6 w-px bg-custom-gray hidden md:block"/>

			{/* Extra Select */}
			<select className="cursor-pointer bg-transparent text-sm outline-none text-custom-gray">
				<option>Bộ lọc nâng cao</option>
				<option>Lương cao</option>
				<option>Part-time</option>
				<option>Remote</option>
			</select>

			{/* Search Button */}
			<UButton
				onClick={handleSubmission}
				label="Tìm Kiếm"
				textColor="text-custom-white"
				backgroundColor="bg-custom-blue-2"
				borderRadius="rounded-full"
			/>
		</div>

	)
}
