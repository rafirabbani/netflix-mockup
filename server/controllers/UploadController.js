import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

const pathDir = path.join(__dirname, '../../uploads')
const singleUpload = async (req, res, next) => {
    if (!fs.existsSync(pathDir)) {
        fs.mkdirSync(pathDir)
    }
    const form = formidable({multiples: true, uploadDir: pathDir})
    form.parse(req)
    form
        .on('fileBegin', (keyName, file) => {
            let folder = pathDir + `/${req.params.folder}/${req.params.id}/`
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, {recursive: true})
            }
            file.path = path.join(folder + file.name)
        })
        .on('file', (keyName, file) => {
            req.fileName = file.name
        })
        .on('end', () => {
            console.log('File uploaded successfully')
            next();
        })
}

const multiPartUpload = async (req, res, next) => {
    if (!fs.existsSync(pathDir)) {
        fs.mkdirSync(pathDir)
    }
    const form = formidable({multiples: true, uploadDir: pathDir})
    const formObj = {}
    form.parse(req)
    form
        .on('fileBegin', (keyName, file) => {
            let folder = pathDir + `/${req.params.folder}/${req.params.id}/`
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, {recursive: true})
            }
            file.path = path.join(folder + file.name)
        })
        .on('field', (keyName, value) => {
            formObj[keyName] = value 
            req.body = formObj
        })
        .on('file', (keyName, file) => {
            req.fileName = file.name
        })
        .on('end', () => {
            console.log('File Uploaded Successfully')
            next()
        })
}

export default {
    singleUpload,
    multiPartUpload
}