import express from 'express'
const router = express.Router();

import {deleteItem, getItem, getItems, registerItem, updateItem} from '../controllers/itemController.js'
import passwordSecurityHandler from "../middleware/passwordSecurity-handler.js";

router.route('/').post(passwordSecurityHandler,registerItem)
router.route('/').get(getItems)
router.route('/:id').get(getItem)
router.route('/:id').patch(passwordSecurityHandler,updateItem)
router.route('/:id').delete(deleteItem)


export default router;