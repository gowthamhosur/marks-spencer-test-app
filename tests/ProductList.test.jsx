import { render, screen, fireEvent } from "@testing-library/react";
import { MockedProvider } from '@apollo/client/testing';
import ProductList from "../pages/index";
import { mockProductList} from './mock/mockdata';
import router from 'next/router';

jest.mock('../lib/apollo-client', () => ({
    client: jest.fn()
}));
jest.mock('next/router', () => require('next-router-mock'));

test("renders product lists page with product details", () => {
        render(<MockedProvider><ProductList productList={mockProductList} /></MockedProvider>);
        expect(screen.getByText(/Product List/i)).toBeInTheDocument();
        expect(screen.getByText(/Round Neck Jumper/i)).toBeInTheDocument();
        expect(screen.getByText(/£1250/i)).toBeInTheDocument();
        expect(screen.getByText(/£1400/i)).toBeInTheDocument();
        const image =  screen.getAllByAltText(/Product Image/i)[0];
        expect(image.src).toContain("https://asset1.cxnmarksandspencer.com/is/image/mands/key1");
});

test("renders product lists page with all the available products", () => {
    render(<MockedProvider><ProductList productList={mockProductList} /></MockedProvider>);
    expect(screen.getAllByTestId('product-list-item')).toHaveLength(2);
});

test("navigate to product details page on click", () => {
    render(<MockedProvider><ProductList productList={mockProductList} /></MockedProvider>);
    const firstProduct =  screen.getAllByTestId('product-list-item')[0];
    fireEvent.click(firstProduct);  
    expect(router).toMatchObject({
        asPath: '/1',
        pathname: '/1',
        query: {},
    });
});

