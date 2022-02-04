import { Button, Table } from "antd";
import { useEffect, useState } from "react";

export default function Address() {
  const [address, setAddress] = useState();
  useEffect(() => {
    getAddress();
  }, []);

  function getAddress() {
    fetch("http://localhost:3001/address")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setAddress(JSON.parse(data));
      });
  }

  function deleteAddress(postalcode) {
    fetch(`http://localhost:3001/address/${postalcode}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getAddress();
      });
  }

  const columns = [
    {
      title: "postalcode",
      dataIndex: "postalcode",
      key: "postalcode",
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
    {
      title: "delete",
      key: "delete",
      render: (text, record) => (
        <Button onClick={() => deleteAddress(record.postalcode)}>delete</Button>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={address} />
    </div>
  );
}
