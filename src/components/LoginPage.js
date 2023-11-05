
import { Alert, AlertTitle, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Stack, TextField, Typography } from '@mui/material';
// import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Accounts from '../shared/AccountLogin';

export default function LoginPage() {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },

        onSubmit: () => {
            for (const account of Accounts) {
                if (formik.values.username === account.username && formik.values.password === account.password) {
                    localStorage.setItem('key', 'USER');
                    alert('Login Successfully');
                    navigate('/home');
                    return
                }
            }
            setOpen(true)
        },

        validationSchema: Yup.object({
            username: Yup.string().required("Required.").typeError("Please enter username"),
            password: Yup.string().required("Required.").typeError("Please enter password")
        }),

    });

    return (
        <div className="marginLR">

            <h1 className="font-pages" style={{ marginBottom: '0' }}>Login</h1>

            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="Username"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.username && (<Typography variant="caption" color="red">{formik.errors.username}</Typography>)}
                    <TextField
                        label="Password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.password && (<Typography variant="caption" color="red">{formik.errors.password}</Typography>)}

                    <Button variant="contained" size="large"
                        type='submit'>
                        Login
                    </Button>

                </Stack>

            </form>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Error"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Alert severity="error">
                            <AlertTitle>Invalid username or password</AlertTitle>
                        </Alert>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
};


