import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";

class ProjectsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
    };
  }
  componentDidMount = async () => {
    let response = await fetch("http://127.0.0.1:3003/projects");
    let projects = await response.json();
    this.setState({ projects });
  };
  delProject = async (id) => {
    let response = await fetch(`http://127.0.0.1:3003/projects/${id}`, {
      method: "DELETE",
    });
    alert("Deleted Project");
  };
  render() {
    return (
      <>
        <p className="text-center display-4">All Projects</p>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Student ID</th>
            </tr>
          </thead>
          <tbody>
            {this.state.projects.map((project) => {
              return (
                <tr>
                  <td>{project.name}</td>
                  <td>{project.description}</td>
                  <td>{project.startDate.slice(0, -14)}</td>
                  <td>{project.endDate.slice(0, -14)}</td>
                  <td>{project.studentId}</td>
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
                      onClick={() => this.editProject(project._id)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  }
}

export default ProjectsList;
