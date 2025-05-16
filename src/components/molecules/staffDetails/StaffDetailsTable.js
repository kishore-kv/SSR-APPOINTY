import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton,Typography} from '@mui/material';


const StaffDetailsTable = ({staff, handleDelete, page, setPage, rowsPerPage, totalCount, handleOpenModal, setSearchedData, setRowsPerPage}) => {
    
    const handleChangeRowsPerPage = (event) => {
        const newLimit = parseInt(event.target.value, 10);
        setRowsPerPage(newLimit);
        setSearchedData(prev => ({ ...prev, limit: newLimit, page: 1 }));
    };
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage+1);
        setSearchedData(prev => ({ ...prev, page: newPage+1 }));
    };    

    return (
        <div className='table-container_wrapper' style={{ width: '100%', marginTop: '20px' }}>
            {staff.length === 0 ? (
                <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                        No Staff found
                    </Typography>
                </Box>) : (
                <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }} className="table-container" >
                    <Table sx={{ minWidth: 700 }} aria-label="customized table" >
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#17679b" }}>
                                <TableCell sx={{ color: "white", fontWeight: "bold"}} > Name </TableCell>
                                <TableCell align="right" sx={{ color: "white", fontWeight: "bold" }} > Email </TableCell>
                                <TableCell align="right" sx={{ color: "white", fontWeight: "bold" }} > Role </TableCell>
                                <TableCell align="right" sx={{ color: "white", fontWeight: "bold" }} > Visibilty </TableCell>
                                <TableCell align="right" sx={{ color: "white", fontWeight: "bold" }} > Actions </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(staff) &&
                                staff.map((row, index) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ backgroundColor: index % 2 ? "action.hover" : "inherit",}}
                                    >
                                        <TableCell component="th" scope="row" onClick={() => handleOpenModal(row)}>{row.firstName} {row.lastName} </TableCell>
                                        <TableCell align="right"> {row.email} </TableCell>
                                        <TableCell align="right"> {row.role} </TableCell>
                                        <TableCell align="right"> {row.visibilty} </TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => handleDelete(row) } >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <TablePagination
                rowsPerPageOptions={[2, 4, 10, 25, 50]}
                component="div"
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page -1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                showFirstButton={true}
                showLastButton={true}
                labelRowsPerPage={
                    <span className="pagination-label">Registros por página:</span>
                }
                labelDisplayedRows={({ from, to, count }) =>
                    <span className="pagination-displayed-rows">{from}-{to} de {count}</span>
                }
            />
        </div>
    )
}

export default StaffDetailsTable;
