import React, {
  Component,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { Link } from "react-router-dom";

interface SearchQuery {
  searchquery: string;
}
interface Song {
  album: object;
  title: string;
  artist: object;
  id: number;
}

// class Results extends Component<SearchQuery, SearchResults> {
function Results(props: SearchQuery) {
  /*
  const [searchResults, setsearchResults]: [
    SearchResults,
    Dispatch<SetStateAction<SearchResults>>
  ] = useState({
    results: [
      {
        album: {},
        title: "",
        artist: {},
        id: 0,
      },
    ],
    loading:true
  });
  */
  const [searchResults, setsearchResults] = useState<Song[]>();
  const [loading, setLoading] = useState(true);

  // const [searchResults, setsearchResults] = useState([]);

  useEffect(() => {
    fetch(
      "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + props.searchquery,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          "x-rapidapi-key":
            "49a206362dmshb20519b822912b7p1dc792jsn37f9d0304fcc",
        },
      }
    )
      .then((response) => response.json())
      .then((parsedResponse) => {
        setsearchResults(parsedResponse.data);
      });
  }, [props.searchquery]);
  /*
  componentDidUpdate = async (prevProps: SearchQuery) => {
    if (prevProps.searchquery !== this.props.searchquery) {
      let response = await fetch(
        "https://deezerdevs-deezer.p.rapidapi.com/search?q=" +
          this.props.searchquery,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key":
              "49a206362dmshb20519b822912b7p1dc792jsn37f9d0304fcc",
          },
        }
      );
      let parsed = await response.json();
      console.log(parsed);
      this.setState({ results: parsed.data });
    }
  };
*/
  //render() {
  return (
    <div>
      <ListGroup>
        {searchResults === undefined
          ? null
          : searchResults.map((result) => {
              return <ListGroupItem>{result.title}</ListGroupItem>;
            })}
      </ListGroup>
    </div>
  );
}

export default Results;
