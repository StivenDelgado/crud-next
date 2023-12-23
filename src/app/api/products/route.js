import {NextResponse} from 'next/server'
import {conn} from '@/libs/mysql'
import {unlink} from 'fs/promises'
import cloudinary from '@/libs/cloudinary'
import {processImage} from '@/libs/processImage'

export async function GET() {
    try {
      const results = await conn.query("SELECT * FROM product");
      return NextResponse.json(results);
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }

export async function POST(resquest) {

    try {
        const data = await resquest.formData();
        const image = data.get("image");
        if (!image) {
          return NextResponse.json(
            { message: "Image is required" },
            { status: 400 }
          );
        }
       const filePath = await processImage(image);

        const resimg = await cloudinary.uploader.upload(filePath)

        if (resimg) {
          await unlink(filePath)
          
        }

        const result = await conn.query("INSERT INTO product SET ?", {
          name: data.get("name"),
          price: data.get("price"),
          description: data.get("description"),
          image: resimg.secure_url,
        });
        console.log(result)
        return NextResponse.json({name: data.get("name"),  price: data.get("price"), description: data.get("description"), id: result.insertId,})
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: error.message },
            { status: 500 } )
    }
}