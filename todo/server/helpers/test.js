import fs from 'fs'
import path from 'path'
import { pool } from './db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const { sign } = jwt
const { hash } = bcrypt

const __dirname = import.meta.dirname
const initializeTestDb = () => {
    const sql = fs.readFileSync(path.resolve(__dirname,"../todo.sql"), "utf8");
    pool.query(sql)
}

const insertTestUser = async(email,password) => {
    //hash(password,10,(error, hashedPassword) => {
      //  pool.query('insert into account (email,password) value ($1,$2)',
        //    [email,hashedPassword]
        //)
    //})
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        await pool.query('INSERT INTO account (email, password) VALUES ($1, $2)', [email, hashedPassword])
    } catch (error) {
        console.error("Error inserting test user:", error)
    }
}

const getToken = (email) => {
    if (!process.env.JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET_KEY is not set in environment variables")
    }
    return sign({email: email}, process.env.JWT_SECRET_KEY)
}

export { initializeTestDb, insertTestUser, getToken }