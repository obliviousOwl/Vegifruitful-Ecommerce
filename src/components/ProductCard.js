import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


export default function ProductCard({productProp}) {

    const { name, description, price, _id } = productProp;
    const [ quantity, setQuantity ]  = useState(0); 
    const [ isActive, setIsActive ] = useState(false);

    const navigate = useNavigate();

    const increaseQuantity = () => {
        setQuantity(prevCount => prevCount + 1);
    }

    const decreaseQuantity = () => {
        if(quantity > 0){
            setQuantity(prevCount => prevCount - 1);
        }
    }

    useEffect(() => {
        if(quantity === 0){
            setIsActive(false);
        }
        else{
            setIsActive(true);
        }
    }, [ quantity])

    const addToCart = () => {
        const subtotal = quantity * price;

        fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/add-to-cart`, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                productId: _id,
                quantity,
                subtotal
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.message === 'Item added to cart successfully'){
                Swal.fire({
                    title: 'Item has been added to cart',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Go to Cart"
                })
                .then((result) => {
                    if(result.isConfirmed) {
                        navigate('/cart')
                    }
                })
            }
            else(
                Swal.fire({
                    title: 'error',
                    icon: 'error'
                })
            )
        }).catch(e => console.log(e))
    }


    return (
        <Card className="mb-4">
        <Card.Body>
            <Card.Title><Link variant="btn btn-primary" to={`/products/${_id}`}>{name}</Link></Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Price: ${price.toFixed(2)}</Card.Subtitle>
            <Card.Text>{description}</Card.Text>
            <Link><Button variant="btn btn-primary" disabled={ isActive ? false : true} onClick={addToCart}>Add to cart</Button></Link>
            <br/>
            <label>Quantity</label>
            <br/>
            <Button variant="primary" onClick={decreaseQuantity}>-</Button>
            <label className='mx-2'>{quantity}</label>
            <Button variant="primary" onClick={increaseQuantity}>+</Button>
        </Card.Body> 
    </Card>
      );

}