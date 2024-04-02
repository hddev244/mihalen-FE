import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import type { NextPage } from "next";

const CategoryTable: NextPage = () => {
  return (
    <>
  
    {/* <div className="flex flex-col gap-5 p-4">
        <Pagination
            total={totalPages}
            color="secondary"
            page={currentPage}
            onChange={setCurrentPage} />
        <div className="flex gap-2">
            <Button
                size="sm"
                variant="flat"
                color="secondary"
                onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
            >
                Previous
            </Button>
            <Button
                size="sm"
                variant="flat"
                color="secondary"
                onPress={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
            >
                Next
            </Button>
        </div>
    </div> */}
</>
  )
}

export default CategoryTable