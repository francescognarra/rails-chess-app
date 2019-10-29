class PromoteToWhiteQueen extends React.Component{
  render() {
    return(
      <button
        onClick={() => this.props.onClick()}
      >
      {' ♕ '}
      </button>
    );
  }
}
