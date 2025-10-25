const express = require('express')

const {
    getDocuments,
    getDocument,
    createDocument,
    deleteDocument,
    updateDocument
} = require('../controllers/documents')
const authUser = require('../middleware/authUser')

const router = express.Router()

router.use(authUser)

router.get('/', getDocuments)
router.get('/:id', getDocument)
router.post('/', createDocument)
router.patch('/:id', updateDocument)
router.delete('/:id', deleteDocument)


module.exports = router
