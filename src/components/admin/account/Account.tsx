import { Account } from "@/lib/object"
import { TableCell, TableRow, Tooltip } from "@nextui-org/react"
import { FaEdit, FaEye } from "react-icons/fa"
import { FaDeleteLeft } from "react-icons/fa6"

function AccountRole ({data}:{data:Account}) {
    return (
        <>
            {/* <TableRow key={data.id}>
                <TableCell>{data.username}</TableCell>
                <TableCell>{data.fullname}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>CEO</TableCell>
                <TableCell>{data.locked ? "Active" : "Locked"}</TableCell>
                <TableCell> <div className="relative flex items-center gap-2">
                    <Tooltip content="Details">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <FaEye />
                        </span>
                    </Tooltip>
                    <Tooltip content="Edit user">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <FaEdit />
                        </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete user">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <FaDeleteLeft />
                        </span>
                    </Tooltip>
                </div></TableCell>
            </TableRow> */}
        </>
    )
}
export default AccountRole