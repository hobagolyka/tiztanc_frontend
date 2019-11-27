import React, {useState, useEffect} from "react";
import { Button, Row, Container, Modal, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';
import ReactFileReader from 'react-file-reader';
import Formsy from 'formsy-react';
import Input from '../components/Input';
import papa from 'papaparse';

export default function MainPage(props){

    const oldProps = props;
    props = (props.match) ? props.match.params : props;

    let [settings, setSettings] = useState({});
    let [csv, setCsv] = useState("");
    let [data, setData] = useState([]);
    let [objData, setObjData] = useState([]);
    let [danceTypes, setDanceTypes] = useState([]);

    let handleFiles = (files) => {
        let reader = new FileReader();
        reader.onload = function(e) {
            setCsv(reader.result);
        }
        reader.readAsText(files[0]);
    }

    useEffect( () => {

        let obj = {};
        let result = papa.parse(csv);
        setData(result.data)
    }, [csv]);

    useEffect( () => {
        let obj = {};
        let temp = "";
        let danceTypes = [];

        data.forEach((item) => {
            if(item[1] === "" && item[2] === ""){
                obj[item[0]] = [];
                temp = item[0];
                danceTypes.push(temp);
            }
            else {
                obj[temp].push(item);
            }
        });
        setObjData(obj);
        setDanceTypes(danceTypes);
    }, [data]);

    let calc = (persons, limit) => {
        let cnt = Math.ceil(persons / limit);
        let mod = persons%cnt;
        let base =  Math.floor(persons / cnt);
        let heat = [];

        for(let i=0; i < cnt; i++){
            if(mod > 0)
                heat.push(base+1);
            else
                heat.push(base);
            mod = mod-1;
        }
        return heat;
    }

    let roundCount = (heatSum, final, percent) => {
        let rounds = [];

        while(heatSum > final){
            if(Math.ceil(final/percent) > heatSum) {
                let minus = heatSum - final;
                rounds.push(heatSum);
                heatSum = heatSum - minus;
            }
            else {
                rounds.push(heatSum);
                heatSum = Math.ceil(heatSum*percent);
            }
            console.log(heatSum);
        }
        rounds.push(heatSum);
        console.log(rounds);
    }

    return(
        <Container className="MainContainer">
            <Formsy>
                <Row>
                    <div className="col-11 mt-4">
                        <h5>Verseny esemény létrehozása</h5>
                    </div>
                    <div className="col-1 mt-4">
                        <Link to="/"><Button variant="dark">Vissza</Button></Link>
                    </div>
                </Row>
                <Row>
                    <div className="col-6 mt-2">
                        <Input name="name" type="text" title="Verseny neve" value="2019 záróverseny"/>
                    </div>
                    <div className="col-4 mt-2">
                        <Input name="token" type="text" title="Pontozó token" value={Math.floor(Math.random()*100000)}/>
                    </div>
                    <div className="col-2 mt-2">
                        <Input name="judges" type="number" title="Bírók száma" value={4}/>
                    </div>
                </Row>
                <Row>
                    <div className="col-4">
                        <Input name="choosens" type="number" title="Továbbjutók száma (%)" value={50}/>
                    </div>
                    <div className="col-4">
                        <Input name="limit" type="number" title="Parkett férőhely (pár)" value={20}/>
                    </div>
                    <div className="col-4">
                        <Input name="final" type="number" title="Döntőbe jutók száma (pár)" value={6}/>
                    </div>
                </Row>
                <Row>
                    <div className="col-6 mt-3">
                        <ReactFileReader handleFiles={handleFiles} fileTypes={'.csv'}>
                            <Button variant="dark">Párok feltöltése CSV-ben</Button>
                        </ReactFileReader>
                    </div>
                    <div className="col-6 mt-3" align="right">
                        <Button variant="warning" type="submit">Verseny menetrend számítása</Button>
                    </div>
                </Row>
            </Formsy>
            <Row>
                <div className="col-12 mt-3">
                    <Table>
                        <thead>
                        <tr>
                            <th scope="col">Tánc típus és szint</th>
                            <th scope="col">Versenyző párok száma</th>
                            <th scope="col">Heatek száma (párok/heat)</th>
                            <th scope="col">Körök száma</th>
                        </tr>
                        </thead>

                        { danceTypes.map((item) => (
                                <tr>
                                    <td>{item || ""}</td>
                                    <td>{objData[item].length || ""}</td>
                                    <td>{calc(objData[item].length, 20).length} ({calc(objData[item].length, 20).toString()})</td>
                                    <td></td>
                                </tr>
                        ))
                        }
                    </Table>
                </div>
            </Row>
            <Row>
                <div className="col-12 mt-3">
                    <Table>
                        { danceTypes.map((item) => (

                            objData[item].map((i) => (
                                <tr>
                                    <td>{item || ""}</td>
                                    <td>{i[0] || ""}</td>
                                    <td>{i[1] || ""}</td>
                                    <td>{i[2] || ""}</td>
                                </tr>
                            ))
                        ))
                        }
                    </Table>
                </div>
            </Row>
        </Container>
    );
}