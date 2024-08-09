import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import OrderHistoryTable from "./OrderHistoryTable";


export default function OrderHistoryCard({orderData}) {
//  console.log(orderData);

    const [ myOrderContent, setMyOrderContent ] = useState();

    useEffect(() => {
        const orderArr = orderData.map(order => {
            const date = new Date(order.orderedOn);
            const formattedDate = date.toLocaleString();
            return (
                <>
                    <h4> Ordered by: {formattedDate}</h4>
                    <Table striped bordered hover responsive variant="dark" key={order._id}>
                        <thead key={order._id}>
                            <tr className="text-center" key={order._id}>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <OrderHistoryTable orderData = {order.productsOrdered}/>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={4}>Total Price: {order.totalPrice}</td>
                            </tr>
                            <tr>
                                <td colSpan={4}>Status: {order.status}</td>
                            </tr>
                        </tfoot>
                    </Table>    
                </>
            )
        })
        setMyOrderContent(orderArr)
    }, [orderData])

    
    return(
        <>
            {myOrderContent}
        </>
    )
}