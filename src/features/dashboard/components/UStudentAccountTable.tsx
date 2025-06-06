"use client";
import {Button} from "@/components/shadcn/button";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/shadcn/table";
import {UPagination} from "@/components/shared/UPagination";
import {useAppDispatch} from "@/libs/rtk/hooks";
import {useGetAllStudentsQuery} from "@/services/studentsApi";
import {SearchPaginatedRequestParams} from "@/types/baseModel";

export function UStudentAccountTable() {
  const params: SearchPaginatedRequestParams = { pageNumber: 1, pageSize: 10 };
  const { data: students, isLoading } = useGetAllStudentsQuery(params);
  const dispatch = useAppDispatch();

  const handlePageChange = (newPage: number) => {
    //dispatch(setPageIndex(newPage));
  };

  if (isLoading) return;

  if (!students?.data) return <div>There is no student accounts</div>;

  return (
    <div>
      <Table>
        <TableCaption>Danh sách tài khoản sinh viên</TableCaption>
        <TableHeader>
          <TableRow className="bg-custom-yellow-3">
            <TableHead className="w-[100px] ">ID</TableHead>
            <TableHead className="w-[180px] ">Họ và Tên</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Số điện thoại</TableHead>
            <TableHead>Trường</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.data.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.code}</TableCell>
              <TableCell>
                {student.firstName} {student.lastName}
              </TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.phoneNumber}</TableCell>
              <TableCell>{student.school}</TableCell>
              <TableCell>
                <span className="rounded-full px-2 py-1 text-sm bg-green-100 text-green-600">Active</span>
              </TableCell>
              <TableCell>
                <Button className="bg-custom-blue-1 text-custom-blue-2 hover:bg-custom-blue-1 cursor-pointer">
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
        totalPages={Math.ceil(students.count / students.pageSize)}
        onPageChanged={handlePageChange}
        className="mt-5"
      />
    </div>
  );
}
