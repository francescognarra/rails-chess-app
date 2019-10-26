class SelectedPiece extends React.Component {
    render() {
      if(this.props.value === '♙') {
        return(
          <div>
            Your current selected piece is: {this.props.value} White Pawn.
            Click on a tile to place your selected piece
          </div>
        );
      } else if(this.props.value === '♖') {
        return(
          <div>
            Your current selected piece is: {this.props.value} White Rook.
            Click on a tile to place your selected piece
          </div>
        );
      } else if(this.props.value === '♘') {
        return(
          <div>
            Your current selected piece is: {this.props.value} White Knight.
            Click on a tile to place your selected piece
          </div>
        );
      } else if(this.props.value === '♗') {
        return(
          <div>
            Your current selected piece is: {this.props.value} White Bishop.
            Click on a tile to place your selected piece
          </div>
        );
      } else if(this.props.value === '♕') {
        return(
          <div>
            Your current selected piece is: {this.props.value} White Queen.
            Click on a tile to place your selected piece
          </div>
        );
      } else if(this.props.value === '♔') {
        return(
          <div>
            Your current selected piece is: {this.props.value} White King.
            Click on a tile to place your selected piece
          </div>
        );
      } else if(this.props.value === '♟') {
        return(
          <div>
            Your current selected piece is: {this.props.value} Black Pawn.
            Click on a tile to place your selected piece
          </div>
        );
      } else if(this.props.value === '♜') {
        return(
          <div>
            Your current selected piece is: {this.props.value} Black Rook.
            Click on a tile to place your selected piece
          </div>
        );
      } else if(this.props.value === '♞') {
        return(
          <div>
            Your current selected piece is: {this.props.value} Black Knight.
            Click on a tile to place your selected piece
          </div>
        );
      } else if(this.props.value === '♝') {
        return(
          <div>
            Your current selected piece is: {this.props.value} Black Bishop.
            Click on a tile to place your selected piece
          </div>
        );
      } else if(this.props.value === '♛') {
        return(
          <div>
            Your current selected piece is: {this.props.value} Black Queen.
            Click on a tile to place your selected piece
          </div>
        );
      } else if(this.props.value === '♚') {
        return(
          <div>
            Your current selected piece is: {this.props.value} Black King.
            Click on a tile to place your selected piece
          </div>
        );
      } else {
        return(
          <div>
            You have no selected pieces. Click on a piece to select it
          </div>
        );
      }
    }
  }
