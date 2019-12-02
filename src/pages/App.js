import React, { Component } from "react";
import '../App.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';

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
                        <Link to="/newEvent"><Button variant={"dark"}>Esemény létrehozása</Button></Link>
                        <Link to="/getEvents" className="mt-2"><Button variant={"outline-dark"}>Események</Button></Link>
                        <Link to="/votePage/a" className="mt-2"><Button variant={"outline-dark"}>Aktív verseny pontozása</Button></Link>
                        <Link to="/getEvent" className="mt-2"><Button variant={"outline-dark"}>Aktív esemény</Button></Link>
                    </Card>
                </div>
            </Row>
        </Container>
    );
  }
}

export default App;