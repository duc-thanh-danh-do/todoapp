//import { pool } from '../helpers/db.js'
import { Router } from 'express'
//import { emptyOrRows } from '../helpers/utils.js'
//import { auth } from '../helpers/auth.js'
import { getTasks, postTask, removeTask } from '../controllers/TaskController.js'

const router = Router()

router.get('/', getTasks)
    /*(req,res, next) => {
    pool.query('select * from task', (error, result)=> {
        if (error) return next(error)
        return res.status(200).json(emptyOrRows(result))
    })
}*/

router.post('/create', postTask)

router.delete('/delete/:id', removeTask)

export { router }