export interface Product {
  id: number;
  color: string;
  name: string;
  productCode: string;
  size: string;
  price: number;
  type: string;
  category: Category;
  discount: Discount;
  supplier: Supplier;
  tshirt?: Tshirt;
  sweatshirt?: Sweatshirt;
  inventories: Inventory[];
}

export interface Category {
  id: number;
  name: string;
}

export interface Discount {
  id: number;
  name: string;
  percentage: number;
}

export interface Supplier {
  id: number;
  name: string;
}

export interface Tshirt {
  id: number;
  sleeves: boolean;
}

export interface Sweatshirt {
  id: number;
  hood: boolean;
}

export interface Inventory {
  id: number;
  stock: number;
  updatedAt: string;
  product: Product;
}

export function createDefaultProduct(): Product {
  return {
    id: 0,
    name: '',
    productCode: '',
    color: '',
    size: '',
    price: 0,
    type: '',
    category: { id: 0, name: '' },
    discount: { id: 0, name: '', percentage: 0 },
    supplier: { id: 0, name: '' },
    inventories: [{ id: 0, stock: 0, updatedAt: '', product: {} as Product }],
    tshirt: { id: 0, sleeves: false },
    sweatshirt: { id: 0, hood: false }
  };
}
