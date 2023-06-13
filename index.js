import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Input, Select, Button, Row, Col } from 'antd';

const { Option } = Select;

const newRow = {
  id: 1, // 使用唯一的 ID 标识每行的表单项
};
class MyForm extends React.Component {
  state = {
    fields: [], // 存储每行的表单项
  };

  handleAddRow = () => {
    const { fields } = this.state;

    this.setState((prevState) => ({
      fields: [...prevState.fields, { id: newRow.id++ }],
    }));
  };

  handleRemoveRow = (rowIndex) => {
    this.setState((prevState) => ({
      fields: prevState.fields.filter((_, index) => index !== rowIndex),
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Form values:', values);
      }
    });
  };

  renderFieldsForRow = (rowIndex) => {
    const { getFieldDecorator } = this.props.form;
    const { fields } = this.state;

    console.log(`fields -- `, fields);

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
            <Button onClick={() => this.handleRemoveRow(rowIndex)}>删除</Button>
          </Col>
        )}
      </Row>
    );
  };

  renderRows = () => {
    const { fields } = this.state;

    return fields.map((_, index) => (
      <div key={index}>{this.renderFieldsForRow(index)}</div>
    ));
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderRows()}
        <Button onClick={this.handleAddRow}>添加行</Button>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form>
    );
  }
}

const WrappedMyForm = Form.create()(MyForm);

ReactDOM.render(<WrappedMyForm />, document.getElementById('container'));
