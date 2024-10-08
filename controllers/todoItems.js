const TodoItem = require('../ORM/models').TodoItem;

module.exports = {
  create(req, res) {
    return TodoItem
      .create({
        content: req.body.content,
        todoId: req.params.todoId,
      })
      .then(todoItem => res.status(201).send(todoItem))
      .catch(error => res.status(400).send(error));
  },

  async update(req, res) {
    try {
      let retrievedTodoItem = await Todo
        .find({
          where: {
            id: req.params.todoItemId,
            todoId: req.params.todoId,
          },
        })
      
      if(!retrievedTodoItem) {
        return res.status(404).send({
          message: 'Todo Item Not Found',
        });
      }

      let updatedTodoItem = await retrievedTodoItem
        .update(req.body, { fields: Object.keys(req.body) });
      
      res.status(200).send(updatedTodoItem);
    }
    catch (error) {
      res.status(400).send(error);
    }
  },

  async destroy(req, res) {
    try {
      let retrievedTodoItem = await Todo
        .find({
          where: {
            id: req.params.todoItemId,
            todoId: req.params.todoId,
          },
        })
      
      if(!retrievedTodoItem) {
        return res.status(404).send({
          message: 'Todo Item Not Found',
        });
      }

      await retrievedTodoItem.destroy();
      
      res.status(200).send({message: "Todo Item Destroyed Successfully!"});
    }
    catch (error) {
      res.status(400).send(error);
    }
  },
};