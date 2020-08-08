import React, { Component, ChangeEvent } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

interface state {
  query: string;
}
interface props {
  myFunc(query: string): void;
}

export class SearchBar extends Component<props, state> {
  state = {
    query: "",
  };
  updateQuery = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.currentTarget.value });
  };
  render() {
    return (
      <div>
        <Form inline>
          <FormControl
            onChange={this.updateQuery}
            type="text"
            value={this.state.query}
            placeholder="Search"
            className="mr-sm-2"
          />
          <Button
            onClick={() => this.props.myFunc(this.state.query)}
            variant="outline-success"
          >
            Search
          </Button>
        </Form>
      </div>
    );
  }
}

export default SearchBar;
