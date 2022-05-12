const express = require('express')
const app =express()
const db = require('./models')
const port = 5000
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:false}))


app.use('/api/auth',require('./routes/userRoute'))


db.sequelize.sync({force:true}).then(()=>{
    app.listen(port,() => console.log(`Server started on port ${port}`))
})
