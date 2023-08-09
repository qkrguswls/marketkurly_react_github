import React from 'react';
import './scss/intro_modal.scss';
import introModalImage from './images/92caebda-2c7b-4ee8-8d43-d2df9c21e703.png';

export default function IntroModalComponent({introModalClose, cookie}) {
    const {cookieName, cookieValue, cookieExpires} = cookie;

    const onClickClose=(e)=>{
        e.preventDefault();
        introModalClose();
    }

    // 다시 안 보기
    const setCookie=()=>{
        let today = new Date();

        today.setDate(today.getDate() + cookieExpires); //3일 기한
        document.cookie = `${cookieName}=${cookieValue}; path=/; expires=${today.toUTCString()};`;
    }
    const onClickSetCookieClose=(e)=>{
        e.preventDefault();
        setCookie();
        introModalClose();
    }

    // Click 방지
    const onClickPrevention=(e)=>{
        e.preventDefault();
    }
    return (
        <div id="introModal">
            <div className="container">
                <div className="wrap">
                    <div className="content">
                        <ul>
                            <li><a href="!#" onClick={onClickPrevention}><img src={introModalImage} alt="" /></a></li>
                            <li>
                                <button onClick={onClickSetCookieClose}>다시 안 보기</button>
                                <button onClick={onClickClose}>닫기</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

