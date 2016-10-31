const express = require("express")
const fs = require("fs")
const app = express()

const m = (a,b) => Object.assign({}, a, b)

const modules = new Map()

for (const filename of fs.readdirSync("./content")) {
    const name = filename.split(".")[0]
    const [id, version] = name.split("-")
    const module_ = require(`./content/${filename}`)
    // set versioned
    modules.set(name, m(module_, { id, version }))
    // set top level
    if (!modules.has(id) || modules.get(id).version < version) {
        modules.set(id, module_)
    }
}

const root = modules.get("root")

// inheritance: the good parts
function call (m, method) {
    return m[method] || call(modules.get(m.type), method)
}

function renderPage (m) {
    // TODO: do I want to pass data (context) & modules (scope) as implicit arguments here?
    return call(m,"render")({ type: "html", data: m, modules })
}

app.get("/", (req, res) => {
    res.set("Content-Type", "text/html")
    res.send(renderPage(root))
})

app.get("/content/:id", (req, res) => {
    res.set("Content-Type", "text/html")
    res.send(renderPage(modules.get(req.params.id)))
})

app.use("/src", express.static("content"))

app.listen(3000, () => {
    console.log("Listening on port 3000") // eslint-disable-line no-console
})
