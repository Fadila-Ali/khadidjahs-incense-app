import { type SchemaTypeDefinition } from 'sanity'
import { productType } from './productType'
import { categoryType } from './categoryType'
import { blockContentType } from './blockContentType'
import { orderType } from './orderType'
import { salesType } from './salesType'
import { reviewType } from './reviewType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, productType, categoryType, orderType, salesType, reviewType],
}
