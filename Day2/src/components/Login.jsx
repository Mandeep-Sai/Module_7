import React, { Component } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginDetails: {
        email: "",
        password: "",
      },
    };
  }
  updateLoginDetails = (e) => {
    let id = e.currentTarget.id;
    let loginDetails = this.state.loginDetails;
    loginDetails[id] = e.currentTarget.value;
    this.setState({ loginDetails });
  };

  loginHandler = async () => {
    let response = await fetch("http://127.0.0.1:3003/students/login", {
      method: "POST",
      body: JSON.stringify(this.state.loginDetails),
      headers: new Headers({
        "content-type": "application/json",
      }),
    });
    if (response.ok) {
      const parsedResponse = await response.json();
      localStorage.setItem("token", parsedResponse.jwt);
      this.props.history.push("/me");
    } else {
      alert("Error");
    }
  };

  render() {
    return (
      <Container>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                onChange={this.updateLoginDetails}
                id="email"
                type="text"
                placeholder="Email address"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                onChange={this.updateLoginDetails}
                id="password"
                type="password"
                placeholder="Password"
              />
            </Col>
          </Form.Group>
          <Button
            variant="info"
            style={{ display: "block", margin: "auto" }}
            onClick={this.loginHandler}
          >
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default withRouter(Login);
