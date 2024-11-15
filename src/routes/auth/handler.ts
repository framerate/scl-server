import { type Request } from '@hapi/hapi'
import User, { AccountFlags } from '../../database/models/User'
import { generateToken } from './utils'
import Boom from '@hapi/boom'

interface LoginPayload {
  email: string
  password: string
}

interface RegisterPayload {
  email: string
  name: string
  password: string
}

interface LoginOrRegisterResponse {
  token: string
}

export const login = async (request: Request): Promise<LoginOrRegisterResponse> => {
  const { email, password } = request.payload as LoginPayload
  const user = await User.checkPasswordAndReturnUser(email, password)

  if (user === null) {
    throw new Error('User not found')
  }

  return {
    token: generateToken(user.getIdentifierAsString()),
  }
}

export const register = async (request: Request): Promise<LoginOrRegisterResponse> => {
  const { email, password, name } = request.payload as RegisterPayload

  const passwordHash = await User.hashPassword(password)

  // check if user already exists
  const existingUser = await User.findOne({ email })

  if (existingUser !== null) {
    throw Boom.badRequest('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password: passwordHash,
  })

  // TEMP - add a flag so a user can create a store
  await user.addFlag(AccountFlags.CAN_CREATE_STORE)

  await user.save()

  return {
    token: generateToken(user.getIdentifierAsString()),
  }
}
