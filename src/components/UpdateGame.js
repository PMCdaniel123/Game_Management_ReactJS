import { useFormik } from "formik";
import * as Yup from 'yup';
import { Button, Input } from "@mui/material";
import * as React from 'react';
import Stack from "@mui/material/Stack";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import DialogActions from "@mui/material/DialogActions";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UpdateGame() {
    const game = useParams();

    const [open, setOpen] = useState(false);

    const [APIData, setAPIData] = useState([]);
    const getGamesUrl = `https://65459389fe036a2fa9547cff.mockapi.io/GameList/${game.id}`;

    useEffect(() => {
        axios.get(getGamesUrl).then(
            response => {
                return response.data;
            })
            .then(data => { setAPIData(data) })
            .catch(error => console.log(error.message));

    }, [getGamesUrl])

    const handleClose = () => {
        setOpen(false);
    };

    const putGameUrl = `https://65459389fe036a2fa9547cff.mockapi.io/GameList/${game.id}`;
    // const currDate = new Date();

    const formik = useFormik({

        enableReinitialize: true,
        initialValues: APIData,
        // values : {APIData},

        onSubmit: (values) => {
            axios.put(putGameUrl, values)
                .then(
                    response => {
                        return response.data;
                    })
                .then(data => setOpen(true))
                .catch(error => console.log(error.message));

        },

        validationSchema: Yup.object({
            Title: Yup.string().required("Empty Title of Game.").min(3, "Must be more 2 characters"),
            Author: Yup.string().required("Empty Author Name.").typeError("Please enter author name"),
            Kind: Yup.string().required("Empty Kind of Game.").typeError("Please enter kind"),
            Poster: Yup.string().url().required("Empty Poster link.").typeError("Please enter a valid url"),
            Background: Yup.string().url().required("Empty Background link.").typeError("Please enter a valid url"),
            Price: Yup.number().integer().required("Empty Price.").typeError("Please enter a valid number").min(0, "Price is greater than or equal 0"),
            Created_at: Yup.string().required("Required.").typeError("Please enter date"),
            Rating: Yup.number().integer('Please enter a valid number').required('Empty Rating.').min(0, 'Rating should be from 0 to 5').max(5, 'Rating should be from 0 to 5')
        }),
    });

    return (
        <div className="marginLR">
            <h1 className="font-pages" style={{ marginBottom: '0' }}>Update Game</h1>

            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={5}>
                    <Input
                        label="Title"
                        name="Title"
                        value={formik.values.Title}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.Title && (<Typography variant="caption" color="red">{formik.errors.Title}</Typography>)}
                    <Input
                        label="Description"
                        name="Description"
                        value={formik.values.Description}
                        onChange={formik.handleChange}
                    />
                    <Input
                        label="Author"
                        name="Author"
                        value={formik.values.Author}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.Author && (<Typography variant="caption" color="red">{formik.errors.Author}</Typography>)}
                    <Input
                        label="Kind"
                        name="Kind"
                        value={formik.values.Kind}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.Kind && (<Typography variant="caption" color="red">{formik.errors.Kind}</Typography>)}

                    <Input
                        label="Poster"
                        name="Poster"
                        value={formik.values.Poster}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.Poster && (<Typography variant="caption" color="red">{formik.errors.Poster}</Typography>)}
                    <Input
                        label="Background"
                        name="Background"
                        value={formik.values.Background}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.Background && (<Typography variant="caption" color="red">{formik.errors.Background}</Typography>)}
                    <Input
                        label="Price"
                        name="Price"
                        value={formik.values.Price}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.Price && (<Typography variant="caption" color="red">{formik.errors.Price}</Typography>)}
                    <Input
                        label="Publish"
                        name="Created_at"
                        disabled
                        value={formik.values.Created_at}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.Created_at && (<Typography variant="caption" color="red">{formik.errors.Created_at}</Typography>)}
                    <Input
                        label="Rating"
                        name="Rating"
                        value={formik.values.Rating}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.Rating && (<Typography variant="caption" color="red">{formik.errors.Rating}</Typography>)}
                    <Button variant="contained" size="large"
                        type='submit'>
                        Update
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
                    {"Congraturation"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Alert severity="success">
                            <AlertTitle>Updating successfully!</AlertTitle>
                        </Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button><Link to='/home' style={{ textDecoration: "none" }}>Back to home</Link></Button>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}