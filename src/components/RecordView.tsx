import * as React from "react";

export default class RecordView extends React.Component<
  {
    competitionAffected: boolean,
    created: Date,
    currency: string,
    feature: boolean
    gameId: number
    gameName: string,
    id: number,
    occasion: any,
    operatorId: number,
    purchaseMode: string,
    status: string,
    totalBet: number
    totalWin: number
    accountId: number,
    clientMode: string,
    key: number
  },
  {}>{

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.accountId}</td>
        <td>{this.props.clientMode}</td>
        <td>{this.props.totalBet}</td>
        <td>{this.props.totalWin}</td>
        <td>{this.props.competitionAffected ? "Y" : "N"}</td>
        <td>{this.props.created}</td>
        <td>{this.props.currency}</td>
        <td>{this.props.feature ? "Y" : "N"}</td>
        <td>{this.props.gameName}, {this.props.gameId}</td>
        <td>{this.props.id}</td>
        <td>{this.props.operatorId}</td>
        <td>{this.props.purchaseMode}</td>
        <td>{this.props.status}</td>
      </tr>
    );
  }

  private datify(date: Date): string {
    let output = "";
    output += date.getFullYear();
    output += "-" + this.zerofy(date.getMonth());
    output += "-" + this.zerofy(date.getDate());
    output += " at " + this.zerofy(date.getHours());
    output += ":" + this.zerofy(date.getMinutes());

    return output;
  }

  private zerofy(amount: number): string {
    return amount > 9
      ? "" + amount
      : "0" + amount;
  }
}