import { useEffect, useState } from "react";
import { Button, Table, Modal } from "antd";
import CategoryForm from "./Form";

export default function ProductCategory() {
  const [category, setCategory] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  function getCategory() {
    fetch("http://localhost:3001/productcategory")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setCategory(JSON.parse(data));
      });
  }

  function deleteCategory(name) {
    fetch(`http://localhost:3001/productcategory/${name}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getCategory();
      });
  }

  function createCategory(data) {
    fetch("http://localhost:3001/productcategory", {
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
        getCategory();
      });
  }

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "photourl",
      dataIndex: "photourl",
      key: "photourl",
    },
    {
      title: "delete",
      key: "delete",
      render: (text, record) => (
        <Button onClick={() => deleteCategory(record.name)}>delete</Button>
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
        add product category
      </Button>
      <Modal
        style={{
          top: 20,
        }}
        title="new product category"
        width={576}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <CategoryForm
          visible={visible}
          onSubmit={(data, resetForm) => {
            createCategory(data);
            resetForm();
            setVisible(false);
          }}
        />
      </Modal>
      <Table columns={columns} dataSource={category} />
    </div>
  );
}
