import { Client, EmbedBuilder, Events, GatewayIntentBits } from "discord.js"
import config from "./config.json" assert {type: "json"};
//import {mangaFetch} from "./src/fetch-manga.js"
import got from "got"

const PREFIX = "!";
let sessionToken, expires, refreshToken; 

async function fetchManga(mangaName) {
    const url = "https://api.mangadex.org"
    const options = {
        method: "GET", 
        searchParams: {
            "title" : `${mangaName}`,
            "availableTranslatedLanguage[]": "en"
        },
    }

    const data = await got(`${url}/manga`, options).json()

    return data
}

async function fetchChapters(mangaID){
    const url = "https://api.mangadex.org"
    const options = {
        method: "GET", 
        searchParams: {
            "translatedLanguage[]": "en"
        },
    }

    const data = await got(`${url}/manga/${mangaID}/feed`, options).json()
    const chapter_data = data.data

    return chapter_data
    
}

async function createSearch(argument) {
    let search_string = ""

    for (let arg in argument) {
        search_string += argument[arg] + " "
    }

    return search_string.trimEnd()
}


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
})

client.once(Events.ClientReady, c => {
    console.log(`Ready logged in as ${c.user.tag}`)
});

client.on("messageCreate", async (message) => {
    try {
        if (message.content.startsWith(PREFIX)) {
            let [commands, ...args] = message.content.trim().substring(PREFIX.length).split(/\s+/);

            switch(commands) {
                case commands = "manga":
                    const searchName = await createSearch(args)
                    const manga_info = await fetchManga(searchName)

                    manga_info.data.forEach(manga => {

                        const embed = new EmbedBuilder()
                            .setTitle(`${manga.attributes.title.en}`)
                            .setColor(0xFF0000)
                            .setDescription(`ID: ${manga.id}`)

                        message.channel.send({embeds: [embed]})
                    })
                    break; 

                case commands = "chapter":
                    const mangaChapter = await fetchChapters(args[0])
                    const sortedChapters = mangaChapter.sort((a, b) => parseInt(b.attributes.chapter) - parseInt(a.attributes.chapter))

                    let chapter_url = sortedChapters[0].attributes.externalUrl

                    console.log(sortedChapters[0])
                    console.log(sortedChapters[1])

                    if (sortedChapters[0].attributes.externalUrl === null) {
                        chapter_url = `https://mangadex.org/chapter/${sortedChapters[0].id}`
                    }
                       const embed = new EmbedBuilder()
                            .setTitle(`${sortedChapters[0].attributes.title}`)
                            .setColor(0xFF0000)
                            .setDescription(`URL: ${chapter_url}`)

                    message.channel.send({embeds: [embed]})
                    break;
            }
        }
    } catch (e) {
        console.log(e)
    }
})

client.login(config.token)