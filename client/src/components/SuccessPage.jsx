import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import Confetti from 'react-confetti';
import successAnimation from '../assets/animations/success-animation.json';
import {useDispatch} from "react-redux";
import {resetRegister} from "../actions/registrationActions";

const SuccessPage = () => {
    const dispatch = useDispatch();
    const animationContainer = useRef(null);

    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: animationContainer.current,
            renderer: 'svg',
            loop: false,
            autoplay: true,
            animationData: successAnimation,
        });

        const timer = setTimeout(() => {
            dispatch(resetRegister());
        }, 5000);

        return () => {
            clearTimeout(timer);
            anim.destroy();
        };
    }, [dispatch]);

    return (
        <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
            <Confetti width={window.innerWidth} height={window.innerHeight} />
            <div ref={animationContainer} style={{ width: 400, height: 400, margin: '0 auto' }}></div>
        </div>
    );
};

export default SuccessPage;
