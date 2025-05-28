import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Typography,
  IconButton,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomModal from '../modal/CustomModal';

export default function CustomSetModal({ open, onClose, onSave, data, fields, locationData, handleOpenModalLocation }) {
  const [editModalOpen, setEditModalOpen] = useState(false); // <- NEW

  const locationInfo = locationData?.location || {};
  const servicesList = locationData?.servicesList || [];

  const handleEdit = (locationInfo) => {
    setEditModalOpen(true);
    handleOpenModalLocation(locationInfo);
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <Box>
                <Typography variant="h6">{locationInfo.branchName}</Typography>
                {/* <Typography variant="body2">{locationInfo.branchName}</Typography> */}
              </Box>
            </Box>
            <Box>
              <IconButton onClick={()=>handleEdit(locationInfo)}>
                <EditIcon />
              </IconButton>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Service</TableCell>
                <TableCell>Staff</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {servicesList.map((service, sIdx) =>
                service.staffList.map((staff, stIdx) => (
                  <TableRow key={`${locationInfo.id}-${service.name}-${staff.name}`}>
                      <TableCell>{stIdx === 0 ? service.serviceName : ""}</TableCell>
                      <TableCell>{`${staff.firstName} ${staff.lastName}`}</TableCell>
                    </TableRow>
                  ))
                )
              }
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      {/* This modal is independent now */}
      <CustomModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={onSave}
        data={data}
        fields={fields}
      />
    </>
  );
}
