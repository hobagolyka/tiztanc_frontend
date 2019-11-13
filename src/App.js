import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:3000/test")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }))
        .catch(err => err);
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
        <Container className={"pt-5"}>
            <Row>
                <div className={"col-4 offset-4"} align="center">
                    <Card className={"p-3"}>
                        <img src={"logo_icon.png"} width={"100%"}></img>
                        <Button variant={"dark"}>Create event</Button>
                    </Card>
                </div>
            </Row>
        </Container>
    );
  }
}

export default App;