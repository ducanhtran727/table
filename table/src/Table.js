import React, { useState, useEffect, useRef, useImperativeHandle ,forwardRef } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import {DataGrid} from '@material-ui/core'
import {useHistory} from 'react-router-dom';
import {Route} from "react-router-dom";
import {Edit} from './Edit';
import '@material-ui/icons';

const colunms = [
  { title: "Name", field: "name" },
  { title: "Email", field: "email" },
  { title: "Description", field: "body" },
];
export const Table = () => {
  const [list, setList] = useState([]);
  const [toggle,setToggle] = useState(true);
  const initData = async () => {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      );
      console.log(res.data[0].id);
      setList(res?.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    initData();
  }, [toggle]);
  const history = useHistory();
  console.log(history);
  return (
    <div>
      <MaterialTable
        columns={colunms}
        title="Table Test"
        data={list} 
        actions={[
          {
            icon: "save",
            tooltip: "Save User",
            onClick: (event, rowData) => {
            alert("You update id : " + rowData.id);
            console.log(rowData);
            history.push(`/edit/${rowData.id}`);
            },
          },
            {
          icon: 'delete',
          tooltip: 'Delete User',
          onClick: (event, rowData) => {
              alert("You want to delete " + rowData.name)
              axios.delete(`https://jsonplaceholder.typicode.com/posts/${rowData.id}`);
              setToggle(!toggle)
              }
            }
          
        ]}
      />
      
    </div>
  );
};