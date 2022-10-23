// Belom Gua Coba Silahkan Coba Aja Insyaallah Work
const qrcode = require('qrcode')
const pino = require('pino')
const util = require('util')
const { Boom } = require('@hapi/boom')
const { default: mainSock, DisconnectReason, fetchLatestBaileysVersion, useSingleFileAuthState, makeInMemoryStore } = require('@adiwajshing/baileys')
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep, reSize } = require('./myfunc')

const jadibot = async(kayla, m) => {
const { state, saveState } = useSingleFileAuthState(`./${m.sender.split`@`[0]}.data.json`)
const { version, isLatest } = await fetchLatestBaileysVersion()
async function start() {
const jdibotnye = mainSock({
logger: pino({ level: 'silent' }),
printQRInTerminal: true,
browser: ['Jadibot By Kayla Bot','Safari','1.0.0'],
auth: state,
version
})
store.bind(jdibotnye.ev)
jdibotnye.ev.on('messages.upsert', async chatUpdate => {
try {
kay = chatUpdate.messages[0]
if (!kay.message) return
kay.message = (Object.keys(kay.message)[0] === 'ephemeralMessage') ? kay.message.ephemeralMessage.message : kay.message
if (kay.key && kay.key.remoteJid === 'status@broadcast') return
if (!jdibotnye.public && !kay.key.fromMe && chatUpdate.type === 'notify') return
if (kay.key.id.startsWith('BAE5') && kay.key.id.length === 16) return
m = smsg(jdibotnye, kay, store)
require('./kayla')(kayla, m, chatUpdate, store)
} catch (err) {
console.log(err)}})
jdibotnye.ev.on('creds.update', saveState)
jdibotnye.ev.on('connection.update', async update => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
let reason = new Boom(lastDisconnect?.error)?.output.statusCode
if (reason === DisconnectReason.badSession) { console.log(`Bad Session File, Please Delete Session and Scan Again`); jdibotnye.logout(); }
else if (reason === DisconnectReason.connectionClosed) { console.log("Connection closed, reconnecting...."); start(); }
else if (reason === DisconnectReason.connectionLost) { console.log("Connection Lost from Server, reconnecting..."); start(); }
else if (reason === DisconnectReason.connectionReplaced) { console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First"); jdibotnye.logout(); }
else if (reason === DisconnectReason.loggedOut) { console.log(`Device Logged Out, Please Scan Again And Run.`); jdibotnye.logout(); }
else if (reason === DisconnectReason.restartRequired) { console.log("Restart Required, Restarting..."); start(); }
else if (reason === DisconnectReason.timedOut) { console.log("Connection TimedOut, Reconnecting..."); start(); }
else update.end(`Unknown DisconnectReason: ${reason}|${connection}`)
}
console.log('Connected...', update)
m.reply(util.format(update))
if (update.qr) {
var qrnye = await qrcode.toBuffer(update.qr)
var delny = await kayla.sendMessage(m.chat, {image:qrnye})
setTimeout(() => {
kayla.sendMessage(m.chat, { delete: delny.key } )
}, 30000)
}
})
global.jdibotnye = jdibotnye
}
return start()
}

module.exports.jadibot = jadibot