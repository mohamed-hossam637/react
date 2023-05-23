import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalStore } from '../../Context/Store';

export default function AddToFavorite(props) {

    let navigate = useNavigate();

    let { userToken, userData } = useContext(GlobalStore);

    const [favoriteData, setFavoriteData] = useState({
        title: "",
        desc: 0,
        citizenID: "",
        token: ""
    });

    const [added, setAdded] = useState(false);

    let sendFavorite = () => {
        axios.post("https://sticky-note-fe.vercel.app/addNote", favoriteData).then((res) => {
            if (res.data.message === 'success') {
                setAdded(true);
            } else {
                setAdded(false);
            }
        }).catch((err) => {
            console.log(err)
        })
    }


    let updateFavoriteData = () => {
        let data = favoriteData;
        data = {
            title: props.data.original_title || props.data.name,
            desc: `${props.media.id}-${props.media.media_type}`,
            citizenID: userData,
            token: userToken
        };
        setFavoriteData(data);
    }

    let send = () => {
        if (userToken.length === 0) {
            navigate("/login");
        } else {
            updateFavoriteData();
            sendFavorite();
        }
    }
    
    return (
        <>
            {
                added === false ? 
            <span className='add-favorite text-capitalize h6 ms-3 text-light c-pointer hover-underLine' onClick={send}>
                add to favorite <i className="fa-solid fa-heart-circle-plus"></i>
            </span>
            :
            <span className='remove-favorite text-capitalize h6 ms-3 text-light c-pointer hover-underLine' >
                remove from favorite <i className="fa-solid fa-heart-circle-minus"></i>
            </span>
            }
        </>
    )
}
