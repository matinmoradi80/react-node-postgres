import { Button, Table } from "antd";
import { useEffect, useState } from "react";
export default function LoginInfo() {
  const [logininfo, setLoginInfo] = useState(false);

  useEffect(() => {
    getLoginInfo();
  }, []);

  function getLoginInfo() {
    fetch("http://localhost:3001/logininfo")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setLoginInfo(JSON.parse(data));
      });
  }

  function deleteUser(username) {
    fetch(`http://localhost:3001/logininfo/${username}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getLoginInfo();
      });
  }

  const columns = [
    {
      title: "username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "delete",
      key: "delete",
      render: (text, record) => (
        <Button onClick={() => deleteUser(record.username)}>delete</Button>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={logininfo} />
    </div>
  );
}
