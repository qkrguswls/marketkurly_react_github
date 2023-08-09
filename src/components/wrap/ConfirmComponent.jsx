import React from 'react';
import './scss/confirm.scss';
import {ViewProductContext} from '../context/ViewProductContext';

export default function ConfirmComponent() {
    const {confirmModalClose, msg, type} = React.useContext(ViewProductContext);

    const onClickOkEvent=()=>{
        confirmModalClose();
    }
    return (
        <div id="confirmModal">
            <div className="wrap">
                <div className="container">
                    <div className="content">
                        <div className="message-box">
                            <div className="msg">{msg}</div>
                        </div>
                        <div className="button-box">
                            <button onClick={onClickOkEvent}>확인</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};