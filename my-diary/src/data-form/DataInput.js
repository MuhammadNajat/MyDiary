import { Button, FormControl, FormHelperText, Grid, IconButton, Input, InputLabel } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import * as React from 'react';
import SaveIcon from '@mui/icons-material/Save';
import Table from '@mui/material/Table';
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
            if(value.length == 0) {
                return;
            }
            const newItems = [...items, value];
            // Update the state with the new array
            setItems(newItems);

            const newItemsInEditMode = [...itemsInEditMode, false];
            setItemsInEditMode(newItemsInEditMode);
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

        if(valueField.value.length == 0) {
            return;
        }

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
            sx={{ minHeight: '100vh', mb:8 }}
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
                                    <Input id="my-input" name="my-input" aria-describedby="my-helper-text" inputProps={{ maxLength: 50 }}/>
                                    <i><FormHelperText id="my-helper-text">50 characters max</FormHelperText></i>
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
                    style={{ width: '60%', alignItems: 'center' }}
                    sx={{ mt: 4 }}>
                    <thead>
                        <tr>
                            <th style={{ width: '80%', alignItems: 'center' }}>Task Description</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody >
                        {items.map((value, index) => (

                            <tr >
                                <td >
                                    <table >
                                        <tr style={{ width: '80%', alignItems: 'center' }}>
                                            <td>
                                                {!itemsInEditMode[index] && <p style={{ alignItems: 'center' }}>{value}</p>}
                                            </td>
                                            <td>
                                                {
                                                    itemsInEditMode[index] &&
                                                    <Input id={`EditItem:${index}:${value}`} name={`EditItem:${index}:${value}`}
                                                        inputProps={{ maxLength: 50 }} defaultValue={`${value}`}/>
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