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
		<div className="bg-custom-white shadow-2xl rounded-full p-2 px-4 flex items-center gap-4 w-full max-w-5xl mx-auto">

			{/* Job Search Input */}
			<div className="flex items-center gap-2 flex-1">
				<MagnifyingGlassIcon className="text-custom-blue-3 w-5 h-5"/>
				<input
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
					type="text"
					placeholder="Công việc, kỹ năng, công ty..."
					className="w-full focus:outline-none text-sm bg-transparent"
				/>
			</div>

			{/* Divider */}
			<div className="h-6 w-px bg-custom-gray"/>

			{/* Location Input */}
			<div className={"flex flex-col relative"}>
				<div className="flex items-center gap-2">
					<MapPinIcon className="text-custom-blue-3 w-5 h-5"/>
					<input
						type="text"
						placeholder="Khu vực"
						value={inputTextForSuggestion}
						onChange={(e) => handleInputTextForSuggestion(e.target.value)}
						className="focus:outline-none text-sm bg-transparent w-28"
					/>
				</div>

				{/* Suggestion on Location Input */}
				{showSuggestions && filteredSuggestions.length > 0 && (
					<ul
						className="absolute top-12 left-5 z-10 bg-custom-white shadow-xl rounded-md w-64 max-h-64 overflow-y-auto border border-custom-yellow-1">
						{filteredSuggestions.map(item => (
							<li
								key={item.id}
								className="px-4 py-2 text-sm hover:bg-custom-blue-1 cursor-pointer"
								onClick={() => handleSelectedDropdownItemId(item)}
							>
								{item.name}
							</li>
						))}
					</ul>
				)}
			</div>

			{/* Divider */}
			<div className="h-6 w-px bg-custom-gray"/>

			{/* Extra Id Selection */}
			<select className="text-sm bg-transparent outline-none text-custom-gray cursor-pointer">
				<option>Bộ lọc nâng cao</option>
				<option>Lương cao</option>
				<option>Part-time</option>
				<option>Remote</option>
			</select>

			{/* Search Button */}
			<UButton
				onClick={handleSubmission}
				label={"Tìm Kiếm"}
				textColor={"text-custom-white"}
				backgroundColor={"bg-custom-blue-2"}
				borderRadius={"rounded-full"}>
			</UButton>
		</div>
	)
}
