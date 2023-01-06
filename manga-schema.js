import mongoose from "mongoose"

async function insertMangaID(userID, mangaID) {
    const schema = new mongoose.Schema({
        mangaID: {
            type: String,
            required: true
        }
    })

    return mongoose.models[`${userID}`] ? mongoose.model(`${userID}`) : mongoose.model(`${userID}`, schema)
}

export { insertMangaID }