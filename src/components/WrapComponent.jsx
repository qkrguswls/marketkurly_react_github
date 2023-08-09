import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import HeaderModalComponent from './wrap/HeaderModalComponent';
import HeaderComponent from './wrap/HeaderComponent';
import MainComponent from './wrap/MainComponent';
import Sub01Component from './wrap/main_sub/Sub01Component';
import Sub02Component from './wrap/main_sub/Sub02Component';
import Sub03Component from './wrap/main_sub/Sub03Component';
import Sub04Component from './wrap/main_sub/Sub04Component';
import Sub05SignUpComponent from './wrap/main_sub/Sub05SignUpComponent';
import FooterComponent from './wrap/FooterComponent';
import IntroModalComponent from './wrap/IntroModalComponent';
import GoTopComponent from './wrap/GoTopComponent';
import QuickMenuComponent from './wrap/QuickMenuComponent';
import ConfirmComponent from './wrap/ConfirmComponent';
import PostCodeComponent from './wrap/PostCodeComponent';
import { ViewProductContext } from './context/ViewProductContext';

export default function WrapComponent() {
    // 최근 본 상품 - localStorage
    const [viewProduct, setViewProduct] = useState({
        viewProductKEY: 'KURLY_VIEW_PRODUCT_HJ',
        최근본상품: {},
        isClick: false,
        isTime: false,
        최근본상품리스트: [],
        imgPath: ''
    });

    const {viewProductKEY, 최근본상품, isClick, isTime, 최근본상품리스트} = viewProduct;

    useEffect(()=>{
        if (localStorage.getItem(viewProductKEY) !== null) {
            setViewProduct({
                ...viewProduct,
                최근본상품리스트: JSON.parse(localStorage.getItem(viewProductKEY))
            });
        }
    },[]);

    useEffect(()=>{
        if (isClick === true) {
            setViewProduct({
                ...viewProduct,
                최근본상품: {
                    ...최근본상품,
                    이미지: viewProduct.imgPath,
                    time: new Date().getTime()
                },
                isClick: false,
                isTime: true
            });
        }
    },[최근본상품]);

    useEffect(()=>{
        let arr = [];

        if (isTime === true) {
            if (localStorage.getItem(viewProductKEY) !== null) {
                arr = JSON.parse(localStorage.getItem(viewProductKEY));
                arr = [
                    최근본상품,
                    ...arr
                ];
            } else {
                arr = [최근본상품];
            }
            localStorage.setItem(viewProductKEY, JSON.stringify(arr));

            setViewProduct({
                ...viewProduct,
                isTime: false,
                최근본상품리스트: arr
            });
        }

    },[최근본상품.time]);

    // 클릭한 제품코드가 이미 등록된 상품이면 저장하지 않는다
    const setViewProductFn=(value, imgPath)=>{
        if (localStorage.getItem(viewProductKEY) !== null) {
            let result = JSON.parse(localStorage.getItem(viewProductKEY));
            const found = result.map((item)=> item.번호 === value.번호);

            if (found.includes(true) === false) { //중복된 데이터가 아니면
                setViewProduct({
                    ...viewProduct,
                    최근본상품: value,
                    isClick: true,
                    imgPath: imgPath
                });
            }
        } else {
            setViewProduct({
                ...viewProduct,
                최근본상품: value,
                isClick: true,
                imgPath: imgPath
            });
        }    
    }
    // !-- 최근 본 상품 END --!

    // headerModal - localStorage
    const [storageCookie] = useState({
        key: 'HJKURLY_HEADERMODAL',
        value: 'SIGNUP_SALE_EVENT',
        expires: 1 //1년
    });

    const {key, value, expires} = storageCookie;
    const [headerModal, setHeaderModal] = useState(true);

    const setHeaderModalClose=()=>{
        setHeaderModal(false);

        let today = new Date();
        today.setFullYear(today.getFullYear()+expires);
        
        const val = {
            value: value,
            expires: today.getTime()
        }
        localStorage.setItem(key, JSON.stringify(val));
    }

    useEffect(()=>{
        if (localStorage.getItem(key) === null) { //강제종료
            return;
        }

        const topModal = JSON.parse(localStorage.getItem(key));

        if (new Date() > new Date(topModal.expires)) {
            setHeaderModal(true);
        } else {
            setHeaderModal(false);
        }
    },[]);
    // !-- headerModal END --!
    
    // introModal - cookie
    const [cookie] = useState({
        cookieName: 'HJKURLY_INTROMODAL_01',
        cookieValue: 'YEAR8_SALE_EVENT_MODALWINDOW',
        cookieExpires: 3 //3일
    });

    const {cookieName, cookieValue} = cookie;
    const [introModal, setIntroModal] = useState(true);

    const introModalClose=()=>{
        setIntroModal(false);
    }

    const getCookie=()=>{
        if (document.cookie === '') {
            return;  //예외처리
        }
        let cookie = document.cookie.split(';');
        let arr = [];

        cookie.map((item, idx)=>{
            arr[idx] = {
                쿠키이름: item.split('=')[0].trim(),
                쿠키값: item.split('=')[1].trim()
            }
        });
        arr.map((item)=>{
            if (item.쿠키이름 === cookieName && item.쿠키값 === cookieValue) {
                setIntroModal(false);
            }
        });
    }

    useEffect(()=>{
        getCookie();
    },[introModal]);
    // !-- introModal END --!

    // ConfirmComponent
    const [confirm, setConfirm] = useState({
        isConfirm: false,
        msg: '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합',
        type: 1,
        timerStart: false
    });

    const {msg, type, isConfirm, timerStart} = confirm;

    const confirmModalClose=()=>{
        if (msg.includes('인증번호') === true) {
            setConfirm({
                isConfirm: false,
                timerStart: true
            });
        } else {
            setConfirm({
                isConfirm: false
            });
        }
        document.querySelector('html').style.overflowY = 'auto';
    }

    const confirmModalOpen=(msg, type)=>{
        setConfirm({
            isConfirm: true,
            msg: msg,
            type: type
        });
        document.querySelector('html').style.overflow = 'hidden';
    }
    // !-- ConfirmComponent END --!

    // PostCodeComponent
    const [post, setPost] = useState({
        isPostCode: false,
        주소1: '',
        주소2: '',
        addressKey: 'KURLYADDRESSKEY'
    });

    useEffect(()=>{ //새로고침
        let result = '';
        if (sessionStorage.getItem(post.addressKey) !== null) {
            result = JSON.parse(sessionStorage.getItem(post.addressKey));
            setPost({
                ...post,
                주소1: result.주소1,
                주소2: result.주소2
            });
        }
    },[]);
    // !-- PostCodeComponent END --!
    return (
        <div id='wrap'>
            <ViewProductContext.Provider value={{setViewProductFn, confirmModalClose, confirmModalOpen, msg, type, timerStart, post, setPost}}>

                {headerModal && <HeaderModalComponent setHeaderModalClose={setHeaderModalClose}/>}

                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <Routes>
                        <Route path='/' element={<HeaderComponent/>}>
                            <Route index element={<MainComponent/>}/>
                            <Route path='/main' element={<MainComponent/>}/>
                            <Route path='/sub01' element={<Sub01Component />}/>
                            <Route path='/sub02' element={<Sub02Component/>}/>
                            <Route path='/sub03' element={<Sub03Component/>}/>
                            <Route path='/sub04' element={<Sub04Component/>}/>
                            <Route path='/signUp' element={<Sub05SignUpComponent/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>

                <FooterComponent/>
                {introModal && <IntroModalComponent introModalClose={introModalClose} cookie={cookie}/>}
                <GoTopComponent/>
                <QuickMenuComponent 최근본상품리스트={최근본상품리스트}/>
                {isConfirm && <ConfirmComponent/>}
                {post.isPostCode && <PostCodeComponent/>}

            </ViewProductContext.Provider>
        </div>
    );
};
