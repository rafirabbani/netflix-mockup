import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

const pathDir = path.join(__dirname, '../uploads')

//Create new cast
const createCasts = async (req, res) => {
    const dataField ={}
    if (!fs.existsSync(pathDir)) {
        fs.mkdirSync(pathDir);
    }

    const form = formidable({
        multiples: true,
        uploadDir: pathDir,
        keepExtensions: true
    });
    /* form.onPart = (part) => {
        console.log(part)
    } */

    form 
        .on('fileBegin', (keyName, file) => {
            //console.log('fileBegin', file)
            let folder = pathDir + `/casts/`
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, {recursive: true})
            }
            file.path = path.join(folder + file.name)
        })
        .on('field', (keyName, value) => {
            dataField[keyName] = value
        })
        .on('file', (keyName, file) => {
            //console.log(dataField)
            const name = dataField.cast_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
            //console.log(title)
            let folder = pathDir + `/casts/${name}/`
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, {recursive: true}/* (err) => {
                    if (err) throw err
                    console.log('dir made')
                    fs.rename(file.path, path.join(folder + file.name), (err) => {
                        if (err) throw err
                        console.log('file moved')
                    })
                } */)
            }
            fs.rename(file.path, path.join(folder + file.name), (err) => {
                if (err) throw err
                console.log('file moved')
            })
            file.path = path.join(folder + file.name)
        })
        .on('end', () => {
            console.log('File Uploaded Successfully')
            //return res.send('hi')
        });

    form.parse(req, async(err, fields, files) => {
        //console.log(fields)
        //console.log('parse',files)
        if (err) {
            res.sendStatus(400).json({
                message: err.message
            })
        }
        const data = new req.context.models.Casts(fields)
            if (Object.keys(files).length !== 0) {
            data.cast_image = files.cast_image.name
            data.cast_image_path = files.cast_image.path
            //console.log(data.dataValues)
        }
        try {
            console.log(data)
            const result = await req.context.models.Casts.create(data.dataValues)
            return res.send(result)
        }
        catch (err) {
            res.send(err.response)
        }
    })
}

const singleCastImage = async (req, res) => {
    const result = await req.context.models.Casts.update({
        cast_name : req.body.cast_name,
        cast_image: req.fileName
    }, {returning: true, where:{cast_id: req.params.id}})
    return res.send(result)
}

//Find all casts
const findAllCasts = async (req, res) => {
    const result = await req.context.models.Casts.findAll({
        include: [{
            model: req.context.models.Movies
        }]
    })
    return res.send(result)
}

//Find single cast by id
const findCast = async (req, res) => {
    const result = await req.context.models.Casts.findOne({
        where: {cast_id: req.params.id}
    })
    return res.send(result)
}

//Find all casts on single movie
const findCastOnMovie = async (req, res) => {
    const result = await req.context.models.Casts.findAll({
        where: {cast_movie_id: req.params.id}
    })
    return res.send(result)
}

//Delete casts by id
const deleteCast = async (req, res) => {
    const name = req.body.cast_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
    let folder = pathDir + `/casts/${name}/`
    fs.rmdir(folder, {recursive: true}, async (err) => {
        if (err) throw err
        console.log('image deleted')
        const result = await req.context.models.Casts.destroy({
            where: {cast_id: req.params.id}
        })
        return res.send('deleted ' + result + ' row')
    })

    /* await req.context.models.Casts.destroy({
        where: {cast_id: req.params.id}
    })
    return res.send('deleted') */

}

//Edit cast
const editCast = async (req, res) => {
    const result = await req.context.models.Casts.findOne({
        where: {cast_id: req.params.id}
    });
    //let title = result.dataValues.movie_title
    const dataField = {}
    //dataField['movie_title'] = title
    //console.log(dataField)
    const form = formidable({
        multiples: true,
        uploadDir: pathDir,
        keepExtensions: true
    });
    /* form.onPart = (part) => {
        console.log(part)
    }*/
    form 
        .on('fileBegin', (keyName, file) => {
            if (file) {
                fs.unlinkSync(result.dataValues.cast_image_path)
                const name = result.dataValues.cast_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
                fs.rmdirSync(`${pathDir}/casts/${name}`);
                let folder = pathDir + `/casts/`
                if (!fs.existsSync(folder)) {
                    fs.mkdirSync(folder, {recursive: true})
                }
                file.path = path.join(folder + file.name)
            }
        })
        .on('field', (keyName, value) => {
            dataField[keyName] = value
        })
        .on('file', (keyName, file) => {
            //console.log(dataField)
            if (dataField.cast_name === undefined) {
                const name = result.dataValues.cast_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
                let folder = pathDir + `/casts/${name}/`
                if (!fs.existsSync(folder)) {
                    fs.mkdirSync(folder, {recursive: true})
                    }
                fs.rename(file.path, path.join(folder + file.name), (err) => {
                    if (err) throw err
                    console.log('file moved')
                })
                file.path = path.join(folder + file.name)
            }
            else {
                const name = dataField.cast_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
                let folder = pathDir + `/casts/${name}/`
                if (!fs.existsSync(folder)) {
                        fs.mkdirSync(folder, {recursive: true})
                    }
                fs.rename(file.path, path.join(folder + file.name), (err) => {
                    if (err) throw err
                    console.log('file moved')
                })
                file.path = path.join(folder + file.name)
            }
        })
        .on('end', () => {
            console.log('File Uploaded Successfully')
            //return res.send('hi')
        });

    form.parse(req, async(err, fields, files) => {
        //console.log(fields)
        //console.log('parse',files)
        if (err) {
            res.sendStatus(400).json({
                message: err.message
            })
        }
        const data = new req.context.models.Casts(fields);
        if (Object.keys(files).length !== 0) {
            data.cast_image = files.cast_image.name
            data.cast_image_path = files.cast_image.path
            //console.log(data)
        }
        else {
            const name = fields.cast_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
            let folder = pathDir + `/casts/${name}/`
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder)
            }
            fs.rename(result.dataValues.cast_image_path, path.join(folder + result.dataValues.cast_image), (err) => {
                if (err) throw err
                console.log('file moved')
                const oldName = result.dataValues.cast_name.replace(/\s+/g, '').replace(/\W/g, '').trim()
                fs.rmdirSync(`${pathDir}/casts/${oldName}`)
            });
            let newCastPath = path.join(folder + result.dataValues.cast_image)
            data.cast_image_path = newCastPath
        }
        try {
            const update = await req.context.models.Casts.update({
                cast_name: data.dataValues.cast_name,
                cast_image: data.dataValues.cast_image,
                cast_movie_id: data.dataValues.cast_movie_id,
                cast_image_path: data.dataValues.cast_image_path
            }, { returning: true, where: { cast_id: req.params.id}});
            return res.send(update)
        }
        catch (err) {
            res.send(err.response)
        }
    })
    /* const {cast_name, cast_movie_id} = req.body
    const result = await req.context.models.Casts.update({
        cast_name: cast_name,
        cast_movie_id: cast_movie_id,
    }, {returning: true, where:{cast_id: req.params.id}})
    return res.send(result) */
}

const downloadCastImage = async (req, res) => {
    const result = await req.context.models.Casts.findOne({
        where: {cast_id: req.params.id}
    });
    const filePath = result.dataValues.cast_image_path
    res.download(filePath)
}

export default {
    createCasts,
    findAllCasts,
    findCast,
    findCastOnMovie,
    deleteCast,
    editCast,
    singleCastImage,
    downloadCastImage
}