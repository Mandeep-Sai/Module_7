import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import sendStudentForm from "./components/sendStudentForm";
import projects from "./components/projects";
import student from "./components/student";
import Project from "./components/Project";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Me from "./components/Me";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={sendStudentForm} />
        <Route path="/login" exact component={Login} />
        <Route path="/student/:id" component={student} />
        <Route path="/me" component={Me} />
        <Route path="/projects/:studentsId/projects" component={projects} />
        <Route path="/project/:projectId" component={Project} />
      </Router>
    );
  }
}

export default App;
