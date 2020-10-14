import React from 'react'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const PaymentForm = () => {
    return(
        <>
        <Typography variant="h4" gutterBottom>Método de pago</Typography>
        <Grid container spacing={3}>
            <Grid item xs={10} md={5}>
                <TextField required id="cardName" label="Titular de la tarjeta" fullWidth autoComplete="cc-name" variant="outlined"/>
            </Grid>
            <Grid item xs={10} md={5}>
                <TextField
                    required
                    id="cardNumber"
                    label="Número de tarjeta"
                    fullWidth
                    autoComplete="cc-number"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={10} md={5}>
                <TextField required id="expDate" label="Fecha de vencimiento" fullWidth autoComplete="cc-exp" variant="outlined" />
            </Grid>
            <Grid item xs={10} md={5}>
                <TextField
                    required
                    id="cvv"
                    label="CVV"
                    helperText="Código de verificación"
                    fullWidth
                    autoComplete="cc-csc"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                    label="Recordar detalles de pago"
                />
            </Grid>
        </Grid>
        </>
    )
}
    
    
export default PaymentForm
