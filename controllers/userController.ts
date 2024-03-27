import { Request, Response } from 'express'; // Importing necessary modules from Express
import User, { checkPasswords, validatePassword } from '../models/users'; // Importing User model and password-related functions
import jwt from 'jsonwebtoken'; // Importing JSON Web Token for authentication
import { SECRET } from '../config/environment'; // Importing secret key for JWT
import formatValidationError from '../errors/validation'; // Importing function to format validation errors

export async function getUsers(req: Request, res: Response) { // Function to get all users
    try {
        const user = await User.find(); // Finding all users in the database
        res.send(user); // Sending the users as response
    } catch (e) {
        res.send({ message: 'There was a problem getting users.' }); // Sending error message if there's an issue
    }
}

export async function getUserById(req: Request, res: Response) { // Function to get a user by ID
    try {
        console.log(req.params);
        const userId = req.params.userId; // Getting user ID from request parameters
        const foundUser = await User.findById(userId); // Finding user by ID
        res.send(foundUser); // Sending the found user as response
        console.log(foundUser);
    } catch (e) {
        console.log(e);
        res.send({ message: 'There was a problem getting users.' }); // Sending error message if there's an issue
    }
}

export async function signup(req: Request, res: Response) { // Function for user signup
    try {
        console.log(req.body);
        if (checkPasswords(req.body.password, req.body.passwordConfirmation)) { // Checking if passwords match
            const user = await User.create(req.body); // Creating a new user in the database
            res.status(201).send(user); // Sending success message with created user
        } else {
            res.status(401).send({ message: "Passwords do not match.", errors: { password: "Does not match password" } }); // Sending error message if passwords don't match
        }
    } catch (e) {
        console.log(e);
        res.status(400).send({ message: "There was an error", errors: formatValidationError(e) }); // Sending error message if there's an issue
    }
}

export async function login(req: Request, res: Response) { // Function for user login
    try {
        const password = req.body.password; // Getting password from request body
        const user = await User.findOne({ email: req.body.email }); // Finding user by email
        
        if (!user) return res.status(401).send({ message: "Login failed" }); // Sending error message if user not found

        const isValidPw = validatePassword(password, user.password); // Validating password
        
        if (isValidPw) { // If password is valid
            const token = jwt.sign( // Creating JWT token
                { userId: user._id },
                SECRET,
                { expiresIn: '24h' }
            );
            res.status(202).send({ message: "Login successful", token }); // Sending success message with token
        } else {
            res.status(401).send({ message: "Login failed" }); // Sending error message if password is invalid
        }
        res.send(req.body);
    } catch (e) {
        // Handle error
    }
}

//? Gets full user information for logged in user to determine on the frontend, what is displayed. 
export async function getCurrentUser(req: Request, res: Response) { // Function to get current user
    try {
        res.status(200).send(res.locals.currentUser); // Sending current user as response
    } catch (e) {
        console.log(e);
        res.status(500).send({ messsage: 'There was an error, please try again later' }); // Sending error message if there's an issue
    }
}