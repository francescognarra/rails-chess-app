class WinnerStatement extends React.Component {

  render() {
    if(this.props.value === false) {
      return(
        <div className="winner-statement">
          {this.props.player_1} won
          <br />
          {this.props.player_2} lost
          <br />
          <button className="winner-statement-button">
            <h6><span><a href='https://chess-app-rails-andy-strube.herokuapp.com/index/' className="winner-statement-button-text">End Match and return to lobby</a></span></h6>
          </button>
        </div>
      );
    }
    if(this.props.value === true) {
      return(
        <div className="winner-statement">
          {this.props.player_2} won
          <br />
          {this.props.player_1} lost
          <br />
          <button className="winner-statement-button">
            <h6><span><a href='https://chess-app-rails-andy-strube.herokuapp.com/index/' className="winner-statement-button-text">End Match and return to lobby</a></span></h6>
          </button>
        </div>
      );
    }
    return(<div></div>);
  }
}
