import React from 'react';

type Props = {
    title: string,
    children: React.Node,
    isCentered: boolean,
}

const Page = (props: Props) => {

    const { title, children, isCentered } = props;

    return (
        <div className={`page ${isCentered ? "page-center" : "page-stretch"}`}>
            {title && <h1 className="page-title ">{title}</h1>}
            {children}
        </div>
    );
}

export default Page;