import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import '../assets/css/components/PreviewProducts.css'

export default function PreviewProducts(props) {
    const { data } = props;

	const { _id, name, description, price } = data;
    const newPrice = price - (price * 0.20);

    return (
        // <Col md={6} lg={3} className="ftco-animate fadeInUp ftco-animated">
        //     <Link to={`/products/${_id}`} className="product-item">
        //         <div className="product">
        //         {/* Uncomment and modify the following lines if you want to add an image
        //         <div className="img-prod">
        //             <img className="img-fluid" src="https://themewagon.github.io/vegefoods/images/product-1.jpg" alt="Product 1" />
        //             <span className="status">30%</span>
        //             <div className="overlay"></div>
        //         </div>
        //         */}
        //         <div className="text py-3 pb-4 px-3 text-center">
        //             <h3>{name}</h3>
        //             <p>{description}</p>
        //             <div className="d-flex">
        //             <div className="pricing">
        //                 <p className="price"><span className="mr-2 price-dc">${price}</span><span className="price-sale">${newPrice}</span></p>
        //             </div>
        //             </div>
        //         </div>
        //         </div>
        //     </Link>
        // </Col>

        <Col md={6} lg={3} className="ftco-animate fadeInUp ftco-animated product-col">
    <Link to={`/products/${_id}`} className="product-item">
        <div className="product">
        {/* Uncomment and modify the following lines if you want to add an image
        <div className="img-prod">
            <img className="img-fluid" src="https://themewagon.github.io/vegefoods/images/product-1.jpg" alt="Product 1" />
            <span className="status">30%</span>
            <div className="overlay"></div>
        </div>
        */}
        <div className="text py-3 pb-4 px-3 text-center">
            <h3>{name}</h3>
            <p>{description}</p>
            <div className="d-flex">
            <div className="pricing">
                <p className="price"><span className="mr-2 price-dc">${price}</span><span className="price-sale">${newPrice}</span></p>
            </div>
            </div>
        </div>
        </div>
    </Link>
</Col>
    )
}