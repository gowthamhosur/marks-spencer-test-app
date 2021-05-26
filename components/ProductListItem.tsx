import Image from 'next/image';
import styles from '../styles/ProductListItem.module.css';
import { useRouter } from 'next/router'
import { Product } from '../lib/types';

type ComponentProps = {
    product: Product,
    badge: string
}
const ProductListItem = ({ product, badge }: ComponentProps) => {
    const { id, image_key, name, price } = product;
    const router = useRouter()
    const handleClick = (id) => {
        router.push(`/${id}`);
    }
    return (
        <div data-testid="product-list-item" className={styles.container} onClick={() => handleClick(id)}>
            <div className={styles.imageContainer}>
                <Image alt="Product Image" src={` https://asset1.cxnmarksandspencer.com/is/image/mands/${image_key}`} width="300" height="400" />
            </div>
            <div className={styles.nameContainer}><h3>{name}</h3></div>
            <h4 className={styles.price}>{price.original_price && <s>£{price.original_price}</s>} {' '} £{price.current_price}</h4>
            <div className={styles.badge}>
                {badge && <Image alt="Badge" src={`/${badge}_icon.jpg`} width="50" height="25" />}
            </div>
        </div>
    );
}

export default ProductListItem;