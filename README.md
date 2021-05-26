This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Run instructions

### Start Mock server

```bash
docker run -p 3001:3001 chrismns/tech-test-mock-server:0.1.0
```

### Run development server

```bash
npm install
npm run dev
```

### Run unit tests

```bash
npm run test
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Pending Tasks

1. Docker compose to combine web and app images is not done 

## Assumptions

1. Product Listing page, product page can have barebones UI for test application
2. UI library can be used for grid functionality
3. Error handling when API is down need not be handled 
4. Static site generation can be used for Product list and Product page to improve performance
