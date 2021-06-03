import React, { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

import { useGetUser } from '../../../hooks/useGetUser';

import ShortUrlNotFound from './ShortUrlNotFound';

const Unshorten = () => {
    const { shortUrl } = useParams();

    const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const user = useGetUser();

    console.log(shortUrl + REACT_APP_BACKEND_URL);

    useEffect(() => {
        axios.get(`${REACT_APP_BACKEND_URL}/?username=${user.name ? user.name : "guest"}&short_url=${shortUrl}`)
        .then(res => {
            if (res.status === 200) {
                window.location.href = res.data.original_url;
                return null;
            }
        });
    });

    return <ShortUrlNotFound shortUrl={shortUrl} />
}

export default Unshorten;
