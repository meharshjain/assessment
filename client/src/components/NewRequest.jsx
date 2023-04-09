import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
//import axios from "axios";

function SelectOptions(props) {
  const selectInputRef = useRef();
  const onClear = () => {
    selectInputRef.current.setValue(null);
  };
  return (
    <>
      <Select
        ref={selectInputRef}
        required={true}
        options={props.options}
        displayValue={props.name}
        isMulti={props.multi}
        onChange={props.change}
      />
      <button id={props.name} type="button" onClick={onClear} hidden>
        Reset value
      </button>
    </>
  );
}
function selectProductType(selected, setOptions, setToForm, formData) {
  var options = [];
  switch (selected) {
    case "mobilePhone":
      options = [
        { label: "Broken Screen", value: "Broken Screen" },
        { label: "Faulty Camera", value: "Faulty Camera" },
        { label: "Overheating Issue", value: "Overheating Issue" },
      ];
      break;
    case "tv":
      options = [
        { label: "Damaged Screen", value: "Damaged Screen" },
        { label: "Discoloration Of Screen", value: "Discoloration Of Screen" },
        { label: "Adapter Issues", value: "Adapter Issues" },
      ];
      break;
    case "refrigerator":
      options = [
        { label: "Panel Controls", value: "Panel Controls" },
        {
          label: "Broken Compressor Not Working",
          value: "Broken Compressor Not Working",
        },
        { label: "Unable To Turn On", value: "Unable To Turn On" },
      ];
      break;
    case "washingMachine":
      options = [
        { label: "Water overflowing", value: "Water overflowing" },
        { label: "Motor not working", value: "Motor not working" },
      ];
      break;
    default:
      break;
  }
  setOptions(options);
  document.getElementById("issueType").click();
  return setToForm({ ...formData, productType: selected });
}

function App() {
  const [sessionUser, setSessionUser] = useState("");
  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState({
    productType: "",
    issueType: "",
    description: "",
    policy: "",
  });
  const navigate = useNavigate();
  const userHomePage = async function test() {
    const res = await fetch("/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const user = await res.json();
    setSessionUser(user);
  };
  useEffect(() => {
    userHomePage();
  }, []);
  if (!sessionUser)
    return (
      <>
        User not loggedin go <a href="/">home</a>
      </>
    );
  if (sessionUser.userType === "customer")
    return (
      <div className="AppContainer img3">
        <a href="/logout">LogOut</a>
        <div
          className="container"
          style={{ maxWidth: "700px", height: "500px", marginTop: "100px" }}
        >
          <div className="title">New Request</div>
          <div className="content">
            <div className="user-details">
              <div className="input-box">
                <span className="details">Product Type*</span>
                <SelectOptions
                  name="productType"
                  options={[
                    { label: "Mobile Phone", value: "mobilePhone" },
                    { label: "TV", value: "tv" },
                    { label: "Refrigerator", value: "refrigerator" },
                    { label: "Washing Machine", value: "washingMachine" },
                  ]}
                  change={(e) =>
                    selectProductType(
                      e.value,
                      setOptions,
                      setFormData,
                      formData
                    )
                  }
                />
              </div>
              <div className="input-box"></div>
              <div className="input-box">
                <span className="details">Issue Type*</span>
                <SelectOptions
                  options={options}
                  multi={true}
                  name="issueType"
                  change={(e) => setFormData({ ...formData, issueType: e })}
                />
              </div>
              <div className="input-box"></div>
              <div className="input-box">
                <span className="details">Issue Description</span>
                <input
                  type="textarea"
                  placeholder="Enter Description"
                  name="description"
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div className="input-box"></div>
              <div className="input-box">
                <form
                  action="/newRequest"
                  method="post"
                  enctype="multipart/form-data"
                >
                  <span className="details">Policy Upload*</span>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    hidden
                  />
                  <input
                    type="text"
                    name="productType"
                    value={formData.productType}
                    hidden
                  />
                  <input
                    type="text"
                    name="issueType"
                    value={JSON.stringify(formData.issueType)}
                    hidden
                  />
                  <input
                    type="file"
                    data-max-size="2048" 
                    accept="image/png, application/pdf, application/msword, image/jpeg"
                    name="policy"
                    onChange={(e) =>
                      setFormData({ ...formData, policy: e.target.value })
                    }
                    required
                  />
                  <div className="input-box button">
                    <input
                      type="submit"
                      value="Submit"
                      onClick={() =>
                        alert(
                          "request has been submitted and a customer care executive will be in touch with them soon."
                        )
                      }
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  else if (sessionUser.username === "employee1")
    return navigate("/manageTasks");
  else return navigate("/manageTasks?option=myTasks");
}

export default App;
