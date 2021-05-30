import React from 'react';

import Widget from '../base/Widget';

const ShortenPrompt = () => {

    return (
        <Widget title={"Get started now"} className="column-widget">
            <form action="/url/create" className="url-prompt">
                <input type="url" placeholder={"Shorten your URL"} name="longUrl" className="url-prompt" />
                <button className="url-prompt">Shorten</button>
            </form>
        </Widget>
    );
}

export default ShortenPrompt;
