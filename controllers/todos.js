const Todo = require('../ORM/models').Todo;
const TodoItem = require('../ORM/models').TodoItem;

module.exports = {
  create(req, res) {
      console.log("Request Body: ", req);  
    return Todo
      .create({
        title: req.body.title,
      })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Todo
      .findAll({
        include: [{
          model: TodoItem,
          as: 'todoItems',
        }]
      })
      .then(todos => res.status(200).send(todos))
      .catch(error => res.status(400).send(error));
  },

  async retrieve(req, res) {
    try {
      let retrievedTodo = await Todo
        .findById(req.params.todoId, {
          include: [{
            model: TodoItem,
            as: 'todoItems',
          }],
        })

        if(!retrievedTodo) {
          return res.status(404).send({
            message: 'Todo Not Found',
          });
        }
        return res.status(200).send(retrievedTodo);
      } 
      catch (error) {
        return res.status(400).send(error);
      }
  },

  async update(req, res) {
    try {
      let retrievedTodo = await Todo
        .findById(req.params.todoId, {
          include: [{
            model: TodoItem,
            as: 'todoItems',
          }],
        })
      
      if(!retrievedTodo) {
        return res.status(404).send({
          message: 'Todo Not Found',
        });
      }

      let updatedTodo = await retrievedTodo
        .update({
          title: req.body.title || retrievedTodo.title,
        })
      
      res.status(200).send(updatedTodo);
    }
    catch (error) {
      res.status(400).send(error);
    }
  },

  async destroy(req, res) {
    try {
      let retrievedTodo = await Todo.findById(req.params.todoId)
      
      if(!retrievedTodo) {
        return res.status(404).send({
          message: 'Todo Not Found',
        });
      }

      await retrievedTodo.destroy()
      
      res.status(200).send({message: "Todo Destroyed Successfully!"});
    }
    catch (error) {
      res.status(400).send(error);
    }
  },
};