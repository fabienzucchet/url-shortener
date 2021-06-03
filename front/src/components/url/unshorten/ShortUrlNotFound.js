import React from 'react';

import Page from '../../base/Page';
import Widget from '../../base/Widget';

type Props = {
    shortUrl: string
}

const ShortUrlNotFound = (props: Props) => {

    const { shortUrl } = props;

    return (
        <Page isCentered={true} bodyClassName="centered-column-page">
            <Widget title="Woooops" bodyClassName="row-widget">
                <span className="text-in-widget">
                    The short URL <span className="text-url">{process.env.REACT_APP_HOSTNAME}/{shortUrl}</span> is not yet (or no longer) registered. Do you want to <a href="/url/create" className="text-url">register</a> it?
                </span>
            </Widget>
        </Page>
    );
}

export default ShortUrlNotFound;
