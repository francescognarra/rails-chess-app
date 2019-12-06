class WinnerStatement extends React.Component {

  render() { 
    if(this.props.value === false) {
      return(
        <div className="winner-statement">
          {this.props.player_1} won
          <br />
          {this.props.player_2} lost
        </div>
      );
    }
    if(this.props.value === true) {
      return(
        <div className="winner-statement">
          {this.props.player_2} won
          <br />
          {this.props.player_1} lost
        </div>
      );
    }
    return(<div></div>);
  }
}
