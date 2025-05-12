import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Box, IconButton,Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ServiceDetailsTable = ({services, handleDelete, page, setPage, rowsPerPage, totalCount, handleOpenModal, setSearchedData, setRowsPerPage}) => {

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setSearchedData(prev => ({ ...prev, page: newPage+1 }));
    };

    const handleChangeRowsPerPage = (event) => {
        const newLimit = parseInt(event.target.value, 10);
        setRowsPerPage(newLimit);
        setPage(0);
        setSearchedData(prev => ({ ...prev, limit: newLimit, page: 1 })); 
    };

    

    return (
        <div className='table-container_wrapper' style={{ width: '100%', marginTop: '20px' }}>
            {services.length === 0 ? (
                <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                        No services found
                    </Typography>
                </Box>
            ): (
                <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }} className='table-container'>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#17679b' }}>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Service</TableCell>
                                <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Duration</TableCell>
                                <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
                                <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Visibilty</TableCell>
                                <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(services) &&
                                services.map((service, index) => (
                                    <TableRow
                                        key={service.serviceId}
                                        sx={{ backgroundColor: index % 2 ? 'action.hover' : 'inherit' }}
                                    >
                                        <TableCell component="th" scope="row" onClick={() => handleOpenModal(service)}>{service?.serviceName}</TableCell>
                                        <TableCell align="right">{service?.durationMins}</TableCell>
                                        <TableCell align="right">{service?.price}</TableCell>
                                        <TableCell align="right">{service?.isActive}</TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => handleDelete(service)}>
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
                count={totalCount || 0}
                rowsPerPage={rowsPerPage}
                page={page} 
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

export default ServiceDetailsTable;