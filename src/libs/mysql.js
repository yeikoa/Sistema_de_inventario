import mysql from 'serverless-mysql'

export const conn = mysql({
    config:{
        host: 'database-eligam.c4llwzqtfxcc.us-east-1.rds.amazonaws.com',
        user: 'admin',
        password: 'Duke2003',
        port: '3306',
        database:'Eligam'
    }
})