
import { Layout, Menu } from "antd";
import { memo } from "react";

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
