import { Layout, Menu, Typography, Space, Input, Row, Col } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import {
  FaSun,
  FaMoon,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";

const { SubMenu } = Menu;
const { Title } = Typography;
const { Header, Content, Sider } = Layout;
import "antd/dist/antd.css";
import ToDoSystem from "../lib/controller";
import {
  Heading,
  IconButton,
  VStack,
  useColorMode,
  useDisclosure,
  useToast,
  Link,
  Flex,
} from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <VStack p={4} minH="100vh" pb={28}>
        <Heading
          p="5"
          fontWeight="extrabold"
          size="xl"
          bgGradient="linear(to-l, teal.300, blue.500)"
          bgClip="text"
        >
          Momo
        </Heading>

        <Heading
          p="5"
          fontWeight="extrabold"
          size="l"
          bgColor="#000000"
          // bgGradient='linear(to-l, teal.300, blue.500)'
          bgClip="text"
        >
          Happier ToDoList
        </Heading>

        <ToDoSystem />

        <Flex position="absolute" bottom="5">
          <Link href="https://github.com/marx1108" target="_blank">
            <IconButton icon={<FaGithub />} isRound="true" size="md" m="1" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/fabio-junior-raminhuk-740669121/"
            target="_blank"
          >
            <IconButton icon={<FaLinkedin />} isRound="true" size="md" m="1" />
          </Link>
          <Link href="https://www.instagram.com/fabiormk/" target="_blank">
            <IconButton icon={<FaInstagram />} isRound="true" size="md" m="1" />
          </Link>
          <Link href="https://twitter.com/fabio_rmk" target="_blank">
            <IconButton icon={<FaTwitter />} isRound="true" size="md" m="1" />
          </Link>
          <Link href="https://www.facebook.com/fabio.raminhuk" target="_blank">
            <IconButton icon={<FaFacebook />} isRound="true" size="md" m="1" />
          </Link>
        </Flex>
      </VStack>
    </>
  );
}
