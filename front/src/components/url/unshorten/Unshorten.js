import React from "react";
import { useParams } from "react-router";
import axios from "axios";

import ShortUrlNotFound from './ShortUrlNotFound';

const Unshorten = () => {
    const { shortUrl } = useParams();

    axios.get(`http://localhost:8000/?short_url=http://localhost:3000/${shortUrl}`)
        .then(res => {
            if (res.status === 200) {
                window.location.replace(res.data.original_url);
                return null;
            }
        });

    return <ShortUrlNotFound shortUrl={shortUrl} />
}

export default Unshorten;
