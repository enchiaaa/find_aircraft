import express from "express"
import dotenv from "dotenv";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json())

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

app.get("/all_grades", (req, res) => {
    const q = "SELECT * FROM ranking_list ORDER BY player_click_count ASC limit 5;"
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.post("/all_grades", (req, res) => {
    const q = "INSERT INTO ranking_list (`player_name`, `player_click_count`) VALUES (?)";
    const values = [
        req.body.player_name,
        req.body.player_click_count
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("grade has been created successfully!");
    })
})

app.listen(8800, () => {
    console.log("Connected to backend!")
}
)