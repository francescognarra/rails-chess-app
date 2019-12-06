class WinnerStatement extends React.Component {

  render() {
    if(this.props.value === false) {
      return(
        <div className="winner-statement">
          {this.props.player_1} won
          <br />
          {this.props.player_2} lost
          <br />
          <button>
          <span><a href='https://chess-app-rails-andy-strube.herokuapp.com/'>End Match</a></span>
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
          <span><a href='https://chess-app-rails-andy-strube.herokuapp.com/'>End Match</a></span>
        </div>
      );
    }
    return(<div></div>);
  }
}
