import { Client } from "discord-slash-commands-client";
import {} from 'dotenv/config';

const client = new Client(
    process.env.BOT_TOKEN,
    process.env.CLIENT_ID
);

client
    .createCommand({
        name: "ping",
        description: "Hola mundo"
    }, '831195999736561695')
    .then(console.log)
    .catch(console.error);

client
    .createCommand({
        name: "links",
        description: "Enlaces de un track",
        options: [
            {
                name: "url",
                description: "Deeezer URL",
                type: 3,
                required: true
            }
        ]
    }, '831195999736561695')
    .then(console.log)
    .catch(console.error);