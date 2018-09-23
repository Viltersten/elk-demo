import * as React from "react";
import { ajax } from "rxjs/ajax";
import RecordView from "./RecordView";

const divStyle = {
  background: "pink",
  color: "brown",
  margin: "1%",
  width: "98%",
  height: "50%"
};

// todo Introduce interface for the state of DataView.
export default class DataView extends React.Component<
  {},
  { message: string, data: any[], email: string, password: string, occasion: Date }> {

  constructor(props: any) {
    super(props);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleOccasion = this.handleOccasion.bind(this);
    this.state = { message: "-", data: [], email: "", password: "", occasion: null };
  }

  componentDidMount() {
    this.restate("message", { text: "ready to authorize", data: [] });
  }

  render() {
    return (
      <div style={divStyle}>
        <div>
          <input type="text" placeholder="email" onChange={this.handleEmail} /> (e.g. careers@elk-studios.com)
          </div>
        <div>
          <input type="password" placeholder="password" onChange={this.handlePassword} /> (e.g. password)
        </div>
        <div>
          <input type="datetime-local" onChange={this.handleOccasion} /> (e.g. 2018-07-16 @ 12:34)
        </div>
        <div>
          <button onClick={() => { this.getRecords(); }}>Search</button>
        </div>
        <div>Status: {this.state.message}</div>
        <table>
          <thead>
            <tr>
              <th>Account</th>
              <th>Mode</th>
              <th>Bet</th>
              <th>Win</th>
              <th>Affected</th>
              <th>Occasion</th>
              <th>Currency</th>
              <th>Feature</th>
              <th>Game</th>
              <th>ID</th>
              <th>Operator</th>
              <th>Purchase</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((_, id) => <RecordView key={id} {..._} />)}
          </tbody>
        </table>
      </div >);
  }

  private restate(type: string, input: any) {
    if (type === "message")
      this.setState({ message: input.text, data: input.data, email: this.state.email, password: this.state.password, occasion: this.state.occasion });
    if (type === "email")
      this.setState({ message: this.state.message, data: this.state.data, email: input, password: this.state.password, occasion: this.state.occasion });
    if (type === "password")
      this.setState({ message: this.state.message, data: this.state.data, email: this.state.email, password: input, occasion: this.state.occasion });
    if (type === "occasion")
      this.setState({ message: this.state.message, data: this.state.data, email: this.state.email, password: this.state.password, occasion: input });
  }

  private handleEmail(data: React.ChangeEvent<HTMLInputElement>) {
    this.restate("email", data.target.value);
  }

  private handlePassword(data: React.ChangeEvent<HTMLInputElement>) {
    this.restate("password", data.target.value);
  }

  private handleOccasion(data: React.ChangeEvent<HTMLInputElement>) {
    this.restate("occasion", data.target.value);
  }

  private getRecords(): void {

    ajax.post(this.tokenUrl(), this.tokenBody(), this.tokenHeader())
      .subscribe(
        result => {
          const token = result.response.partnersession;
          this.restate("message", { text: "authorized " + token, data: [] });

          const auth = { "Authorization": token };
          ajax.get(this.dataUrl(), auth)
            .subscribe(
              result => {
                const rounds = result.response.rounds;
                this.restate("message", { text: "found " + rounds.length + " records", data: rounds });
              },
              error => {
                this.restate("message", { text: "error " + error.status + ", " + error.response.msg, data: [] });
              });
        },
        error => {
          this.restate("message", { text: "error " + error.status + ", " + error.response.msg, data: [] });
        });
  }

  private dataUrl(): string {
    return "https://papi-stage.contentmedia.eu/2.0/roundhistory/rounds?accountId=60137&operatorId=7&dateFrom=" + this.state.occasion + ":00Z";
  }

  private tokenUrl(): string {
    return "https://papi-stage.contentmedia.eu/2.0/auth/authenticate";
  }

  private tokenBody(): any {
    return {
      "email": this.state.email,
      "password": this.state.password
    };
  }

  private tokenHeader(): any {
    return { "Content-Type": "application/json" };
  }
}