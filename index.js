import { Client, Collection, Events, GatewayIntentBits } from "discord.js"
import config from "./config.json" assert {type: "json"};
//import {mangaFetch} from "./src/fetch-manga.js"
import { MANGA } from '@consumet/extensions'

const PREFIX = "!";
const mangadex = new MANGA.MangaDex();

async function fetchManga(mangaName) {
   return mangadex.search(mangaName)
}

async function fetchMangaDetails(mangaID){
    return mangadex.fetchMangaInfo(mangaID)
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
                    let manga_search = await createSearch(args)

                    console.log(manga_search)
        
                    const manga_object = await fetchManga(manga_search)
                
                    manga_object["results"].forEach((manga) => {
                      message.channel.send(`${manga.title} ${manga.id}`)
                    })

                    break; 

                case commands = "chapter":
                    console.log(args[0])
                    const manga_details = await fetchMangaDetails(args[0])
                    
                    console.log(manga_details)
                    
                    for (let chapter in manga_details.chapters) {
                        message.channel.send(chapter_string)
                    }
                    
                    break;
            }

        }
    } catch (e) {
        console.log(e)
    }
})

client.login(config.token)