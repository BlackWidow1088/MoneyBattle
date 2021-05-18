import React, {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import './Dice.scss';

export default (props) => {
    const [dice1, setDice1] = useState(1);
    const [dice2, setDice2] = useState(1);
    const rollDices = () => {
        let d1 = Math.floor(Math.random() * 6) + 1;
        let d2 = Math.floor(Math.random() * 6) + 1;
        setDice1(d1);
        setDice2(d2);
        props.setValues({dice1: d1, dice2: d2});
    }
    return (
        <div class='dice-container'>
            <Button onClick={rollDices}>
                Roll
            </Button>
            <div>
                <span>Number on 1st dice:<span>{dice1}</span></span>
                <span>Number on 2nd dice:<span>{dice2}</span></span>
            </div>
        </div>
    )
}