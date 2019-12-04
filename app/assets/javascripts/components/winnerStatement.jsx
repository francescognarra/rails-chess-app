class WinnerStatement extends React.Component {

  render() {
    if(this.props.value === false) {
      return(
        <div className="winner-statement">
          The white team won
          <br />
          The black team lost
        </div>
      );
    }
    if(this.props.value === true) {
      return(
        <div className="winner-statement">
          The black team won
          <br />
          The white team lost
        </div>
      );
    } else {
      return(
      <div></div>
      );
    }
  }
}
