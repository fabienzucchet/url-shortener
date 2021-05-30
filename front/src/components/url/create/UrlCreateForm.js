import React, { useCallback } from 'react';

import Widget from '../../base/Widget';

const UrlCreateForm = () => {

    const onSubmit = useCallback(() => {
        console.log("Click");
    }, [])

    return (
        <Widget title={"Shorten an URL"}>
            <form onSubmit={onSubmit}>
                <input type="url" placeholder={"Shorten your URL"} name="url" />
                <button  >Shorten</button>
            </form>
        </Widget>
    );
}

export default UrlCreateForm;