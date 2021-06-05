import React, { useCallback, useState } from 'react';
import axios from 'axios';

import { useGetUser } from '../../../hooks/useGetUser';

import Page from '../../base/Page';
import Widget from '../../base/Widget';

const UrlCreatePage = () => {

    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [name, setName] = useState('');

    const user = useGetUser();

    const onSubmit = useCallback(() => {
        console.log("Click")
        axios.put(`${process.env.REACT_APP_HOSTNAME}/api/url/`, {
            original_url: longUrl,
            short_url: shortUrl,
            name: name,
            owner_username: user.login
        }).then(res => { window.location.href = `${process.env.REACT_APP_HOSTNAME}/url/view/${res.data.id}`; });

    }, [longUrl, shortUrl, name, user.login]);

    return (
        <Page isCentered={true} bodyClassName="centered-column-page" title="Shorten an URL">
            <Widget title="Paste the URL to shorten" bodyClassName="form-center">
                <input type="url" placeholder="URL to shorten" value={longUrl} onChange={ev => setLongUrl(ev.target.value)} className="form-item-center"/>
            </Widget>
            <Widget title="(Optional) Choose a custom short URL" bodyClassName="form-center">
                <div className="form-item-center-shorturl">
                    <span className="form-item">{process.env.REACT_APP_HOSTNAME}/</span>
                    <input type="text" placeholder="Short URL" value={shortUrl} onChange={ev => setShortUrl(ev.target.value)} className="form-item"/>
                </div>
            </Widget>
            <Widget title="(Optional) Enter a name for the URL" bodyClassName="form-center">
                <input type="text" placeholder="URL name" value={name} onChange={ev => setName(ev.target.value)} className="form-item-center"/>
            </Widget>
            <Widget title="Save changes" bodyClassName="form-center">
                <button className="submit-button" onClick={onSubmit}>Save changes</button>
            </Widget>
        </Page>
    );
}

export default UrlCreatePage;