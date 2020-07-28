import React, { Component } from "react";
import { Container } from "react-bootstrap";

export class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project: "",
    };
  }
  componentDidMount = async () => {
    let response = await fetch(
      `http://127.0.0.1:3003/projects/${this.props.match.params.projectId}`
    );
    let project = await response.json();
    this.setState({ project });
  };
  render() {
    return (
      <Container>
        <p className="display-4 text-center">{this.state.project.name}</p>
        <p className="mt-4 text-center">{this.state.project.description}</p>
      </Container>
    );
  }
}

export default Project;
