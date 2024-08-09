import { useEffect, useState } from "react";

export default function OrderHistoryTable ({orderData}) {

    const [ myOrderContent, setMyOrderContent ] = useState([]);

    useEffect(() => {
        const fetchProductDetails = (orderItem) => {
            return fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${orderItem.productId}`)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    return {
                        ...orderItem,
                        name: data.product.name,
                        price: data.product.price
                    };
                });
        };

        if (orderData) {
            Promise.all(orderData.map(orderItem => fetchProductDetails(orderItem)))
                .then(orderArr => {
                    setMyOrderContent(orderArr);
                })
                .catch(error => {
                    console.error('Error fetching product details:', error);
                });
        }
    },[orderData]);
    console.log(myOrderContent)

    
    return(
        <>
            {
                myOrderContent.length ?
                myOrderContent.map(order => (
                    <tr key={order._id}>
                        <td>{order.name}</td>
                        <td>{order.price}</td>
                        <td>{order.quantity}</td>
                        <td>{order.subtotal}</td>
                    </tr>
                ))
                :
                <></>
            }
        </>
    )
}