import React, {useState, useEffect} from 'react';

export default function Section1SlideWrapSlide({이미지, n}) {
    const [cnt, setCnt] = useState(0);
    const [isArrow, setIsArrow] = useState(false);
    const refSlideWrap = React.useRef();
    const [toggle, setToggle] = useState(0);
    const [play, setPlay] = useState(true);

    useEffect(()=>{
        refSlideWrap.current.style.width = `${100 * (n+2)}%`;
    },[n]);

    useEffect(()=>{
        if(play===true){
            let id = setInterval(() => {
                setCnt(cnt => cnt + 1);
            }, 3000);
            return () => clearInterval(id);
        }
    },[play]);

    const onClickNextArrowBtn=(e)=>{
        e.preventDefault();
        setCnt(cnt+1);
    }
    const onClickPrevArrowBtn=(e)=>{
        e.preventDefault();
        setCnt(cnt-1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const mainSlide=()=>{
        refSlideWrap.current.style.transition = `all 0.6s ease-in-out`;
        refSlideWrap.current.style.left = `${-(100 * cnt)}%`;

        returnNextFirst();
        returnPrevFirst();
    }
    const returnNextFirst=()=>{
        if (cnt>n) {
            setToggle(1);
            setCnt(1);
            refSlideWrap.current.style.transition = `none`;
            refSlideWrap.current.style.left = `0%`;
        }
    }
    const returnPrevFirst=()=>{
        if (cnt<0) {
            setCnt(n-1);
            refSlideWrap.current.style.transition = `none`;
            refSlideWrap.current.style.left = `${-(100 * n)}%`;
        }
    }

    useEffect(()=>{
        if(toggle===0){
           mainSlide();
        }
        else{
            setToggle(0);
            setTimeout(()=>{
                mainSlide();
            },100);
        }
    },[cnt]);

    const onMouseEnterContainer=(e)=>{
        e.preventDefault();
        setIsArrow(true);
    }
    const onMouseLeaveContainer=(e)=>{
        e.preventDefault();
        setIsArrow(false);
    }

    // Click 방지
    const onClickPrevention=(e)=>{
        e.preventDefault();
    }
    return (
        <div className="slide-container" onMouseEnter={onMouseEnterContainer} onMouseLeave={onMouseLeaveContainer}>
            <div className="slide-view">
                <ul ref={refSlideWrap} className='slide-wrap'>
                    {
                        이미지.map((item, idx)=>{
                            return (
                                <li className="slide" key={idx}><a href="!#" onClick={onClickPrevention}><img src={item.src} alt="sec1" /></a></li>
                            )
                        })
                    }
                </ul>
            </div>
            {
                isArrow && (
                <>
                    <a onClick={onClickNextArrowBtn} href="!#" className='next-arrow-btn'><img src="./img/intro/icon_arrow_grey.svg" alt="next" /></a>
                    <a onClick={onClickPrevArrowBtn} href="!#" className='prev-arrow-btn'><img src="./img/intro/icon_arrow_grey.svg" alt="prev" /></a>
                </>)
            }
            <span className='page-number-box'>
                <em className='current-number'>{cnt+1 > n ? 1 : cnt+1}</em>
                <i>/</i>
                <em className='total-number'>{n}</em>
            </span>
        </div>
        
    );
};