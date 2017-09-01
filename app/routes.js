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

	// get element by id
	app.get('/api/poems/:poem_id', function(req, res) {
		Story.findById(req.params.poem_id, function(err, story) {
			if (err) {
				res.status(500).send(err);
			} 
			if (story) {
				res.send(story);
			} else {
				res.send("no story found");
			}
		});
	});
	
	app.post('/api/poems/likes/:poem_id', function (req, res) {
		Story.findById(req.params.poem_id, function (err, todo) {  
			if (err) {
				res.status(500).send(err); 
			} else {
				//get like of the current post.
				console.log(todo.like);
				if (todo.like == undefined) {
					todo.like = 0;
				}
				// update like of current post by 1;
				todo.like = todo.like + 1;
				
			todo.save(function (err, todo) {
				if (err) {
					res.status(500).send(err)
				}
				res.send(todo);
			});		
			}
		});		
	});

	
 	    // update a story
	app.post('/api/poems/:poem_id', function (req, res) {
			Story.findById(req.params.poem_id, function (err, todo) {  
			// Handle any possible database errors
			if (err) {
				res.status(500).send(err);
			} else {
				// Update each attribute with any possible attribute that may have been submitted in the body of the request
				// If that attribute isn't in the request body, default back to whatever it was before.
				todo.poet = req.body.poet;
				todo.poem = req.body.poem;
				// Save the updated document back to the database
				todo.save(function (err, todo) {
					if (err) {
						res.status(500).send(err)
					}
					res.send(todo);
				});
			}
		});
		
    });
	
	
	// delete a story
    app.delete('/api/poems/:poem_id', function (req, res) {
        Story.remove({
            _id: req.params.poem_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getStories(res);
        });
    });

};
