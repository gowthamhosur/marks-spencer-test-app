import { render, screen, fireEvent } from "@testing-library/react";
import ProductPage from "../pages/[id]";
import { mockProductDetails} from './mock/mockdata';

jest.mock('../lib/apollo-client', () => ({
    client: jest.fn()
}));

test("renders product details page with product details", () => {
    render(<ProductPage product={mockProductDetails} />);
    expect(screen.getByText(/Round Neck Jumper/i)).toBeInTheDocument();
    expect(screen.getByText(/£1250/i)).toBeInTheDocument();
    expect(screen.getByText(/£1400/i)).toBeInTheDocument();
    expect(screen.getByText(/Detailed description/i)).toBeInTheDocument();
    expect(screen.getByText(/Go back/i)).toBeInTheDocument();
    const image =  screen.getAllByAltText(/Product Image/i)[0];
    expect(image.src).toContain("https://asset1.cxnmarksandspencer.com/is/image/mands/key1");
});