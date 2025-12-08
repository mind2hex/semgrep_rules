// EXAMPLE 1: node-serializer
const serialize = require("node-serialize")
app.post("/restore", (req, res) => {
    const data = req.body.data

    // ruleid: javascript-tainted-097-Insecure-Deserialization
    const obj = serialize.unserialize(data)

    res.json({ ok: true })
})

// EXAMPLE 2: 
const sj = require("serialize-javascript")
app.post("/foo", (req, res) => {
    const data = req.body.data

    // ruleid: javascript-tainted-097-Insecure-Deserialization
    const obj = sj.deserialize(data)

    res.json({ ok: true })
})