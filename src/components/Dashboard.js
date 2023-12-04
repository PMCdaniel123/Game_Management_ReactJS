import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import axios from 'axios';
import { Alert, AlertTitle, Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon, Stack, TableHead } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { green } from '@mui/material/colors';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default function CustomPaginationActionsTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [APIData, setAPIData] = useState([]);
    const [open, setOpen] = useState(false);
    const [openDelSucDia, setOpenDelSucDia] = useState(false);
    const [idDelete, setIdDelete] = useState(-1);
    const getGamesUrl = 'https://65459389fe036a2fa9547cff.mockapi.io/GameList';
    const deleteGamesUrl = `https://65459389fe036a2fa9547cff.mockapi.io/GameList`;

    React.useEffect(() => {
        loadGames();
    }, [])

    const loadGames = () => {
        axios.get(getGamesUrl).then(
            response => {
                return response.data;
            })
            .then(data => { setAPIData(data.sort((a, b) => { return a.id - b.id })) })
            .catch(error => console.log(error.message));
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    // const emptyRows =
    //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOk = () => {
        setOpenDelSucDia(false);
        loadGames();
    };

    const deleteGame = () => {
        setOpen(false);
        axios.delete(deleteGamesUrl + `/${idDelete}`)
            .then(
                response => {
                    return response.data;
                })
            .then(data => setOpenDelSucDia(true))
            .catch(error => console.log(error.message));

    };

    const showConfirmDeleteDialog = (id) => {
        setIdDelete(id);
        setOpen(true);
    };

    return (
        <div className="marginLR">
            <h1 className="font-pages" style={{ marginBottom: '0' }}>Dashboard</h1>

            <Link to="/addGame" style={{ display: 'flex' }} className="add-btn">
                <IconButton><Icon sx={{ color: green[500] }}>add_circle</Icon></IconButton>
                <h3>Add new game</h3>
            </Link>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="left">Author</TableCell>
                            <TableCell align="left">Kind</TableCell>
                            <TableCell align="left">Poster</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="left">Publish</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? APIData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : APIData
                        ).map((game) => (
                            <TableRow
                                key={game.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {game.id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Link to={`/detail/${game.id}`} className="name-dashboard">
                                        {game.Title}
                                    </Link>
                                </TableCell>
                                <TableCell align="left">{game.Author}</TableCell>
                                <TableCell align="left">{game.Kind}</TableCell>
                                <TableCell align="center">
                                    <Avatar align="left" alt="Remy Sharp" src={game.Poster} />
                                </TableCell>
                                <TableCell align="left">{game.Price}$</TableCell>
                                <TableCell align="left">{game.Created_at}</TableCell>
                                <TableCell align="left">
                                    <Stack direction="row" spacing={1}>
                                        <Link to={`/updateGame/${game.id}`}>
                                            <IconButton><Icon sx={{ color: 'blue' }}>update_circle</Icon></IconButton>
                                        </Link>
                                        <IconButton onClick={(e) => { showConfirmDeleteDialog(game.id) }}><Icon sx={{ color: 'red' }}>delete_circle</Icon></IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={APIData.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete Game"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Alert severity="warning">
                            <AlertTitle>Are you sure to delete this game ?</AlertTitle>
                        </Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteGame}>Yes</Button>
                    <Button autoFocus onClick={handleClose}>
                        No
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openDelSucDia}
                onClose={handleOk}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Message"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Alert severity="success">
                            <AlertTitle>Delete Game Successfully</AlertTitle>
                        </Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOk}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}