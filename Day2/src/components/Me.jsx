import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie";

export class Me extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentInfo: null,
    };
  }
  componentDidMount = async () => {
    let response = await fetch("http://localhost:3003/students/me", {
      method: "GET",
      credentials: "include",
      headers: new Headers({
        "content-type": "application/json",
      }),
    });
    if (response.ok) {
      let studentInfo = await response.json();
      console.log(studentInfo);
      this.setState({ studentInfo });
    } else {
      // alert("login expired");
      //this.props.history.push("/login");
    }
  };

  render() {
    return <div></div>;
  }
}

export default withRouter(Me);
