import React from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import Results from "./components/Results";
import "bootstrap/dist/css/bootstrap.min.css";
import {} from "react-router-dom";

interface searchQuery {
  query: string;
}

class App extends React.Component<{}, searchQuery> {
  state = {
    query: "",
  };
  setQuery = (query: string) => {
    this.setState({ query });
  };
  render() {
    return (
      <div className="App">
        <SearchBar myFunc={this.setQuery} />
        <Results searchquery={this.state.query} />
      </div>
    );
  }
}

export default App;
