"use client";

import React, { useState, useEffect} from "react";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Spin, notification } from "antd";
import Signin from "./Signin";
import Link from "next/link";
import ForgotPasswordForm from "./ForgotPassword";
import { signUp } from "@/apis/authenApi";
import { motion } from "framer-motion";
import { ButtonCustom } from "./ui/button";
import ConfirmEmail from "./ConfirmEmail";
import Image from "next/image";
import { InputCustom } from "./ui/input";

interface IProps {
  isShowRegister: boolean;
  setIsShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SignupFormParams {
  email: string;
  username: string;
  password: string;
  confirm_password: string;
  device_address: string;
  role_id: number;
}

const Signup: React.FC<IProps> = ({ isShowRegister, setIsShowRegister }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [, setValues] = useState<SignupFormParams>({
    email: "",
    username: "",
    password: "",
    confirm_password: "",
    device_address: "",
    role_id: 1,
  });
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isNeedConfirmEmail, setIsNeedConfirmEmail] = useState<boolean>(false);
  const [tempEmail, setTempEmail] = useState<string>("");
  const [form] = Form.useForm();

  const validatePassword = (): Promise<void> => {
    const password = form.getFieldValue("password");
    if (!/\d/.test(password)) {
      return Promise.reject(new Error("Mật khẩu phải có ít nhất một số"));
    }
    if (!/[A-Z]/.test(password)) {
      return Promise.reject(
        new Error("Mật khẩu phải có ít nhất một kí tự in hoa"),
      );
    }
    if (!/[a-z]/.test(password)) {
      return Promise.reject(
        new Error("Mật khẩu phải có ít nhất một kí tự thường"),
      );
    }
    if (!/[!@#$%^&*()\-_=+[\]{}|;:,.<>?\/]/.test(password)) {
      return Promise.reject(
        new Error("Mật khẩu phải có ít nhất một kí đặc biệt"),
      );
    }
    return Promise.resolve();
  };

  const validateConfirmPassword = (): Promise<void> => {
    const password = form.getFieldValue("password");
    const confirmPassword = form.getFieldValue("confirm_password");
    if (password !== confirmPassword) {
      return Promise.reject(new Error("Mật khẩu không khớp"));
    }
    return Promise.resolve();
  };

  const togglePassword = (): void => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = (): void => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onFinish = async (values: SignupFormParams) => {
    const clientIp = await getClientIp();
    const updatedValues = {
      ...values,
      device_address: clientIp,
      role_id: 1,
    };
    setValues(updatedValues);
    handleSignUp(updatedValues);
  };

  const getClientIp = async (): Promise<string> => {
    const res = await fetch(`https://geolocation-db.com/json/`);
    const data = await res.json();
    return data.IPv4;
  };

  const handleSignUp = async (formValues: SignupFormParams) => {
    alert("RÁNG ĐỢI");
    if (isSigningUp) {
      return;
    }
    try {
      const res = await signUp(formValues);
      setIsSigningUp(true);
      setIsNeedConfirmEmail(true);
      setTempEmail(formValues.email);
      if (res && res.status === 201) {
        setIsSigningUp(false);
        notification.success({
          message: "Tạo tài khoản thành công",
          description: "Tài khoản đã được tạo. Vui lòng kiểm tra email",
          duration: 2,
        });
      }
    } catch (err) {
      console.error("err", err);
      setIsSigningUp(false);
    }
  };
  
  useEffect(() => {
    console.log("isShowRegister changed:", isShowRegister);
  }, [isShowRegister]);
  
  useEffect(() => {
    console.log("isNeedConfirmEmail changed:", isNeedConfirmEmail);
  }, [isNeedConfirmEmail]);
  return (
    <>
      {isNeedConfirmEmail ? (
        <ConfirmEmail email={tempEmail} />
      ) : isShowRegister ? (
        <>
          <div className="">
            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-center text-[27px] font-bold text-primary transition-all duration-500 lg:text-3xl">
                CHÀO MỪNG
              </h1>
              <p className="mx-5 mb-5 mt-3 text-center text-sm text-[#a3a1a1] transition-all duration-500 lg:mx-10 lg:text-[15px]">
                Bản ghi cuộc họp chi tiết cụ thể với{" "}
                <span>
                  <Link
                    href="/"
                    className="group relative cursor-pointer font-bold text-primary"
                  >
                    FRECORD
                    <span className="absolute bottom-[-3px] left-0 h-0.5 w-full scale-x-0 transform bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                  <span>.</span>
                </span>{" "}
                Bắt đầu ngay.
              </p>
            </motion.div>
            <Form
              name="normal_login"
              className="login-form"
              form={form}
              onFinish={onFinish}
            >
              <motion.div
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-9"
              >
                <Form.Item
                  name="email"
                  hasFeedback
                  rules={[
                    { required: true, message: "Vui lòng nhập email" },
                    { type: "email", message: "Vui lòng nhập đúng kiểu email" },
                  ]}
                  colon={true}
                  labelCol={{ span: 24 }}
                  className="formItem"
                >
                  <InputCustom
                    placeholder="Email"
                    type="email"
                    className="hover:border-primary focus:border-primary"
                  />
                </Form.Item>
              </motion.div>
              <motion.div
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-9"
              >
                <Form.Item
                  name="username"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên tài khoản của bạn",
                    },
                  ]}
                  colon={true}
                  labelCol={{ span: 24 }}
                  className="formItem"
                >
                  <InputCustom
                    placeholder="Username"
                    type="text"
                    className="hover:border-primary focus:border-primary"
                  />
                </Form.Item>
              </motion.div>
              <motion.div
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu" },
                    { min: 8, message: "Mật khẩu phải có ít nhất 8 kí tự" },
                    { max: 20, message: "Mật khẩu tối đa 20 kí tự" },
                    { validator: validatePassword },
                  ]}
                  labelCol={{ span: 24 }}
                  className="formItem"
                  hasFeedback
                >
                  <InputCustom
                    placeholder="Mật khẩu"
                    type="password"
                    className="hover:border-primary focus:border-primary"
                  />
                </Form.Item>
              </motion.div>
              <motion.div
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-9"
              >
                <Form.Item
                  name="confirm_password"
                  rules={[
                    { required: true, message: "Vui lòng xác nhận mật khẩu" },
                    { min: 8, message: "Mật khẩu phải có ít nhất 8 kí tự" },
                    { max: 20, message: "Mật khẩu tối đa 20 kí tự" },
                    { validator: validateConfirmPassword },
                  ]}
                  labelCol={{ span: 24 }}
                  className="formItem"
                  hasFeedback
                >
                  <InputCustom
                    placeholder="Xác nhận mật khẩu"
                    type="password"
                    className="hover:border-primary focus:border-primary"
                  />
                </Form.Item>
              </motion.div>
              <Form.Item>
                <motion.div
                  initial={{ x: -50 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 1 }}
                >
                  <ButtonCustom className="mx-auto mt-5 block h-11 w-full rounded-[5px] bg-primary text-lg tracking-wider text-white hover:bg-primary/80">
                    {isSigningUp ? (
                      <Spin
                        indicator={<LoadingOutlined className="text-[#fff]" />}
                      />
                    ) : (
                      "Đăng ký"
                    )}
                  </ButtonCustom>
                </motion.div>
              </Form.Item>
            </Form>
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center text-sm">
                <span className="text-black">Bạn đã có tài khoản?</span>{" "}
                <a
                  href="#"
                  className="login-form-forgot group relative cursor-pointer font-semibold text-primary hover:text-primary"
                  onClick={() => setIsShowRegister(false)}
                >
                  Đăng nhập
                  <span className="absolute bottom-[-3px] left-0 h-0.5 w-full scale-x-0 transform bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </div>
            </motion.div>
          </div>
        </>
      ) : (
        <Signin />
      )}
    </>
  );
};

export default Signup;
