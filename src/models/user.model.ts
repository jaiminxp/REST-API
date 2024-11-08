import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import config from 'config'

export interface UserInput {
  email: string
  name: string
  password: string
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  let user = this

  if (!user.isModified('password')) {
    return next()
  }

  const salt = await bcrypt.genSalt(config.get('saltWorkFactor'))
  const hash = bcrypt.hashSync(user.password, salt)

  user.password = hash

  return next()
})

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false)
}

const UserModel = mongoose.model<UserDocument>('User', userSchema)

export default UserModel
