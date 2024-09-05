const router = require("express").Router();
const KanbanController = require("../controllers/kanban.controller.js");

// const controller = new KanbanController();

// router.get("/board", controller.getBoard);
// router.post("/columns/new", controller.createColumn);
// router.post("/columns/update", controller.updateColumn);
// router.post("/columns/delete", controller.deleteColumn);
// router.post("/columns/order", controller.persistColumnOrder);
// router.post("/cards", controller.persistCard);
// router.post("/tasks", controller.addTask);
// router.post("/tasks/delete", controller.deleteTask);

// module.exports = router;

router.get('/board', KanbanController.getBoard);
router.post('/columns/new', KanbanController.createColumn);
router.post('/columns/update', KanbanController.updateColumn);
router.post('/move-column', KanbanController.moveColumn);
router.post('/clear-column', KanbanController.clearColumn);
router.post('/delete-column', KanbanController.deleteColumn);
router.post('/create-task', KanbanController.createTask);
router.post('/update-task', KanbanController.updateTask);
router.post('/move-task', KanbanController.moveTask);
router.post('/delete-task', KanbanController.deleteTask);

module.exports = router