import { type HydratedDocument, Schema, model, type Types } from 'mongoose'
import 'dotenv'

// *************************************
// * Interface - Items
// *************************************
// * Interface - Values

interface IItemTemplate {
  _id: Types.ObjectId
  name: string
  description: string
}

// *************************************
// * Interface - PurchaseModel defines the statics
// interface IItemTemplateModel extends Model<IItemTemplate, unknown> {}

// *************************************
// * Schema definition!
const itemTemplateSchema = new Schema<IItemTemplate>({
  name: { type: String, required: true },
  description: { type: String, required: true },
})

// *************************************
// * Model definition
const ItemTemplate = model<IItemTemplate>('ItemTemplate', itemTemplateSchema)

export default ItemTemplate

export type ItemTemplateSchema = HydratedDocument<IItemTemplate>
