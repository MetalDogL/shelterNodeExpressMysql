'use strict';

const express = require('express');
const mysql = require('mysql');
const app = express();
const path = require('path');
const port = 3021;


const mysqlConn = mysql.createConnection({
    user: 'root',
    password: 'root',
    host: 'localhost',
    database: 'shelter'
});

mysqlConn.connect((err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('db conn');
    }
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.post('/', (req, res) => {
    mysqlConn.query('INSERT INTO dogs(name, age, date,hashome) VALUES(?,?,?,?)',
        [req.body.name, req.body.age, req.body.date, req.body.hashome],
        (err, docs) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(docs);
            }
        }
    )
})

app.get('/getDogs', (req, res) => {
    mysqlConn.query('SELECT * FROM dogs',
        (err, docs) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(docs);
            }
        }
    )
})

app.listen(port);