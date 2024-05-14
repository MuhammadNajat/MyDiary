// Filename - Header.js

import * as React from "react";

// importing material UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DrawIcon from '@mui/icons-material/Draw';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';

export default function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                {/*Inside the IconButton, we 
					can render various icons*/}
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <DrawIcon />
                </IconButton>

                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                >
                    My Records
                </Typography>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <FilterVintageIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
