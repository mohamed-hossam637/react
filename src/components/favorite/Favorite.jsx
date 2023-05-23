import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { GlobalStore } from '../../Context/Store';

export default function Favorite() {

    let {faveData} = useContext(GlobalStore);


    let [favoriteList, setFavoriteList] = useState([]) ;

    let getFavorite = () => {
        axios.post("https://sticky-note-fe.vercel.app/getUserNotes", faveData).then((res) => {
            setFavoriteList(res.data.Notes);
            console.log(res.data.Notes);
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getFavorite();
        // console.log(faveData)
    }, [])

    return (
        <>
            <div className='container my-5'>
                {
                    favoriteList.length === 0
                        ?
                        <h3 className='h2 text-capitalize text-muted text-center'>no favorite item yet</h3>
                        :
                        <div className='row'>
                            <h3 className='text-uppercase text-center'>you have ( {favoriteList.length} ) favorite item{favoriteList.length > 1 ? 's' : ''}</h3>

                        </div>
                }
            </div>
        </>
    )
}
