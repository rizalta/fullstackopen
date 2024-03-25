import express from "express";
import config from "./utils/config.js";
import blogRouter from "./controllers/blog.js";
import cors from "cors";
import mongoose from "mongoose";
import logger from "./utils/logger.js";

const app = express();

mongoose.connect(config.MONGODB_URI)
	.then(() => {
		logger.info("Connected to MongoDB");
	})
	.catch((error) => {
		logger.error("Error connecting to MongoDB: ", error.message);
	});

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);

export default app;