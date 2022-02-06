import { useEffect, useState } from "react";
import { Button, Table, Modal } from "antd";
import ClientAddressForm from "./Form";

export default function ClientAddress() {
  const [clientAddress, setClientAddress] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getClientAddress();
  }, []);

  function getClientAddress() {
    fetch("http://localhost:3001/clientaddress")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setClientAddress(JSON.parse(data));
      });
  }

  function deleteClientAddress(postalcode, nationalcode) {
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
  }

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
    },
  ];

  return (
    <div>
      <Button
        className="create-button"
        type="primary"
        onClick={() => setVisible(true)}
      >
        add client address
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
        <ClientAddressForm
          visible={visible}
          onSubmit={(data, resetForm) => {
            createAddress(data);
            resetForm();
            setVisible(false);
          }}
        />
      </Modal>
      <Table columns={columns} dataSource={clientAddress} />
    </div>
  );
}
