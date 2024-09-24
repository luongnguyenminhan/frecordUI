"use client";

import React, { useState, useEffect } from "react";
import { Button, Form, Input, notification, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Signin from "./Signin";
import { confirmEmail } from "@/apis/authenApi";
import { InputCustom } from "./ui/input";
import { ButtonCustom } from "./ui/button";

function ConfirmEmail({ email }: { email: string }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const onFinish = async (values: ConfirmEmailParams) => {
    setLoading(true);
    try {
      const updatedValues = { ...values, email: email };
      const response = await confirmEmail(updatedValues);
      setLoading(false);
      setShowLogin(true);
      console.log("response", response);
      notification.success({
        message: "Tạo tài khoản thành công",
        description: "Tài khoản đã được xác thực thành công",
        duration: 2,
      });
    } catch (error) {
      notification.error({
        message: "Xác thực Email không thành công",
        description: "Vui lòng kiểm tra lại mã xác thực",
        duration: 2,
      });
    }
  };

  return (
    <>
      {showLogin ? (
        <Signin />
      ) : (
        <>
          <div data-aos="fade-down">
            <h1 className="mb-5 text-center text-4xl font-bold text-[#ff7b29]">
              Xác thực Email
            </h1>
            <p className="mx-5 mb-5 mt-3 text-center text-sm text-[#a3a1a1] transition-all duration-500 lg:mx-10 lg:text-[15px]">
              Vui lòng nhập mã xác thực OTP đã được gửi đến email của bạn
            </p>
          </div>
          <Form
            name="normal_login"
            className="login-form"
            form={form}
            onFinish={onFinish}
          >
            <div data-aos="fade-right">
              <Form.Item
                name="otp"
                hasFeedback
                rules={[
                  {
                    min: 6,
                    message: "Vui lòng nhập OTP",
                  },
                  {
                    max: 6,
                    message: "Vui lòng nhập đúng OTP",
                  },
                ]}
                colon={true}
                labelCol={{ span: 24 }}
                className="formItem"
              >
                <InputCustom
                  placeholder="Mã xác thực OTP"
                  type="number"
                  className="hover:border-primary focus:border-primary"
                  autoFocus
                />
              </Form.Item>
            </div>
            <div data-aos="fade-left">
              <Form.Item>
                <ButtonCustom className="mx-auto mt-5 block h-11 w-full rounded-[5px] bg-primary text-lg tracking-wider text-white hover:bg-primary/80">
                  {loading ? (
                    <Spin
                      indicator={<LoadingOutlined className="text-[#fff]" />}
                    />
                  ) : (
                    "Xác thực"
                  )}
                </ButtonCustom>
              </Form.Item>
            </div>
          </Form>
        </>
      )}
    </>
  );
}

export default ConfirmEmail;
