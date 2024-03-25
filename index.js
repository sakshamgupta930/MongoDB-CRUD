import express from "express";
import mongoose from "mongoose";
import user from "./models/user.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const PORT = process.env.PORT || 3000;
const mongoUrl = "mongodb+srv://mongodbPractice:SvEAGxbzsirMuayv@cluster0.eqxy59e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl, { useNewUrlParser: true, dbName: "e-commerce" });
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

app.get("/", (req, res) => {
    res.send("Hello World!!")
})

app.post("/post-user", async (req, res) => {
    try {
        const {
            name, email, number
        } = req.body;

        const newUser = new user({
            name: name,
            email: email,
            number: number
        })

        const savedUser = await newUser.save();

        res.status(200).json({
            message: "user Saved",
            savedUser: savedUser
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Interval Server Error",
            errorMessage: error.message
        })

    }
})

app.get("/get-user/:name", async (req, res) => {
    try {
        const { name } = req.params;

        const fetchedUser = await user.find({
            name: name
        });

        if (!fetchedUser) {
            res.status(404).json({
                message: "User not Found"
            })
        }

        res.status(200).json({
            message: "user found",
            fetchedUSer: fetchedUser
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Interval Server Error",
            error: error.message
        })

    }
})

app.put("/update-user/:name", async (req, res) => {
    try {
        const { name } = req.params;
        const updatedUser = req.body;

        const newUpdatedUser = await user.findOneAndUpdate({
            name: name,
        }, updatedUser, { new: true });

        res.status(200).json({
            message: "User Updated",
            updateduser: newUpdatedUser
        });
    } catch (error) {
        res.status(500).json({
            messgae: "Internal Server Error"
        });
    }
})

app.delete("/delete-user/:name", async (req, res) => {
    try {
        const { name } = req.params;

        const deletedUser = await user.deleteOne({
            name: name,
        });

        res.status(200).json({
            message: "User Deleted",
            updateduser: deletedUser
        });
    } catch (error) {
        res.status(500).json({
            messgae: "Internal Server Error"
        });
    }
})

app.listen(PORT, () => {
    console.log("SERVER STARTED AT PORT")
})