class PromoteToBlackKnight extends React.Component{
  render() {
    return(
      <button className="promotion-button"
        onClick={() => this.props.onClick()}
      >
      {' ♞ '}
      </button>
    );
  }
}
