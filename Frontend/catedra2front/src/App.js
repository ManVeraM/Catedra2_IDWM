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
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default App;