import { CardMedia, Icon, IconButton } from "@mui/material";
import React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import axios from "axios";


export default function Home() {

    const [APIData, setAPIData] = useState([]);
    const getStaffsUrl = 'https://65459389fe036a2fa9547cff.mockapi.io/staffManagement';

    useEffect(() => {
        axios.get(getStaffsUrl).then(
            response => {
                return response.data;
            })
            .then(data => { setAPIData(data.sort((a, b) => { return b.age - a.age })) })
            .catch(error => console.log(error.message));

    }, [])

    return (
        <div className="marginLR">
            <h1 className="font-pages" style={{ marginBottom: '0' }}>Home</h1>

            <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                {APIData.map((staff) => (
                    <Grid item xs={6} sm={4} md={3}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{ height: 240 }}
                                image={staff.avatar}
                                title="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    <Link to={`/detail/${staff.id}`} className="name-dashboard">
                                        {staff.name}
                                    </Link>
                                </Typography>

                                <Typography gutterBottom variant="h7" component="div">
                                    Address: {staff.address}
                                </Typography>

                                <Typography gutterBottom variant="h7" component="div">
                                    Age: {staff.age}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={`detail/${staff.id}`}>
                                    <Button size="small">Detail
                                        <IconButton><Icon sx={{ color: 'inherit' }}>info</Icon></IconButton></Button>
                                </Link>

                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}