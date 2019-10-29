class LowerLetterColumnSquare extends React.Component {
  render() {
    return(
      <div className="letter-column-square">
        <div className="letters">
          {this.props.value}
        </div>
      </div>
    );
  }
}
