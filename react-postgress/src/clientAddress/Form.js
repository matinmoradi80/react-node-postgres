import { Form, Row, Col, Input, Button } from "antd";

export default function ClientAddressForm({
  onSubmit,
  initialValues,
  visible,
}) {
  const [form] = Form.useForm();

  const onFinish = (data) => {
    console.log(data);
    onSubmit(data, form.resetFields);
  };
  return (
    <Form
      form={form}
      layout="vertical"
      hideRequiredMark={true}
      name="new_clientaddress"
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="postalcode" name="postalcode">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="nationalcode" name="nationalcode">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8} offset={16}>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              send
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}