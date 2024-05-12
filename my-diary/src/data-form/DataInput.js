import { Button, FormControl, FormHelperText, Grid, IconButton, Input, InputLabel, List, ListItem, ListItemText } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import * as React from 'react';
import UpdateIcon from '@mui/icons-material/Update';
import TaskIcon from '@mui/icons-material/Task';
import SaveIcon from '@mui/icons-material/Save';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DoneAllIcon from '@mui/icons-material/DoneAll';

export function DataForm() {
    //var toDoList = [];

    const [items, setItems] = React.useState([]);
    const [itemsInEditMode, setItemsInEditMode] = React.useState([]);

    const addItem = () => {
        // Create a new array with the updated items
        //const newItems = [...items, { id: items.length + 1, name: `Item ${items.length + 1}` }];
        const newItems = [...items, { id: items.length + 1, name: `Item ${items.length + 1}` }];
        // Update the state with the new array
        setItems(newItems);
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.target);
        console.log("KEY - Value:");
        data.forEach((value, key) => {
            console.log(`${key}: ${value}`);
            //toDoList.push(value);
            const newItems = [...items, value];
            // Update the state with the new array
            setItems(newItems);

            const newItemsInEditMode = [...itemsInEditMode, false];
        });

        const name = data.get("my-input");
        console.log("Got by name: ", name);

        console.log("items: ", items);
    }

    const handleEditButtonClick = indexToEdit => () => {
        console.log(indexToEdit, " : To edit");
        let newItemsInEditMode = []
        for (let i = 0; i < itemsInEditMode.length; i++) {
            newItemsInEditMode.push(itemsInEditMode[i]);
        }
        newItemsInEditMode[indexToEdit] = true;
        setItemsInEditMode(newItemsInEditMode);
    }

    const handleDoneButtonClick = indexToRemove => () => {
        console.log("Clicked button name: ", indexToRemove);
        let newItems = []
        let newItemsInEditMode = []
        for (let i = 0; i < items.length; i++) {
            if (i != indexToRemove) {
                newItems.push(items[i]);
                newItemsInEditMode.push(itemsInEditMode[i]);
            }
        }
        setItems(newItems);
        setItemsInEditMode(newItemsInEditMode);
    }

    const handleEditConfirmationButtonClick = index => () => {
        let valueField = document.getElementById(`EditItem:${index}:${items[index]}`);
        console.log("New value: ", valueField.value);

        let newItems = []
        let newItemsInEditMode = []
        for (let i = 0; i < items.length; i++) {
            newItems.push(items[i]);
            newItemsInEditMode.push(itemsInEditMode[i]);
        }
        newItems[index] = valueField.value;
        setItems(newItems);

        newItemsInEditMode[index] = false;
        setItemsInEditMode(newItemsInEditMode);

    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh' }}
            margin={2}
        >
            <Grid item xs={3}
                alignItems="center"
                justifyContent="center">
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <table>
                            <tr>
                                <td>
                                    <InputLabel htmlFor="my-input">What's next?</InputLabel>
                                    <Input id="my-input" name="my-input" aria-describedby="my-helper-text" />
                                    <FormHelperText id="my-helper-text">Your plan</FormHelperText>
                                </td>

                                <td>
                                    <Button variant="contained" type='submit' endIcon={<SendIcon />}>
                                        Submit
                                    </Button>
                                </td>
                            </tr>
                        </table>
                    </FormControl>
                </form>

                <div>

                </div>
            </Grid>

            {
                items.length > 0 &&
                <Table
                    aria-label="basic table"
                    alignItems="center"
                    justifyContent="center"
                    style={{ width: '60%', alignItems: 'center' }}>
                    <thead>
                        <tr>
                            <th style={{ width: '80%', alignItems: 'center' }}>Task Details</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody >
                        {items.map((value, index) => (

                            <tr >
                                <td >
                                    <table >
                                        <tr >
                                            <td >
                                                {!itemsInEditMode[index] && <p style={{ alignItems: 'center' }}>{value}</p>}
                                            </td>
                                            <td>
                                                {
                                                    itemsInEditMode[index] &&
                                                    <Input id={`EditItem:${index}:${value}`} name={`EditItem:${index}:${value}`} defaultValue={`${value}`} aria-describedby="my-helper-text" />
                                                }
                                            </td>
                                        </tr>
                                    </table>
                                </td>

                                <td>
                                    {
                                        itemsInEditMode[index] &&
                                        <div>
                                            <table>
                                                <tr>
                                                    <td>
                                                        <Button variant="contained" onClick={handleEditConfirmationButtonClick(index)}>
                                                            <SaveIcon />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    }

                                    {
                                        !itemsInEditMode[index] &&
                                        <IconButton id={`EditButton,${index},${value}`} name={`EditButton,${index},${value}`} onClick={handleEditButtonClick(`${index}`)}>
                                            <EditIcon />
                                        </IconButton>
                                    }
                                </td>

                                <td>
                                    <IconButton id={`CheckButton,${index},${value}`} name={`CheckButton,${index},${value}`} onClick={handleDoneButtonClick(`${index}`)}>
                                        <DoneAllIcon />
                                    </IconButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
        </Grid >
    );
}