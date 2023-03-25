import React from 'react'
import {List, ListItem, ListItemAvatar, ListItemText} from '@mui/material';
import './Task.css';
import DeleteIcon from '@mui/icons-material/Delete';

const Task = ({taskText, onClick}) => {
  console.log(taskText);
  return (
    <List className="todo_list">
      <ListItem>
        <ListItemAvatar/>
        <ListItemText primary={taskText}/>
        <DeleteIcon fontSize="large" style={{opacity: 0.7}} onClick={onClick}/>
      </ListItem>
    </List>
  )
}

export default Task