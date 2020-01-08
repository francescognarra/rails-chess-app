class SelectedPiece extends React.Component {

    selectedPieceStatement() {
      if(!this.props.value) {
        return(
          <h6>
            You have no selected pieces. Click on a piece to select it
          </h6>
        );
      }
      let pieceType;
      if(this.props.value === '♙') {
        pieceType = "White Pawn";
      }
      if(this.props.value === '♖') {
        pieceType = "White Rook";
      }
      if(this.props.value === '♘') {
        pieceType = "White Knight";
      }
      if(this.props.value === '♗') {
        pieceType = "White Bishop";
      }
      if(this.props.value === '♕') {
        pieceType = "White Queen";
      }
      if(this.props.value === '♔') {
        pieceType = "White King";
      }
      if(this.props.value === '♟') {
        pieceType = "Black Pawn";
      }
      if(this.props.value === '♜') {
        pieceType = "Black Rook";
      }
      if(this.props.value === '♞') {
        pieceType = "Black Knight";
      }
      if(this.props.value === '♝') {
        pieceType = "Black Bishop";
      }
      if(this.props.value === '♛') {
        pieceType = "Black Queen";
      }
      if(this.props.value === '♚') {
        pieceType = "Black King";
      }
      return(
        <h6>
          Your current selected piece is: {this.props.value} {pieceType}.
          Click on a tile to place your selected piece
        </h6>
      );
    }

  render() {
    return(
      <div>
        {this.selectedPieceStatement()}
      </div>
    );
  }
}
