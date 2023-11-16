const express = require("express")
const router = express.Router()
const File = require("../models/files")

router.post("/", async (req, res) => {
  const { data, type } = req.body
  await File({ data, type }).save()
  res.json({ success: true })
})

router.get("/", async (req, res) => {
  const files = await File.find()
  res.json({ files })
})

router.get("/:id", async (req, res) => {
  const { id } = req.params
  const file = await File.findById(id)
  res.json({ file })
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params
  await File.findByIdAndDelete(id)
  res.json({ success: true })
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { data, type } = req.body
  await File.findByIdAndUpdate(id, { data, type })
  res.json({ success: true })
})

module.exports = router