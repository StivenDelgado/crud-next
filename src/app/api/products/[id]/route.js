import {NextResponse} from 'next/server'
import {conn} from '@/libs/mysql'
import { unlink } from 'fs/promises'

export async function  GET(request, {params}) {
  try {
    const result = await conn.query("SELECT * FROM product WHERE id = ?", [params.id])
    console.log(result)
    if (result.length === 0) {
        return NextResponse.json({
            message: 'Producto no encontrado',
        },
        {
            status: 404,
        })
    }
        
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
        {
            message: error.message,
        },
        {
            status: 500,
        }
    )
  }
}
export async function PUT(request, {params}) {
    try {
        const data = await request.formData()
        const image = data.get('image')
        let secure_url;
        if (!data.get('name')) {
            return NextResponse.json({
                message: 'El nombre es requerido',
            },
            {
                status: 400,
            })
        }
        if (image) {
            const filePath = await processImage(image);

            const resimg = await cloudinary.uploader.upload(filePath)
            secure_url = resimg.secure_url;
        if (resimg) {
          await unlink(filePath)
          
        }
    }

        const result = await conn.query("UPDATE product SET ? WHERE id = ?", [
            {
                name: data.get('name'),
                price: data.get('price'),
                description: data.get('description'),
                image: secure_url,

            }, 
            params.id])
        if (result.affectedRows === 0) {
            return NextResponse.json({
                message: 'Producto no encontrado',
            },
            {
                status: 404,
            })
        }
        const updateProduct = await conn.query("SELECT * FROM product WHERE id = ?", [params.id])
        return NextResponse.json(updateProduct)
    } catch (error) {
       return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        ) 
    }

}
export async function DELETE(request, {params}) {
    try {
        const result = await conn.query("DELETE FROM product WHERE id = ?", [params.id])
        console.log(result)
        if (result.affectedRows === 0) {
            return NextResponse.json({
                message: 'Producto no encontrado',
            },
            {
                status: 404,
            })          
        }
        return NextResponse.json({ status: 204})
    
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
                
            }
        )
    }
  
}
