"use client"
import Message from "@/components/Common/alert-message";
import AccountInfo from "@/components/admin/account/AccountForm";
import AccountTable from "@/components/admin/account/AccountTable";
import RolesTable from "@/components/admin/account/RolesTable";
import PageLogin from "@/components/admin/login/page";
import { Account } from "@/lib/object";
import { Localstorage } from "@/lib/store";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";

enum TabName {
  ACCOUNTS = "Accounts",
  ACCOUNT_DETAIL = "Create Account",
  ROLES = "Roles"
}

function AccountsManagement() {

  const [isLogged, setIsLogged] = useState(true);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem(Localstorage.TOKEN);
      setIsLogged(!!storedToken);
      if (storedToken) { // Kiểm tra nếu token tồn tại trước khi gửi yêu cầu 
        const fetchData = async () => {
        }
      }
    }
  }, []);

  return isLogged ? (
    <>
   
      <div className="flex flex-col ">
        <h1 className="title">Accounts Management</h1>
        <Tabs
          color="primary"
          size="lg"
          aria-label="Tabs colors sizes selectedKey"
          className=""
        >
          <Tab
            key={TabName.ACCOUNTS}
            title={TabName.ACCOUNTS}>
            <AccountTable ></AccountTable>
          </Tab>
          <Tab key={TabName.ROLES} title={TabName.ROLES} >
            <Card>
              <CardBody>
                <RolesTable></RolesTable>
              </CardBody>
            </Card>
          </Tab>
          <Tab key={TabName.ACCOUNT_DETAIL} title={TabName.ACCOUNT_DETAIL} >
            <Card>
              <CardBody>
                <AccountInfo username="" />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>

  ) : (<PageLogin />);
}

export default AccountsManagement