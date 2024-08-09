import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";


export default function ProductView () {

    const { productId } = useParams();

    const { user } = useContext(UserContext)

    const [ name, setName ] = useState("");
	const [ description, setDescription ] = useState("");
	const [ price, setPrice ] = useState(0);

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
    }, [quantity])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
        .then(res => res.json())
        .then(data => {
            setName(data.product.name);
			setDescription(data.product.description);
			setPrice(data.product.price);
        })
    }, [productId])

    const addToCart = () => {
        const subtotal = quantity * price;

        fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/add-to-cart`, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                productId,
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
        user.isAdmin ?
        <Navigate to={'/products'}/>

        :
        <Container className="mt-5">
            <Row>
                <Col lg={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Body className="text-center">
                            <Card.Title>{name}</Card.Title>
                            <Card.Subtitle>Description:</Card.Subtitle>
                            <Card.Text>{description}</Card.Text>
							<Card.Subtitle>Price:</Card.Subtitle>
                            <Card.Text>PhP {price}</Card.Text>
                            <Link><Button variant="btn btn-primary" disabled={ isActive ? false : true} onClick={addToCart}>Add to cart</Button></Link>
                            <br/>
                            <label>Quantity</label>
                            <br/>
                            <Button variant="primary" onClick={decreaseQuantity}>-</Button>
                            <label className='mx-2'>{quantity}</label>
                            <Button variant="primary" onClick={increaseQuantity}>+</Button>
                        </Card.Body>        
                    </Card>
                </Col>
            </Row>
		</Container>
    )
}