import React, {useState, useEffect} from 'react';
import "./Calculator.css";
import Button from "./Button";


function Calculator() {
    // const buttonArray = [
    //     ['AC', '', '%', '/'],
    //     ['7', '8', '9', '*'],
    //     ['4', '5', '6', '-'],
    //     ['1', '2', '3', '+'],
    //     ['', '0', '.', '=']
    // ];
    const buttonArray = [
        '', '', '%', 'AC', 
        '7', '8', '9', '/', 
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', '=', '+'
    ];
    const signs=['%', '/', '*', '-', '+'];
    const [inputValue, setInputValue] = useState('');
    const [formula, setFormula] = useState('');
    const [Calculate, setCalculate] = useState(false);

    function onClick(value){
        if(Calculate === true){
            if(value in signs){
                //작동 안 됨.. 왜?
                setInputValue('');
            }
            setFormula(inputValue);
            setCalculate(false);
        }
        if(value === '='){
            setFormula(inputValue);
            setInputValue(eval(inputValue));
            setCalculate(true);
        } else if(value === 'AC') {
            setInputValue('');
        } else {
            setInputValue(inputValue + value);
        }

    }

    return (
        
        <div className='calculator'>
            <div>
                <input value= {inputValue}
                    onChange={({target: {value}}) => setInputValue(value)}/>
            </div>
            <div className='calculator_btns'>
                {buttonArray.map(
                    (value, index) =>
                    (
                        <li>
                            <Button className='item-button' onClick={onClick} text={value}/>
                        </li>
                    )
                )}

            </div>
            <div>
                <h1>{formula} </h1>
                <h1>{inputValue} </h1>
            </div>
        </div>
    );
}

export default Calculator;