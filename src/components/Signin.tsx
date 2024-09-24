"use client";

import React, { useState } from "react";
import { Form, Checkbox, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Image from "next/image";
import ForgotPasswordForm from "@/components/ForgotPassword";
import Signup from "@/components/Signup";
import Link from "next/link";
import { motion } from "framer-motion";
import { ButtonCustom } from "@/components/ui/button";
import { InputCustom } from "./ui/input";
import { LoginFormParams } from "@/types/login.types";
import { login } from "@/apis/authenApi";

const LoginForm: React.FC = () => {
  const [isShowRegister, setIsShowRegister] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isShowForgotPassword, setIsShowForgotPassword] =
    useState<boolean>(false);
  const [values, setValues] = useState<LoginFormParams>();
  const [form] = Form.useForm();
  const [isError, setIsError] = useState(false);

  const onFinish = (values: LoginFormParams) => {
    setIsLoggingIn(true);
    const updated_values: LoginFormParams = {
      username: values.username,
      password: values.password
    };
    console.log("check values", updated_values);
    setValues(values);
    if (values?.username && values?.password) {
      handleSignin(values);
    }
  };
  const handleSignin = async (values: LoginFormParams) => {
    try {
      const response = await login(values);
      setIsLoggingIn(false);
      if (response.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        if (rememberMe) {
          localStorage.setItem("password", values.password);
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
        }
        setIsError(false);
        // router.push("/dashboard");
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsLoggingIn(false);
      setIsError(true);
    }
  };

  const [capsLockOn, setCapsLockOn] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.getModifierState("CapsLock")) {
      setCapsLockOn(true);
    } else {
      setCapsLockOn(false);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e.getModifierState("CapsLock")) {
      setCapsLockOn(false);
    }
  };

  return (
    <>
      {isShowForgotPassword ? (
        <ForgotPasswordForm
          isShowRegister={isShowRegister}
          setIsShowRegister={setIsShowRegister}
        />
      ) : !isShowRegister ? (
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
                Bản ghi cuộc họp chi tiết cụ thể với {""}
                <span>
                  <Link
                    href="/"
                    className="group relative cursor-pointer font-bold text-primary"
                  >
                    FRECORD
                    <span className="absolute bottom-[-3px] left-0 h-0.5 w-full scale-x-0 transform bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                  <span>.</span>
                </span>
                {""} Bắt đầu ngay.
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
                  name="username"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập username",
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
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu",
                    },
                    {
                      min: 8,
                      max: 20,
                      message: "Mật khẩu phải có ít nhất 8 kí tự",
                    },
                    {
                      validator: (_, value) => {
                        if (capsLockOn) {
                          return Promise.reject("Caps Lock đang bật");
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                  labelCol={{ span: 24 }}
                  className="formItem"
                  hasFeedback
                >
                  <InputCustom
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                    placeholder="Mật khẩu"
                    type="password"
                    className="hover:border-primary focus:border-primary"
                  />
                </Form.Item>
              </motion.div>
              <motion.div
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  noStyle
                  className="mt-4"
                >
                  <Checkbox onChange={(e) => setRememberMe(e.target.checked)}>
                    Ghi nhớ
                  </Checkbox>
                  <a
                    href="#"
                    className="group relative float-right cursor-pointer font-semibold text-primary hover:text-primary"
                    onClick={() => setIsShowForgotPassword(true)}
                  >
                    Quên mật khẩu
                    <span className="absolute bottom-[-3px] left-0 h-0.5 w-full scale-x-0 transform bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                </Form.Item>
              </motion.div>
              <Form.Item>
                <motion.div
                  initial={{ x: -50 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 1 }}
                >
                  <ButtonCustom className="mx-auto mt-5 block h-11 w-full rounded-[5px] bg-primary text-lg tracking-wider text-white hover:bg-primary/80">
                    {isLoggingIn ? (
                      <Spin
                        indicator={<LoadingOutlined className="text-[#fff]" />}
                      />
                    ) : (
                      "Đăng nhập"
                    )}
                  </ButtonCustom>
                </motion.div>
              </Form.Item>
            </Form>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="mt-4 flex items-center justify-center text-center">
                <div className="mr-2 h-[1px] w-full bg-[#e6e8eb]"></div>
                <span className="text-[#999999]">hoặc</span>
                <div className="ml-2 h-[1px] w-full bg-[#e6e8eb]"></div>
              </div>
            </motion.div>
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ButtonCustom className="mx-auto mt-5 block h-11 w-full rounded-[5px] border border-gray-300 bg-[#fff] text-[grey] shadow-none hover:!border-primary hover:!bg-transparent hover:!text-primary">
                <div className="flex items-center justify-center tracking-wider">
                  <Image
                    src="https://freesvg.org/img/1534129544.png"
                    width={30}
                    height={30}
                    quality={100}
                    alt=""
                    className="mr-2"
                  />
                  Tiếp tục với Google
                </div>
              </ButtonCustom>

              <div className="mt-3 text-center text-sm">
                <span className="text-black">Bạn không có tài khoản?</span> {""}
                <a
                  href="#"
                  className="login-form-forgot group relative cursor-pointer font-semibold text-primary hover:text-primary"
                  onClick={() => setIsShowRegister(true)}
                >
                  Đăng ký
                  <span className="absolute bottom-[-3px] left-0 h-0.5 w-full scale-x-0 transform bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </div>
            </motion.div>
          </div>
        </>
      ) : (
        <Signup
          isShowRegister={isShowRegister}
          setIsShowRegister={setIsShowRegister}
        />
      )}
    </>
  );
};

export default LoginForm;
