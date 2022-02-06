import { useEffect, useState } from "react";
import { Table } from "antd";

export default function ClientUser() {
  const [clientUser, setClientUser] = useState();
  useEffect(() => {
    getClientUser();
  }, []);

  function getClientUser() {
    fetch("http://localhost:3001/clientuser")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setClientUser(JSON.parse(data));
      });
  }

  /*   function deleteClientAddress(postalcode, nationalcode) {
    fetch(`http://localhost:3001/clientaddress/${postalcode}/${nationalcode}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getClientAddress();
      });
  }

  function createAddress(data) {
    fetch("http://localhost:3001/clientaddress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getClientAddress();
      });
  } */

  const columns = [
    {
      title: "nationalcode",
      dataIndex: "nationalcode",
      key: "nationalcode",
    },
    {
      title: "firstname",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "lastname",
      dataIndex: "lastname",
      key: "lastname",
    },

    {
      title: "wallet",
      dataIndex: "wallet",
      key: "wallet",
    },
    {
      title: "username",
      dataIndex: "username",
      key: "username",
    },

    /*     {
      title: "delete",
      key: "delete",
      render: (text, record) => (
        <Button
          onClick={() =>
            deleteClientAddress(record.postalcode, record.nationalcode)
          }
        >
          delete
        </Button>
      ),
    }, */
  ];

  return (
    <div>
      <Table columns={columns} dataSource={clientUser} />
    </div>
  );
}
