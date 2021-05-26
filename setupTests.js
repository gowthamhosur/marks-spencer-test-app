import "@testing-library/jest-dom/extend-expect";

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props) => {
      return <img {...props} />
    },
  }))
