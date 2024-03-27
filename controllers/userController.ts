import { Request, Response } from 'express'
import User, { checkPasswords, validatePassword } from '../models/users'
import jwt from 'jsonwebtoken'
import { SECRET } from '../config/environment'
import formatValidationError from '../errors/validation'

export async function getUsers(req: Request, res: Response) {
    try {
        const user = await User.find()
        res.send(user)
    } catch (e) {
        res.send({ message: 'There was a problem getting users.'})
    }
}

export async function getUserById(req: Request, res: Response) {
    try {
        console.log(req.params)
        const userId = req.params.userId
        const foundUser = await User.findById(userId)
        res.send(foundUser)
        console.log(foundUser)
    } catch (e) {
        console.log(e)
        res.send({ message: 'There was a problem getting users.' })
    }
}

export async function signup(req: Request, res: Response) {
    try {
    console.log(req.body)
    if (checkPasswords(req.body.password, req.body.passwordConfirmation)) {
      const user = await User.create(req.body)
      res.status(201).send(user)
    } else {
      res.status(401).send({ message: "Passwords do not match.", errors: { password: "Does not match password" } })
    }
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: "There was an error", errors: formatValidationError(e) })
  }
}

// export async function deleteUser(req: Request, res: Response) {
//     try {
//         console.log('DELETING!', req.body)
//         const userId = req.params.userId
//         const deleteUser = await User.findOneAndDelete({ _id: userId})
//         res.send({deleteUser, message: "User deleted!!!"})
//   } catch (e) {
//         res.send({ messsage: 'Unable to delete user, check information and try again!'})
//   }
// }

// export async function updateUser(req: Request, res: Response) {
//     try {
//         const userId = req.params.userId // Use the unique ID provided from Mongoose Compass
//         const update = req.body 
//         const updatedUser = await User.findByIdAndUpdate(userId, update, {new: true})
//         res.send({updatedUser, message: 'User Updated!'})
//         console.log(updatedUser)
//   } catch (e) {
//         res.send({ message: 'Unable to update user, please try again!'})
//   }
// }

export async function login(req: Request, res: Response) {
  try {
    const password = req.body.password

    const user = await User.findOne({ email: req.body.email })

    if (!user) return res.status(401).send({ message: "Login failed"} )

    const isValidPw = validatePassword(password, user.password)

    if (isValidPw) {
      
      const token = jwt.sign( 
        { userId: user._id },
        SECRET, 
        { expiresIn: '24h' } 
      )

      res.status(202).send({ message: "Login successful", token }) 
    } else {
      res.status(401).send({ message: "Login failed" })
    }
    res.send(req.body)
  } catch (e) {

  }
}

//? Gets full user information for logged in user to determine on the frontend, what is displayed. 
export async function getCurrentUser(req: Request, res: Response) {
  try {
    res.status(200).send(res.locals.currentUser)
  } catch (e) {
    console.log(e)
    res.status(500).send({ messsage: 'There was an error, please try again later' })
  }
}