import React, {useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import ReactFileReader from 'react-file-reader';

export default function MainPage(props){

    const oldProps = props;
    props = (props.match) ? props.match.params : props;

    let [signed, setSigned] = useState(props.signed);

    useEffect( () => setSigned(props.signed), [props.signed]);

    let canEdit = (scope) => scope === "SIGN" || scope === "WRITE";

    return(
        <Container className="MainContainer">
            <form>
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
                        <div className="input-group flex-nowrap mt-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="addon-wrapping7">Pontozó token</span>
                            </div>
                            <input type="text" className="form-control" aria-describedby="addon-wrapping7" name="token"/>
                        </div>
                    </div>
                </Row>
                <Row>
                    <div className="col-12 mt-3">
                    <Button variant="dark">Párok feltöltése CSV-ben</Button>
                    </div>
                </Row>
            </form>
        </Container>
    );
}