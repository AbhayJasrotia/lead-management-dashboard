const mongoose = require('mongoose')
const Lead = require('./model/Lead')

mongoose.connect(
  'mongodb+srv://admin:admin@lead.1vxulbb.mongodb.net/?appName=Lead'
)
.then(() => console.log('Connected for seeding'))

// Fake data arrays
const names = ['Ok', 'AJ', 'Mk', 'Shalok', 'Toie', 'Harry', 'Jaso', 'Pj', 'Tin', 'Oxyzon']

const statuses = ['New', 'Contacted', 'Qualified', 'Converted', 'Lost']

// Function to generate random lead
function generateLead() {
    return {
        name: names[Math.floor(Math.random() * names.length)] + ' ' + Math.floor(Math.random() * 1000),
        email: `user${Math.floor(Math.random() * 10000)}@example.com`,
        status: statuses[Math.floor(Math.random() * statuses.length)]
    }
}

// Seed function
async function seedLeads() {
    try {
        // Clear existing data
        await Lead.deleteMany()
        console.log('Cleared old data')
        
        // Create 500 leads
        const leads = []
        for (let i = 0; i < 500; i++) {
            leads.push(generateLead())
        }
        
        await Lead.insertMany(leads)
        console.log('500 leads added!')
        
        process.exit()
    } catch (err) {
        console.log(err)
        process.exit()
    }
}

seedLeads()