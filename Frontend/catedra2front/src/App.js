import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function App() {
  const [Productos, setProductos] = useState([]);
  const [newProduct, setNewProduct] = useState({}); // Nuevo estado para el nuevo producto

  useEffect(() => {
    try {
      axios.get('http://localhost:5218/api/productoss')
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

  const addProduct = (product) => { // Nueva función para agregar un producto
    axios.post('http://localhost:5218/api/productoss', product)
      .then(res => {
        setProductos([...Productos, res.data]);
      })
      .catch(error => {
        console.log(error);
      });
  };


  const deleteProduct = (productId) => { // Nueva función para eliminar un producto
    axios.delete(`http://localhost:5218/api/productos/${productId}`)
      .then(res => {
        setProductos(Productos.filter(product => product.id !== productId));
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      {Productos.map((product, index) => (
        <Card key={index} style={{ width: '18rem' }}>
          <Card.Img variant="top" src={product.image} />
          <Card.Body>
            <Card.Title>{product.nombre}</Card.Title>
            <Card.Text>{product.descripcion}</Card.Text>
            <Card.Text>Precio: ${product.precio}</Card.Text>
            <Button variant="primary">Ver detalles</Button>
            <Button variant="danger" onClick={() => deleteProduct(product.id)}>Eliminar</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default App;