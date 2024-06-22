import { app } from "./app";
import connectDB from "./database/database";


const port = 8000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
    connectDB();
    
})