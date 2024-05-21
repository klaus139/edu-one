import { app } from "./app";
import connectDB from "./utils/db";

const port = 8000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
    connectDB();
})