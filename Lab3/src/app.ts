import express, {Express, Request, Response} from 'express';
import {Task} from '../src/entities/task'
import { Priority, priorities } from './enums/priority';
import { tasksList } from './storage/data';
import bodyParser from 'body-parser';

const app: Express = express()

app.set('view engine', 'ejs')
app.set('views', 'src/views/pages')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/',function(req: Request, res:Response){
    const tasks = [...tasksList];

    const sortOptions = {
        date: 'Дата створення',
        priority: 'Пріоритет'
    };

    const sort: string = req.query.sort as string || Object.keys(sortOptions)[0];
    tasks.sort((a,b) => a[sort] - b[sort]);
    
    res.render('index', {tasksList: tasks, sortOptions, sort});
});

app.get('/create',function(req: Request, res:Response){
    res.render('create', { model: null, priorities });
});

app.get('/edit/:id',function(req: Request, res:Response){
    const match = tasksList.find(x => x.id === req.params.id);
    
    if(!match){
        return res.sendStatus(400);
    }

    res.render('create', { model: match, priorities });
});

app.post('/create',function(req: Request, res:Response){
    const id: string = req.body.id;
    const taskText: string = req.body.taskText;
    const priority: Priority = req.body.priority;

    if(!taskText || !(priority in Priority)){
        return res.sendStatus(400);
    }

    if(id){
        const task = tasksList.find(x => x.id === id);

        if(!task){
            return res.sendStatus(400);
        } else {
            task.text = taskText;
            task.priority = priority;
        }
    } else {
        const newTask: Task = new Task(taskText, priority, new Date());
        tasksList.push(newTask);
    }
    
    res.status(201);
    res.redirect("/");
});

app.post('/deleteTask', (req: Request, res: Response) => {
    const { id } = req.body;
    const index: number = tasksList.findIndex(item => item.id === id) 
    tasksList.splice(index, 1);
    res.sendStatus(200);
});

app.post('/tickTask', (req: Request, res: Response) => {
    const { id } = req.body;
    const index: number = tasksList.findIndex(item => item.id === id) 
    const task =  tasksList[index];
    task.isDone = !task.isDone;
    tasksList[index] = task;
    res.sendStatus(200);
});

app.listen(8080, () =>{
    console.log("Server is listening on port 8080" )
})