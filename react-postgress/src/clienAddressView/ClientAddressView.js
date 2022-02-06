import { useEffect, useState } from "react";
import { Table } from "antd";

export default function ClientAddressView() {
  const [clientAddress, setClientAddress] = useState();
  useEffect(() => {
    getClientAddress();
  }, []);

  function getClientAddress() {
    fetch("http://localhost:3001/clientaddressview")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setClientAddress(JSON.parse(data));
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
      title: "postalcode",
      dataIndex: "postalcode",
      key: "postalcode",
    },
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
      title: "state",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "city",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "street",
      dataIndex: "street",
      key: "street",
    },
    {
      title: "vallay",
      dataIndex: "vallay",
      key: "vallay",
    },
    {
      title: "plate",
      dataIndex: "plate",
      key: "plate",
    },
    {
      title: "floor",
      dataIndex: "floor",
      key: "floor",
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
      <Table columns={columns} dataSource={clientAddress} />
    </div>
  );
}
