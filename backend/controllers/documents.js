const mongoose = require("mongoose")

const Document = require('../models/documents')

const getDocuments = async(req,res) => {

    const user_id = req.user._id

    try {

        const documents = await Document.find({ user_id }).sort({createdAt: -1})

        if(documents.length === 0){
            return res.status(404).json({ mssg: 'document not found!'})
        }

        res.status(200).json(documents)

    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

const getDocument = async(req,res) => {

    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ mssg: "Invalid document id"})
    }

    try{

        const document = await Document.findById(id)

        if(!document){
            return res.status(404).json({ mssg: 'this documet does not exist'})
        }

        return res.status(200).json(document)

    } catch(error){

        return res.status(500).json({ error: error.message })
    }
}


const createDocument = async(req,res) => {

    const { title, genre, pages } = req.body

    if(!title || !genre || !pages){
        return res.status(400).json({ mssg: "please fill in all the fields"})
    }

    try{

        const user_id = req.user._id
        const document = await Document.create({ title, genre, pages, user_id })

        return res.status(201).json(document)

    } catch(error) {
        return res.status(400).json({ error: error.message })
    }
}

const deleteDocument = async(req,res) => {

    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ mssg: "Invalid document id"})
    }

    try{

        const document = await Document.findByIdAndDelete(id)

        if(!document){
            return res.status(404).json({ mssg: "this document does not exist"})
        }

        return res.status(200).json({document})

    } catch(error) {

        return res.status(500).json({ error: error.message })
    }
}


const updateDocument = async(req,res) => {

    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){

        return res.status(400).json({ mssg: "invalid document id"})
    }

    try{
        
         const document = await Document.findByIdAndUpdate( id, {...req.body}, { new: true })

         if(!document){
            return res.status(404).json({ mssg: "document not found"})
         }

         return res.status(200).json(document)

    } catch(error){

        return res.status(500).json({ mssg: error.mssg })
    }
}

module.exports = {
    getDocuments,
    getDocument,
    createDocument,
    deleteDocument,
    updateDocument
}