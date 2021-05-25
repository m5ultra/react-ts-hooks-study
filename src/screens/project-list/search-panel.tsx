import React from "react";
import { Input, Form, Select, Button } from "antd";
import { useAuth } from "../../context/auth-content";

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  const { logout } = useAuth();
  return (
    <>
      <div style={{ display: "block" }}>
        <Button type={"primary"} onClick={logout}>
          登出
        </Button>
      </div>
      <Form layout={"inline"}>
        {/*setParam(Object.assign({}, param, {name:evt.target.value}))*/}
        <Form.Item>
          <Input
            type="text"
            value={param.name}
            onChange={(evt) =>
              setParam({
                ...param,
                name: evt.target.value,
              })
            }
          />
        </Form.Item>
        <Form.Item>
          <Select
            value={param.personId}
            onChange={(val) =>
              setParam({
                ...param,
                personId: val,
              })
            }
          >
            <Select.Option value={""}>负责人</Select.Option>
            {users.map((user) => (
              <Select.Option key={user.id} value={user.id}>
                {user.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </>
  );
};
