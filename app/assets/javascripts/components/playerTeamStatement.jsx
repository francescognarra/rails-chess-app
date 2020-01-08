class PlayerTeamStatement extends React.Component {
  render() {
    if(this.props.player === 'player_1') {
      return(
        <h6>
          Your playing as the white team
        </h6>
      );
    }
    if(this.props.player === 'player_2') {
      return(
        <h6>
          Your playing as the black team
        </h6>
      );
    }
  }
}
