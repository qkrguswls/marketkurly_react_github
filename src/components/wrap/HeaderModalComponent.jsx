import React from 'react';

export default function HeaderModalComponent({setHeaderModalClose}) {
    const onClickHeaderModalClose=(e)=>{
        e.preventDefault();
        setHeaderModalClose();
    }

    // Click 방지
    const onClickPrevention=(e)=>{
        e.preventDefault();
    }
    return (
        <header id='headerModal'>
            <div className="container">
                <div className="content">
                    <a href="!#" onClick={onClickPrevention}>
                        지금 가입하고 인기상품 <strong>100원</strong>에 받아가세요!
                        <span onClick={onClickHeaderModalClose}>
                            <img src="./img/header_modal/close.svg" alt="" />
                        </span>
                    </a>
                </div>
            </div>
        </header>
    );
};
