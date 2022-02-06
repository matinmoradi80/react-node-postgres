import { useEffect, useState } from "react";
import { Table } from "antd";

export default function Manager() {
  const [manager, setManager] = useState();
  useEffect(() => {
    getManger();
  }, []);

  function getManger() {
    fetch("http://localhost:3001/manager")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setManager(JSON.parse(data));
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
      title: "salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "workhour",
      dataIndex: "workhour",
      key: "workhour",
    },
    {
      title: "startDate",
      dataIndex: "startdate",
      key: "startdate",
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
      <Table columns={columns} dataSource={manager} />
    </div>
  );
}
