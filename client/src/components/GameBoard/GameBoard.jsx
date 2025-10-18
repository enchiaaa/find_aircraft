import React, { useEffect, useState } from 'react'
import Cell from '../Cell/Cell';
import "./GameBoard.scss";
import { PiAirplaneTiltFill } from "react-icons/pi";
import { PiTargetBold } from "react-icons/pi";
import { VscDebugRestart } from "react-icons/vsc";
import Backdrop from '../Backdrop/Backdrop';
import RecordModal from '../RecordModal/RecordModal';
import GameEndModal from '../GameEndModal/GameEndModal';

const mapSize = 10;

var aircraftAmount = 3;

class Pos{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

const Direction = Object.freeze({
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
});


const initMap = () => {
    var tmp_map = [];
    for (var i = 0; i < mapSize; i++) {
        var tmp = [];
        for (var j = 0; j < mapSize; j++) {
            tmp.push({
                ans: 0,
                isClicked: false
            });
        }
        tmp_map.push(tmp);
    }
    return tmp_map;
}

const isPosValid = (x, y, map) =>{
    if (x < 0 || y < 0 || x >= mapSize ||
         y >= mapSize || map[x][y].ans === 1 || map[x][y].ans === 2) { 
            return false; 
    }
    return true;
}

const putAircraft = (x, y, map, direction) => {
    if (direction === Direction.UP){
        if (isPosValid(x, y, map) && isPosValid(x + 1, y - 2, map) &&
            isPosValid(x + 1, y - 1, map) && isPosValid(x + 1, y, map) &&
            isPosValid(x + 1, y + 1, map) && isPosValid(x + 1, y + 2, map) &&
            isPosValid(x + 2, y, map) && isPosValid(x + 3, y - 1, map) &&
            isPosValid(x + 3, y, map,) && isPosValid(x + 3, y + 1, map)) {
            map[x][y].ans = 2;
            map[x + 1][y - 2].ans = 1;
            map[x + 1][y - 1].ans = 1;
            map[x + 1][y].ans = 1;
            map[x + 1][y + 1].ans = 1;
            map[x + 1][y + 2].ans = 1;
            map[x + 2][y].ans = 1;
            map[x + 3][y - 1].ans = 1;
            map[x + 3][y].ans = 1;
            map[x + 3][y + 1].ans = 1;
            return true;
        }
        return false;
    }
    else if (direction === Direction.DOWN){
        if (isPosValid(x, y, map) && isPosValid(x - 1, y - 2, map) &&
            isPosValid(x - 1, y - 1, map) && isPosValid(x - 1, y, map) &&
            isPosValid(x - 1, y + 1, map) && isPosValid(x - 1, y + 2, map) &&
            isPosValid(x - 2, y, map) && isPosValid(x - 3, y - 1, map) &&
            isPosValid(x - 3, y, map) && isPosValid(x - 3, y + 1, map)) {
            map[x][y].ans = 2;
            map[x - 1][y - 2].ans = 1;
            map[x - 1][y - 1].ans = 1;
            map[x - 1][y].ans = 1;
            map[x - 1][y + 1].ans = 1;
            map[x - 1][y + 2].ans = 1;
            map[x - 2][y].ans = 1;
            map[x - 3][y - 1].ans = 1;
            map[x - 3][y].ans = 1;
            map[x - 3][y + 1].ans = 1;
            return true;
        }
        return false;
    }
    else if (direction === Direction.LEFT) {
        if (isPosValid(x, y, map) && isPosValid(x - 2, y + 1, map) &&
            isPosValid(x - 1, y + 1, map) && isPosValid(x, y + 1, map) &&
            isPosValid(x + 1, y + 1, map) && isPosValid(x + 2, y + 1, map) &&
            isPosValid(x, y + 2, map) && isPosValid(x - 1, y + 3, map) &&
            isPosValid(x, y + 3, map,) && isPosValid(x + 1, y + 3, map)) {
            map[x][y].ans = 2;
            map[x - 2][y + 1].ans = 1;
            map[x - 1][y + 1].ans = 1;
            map[x][y + 1].ans = 1;
            map[x + 1][y + 1].ans = 1;
            map[x + 2][y + 1].ans = 1;
            map[x][y + 2].ans = 1;
            map[x - 1][y + 3].ans = 1;
            map[x][y + 3].ans = 1;
            map[x + 1][y + 3].ans = 1;
            return true;
        }
        return false;
    }
    else if (direction === Direction.RIGHT) {
        if (isPosValid(x, y, map) && isPosValid(x - 2, y - 1, map) &&
            isPosValid(x - 1, y - 1, map) && isPosValid(x, y - 1, map) &&
            isPosValid(x + 1, y - 1, map) && isPosValid(x + 2, y - 1, map) &&
            isPosValid(x, y - 2, map) && isPosValid(x - 1, y - 3, map) &&
            isPosValid(x, y - 3, map,) && isPosValid(x + 1, y - 3, map)) {
            map[x][y].ans = 2;
            map[x - 2][y - 1].ans = 1;
            map[x - 1][y - 1].ans = 1;
            map[x][y - 1].ans = 1;
            map[x + 1][y - 1].ans = 1;
            map[x + 2][y - 1].ans = 1;
            map[x][y - 2].ans = 1;
            map[x - 1][y - 3].ans = 1;
            map[x][y - 3].ans = 1;
            map[x + 1][y - 3].ans = 1;
            return true;
        }
        return false;
    }
}

const createMap = () => {
    const map = initMap();
    for (let i = 0; i < aircraftAmount; i++) {
        var putSuccessfully = false;
        while(!putSuccessfully){
            var direction = Math.floor(Math.random() * 4);
            var pos = new Pos(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10));
            if(direction === 0){
                if (putAircraft(pos.x, pos.y, map, Direction.UP)) {
                        putSuccessfully = true;
                }
            }
            else if(direction === 1){
                if (putAircraft(pos.x, pos.y, map, Direction.DOWN)) {
                    putSuccessfully = true;
                }
            }
            else if(direction === 2){
                if (putAircraft(pos.x, pos.y, map, Direction.RIGHT)) {
                    putSuccessfully = true;
                }
            }
            else if(direction === 3){
                if (putAircraft(pos.x, pos.y, map, Direction.LEFT)) {
                    putSuccessfully = true;
                }
            }
        }
    }
    return map;
}

const GameBoard = () => {
    const [map, setMap] = useState([]);
    const [clickCount, setClickCount] = useState(0);
    const [isWin, setIsWin] = useState(false);
    const [foundedAmount, setFounedAmount] = useState(0);
    const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
    const [isAlreadyRecorded, setIsAlreadyRecorded] = useState(false);

    useEffect(()=>{
        setMap(createMap());
    }, []);

    useEffect(() => {
        var tmp_founded_amount = 0;
        map.map((array, i) => {
            {
                array.map((cell, j) => {
                    if (map[i][j].isClicked && map[i][j].ans === 2) {
                        tmp_founded_amount++;
                    }
                })
            }
        })
        setFounedAmount(tmp_founded_amount);
    }, [clickCount]);

    useEffect(()=>{
        if(foundedAmount === 3){
            setIsWin(true);
        }
    },[foundedAmount]);

    useEffect(() => {
        if (isWin) {
            const new_map = map.map(row => 
                row.map(cell => ({
                    ...cell,
                    isClicked: true
                }))
            )
            setMap(new_map);
        }
    }, [isWin]);

    const restartClicked = () =>{
        setMap(createMap());
        setClickCount(0);
        setFounedAmount(0);
        setIsWin(false);
        setIsAlreadyRecorded(false);
    }

    const recordClicked = () =>{
        setIsRecordModalOpen(prevRecordModal => !prevRecordModal);
    }

    return (
        <div className="gameBoard">
            { isRecordModalOpen &&  <RecordModal clickCount={clickCount} recordClicked={recordClicked} setIsAlreadyRecorded={setIsAlreadyRecorded}/> }
            { (isRecordModalOpen === false ) && isWin &&  <GameEndModal isAlreadyRecorded={isAlreadyRecorded} setIsRecordModalOpen={setIsRecordModalOpen} restartClicked={restartClicked}/>}
            <div className='container'>
                <div className="gameInfo">
                    <span><PiAirplaneTiltFill /> 目前找到：{foundedAmount}/3</span>
                    <span><PiTargetBold />  已點擊：{clickCount} 次</span>
                </div>
                <div className="gameBoard">
                    {map.map((array, i) =>{
                        return <div key={i}>
                            {
                                array.map((cell, j) => {
                                    return <Cell setClickCount={setClickCount} key={j} info={map[i][j]}/>
                                })
                            }
                        </div>
                        
                    })}
                </div>
                <div className="restart">
                    <button onClick={restartClicked}><VscDebugRestart />重來一局</button>
                </div>
            </div>
        </div>
    )
}

export default GameBoard
