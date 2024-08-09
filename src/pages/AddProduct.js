import { Form, FloatingLabel, Button  } from "react-bootstrap"
import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import { Navigate, useNavigate } from "react-router-dom";

export default function AddProduct() {

    const { user } = useContext(UserContext)

    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ price, setPrice ] = useState(0);
    const [ isActive, setIsActive ] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if(name !== '' && description !== '' && price !== '') {

            setIsActive(true);

        } else {

            setIsActive(false);
        }

    }, [name, description, price]);


    function addProduct(e) {
        e.preventDefault();

        let token = localStorage.getItem('token');

        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                description,
                price
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.error === 'Product already exists'){
                Swal.fire({
                    title: 'Product already exists',
                    icon: 'error',
                    text: 'This Product already exists'
                })
            }
            else if(data.product !== null){
                Swal.fire({
                    title: 'Product successfully added',
                    icon: 'success',
                    text: 'Product successfully added'
                })
                navigate('/products')
            }
            else{
                Swal.fire({
                    title: 'Error in saving the product',
                    icon: 'success',
                    text: 'Error in saving the product'
                })
            }
        })

        setName("")
        setDescription("")
        setPrice(0);

    }

    return (

        user.isAdmin ?
        
        <Form onSubmit={e => addProduct(e)}>
            <FloatingLabel controlId="floatingName" label="Name" className="my-3">
                <Form.Control type="text" placeholder="Name" required value={name} onChange={e => {setName(e.target.value)}}/>
            </FloatingLabel>

            <FloatingLabel controlId="floatingDescription" label="Description" className="my-3">
                <Form.Control type="text" placeholder="Description" required value={description} onChange={e => {setDescription(e.target.value)}}/>
            </FloatingLabel>

            <FloatingLabel controlId="floatingPrice" label="Price" className="my-3">
                <Form.Control type="number" placeholder="Price" required value={price} onChange={e => {setPrice(e.target.value)}}/>
            </FloatingLabel>
            {
            isActive ? 
                <Button variant="primary" type="submit" id="submitBtn" className='my-2'>Submit</Button>
                : 
                <Button variant="danger" type="submit" id="submitBtn" className='my-2' disabled>Submit</Button>
            }
        </Form>

        :
        <Navigate to='/products/' />
        
    )
}