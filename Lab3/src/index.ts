import express, {Express, Request, Response} from 'express';
import { PORT } from "./server-config.js";

const app: Express = express()

app.set('view engine', 'ejs')
app.set('views', 'views/pages')
app.use(express.urlencoded({extended: true})); 
app.use(express.json());   

app.get('/',function(req: Request, res:Response){
    res.render('index');
});

app.get('/about',function(req: Request, res:Response){
    res.render('about');
});

app.listen(PORT, () =>{
    console.log("Server is listening on port " + PORT)
})