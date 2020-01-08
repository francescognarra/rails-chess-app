class WhitePawnPromotion extends React.Component {
    render() {
      let columnLetter = '';
      if(this.props.value === 0) {
        columnLetter = 'H';
      }
      if(this.props.value === 1) {
        columnLetter = 'G';
      }
      if(this.props.value === 2) {
        columnLetter = 'F';
      }
      if(this.props.value === 3) {
        columnLetter = 'E';
      }
      if(this.props.value === 4) {
        columnLetter = 'D';
      }
      if(this.props.value === 5) {
        columnLetter = 'C';
      }
      if(this.props.value === 6) {
        columnLetter = 'B';
      }
      if(this.props.value === 7) {
        columnLetter = 'A';
      }
      return(
        <h6>
          You have a white pawn that is eligible for promotion located at {columnLetter}8.
          <br />
          Please make a selection.
        </h6>
      );
    }
  }
