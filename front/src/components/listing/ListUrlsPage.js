import React, { useState, useMemo, useEffect } from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter, useFlexLayout } from 'react-table';
import classNames from 'classnames'
import { format } from 'date-fns'
import { useHistory } from "react-router-dom";


import axios from 'axios';
import { useGetUser } from '../../hooks/useGetUser';

import Widget from '../base/Widget';

import GlobalFilter from './GlobalFilter';
import DefaultColumnFilter from './DefaultColumnFilter';

import DeletePopup from './DeletePopup';


const ListUrlsPage = () => {
  const [urls, setUrls] = useState([])
  const user = useGetUser();
  const history = useHistory();


  useEffect(() => {
    async function fetchUrls() {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/url/`, {
        params: {
          username: user.login // TODO : REMOVE IT AS IT WONT BE USEFUL AFTER MERGING #8
        }
      });
      console.log(response)
      setUrls(response.data)
    }
    fetchUrls();
  }, [user.login])

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const data = useMemo(
    () => urls,
    [urls]
  )

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        width: 100
      },
      {
        Header: 'URL',
        accessor: 'short_url',
        Cell: e => <a href={process.env.REACT_APP_HOSTNAME + "/" + e.value}>{e.value}</a>,
        width: 100
      },
      {
        Header: 'Original URL',
        accessor: 'original_url',
        Cell: e => <a href={e.value} style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}> {e.value}</a>,
        width: 130
      },
      {
        Header: 'Created At',
        accessor: 'created_at',
        Cell: e => <span>{format(Date.parse(e.value), 'yyyy/MM/dd HH:mm')}</span>
      },
      {
        Header: 'Last Update',
        accessor: 'updated_at',
        Cell: e => <span>{e.value == null ? "Not updated yet" : format(Date.parse(e.value), 'yyyy/MM/dd HH:mm')}</span>
      },
      {
        Header: 'Active',
        accessor: 'is_active',
        maxWidth: 50,
        minWidth: 50,
        Cell: e => <span style={e.value.toString() === "true" ? { color: '#669900' } : { color: '#cc3300' }}>{e.value.toString()}</span>,
      },
    ],
    []
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useFlexLayout,
  );

  const [rowSelected, setRowSelected] = useState(-1);
  const [urlSelected, setUrlSelected] = useState({});

  return (
    <Widget title={"URLs Registered (" + data.length + ")"} className="column-widget">
      <div className="list-url-header">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <span>
          <button onClick={() => { if (rowSelected !== -1) { history.push(`/url/view/${rowSelected}`) } }}
            className={classNames({
              "url-actions": true,
              "active": rowSelected !== -1
            })}>View details</button>
          <button onClick={() => { if (rowSelected !== -1) { history.push(`/url/edit/${rowSelected}`) } }}
            className={classNames({
              "url-actions": true,
              "active": rowSelected !== -1
            })}>Edit</button>

          <DeletePopup urlSelected={urlSelected} rowSelected={rowSelected} />
          <button className="url-actions" id="shorten-button" onClick={() => { history.push('/url/create') }}>Shorten an URL</button>
        </span>
      </div>

      <div>
        <table {...getTableProps()} className="list-url">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={column.isSorted ? column.isSortedDesc ? "sort-desc" : "sort-asc" : ""}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}
                        onClick={() => { rowSelected === row.original.id ? setRowSelected(-1) : setRowSelected(row.original.id); setUrlSelected(row) }}
                        className={classNames({
                          "rowSelected": row.original.id === rowSelected,
                          "rightCell": cell.column.Header === "Active" && row.original.id === rowSelected,
                          "leftCell": cell.column.Header === "Name" && row.original.id === rowSelected
                        })}>
                        { cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table >
      </div>


    </Widget >
  );
}

export default ListUrlsPage;
