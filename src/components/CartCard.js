import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";


export default function CartCard({cartData}) {

    const [ cartContent, setCartContent ] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    
    const navigate = useNavigate();
    

    useEffect(() => {
        const fetchProductDetails = (cartItem) => {
            return fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${cartItem.productId}`)
                .then(response => response.json())
                .then(data => {
                    return {
                        ...cartItem,
                        name: data.product.name,
                        price: data.product.price
                    };
                });
        };

        if (cartData) {
            Promise.all(cartData.cartItems.map(cartItem => fetchProductDetails(cartItem)))
                .then(cartArr => {
                    setCartContent(cartArr);
                })
                .catch(error => {
                    console.error('Error fetching product details:', error);
                });
        }
    },[cartData]);

    const updateQuantity = (productId, newQuantity, currentQuantity, newSubtotal, currentSubtotal) => {
        setIsUpdating(true);
        setCartContent(prevCartContent => 
            prevCartContent.map(cartItem => 
                cartItem.productId === productId 
                    ? { ...cartItem, quantity: newQuantity, subtotal:newSubtotal  } 
                    : cartItem
            )
        );

        fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/update-cart-quantity`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                productId,
                quantity: newQuantity,
                subtotal: newSubtotal
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.message) {
                console.log('Quantity updated successfully:', data);
            } else {
                throw new Error('Failed to update quantity');
            }
            setIsUpdating(false);
        })
        .catch(error => {
            console.error('Error updating quantity:', error);
            // Revert the change if the request fails
            setCartContent(prevCartContent =>
                prevCartContent.map(cartItem =>
                    cartItem.productId === productId
                        ? { ...cartItem, quantity: currentQuantity, subtotal: currentSubtotal }
                        : cartItem
                )
            );
            setIsUpdating(false);
        });
    }

    const handleIncrease = (productId, currentQuantity, price, currentSubtotal) => {
        const newQuantity = currentQuantity + 1;
        const newSubtotal = price * newQuantity;
        updateQuantity(productId, newQuantity, currentQuantity, newSubtotal, currentSubtotal );
    };

    const handleDecrease = (productId, currentQuantity, price, currentSubtotal) => {
        const newQuantity = currentQuantity > 1 ? currentQuantity - 1 : 1;
        const newSubtotal = price * newQuantity;
        updateQuantity(productId, newQuantity, currentQuantity, newSubtotal, currentSubtotal);
    };

    const removeIten = (productId, name) => {
        Swal.fire({
            title: 'Removing item from cart?',
            text: `Are you sure you want to remove ${name} from your cart, this process cannot be undone.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
        })
        .then((result) => {
            if(result.isConfirmed){
                fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/${productId}/remove-from-cart`, {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(res => res.json())
                .then(data => {
                    if(data.message === 'Item removed from cart successfully')
                    Swal.fire({
                        title: 'Item successfully removed',
                        icon: 'success'
                    })
                    .then((result) => {
                        window.location.reload();
                    })
                })
            }
        })
    }

    const clearCart = () => {
        Swal.fire({
            title: 'Clearing all items from cart?',
            text: "Are you sure you want to remove all items from cart, this process cannot be undone?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
        })
        .then((result) => {
            if(result.isConfirmed){
                fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/clear-cart`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(res => res.json())
                .then(data => {
                    if(data.message === 'Cart cleared successfully'){
                        Swal.fire({
                            title: 'Cart successfully cleared',
                            icon: 'success'
                        })
                        .then((result) => {
                            window.location.reload();
                        })
                    }
                })
            }
        })
    };

    const checkoutCart = () => {
        Swal.fire({
            title: 'You are about to checkout all items in the cart',
            text: "Are you sure you want to proceed?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        })
        .then((result) => {
            if(result.isConfirmed){
                fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/checkout`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(res => res.json())
                .then(data => {
                    if(data.message === 'Ordered Successfully'){
                        Swal.fire({
                            title: 'Ordered Successfuly',
                            icon: 'success'
                        })
                        .then((result) => {
                            navigate('/myOrders');
                        })
                    }
                })
            }
        })
    }

    

    return (
        <>
            <h1 className="text-center my-4">Your Cart</h1>
            <Table striped bordered hover responsive variant="light">
                <thead>
                    <tr className="text-center">
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {
                    cartContent.length ?
                    cartContent.map(cart => (
                        <tr key={cart._id}>
                            <td><Link variant="btn btn-primary" to={`/products/${cart.productId}`}>{cart.name}</Link></td>
                            <td>{cart.price}</td>
                            <td>
                                <Button onClick={() => handleDecrease(cart.productId, cart.quantity, cart.price, cart.subtotal)} disabled={isUpdating}>-</Button>
                                {cart.quantity}
                                <Button onClick={() => handleIncrease(cart.productId, cart.quantity, cart.price, cart.subtotal)} disabled={isUpdating}>+</Button>
                            </td>
                            <td>{cart.subtotal}</td>
                            <td><Button onClick={() => removeIten(cart.productId, cart.name)}>Remove</Button></td>
                        </tr>
                    ))
                    :
                    <tr>
                        <td colSpan={5} className="text-center"><strong>Your Cart is empty</strong></td>
                    </tr>
                
                }
                </tbody>
                {
                    cartContent.length ?
                    <tfoot>
                        <tr>
                            <th colSpan={5}><Button onClick={() => checkoutCart()}>Checkout</Button>{cartData.totalPrice}</th>
                        </tr>
                    </tfoot>
                    :
                    <></>
                }
                
            </Table>
            {
            cartContent.length ?
                <Button onClick={() => clearCart()}>Clear Cart</Button>
                :
                <Link to={'/products'}><Button>Shop Now</Button></Link>
            }
        </>
    )
}