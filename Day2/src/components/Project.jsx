import React, { Component } from "react";
import { Container, Button, Form, Modal, Col, Row } from "react-bootstrap";
import { AiFillStar } from "react-icons/ai";
import { IconContext } from "react-icons";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;
export class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project: "",
      show: false,
      edit: false,
      review: {
        comment: "",
        rate: "",
        projectId: this.props.match.params.projectId,
      },
      reviews: [],
    };
  }
  componentDidMount = async () => {
    let response = await fetch(
      `http://127.0.0.1:3003/projects/project/${this.props.match.params.projectId}`
    );
    let project = await response.json();
    let reviewResponse = await fetch(
      `http://127.0.0.1:3003/reviews/${this.props.match.params.projectId}`
    );
    let reviews = await reviewResponse.json();
    this.setState({ project, reviews });
  };
  handleClose = () => {
    this.setState({ show: false, edit: false });
  };
  updateReview = (e) => {
    let review = this.state.review;
    let id = e.currentTarget.id;
    review[id] = e.currentTarget.value;
    this.setState({ review });
  };
  sendReview = async () => {
    let response = await fetch("http://127.0.0.1:3003/reviews", {
      method: "POST",
      body: JSON.stringify(this.state.review),
      headers: new Headers({
        "content-type": "application/json",
      }),
    });
    if (response.ok) {
      alert("Added your review");
    }
  };
  render() {
    return (
      <Container>
        <>
          <p className="display-4 text-center">
            {this.state.project.name} by {this.props.student.name}
          </p>
          <p className="mt-4 text-center">{this.state.project.description}</p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Started on : {this.state.project.startDate}</p>
            <p>Finished on : {this.state.project.endDate}</p>
          </div>
          <p className="display-4" style={{ fontSize: "24px" }}>
            Reviews
          </p>
          {this.state.reviews.length > 0 ? (
            <Container>
              {this.state.reviews.map((review) => {
                return (
                  <div>
                    <p>
                      {review.rate}
                      <IconContext.Provider value={{}}>
                        <AiFillStar />
                      </IconContext.Provider>
                      - {review.comment}
                    </p>
                  </div>
                );
              })}
            </Container>
          ) : (
            <p>No Reviews for the Project</p>
          )}
          <Button variant="info" onClick={() => this.setState({ show: true })}>
            Add Review
          </Button>
          <Modal
            show={this.state.show}
            onHide={this.handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title className="text-center">Submit Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Comment
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      onChange={this.updateReview}
                      id="comment"
                      type="text"
                      value={this.state.edit ? this.state.project.name : null}
                      placeholder="Your review"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Rate
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      onChange={this.updateReview}
                      id="rate"
                      type="number"
                      value={this.state.edit ? this.state.project.name : null}
                      placeholder="Rate out of 5"
                    />
                  </Col>
                </Form.Group>
                {this.state.edit ? (
                  <Button
                    variant="primary"
                    onClick={() => this.sendEditedReview(this.state.review._id)}
                  >
                    Edit
                  </Button>
                ) : (
                  <Button variant="primary" onClick={() => this.sendReview()}>
                    Save
                  </Button>
                )}
              </Form>
            </Modal.Body>
          </Modal>
        </>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(Project);
