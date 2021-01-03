import React, { useState } from 'react';
import axios from "axios";
import { Formik } from 'formik';
import * as Yup from 'yup';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form} from 'react-bootstrap';
const SignupSchema = Yup.object().shape({
   name: Yup.string()
     .min(3, 'Too Short!')
     .max(36, 'Too Long!')
     .required('Required'),
   description: Yup.string()
     .min(3, 'Too Short!')
     .max(200, 'Too Long!')
     .required('Required'),
   email: Yup.string().email('Invalid email').required('Required'),
 });

export const FormPost = ()=>{
    // const [value,setValue] = useState({
    //     name:"",
    //     description:"",
    //     email:""
    // })
    // console.log(value)
    return(
    <div>
        <Formik
        initialValues={{
         name: '',
         description: '',
         email: '',
       }}
       validationSchema={SignupSchema}
       onSubmit={(values,{setSubmitting , resetForm})=>{
           setSubmitting(true);
           const value = JSON.stringify(values,null,3)
           console.log(value)
           setTimeout(()=>{
            axios.post('https://jsonplaceholder.typicode.com/comments',{
                name: value.name,
                email : value.email,
                body : value.description
            })
            resetForm();
            setSubmitting(false)
           },500)
       }}
     >
       {({ errors, touched , values,handleBlur,handleChange,handleSubmit ,isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" placeholder="Enter your name" onChange={handleChange} onBlur={handleBlur} value={values.name}/>
                {touched.name && errors.name ? <div>Name Invalid</div> : null}
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter your email" onChange={handleChange} onBlur={handleBlur} value={values.email}/>
                {touched.email && errors.email ? <div>Email Invalid</div> : null}
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} type="email" name="description" placeholder="Description" onChange={handleChange} onBlur={handleBlur} value={values.description}/>
                {touched.description && errors.description ? <div>Description Invalid</div> : null}
            </Form.Group>
            <Button type="submit" variant="outline-primary" disabled={isSubmitting} >Post</Button>
        </Form>
       )}
     </Formik>
   </div>
    )
}
