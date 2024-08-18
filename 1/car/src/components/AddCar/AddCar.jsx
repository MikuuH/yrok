import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function FormDialog({ open, handleClose }) {

    const getDataFromLocalStorage = () => {
        const data = localStorage.getItem('cars');
        return data ? JSON.parse(data) : [];
      };
      

    const addCarToLocalStorage = (newCar) => {
        const existingData = getDataFromLocalStorage();
        const maxId = existingData.length ? Math.max(...existingData.map(car => car.id)) : 0;
        newCar.id = maxId + 1;
        existingData.push(newCar);
        localStorage.setItem('cars', JSON.stringify(existingData));
      };
      

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newCar = Object.fromEntries(formData.entries());
        addCarToLocalStorage(newCar);
        handleClose();
        };
      
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >

      <DialogTitle>Добавить машину</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="carName"
          name="carName"
          label="Название машины"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          required
          margin="dense"
          id="manufacturer"
          name="manufacturer"
          label="Производитель"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          required
          margin="dense"
          id="year"
          name="year"
          label="Год выпуска"
          type="number"
          fullWidth
          variant="standard"
        />
        <TextField
          required
          margin="dense"
          id="engineCapacity"
          name="engineCapacity"
          label="Объем"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          required
          margin="dense"
          id="color"
          name="color"
          label="Цвет"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          required
          margin="dense"
          id="price"
          name="price"
          label="Цена"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          required
          margin="dense"
          id="description"
          name="description"
          label="Описание"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button type="submit">Добавить</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function AddCar() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Button
        variant="contained"
        color="success"
        onClick={handleClickOpen}
        className="text-3xl h-[50px]"
      >
        ДОБАВИТЬ
      </Button>
      <FormDialog open={open} handleClose={handleClose} />
    </div>
  );
}
