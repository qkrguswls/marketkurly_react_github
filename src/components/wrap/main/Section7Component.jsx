import React from 'react';

export default function Section7Component() {
    // Click 방지
    const onClickPrevention=(e)=>{
        e.preventDefault();
    }
    return (
        <section id="section7">
            <div className="container">
                <div className="gap">
                    <div className="title hide">
                        <h2>섹션7</h2>
                    </div>
                    <div className="content">
                        <a href="!#" onClick={onClickPrevention}><img src="./img/intro/sec7.jpg" alt="sec7" /></a>
                    </div>
                </div>
            </div>
        </section>
    );
};

