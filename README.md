# VKMSG-Spammer
Дудосер сообщениями в лс.
## !Настраивать в config.json!
```js
{
    "token": "", // Токен бота.
    "keyboard": {
        "powered": false, // Включить клавиатуру?
        "texts": [] // Массив с текстами, которые буду тписаться на клавиатуре.
    },
    "photos": [], // Массив с фотографиями (photo1_1)
    "texts": [], // Массив с текстом.
    "adUrl": "", // Ваша ссылка.
    "amount": 10, // Количество сообщений.
    "maxErrors": 5 // Максимальное количество ошибок.
}
```
При полной настройке высылает сообщения по типу таких:

![подпишись пж](https://github.com/tailsjs/VKMSG-Spammer/raw/master/message_example.png)