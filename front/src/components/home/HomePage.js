import React from 'react';

import ShortenPrompt from './ShortenPrompt';
import WelcomeMessage from './WelcomeMessage';

const HomePage = () => {

    return (
        <div className="page">
            <div className="welcome">
                <WelcomeMessage />
            </div>
            <div className="prompt">
                <ShortenPrompt />
            </div>
        </div>
    );
}

export default HomePage;
