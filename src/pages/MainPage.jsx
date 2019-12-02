import React, {useState, useEffect} from "react";
import { Button, Row, Container, Modal, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';
import ReactFileReader from 'react-file-reader';
import Formsy from 'formsy-react';
import Input from '../components/Input';
import papa from 'papaparse';
import axios from 'axios';

export default function MainPage(props){

    const oldProps = props;
    props = (props.match) ? props.match.params : props;

    let [settings, setSettings] = useState({});
    let [csv, setCsv] = useState("");
    let [data, setData] = useState([]);
    let [objData, setObjData] = useState([]);
    let [danceTypes, setDanceTypes] = useState([]);
    let [loading, setLoading] = useState(true);
    let [success, setSuccess] = useState(0);


    let handleFiles = (files) => {
        let reader = new FileReader();
        reader.onload = function(e) {
            setCsv(reader.result);
        }
        reader.readAsText(files[0]);
    }

    let onSubmit = (values) => {
        setSettings(values);
        setLoading(false);
        schedule();
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
    }, [data, settings]);

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
        }
        rounds.push(heatSum);
        return rounds;
    }

    let schedule = () => {
        let heatsByType = {};

        danceTypes.forEach((item) => {
            let heatArray = calc(objData[item].length, settings.limit);
            let heats = [];
            let index = heatArray.length-1;
            let cnt = heatArray[index];

                objData[item].forEach( (i) => {
                    let heat = [];

                    for(let j = 0; j < cnt; j++) {
                        heat.push(i);
                    }
                if(heat.length !== 0)
                    heats.push(heat);

                    index = index - 1;
                    cnt = heatArray[index];
                });

            heatsByType[item] = heats;
            });

        return heatsByType;
    }

    let createEvent = () => {
        let eventData = settings;
        let heatsByType = schedule();
        settings["heats"] = heatsByType;

        setSuccess(1);

        axios.post(`http://localhost:3001/save_event`, { eventData })
            .then(res => {
                setSuccess(2)
            })
    }

    let S = ({item}) => {
        let heatsByType = schedule();

        return <tbody>
        {
            heatsByType[item].map((i) => (
                <tr>
                    <td>{item || ""}</td>
                    <td>{i.length}</td>
                </tr>
            ))
        }
        </tbody>
    }

    let A = ({item}) => {
        let arr = roundCount(objData[item].length, settings.final, settings.percent / 100) || [];
        return <Table>
            <thead>
            <tr>
                <th scope="col">Össz létszám</th>
                <th scope="col">Körök száma</th>
            </tr>
            </thead>
            {
            arr.map( (i) => (
                <tr>
                    <td>{i}</td>
                    <td>{calc(i, settings.limit).length} ({calc(i, settings.limit).toString()})</td>
                </tr>
            ))}
            </Table>
    }

    let X = ({}) => {
        let obj = {};
        danceTypes.forEach( (item) => {
            let arr = roundCount(objData[item].length, settings.final, settings.percent / 100) || [];
            let a = [];
            arr.forEach((jej) => {
                    a.push(calc(jej, settings.limit))
                }
            )
            obj[item] = a;
        });
        danceTypes.map((i) => {
            obj[i].forEach((j) => {
                console.log(i + '  ' + j)
            })
        });

        return <tbody>
        {
            danceTypes.map((i) => (
                obj[i].forEach((j) => (
                    <tr>
                        <td>{i || "asd"}</td>
                        <td>
                            {j || "asd"}
                        </td>
                        <td>
                            sdasd
                        </td>
                    </tr>
                ))
            ))
        }
        </tbody>
    }

return(
    <Container className="MainContainer">

        <Formsy onSubmit={onSubmit}>
            <Row>
                <div className="col-11 mt-4">
                    <h1>Verseny esemény létrehozása</h1>
                </div>
                <div className="col-1 mt-4">
                    <Link to="/"><Button variant="dark">Vissza</Button></Link>
                </div>
            </Row>
            <Row>
                <div className="col-3 mt-2">
                    <Input name="name" type="text" title="Név" value="2019 záróverseny"/>
                </div>
                <div className="col-3 mt-2">
                    <Input name="date" type="date" title="Dátum"/>
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
                    <Input name="percent" type="number" title="Továbbjutók száma (%)" value={50}/>
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
                        <Button type="submit" variant="dark">Párok feltöltése CSV-ben</Button>
                    </ReactFileReader>
                </div>
                <div className="col-6 mt-3" align="right">
                    <Button type="submit" variant="warning" type="submit">Verseny menetrend számítása</Button>
                </div>
            </Row>
        </Formsy>
        { loading ? <></> :
            <>
        <Row>
            <div className="col-12 mt-3">
                <Table>
                    <thead>
                    <tr>
                        <th scope="col">Tánc típus és szint</th>
                        <th scope="col">Versenyző párok száma</th>
                        <th scope="col">Körök és heatek, fajtánként</th>
                    </tr>
                    </thead>

                    { danceTypes.map((item) => (
                        <tr>
                            <td>{item || ""}</td>
                            <td>{objData[item].length || ""}</td>
                            <td>
                                <A item={item}></A>
                            </td>
                        </tr>
                    ))
                    }
                </Table>
            </div>
        </Row>
        <Row>
            <div className="col-12 mt-5">
                <h4  align="center">Sorrend</h4>
                <Table>
                    <thead>
                    <tr>
                        <th scope="col">Tánc típus és szint</th>
                        <th scope="col">Létszám</th>
                    </tr>
                    </thead>

                    { danceTypes.map((item) => (
                        <S item={item}></S>
                        )
                    )
                    }
                </Table>
            </div>
        </Row>
        </>
        }
        <Row>
            <div className="col-12 mt-3 mb-3" align="center">
                {
                    success === 0 ? <Button variant="success" onClick={createEvent}>Esemény létrehozása</Button> : loading === 1 ? <div className="spinner-border text-danger" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> : <div className="alert alert-success" role="alert">
                        Esemény sikeresen létrehozva!
                    </div>
                }

            </div>
        </Row>
    </Container>
);
}