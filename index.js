import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Input, Select, Button, Row, Col } from 'antd';

const { Option } = Select;
const MyForm = (props) => {
  const { form } = props;
  const [fields, setFields] = useState([]);
  const [idCounter, setIdCounter] = useState(0);

  const handleAddRow = () => {
    setIdCounter((prevCounter) => prevCounter + 1);

    const newRow = {
      id: idCounter, // 使用唯一的 ID 标识每行的表单项
    };

    setFields((prevFields) => [...prevFields, newRow]);
  };

  const handleRemoveRow = (rowIndex) => {
    setFields((prevFields) =>
      prevFields.filter((_, index) => index !== rowIndex)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Form values:', values);
      }
    });
  };

  const renderFieldsForRow = (rowIndex) => {
    const { getFieldDecorator } = form;
    const fieldId = fields[rowIndex].id;

    return (
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item>
            {getFieldDecorator(`input_${fieldId}`, {
              rules: [{ required: true, message: '请输入值' }],
            })(<Input />)}
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item>
            {getFieldDecorator(`select1_${fieldId}`, {
              rules: [{ required: true, message: '请选择值' }],
            })(
              <Select>
                <Option value="option1">Option 1</Option>
                <Option value="option2">Option 2</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item>
            {getFieldDecorator(`select2_${fieldId}`, {
              rules: [{ required: true, message: '请选择值' }],
            })(
              <Select>
                <Option value="option1">Option 1</Option>
                <Option value="option2">Option 2</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item>
            {getFieldDecorator(`select3_${fieldId}`, {
              rules: [{ required: true, message: '请选择值' }],
            })(
              <Select>
                <Option value="option1">Option 1</Option>
                <Option value="option2">Option 2</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item>
            {getFieldDecorator(`select4_${fieldId}`, {
              rules: [{ required: true, message: '请选择值' }],
            })(
              <Select>
                <Option value="option1">Option 1</Option>
                <Option value="option2">Option 2</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        {fields.length > 1 && (
          <Col span={2}>
            <Button onClick={() => handleRemoveRow(rowIndex)}>删除</Button>
          </Col>
        )}
      </Row>
    );
  };

  const renderRows = () => {
    return fields.map((_, index) => {
      console.log(`renderRows -- `, _, index);
      return <div key={index}>{renderFieldsForRow(index)}</div>;
    });
  };

  return (
    <Form form={form} onSubmit={handleSubmit}>
      {renderRows()}
      <Button onClick={handleAddRow}>添加行</Button>
      <Button type="primary" htmlType="submit">
        提交
      </Button>
    </Form>
  );
};

const WrappedMyForm = Form.create()(MyForm);

ReactDOM.render(<WrappedMyForm />, document.getElementById('container'));
