import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";
import OrderHistoryCard from "../components/OrderHistoryCard";


export default function OrderHistory() {

    const { user } = useContext(UserContext)

    const [ orderHistory, setOrderHistory] = useState();
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/my-orders`,{
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(res => res.json())
        .then(data => {
            if(data.orders){
                setError(false);
                setLoading(false);
                setOrderHistory(data.orders)
            }
            else{
                setLoading(false);
                setError(true);
            }
        })
        .catch(error => {
            console.error('Error fetching cart:', error);
            setLoading(false);
            setError(true);
        });
    },[])

    if (loading) return <div>Loading...</div>;

    if (error) return(
        user.isAdmin ?
        <Navigate to={'/products'}/>
        :
         <div>Cart is Empty</div>
        )

    return(
        <Container>
            <h1 className="text-center my-4">Order History</h1>
            <OrderHistoryCard orderData = {orderHistory}/>
        </Container>
    )
}