import React, {useState} from 'react';
import "./Calculator.css";
import Button from "./Button";
import History from './History';
import HistoryModal from './HistoryModal';
import Modal from 'react-modal';

Modal.setAppElement('*')

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

    const [historyModalOpen, setHistoryModalOpen] = useState(false);

    const modalStyle = {
        overlay: {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
          content: {
            position: 'relative',
            listStyle: 'none',
            width: '33%',
            height: 'fit-content',
            maxHeight: '300px',
            top: '10%',
            left: '33%',
            right: '33%',
            bottom: '10%',
            border: '1px solid #ccc',
            textAlign: 'center',
            backgroundColor: 'white',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '10px',            
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
          }
      }

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

                let tmpArray = history.concat({
                    formula : inputValue, result : tmp_inputvalue
                });
                setHistory(tmpArray);
            } catch (e) {
                if (e instanceof SyntaxError){
                    console.warn("warning!");
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
        setHistoryModalOpen(false);
    }

    function closeHistoryModal(){
        setHistoryModalOpen(false);
    }

    return (        
        <div className='calculator'>
            <div className='calculator-history'>
                {/* history start */}
                <div className='history'>
                    {/* history open button */}
                    <button onClick={() => setHistoryModalOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M3,12.2928932 L3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 C9.83094568,21 7.7795552,20.2294045 6.16280756,18.8505586 C5.45850266,18.2498909 4.84967664,17.5439447 4.359624,16.7587075 C4.21342347,16.5244426 4.2848137,16.2160145 4.51907855,16.069814 C4.75334339,15.9236134 5.06177151,15.9950037 5.20797204,16.2292685 C5.64372413,16.9274972 6.1852566,17.5554151 6.81171475,18.089691 C8.24914371,19.3156047 10.071062,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 L4,12.2928932 L5.14644661,11.1464466 C5.34170876,10.9511845 5.65829124,10.9511845 5.85355339,11.1464466 C6.04881554,11.3417088 6.04881554,11.6582912 5.85355339,11.8535534 L3.85355339,13.8535534 C3.65829124,14.0488155 3.34170876,14.0488155 3.14644661,13.8535534 L1.14644661,11.8535534 C0.951184464,11.6582912 0.951184464,11.3417088 1.14644661,11.1464466 C1.34170876,10.9511845 1.65829124,10.9511845 1.85355339,11.1464466 L3,12.2928932 Z M15.6969596,13.0404275 C15.9507745,13.1492053 16.0683503,13.4431448 15.9595725,13.6969596 C15.8507947,13.9507745 15.5568552,14.0683503 15.3030404,13.9595725 L11.8030404,12.4595725 C11.6717691,12.4033134 11.5708217,12.2936038 11.5256584,12.1581139 L10.0256584,7.65811388 C9.93833446,7.39614222 10.0799145,7.11298224 10.3418861,7.02565835 C10.6038578,6.93833446 10.8870178,7.07991446 10.9743416,7.34188612 L12.4033381,11.6288754 L15.6969596,13.0404275 Z"/>
                        </svg>
                    </button>

                    {/* history modal start */}
                    <Modal isOpen={historyModalOpen} onRequestClose={() => setHistoryModalOpen(false)} style={modalStyle}>
                        {history.map(
                            (value, index) =>
                            (
                                <li key={index}>
                                    <History className='history-line' onClick={onClick_History}
                                        formula={value.formula} result={value.result}/>
                                </li>
                            )
                        )}
                    </Modal>
                    {/* history modal end */}
                    {/* <HistoryModal isOpen={historyModalOpen} onModalClose={closeHistoryModal}/> */}
                </div>
                {/* history end */}
            </div>

            {/* calculator main start */}
            <div className='calculator-main'>
                {/* calculator input & result */}
                <div className='calcul-input'>
                    <h6 className='formula'>{formula}</h6>
                    <input className='input-value' value= {inputValue}
                        onChange={({target: {value}}) => setInputValue(value)}/>
                </div>

                {/* calculator buttons start */}
                <div className='calcul-btns'>
                    {buttonArray.map(
                        (value, index) =>
                        (
                            <li key={index}>
                                <Button className='calcul-btn' onClick={onClick_CalculBtn}
                                    text={value}/>
                            </li>
                        )
                    )}
                </div>
                {/* calculator buttons end */}
            </div>
            {/* calculator main end */}
        </div>
    );
}

export default Calculator;