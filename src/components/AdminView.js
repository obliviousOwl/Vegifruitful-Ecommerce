import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import ArchiveProduct from './ArchiveProduct';
import UpdateProduct from './UpdateProduct';

export default function AdminView({productsData, fetchData}) {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const productsArr = productsData.map(product => {
            return(
                <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td className={product.isActive ? "text-success" : "text-danger"}>
                    {product.isActive ? "Available" : "Unavailable"}
                    </td>
                    <td><UpdateProduct product={product._id} fetchData={fetchData} /></td> 
                    <td><ArchiveProduct product={product._id} isActive={product.isActive} fetchData={fetchData} /></td>

                </tr>
            )

        })
        setProducts(productsArr)
    }, [productsData, fetchData])

    return(
        <>
          <h1 className="text-center my-4">Admin Dashboard</h1>
            <Table striped bordered hover responsive variant="dark">
                <thead>
                    <tr className="text-center">
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products}
                </tbody>
            </Table>    
        
        </>
    )
}