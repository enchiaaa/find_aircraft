import React, { useState } from 'react'
import "./RecordBoard.scss"
import axios from "axios"

const RecordBoard = (props) => {
    const [grade, setGrade] = useState({
        player_name:"",
        player_click_count: null
    });

    const handleChange = (e) => {
        setGrade((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
            "player_click_count": props.clickCount
        }));
    };

    const checkClick = async e  =>{
        e.preventDefault();
        console.log(grade);
        try {
            await axios.post("http://localhost:8800/all_grades", grade); // 把 grade 物件傳給後端
            props.setIsAlreadyRecorded(true);
            props.recordClicked();
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <div className='recordBoard'>
        <div className="container">
            <div className="title">
                <span>紀錄成績</span>
            </div>
            <div className="info">
                <div className="nameInput">
                    <span>登記名稱</span>
                    <input name="player_name" onChange={handleChange} type='text' placeholder='點擊輸入名稱'></input>
                </div>
                <span>點擊次數 {props.clickCount} 次</span>
            </div>
            <div className="buttons">
                <input type="submit" id="submit" onClick={checkClick} value="確認"></input>
                <button id="cancel" onClick={props.recordClicked}>取消</button>
            </div>
        </div>
    </div>
  )
}

export default RecordBoard
