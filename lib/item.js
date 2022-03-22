import React, { useState } from "react";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  CalculatorOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

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
    <label className="list-group-item d-flex justify-content-between align-items-center">
      <input
        style={{ display: "none" }}
        type="checkbox"
        id={uuid}
        value={uuid}
        checked={completed}
        onChange={changeTaskCompleteness}
      />
      <span>
        {completed ? (
          <AppstoreOutlined></AppstoreOutlined>
          // <FontAwesomeIcon
          //   icon={solidCircle}
          //   color="#818181"
          //   style={{
          //     fontSize: "1.5rem",
          //     position: "relative",
          //     left: "-0.7rem",
          //   }}
          // ></FontAwesomeIcon>
        ) : (
          <CalculatorOutlined></CalculatorOutlined>
          // <FontAwesomeIcon
          //   icon={emptyCircle}
          //   color="#818181"
          //   style={{
          //     fontSize: "1.5rem",
          //     position: "relative",
          //     left: "-0.7rem",
          //   }}
          // ></FontAwesomeIcon>
        )}
        <div
          className={
            "std-font-size font-weight-bold d-inline-flex justify-content-between task-name" +
            (completed ? " text-line-through grey-text" : "")
          }
        >
          <span>{name}</span>
        </div>
      </span>
      <span
        style={{ color: "#BCBCBC" }}
        className="std-font-size font-weight-bold"
      >
        {specialNote}
      </span>
    </label>
    // <span>{dateCreated}</span>
  );
}

export default ToDoTask;
