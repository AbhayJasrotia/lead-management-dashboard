require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const Lead = require('./model/Lead')

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   }

.then(() => console.log('MongoDB Atlas Connected'))
.catch(err => console.log(err))


//testing route - 
app.get('/test', (req, res) => {
    res.send("Working till now")
})

// Simple hardcoded login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body
    
    // credentials
    if (username === 'admin' && password === 'admin123') {
        res.json({ 
            success: true, 
            message: 'Login successful',
            user: username
        })
    } else {
        res.status(401).json({ 
            success: false, 
            message: 'Invalid credentials' 
        })
    }
})

// CREATE - Add new lead (for seeding)
app.post('/api/leads', async(req, res) => {
    const lead = new Lead(req.body)
    const saved = await lead.save()
    res.status(201).json(saved)
})

// GET ALL - with search, filter, sort, pagination
app.get('/api/leads', async(req, res) => {
    const { search, status, sort, page = 1, limit = 10 } = req.query
    
    // Build filter object
    let filter = {}
    if (search) {
        filter.name = { $regex: search, $options: 'i' }
    }
    if (status) {
        filter.status = status
    }
    
    // Sort option
    let sortOption = {}
    if (sort === 'name') sortOption.name = 1
    if (sort === 'date') sortOption.createdAt = -1
    
    // Pagination
    const skip = (page - 1) * limit
    
    const leads = await Lead.find(filter)
        .sort(sortOption)
        .limit(parseInt(limit))
        .skip(skip)
    
    const total = await Lead.countDocuments(filter)
    
    res.json({
        leads,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
    })
})

// GET ONE - single lead by id
app.get('/api/leads/:id', async(req, res) => {
    const lead = await Lead.findById(req.params.id)
    res.json(lead)
})

// UPDATE - update lead status
app.put('/api/leads/:id', async(req, res) => {
    const updated = await Lead.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.json(updated)
})



app.listen(5000, () => {
    console.log('Server running on localhost: 5000')
})