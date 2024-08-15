import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProfilesThunk} from "../../redux/reducers/searchReducer";
import { Box, Button, TextField, Typography, List, ListItem, ListItemText } from '@mui/material';

function SearchListFriends() {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const { profiles, error } = useSelector((state) => state.search);

    const handleSearch = () => {
        dispatch(searchProfilesThunk(searchTerm));
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h5">Search Profiles</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
                <TextField
                    label="Search by First or Last Name"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleSearch}>
                    Search
                </Button>
                {error && <Typography color="error">{error}</Typography>}
                <List>
                    {profiles.map((profile) => (
                        <ListItem key={profile.id}>
                            <ListItemText
                                primary={`${profile.firstName} ${profile.lastName}`}
                                secondary={
                                    `Email: ${profile.user.email}, 
                                    Gender: ${profile.gender}, 
                                    Birth Date: ${profile.birthDate}, 
                                    Hometown: ${profile.hometown}, 
                                    Occupation: ${profile.occupation}`
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
}

export default SearchListFriends;
