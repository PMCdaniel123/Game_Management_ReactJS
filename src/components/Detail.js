import * as React from 'react';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CardContent } from "@mui/material";
import { Card, Grid } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Typography } from "@mui/material";

export default function Detail() {

    const game = useParams();
    // const [value, setValue] = React.useState(2);
    const [APIData, setAPIData] = useState([]);
    const getGamesUrl = `https://65459389fe036a2fa9547cff.mockapi.io/GameList/${game.id}`;


    useEffect(() => {
        fetch(getGamesUrl, { method: 'GET' }).then(
            response => {
                if (!response.ok) {
                    throw new Error(`HTTP status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => { setAPIData(data) })
            .catch(error => console.log(error.message));

    }, [getGamesUrl])

    return (
        <div className="marginLR">
            <Grid container rowSpacing={2} marginTop={10}>
                <Grid className='parent' item xs={12}>
                    <Card className='child' sx={{ maxWidth: 400 }}>
                        <CardMedia
                            sx={{ height: 400 }}
                            image={APIData.Background}
                            title={APIData.Title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h3" component="div" style={{ fontWeight: "600" }}>
                                {APIData.Title}
                            </Typography>

                            <Typography gutterBottom variant="h7" component="div" align='left' fontStyle={'italic'}>
                                {APIData.Description}
                            </Typography>

                            <Typography gutterBottom variant="h7" component="div">
                                Author: {APIData.Author}
                            </Typography>

                            <Typography gutterBottom variant="h7" component="div">
                                Kind: {APIData.Kind}
                            </Typography>

                            <Typography gutterBottom variant="h7" component="div">
                                Price: {APIData.Price}$
                            </Typography>

                            <Typography gutterBottom variant="h7" component="div">
                                Publish: {APIData.Created_at}
                            </Typography>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}