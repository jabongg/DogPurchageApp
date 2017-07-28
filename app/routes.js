var Todo = require('./models/todo');
var Story = require('./models/story');

function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};

function getStories(res) {
    Story.find(function (err, story) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(story); // return all story in JSON format
    });
};


module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });
	
	    // get all poems
    app.get('/api/poems', function (req, res) {
        // use mongoose to get all todos in the database
        getStories(res);
    });
	

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

	console.log(req);
	console.log(req.body.text);
	console.log(req.body.dogProperty);
	
        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
			dogProperty: req.body.dogProperty,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

	// create poem and send back all poems after creation
    app.post('/api/poems', function (req, res) {

	console.log(req.body.poet);
	console.log(req.body.poem);
	
        // create a poem, information comes from AJAX request from Angular
        Story.create({
            poet: req.body.poet,
			poem: req.body.poem,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getStories(res);
        });

    });

	
    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });


};
