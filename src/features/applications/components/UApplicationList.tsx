"use client"

import * as React from 'react';
import {useSearchApplicationsQuery} from "@/services/applicationsApi";
import {useAppDispatch, useAppSelector} from "@/libs/rtk/hooks";
import UCardApplication from "@/components/shared/card/UCardApplication";
import {formatDate} from "@/utils/helpers";
import {UCardVariant} from "@/components/shared/card/UCardVariant";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/shadcn/pagination";
import {setPageIndex} from "@/features/applications/slices/applicationSlice";
import {UPageSpinner} from "@/components/shared/spinner/UPageSpinner";

export const UApplicationList = () => {

	const searchParams = useAppSelector(state => state.applications);
	const {data, isLoading, isFetching} = useSearchApplicationsQuery({...searchParams});
	const dispatch = useAppDispatch();

	if (isLoading || isFetching) {
		return <UPageSpinner></UPageSpinner>
	}

	return (
		<>
			{/* List */}
			<h1>Tổng đơn ứng tuyển ({data.totalCount})</h1>
			<div className="
						grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8"
			>

				{data?.results?.length > 0 &&
					data.results.map((item, index) => (
						<UCardApplication
							key={index}
							avatarUrl={item.imageUrl}
							name={item.fullName}
							role={item.jobTitle}
							experience={"7"}
							education={"Đại học"}
							submittedDate={formatDate(item.createdAt)}
							variant={UCardVariant.Normal}
						/>
					))}
			</div>

			{/* Pagination */}
			{data?.totalCount > 1 && (
				<Pagination className={"pt-10"}>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								onClick={() => {
									if (searchParams.pageNumber > 1) {
										dispatch(setPageIndex(searchParams.pageNumber - 1));
									}
								}}
								className={searchParams.pageNumber === 1 ? "pointer-events-none opacity-50" : ""}
							/>
						</PaginationItem>

						{Array.from({length: data.pageCount}).map((_, index) => (
							<PaginationItem key={index}>
								<PaginationLink

									isActive={searchParams.pageNumber === index + 1}
									onClick={() => dispatch(setPageIndex(index + 1))}
								>
									{index + 1}
								</PaginationLink>
							</PaginationItem>
						))}

						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>

						<PaginationItem>
							<PaginationNext
								onClick={() => {
									if (searchParams.pageNumber < data.pageCount) {
										dispatch(setPageIndex(searchParams.pageNumber + 1));
									}
								}}
								className={searchParams.pageNumber === data.pageCount ? "pointer-events-none opacity-50" : ""}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			)}
		</>
	);
};