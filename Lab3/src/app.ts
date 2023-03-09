import express, { Express, Request, Response } from 'express';
import { Task } from '../src/entities/task'
import { Priority } from './enums/priority';
import { tasksList } from './storage/data';
import bodyParser from 'body-parser'

const app: Express = express()

app.set('view engine', 'ejs')
app.set('views', 'src/views/pages')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
    res.render('index', { tasksList: tasksList });
});

app.get('/create', function (req: Request, res: Response) {
    res.render('create');
});

app.post('/tasks', (req: Request, res: Response) => {
    const sortField: string = req.body.byField;
    const sortedTasks = tasksList.sort((taskA, taskB) => {
        if (taskA[sortField] < taskB[sortField]) {
            return -1;
        } else if (taskA[sortField] > taskB[sortField]) {
            return 1;
        } else {
            return 0;
        }
    });
    res.render('index', { tasksList: sortedTasks });
})

app.put('/tasks/:id', (req: Request, res: Response) => {
    const taskId: string = req.params.id;
    const newText: string = req.body.newText;
    tasksList[taskId].text = newText;
    res.redirect('/');
  });

app.post('/create', function (req: Request, res: Response) {
    const taskText: string = req.body.taskText;
    const priority: string = Priority[req.body.priority];
    const newTask: Task = new Task(taskText, Priority[priority], new Date());
    tasksList.push(newTask);
    res.status(201);
    res.redirect("/");
});

app.post('/deleteTask', (req: Request, res: Response) => {
    const { index } = req.body;
    tasksList.splice(index, 1);
    res.sendStatus(200);
});

app.post('/tickTask', (req: Request, res: Response) => {
    const { index } = req.body;
    const task = tasksList[index];
    task.isDone = !task.isDone;
    res.sendStatus(200);
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080")
})