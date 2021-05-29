import React from 'react';

type Props = {
    title: string,
    children: React.Node,
}

const Widget = (props: Props) => {
    const { title, children } = props;

    return (
        <div className={"widget"}>
            <h1 className={"widget-title"}>{title}</h1>
            <div className={"widget-body"}>
                {children}
            </div>
        </div>
    );
}

export default Widget;
