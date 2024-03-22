import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import uniqueValidator from 'mongoose-unique-validator'
import validator from 'validator'
import mongooseHidden from 'mongoose-hidden'

interface IUser {
    username: string, 
    email: string,
    password: string
}

const userSchema: Schema<IUser> = new mongoose.Schema<IUser>({
    username: {
        type: String,
        minLength: [3, 'Username too short'],
        unique: true,
        required: [true, 'Username needed!']
    },
    email: {
        type: String, 
        required: [true, 'Email address required'],
        unique: true,
        validate: (email: string) => validator.isEmail(email)
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, 'Password required'],
        validate: (password: string) => {
            return validator.isStrongPassword(
                password, { minLength: 8, minLowercase: 1, minUppercase: 1, minSymbols: 1, minNumbers: 1}
            )
        },
    }
})

// SIGNUP -------

userSchema.pre('save', function hashPassword(next) {
    console.log('here is the password', this.password)
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    console.log('here is the updated', this.password)
    next()
})

// LOGIN --------

export function validatePassword(loginPlaintextPassword: string, originalHashedPassword: string) {
    return bcrypt.compareSync(loginPlaintextPassword, originalHashedPassword);
}

export function checkPasswords(password: string, passwordConfirmation: string) {
    return password == passwordConfirmation
}

userSchema.plugin(uniqueValidator)
//? Hides specified fields from the response sent. 
userSchema.plugin(mongooseHidden({ defaultHidden: { password: true, email: true, _id: true }}))

export default mongoose.model<IUser>('User', userSchema)