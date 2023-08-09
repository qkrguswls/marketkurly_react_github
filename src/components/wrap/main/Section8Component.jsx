import React,{useState, useEffect} from 'react';
import Section8SlideWrapSlide from './Section8SlideWrapSlide';
import axios from 'axios';
import $ from 'jquery';

export default function Section8Component() {
    const [state, setState] = useState({
        상품: [],
        n: 0
    });

    useEffect(()=>{
        axios({
            url: './data/sec8_slide.json',
            method: 'GET'
        })
        .then((res)=>{
            if(res.status === 200) {
                setState({
                    ...state,
                    상품: res.data.상품,
                    n: res.data.상품.length
                });
                $('#section8 .slide-wrap').css({width: `${25 * state.n}%`});
            } 
        })
        .catch((err)=>{console.log('AXIOS 실패! ' + err)});
    },[state.n]);

    useEffect(()=>{
        let cnt = 0;
        mainSlide();

        function mainSlide(){
            $('#section8 .slide-wrap').stop().animate({left: `${-100*cnt}%`}, 600);
            if(cnt === Math.ceil(state.n / 4) - 1) { //4
                $('#section8 .arrow-next-btn').stop().fadeOut(300);
            } else {
                $('#section8 .arrow-next-btn').stop().fadeIn(300);
            }
            if(cnt === 0) {
                $('#section8 .arrow-prev-btn').stop().fadeOut(300);
            } else {
                $('#section8 .arrow-prev-btn').stop().fadeIn(300);
            }
        }
        function nextCount(){
            cnt++;
            if(cnt > Math.ceil(state.n / 4) - 1) { //4
                cnt = 4;
            }
            mainSlide();
        }
        function prevCount(){
            cnt--;
            if(cnt < 1) {
                cnt = 0;
            }
            mainSlide();
        }
        $('#section8 .arrow-next-btn').on({
            click(e){
                e.preventDefault();
                nextCount();
            }
        });
        $('#section8 .arrow-prev-btn').on({
            click(e){
                e.preventDefault();
                prevCount();
            }
        });
    },[state.n]);
    return (
        <section id="section8">
            <div className="container">
                <div className="title">
                    <h2><a href="!#">놓치면 후회할 가격 <img src="./img/intro/arrow_right.svg" alt="right" /></a></h2>
                </div>
                <div className="content">
                    <div className="slide-container">
                        <div className="slide-view">
                            <Section8SlideWrapSlide 상품 = {state.상품}/>
                        </div>
                        <a href="!#" className='arrow-next-btn'><img src="./img/intro/slide_arrow_white.svg" alt="next" /></a>
                        <a href="!#" className='arrow-prev-btn'><img src="./img/intro/slide_arrow_white.svg" alt="prev" /></a>
                    </div>
                </div>
            </div>
        </section>
    );
};
