import { Account } from "@/lib/object";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import type { NextPage } from "next";

function AccountsTable({ values, }: { values: Account[]; }) {
    return (
        <>
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>ROLE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                </TableHeader>
                <TableBody>
                    
                    {   //rander row of account
                        values.map((account) => {
                            return (
                                <TableRow key={account.id}>
                                    <TableCell>{account.username}</TableCell>
                                    <TableCell>CEO</TableCell>
                                    <TableCell>{account.locked ? "Active":"Locked"}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </>
    );
}

export default AccountsTable