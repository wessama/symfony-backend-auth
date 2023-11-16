import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import successAnimation from '../assets/animations/success-animation.json';

const SuccessPage = () => {
    const navigate = useNavigate();
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
            navigate('/login');
        }, 5000);

        return () => {
            clearTimeout(timer);
            anim.destroy();
        };
    }, [navigate]);

    return (
        <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
            <Confetti width={window.innerWidth} height={window.innerHeight} />
            <div ref={animationContainer} style={{ width: 400, height: 400, margin: '0 auto' }}></div>
        </div>
    );
};

export default SuccessPage;
