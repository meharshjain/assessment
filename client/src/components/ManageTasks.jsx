import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MyTasks(props) {
  const [tasks, setTasks] = useState([]);
  const userPage = async function test() {
    const res = await fetch(props.url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const tempTasks = await res.json();
    setTasks(tempTasks);
  };
  useEffect(() => {
    userPage();
  }, []);
  return tableContent(tasks, props);
}

function tableContent(tasks, props) {
  var render = [];
  var thead = [];
  async function assignTask(e) {
    const selected = JSON.parse(e.target.value);
    await fetch(`/assignTask/${selected[0]}/${selected[1]}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async function (res) {
      window.location.replace(window.location.pathname+window.location.search);
    });
  }
  async function changeStatus(e, taskId) {
    const selected = e.target.value;
    await fetch(`/changeStatus/${selected}/${taskId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async function (res) {
      window.location.replace(window.location.pathname+window.location.search);
    });
  }
  for (var h = 0; h < props.tableHeader.length; h++) {
    const content = props.tableHeader[h];
    thead.push(<th style={{ border: "1px solid black" }}>{content}</th>);
  }
  render.push(<tr>{thead}</tr>);
  for (var i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    var issues = [];
    for (var j = 0; j < task.issueType.length; j++) {
      const issue = task.issueType[j];
      issues.push(<p>{issue.value}</p>);
    }
    switch (props.url) {
      case "/myTasks":
        render.push(
          <tr>
            <td style={{ border: "1px solid black" }}>{task.user.username}</td>
            <td style={{ border: "1px solid black" }}>{task.productType}</td>
            <td style={{ border: "1px solid black" }}>{issues}</td>
            <td style={{ border: "1px solid black" }}>{task.date}</td>
            <td style={{ border: "1px solid black" }}>{task.status}</td>
            <td style={{ border: "1px solid black" }}>
            <select onChange={(e) => changeStatus(e, task._id)}>
                <option value="select">select</option>
                <option id="inProgress" value="inProgress">
                  In Progress
                </option>
                <option id="onHold" value="onHold">
                  On Hold
                </option>
                <option id="completed" value="completed">
                  Completed
                </option>
              </select>
            </td>
          </tr>
        );
        break;
      case "/unallocatedTasks":
        render.push(
          <tr>
            <td style={{ border: "1px solid black" }}>{task.user.username}</td>
            <td style={{ border: "1px solid black" }}>{task.productType}</td>
            <td style={{ border: "1px solid black" }}>{issues}</td>
            <td style={{ border: "1px solid black" }}>{task.date}</td>
            <td style={{ border: "1px solid black" }}>
              <select onChange={assignTask}>
                <option value="select">select</option>
                <option id="self" value={JSON.stringify(["self", task._id])}>
                  assign to self
                </option>
                <option
                  id="employee"
                  value={JSON.stringify(["employee", task._id])}
                >
                  assign to employee
                </option>
              </select>
            </td>
          </tr>
        );
        break;

      case "/allocatedTasks":
        render.push(
          <tr>
            <td style={{ border: "1px solid black" }}>{task.user.username}</td>
            <td style={{ border: "1px solid black" }}>{task.productType}</td>
            <td style={{ border: "1px solid black" }}>{issues}</td>
            <td style={{ border: "1px solid black" }}>{task.date}</td>
            <td style={{ border: "1px solid black" }}>{task.status}</td>
            <td style={{ border: "1px solid black" }}>
              <select onChange={(e) => changeStatus(e, task._id)}>
                <option value="select">select</option>
                <option id="inProgress" value="inProgress">
                  In Progress
                </option>
                <option id="onHold" value="onHold">
                  On Hold
                </option>
                <option id="completed" value="completed">
                  Completed
                </option>
              </select>
            </td>
          </tr>
        );
        break;
      default:
        break;
    }
  }
  return (
    <>
      <a href="/logout">LogOut</a>
      <table style={{ border: "1px solid black" }}>{render}</table>
    </>
  );
}

function ManageTasks() {
  const navigate = useNavigate();
  const selected = window.location.search.replace("?option=", "");
  if (selected) {
    switch (selected) {
      case "unallocated":
        return (
          <MyTasks
            url="/unallocatedTasks"
            tableHeader={[
              "Customer Username",
              "Product Type",
              "Issue Type",
              "Date of Submission",
              "More Options",
            ]}
          />
        );
      case "allocated":
        return (
          <MyTasks
            url="/allocatedTasks"
            tableHeader={[
              "Employee's Username",
              "Product Type",
              "Issue Type",
              "Date of Submission",
              "Status",
              "More Options",
            ]}
          />
        );
      case "myTasks":
        return (
          <MyTasks
            url="/myTasks"
            tableHeader={[
              "Customer Username",
              "Product Type",
              "Issue Type",
              "Date of Submission",
              "Status",
              "More Details",
            ]}
          />
        );
      default:
        break;
    }
  } else
    return (
      <div className="AppContainer img3">
        <a href="/logout">LogOut</a>
        <div className="login">
          <div className="container">
            <div className="title formtitle" style={{ marginLeft: "35%" }}>
              Admin
            </div>
            <div className="input-box button">
              <input
                type="submit"
                value="Unallocated Tasks"
                style={{ padding: "10px 50px", margin: "10px" }}
                onClick={() => navigate("/manageTasks?option=unallocated")}
              />
              <input
                type="submit"
                value="Allocated Tasks"
                style={{ padding: "10px 60px", margin: "10px" }}
                onClick={() => navigate("/manageTasks?option=allocated")}
              />
            </div>
          </div>
        </div>
      </div>
    );
}

export default ManageTasks;
