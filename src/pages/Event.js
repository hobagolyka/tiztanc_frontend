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

    let [heats, setHeats] = useState([]);
    let [roundIndex, setRoundIndex] = useState(-1);
    let [event, setEvent] = useState({});
    let [allData, setAllData] = useState([]);
    let [judges, setJudges] = useState([]);
    let [token, setToken] =useState("");

    useEffect(() => {

        axios.get(`http://localhost:3001/get_actual_event`)
            .then(res => {
                setAllData(res.data);
                setEvent(res.data[0]);
                setToken(res.data[0].judgeToken);
            })
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:3001/get_judges`)
            .then(res => {
                setJudges(res.data);
            })
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:3001/get_heats`)
            .then(res => {
                setHeats(res.data);
            })
    }, []);

    useEffect(() => {
        if(token !== "")
            axios.get(`http://localhost:3001/get_active_heat/` + token)
                .then(res => {
                    setRoundIndex(res.data[0].roundIndex);
                })
    }, [token]);

    let getNext = () => {
        axios.get(`http://localhost:3001/get_next_heat/` + roundIndex)
            .then(res => {
            })
    }

    let Heats = ({}) => {

        let firstIndex = 0;
        let temp = [];
        let arr = [];
        let obj = {};

        heats.forEach( (i) => {
            obj[i.roundIndex] = [];
        });

        heats.forEach( (i) => {
            obj[i.roundIndex].push(i);
        });

        var keys = Object.keys(obj);

        return <>{
            keys.map((item) => (
                <Row>
                    {  obj[item][0] ? obj[item][0].roundIndex === roundIndex ?
                        <div className="col-4 mt-3"><b>{obj[item][0] ? obj[item][0].danceType : ""} ({obj[item].length} fő) - aktív verseny</b></div>
                        :
                        <div className="col-4 mt-3">{obj[item][0] ? obj[item][0].danceType : ""} ({obj[item].length} fő)</div>
                        :
                        <div className="col-4 mt-3"></div>
                    }
                    <div className="col-8 mt-3">
                        <Table>
                            <thead>
                            <tr>
                                <th scope="col">Azonosító</th>
                                <th scope="col">Pár</th>
                                <th scope="col">Pár</th>
                                <th scope="col">Iskola</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                obj[item].map((i) => (
                                    <tr>
                                        <td>{i.idPair}</td>
                                        <td>{i.name1}</td>
                                        <td>{i.name2}</td>
                                        <td>{i.school}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </div>
                </Row>
            ))
        }</>
    }

    return(
        <Container className="MainContainer">
            <Row>
                <div className="col-11 mt-4">
                    <h1>Aktív esemény</h1>
                </div>
                <div className="col-1 mt-4">
                    <Link to="/"><Button variant="dark">Vissza</Button></Link>
                </div>
            </Row>
            <Row>
                <div className="col-12 mt-3" >
                    <h5>{event.name}</h5>
                    <h6>{event.date}</h6>
                </div>
            </Row>
            <Row>
                <div className="col-12 mt-3">
                    <Table className={"table table-striped"}>
                        <thead>
                        <tr>
                            <th scope="col">Továbbjutók száma</th>
                            <th scope="col">Parkett férőhely</th>
                            <th scope="col">Döntőbe jutók száma</th>
                            <th scope="col">Pontozó token</th>
                        </tr>
                        </thead>
                        <tbody>

                        <tr>
                            <td>{ event.percent } %</td>
                            <td>{ event.pairLimit }</td>
                            <td>{ event.finalLimit }</td>
                            <td>{ event.judgeToken }</td>
                        </tr>

                        </tbody>
                    </Table>
                </div>
            </Row>
            <Row>
                <div className="col-12 mt-3">
                    <Table className={"table table-striped"}>
                        <thead>
                        <tr>
                            <th scope="col">Szavazotot leadott pontozó bírók</th>
                        </tr>
                        </thead>
                        <tbody>

                        <tr>
                            <td>
                                {
                                    judges.map((i)=>(
                                        <span>{i.judge_name + ', '} </span>
                                    ))
                                }
                            </td>
                        </tr>

                        </tbody>
                    </Table>
                </div>
            </Row>
            <Row>
                <div className="col-12 mt-3" align="right">
                    <Button variant={"dark"} onClick={getNext}>Következő verseny</Button>
                </div>
            </Row>
            <Heats/>

        </Container>
    );
}