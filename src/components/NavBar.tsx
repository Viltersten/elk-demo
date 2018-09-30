import * as React from "react";

const divStyle = {
  background: "indigo",
  color: "ghostwhite",
  padding: "2%"
};

export default class NavBar extends React.Component {

  constructor(props: any) {
    super(props);

  }

  private unoClicked(_: React.MouseEvent<HTMLElement>) {
    console.log("uno clicked");
    console.log(_);
  }

  private duoClicked = (_: React.MouseEvent) => {
    console.log("duo clicked");
    console.log(_);
  }

  render() {
    return (
      <div style={divStyle}>
        <ul>
          <li onClick={() => { alert("click"); }}>Home</li>
          <li onClick={this.unoClicked}>Item Uno</li>
          <li onClick={this.duoClicked}>Item Duo</li>
          <li>Item Tri</li>
        </ul>
      </div>
    );
  }
}