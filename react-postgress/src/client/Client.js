import { useEffect, useState } from "react";
import { Button, Table, Modal } from "antd";
import ClientForm from "./Form";

export default function Client() {
  const [client, setClient] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getClient();
  }, []);

  function getClient() {
    fetch("http://localhost:3001/client")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setClient(JSON.parse(data));
      });
  }

  function deleteClient(nationalcode) {
    fetch(`http://localhost:3001/client/${nationalcode}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getClient();
      });
  }

  function createClient(data) {
    fetch("http://localhost:3001/client", {
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
        getClient();
      });
  }

  const columns = [
    {
      title: "nationalcode",
      dataIndex: "nationalcode",
      key: "nationalcode",
    },
    {
      title: "wallet",
      dataIndex: "wallet",
      key: "wallet",
    },
    {
      title: "delete",
      key: "delete",
      render: (text, record) => (
        <Button onClick={() => deleteClient(record.nationalcode)}>
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
        add client
      </Button>
      <Modal
        style={{
          top: 20,
        }}
        title="new client"
        width={576}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <ClientForm
          visible={visible}
          onSubmit={(data, resetForm) => {
            createClient(data);
            resetForm();
            setVisible(false);
          }}
        />
      </Modal>
      <Table columns={columns} dataSource={client} />
    </div>
  );
}
