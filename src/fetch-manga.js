import got from "got"

async function fetchChapters(mangaID) {
    const url = "https://api.mangadex.org"
    const options = {
        prefixUrl: `https://api.mangadex.org/manga/${mangaID}/feed`,
        method: "GET",
        searchParams: {
            "translatedLanguage[]": "en"
        },
    }

    const data = await got(options).json()
    const chapter_data = data.data

    return chapter_data
}

async function fetchManga(mangaName) {
    const url = "https://api.mangadex.org"
    const options = {
        method: "GET",
        searchParams: {
            "title": `${mangaName}`,
            "availableTranslatedLanguage[]": "en"
        },
    }

    const data = await got(`${url}/manga`, options).json()

    return data
}

export {fetchManga, fetchChapters}