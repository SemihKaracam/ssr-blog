const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const articleRouter = require("./routes/articles.js");
const Article = require("./models/article.js");
const methodOverride = require("method-override")


mongoose.connect("mongodb://localhost/blog")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"))
app.set("view engine", "ejs")
app.use("/articles", articleRouter)
app.get('/', async(req, res) => {
    const articles = await Article.find().sort({
        createdAt:"desc"
    })
    res.render("articles/index", { articles: articles })
});
app.listen(5000)