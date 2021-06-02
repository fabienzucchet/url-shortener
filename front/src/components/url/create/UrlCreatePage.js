import React, { useState } from 'react';

import Page from '../../base/Page';
import Widget from '../../base/Widget';

const UrlCreatePage = () => {

    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    return (
        <Page isCentered={true} bodyClassName="centered-column-page" title="Shorten an URL">
            <Widget title="Paste the URL to shorten" bodyClassName="form-center">
                <input type="text" placeholder="URL to shorten" value={longUrl} onChange={ev => setLongUrl(ev.target.value)} className="form-item-center"/>
            </Widget>
            <Widget title="(Optional) Choose a custom short URL" bodyClassName="form-center">
                <div className="form-item-center-shorturl">
                    <span className="form-item">https://url.viarezo.fr/</span>
                    <input type="text" placeholder="Short URL" value={shortUrl} onChange={ev => setShortUrl(ev.target.value)} className="form-item"/>
                </div>
            </Widget>
            <Widget title="(Optional) Enter a name for the URL" bodyClassName="form-center">
                <input type="text" placeholder="URL name" value={name} onChange={ev => setName(ev.target.value)} className="form-item-center"/>
            </Widget>
            <Widget title="(Optional) Add a description for the URL" bodyClassName="form-center">
                <input type="text" placeholder={"Description of the URL"} value={description} onChange={ev => setDescription(ev.target.value)} className="form-item-center"/>
            </Widget>
            <Widget title="Save changes" bodyClassName="form-center">
                <button className="submit-button">Save changes</button>
            </Widget>
        </Page>
    );
}

export default UrlCreatePage;