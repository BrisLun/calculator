import React, {useState, useEffect} from 'react';
import "./Calculator.css";
import Button from "./Button";
import History from './History';
import HistoryModal from './HistoryModal';


function Calculator() {
    const buttonArray = [
        '', '%', '/', 'AC', 
        '7', '8', '9', '*', 
        '4', '5', '6', '-',
        '1', '2', '3', '+',
        '', '0', '.', '='
    ];
    const signs=['%', '/', '*', '-', '+'];
    const [inputValue, setInputValue] = useState('');
    const [formula, setFormula] = useState('');
    const [Calculate, setCalculate] = useState(false);
    const [history, setHistory] = useState([]);

    let open_history = false;


    // calculator button clicked
    function onClick_CalculBtn(value){
        let tmp_inputvalue = inputValue;
        setInputValue('');

        // after calculate.
        if(Calculate === true){
            // if input value is number, reset.
            if(!signs.includes(value)){
                tmp_inputvalue = ''
            }
            setFormula(inputValue);
            setCalculate(false);
        }

        // input =. calculate.
        if(value === '='){
            try {
                // nothing to calculate
                if (inputValue === ''){
                    throw Error;
                }

                // evaluate formula -> can occur error
                tmp_inputvalue = eval(tmp_inputvalue);

                setFormula(inputValue);
                setInputValue(tmp_inputvalue);
                setCalculate(true);

                let tmpArray = history.concat({formula : inputValue, result : tmp_inputvalue});
                setHistory(tmpArray);
            } catch (e) {
                if (e instanceof SyntaxError){
                    console.log("warning!");
                }
            }

        } 
        
        //input AC. reset.
        else if(value === 'AC') {
            setInputValue('');
        } 
        
        // input others
        else {
            setInputValue(tmp_inputvalue + value);
        }
    }

    // history button clicked
    function onClick_History(value){
        setInputValue(value);
    }


    return (        
        <div className='calculator'>
            {/* calculator input & result */}
            <div className='calcul-input'>
                <h6 className='formula'>{formula}</h6>
                <input className='input-value' value= {inputValue}
                    onChange={({target: {value}}) => setInputValue(value)}/>
            </div>

            {/* calculator buttons */}
            <div className='calcul-btns'>
                {buttonArray.map(
                    (value, index) =>
                    (
                        <li>
                            <Button className='calcul-btn' onClick={onClick_CalculBtn} text={value}/>
                        </li>
                    )
                )}

            </div>
            <div className='history'>
                <button onClick={
                    () => {open_history = true;}
                }>history</button>

                <HistoryModal/>
                {history.map(
                    (value, index) =>
                    (
                        <li>
                            <History className='history-line' onClick={onClick_History}
                                formula={value.formula} result={value.result}/>
                        </li>
                    )
                )}

            </div>
        </div>
    );
}

export default Calculator;