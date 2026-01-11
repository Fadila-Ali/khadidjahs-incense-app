import { type SchemaTypeDefinition } from 'sanity'
import { productType } from './productType'
import { categoryType } from './categoryType'
import { blockContentType } from './blockContentType'
import { orderType } from './orderType'
import { salesType } from './salesType'
import { reviewType } from './reviewType'
import { wishlistType } from './wishlistType'
import { newsletterType } from './newsletterType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, productType, categoryType, orderType, salesType, reviewType, wishlistType, newsletterType],
}
