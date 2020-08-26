import React, { Component } from "react";
import { withRouter } from "react-router-dom";

export class Me extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentInfo: null,
    };
  }
  componentDidMount = async () => {
    const token = localStorage.getItem("token");
    let response = await fetch("http://localhost:3003/students/me", {
      method: "GET",
      headers: new Headers({
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    });
    if (response.ok) {
      let studentInfo = await response.json();
      this.setState({ studentInfo });
    } else {
      alert("login expired");
      this.props.history.push("/login");
    }
  };

  render() {
    return <div></div>;
  }
}

export default withRouter(Me);
