"use client";
import { Button } from "@/components/shadcn/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/table";
import UButton from "@/components/shared/UButton";
import { UPagination } from "@/components/shared/UPagination";
import { useAppDispatch } from "@/libs/rtk/hooks";
import { useGetAllStudentsQuery } from "@/services/studentsApi";
import { SearchPaginatedRequestParams } from "@/types/baseModel";

const invoices = [
  {
    invoice: "INV00111111",
    paymentStatus: "Paidddddddddddd",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

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
