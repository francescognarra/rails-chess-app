class NumberColumnSquare extends React.Component {
  render() {
    return(
      <div className="number-column-square">
        <div className="numbers">
          {this.props.value}
        </div>
      </div>
    );
  }
}
