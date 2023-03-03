import express, {Express, Request, Response} from 'express';
import {Task} from '../src/entities/task'
import { Priority } from './enums/priority';
import { tasksList } from './storage/data';
const app: Express = express()

app.set('view engine', 'ejs')
app.set('views', 'src/views/pages')
app.use(express.urlencoded({extended: true})); 
app.use(express.json());   
app.use(express.static('public'));

app.get('/',function(req: Request, res:Response){
    res.render('index', {tasksList: tasksList});
});

app.get('/create',function(req: Request, res:Response){
    res.render('create');
});

app.post('/create',function(req: Request, res:Response){
    const taskText: string = req.body.taskText;
    const newTask: Task = new Task(taskText, Priority.Low, new Date());
    tasksList.push(newTask);
    res.status(201);
    res.redirect("/");
});

app.listen(8080, () =>{
    console.log("Server is listening on port 8080" )
    const task1 = new Task('Text of the task', Priority.Low, new Date())
    console.log(task1.getInfo())
})