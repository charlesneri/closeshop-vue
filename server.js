// server.js
import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

const app = express()
const PORT = 3001

app.use(cors())

app.get('/api/search', async (req, res) => {
  const query = req.query.q
  if (!query) return res.status(400).json({ error: 'Missing search query' })

  const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=1&countrycodes=ph&q=${encodeURIComponent(query)}`
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'closeshop-app (your@email.com)',
      },
    })
    const data = await response.json()
    res.json(data)
  } catch (err) {
    console.error('Proxy error:', err)
    res.status(500).json({ error: 'Search failed' })
  }
})

app.listen(PORT, () => {
  console.log(`✅ Proxy running at http://localhost:${PORT}`)
})
