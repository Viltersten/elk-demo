import * as React from "react";

const divStyle = {
  background: "indigo",
  color: "ghostwhite",
  padding: "2%"
};

export default class NavBar extends React.Component {
  render() {
    return (
      <div style={divStyle}>
        <ul>
          <li onClick={() => { alert("click"); }}>Home</li>
          <li>Item Uno</li>
          <li>Item Duo</li>
          <li>Item Tri</li>
        </ul>
      </div>
    );
  }
}