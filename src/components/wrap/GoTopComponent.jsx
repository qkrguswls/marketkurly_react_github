import React,{useState, useEffect} from 'react';
import goTopImage from './images/go_top.png';
import './scss/go_top.scss';

export default function GoTopComponent() {
    const [goTop, setGoTop] = useState(false);

    useEffect(()=>{
        window.addEventListener('scroll', function(){
            let goTop = false;

            if (window.scrollY > 1000) {
                goTop = true;
            } else {
                goTop = false;
            }
            setGoTop(goTop);
        });
    },[]);
    return (
        <div id="goTop" className={goTop === true ? 'on' : 'off'}>
            <a href="#wrap"><img src={goTopImage} alt="" /></a>
        </div>
    );
};