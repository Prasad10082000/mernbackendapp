import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const tasks = [
  { id: "1", content: "First task" },
  { id: "2", content: "Second task" },
  { id: "3", content: "Third task" },
];

const taskStatus = {
  requested: {
    name: "Requested",
    items: tasks,
  },
  toDo: {
    name: "To do",
    items: [],
  },
  inProgress: {
    name: "In Progress",
    items: [],
  },
  done: {
    name: "Done",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function Dragdrop() {
  const [columns, setColumns] = useState(taskStatus);
  const [open, setOpen] = useState(false);
  const [cardContent, setCardContent] = useState("");
  const [editCardId, setEditCardId] = useState(null);

  const handleClickOpen = (id, content) => {
    setCardContent(content);
    setEditCardId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setCardContent("");
    setEditCardId(null);
    setOpen(false);
  };

  const handleSaveCard = () => {
    if (editCardId !== null) {
      const updatedColumns = { ...columns };
      Object.keys(updatedColumns).forEach((key) => {
        updatedColumns[key].items = updatedColumns[key].items.map((item) =>
          item.id === editCardId ? { ...item, content: cardContent } : item
        );
      });
      setColumns(updatedColumns);
    } else {
      const newCard = { id: Date.now().toString(), content: cardContent };
      setColumns({
        ...columns,
        requested: {
          ...columns.requested,
          items: [...columns.requested.items, newCard],
        },
      });
    }

    handleClose();
  };

  const handleDeleteCard = (columnId, cardId) => {
    const updatedColumns = { ...columns };
    updatedColumns[columnId].items = updatedColumns[columnId].items.filter(
      (item) => item.id !== cardId
    );
    setColumns(updatedColumns);
    handleClose();
  };

  return (
    <div style={{ marginTop: "70px" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleClickOpen(null, "")}
        style={{ marginBottom: 8, display: "flex", margin: "auto" }}
      >
        Add Card
      </Button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? "lightblue"
                          : "lightgrey",
                        padding: 4,
                        width: 250,
                        minHeight: 500,
                      }}
                    >
                      {column.items.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                userSelect: "none",
                                padding: 16,
                                margin: "0 0 8px 0",
                                minHeight: "50px",
                                backgroundColor: snapshot.isDragging
                                  ? "#263B4A"
                                  : "#456C86",
                                color: "white",
                                ...provided.draggableProps.style,
                              }}
                              onClick={() =>
                                handleClickOpen(item.id, item.content)
                              }
                            >
                              {item.content}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          ))}
        </DragDropContext>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editCardId !== null ? "Edit Card" : "Add New Card"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="cardContent"
            label="Card Content"
            type="text"
            fullWidth
            value={cardContent}
            onChange={(e) => setCardContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveCard}>
            {editCardId !== null ? "Save Changes" : "Add Card"}
          </Button>
          {editCardId !== null && (
            <Button
              onClick={() => handleDeleteCard("requested", editCardId)}
              color="error"
            >
              Delete Card
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Dragdrop;
