import React, { Component } from "react";

import {
  Button,
  Form,
  Icon,
  Radio,
  DatePicker,
  Card,
  Input,
  Row,
  Col,
  Modal
} from "antd";
const { TextArea } = Input;
const moment = require("moment");
function success() {
  Modal.success({
    content: 'registered ',
  });
}
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { formData: {} };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        values.type = this.props.user;
        let dob = moment(values.dob._d).format("YYYY-MM-DD");
        values.dob=dob;
        console.log("Received values of form: ", values);
        let rawResponse = await fetch("http://localhost:9000/register", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
        });
        console.log(rawResponse)
        let content = await rawResponse.json();
        console.log(JSON.stringify(content.registered));
        if(content.registered ===true){
         
          success();
          this.props.form.resetFields();
        
        }
      
      }
    });
  };

render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <section>
        <h1 className="is-size-1" style={{ color: "white" }}>
        </h1>
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-half is-offset-one-quarter">
                <Card bordered={false}>
                  <h1
                    className="is-size-2"
                    style={{ color: "black", textAlign: "center" }}
                  >
                    Register
                  </h1>
                  <Card style={{ width: "400px" }}>

                  <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                      {getFieldDecorator("user_type", {
                        rules: [
                          {
                            required: true,
                            message: "Please select a user_type!"
                          }
                        ]
                      })(
                        <Radio.Group>
                          <Radio.Button value="security">Security</Radio.Button>
                          <Radio.Button value="staff">Staff</Radio.Button>
                        </Radio.Group>
                      )}
                    </Form.Item>
                    <Form.Item label="USERNAME">
                      {getFieldDecorator("username", {
                        rules: [
                          {
                            required: true,
                            message: "Please enter your Username!"
                          }
                        ]
                      })(
                        <Input
                          prefix={
                            <Icon
                              type="user"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          placeholder="Username896"
                        />
                      )}
                    </Form.Item>
                    <Form.Item label="FIRST NAME">
                      {getFieldDecorator("fname", {
                        rules: [
                          {
                            required: true,
                            message: "Please enter your First name!"
                          }
                        ]
                      })(<Input placeholder="FirstName" />)}
                    </Form.Item>
                    <Form.Item label="LAST NAME">
                      {getFieldDecorator("lname", {
                        rules: [
                          {
                            required: false
                            //message: "Please enter your Last name!"
                          }
                        ]
                      })(<Input placeholder="LastName" />)}
                    </Form.Item>
                    
                    <Form.Item label="GENDER">
                      {getFieldDecorator("gender", {
                        rules: [
                          {
                            required: true,
                            message: "Please enter your Sex!"
                          }
                        ]
                      })(
                        <Radio.Group>
                          <Radio.Button value="m"> Male </Radio.Button>{" "}
                          <Radio.Button value="f"> Female </Radio.Button>{" "}
                          <Radio.Button value="o"> Others </Radio.Button>{" "}
                        </Radio.Group>
                      )}
                    </Form.Item>
                    <Form.Item label="DATE OF BIRTH">
                      {getFieldDecorator("dob", {
                        rules: [
                          {
                            required: true,
                            message: "Please enter your Date Of Birth!"
                          }
                        ]
                      })(
                        <DatePicker
                          onChange={function onChange(date, dateString) {
                            console.log(date, dateString);
                          }}
                        />
                      )}
                    </Form.Item>
                    <Form.Item label="ADDRESS">
                      {getFieldDecorator("address", {
                        rules: [
                          {
                            required: true,
                            message: "Please enter your Address!"
                          }
                        ]
                      })(
                        <TextArea prefix={<Icon type="home" />} rows={4} />
                      )}
                    </Form.Item>
                    <Form.Item label="PHONE">
                      {getFieldDecorator("phone", {
                        rules: [
                          {
                            required: true,
                            message: "Please enter your Phone Number!"
                          }
                        ]
                      })(
                        <Input
                          prefix={<Icon type="phone" />}
                          placeholder="1234587635"
                        />
                      )}
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="register-form-button"
                      >
                        Submit
                      </Button>
                    </Form.Item>
                    </Form>
                    </Card>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        <Modal
          visible = {this.state.showModal}>
          <p>you have registered successfully!</p>
        </Modal>
     
      </section>
    );
  }
}

const WrappedNormalRegisterForm = Form.create({ name: "login" })(Register);

export default WrappedNormalRegisterForm;
