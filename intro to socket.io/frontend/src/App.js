import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Modal, Button, FormControl, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import io from "socket.io-client";

const connOpt = {
  transports: ["websocket"],
};
let socket = io("https://striveschool.herokuapp.com/", connOpt);
function App() {
  const [username, setUsername] = useState(null);
  const [message, setMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    socket.on("bmsg", (msg) => setMessages(messages.concat(msg)));
  }, [messages]);

  const handleMessage = (e) => {
    setMessage(e.currentTarget.value);
  };
  const sendMessage = (e) => {
    e.preventDefault();
    console.log(message);
    if (message !== "") {
      socket.emit("bmsg", {
        user: username,
        message: message,
      });
      setMessage("");
    }
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="App">
        <ul id="messages" style={{ listStyle: "none" }}>
          {messages.map((msg, i) => (
            <li
              key={i}
              className={username === msg.user ? "text-right" : "text-left"}
            >
              <strong>{msg.user}</strong> {msg.message}
            </li>
          ))}
        </ul>
        <form id="chat" onSubmit={sendMessage}>
          <input autoComplete="off" value={message} onChange={handleMessage} />
          <button>Send</button>
        </form>
      </div>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={toggleModal}
      >
        <Modal.Header>
          <Modal.Title>Set username</Modal.Title>
          <Modal.Body>
            <InputGroup className="mb-3">
              <FormControl
                onChange={(e) => setUsername(e.currentTarget.value)}
              ></FormControl>
            </InputGroup>
          </Modal.Body>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={toggleModal}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
