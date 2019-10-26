class CurrentTurn extends React.Component {
    render() {
      if(!this.props.value) {
        return(
          <div>
            It's currently the white team's turn
          </div>
        );
      } else {
        return(
          <div>
            It's currently the black team's turn
          </div>
        );
      }
    }
  }
