import React from 'react'
import Backdrop from '../Backdrop/Backdrop'
import RecordBoard from '../RecordBoard/RecordBoard'
import "./recordModal.scss"

const RecordModal = (props) => {
  return (
    <div>
      <Backdrop>
        <div className="recordModal">
            <RecordBoard clickCount={props.clickCount} recordClicked={props.recordClicked} setIsAlreadyRecorded={props.setIsAlreadyRecorded}></RecordBoard>
        </div>
        
      </Backdrop>
    </div>
  )
}

export default RecordModal
