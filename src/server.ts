import app from "./app"
import "dotenv/config";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 5000;
async function main(){
    try{
        await prisma.$connect()
        const connectionString = `${process.env.DATABASE_URL}`;
        console.log(`Database connected successfully with connection string: ${connectionString}`);
        app.listen(PORT , () =>{
            
            console.log(`Server is running on port ${PORT}`)

        })

    }
    catch(err){
        console.log(err)
        prisma.$disconnect()
        process.exit(1)
    }

}

main()