import React from 'react';

type Props = {
    title: string,
    children: React.Node,
    isCentered: boolean,
    bodyClassName: String,

}

const Page = (props: Props) => {

    const { title, children, isCentered, bodyClassName } = props;

    return (
        <div className={`page ${isCentered ? "page-center" : "page-stretch"}`}>
            {title && <h1 className="page-title">{title}</h1>}
            <div className={`${bodyClassName ? bodyClassName : ""}`}>
                {children}
            </div>
        </div>
    );
}

export default Page;
