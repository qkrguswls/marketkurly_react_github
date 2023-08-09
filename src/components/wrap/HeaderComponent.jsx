import React from 'react';
import {Link, Outlet, useLocation} from 'react-router-dom';
import { ViewProductContext } from '../context/ViewProductContext';

export default function HeaderComponent() {
    const useLoc = useLocation();

    // 주소검색
    const {post, setPost} = React.useContext(ViewProductContext);

    const onClickAddress=(e)=>{
        e.preventDefault();
        setPost({
            ...post,
            isPostCode: true
        });
    }
    // !-- 주소검색 END --!

    // Header fixed
    const refRow3Fixed = React.useRef();

    React.useEffect(()=>{
        const row3Top = refRow3Fixed.current.offsetTop;
        
        window.addEventListener('scroll', function(a,b) {
            let isFixed = false;

            if (window.scrollY >= row3Top) {
                isFixed = true;
            } else {
                isFixed = false;
            }
            setState({
                ...state,
                isFixed: isFixed
            });
        });
    },[]);
    // !-- Header fixed END --!
    
    // 고객센터
    const onMouseEnterNotice=()=>{
        setState({
            ...state,
            isSub1: true
        });
    }
    const onMouseLeaveNotice=()=>{
        setState({
            ...state,
            isSub1: false
        });
    }
    // !-- 고객센터 END --!

    // 배송지
    const [state, setState] = React.useState({
        isSub1: false,
        isSub2: false,
        isFixed: false
    });

    const onMouseEnterMap=()=>{
        setState({
            ...state,
            isSub2: true
        });
    }
    const onMouseLeaveMap=()=>{
        setState({
            ...state,
            isSub2: false
        });
    }
    // !-- 배송지 END --!

    // Click 방지
    const onClickPrevention=(e)=>{
        e.preventDefault();
    }
    return (
        <>
            <header id='header'>
                <div className="row1">
                    <div className="container">
                        <div className="content">
                            <span><Link to="/signUp" className="on">회원가입</Link></span>
                            <span><i>|</i></span>
                            <span><a href="!#" onClick={onClickPrevention}>로그인</a></span>
                            <span><i>|</i></span>
                            <span onMouseEnter={onMouseEnterNotice}>
                                <a href="!#" onClick={onClickPrevention}>
                                    고객센터 <img src="./img/intro/ico_down_16x10.png" alt="" />
                                    {
                                        state.isSub1 && (<div className="sub" onMouseLeave={onMouseLeaveNotice}>
                                            <ul>
                                                <li><a href="!#">공지사항</a></li>
                                                <li><a href="!#">자주하는 질문</a></li>
                                                <li><a href="!#">1:1 문의</a></li>
                                                <li><a href="!#">대량주문 문의</a></li>
                                            </ul>
                                        </div>)
                                    }
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={`row2 ${state.isFixed ? 'on' : ''}`}>
                    <div className="container">
                        <div className="content">
                            <div className="left">
                                <span><Link to="/main"><img src="./img/intro/kurly.svg" alt="" /><strong>마켓컬리</strong></Link></span>
                                <span><i>|</i></span>
                                <span><a href="!#" onClick={onClickPrevention}>뷰티컬리</a></span>
                            </div>
                            <div className="center">
                                <div>
                                    <input type="text" name='input_search' id='inputSearch' placeholder='검색어를 입력해주세요'/>
                                    <a href="!#" className='search-btn' onClick={onClickPrevention}><img src="./img/intro/icon_search.svg" alt="" /></a>
                                </div>
                            </div>
                            <div className="right">
                                <div>
                                    <a href="!#" onMouseEnter={onMouseEnterMap} onClick={onClickPrevention}><img src="./img/intro/icon_map.svg" alt="" /></a>

                                    {
                                        state.isSub2 && (<div className="sub" onMouseLeave={onMouseLeaveMap}>
                                            <ul>
                                                {
                                                    post.주소1 === '' ? (
                                                        <li>
                                                            <h2>배송지를 등록</h2>
                                                            <h3>구매 가능한 상품을 확인하세요!</h3>
                                                        </li>
                                                    )
                                                    :
                                                    (
                                                        <li>
                                                            {post.주소1} &nbsp; {post.주소2}
                                                        </li>
                                                    )
                                                }
                                                <li>
                                                    <button className='login'>로그인</button>
                                                    <button className='addr-search' onClick={onClickAddress}>
                                                        <img src="./img/header/icon_search.png" alt="" />
                                                        주소검색
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>)
                                    }

                                </div>
                                <div><a href="!#" onClick={onClickPrevention}><img src="./img/intro/icon_heart.svg" alt="" /></a></div>
                                <div><a href="!#" onClick={onClickPrevention}><img src="./img/intro/icon_cart.svg" alt="" /></a></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div ref={refRow3Fixed} className={`row3 ${state.isFixed ? 'on' : ''}`}>
                    <div className="container">
                        <div className="content">
                            <div className="left">
                                <a href="!#" onClick={onClickPrevention}><span>카테고리</span>
                                </a>
                            </div>
                            <div className="center">
                                <nav>
                                    <ul>
                                        <li className={useLoc.pathname === '/sub01' ? 'on' : ''}><Link to="/sub01">신상품</Link></li>
                                        <li className={useLoc.pathname === '/sub02' ? 'on' : ''}><Link to="/sub02">베스트</Link></li>
                                        <li className={useLoc.pathname === '/sub03' ? 'on' : ''}><Link to="/sub03">알뜰상품</Link></li>
                                        <li className={useLoc.pathname === '/sub04' ? 'on' : ''}><Link to="/sub04">특가/혜택</Link></li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="right">
                                <a href="!#" onClick={onClickPrevention}>
                                    <strong>샛별・택배</strong><span>배송안내</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Outlet/>
        </>
    );
};
