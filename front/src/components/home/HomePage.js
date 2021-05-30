import React from 'react';

import Page from '../base/Page';

import ShortenPrompt from './ShortenPrompt';
import WelcomeMessage from './WelcomeMessage';

const HomePage = () => {

    return (
        <Page isCentered={true} bodyClassName="centered-column-page">
            <div className="welcome">
                <WelcomeMessage />
            </div>
            <div className="prompt">
                <ShortenPrompt />
            </div>
        </Page>
    );
}

export default HomePage;
