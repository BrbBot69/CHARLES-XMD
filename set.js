const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0xHVkFNMUxUSDRkNXIrZFQ3UDlPclB2RHhwQmFXanN4VllpWDR3cDBIcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWEQ5amNVck00MExiaUg0a01BaGRQUk9JdHkybWozRTBZNy9lSFQrLzRoST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNQyt1MlQxcmFqbVN2RzFvRmMvZGRPS1JZdHNSd0xUU1pLR0wwWTdScG53PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxL0ZiTDc5SldiREtJeENLY1JvTjQzcUhCV2JhSUNKdW81UmNrRmZWZzJRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlJVFpVMWhxRjRkS3hIQUVJdmg5ZmpGblRxc3hOc3paK1RpcjUwSmo1MFU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVPSVc1VE9RdUdvK0hEOGFVeU5PY0ZpaVUzMXBQYzRJOVVqOFRWYlpBQUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkY1eFdJYVhSNTM3NHBKd3J1eWE0SHhkVkNLOFJ1UGdUdGdjZjNUMWVYaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWGlVcFVBZUFSN1dZclV1WDFFQ1N4SWQxQng4MFltdGRBRENhZ2xaRUx6OD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldKZ2hwSHluSEpOaXBWczhYNjNrUCtmbUlHcUlsSlo0R1ZGdENLaXF5a01CRm5KanhyL1dYaHozcVk1YlB5WjBDZ3VYZUM0MWF6d054R2JJeFFyVkN3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjUwLCJhZHZTZWNyZXRLZXkiOiJWT0RqMjhQaDdLR3M4bERwZEtZblBVS21pTjhuTGJOakp0bHJRMGpyU0xVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI3ODE4MjMyMjY5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjIzN0VENzg0QjY5QTRGNkNDRTA5ODYxMTVBRDc3NjZFIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTI2NDcwMDJ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI3ODE4MjMyMjY5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjdBODA3MDlFNzcyRkQ0QUUxMURCRTMyQTlGREFENEU4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTI2NDcwMDd9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjEyM0xPVFVTIiwibWUiOnsiaWQiOiIyNzgxODIzMjI2OTozN0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJCYWxsYXMiLCJsaWQiOiIxNzQ1OTEwOTE2NzUzMjg6MzdAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQKzJ3MllReElyZHd3WVlFeUFBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJyNldyOEtEcjBrdU1IdWptTnM5R3g1a2tMc0htd0RFN0FrREM0aWlzWDFnPSIsImFjY291bnRTaWduYXR1cmUiOiI3VWhEY2d4OExPSGRBd055ck9WZjdSY3BndjFKdlJDclVlcFV6a3o3UGxOaWVVb2RUc1BsRWFGQzEwSVlUbXJOcFk0T0Nsa3EydG5VTWxnVUVDOUtBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiYmV3L3hvYTR2YXlkaDZSZnA0Y0ZwVG13OUVDZHF1Z3hrVm5tVGpVUEdCWk5zT0YveGc2WWlnditSR0NPeVRlUVhoQnFlUGJwQ29VSWVIaFVsMGZmREE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNzgxODIzMjI2OTozN0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJhK2xxL0NnNjlKTGpCN281amJQUnNlWkpDN0I1c0F4T3dKQXd1SW9yRjlZIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQVVJQ0E9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTI2NDY5OTQsImxhc3RQcm9wSGFzaCI6IlBXazVCIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFESmkifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "®𝕬𝖛𝖊.𝕭",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "27767494368",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'ꀭꀤꈤꅏꂦꂦ-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/bhuppk.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'no',
    AUDIO_CHATBOT : process.env.AUDIO_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'yes',
                  ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
