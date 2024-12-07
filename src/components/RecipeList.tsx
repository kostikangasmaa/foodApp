// src/RecipeList.tsx
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Recipe from './Recipe';


const RecipeList: React.FC = () => {
    const [meals, setMeals] = useState<any[]>([]);
    const [query, setQuery] = useState<string>(''); // State to handle search query
    const [selectedMeal, setSelectedMeal] = useState<any | null>(null); // State to handle selected meal for dialog
    const [open, setOpen] = useState<boolean>(false); // State to handle dialog open/close

    const handleFetch = async (searchQuery: string) => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
            const data = await response.json();
            setMeals(data.meals || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        handleFetch(''); // Fetch all meals initially
    }, []);

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleFetch(query);
    };

    const handleClickOpen = (meal: any) => {
        setSelectedMeal(meal);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedMeal(null);
    };

    const handleSave = async () => {
        if (selectedMeal) {
            try {
                await addDoc(collection(db, 'recipes'), selectedMeal);
                alert('Recipe saved successfully!');
            } catch (error) {
                console.error('Error saving recipe:', error);
                alert('Failed to save recipe.');
            }
        }
    };

    const columns: GridColDef[] = [
        { field: 'strMeal', headerName: 'Meal Name', flex: 1 },
        { field: 'strArea', headerName: 'Cousine', flex: 1 },
        { field: 'strCategory', headerName: 'Category', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
                <Button variant="contained" color="primary" onClick={() => handleClickOpen(params.row)}>
                    View Recipe
                </Button>
            ),
        },
    ];

    return (
        <div>
            <form onSubmit={handleSearch}>
                <TextField
                    label="Search for a meal"
                    variant="outlined"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Search
                </Button>
            </form>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={meals}
                    columns={columns}
                    getRowId={(row) => row.idMeal}
                />
            </div>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>{selectedMeal?.strMeal}</DialogTitle>
                <DialogContent>
                    {selectedMeal && <Recipe meal={selectedMeal} />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave} color="primary">
                        Save Recipe
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RecipeList;