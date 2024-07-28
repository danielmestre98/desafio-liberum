import express from 'express';
import { AppDataSource } from "./data-source"
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swaggerConfig';
// import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {

}).catch(error => console.log(error))

const app = express();
const port = 3001;
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", routes);

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});