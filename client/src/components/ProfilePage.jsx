import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import { CircularProgress, makeStyles } from '@material-ui/core';
import LogoutButton from './partials/LogoutButton';
import Slider from 'react-slick';
import { ENDPOINTS } from '../config/apiConfig';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {logout} from "../actions/authActions";

const useStyles = makeStyles((theme) => ({
    profileContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: theme.spacing(4),
    },
    avatar: {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        objectFit: 'cover',
    },
    carouselContainer: {
        width: '80%',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    carouselImage: {
        width: '100%',
        height: 'auto',
    },
}));

function ProfilePage() {
    const classes = useStyles();
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(ENDPOINTS.ME, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(response.data);
            } catch (error) {
                // If token is invalid, dispatch logout action
                if (error.response.status === 401) {
                    dispatch(logout());
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData().then(r => r);
    }, [token, dispatch]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div className={classes.profileContainer}>
            {userData && (
                <>
                    <img src={userData.avatar} alt="Avatar" className={classes.avatar} />
                    <h2>{userData.fullName}</h2>
                    <LogoutButton />
                    <Slider {...settings} className={classes.carouselContainer}>
                        {userData.photos.map(photo => (
                            <div key={photo.id}>
                                <img src={photo.url} alt={photo.name} className={classes.carouselImage} />
                            </div>
                        ))}
                    </Slider>
                </>
            )}
        </div>
    );
}

export default ProfilePage;
