import React from 'react';

type Props = {
    title: string,
    figure: number,
    legend: string,
}

const MetricBox = (props: Props) => {

    const { title, legend, figure } = props;

    return (
        <div className="metric-box">
            <h1 className="metric-box-title">{title}</h1>
            <div className="metric-box-figure">
                {figure}
            </div>
            <div className="metric-box-legend">
                {legend}
            </div>
        </div>
    );
}

export default MetricBox;
