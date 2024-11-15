import mongoose, { type HydratedDocument, Schema, model, type Types } from 'mongoose'
import 'dotenv'

// *************************************
// * Interface - Items
// *************************************
// * Interface - Values

interface IPurchaseItem {
  _id: Types.ObjectId
  sku: string
  quantity: number
}

interface IPurchase {
  _id: Types.ObjectId
  date: Date
  items: IPurchaseItem[]
  user: Types.ObjectId
}

// *************************************
// * Interface - PurchaseModel defines the statics
// interface IPurchaseModel extends Model<IPurchase, unknown> {}

// *************************************
// * Schema definition!
const purchaseItemSchema = new Schema<IPurchaseItem>({
  sku: { type: String, required: true },
  quantity: { type: Number, required: true },
})
const purchaseSchema = new Schema<IPurchase>({
  date: { type: Date, required: true, default: Date.now },
  items: [purchaseItemSchema],
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
})

// *************************************
// * Model definition
const Purchase = model<IPurchase>('Purchase', purchaseSchema)

// void Purchase.create({
//   name: 'test item',
//   sku: 'test-item',
//   active: true,
// })

export default Purchase

export type PurchaseSchema = HydratedDocument<IPurchase>
