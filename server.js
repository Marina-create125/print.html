const express = require("express");
const iconv = require("iconv-lite");

const app = express();
app.use(express.json());

app.get("/convert", (req, res) => {
    if (!req.query.text) {
        return res.status(400).send("Ошибка: текст не передан");
    }

    // Получаем текст и перекодируем его
    let encodedText = req.query.text;
    let buffer = Buffer.from(encodedText, "binary"); 
    let decodedText = iconv.decode(buffer, "win1251"); // Перекодируем в UTF-8

    // Перенаправляем в RawBT
    let rawbtUrl = `rawbt:${decodedText}`;
    res.redirect(rawbtUrl);
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
