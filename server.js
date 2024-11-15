import express, { response } from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

const app  = express()
app.use(express.json())
app.use(cors())

app.post('/rides', async (req,res) =>{
    
    await prisma.Ride.create({
        data:{
            id: req.body.id,
            data: req.body.data,
            startTime: req.body.startTime,
            stopTime: req.body.stopTime
        }
    })


    res.status(201).json(req.body)
})


app.get('/rides', async( req,res) =>{

    const rides = await prisma.Ride.findMany()

    res.status(200).json(rides)
})

app.put('/rides/:id', async (req,res) =>{
    let idParse = parseInt(req.params.id)

    await prisma.Ride.update({
        where:{
            id: idParse
        },
        data:{
            data: req.body.data,
            startTime: req.body.startTime,
            stopTime: req.body.stopTime
        } 
    })
    res.status(201).json(req.body)
})

app.delete('/rides/:id', async (req, res) =>{
    let idParse = parseInt(req.params.id)
    await prisma.Ride.delete({
        where: {
            id: idParse
        }
    })
})

app.listen(3000)