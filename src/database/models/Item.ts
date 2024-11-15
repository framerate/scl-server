import { type HydratedDocument, Schema, model, type Types } from 'mongoose'
import 'dotenv'

// *************************************
// * Interface - Items
// *************************************
// * Interface - Values

interface IItem {
  _id: Types.ObjectId
  template: Types.ObjectId
}

// *************************************
// * Interface - ItemModel defines the statics
// interface IItemModel extends Model<IItem, unknown> {}

// *************************************
// * Schema definition!
const itemSchema = new Schema<IItem>({
  // date: { type: Date, required: true, default: Date.now },
})

// *************************************
// * Model definition
const Item = model<IItem>('Item', itemSchema)

// void Item.create({
//   name: 'test item',
//   sku: 'test-item',
//   active: true,
// })

export default Item

export type ItemSchema = HydratedDocument<IItem>
