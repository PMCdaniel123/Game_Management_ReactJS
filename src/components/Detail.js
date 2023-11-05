import * as React from 'react';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CardContent } from "@mui/material";
import { Card, Grid } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Typography } from "@mui/material";


export default function Detail() {

    const staff = useParams();
    // const [value, setValue] = React.useState(2);
    const [APIData, setAPIData] = useState([]);
    const getStaffsUrl = `https://65459389fe036a2fa9547cff.mockapi.io/staffManagement/${staff.id}`;

    useEffect(() => {
        fetch(getStaffsUrl, { method: 'GET' }).then(
            response => {
                if (!response.ok) {
                    throw new Error(`HTTP status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => { setAPIData(data) })
            .catch(error => console.log(error.message));

    }, [getStaffsUrl])

    return (
        <div>
            <h1>Detail</h1>
            <Grid container rowSpacing={2} >
                <Grid className='parent' item xs={12}>
                    <Card className='child' sx={{ maxWidth: 545 }}>
                        <CardMedia
                            sx={{ height: 400 }}
                            image={APIData.avatar}
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h3" component="div">
                                {APIData.name}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                Address: {APIData.address}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                Age: {APIData.age}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                {APIData.createdAt}
                            </Typography>
                            {/* <Box
                                sx={{
                                    '& > legend': { mt: 2 },
                                }}
                            >
                                <Typography component="legend">Controlled</Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                />
                            </Box> */}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}