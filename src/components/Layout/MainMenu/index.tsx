import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useRouter } from "next/router";

const ITEMS = [
  {
    key: "book",
    //icon: React.createElement(icon),
    label: "Book Management",

    children: [
      { key: "/book", label: "Book List" },
      { key: "/book/add", label: "Add Book" },
    ],
  },
  {
    key: "borrow",
    label: "Borrow Management",

    children: [
      { key: "/borrow", label: "Borrow List" },
      { key: "/borrow/add", label: "Add Borrow" },
    ],
  },
  {
    key: "category",
    label: "Category Management",

    children: [
      { key: "/category", label: "Category List" },
      { key: "/category/add", label: "Add Category" },
    ],
  },
  {
    key: "user",
    label: "User Management",

    children: [
      { key: "/user", label: "User List" },
      { key: "/user/add", label: "Add User" },
    ],
  },
];

const MainMenu: React.FC = () => {
  const router = useRouter();
  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    router.push(key);
  };
  const activeMenu = router.pathname;
  console.log(activeMenu);

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["book"]}
      defaultOpenKeys={["book"]}
      style={{ height: "100%", borderRight: 0,width: "fit-content" }}
      items={ITEMS}
      onClick={handleMenuClick}
      selectedKeys={[activeMenu]} 
    />
  );
};
export default MainMenu;
