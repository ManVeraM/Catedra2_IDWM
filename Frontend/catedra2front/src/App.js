import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import {Modal,TextField} from '@material-ui/core';


function App() {
  const [Productos, setProductos] = useState([]);
  const [NewProduct, setNewProduct] = useState({}); 
  const [Updating, setUpdating] = useState(false);
  const [Adding, setAdding] = useState(true);

  const [open, setOpen] = useState(false); 

  const handleOpen = () => { 
    setOpen(true);
  };
  
  const handleClose = () => { 
    setOpen(false);
  };
  


  useEffect(() => {
    try {
      axios.get('http://localhost:5218/api/productos')
        .then(res => {
          setProductos(res.data);
          console.log(Productos);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []); 

  const addProduct = (product) => { 
    axios.post('http://localhost:5218/api/productos', product)
      .then(res => {
        setProductos([...Productos, res.data]);
      })
      .catch(error => {
        console.log(error);
      });
  };


  const deleteProduct = (productId) => { 
    axios.delete(`http://localhost:5218/api/productos/${productId}`)
      .then(res => {
        setProductos(Productos.filter(product => product.id !== productId));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const updateProduct = (updatedProduct) => { 
    axios.get(`http://localhost:5218/api/productos/${updatedProduct.id}`)
      .then(res => {
        const productToUpdate = {...res.data, ...updatedProduct}; 
        axios.put(`http://localhost:5218/api/productos/${updatedProduct.id}`, productToUpdate)
          .then(res => {
            setProductos(Productos.map(product => product.id === updatedProduct.id ? res.data : product));
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div style={{ background: '#f0f0f0', minHeight: '100vh', padding: '20px' }}>
      <Grid container spacing={2}>
        {Productos.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={{ maxWidth: 345, margin: '10px' }}>
              <CardMedia
                sx={{ height: 140 }}
                image={product.image}
                title={product.nombre}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.descripcion}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Precio: ${product.precio}
                </Typography>
              </CardContent>
              <Grid container justifyContent="center">
                <Grid item>
                  <CardActions>
                    <Button size="small" variant="contained" onClick={() => updateProduct(product.id)}>Editar</Button>
                  </CardActions>
                </Grid>
                <Grid item>
                  <CardActions>
                    <Button size="small" variant="contained" color="error" onClick={() => deleteProduct(product.id)}>Eliminar</Button>
                  </CardActions>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box mt={3} display="flex" justifyContent="center">
        <Button variant="contained" color="succes">Agregar Producto</Button>
      </Box>
      <Box mt={3} display="flex" justifyContent="center">
      <Button variant="contained" color="success" onClick={handleOpen}>Agregar Producto</Button>
    </Box>
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: 400, 
        bgcolor: 'background.paper', 
        boxShadow: 24, 
        p: 4 
      }}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField label="Nombre del producto" variant="outlined" fullWidth />
          </Grid>
          <Grid item>
            <TextField label="Precio del producto" variant="outlined" fullWidth />
          </Grid>
          <Grid item>
            <Button variant="contained" color="success" onClick={addProduct}>Agregar Producto</Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
    </div>

    
  );
}

export default App;