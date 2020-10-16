import React from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'


const AddressForm = () => {
    return (
        <>
        <Typography variant="h6" gutterBottom>Dirección de envío</Typography>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="Nombre"
                    fullWidth
                    autoComplete="given-name"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Apellido/s"
                    fullWidth
                    autoComplete="family-name"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} md={12}>
                <TextField
                    required
                    id="address1"
                    name="address1"
                    label="Dirección línea 1"
                    fullWidth
                    autoComplete="shipping address-line1"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} md={12}>
                <TextField
                    id="address2"
                    name="address2"
                    label="Dirección línea 2"
                    fullWidth
                    autoComplete="shipping address-line2"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    required
                    id="city"
                    name="city"
                    label="Ciudad"
                    fullWidth
                    autoComplete="shipping address-level2"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField id="state" name="state" label="Estado/Provincia/Región" fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    required
                    id="zip"
                    name="zip"
                    label="Código Postal"
                    fullWidth
                    autoComplete="shipping postal-code"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    required
                    id="country"
                    name="country"
                    label="País"
                    fullWidth
                    autoComplete="shipping country"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                    label="Utiliza esta dirección para el pago."
                />
            </Grid>
        </Grid>
        </>
    )
}

export default AddressForm