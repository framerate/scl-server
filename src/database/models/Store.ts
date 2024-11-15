import { type Model, Schema, model, type Types, type HydratedDocument } from 'mongoose'
import 'dotenv'
import Boom from '@hapi/boom'
import { type UserSchema } from './User'

// *************************************
// * Interface - Store
interface IStore {
  _id: Types.ObjectId
  name: string
  description: string
  public: boolean
  owner: Types.ObjectId // Link to the owner's user document
}

// *************************************
// * Interface Methods
interface IStoreMethods {
  getIdentifierAsString: () => string
}

// *************************************
// * Interface - StoreModel defines the statics
interface StoreModel extends Model<IStore, unknown, IStoreMethods> {
  // Define any static methods here if needed
  validateAndGetStoreById: (
    storeId: string,
    requestUser?: UserSchema,
  ) => Promise<HydratedDocument<IStore, IStoreMethods>>
}

// *************************************
// * Schema definition!
export const storeSchema = new Schema<IStore, StoreModel, IStoreMethods>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  public: { type: Boolean, required: true },
  owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' }, // Reference to User model
})

// *************************************
// * Method - getIdentifierAsString
storeSchema.methods.getIdentifierAsString = function () {
  return this._id.toString()
}

// *************************************
// * Static - validateAndGetStoreById
storeSchema.statics.validateAndGetStoreById = async function (storeId, requestUser?) {
  const storeDb = await this.findOne({ _id: storeId })
  if (storeDb === null) throw Boom.badRequest('Store not found')

  // TODO - check if requesting user has access as admin!

  // make sure this store is public or the user owns it
  if (!storeDb.public && storeDb.owner.toString() !== requestUser?._id.toString()) {
    throw Boom.forbidden('You do not have access to this store')
  }

  return storeDb
}

// *************************************
// * Model definition
const Store = model<IStore, StoreModel>('Store', storeSchema)

export default Store

export type StoreSchema = HydratedDocument<IStore, IStoreMethods>
