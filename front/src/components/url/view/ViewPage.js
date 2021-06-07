import React, { useState } from 'react';

import Page from '../../base/Page';
import Widget from '../../base/Widget';
import Chart from './charts/line';

import GetData from './charts/data'

type Props = {
    id: Number
}

const ViewPage = (props: Props) => {
    const { id } = props;
    const [since, setSince] = useState(-60);
    const [step, setStep] = useState(5);

    return (
        <Widget title="Statistics" bodyClassName="row-widget">
            <button onClick={() => { setSince(-60); setStep(5); }}>now-1h</button>
            <button onClick={() => { setSince(-180); setStep(15); }}>now-3h</button>
            <button onClick={() => { setSince(-360); setStep(30); }}>now-6h</button>
            <button onClick={() => { setSince(-720); setStep(60); }}>now-12h</button>
            <Chart data={GetData(id, since, step)} />
        </Widget >
    );
}

export default ViewPage;
