class Square extends React.Component {
    render() {
      if(this.props.rowInx % 2 === 0 && this.props.colInx % 2 !== 0) {
        return(
            <button 
              className="square make-it-dark"
              onClick={() => this.props.onClick()}
            >
            <div className="piece">
              {this.props.value}
            </div>
          </button>
        );
      } else if(this.props.rowInx % 2 !== 0 && this.props.colInx % 2 === 0) {
        return(
          <button 
            className="square make-it-dark"
            onClick={() => this.props.onClick()}
          >
            <div className="piece">
              {this.props.value}
            </div>
          </button>
        );
      } else {
        return(
          <button 
            className="square"
            onClick={() => this.props.onClick()}
          >
            <div className="piece">
              {this.props.value}
            </div>
          </button>
        );
      }
    }
  }
  