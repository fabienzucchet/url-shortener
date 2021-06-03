import React, { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

import { useGetUser } from '../../../hooks/useGetUser';

import ShortUrlNotFound from './ShortUrlNotFound';

const Unshorten = () => {
    const { shortUrl } = useParams();

    const user = useGetUser();

    useEffect(() => {
        axios.get(`http://localhost:8000/?username=${user.name ? user.name : "guest"}&short_url=http://localhost:3000/${shortUrl}`)
        .then(res => {
            if (res.status === 200) {
                window.location.replace(res.data.original_url);
                return null;
            }
        });
    });

    return <ShortUrlNotFound shortUrl={shortUrl} />
}

export default Unshorten;
