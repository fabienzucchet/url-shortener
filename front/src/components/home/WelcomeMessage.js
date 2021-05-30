import React from 'react';

import Widget from '../base/Widget';
import welcomePhoto from '../../svg/welcome-photo.svg';

const WelcomeMessage = () => {

    return (
        <Widget title="Welcome to url.viarezo.fr" className="row-widget">
            <div id="welcome-widget">
                <div className="welcome-text">
                    url.viarezo.fr is a complete url shortener with premium features... But for free!
                </div>
                <img src={welcomePhoto} alt={welcomePhoto} className="welcome-photo" />
            </div>

        </Widget>
    );
}

export default WelcomeMessage;