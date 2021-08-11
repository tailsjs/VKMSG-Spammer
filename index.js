const { VK, Keyboard } = require("vk-io");
const config = require("./config.json");
var vk = new VK({
    token: config.token,
    apiMode: "parallel",
    apiLimit: 20
});
start();
async function start(){
    const keyboard = config.keyboard.powered ? getKB(config.keyboard.texts, Keyboard) : [];
    let errors_count = 0;
    for(let i = 0; i < config.amount; i++){
        const photo = config.photos != [] ? a(config.photos) : "";
        const text = config.texts != [] ? a(config.texts) : "";
        let c = await vk.api.messages.getConversations({
            count: 200
        });
        c = c.items;
        c.forEach(async item => {
            await vk.api.messages.send({
                peer_id: item.conversation.peer.id,
                message: getMessage(text, config.adUrl),
                attachment: photo,
                keyboard,
                random_id: Math.floor(Math.random() * 9999999999999)
            }).then(f => {
                logger(`Выслал сообщение в чат с ID ${item.conversation.peer.id}`)
            }).catch(e => {
                if(e.code == 10){
                errors_count += 1;
                    logger(e, 1);
                    if(errors_count === config.maxErrors){
                        logger('Количество ошибок превышает максимальное количество!', 2);
                        process.exit(-1);
                    };
                };
            });
        });
    };
};

function getKB(t, Keyboard){
    return Keyboard.keyboard([
        [button(a(t)), button(a(t)), button(a(t)), button(a(t))],
        [button(a(t)), button(a(t)), button(a(t)), button(a(t))],
        [button(a(t)), button(a(t)), button(a(t)), button(a(t))],
        [button(a(t)), button(a(t)), button(a(t)), button(a(t))],
        [button(a(t)), button(a(t)), button(a(t)), button(a(t))],
        [button(a(t)), button(a(t)), button(a(t)), button(a(t))],
        [button(a(t)), button(a(t)), button(a(t)), button(a(t))],
        [button(a(t)), button(a(t)), button(a(t)), button(a(t))],
        [button(a(t)), button(a(t)), button(a(t)), button(a(t))],
        [button(a(t)), button(a(t)), button(a(t)), button(a(t))],
    ]);
};

function getColor(){
    return a([Keyboard.POSITIVE_COLOR, Keyboard.NEGATIVE_COLOR, Keyboard.SECONDARY_COLOR, Keyboard.PRIMARY_COLOR]);
};

function getMessage(text, adurl){
    return `${text ? text : ""}
    
${adurl}`;
};

function button(label){
    return Keyboard.textButton({
        label,
        color: getColor()
    });
};

function a(a){
    return a[Math.floor(Math.random() * (a.length))];
};

function logger(text, value = 0){
    const sub = ["LOG", "ERROR", "WARNING"];
    if(value < 0 || value > sub.length || isNaN(value))return console.log(`[ LOGGER ERROR ] >> Value must be in range from 0 to ${sub.length - 1}!`);
    console.log(`[ ${sub[value]} ] >> ${text}`);
};