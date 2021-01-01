import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {FormControl} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
export const Edit = () => {
  const [data, setData] = useState({
    name: "",
    decription: "",
  });
  const [value, setValue] = useState({
    name: "",
    decription: "",
  });
  const [con, setCon] = useState(false);
  const id = useParams().id;
  const initData = async () => {
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const rep = res.data;
      console.log(rep);
      setData({
        name: rep.title,
        decription: rep.body,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    initData();
  }, []);
  const handleChange = (event) => {
    console.log(event.target);
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };
  const putData = async () => {
    try {
      const res = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          userId: 1,
          id: id,
          title: value.name,
          body: value.decription,
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = (event) => {
    event.Preventdefault();
  };

  useEffect(() => {
    putData();
  }, [con]);
  // })
  return (
    <div onSubmit={handleSubmit}>
      <Form>
        <Form.Group>
          <Form.Label>
            Name
          </Form.Label>
          <Form.Control placeholder={data.name}
          value={value.name}
         
          onChange={handleChange}
          name="name" type="email" />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Decription
          </Form.Label>
          <Form.Control placeholder={data.decription}
          value={value.decription}
          type="text"
          onChange={handleChange}
          name="decription"   as="textarea" rows={3} />
        </Form.Group>
        <Button type="submit"
          onSubmit={() => {
            setCon(true);
          }} variant="outline-primary">Submit</Button>
      </Form>
    </div>
  );
};
