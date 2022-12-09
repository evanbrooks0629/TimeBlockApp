import React from 'react';
import { Grid } from '@mui/material';

const DOTWRow = () => {
    return (
        <Grid item container xs={12} justifyContent="center">
            <Grid item sx={{ display: {xs: 'none', sm: 'block'} }} xs />
            <Grid item xs>
                <p style={{color: '#8c52ff'}}>S</p>
            </Grid>
            <Grid item xs>
                <p style={{color: '#8c52ff'}}>M</p>
            </Grid>
            <Grid item xs>
                <p style={{color: '#8c52ff'}}>T</p>
            </Grid>
            <Grid item xs>
                <p style={{color: '#8c52ff'}}>W</p>
            </Grid>
            <Grid item xs>
                <p style={{color: '#8c52ff'}}>T</p>
            </Grid>
            <Grid item xs>
                <p style={{color: '#8c52ff'}}>F</p>
            </Grid>
            <Grid item xs>
                <p style={{color: '#8c52ff'}}>S</p>
            </Grid>
            <Grid item sx={{ display: {xs: 'none', sm: 'block'} }} xs />
        </Grid>
    );
}

export default DOTWRow;