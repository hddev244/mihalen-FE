"use client"
import AccountsTable from "@/components/admin/accounts/page";
import PageLogin from "@/components/admin/login/page";
import { Account } from "@/lib/object";
import { Localstorage } from "@/lib/store";
import { Card, CardBody, Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs } from "@nextui-org/react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

enum TabName {
  ACCOUNTS = "Accounts",
  ACCOUNT_DETAIL = "Account-detail",
  ROLES = "Roles"
}

function AccountsManagement() {

  var accountsData: Account[] = [];
  const [isLogged, setIsLogged] = useState(true);
  const [accounts, setAccounts] = useState(accountsData)
  const [pageIndex,setPageIndex] = useState(0);
  const [pageSize,setPageSize] = useState(5);
  const [selectedTab,setSelectedTab] = useState(TabName.ACCOUNTS)
  const colors = [
    "default",
    "primary",
    "secondary",
    "success",
    "warning",
    "danger"
  ];
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem(Localstorage.TOKEN);
      setIsLogged(!!storedToken);
      if (storedToken) { // Kiểm tra nếu token tồn tại trước khi gửi yêu cầu 
        const fetchData = async () => {
          try {
            const url = `http://localhost:8080/api/admin/accounts/pages?index=${pageIndex}&size=${pageSize}`
            const token = `Bearer ${storedToken}`;
            const response = await fetch(url, {
              method: "GET",
              headers: {
                "Authorization": token,
              }
            });
            const responseData = await response.json();
            const accs: Account[] = await responseData.content;
            setAccounts(accs);
            setPageIndex(responseData.number)
            setPageSize(responseData.size)
          } catch (error) {
            console.log(error)
          }
        };
        fetchData();
      }
    }
  }, [pageIndex,pageSize]);

  const pathname = usePathname();
  return isLogged ? (
    <>
      <h1 className="title">Accounts Management</h1>
      <div className="flex w-full flex-col">
        <Tabs selectedKey={pathname} color="primary" size="lg" aria-label="Tabs colors sizes selectedKey" >
          <Tab  key="/admin/accounts-manager" title={TabName.ACCOUNTS} href="/admin/accounts-manager">
            <Card>
              <Table  aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>NAME</TableColumn>
                  <TableColumn>ROLE</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                </TableHeader>
                <TableBody>
                  {   //rander row of account
                    accounts.map((account) => {
                      return (
                        <TableRow key={account.id}>
                          <TableCell>{account.username}</TableCell>
                          <TableCell>CEO</TableCell>
                          <TableCell>{account.locked ? "Active" : "Locked"}</TableCell>
                        </TableRow>
                      )
                    })
                  }
                </TableBody>
              </Table>
            </Card>
          </Tab>
          <Tab key="/admin/accounts-manager/roles" title={TabName.ROLES} href="/admin/accounts-manager/roles">
            <Card>
              <CardBody>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </CardBody>
            </Card>
          </Tab>
          <Tab key="/admin/accounts-manager/create-account" title={TabName.ACCOUNT_DETAIL} href="/admin/accounts-manager/create-account">
            <Card>
              <CardBody>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>

  ) : (<PageLogin />);
}

export default AccountsManagement