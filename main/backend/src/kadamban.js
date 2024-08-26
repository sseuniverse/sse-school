// models/Board.js
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
  columns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Column' }],
  columnOrder: [{ type: String }]
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;

// models/Card.js
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;

// models/Column.js
const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema({
  id: String,
  title: String,
  cardIds: [{ type: String }]
});

const Column = mongoose.model('Column', columnSchema);

module.exports = Column;

// controllers/boardController.js
const Board = require('../models/Board');
const Card = require('../models/Card');
const Column = require('../models/Column');

exports.getBoard = async (req, res) => {
  try {
    const board = await Board.findOne();
    if (!board) {
      const newBoard = new Board({
        cards: [],
        columns: [],
        columnOrder: []
      });
      await newBoard.save();
      res.send(newBoard);
    } else {
      res.send(board);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.createColumn = async (req, res) => {
  try {
    const newColumn = new Column(req.body);
    await newColumn.save();
    const board = await Board.findOne();
    board.columns.push(newColumn._id);
    board.columnOrder.push(newColumn.id);
    await board.save();
    res.send(newColumn);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.updateColumn = async (req, res) => {
  try {
    const columnId = req.body.columnId;
    const column = await Column.findByIdAndUpdate(columnId, req.body.column, { new: true });
    if (!column) {
      res.status(404).send({ message: 'Column not found' });
    } else {
      res.send(column);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteColumn = async (req, res) => {
  try {
    const columnId = req.body.columnId;
    await Column.findByIdAndRemove(columnId);
    const board = await Board.findOne();
    board.columns = board.columns.filter((column) => column.toString() !== columnId);
    board.columnOrder = board.columnOrder.filter((column) => column !== columnId);
    await board.save();
    res.status(204).send({ message: 'Column deleted' });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.persistColumn = async (req, res) => {
  try {
    const newColumnOrder = req.body;
    const board = await Board.findOne();
    board.columnOrder = newColumnOrder;
    await board.save();
    res.send(board);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.persistCard = async (req, res) => {
  try {
    const columns = req.body;
    const board = await Board.findOne();
    board.columns = columns;
    await board.save();
    res.send(board);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.addTask = async (req, res) => {
  try {
    const { card, columnId } = req.body;
    const newCard = new Card(card);
    await newCard.save();
    const column = await Column.findById(columnId);
    column.cardIds.push(newCard._id);
    await column.save();
    res.send(newCard);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { cardId, columnId } = req.body;
    await Card.findByIdAndRemove(cardId);
    const column = await Column.findById(columnId);
    column.cardIds = column.cardIds.filter((card) => card.toString() !== cardId);
    await column.save();
    res.status(204).send({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).send(err);
  }
};

// routes/boardRoute.js
const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

router.get('/', boardController.getBoard);
router.post('/columns', boardController.createColumn);
router.put('/columns/:id', boardController.updateColumn);
router.delete('/columns/:id', boardController.deleteColumn);
router.put('/columns', boardController.persistColumn);
router.put('/cards', boardController.persistCard);
router.post('/cards', boardController.addTask);
router.delete('/cards/:id', boardController.deleteTask);

module.exports = router;