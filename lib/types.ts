export type Price = {
    currency_code: string
    current_price: number
    original_price: number
}

export type ProductInformation = {
    section_text: String
    section_title: String
  }

export type Product = {
    id: string
    image_key: string
    name: string
    offer_ids: string[]
    price: Price
  }

export type User = {
    id: string
    available_badges: String
    offers: Offer[]
  }

export type Offer = {
    id: string
    title: string
    type: string
  }

  export type ProductDetailsType = Product & {
      information: ProductInformation[]
  }

