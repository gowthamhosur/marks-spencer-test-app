import Image from 'next/image';
import styles from '../styles/ProductDetails.module.css';
import { Container, Row, Col } from 'react-grid-system';
import Link from 'next/link';
import { ProductDetailsType } from '../lib/types';

type ComponentProps = {
    product: ProductDetailsType
}

const ProductDetails = ({ product }: ComponentProps) => {
    const { name, image_key, price, information } = product;
    return (
        <Container>
            <Row>
                <Col sm={12} md={6}>
                    <div className={styles.imageContainer}>
                        <Image src={` https://asset1.cxnmarksandspencer.com/is/image/mands/${image_key}`} width="600" height="800" />
                    </div>
                </Col>
                <Col sm={12} md={6}>
                    <div className={styles.nameContainer}><h3>{name}</h3></div>
                    <h4>{price.original_price && <s>£{price.original_price}</s>} {' '} £{price.current_price}</h4>
                    {information && information.map((item, index) => {
                        return (
                            <div key ={index}>
                                <p>{item.section_title}</p>
                                <p>{item.section_text}</p>
                            </div>
                        )
                    })}

                </Col>
            </Row>
            <Row>
                <div className={styles.backContainer}>
                    <Link href="/">
                        <button>Go Back</button>
                    </Link>
                </div>
            </Row>
        </Container>
    )
}

export default ProductDetails;