const mongoose = require('mongoose')

const password = process.argv[2]
const name= process.argv[3]
const number=process.argv[4]

const url = `mongodb+srv://persons:${password}@cluster0.f8dawyz.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema= new mongoose.Schema({
    name:String,
    number:String,
})
const Person= mongoose.model('Person',personSchema)


if(name && number){
    const person= new Person({
    name,
    number
})
    person.save().then((result)=>{
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
    }else{
    Person.find({}).then(result=>{
        result.forEach(person=>{
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
})
}
