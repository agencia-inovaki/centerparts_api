import { type Product } from '../entities/Product'

export interface IProductsRepository {
  getAll: (bannerId: string) => Promise<Product[]>
  getOne: (id: string) => Promise<Product | null>
  create: (product: Product) => Promise<Product>
  delete: (id: string) => Promise<void>
}
