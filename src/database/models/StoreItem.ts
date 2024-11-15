import { Schema, model, type Types } from 'mongoose'
import 'dotenv'

// *************************************
// * Interface - Values
interface IStoreItem {
  _id: Types.ObjectId
  name: string
  sku: string
  active: boolean
}

// *************************************
// * Interface - StoreItemModel defines the statics
// interface IStoreItemModel extends Model<IStoreItem, unknown> {}

// *************************************
// * Schema definition!
const storeItemSchema = new Schema<IStoreItem>({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  active: { type: Boolean, required: true, default: true },
})

// *************************************
// * Model definition
const StoreItem = model<IStoreItem>('StoreItem', storeItemSchema)

// void StoreItem.create({
//   name: 'test item',
//   sku: 'test-item',
//   active: true,
// })

export default StoreItem
