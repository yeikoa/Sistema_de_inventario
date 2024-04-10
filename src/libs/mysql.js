import mysql from 'serverless-mysql'

export const conn = mysql({
    config:{
        host: 'eligam.chci4e62og5m.us-east-2.rds.amazonaws.com',
        user: 'admin',
        password: 'Eligam1234',
        port: '3306',
        database:'Eligam'
    }
})