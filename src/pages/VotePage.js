import React, {useState, useEffect, useLayoutEffect} from "react";
import { Button, Row, Container, Modal, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';
import ReactFileReader from 'react-file-reader';
import Formsy from 'formsy-react';
import Input from '../components/Input';
import papa from 'papaparse';
import axios from 'axios';
import CheckBox from '../components/checkbox'

export default function VotePage(props){

    const oldProps = props;
    props = (props.match) ? props.match.params : props;

    let [dancers, setDancers] = useState([]);
    let [dance, setDance] = useState("");
    let [event, setEvent] = useState({});
    let [loading, setLoading] = useState(0);
    let [init, setInit] = useState(false);

    useEffect(() => {

        axios.get(`http://localhost:3001/get_active_heat/` + props.token)
            .then(res => {
                setDancers(res.data);
                setDance(res.data[0].danceType)
                setInit(true)
            })
    }, []);

    useEffect(() => {

        axios.get(`http://localhost:3001/get_event`)
            .then(res => {
                setEvent(res.data[0]);
            })
    }, []);


    let submit = (values) => {

        values.idEvent = event.idEvent;
        values.roundIndex = dancers[0].roundIndex;
        values.danceType = dance;

        setLoading(1);

        axios.post('http://localhost:3001/save_next_heat/' + dancers[0].roundIndex, { values })
            .then(res => {
                setLoading(2);
            })
    }

    return(
        <>
            {  init ? <Container className="MainContainer">
                    <Row>
                        <div className="col-12 mt-3" align="center">
                            <h2><i className="fas fa-person-booth"></i> Pontozás </h2>
                        </div>
                    </Row>
                    <Formsy onSubmit={submit}>
                        <Row>
                            <div className="col-4 offset-4">
                                <Input name="name" title={"Név"}/>
                            </div>
                        </Row>

                        <hr/>
                        <Row>
                            <div className="col-12 mt-3" align="center">
                                <h5>{event.name}</h5>
                                <h6>{event.date}</h6>
                                <h6>{dance}</h6>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-12 mt-3" align="center">
                                <h6>Versenyző párok száma: {dancers.length}</h6>
                                <h6>Kiosztható szavazatok száma: {Math.ceil(dancers.length / 100 * event.percent)}</h6>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-4 offset-4 mt-3">
                                <Table>
                                    <thead>
                                    <tr>
                                        <th scope="col">Pár azonosítója</th>
                                        <th scope="col">Szavazat</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        dancers.map((item) => (
                                            <tr>
                                                <td>{item.pairId}</td>
                                                <td><CheckBox name={item.pairId}/></td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </Table>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-12 mt-3 mb-3" align="center">
                                {
                                    loading === 0 ?
                                        <Button variant={"danger"} type={"submit"}>Szavazat véglegesítése</Button> : loading === 1 ?
                                        <div className="spinner-border text-danger" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div> : <div className="alert alert-success" role="alert">
                                            Szavazat elküldve
                                        </div>
                                }
                            </div>
                        </Row>
                    </Formsy>
                </Container>
                :
                <Container className="MainContainer">
                    <Row>
                        <div className="col-12 mt-5 mb-5" align="center">
                            <div className="spinner-border text-danger" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </Row>
                </Container>
            }
        </>
    );

}