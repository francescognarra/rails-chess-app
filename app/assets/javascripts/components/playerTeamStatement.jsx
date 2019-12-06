class PlayerTeamStatement extends React.Component {
  render() {
    if(this.props.player === 'player_1') {
      return(
        <div>
          Your playing as the white team
        </div>
      );
    }
    if(this.props.player === 'player_2') {
      return(
        <div>
          Your playing as the black team
        </div>
      );
    }
  }
}
