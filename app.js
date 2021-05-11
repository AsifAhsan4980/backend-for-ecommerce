const express = require('express')
const bodyPasrser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.Port || 5000

app.use(bodyPasrser.urlencoded({extended : true}))


app.use(bodyPasrser.json())

//My Sql
const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'Mike4980',
    database        : 'ecommerce'
});

app.get('', (req, res)=>{
    pool.getConnection((err, connection)=>{
        if(err) throw err
        console.log('connected as id',connection.threadId)

        // quer
        connection.query('SELECT * from product' , (err,rows)=>{
            connection.release()
            if(!err){
                res.send(rows)
            }
            else{
                console.log(err)
            }
        })
    })
})

//get by id

app.get('/:id', (req, res)=>{
    pool.getConnection((err, connection)=>{
        if(err) throw err
        console.log('connected as id',connection.threadId)

        // quer
        connection.query('SELECT * from product WHERE id = ?' , [req.params.id], (err,rows)=>{
            connection.release()
            if(!err){
                res.send(rows)
            }
            else{
                console.log(err)
            }
        })
    })
})

// 

app.delete('/:id', (req, res)=>{
    pool.getConnection((err, connection)=>{
        if(err) throw err
        console.log('connected as id',connection.threadId)

        // quer
        connection.query('DELETE from product WHERE id = ?' , [req.params.id], (err,rows)=>{
            connection.release()
            if(!err){
                res.send('Product with the Record ID: ',[req.params.id],' has been deleted' )
            }
            else{
                console.log(err)
            }
        })
    })
})

//create

app.post('', (req, res)=>{
    pool.getConnection((err, connection)=>{
        if(err) throw err
        console.log('connected as id',connection.threadId)

        const params = req.body

        // quer
        connection.query('INSERT INTO product SET ?' , params , (err,rows)=>{
            connection.release()
            if(!err){
                res.send('Product with the Record ID:  has been created' )
            }
            else{
                console.log(err)
            }
        })
    })
})

//update

app.put('', (req, res)=>{
    pool.getConnection((err, connection)=>{
        if(err) throw err
        console.log('connected as id',connection.threadId)

       // const params = req.body

        const {id, name, description, price, image} = req.body

        // quer
        connection.query('UPDATE product SET name = ? , description = ? , price = ?, image = ? WHERE id = ?' , [name, description, price, image, id] , (err,rows)=>{
            connection.release()
            if(!err){
                res.send('Product with the Records has been updated' )
            }
            else{
                console.log(err)
            }
        })
    })
})



app.listen(port, ()=> console.log('Listen on Port ',{port}))