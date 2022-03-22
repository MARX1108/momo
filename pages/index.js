import { Layout, Menu, Typography, Space, Input, Row, Col } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
const { SubMenu } = Menu;
const { Title } = Typography;
const { Header, Content, Sider } = Layout;
import "antd/dist/antd.css";
import ToDoSystem from "../lib/controller";
export default function Home() {
  return (
    <>
      <Row align="middle">
        <Col span={6}></Col>
        <Col align="middle" span={12}>
          <Title>Momo</Title>
          <p>Happier ToDoList</p>
          <ToDoSystem />
        </Col>
        <Col span={6}></Col>
      </Row>
    </>
  );
}
