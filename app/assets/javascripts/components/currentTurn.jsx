class CurrentTurn extends React.Component {
    render() {
      if(!this.props.value) {
        return(
          <h6>
            It's currently the white team's turn
          </h6>
        );
      } else {
        return(
          <h6>
            It's currently the black team's turn
          </h6>
        );
      }
    }
  }
