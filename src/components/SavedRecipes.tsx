// src/pages/SavedRecipes.tsx
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import Recipe from './Recipe';

const SavedRecipes: React.FC = () => {
    const [recipes, setRecipes] = useState<any[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    const fetchRecipes = async () => {
        const querySnapshot = await getDocs(collection(db, 'recipes'));
        const recipesData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setRecipes(recipesData);
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    const handleClickOpen = (recipe: any) => {
        setSelectedRecipe(recipe);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedRecipe(null);
    };

    const handleDelete = async (id: string) => {
        await deleteDoc(doc(db, 'recipes', id));
        fetchRecipes();
    };

    const columns: GridColDef[] = [
        { field: 'strMeal', headerName: 'Meal Name', flex: 1 },
        { field: 'strArea', headerName: 'Area', flex: 1 },
        { field: 'strCategory', headerName: 'Category', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
                <>
                    <Button variant="contained" color="primary" onClick={() => handleClickOpen(params.row)}>
                        View Recipe
                    </Button>
                </>
            ),
        },
        {
            field: 'delete',
            headerName: 'Delete',
            flex: 1,
            renderCell: (params) => (
                <>
                    <Button variant="contained" color="warning" onClick={() => handleDelete(params.row.id)}>
                        Delete Recipe
                    </Button>
                </>
            ),

        }
    ];

    return (
        <div>
            <h1>My Recipes</h1>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={recipes}
                    columns={columns}
                    getRowId={(row) => row.id}
                />
            </div>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>{selectedRecipe?.strMeal}</DialogTitle>
                <DialogContent>
                    {selectedRecipe && <Recipe meal={selectedRecipe} />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SavedRecipes;