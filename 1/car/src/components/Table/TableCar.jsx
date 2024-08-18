import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const columns = [
  { field: 'carName', headerName: 'Название машины', width: 150 },
  { field: 'manufacturer', headerName: 'Производитель', width: 150 },
  { field: 'year', headerName: 'Год выпуска', width: 130 },
  { field: 'engineCapacity', headerName: 'Объем', width: 130 },
  { field: 'color', headerName: 'Цвет', width: 100 },
  { field: 'price', headerName: 'Цена', width: 100 },
  { field: 'description', headerName: 'Описание', width: 300 },
];

export default function TableCar() {
  const [rows, setRows] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [editRow, setEditRow] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const data = localStorage.getItem('cars');
    if (data) {
      setRows(JSON.parse(data));
    }
  }, []);

  const handleDelete = () => {
    const newRows = rows.filter(row => !selectedRows.includes(row));
    setRows(newRows);
    localStorage.setItem('cars', JSON.stringify(newRows));
    setSelectedRows([]);
  };

  const handleEditOpen = () => {
    if (selectedRows.length === 1) {
      setEditRow(rows.find(row => row.id === selectedRows[0]));
      setOpen(true);
    }
  };

  const handleEditClose = () => {
    setOpen(false);
    setEditRow(null);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditRow(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const newRows = rows.map(row => row.id === editRow.id ? editRow : row);
    setRows(newRows);
    localStorage.setItem('cars', JSON.stringify(newRows));
    handleEditClose();
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={(newSelection) => {
          setSelectedRows(newSelection);
        }}
      />
      {selectedRows.length > 0 && (
        <div style={{ marginTop: 16 }}>
          {selectedRows.length === 1 && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditOpen}
              style={{ marginRight: 16 }}
            >
              Редактировать
            </Button>
          )}
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDelete}
          >
            Удалить
          </Button>
        </div>
      )}
      <Dialog open={open} onClose={handleEditClose}>
        <DialogTitle>Редактировать машину</DialogTitle>
        <DialogContent>
          {editRow && (
            <>
              <TextField
                autoFocus
                margin="dense"
                id="carName"
                name="carName"
                label="Название машины"
                type="text"
                fullWidth
                variant="standard"
                value={editRow.carName}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                id="manufacturer"
                name="manufacturer"
                label="Производитель"
                type="text"
                fullWidth
                variant="standard"
                value={editRow.manufacturer}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                id="year"
                name="year"
                label="Год выпуска"
                type="number"
                fullWidth
                variant="standard"
                value={editRow.year}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                id="engineCapacity"
                name="engineCapacity"
                label="Объем"
                type="text"
                fullWidth
                variant="standard"
                value={editRow.engineCapacity}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                id="color"
                name="color"
                label="Цвет"
                type="text"
                fullWidth
                variant="standard"
                value={editRow.color}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                id="price"
                name="price"
                label="Цена"
                type="text"
                fullWidth
                variant="standard"
                value={editRow.price}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                id="description"
                name="description"
                label="Описание"
                type="text"
                fullWidth
                variant="standard"
                value={editRow.description}
                onChange={handleEditChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Отмена</Button>
          <Button onClick={handleSave}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
