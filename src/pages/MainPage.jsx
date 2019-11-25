import React, {useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import ReactFileReader from 'react-file-reader';
import Formsy from 'formsy-react';
import Input from '../components/Input';

export default function MainPage(props){

    const oldProps = props;
    props = (props.match) ? props.match.params : props;

    let [settings, setSettings] = useState({});

    let handleFiles = (files) => {
        var reader = new FileReader();
        reader.onload = function(e) {
            // Use reader.result
            alert(reader.result)
        }
        reader.readAsText(files[0]);
    }

    let calculate = (values) => {
        setSettings(values);
        let testobj = {limit: 20, persons: 123, pass: 60, final: 6};

        let rounds = 
        console.log(values);
    }

    return(
        <Container className="MainContainer">
            <Formsy onSubmit={calculate}>
                <Row>
                    <div className="col-11 mt-4">
                        <h5>Verseny esemény létrehozása</h5>
                    </div>
                    <div className="col-1 mt-4">
                        <Link to="/"><Button variant="dark">Vissza</Button></Link>
                    </div>
                </Row>
                <Row>
                    <div className="col-12 mt-4">
                        <div className="input-group flex-nowrap">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="addon-wrapping">Verseny neve</span>
                            </div>
                            <input type="text" className="form-control" aria-describedby="addon-wrapping" name="name"/>
                        </div>
                    </div>
                </Row>
                <Row>
                    <div className="col-12">
                        <div className="input-group flex-nowrap mt-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="addon-wrapping1">Verseny fajtája</span>
                            </div>
                            <input type="text" className="form-control" aria-describedby="addon-wrapping1" name="type"/>
                        </div>
                    </div>
                </Row>
                <Row>
                    <div className="col-12">
                        <div className="input-group flex-nowrap mt-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="addon-wrapping2">Verseny szintje</span>
                            </div>
                            <input type="text" placeholder="E, D, C, B, A, S, egyéb" className="form-control" aria-describedby="addon-wrapping2" name="level"/>
                        </div>
                    </div>
                </Row>
                <hr/>
                <Row>
                    <div className="col-3">
                        <div className="input-group flex-nowrap mt-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="addon-wrapping3">Versenyzők száma</span>
                            </div>
                            <input type="number" className="form-control" aria-describedby="addon-wrapping3" name="persons"/>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="input-group flex-nowrap mt-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="addon-wrapping4">Továbbjutók száma</span>
                            </div>
                            <input type="number" placeholder="50% általában" className="form-control" aria-describedby="addon-wrapping4" name="choosens"/>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="input-group flex-nowrap mt-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="addon-wrapping5">Parkett férőhely</span>
                            </div>
                            <input type="number" placeholder="20" className="form-control" aria-describedby="addon-wrapping5" name="limit"/>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="input-group flex-nowrap mt-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="addon-wrapping6">Döntőbe jutók száma</span>
                            </div>
                            <input type="number" placeholder="6" className="form-control" aria-describedby="addon-wrapping6" name="final"/>
                        </div>
                    </div>
                </Row>
                <hr/>
                <Row>
                    <div className="col-12">
                        <Input name="token" type="text" />
                    </div>
                </Row>
                <Row>
                    <div className="col-12 mt-3">
                        <ReactFileReader handleFiles={handleFiles} fileTypes={'.csv'}>
                            <Button variant="dark">Párok feltöltése CSV-ben</Button>
                        </ReactFileReader>
                    </div>
                </Row>
                <Row>
                    <div className="col-12 mt-3">
                        <Button variant="warning" type="submit">Verseny menetrend számítása</Button>
                    </div>
                </Row>
            </Formsy>
        </Container>
    );
}