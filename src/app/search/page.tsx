/* eslint-disable react/no-unescaped-entities */
'use client';
import styles from "./page.module.css";
import CategoryList from "@/components/CategoryList";
import { useState } from "react";
import {ExpandMore, ExpandLess, ArrowDownward} from '@mui/icons-material';
import { ListSubheader, List, ListItemText, 
    ListItemButton, TextField, Collapse, Grid, Rating, Typography, Accordion, AccordionSummary, AccordionDetails, AccordionActions, Button } from "@mui/material";

export default function HomePage() {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
    <>
        <style>{'body { overflow: auto; background-color: #e2ebf0; }'}</style>
        <div className={styles.content}>
            <div className={styles.div_categories}>
                <p className={styles.header}>Our Popular Categories</p>
                <CategoryList />
            </div>
                <TextField
                    sx={{ m:5, width: '50%', input: { background: '#b4cbd8' } }} 
                    id="outlined-basic" 
                    label="Search"
                    variant="filled" 
                    inputProps={{style: {fontSize: 15}}}
                    InputLabelProps={{style: {fontSize: 12}}}
                    />

            <div style={{marginBottom:50}}>
                {[0,1,2,3,4,5,6,7,8].map((item) => (
                    <Accordion key={item} sx={{'& .MuiTypography-root' :{fontSize:'15px'}}}>
                        <AccordionSummary
                            expandIcon={<ArrowDownward />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            >
                            <Typography>Restaurant {item + 1}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography>Cusines</Typography>
                                    <Typography>Turk, Bar, Kahvalti</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography component="legend">Rating</Typography>
                                    <Rating name="read-only" value={2} readOnly />
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography component="legend">City</Typography>
                                    <Typography>Ankara</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography component="legend">Price Range</Typography>
                                    <Typography>₺198 - ₺693</Typography>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                        <AccordionActions>
                            <Button>Get Directions</Button>
                        </AccordionActions>
                    </Accordion>
                ))}
            </div>
            
            
            {/* <List
                sx={{ width: '50%', bgcolor: 'background.paper' }}
                subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Nested List Items
                </ListSubheader>
                }
            >
                <ListItemButton onClick={() => setIsOpen(!isOpen)}>
                    <ListItemText primary="Restaurant Name" />
                    {isOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Typography component="legend">Rating</Typography>
                            <Rating name="read-only" value={2} readOnly />
                        </Grid>
                        <Grid item>
                            <Typography component="legend">Cusines</Typography>
                        </Grid>
                        <Grid item>
                            <Typography component="legend">City</Typography>
                        </Grid>
                        <Grid item>
                            <Typography component="legend">Price Range</Typography>
                        </Grid>
                        <Grid item>
                            <Typography component="legend">Get Directions</Typography>
                        </Grid>
                    </Grid>
                </Collapse>
            </List> */}
        </div>
    </>
    )
}