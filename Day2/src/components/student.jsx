import React, { Component } from "react";
import {
  Container,
  Col,
  Row,
  Table,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export class student extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentId: this.props.match.params.id,
      studentInfo: [],
      projects: [],
      show: false,
      project: {
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        studentId: this.props.match.params.id,
      },
      edit: false,
      currentProject: "",
    };
  }
  componentDidMount = async () => {
    let response = await fetch(
      "http://127.0.0.1:3003/students/" + this.state.studentId,
      {
        method: "GET",
      }
    );
    let projectsResponse = await fetch(
      "http://127.0.0.1:3003/projects/" + this.state.studentId
    );
    let projects = await projectsResponse.json();
    let parsedJson = await response.json();
    let studentInfo = parsedJson;
    console.log(projects);
    this.setState({ studentInfo, projects });
    // this.setState({ studentInfo, projects: studentInfo.projects });
  };
  delProject = async (id) => {
    let response = await fetch("http://127.0.0.1:3003/projects/" + id, {
      method: "DELETE",
      headers: new Headers({
        "content-type": "application/json",
      }),
    });
    if (response.ok) {
      alert("Deleted sucessfully");
    } else {
      alert("Error");
    }
  };
  handleClose = () => {
    this.setState({ show: false, edit: false });
  };
  updateForm = (e) => {
    let id = e.currentTarget.id;
    let project = this.state.project;
    project[id] = e.currentTarget.value;
    this.setState({ project });
  };
  sendProject = async () => {
    let response = await fetch("http://127.0.0.1:3003/projects", {
      method: "POST",
      body: JSON.stringify(this.state.project),
      headers: new Headers({
        "content-type": "application/json",
      }),
    });
    if (response.ok) {
      alert("added");
    }
  };

  editProject = async (project) => {
    this.setState({ edit: true, show: true, project: project });
  };
  sendEditedProject = async (id) => {
    let response = await fetch(`http://127.0.0.1:3003/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(this.state.project),
      headers: new Headers({
        "content-type": "application/json",
      }),
    });
    if (response.ok) {
      alert("edited");
    }
  };
  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col xs={4}>
            <img src={`https://placehold.it/200x200`} alt="" />
          </Col>
          <Col>
            <p>
              Name: <b>{this.state.studentInfo.name}</b>
            </p>
            <p>
              Surname: <b>{this.state.studentInfo.surname}</b>
            </p>
            <p>
              Email: <b>{this.state.studentInfo.email}</b>
            </p>
            <p>
              Date of Birth: <b>{this.state.studentInfo.dateOfBirth}</b>
            </p>
          </Col>
        </Row>
        <Row className="mt-5">
          <p className="display-4 text-center">Projects</p>
          {this.state.projects.length ? (
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
                {this.state.projects.map((project) => {
                  return (
                    <tr>
                      <td>
                        <Link to={`/project/${project._id}`}>
                          {project.name}
                        </Link>{" "}
                      </td>
                      <td>{project.description}</td>
                      <td>{project.startDate.slice(0, -14)}</td>
                      <td>{project.endDate.slice(0, -14)}</td>
                      <td>
                        {" "}
                        <Button
                          variant="danger"
                          onClick={() => this.delProject(project._id)}
                        >
                          Delete
                        </Button>
                      </td>
                      <td>
                        {" "}
                        <Button
                          variant="info"
                          onClick={() => this.editProject(project)}
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : null}
        </Row>
        <Button variant="info" onClick={() => this.setState({ show: true })}>
          Add a Project
        </Button>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Add a Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Name
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    onChange={this.updateForm}
                    id="name"
                    type="text"
                    value={this.state.edit ? this.state.project.name : null}
                    placeholder="Name"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Description
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    onChange={this.updateForm}
                    id="description"
                    type="text"
                    value={
                      this.state.edit ? this.state.project.description : null
                    }
                    placeholder="Short description"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Start date
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    onChange={this.updateForm}
                    id="startDate"
                    value={
                      this.state.edit
                        ? this.state.project.startDate.slice(0, 10)
                        : null
                    }
                    type="date"
                    placeholder="Start"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  End date
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    onChange={this.updateForm}
                    id="endDate"
                    value={
                      this.state.edit
                        ? this.state.project.endDate.slice(0, 10)
                        : null
                    }
                    type="date"
                    placeholder="End"
                  />
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {this.state.edit ? (
              <Button
                variant="primary"
                onClick={() => this.sendEditedProject(this.state.project._id)}
              >
                Edit
              </Button>
            ) : (
              <Button variant="primary" onClick={() => this.sendProject()}>
                Save
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

export default student;
