import React, {useState, useEffect, useLayoutEffect} from "react";
import { Button, Row, Container, Modal, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';
import ReactFileReader from 'react-file-reader';
import Formsy from 'formsy-react';
import Input from '../components/Input';
import papa from 'papaparse';
import axios from 'axios';
import CheckBox from '../components/checkbox'

export default function Event(props){

    const oldProps = props;
    props = (props.match) ? props.match.params : props;

    let [events, setEvents] = useState([]);
    let [pairs, setPairs] = useState([]);

    useEffect(() => {

        axios.get(`http://localhost:3001/get_events`)
            .then(res => {
                setEvents(res.data);
            })
    }, []);

    return(
        <Container className="MainContainer">
            <Row>
                <div className="col-11 mt-4">
                    <h1>Események</h1>
                </div>
                <div className="col-1 mt-4">
                    <Link to="/"><Button variant="dark">Vissza</Button></Link>
                </div>
            </Row>
            <Row>
                <div className="col-12 mt-3">
                    <Table className={"table table-striped"}>
                        <thead>
                        <tr>
                            <th scope="col">Név</th>
                            <th scope="col">Dátum</th>
                        </tr>
                        </thead>
                        <tbody>
                        { events.map( (i) => (
                            <tr>
                                <td>{i.name}</td>
                                <td>{i.date}</td>
                            </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </div>
            </Row>



        </Container>
    );
}