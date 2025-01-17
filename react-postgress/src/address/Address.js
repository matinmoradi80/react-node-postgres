import { Button, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import AddressForm from "./Form";

export default function Address() {
  const [address, setAddress] = useState();
  const [visible, setVisible] = useState(false);
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

  function createAddress(data) {
    fetch("http://localhost:3001/address", {
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
      <Button
        className="create-button"
        type="primary"
        onClick={() => setVisible(true)}
      >
        add address
      </Button>
      <Modal
        style={{
          top: 20,
        }}
        title="new address"
        width={576}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <AddressForm
          visible={visible}
          onSubmit={(data, resetForm) => {
            createAddress(data);
            resetForm();
            setVisible(false);
          }}
        />
      </Modal>
      <Table columns={columns} dataSource={address} />
    </div>
  );
}
