import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  function UserType(value) {
    return navigate(`/${value.currentTarget.value}/login`);
  }
  return (
    <div className="AppContainer img3">
      <div className="center">
        <div className="title">
          <i className="fa-solid fa-l fa-flip"></i>
          <i className="fa-solid fa-o fa-flip"></i>
          <i className="fa-solid fa-g fa-flip"></i>
          <i className="fa-solid fa-i fa-flip"></i>
          <i className="fa-solid fa-n fa-flip"></i>
        </div>
        <div className="sub_title"></div>
        <div className="btns">
          <select onChange={UserType}>
            <option value="select">select from below</option>
            <option value="employee">employee</option>
            <option value="customer">customer</option>
          </select>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default Home;
