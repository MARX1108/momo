import React, { useState } from "react";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  CalculatorOutlined,
  CalendarOutlined,
  FrownOutlined,
  MehOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import {
  HStack,
  Box,
  VStack,
  IconButton,
  Flex,
  Button,
  Text,
  StackDivider,
  Tag,
  TagLeftIcon,
  TagLabel,
  Spacer,
} from "@chakra-ui/react";

import { nanoid } from "nanoid";

import { Card, Row, Col, Checkbox, Rate } from "antd";

const raterStyle = { fontSize: "1rem", Color: "#1890ff" };
const customIcons = {
  1: <FrownOutlined style={raterStyle} />,
  2: <FrownOutlined style={raterStyle} />,
  3: <MehOutlined style={raterStyle} />,
  4: <SmileOutlined style={raterStyle} />,
  5: <SmileOutlined style={raterStyle} />,
};

/**
 * each to do task
 * @param
 * name: (string) the name of the task
 * completed: (bool) whether or not the task is completed
 * specialNote: (string) text appears on the right side of the task box (i.e. from previous days)
 * uuid: (num) unique id for each task
 * changeTaskCompleteness: (func) callback func to change the completedness of the task
 * dateCreated: (object) the date that this task is created, for debugging purpose
 */
function ToDoTask({
  name,
  completed,
  specialNote,
  uuid,
  changeTaskCompleteness,
  dateCreated,
}) {
  return (
    // key={task.id} opacity={task.check == true ? "0.2" : "1"}
    <HStack
      px="7"
      py="1"
      mb="2"
      borderColor="gray.100"
      // borderWidth="1px"
      borderTopWidth="0"
      borderLeftWidth="0"
      borderRightWidth="0"
      borderBottomWidth="1px"
      borderRadius="3px"
      transition="box-shadow 200ms linear"
      _hover={{ boxShadow: "rgba(100, 100, 111, 0.1) 0px 4px 10px 0px" }}
    >
      <Checkbox> {name} </Checkbox>

      <Tag size="sm" variant="subtle" colorScheme="cyan">
        <TagLabel>home</TagLabel>
      </Tag>
      <Spacer />
      <Rate
        // defaultValue={3}
        character={({ index }) => customIcons[index + 1]}
      />
      {/* <DeleteTask
        task={task}
        deleteTask={deleteTask}
        deleteTaskAll={deleteTaskAll}
      />
      <UpdateTask task={task} updateTask={updateTask} /> */}
    </HStack>
    // <Card style={{ width: "100%" }} hoverable bordered={true}>
    //   <>
    //     <Row>
    //       <Col span={12} align="left">
    //         <Checkbox> {name} </Checkbox>
    //       </Col>

    //       <Col span={12} align="right">
    //         <Rate
    //           // defaultValue={3}
    //           character={({ index }) => customIcons[index + 1]}
    //         />
    //       </Col>
    //     </Row>
    //   </>
    // </Card>
  );
}

export default ToDoTask;
