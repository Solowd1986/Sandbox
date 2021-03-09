import React, { Component } from "react";
import styles from "./formik-form.module.scss"

import { Formik } from 'formik';
import * as yup from "yup";

export default class FormikForm extends Component {
    render() {

        const phones = [
            { id: 1, title: "phone 1", qnt: 1, rest: 8, price: 1200 },
            { id: 2, title: "phone 2", qnt: 1, rest: 56, price: 4610 },
            { id: 3, title: "phone 3", qnt: 1, rest: 15, price: 2167 },
        ];

        const validationSchema = yup.object().shape({
            name:
                yup.string().matches(/^\w+$/, "Логин должен состоять из латинницы и цифр").matches(/^[a-z]/, "Логин не должен начинаться с числа").min(4, "Логин должен включать не менее 4 символов").max(15, "Логин должен включать не более 15 символов").required("Данное поле обязательно"),
            email: yup.string().email("Введите корректный email").required("Данное поле обязательно"),
        });

        const rebr = (arr) => {
            const res = {};
            arr.forEach(item => {
                res[item.title] = item.qnt
            });
            return res;
        };

        //console.log(rebr(phones));

        return (
            <Formik
                initialValues={{ email: "sam@ya.ru", password: "1234", ...rebr(phones), name: "" }}

                validationSchema={validationSchema}

                // validate={values => {
                //     const errors = {};
                //     if (!values.email) {
                //         errors.email = 'Email Is Required';
                //     } else if (
                //         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                //     ) {
                //         errors.email = 'Invalid email address';
                //     }
                //     return errors;
                // }}

                handleBlur={e => console.log("bluuuuurr", { e })}

                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 40);
                }}
            >

                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      isValid,
                      dirty
                  }) => (


                    <form onSubmit={handleSubmit} className={styles.formik}>
                        {
                            phones.map(item => {
                                return (
                                    <div key={item.id} className={styles.inp}>
                                        <span>{item.title}</span>
                                        <input
                                            min={1}
                                            max={item.rest}
                                            name={item.title}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={item.qnt}
                                            type="text"/>
                                        <span>del</span>
                                    </div>
                                )
                            })
                        }

                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                        />
                        {errors.name && touched.name && errors.name}

                        {/*
                        <input type="radio" checked onChange={handleChange} onBlur={handleBlur} name={"rad"} value={1}/>
                        <input type="radio" onChange={handleChange} onBlur={handleBlur} name={"rad"} value={2}/>
                        <input type="radio" onChange={handleChange} onBlur={handleBlur} name={"rad"} value={3}/>
                        */}



                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {errors.email && touched.email && <span className={styles.fieldError}>{errors.email}</span>}
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        {errors.password && touched.password && errors.password}

                        <button
                            type="submit"
                            disabled={!isValid || !dirty}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
        )
    }
}


