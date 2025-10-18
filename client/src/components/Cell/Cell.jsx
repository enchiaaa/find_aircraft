import React, { useState } from 'react'
import "./Cell.scss"


const Cell = ({ info, setClickCount }) => {
    const clicked = () =>{
        info.isClicked = true;
        setClickCount(prevClick => prevClick + 1);
    }

    {
        if(info.isClicked){
            if (info.ans === 1) {
                return <button className='cell_opened_body'></button>
            }
            else if (info.ans === 2){
                
                return <button className='cell_opened_head'></button>
            }
            else return <button className='cell_opened_none'></button>
        }
        else{
            return <button onClick={clicked} className='cell'></button>
        }
    }

}

export default Cell
