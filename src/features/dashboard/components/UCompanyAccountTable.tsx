"use client";
import {Button} from "@/components/shadcn/button";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/shadcn/table";
import {UPagination} from "@/components/shared/UPagination";
import {useSearchCompaniesQuery} from "@/services/companiesApi";
import {SearchPaginatedRequestParams} from "@/types/baseModel";

export function UcompanyAccountTable() {
  const params: SearchPaginatedRequestParams = {pageNumber: 1, pageSize: 10};
  const {data: companies, isLoading} = useSearchCompaniesQuery(params);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePageChange = (newPage: number) => {
    //dispatch(setPageIndex(newPage));
  };

  if (isLoading) return;

  if (!companies?.results) return <div>There is no company accounts</div>;

  return (
      <div>
        <Table>
          <TableCaption>Danh sách tài khoản doanh nghiệp</TableCaption>
          <TableHeader>
            <TableRow className="bg-custom-yellow-3">
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead className="w-[180px]">Tên công ty</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Số điện thoại</TableHead>
              <TableHead>Loại hình doanh nghiệp</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.results.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">{company.id}</TableCell>
                  <TableCell>{company.companyName}</TableCell>
                  <TableCell>{company.email}</TableCell>
                  <TableCell>{company.phoneNumber}</TableCell>
                  <TableCell>{company.businessType}</TableCell>
                  <TableCell>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-sm text-green-600">Active</span>
                  </TableCell>
                  <TableCell>
                    <Button className="cursor-pointer bg-custom-blue-1 text-custom-blue-2 hover:bg-custom-blue-1">
                      Chi tiết
                    </Button>
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <UPagination
            currentPage={Number(params.pageNumber)}
            totalPages={companies.pageCount}
            onPageChanged={handlePageChange}
            className="mt-5"
        />
      </div>
  );
}
