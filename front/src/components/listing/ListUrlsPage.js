import React, { useState } from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter, useFlexLayout } from 'react-table';
import classNames from 'classnames'

import Widget from '../base/Widget';

import GlobalFilter from './GlobalFilter'
import DefaultColumnFilter from './DefaultColumnFilter'


const ListUrlsPage = () => {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const data = React.useMemo(
    () => [
      {
        name: "",
        id: 1,
        description: "",
        short_url: "http://tt",
        url: "http://google.fr/ihihiuhi",
        created_at: "2019-09-10 11:01",
        updated_at: "2019-09-10 12:01",
        is_active: "true",
        is_delete: "false",
        clics: 20
      },
      {
        name: "Test URL",
        id: 2,
        description: "",
        short_url: "http://test",
        url: "http://amazon.fr/objecthiuhreiuhriu,reuinheriuheriuheuinheiuhnreiuehiurhiuzheiuzhiuezhniuhezhiuzneiuzheiuznshiuezgyugzebuygezyug1",
        created_at: "2020-09-10 12:01",
        updated_at: "2019-09-10 12:01",
        is_active: "false",
        is_delete: "false",
        clics: 30
      },
      {
        name: "",
        id: 3,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultricies placerat lorem sit amet bibendum. Fusce eget urna nulla. Suspendisse.",
        short_url: "http://ll",
        url: "http://userpro.az",
        created_at: "2019-09-11 13:01",
        updated_at: "2019-09-11 12:01",
        is_active: "true",
        is_delete: "false",
        clics: 10920
      },
      {
        name: "",
        id: 4,
        description: "",
        short_url: "http://cc",
        url: "http://mm",
        created_at: "2017-09-10 14:01",
        updated_at: "2019-09-10 12:01",
        is_active: "true",
        is_delete: "true",
        clics: 109821
      },
      {
        name: "",
        id: 4,
        description: "",
        short_url: "http://cc",
        url: "http://mm",
        created_at: "2017-09-10 14:01",
        updated_at: "2019-09-10 12:01",
        is_active: "true",
        is_delete: "true",
        clics: 109821
      },
      {
        name: "",
        id: 4,
        description: "",
        short_url: "http://cc",
        url: "http://mm",
        created_at: "2017-09-10 14:01",
        updated_at: "2019-09-10 12:01",
        is_active: "true",
        is_delete: "true",
        clics: 109821
      },
      {
        name: "",
        id: 4,
        description: "",
        short_url: "http://cc",
        url: "http://mm",
        created_at: "2017-09-10 14:01",
        updated_at: "2019-09-10 12:01",
        is_active: "true",
        is_delete: "true",
        clics: 109821
      },
      {
        name: "",
        id: 4,
        description: "",
        short_url: "http://cc",
        url: "http://mm",
        created_at: "2017-09-10 14:01",
        updated_at: "2019-09-10 12:01",
        is_active: "true",
        is_delete: "true",
        clics: 109821
      },
      {
        name: "",
        id: 4,
        description: "",
        short_url: "http://cc",
        url: "http://mm",
        created_at: "2017-09-10 14:01",
        updated_at: "2019-09-10 12:01",
        is_active: "true",
        is_delete: "true",
        clics: 109821
      },
      {
        name: "",
        id: 4,
        description: "",
        short_url: "http://cc",
        url: "http://mm",
        created_at: "2017-09-10 14:01",
        updated_at: "2019-09-10 12:01",
        is_active: "true",
        is_delete: "true",
        clics: 109821
      },
      {
        name: "",
        id: 4,
        description: "",
        short_url: "http://cc",
        url: "http://mm",
        created_at: "2017-09-10 14:01",
        updated_at: "2019-09-10 12:01",
        is_active: "true",
        is_delete: "true",
        clics: 109821
      },
      {
        name: "",
        id: 4,
        description: "",
        short_url: "http://cc",
        url: "http://mm",
        created_at: "2017-09-10 14:01",
        updated_at: "2019-09-10 12:01",
        is_active: "true",
        is_delete: "true",
        clics: 109821
      },
      {
        name: "",
        id: 4,
        description: "",
        short_url: "http://cc",
        url: "http://mm",
        created_at: "2017-09-10 14:01",
        updated_at: "2019-09-10 12:01",
        is_active: "true",
        is_delete: "true",
        clics: 109821
      },
      {
        name: "",
        id: 4,
        description: "",
        short_url: "http://cc",
        url: "http://mm",
        created_at: "2017-09-10 14:01",
        updated_at: "2019-09-10 12:01",
        is_active: "true",
        is_delete: "true",
        clics: 109821
      },
      {
        name: "",
        id: 4,
        description: "",
        short_url: "http://cc",
        url: "http://mm",
        created_at: "2017-09-10 14:01",
        updated_at: "2019-09-10 12:01",
        is_active: "true",
        is_delete: "true",
        clics: 109821
      }, {
        name: "",
        id: 4,
        description: "",
        short_url: "http://cc",
        url: "http://mm",
        created_at: "2017-09-10 14:01",
        updated_at: "2019-09-10 12:01",
        is_active: "true",
        is_delete: "true",
        clics: 109821
      }, {
        name: "",
        id: 4,
        description: "",
        short_url: "http://cc",
        url: "http://mm",
        created_at: "2017-09-10 14:01",
        updated_at: "2019-09-10 12:01",
        is_active: "true",
        is_delete: "true",
        clics: 109821
      }, {
        name: "",
        id: 4,
        description: "",
        short_url: "http://cc",
        url: "http://mm",
        created_at: "2017-09-10 14:01",
        updated_at: "2019-09-10 12:01",
        is_active: "true",
        is_delete: "true",
        clics: 109821
      }, {
        name: "",
        id: 4,
        description: "",
        short_url: "http://cc",
        url: "http://mm",
        created_at: "2017-09-10 14:01",
        updated_at: "2019-09-10 12:01",
        is_active: "true",
        is_delete: "true",
        clics: 109821
      }, {
        name: "",
        id: 4,
        description: "",
        short_url: "http://cc",
        url: "http://mm",
        created_at: "2017-09-10 14:01",
        updated_at: "2019-09-10 12:01",
        is_active: "true",
        is_delete: "true",
        clics: 109821
      },
    ],
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        width: 100
      },
      {
        Header: 'URL',
        accessor: 'short_url',
        Cell: e => <a href={e.value}> {e.value}</a>,
        width: 100
      },
      {
        Header: 'Original URL',
        accessor: 'url',
        Cell: e => <a href={e.value} style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}> {e.value}</a>,
        width: 130
      },
      {
        Header: 'Clics',
        accessor: 'clics',
        width: 75
      },
      {
        Header: 'Created At',
        accessor: 'created_at',
      },
      {
        Header: 'Last Update',
        accessor: 'updated_at',
      },
      {
        Header: 'Active',
        accessor: 'is_active',
        maxWidth: 50,
        minWidth: 50,
        Cell: e => <span style={e.value === "true" ? { color: '#669900' } : { color: '#cc3300' }}>{e.value}</span>,
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

  const [rowSelected, setrowSelected] = useState(-1);

  return (
    <Widget title={"URLs Registered (" + data.length + ")"} className="column-widget">
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
          style={{ display: 'flex', flexDirection: 'row' }}
        />
        <span style={{ display: 'flex', alignSelf: 'center' }}>
          <button className={classNames({
            "url-actions": true,
            "active": rowSelected !== -1
          })}>View details</button>
          <button className={classNames({
            "url-actions": true,
            "active": rowSelected !== -1
          })}>Edit</button>
          <button className={classNames({
            "url-actions": true,
            "delete": rowSelected !== -1
          })}>Delete</button>
          <button className="url-actions" style={{ backgroundColor: '#1C3040', color: 'white', border: '0' }}>Shorten an URL</button>
        </span>
      </div>

      <div>
        <table {...getTableProps()} style={{ display: "flex", flexDirection: 'column' }} className="list-url">
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
                        onClick={() => { rowSelected === row.id ? setrowSelected(-1) : setrowSelected(row.id) }}
                        className={classNames({
                          "rowSelected": row.id === rowSelected,
                          "rightCell": cell.column.Header === "Active" && row.id === rowSelected,
                          "leftCell": cell.column.Header === "Name" && row.id === rowSelected
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
