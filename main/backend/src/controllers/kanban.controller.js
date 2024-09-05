const { m } = require("../model");

const Board = m.kanban.board;
const Task = m.kanban.task;
const Column = m.kanban.column;

// class KanbanController {
//   async getBoard(req, res) {
//     try {
//       const board = await Board.findOne().populate("cards").populate("columns");
//       res.json(board);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to retrieve board" });
//     }
//   }

//   async createColumn(req, res) {
//     try {
//       const newColumn = new Column(req.body);
//       await newColumn.save();
//       res.json(newColumn);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to create new column" });
//     }
//   }

//   async updateColumn(req, res) {
//     try {
//       const columnId = req.body.columnId;
//       const column = await Column.findByIdAndUpdate(columnId, req.body.column, {
//         new: true,
//       });
//       res.json(column);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to update column" });
//     }
//   }

//   async deleteColumn(req, res) {
//     try {
//       const columnId = req.body.columnId;
//       await Column.findByIdAndRemove(columnId);
//       res.json({ message: "Column deleted successfully" });
//     } catch (error) {
//       res.status(500).json({ error: "Failed to delete column" });
//     }
//   }

//   async persistColumnOrder(req, res) {
//     try {
//       const board = await Board.findOne();
//       board.columnOrder = req.body.columnOrder;
//       await board.save();
//       res.json({ message: "Column order updated successfully" });
//     } catch (error) {
//       res.status(500).json({ error: "Failed to update column order" });
//     }
//   }

//   async persistCard(req, res) {
//     try {
//       const columns = req.body.columns;
//       const board = await Board.findOne();
//       board.columns = columns;
//       await board.save();
//       res.json({ message: "Card persisted successfully" });
//     } catch (error) {
//       res.status(500).json({ error: "Failed to persist card" });
//     }
//   }

//   async addTask(req, res) {
//     try {
//       const { card, columnId } = req.body;
//       const column = await Column.findById(columnId);
//       column.cardIds.push(card.id);
//       await column.save();
//       res.json({ message: "Task added successfully" });
//     } catch (error) {
//       res.status(500).json({ error: "Failed to add task" });
//     }
//   }

//   async deleteTask(req, res) {
//     try {
//       const { cardId, columnId } = req.body;
//       const column = await Column.findById(columnId);
//       column.cardIds = column.cardIds.filter((id) => id !== cardId);
//       await column.save();
//       res.json({ message: "Task deleted successfully" });
//     } catch (error) {
//       res.status(500).json({ error: "Failed to delete task" });
//     }
//   }
// }

// module.exports = KanbanController;

exports.getBoard = async (req, res) => {
  try {
    const board = await Board.findOne();
    res.status(200).json(board);
  } catch (error) {
    console.error("[Kanban API]: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// exports.createColumn = async (req, res) => {
//   try {
//     const columnData = req.body;
//     const column = new Column(columnData);
//     await column.save();
//     const board = await Board.findOne();
//     board.columns[column._id] = column;
//     board.ordered.push(column._id);
//     await board.save();
//     res.status(200).json(column);
//   } catch (error) {
//     console.error("[Kanban API]: ", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

exports.createColumn = async (req, res) => {
  try {
    const columnData = req.body;
    const column = new Column(columnData);
    await column.save();

    let board = await Board.findOne();
    if (!board) {
      // If no board is found, create a new one
      board = new Board();
    }

    board.columns[column._id] = column;
    board.ordered.push(column._id);
    await board.save();
    res.status(200).json(column);
  } catch (error) {
    console.error("[Kanban API]: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateColumn = async (req, res) => {
  try {
    const columnId = req.body.columnId;
    const columnName = req.body.columnName;
    const column = await Column.findById(columnId);
    column.name = columnName;
    await column.save();
    res.status(200).json(column);
  } catch (error) {
    console.error("[Kanban API]: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.moveColumn = async (req, res) => {
  try {
    const newOrdered = req.body.newOrdered;
    const board = await Board.findOne();
    board.ordered = newOrdered;
    await board.save();
    res.status(200).json(board.ordered);
  } catch (error) {
    console.error("[Kanban API]: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.clearColumn = async (req, res) => {
  try {
    const columnId = req.body.columnId;
    const column = await Column.findById(columnId);
    column.taskIds = [];
    await column.save();
    const board = await Board.findOne();
    board.columns[columnId] = column;
    await board.save();
    res.status(200).json(columnId);
  } catch (error) {
    console.error("[Kanban API]: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteColumn = async (req, res) => {
  try {
    const columnId = req.body.columnId;
    const column = await Column.findByIdAndRemove(columnId);
    const board = await Board.findOne();
    delete board.columns[columnId];
    board.ordered = board.ordered.filter((id) => id !== columnId);
    await board.save();
    res.status(200).json(columnId);
  } catch (error) {
    console.error("[Kanban API]: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createTask = async (req, res) => {
  try {
    const columnId = req.body.columnId;
    const taskData = req.body.taskData;
    const task = new Task(taskData);
    await task.save();
    const column = await Column.findById(columnId);
    column.taskIds.push(task._id);
    await column.save();
    const board = await Board.findOne();
    board.columns[columnId] = column;
    await board.save();
    res.status(200).json(task);
  } catch (error) {
    console.error("[Kanban API]: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const taskData = req.body.taskData;
    const task = await Task.findById(taskData.id);
    task.name = taskData.name;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    console.error("[Kanban API]: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.moveTask = async (req, res) => {
  try {
    const updateColumns = req.body.updateColumns;
    const board = await Board.findOne();
    board.columns = updateColumns;
    await board.save();
    res.status(200).json(board.columns);
  } catch (error) {
    console.error("[Kanban API]: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const columnId = req.body.columnId;
    const taskId = req.body.taskId;
    const task = await Task.findByIdAndRemove(taskId);
    const column = await Column.findById(columnId);
    column.taskIds = column.taskIds.filter((id) => id !== taskId);
    await column.save();
    const board = await Board.findOne();
    board.columns[columnId] = column;
    await board.save();
    res.status(200).json({ columnId, taskId });
  } catch (error) {
    console.error("[Kanban API]: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
