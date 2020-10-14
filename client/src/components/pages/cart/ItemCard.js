import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

class ItemCard extends Component { 
  
  constructor(props) {
    super(props)
    this.state = {
      item: this.props.item
    }
  }

  handleClick = () => {
    this.props.handleDelete(this.state.item._id)
  }
  
  render() {

    return (
      <div flexgrow={1}>
        <Paper spacing={2} margin='auto' maxwidth={500}>
          <Grid container spacing={3}>
            <Grid item>
              <ButtonBase id='item-img' >
                <img  alt="Imagen de la obra" src={this.state.item.image} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={4}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    {this.state.item.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {this.state.item.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Materiales: {this.state.item.materials} | Medidas: {this.state.item.size}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" style={{ cursor: 'pointer' }}>
                    <DeleteForeverIcon onClick={this.handleClick} color='error' fontSize="large"/>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                  <Typography variant="subtitle1">{this.state.item.price} {this.state.item.currency}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

export default ItemCard