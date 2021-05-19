import Head from 'next/head';
import type { Product, User, Offer } from '../lib/types';
import { useEffect, useState } from 'react';
import { InferGetStaticPropsType } from 'next';
import { gql, useQuery } from '@apollo/client';
import client from "../lib/apollo-client";
import styles from '../styles/ProductList.module.css';
import ProductListItem from '../components/ProductListItem'
import { Container, Row, Col } from 'react-grid-system';


export default function ProductList({ productList } : InferGetStaticPropsType<typeof getStaticProps>) {

  const [userId, setUserId] = useState<string>("1");
  const [availableBadges, setAvailableBadges] = useState<string[]>(null);
  const [userOffers, setUserOffers] = useState<Offer[]>(null);

  //Fetch user data from remote
  const { data } : {data: {user: User}} = useQuery(gql`
    query User($id: String!){
      user(id: $id){
        id,
        available_badges,
        offers{
          id,
          title,
          type
        }
      }
    }
  `, {
    variables: { id: userId }
  });

  useEffect(() => {
    if (data && data.user) {
      setAvailableBadges(data.user.available_badges.split("||"));
      setUserOffers(data.user.offers);
    }
  }, [data])

  return (
    <div>
      <Head>
        <title>Marks & Spencer</title>
      </Head>

      <div className={styles.header}>
        <h1 className={styles.title}>Product List</h1>
        <div className={styles.user}>
          <label>User</label>
          <select value={userId} onChange={(e) => setUserId(e.target.value)}>
            {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)}
          </select>
        </div>
      </div>

      <Container fluid>
        <Row>
          {productList && productList.map(product => {
            return (
              <Col xs={12} sm={6} md={4} lg={3} key={product.id} >
                <ProductListItem product={product} badge={calculateBadge(product, availableBadges, userOffers)} />
              </Col>
            )
          })}
        </Row>
      </Container>
    </div>
  );
}

function calculateBadge(product: Product, availableBadges: string[], userOffers: Offer[]) {
  if (availableBadges == null || userOffers == null)
    return;

  let applicableBadgeForProduct = null;
  const applicableBadges = availableBadges.map(availableBadge => {
    return {
      availableBadge,
      isApplicable: false
    }
  });

  //Iterating through user offers and calculating all applicable badges
  userOffers.forEach(userOffer => {
    if (product.offer_ids.includes(userOffer.id)) {
      for (const badge of applicableBadges) {
        if (badge.availableBadge.includes(userOffer.type))
          badge.isApplicable = true;
      }
    }
  });

  //Iterating through applicable badges and calculating highest priority badge
  for (const badge of applicableBadges) {
    if (badge.isApplicable) {
      applicableBadgeForProduct = badge.availableBadge.split(":")[0];
      break;
    }
  }

  return applicableBadgeForProduct;
}


export const getStaticProps = async () => {

  const { data } : {data: {productList: Product[]}} = await client.query({
    query: gql`
      query {
        productList{
          id,
          image_key
          name,
          offer_ids,
          price{
            currency_code,
            current_price,
            original_price
          }
        }
      }    
    `,
  });

  return {
    props: {
      productList: data.productList
    },
  }
}
