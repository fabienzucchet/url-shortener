import React from 'react';

type Props = {
    shortUrl: string
}

const ShortUrlNotFound = (props: Props) => {

    const { shortUrl } = props;

    return (
        <h1>Short URL {shortUrl} does not exist !</h1>
    );
}

export default ShortUrlNotFound;
