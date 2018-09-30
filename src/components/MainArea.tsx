import * as React from "react";
import NavBar from "./NavBar";
import DataView from "./DataView";
import Author from "../assets/author.png";
// var Author = require("../assets/author.png");

const divStyle = {
  background: "pink",
  color: "brown",
  margin: "1%",
  width: "98%",
  height: "50%"
};

const imgStyle = {
  width: "50px",
  height: "50px",
  margin: "15px"
};

export default class MainArea extends React.Component {
  render() {
    return (
      <div style={divStyle}>
        {/* <NavBar name="KVIX" /> */}
        <NavBar />
        <DataView />
        Main area under rendition.<br />
        <img src={Author} style={imgStyle} />
      </div>);
  }
}