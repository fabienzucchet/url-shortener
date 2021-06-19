import React, { useEffect, useState } from 'react';

import Page from '../../base/Page';
import Widget from '../../base/Widget';
import Chart from './charts/line';

import GetData from './charts/data'

import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

import Demo from "./utils/timepicker"

type Props = {
    id: Number
}

const ViewPage = (props: Props) => {
    const { id } = props;
    const [queryRange, setQueryRange] = useState({ id: 1, start: Math.floor(Date.now() / 1000) - 60 * 60, stop: Math.floor(Date.now() / 1000) })
    const newQuery = ({ id, start, stop }) => {
        console.log(id, start, stop);
        setQueryRange({ id: id, start: start, stop: stop })
    }
    const [data, setData] = useState(GetData(queryRange))

    useEffect(() => {
        setData(GetData(queryRange))
    }, [queryRange])

    return (
        <Widget title="Statistics" bodyClassName="row-widget">
            <Demo onChange={newQuery} id={id} />
            <Chart data={data} />
        </Widget >
    );
}

export default ViewPage;
