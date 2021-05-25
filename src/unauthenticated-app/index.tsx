import React, { useState } from "react";
import { Button } from "antd";
import { RegisterScreen } from "./register";
import { LoginScreen } from "./login";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <>
      {isRegister ? <LoginScreen /> : <RegisterScreen />}
      <Button type={"default"} onClick={() => setIsRegister(!isRegister)}>切换到{isRegister ? "注册" : "登录"}</Button>
    </>
  );
};
