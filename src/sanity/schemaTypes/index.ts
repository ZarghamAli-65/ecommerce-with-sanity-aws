import { type SchemaTypeDefinition } from 'sanity'

import { categoryType } from './categoryType'
import { banner } from './banner'
import { product } from './product'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [banner, product, categoryType],
}
