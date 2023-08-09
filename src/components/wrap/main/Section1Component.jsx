import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Section1SlideWrapSlide from './Section1SlideWrapSlide';

export default function Section1Component() {
    const [state, setState] = useState({
        이미지: [],
        n: 0
    });

    useEffect(()=>{
        axios({
        url: './data/sec1_slide.json',
        method: 'GET'
        })
        .then((res)=>{
            if(res.status === 200){
                setState({
                    이미지: res.data.이미지,
                    n: res.data.이미지.length-2
                });
            }
        })
        .catch((err)=>{
            console.log('axios 실패');
            console.log(err);
        });
    },[]);
    return (
        <section id="section1">
            <Section1SlideWrapSlide 이미지 = {state.이미지} n={state.n}/>
        </section>
    );
};
