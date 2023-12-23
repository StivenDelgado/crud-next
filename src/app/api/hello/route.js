import { NextResponse } from 'next/server'
import {conn} from '@/libs/mysql.js'

export async function GET(){

   let mysql = await conn.query('SELECT * FROM product')
    return NextResponse.json(mysql)
}
export async function POST(){
}