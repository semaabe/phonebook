require('dotenv').config()
const express=require('express')
// const morgan=require('morgan')
const cors = require('cors')

const Person=require('./models/person')
const app=express()

app.use(express.static('dist'))
app.use(cors())
let persons=[]

// app.use(morgan('dev'))
app.use(express.json())

app.get('/api/persons',(request, response)=>{
  Person.find({}).then((person)=>{
    response.json(person)
  })
})

// app.get('/api/persons', (request, response)=>{

//     response.json(persons)
// })
// app.get('/info',(request,response)=>{
//     const sizePersons=persons.length
//     const timeStamp= new Date()
//     response.json({sizePersons, timeStamp})
// })
app.get('/api/persons/:id', (request,response)=>{
  Person.findById(request.params.id).then((person)=>{
    response.json(person)
  })
    // const id= request.params.id
    // const person= persons.find(person=>person.id===id)
    // if (person){
    //     response.json(person)
    // }else{
    //     response.json(404).end
    // }
})
app.delete('/api/persons/:id',(request,response)=>{
    const id= request.params.id
    persons=persons.filter(person=>person.id!==id)
    response.status(204).end()
})
// const generateId=()=>{
//     const maxId=persons.length>0
//     ?Math.max(...persons.map(p=>Number(p.id))):0
//     return String(maxId+1)
// }
// const generateId = () => {
//   const maxId = persons.length > 0
//     ? Math.max(...persons.map(p => Number(p.id)))
//     : 0
//   return String(maxId + 1)
// }
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save().then((savedPerson)=>{
    response.json(savedPerson)
  })

  // persons = persons.concat(person)

  // response.json(person)
})
app.get('/api/persons/:id',(request,response)=>{
  Person.findById(request.params.id).then(person=>{
    response.json(person)
  })
})

// app.post('/api/persons',(request,response)=>{
//     const body= request.body
//     // if(!body.name || !body.number){
//     //     return response.status(400).json({
//     //         error:'name or number missing'
//     //     })
//     // }
//     const person={
//         id: generateId(),
//         name: body.name, 
//         number: body.number,
//     }
//     persons=persons.concat(person)
//     response.json(person)

// })

const PORT=process.env.PORT || 3004
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})