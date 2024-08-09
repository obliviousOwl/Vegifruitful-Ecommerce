import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function ArchiveProduct({product, isActive, fetchData}) {

    const archiveToggle = (productId) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/archive`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {

            // console.log(data)
            
            if(data.hasOwnProperty('archiveProduct')) {

                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Product successfully disabled'
                })

                fetchData();

            }else {

                Swal.fire({
                    title: 'Something Went Wrong',
                    icon: 'error',
                    text: 'Please try again'
                })

                fetchData();
            }
        })
    }

    const activateToggle = (productId) => {

        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/activate`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {

            // console.log(data)
            console.log(data)
            if(data.hasOwnProperty('activateProduct')) {

                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Product successfully enabled'
                })

                fetchData();

            }else {

                Swal.fire({
                    title: 'Something Went Wrong',
                    icon: 'error',
                    text: 'Please try again'
                })

                fetchData();
            }
        })
    }

    return (
        <>
            {
                isActive ?
                    <Button variant="danger" size="sm" onClick={() => archiveToggle(product)}>Archive</Button>
                :
                    <Button variant="success" size="sm" onClick={() => activateToggle(product)}>Activate</Button>
            }
        </>
    )
}
