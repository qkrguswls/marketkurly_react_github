import React from 'react';

export default function Section3Component() {
    // Click 방지
    const onClickPrevention=(e)=>{
        e.preventDefault();
    }
    return (
        <section id="section3">
            <div className="container">
                <div className="gap">
                    <div className="title hide">
                        <h2>섹션3</h2>
                    </div>
                    <div className="content">
                        <a href="!#" onClick={onClickPrevention}><img src="./img/intro/sec3.jpg" alt="sec3" /></a>
                    </div>
                </div>
            </div>
        </section>
    );
};

