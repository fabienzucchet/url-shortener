import React from 'react';

type Props = {
    title: string,
    children: React.Node,
    className: string,
    bodyClassName: string,
}

const Widget = (props: Props) => {
    const { title, children, className, bodyClassName } = props;

    return (
        <div className={`widget ${className}`}>
            {title && <h1 className="widget-title">{title}</h1>}
            <div className={`widget-body ${bodyClassName}`}>
                {children}
            </div>
        </div>
    );
}

export default Widget;
