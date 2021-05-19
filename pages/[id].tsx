import { InferGetStaticPropsType } from 'next'
import { gql } from '@apollo/client';
import client from "../lib/apollo-client";
import ProductDetails from '../components/ProductDetails';
import { Product, ProductDetailsType, ProductInformation } from '../lib/types';

const ProductPage = ({ product }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            <ProductDetails product={product}/>
        </>
    )
}
export default ProductPage;

export const getStaticPaths = async () => {

    const { data } = await client.query({
        query: gql`
        query {
          productList{
            id
          }
        }    
      `,
    });

    const paths = data.productList.map((product: Product) => ({
        params: { id: product.id },
    }));

    return { paths, fallback: false }
}

export const getStaticProps = async ({params}) => {

    const { data } : { data: { product: ProductDetailsType}} = await client.query({
      query: gql`
        query product($id: String!){
            product(id: $id){
            id,
            image_key,
            name,
            information{
              section_text,
              section_title
            }
            price{
              currency_code,
              current_price,
              original_price
            }
          }
        }        
      `,
      variables: { id: params.id },
    });
    return {
      props: {
        product: data.product,
      },
    }
  }
