import React from "react";
import "./HomeScreen.css";
import FilipizenLogo from "../assets/filipizen.svg";

const HomeScreen = (props) => {
  const startHandler = () => {
    props.history.push("/partners");
  };

  return (
    <div className="HomeScreen">
      <div className="HomeScreen__panel">
        <img className="HomeScreen__image" src={FilipizenLogo} {...props} alt="filipizen logo"/>
        <div className="HomeScreen__infoContainer">
          <div className="HomeScreen__information">
            <label className="HomeScreen__title">
              Experience ease of doing business with the government
            </label>
            <label className="HomeScreen__description">
            Over 50 local government units participating all over the Philippines.
            </label>
          </div>
          <button className="HomeScreen__button" onClick={startHandler}>Start Here</button>
          <div className="Spacer" />
        </div>
      </div>
    </div>
  )
};


export default HomeScreen;
