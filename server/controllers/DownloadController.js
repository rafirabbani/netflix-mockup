import path from 'path'
import fs from 'fs'

const pathDir = path.join(__dirname, '../../uploads')
const download = async (req, res) => {
    const filePath = `${pathDir}/${req.params.folder}/${req.params.id}/`
    fs.readdir(filePath, (err, files) => {
        if (err){
            return console.log('something wrong, code again')
        }
        for (const file of files){
            res.download(path.join(filePath, file))
        }
    })
}

export default {
    download
}