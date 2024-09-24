"use client";

import React, { useState } from "react";
import { Button, Form, Input, Spin, notification } from "antd";
import { UserOutlined, LoadingOutlined } from "@ant-design/icons";
import Signin from "./Signin";
import { InputCustom } from "./ui/input";
import { ButtonCustom } from "./ui/button";
import { forgetPassword } from "@/apis/authenApi";

interface IProps {
  isShowRegister: boolean;
  setIsShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgotPasswordForm: React.FC<IProps> = ({
  isShowRegister,
  setIsShowRegister,
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: string) => {
    setLoading(true);
    alert("RÁNG ĐỢI");
    try {
      const response = await forgetPassword(values);
      setLoading(false);
      console.log("response", response);
    } catch (error) {
      notification.error({
        message: "Xác thực Email không thành công",
        description: "Vui lòng kiểm tra lại",
        duration: 2,
      });
    }
  };

  return (
    <>
      {!isShowRegister ? (
        <>
          <div data-aos="fade-down">
            <h1 className="mb-5 text-center text-4xl font-bold text-[#ff7b29]">
              Quên mật khẩu
            </h1>
          </div>
          <Form
            name="forgot_password"
            className="login-form"
            form={form}
            onFinish={onFinish}
          >
            <div data-aos="fade-right">
              <Form.Item
                name="Email"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email",
                  },
                  {
                    type: "email",
                    message: "Email không hợp lệ",
                  },
                ]}
                colon={true}
                labelCol={{ span: 24 }}
                className="formItem"
              >
                <InputCustom
                  placeholder="Email"
                  type="text"
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
          <div data-aos="fade-up">
            <div className="mt-5 text-center text-sm">
              <span className="text-black">Bạn đã nhớ lại mật khẩu? </span>
              <a
                href="#"
                className="font-semibold text-[#ff7b29] hover:underline"
                onClick={() => setIsShowRegister(true)}
              >
                Đăng nhập
              </a>
            </div>
          </div>
        </>
      ) : (
        <Signin />
      )}
    </>
  );
};

export default ForgotPasswordForm;
