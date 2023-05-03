
import { selectAuth } from "@/redux/store";
import { logOut } from "@/services/authService";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";

type Item = {
  key: string;
  icon?: JSX.Element | undefined;
  label: string | JSX.Element;
};

type Props = {
  collapsed: boolean;
  items: Item[];
};
function Sider({ collapsed, items }: Props) {
  const login = useSelector(selectAuth).login;
  const user = login?.user ? login.user : null;
  const accessToken = user?.accessToken ? user.accessToken : "";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    if (user) logOut(dispatch, navigate);
  };
  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      theme="light"
    >
      <div className="logo" />
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
      />
    </Layout.Sider>
  );
}

export default memo(Sider);
