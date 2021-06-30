import React from 'react';
import Button from './Button';
import './History.css';

function History({className, onClick, formula, result}) {
    return (
        <div className={className}>
            <Button className='history-btn' onClick={onClick} text={formula}/>
            <h5>=</h5>
            <Button className='history-btn' onClick={onClick} text={result}/>
        </div>

    );
}

export default History;