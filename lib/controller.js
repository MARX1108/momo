import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { deepCopy } from "../lib/helper";
import ToDoTask from "../lib/item";
import { Collapse, DatePicker as AntDatePicker, Row, Col, Space } from "antd";
import {
  Input,
  Button,
  HStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Select,
} from "@chakra-ui/react";

import { FaPlus } from "react-icons/fa";

import moment from "moment";
import "antd/dist/antd.css";
const { Panel } = Collapse;
const { Option } = Select;

/**
 * The todo list system component. Max height is 500px. If exceed, scrollbar will be added
 * @param {object} props {debug: bool}
 */
function ToDoSystem(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // selectedDate: (object) time object from moment()
  // the selected date in the date picker
  const [selectedDate, setSelectedDate] = useState(moment());

  // tasks: [object, ...]
  // this array stores all the created tasks for each date
  // [{name: (string) the name of the task,
  //  completed: (bool) whether the task has been completed,
  //  createdTime: (object) a custom object describing when the task is created {
  //    date: (num) the date of the month the task created,
  //    week: (num) the week of the year (check https://momentjs.com/docs/#/get-set/week/ for more details),
  //    month: (num) 1-12,
  //    year: (num) the year number i.e. 2020,
  //    day: (num) 0-6, the day within the week,
  //    uuid: (num) an unique id different from other tasks
  //    }
  //  }, ...]
  const [tasks, setTasks] = useState([]);

  // tasks: [object, ...]
  // this array stores all the created tasks for each week
  // The format is the same as above
  const [tasksWeek, setTasksWeek] = useState([]);

  // tasks: [object, ...]
  // this array stores all the created tasks for each month
  // The format is the same as above
  const [tasksMonth, setTasksMonth] = useState([]);

  // modalOpen: (bool) whether or not the modal is open
  const [modalOpen, setModalOpen] = useState(false);

  // taskName: (string) an input state used in task name input
  const [taskName, setTaskName] = useState("");

  // taskTimeMode: (string) an input state used in dropdown selecting which type of task to create (for today, or this week, or this month)
  // "Date" or "Week" or "Month"
  const [taskTimeMode, setTaskTimeMode] = useState("Date");

  /**
   * Create a new task object. New task can only be created for today, this week, or this month
   * @param {moment object} selectedDate
   * @param {string} taskTimeMode
   */
  let createNewTask = (selectedDate, taskTimeMode) => {
    let newTasks = null;
    switch (taskTimeMode) {
      case "Date":
        newTasks = deepCopy(tasks);
        newTasks.push({
          name: taskName,
          completed: false,
          createdTime: {
            date: selectedDate.date(),
            month: selectedDate.month() + 1,
            year: selectedDate.year(),
            day: selectedDate.day(),
            week: selectedDate.week(),
          },
          uuid: uuidv4(),
        });
        setTasks(newTasks);
        break;
      case "Week":
        newTasks = deepCopy(tasksWeek);
        newTasks.push({
          name: taskName,
          completed: false,
          createdTime: {
            date: selectedDate.date(),
            month: selectedDate.month() + 1,
            year: selectedDate.year(),
            day: selectedDate.day(),
            week: selectedDate.week(),
          },
          uuid: uuidv4(),
        });
        setTasksWeek(newTasks);
        break;
      case "Month":
        newTasks = deepCopy(tasksMonth);
        newTasks.push({
          name: taskName,
          completed: false,
          createdTime: {
            date: selectedDate.date(),
            month: selectedDate.month() + 1,
            year: selectedDate.year(),
            day: selectedDate.day(),
            week: selectedDate.week(),
          },
          uuid: uuidv4(),
        });
        setTasksMonth(newTasks);
        break;
      default:
        throw new Error("taskTimeMode has some weird value");
    }
    console.log(tasksWeek);
    setModalOpen(false);
  };

  /**
   * Swtich between completed and not completed for a clicked date task
   * @param {TodoTask click event} event
   */
  let changeTaskCompleteness = (event) => {
    let selectedUUID = event.target.value;
    let selectedTaskIndex = tasks.findIndex(
      (task) => task.uuid === selectedUUID
    );
    let newTasks = deepCopy(tasks);
    newTasks[selectedTaskIndex].completed =
      !newTasks[selectedTaskIndex].completed;
    setTasks(newTasks);
  };

  /**
   * Swtich between completed and not completed for a clicked week task
   * @param {TodoTask click event} event
   */
  let changeTaskWeekCompleteness = (event) => {
    let selectedUUID = event.target.value;
    let selectedTaskIndex = tasksWeek.findIndex(
      (task) => task.uuid === selectedUUID
    );
    let newTasks = deepCopy(tasksWeek);
    newTasks[selectedTaskIndex].completed =
      !newTasks[selectedTaskIndex].completed;
    setTasksWeek(newTasks);
  };

  /**
   * Swtich between completed and not completed for a clicked month task
   * @param {TodoTask click event} event
   */
  let changeTaskMonthCompleteness = (event) => {
    let selectedUUID = event.target.value;
    let selectedTaskIndex = tasksMonth.findIndex(
      (task) => task.uuid === selectedUUID
    );
    let newTasks = deepCopy(tasksMonth);
    newTasks[selectedTaskIndex].completed =
      !newTasks[selectedTaskIndex].completed;
    setTasksMonth(newTasks);
  };

  /**
   * Transform a moment time object to the custom format used by this todolist
   */
  let transformToTimeFormat = (selectedDate) => {
    return {
      date: selectedDate.date(),
      month: selectedDate.month() + 1,
      year: selectedDate.year(),
      week: selectedDate.week(),
    };
  };

  /**
   * If the first date is before the second date, return true
   */
  let isPreviousDate = (firstDate, secondDate) => {
    if (
      firstDate.year < secondDate.year ||
      (firstDate.year === secondDate.year &&
        firstDate.month < secondDate.month) ||
      (firstDate.year === secondDate.year &&
        firstDate.month === secondDate.month &&
        firstDate.date < secondDate.date)
    ) {
      return true;
    }
    return false;
  };

  /**
   * If the first date is the same date as the second date, return true
   */
  let isSameDate = (firstDate, secondDate) => {
    if (
      firstDate.year === secondDate.year &&
      firstDate.month === secondDate.month &&
      firstDate.date === secondDate.date
    ) {
      return true;
    }
    return false;
  };

  /**
   * If the first date is not in the same week of the second date and also before the second date, return true
   */
  let isPreviousWeek = (firstDate, secondDate) => {
    return (
      !isSameWeek(firstDate, secondDate) &&
      isPreviousDate(firstDate, secondDate)
    );
  };

  /**
   * If the first date is in the same week of the second date, return true
   */
  let isSameWeek = (firstDate, secondDate) => {
    if (
      firstDate.week === secondDate.week &&
      firstDate.year === secondDate.year
    ) {
      return true;
    }
    return false;
  };

  /**
   * If the first date is not in the same month of the second date, return true
   */
  let isPreviousMonth = (firstDate, secondDate) => {
    return (
      !isSameMonth(firstDate, secondDate) &&
      isPreviousDate(firstDate, secondDate)
    );
  };

  /**
   * If the first date is in the same month of the second date, return true
   */
  let isSameMonth = (firstDate, secondDate) => {
    if (
      firstDate.year === secondDate.year &&
      firstDate.month === secondDate.month
    ) {
      return true;
    }
    return false;
  };

  /**
   * Create a new task and close the modal
   */
  function handleModalOk() {
    // debug: if debug prop is set, user can create tasks at any date, and that date is the currently selected date in datepicker
    // if debug prop is not set, user can only create task today, this week, or this month
    if (props.debug === true) {
      createNewTask(selectedDate, taskTimeMode);
    } else {
      createNewTask(moment(), taskTimeMode);
    }
    setModalOpen(false);
  }

  /**
   * Close the modal
   */
  function handleModalCancel() {
    setModalOpen(false);
  }

  return (
    <div id="todo-container">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create A New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <span>This task is for </span>

            <Select
              placeholder="Select option"
              variant={"filled"}
              size={"sm"}
              onChange={(e) => {
                setTaskTimeMode(e.target.value);
              }}
            >
              <option value="Date">Today</option>
              <option value="Week">This Week</option>
              <option value="Month">This Month</option>
            </Select>
            <div>The task name is:</div>
            <Input
              variant="filled"
              placeholder="Please input your task's name"
              value={taskName}
              size={"sm"}
              onChange={(event) => setTaskName(event.target.value)}
            />

            {/* <Input
              onChange={(event) => setTaskName(event.target.value)}
            ></Input> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" ml={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              ml={3}
              onClick={() => {
                handleModalOk();
                onClose();
              }}
            >
              Ok
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Row>
        <Col span={24} align="middle">
          <Space>
            <AntDatePicker
              style={{ marginLeft: "1rem" }}
              onChange={(date, dateString) => setSelectedDate(date)}
              value={selectedDate}
              defaultValue={moment()}
              showToday={true}
              allowClear={false}
            />

            <IconButton
              colorScheme="blue"
              aria-label="Search database"
              onClick={onOpen}
              size="sm"
              icon={<FaPlus />}
            />
          </Space>
        </Col>
      </Row>

      <Collapse style={{ width: "30vw" }} defaultActiveKey={["1"]} ghost>
        <Panel
          header={<span className="font-weight-bold">Today</span>}
          key="1"
          extra={
            parseInt(selectedDate.year()) +
            "-" +
            parseInt(selectedDate.month() + 1) +
            "-" +
            parseInt(selectedDate.date())
          }
        >
          {/* The algorithm needs improvement -> just use one map */}
          {/* Tasks that are late should be listed at the top */}
          {tasks.map((task) =>
            isPreviousDate(
              task.createdTime,
              transformToTimeFormat(selectedDate)
            ) ? (
              <ToDoTask
                key={task.uuid}
                name={task.name}
                completed={task.completed}
                specialNote={"from previous days"}
                uuid={task.uuid}
                dateCreated={
                  parseInt(task.createdTime.year) +
                  " " +
                  parseInt(task.createdTime.month) +
                  " " +
                  parseInt(task.createdTime.date)
                } //used to debug
                changeTaskCompleteness={changeTaskCompleteness}
              />
            ) : null
          )}
          {tasks.map((task) =>
            isSameDate(
              task.createdTime,
              transformToTimeFormat(selectedDate)
            ) ? (
              <ToDoTask
                key={task.uuid}
                name={task.name}
                completed={task.completed}
                specialNote={""}
                uuid={task.uuid}
                dateCreated={
                  parseInt(task.createdTime.year) +
                  " " +
                  parseInt(task.createdTime.month) +
                  " " +
                  parseInt(task.createdTime.date)
                } //used to debug
                changeTaskCompleteness={changeTaskCompleteness}
              />
            ) : null
          )}
        </Panel>
        <Panel
          header={<span className="font-weight-bold">This Week</span>}
          key="2"
          extra={
            parseInt(selectedDate.week()) +
            "th Week of " +
            parseInt(selectedDate.year())
          }
        >
          {tasksWeek.map((task) =>
            isPreviousWeek(
              task.createdTime,
              transformToTimeFormat(selectedDate)
            ) ? (
              <ToDoTask
                key={task.uuid}
                name={task.name}
                completed={task.completed}
                specialNote={"from previous weeks"}
                uuid={task.uuid}
                dateCreated={
                  parseInt(task.createdTime.year) +
                  " " +
                  parseInt(task.createdTime.month) +
                  " " +
                  parseInt(task.createdTime.date)
                } //used to debug
                changeTaskCompleteness={changeTaskWeekCompleteness}
              />
            ) : null
          )}
          {tasksWeek.map((task) =>
            isSameWeek(
              task.createdTime,
              transformToTimeFormat(selectedDate)
            ) ? (
              <ToDoTask
                key={task.uuid}
                name={task.name}
                completed={task.completed}
                specialNote={""}
                uuid={task.uuid}
                dateCreated={
                  parseInt(task.createdTime.year) +
                  " " +
                  parseInt(task.createdTime.month) +
                  " " +
                  parseInt(task.createdTime.date)
                } //used to debug
                changeTaskCompleteness={changeTaskWeekCompleteness}
              />
            ) : null
          )}
        </Panel>
        <Panel
          header={<span className="font-weight-bold">This Month</span>}
          key="3"
          extra={selectedDate.format("MMMM")}
        >
          {tasksMonth.map((task) =>
            isPreviousMonth(
              task.createdTime,
              transformToTimeFormat(selectedDate)
            ) ? (
              <ToDoTask
                key={task.uuid}
                name={task.name}
                completed={task.completed}
                specialNote={"from previous months"}
                uuid={task.uuid}
                dateCreated={
                  parseInt(task.createdTime.year) +
                  " " +
                  parseInt(task.createdTime.month) +
                  " " +
                  parseInt(task.createdTime.date)
                } //used to debug
                changeTaskCompleteness={changeTaskMonthCompleteness}
              />
            ) : null
          )}
          {tasksMonth.map((task) =>
            isSameMonth(
              task.createdTime,
              transformToTimeFormat(selectedDate)
            ) ? (
              <ToDoTask
                key={task.uuid}
                name={task.name}
                completed={task.completed}
                specialNote={""}
                uuid={task.uuid}
                dateCreated={
                  parseInt(task.createdTime.year) +
                  " " +
                  parseInt(task.createdTime.month) +
                  " " +
                  parseInt(task.createdTime.date)
                } //used to debug
                changeTaskCompleteness={changeTaskMonthCompleteness}
              />
            ) : null
          )}
        </Panel>
      </Collapse>
    </div>
  );
}

export default ToDoSystem;
