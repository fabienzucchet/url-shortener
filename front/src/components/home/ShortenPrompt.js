import React from 'react';

import Widget from '../base/Widget';

const ShortenPrompt = () => {

    return (
        <Widget title={"Get started now"} className="column-widget">
            <form action="/url/create" className="get-started-prompt">
                <input type="url" placeholder={"Shorten your URL"} name="longUrl" className="get-started-prompt" />
                <button className="get-started-prompt">Shorten</button>
            </form>
        </Widget>
    );
}

export default ShortenPrompt;
