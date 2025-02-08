const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// Маршрут для печати заказа
app.post("/print", async (req, res) => {
    try {
        if (!req.body.text) {
            return res.status(400).json({ success: false, error: "No text provided" });
        }

        let encodedText = req.body.text;
        let decodedText = decodeURIComponent(encodedText); // Декодируем URL-encoded текст

        console.log("Decoded Text:", decodedText);

        // Отправляем данные в RawBT Web Print API
        const response = await axios.post("http://localhost:9100/print", decodedText, {
            headers: { "Content-Type": "text/plain" },
        });

        res.json({ success: true, message: "Order sent to printer", response: response.data });

    } catch (error) {
        console.error("Print error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
