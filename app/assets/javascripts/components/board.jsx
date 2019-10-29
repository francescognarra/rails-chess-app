class Board extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        board: [
          ['♖', '♘', '♗', '♔', '♕', '♗', '♘', '♖'],
          ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
          ['♜', '♞', '♝', '♚', '♛', '♝', '♞', '♜']
        ],
        blackTeamsTurn: false,
        blackTeamWon: null,
        selPce: null,
        selPceRowInx: null,
        selPceColInx: null
      }
    }
  
    selectPiece(rowInx, colInx) {
      let pieceIsAlreadySelected = false;
      if(this.state.selPce) {
        pieceIsAlreadySelected = true;
      }
      if(!this.state.blackTeamsTurn) {
        if(this.whitePieces().includes(this.state.board[rowInx][colInx])) {
          this.setState({
            selPce: this.state.board[rowInx][colInx]
          });
        }
      }
      if(this.state.blackTeamsTurn) {
        if(this.blackPieces().includes(this.state.board[rowInx][colInx])) {
          this.setState({
            selPce: this.state.board[rowInx][colInx]
          });
        }
      }
      if(!this.state.blackTeamsTurn || this.state.blackTeamsTurn) {
        if(this.state.board[rowInx][colInx] === null) {
          this.setState({
            selPce: this.state.board[rowInx][colInx]
          });
        }
      }
      if(pieceIsAlreadySelected && this.state.board[rowInx][colInx]) {
        this.setState({ selPce: null });
      }
    }
  
    checkNorthPath(rowInx) {
      for(let row = rowInx + 1; row < this.state.selPceRowInx; row++) {
        if(this.state.board[row][this.state.selPceColInx]) {
          return false;
        }
      }
      return true;
    }
  
    checkSouthPath(rowInx) {
      for(let row = rowInx - 1; row > this.state.selPceRowInx; row--) {
        if(this.state.board[row][this.state.selPceColInx]) {
          return false;
        }
      }
      return true;
    }
  
    checkEastPath(colInx) {
      for(let col = this.state.selPceColInx + 1; col < colInx; col++) {
        if(this.state.board[this.state.selPceRowInx][col]) {
          return false;
        }
      }
      return true;
    }
  
    checkWestPath(colInx) {
      for(let col = this.state.selPceColInx - 1; col > colInx; col--) {
        if(this.state.board[this.state.selPceRowInx][col]) {
          return false;
        }
      }
      return true;
    }
  
    checkNorthWestPath(rowInx) {
      let col = this.state.selPceColInx - 1;
      for(let row = this.state.selPceRowInx - 1; row > rowInx; row--) {
        if(this.state.board[row][col]) {
          return false;
        }
        col--;
      }
      return true;
    }
  
    checkSouthWestPath(rowInx) {
      let col = this.state.selPceColInx - 1;
      for(let row = this.state.selPceRowInx + 1; row < rowInx; row++) {
        if(this.state.board[row][col]) {
          return false;
        }
        col--;
      }
      return true;
    }
  
    checkSouthEastPath(rowInx) {
      let col = this.state.selPceColInx + 1;
      for(let row = this.state.selPceRowInx + 1; row < rowInx; row++) {
        if(this.state.board[row][col]) {
          return false;
        }
        col++;
      }
      return true;
    }
  
    checkNorthEastPath(rowInx) {
      let col = this.state.selPceColInx + 1;
      for(let row = this.state.selPceRowInx - 1; row > rowInx; row--) {
        if(this.state.board[row][col]) {
          return false;
        }
        col++;
      }
      return true;
    }
  
    blackPieces() {
      return ['♟', '♝', '♛', '♞', '♚', '♜'];
    }
  
    whitePieces() {
      return ['♙', '♗', '♕', '♘', '♔', '♖'];
    }
  
    setBlackPawn(rowInx, colInx) {
      let boardClone = this.state.board;
      if(this.state.blackTeamsTurn && !this.blackPieces().includes(boardClone[rowInx][colInx])) {
        if(this.state.selPceRowInx === 6 && !this.state.board[5][colInx] && !this.state.board[4][colInx]) {
          if(rowInx === 4 && colInx === this.state.selPceColInx) {
            boardClone[rowInx][colInx] = '♟';
            this.setState({
              blackTeamsTurn: !this.state.blackTeamsTurn
            });
          }
        }
        if(rowInx === this.state.selPceRowInx - 1 && colInx === this.state.selPceColInx) {
          if(!boardClone[rowInx][colInx]) {
            boardClone[rowInx][colInx] = '♟';
            this.setState({
              blackTeamsTurn: !this.state.blackTeamsTurn
            });
          }
        }
      }
      return boardClone;
    }
  
    removeOldBlackPawn(rowInx, colInx) {
      let boardClone = this.state.board;
      if(this.state.blackTeamsTurn && !this.blackPieces().includes(boardClone[rowInx][colInx])) {
        if(this.state.selPceRowInx === 6 && !this.state.board[5][colInx] && !this.state.board[4][colInx]) {
          if(rowInx === 4 && colInx === this.state.selPceColInx) {
            boardClone[this.state.selPceRowInx][colInx] = null;
          }
        }
        if(rowInx === this.state.selPceRowInx - 1 && colInx === this.state.selPceColInx) {
          if(!boardClone[rowInx][colInx]) {
            boardClone[this.state.selPceRowInx][colInx] = null;
          }
        }
      }
      return boardClone;
    }
  
    blackPawnOvertakePiece(rowInx, colInx) {
      let boardClone = this.state.board;
      if(this.state.blackTeamsTurn && !this.blackPieces().includes(boardClone[rowInx][colInx])) {
        if(rowInx === this.state.selPceRowInx - 1) {
          if(colInx === this.state.selPceColInx - 1 || colInx === this.state.selPceColInx + 1) {
            if(this.whitePieces().includes(boardClone[rowInx][colInx])) {
              boardClone[rowInx][colInx] = '♟';
              this.setState({
                blackTeamsTurn: !this.state.blackTeamsTurn
              });
            }
          }
        }
      }
      return boardClone;
    }
  
    removeOldBlackPawnForOvertakingPiece(rowInx, colInx) {
      let boardClone = this.state.board;
      if(this.state.blackTeamsTurn && !this.blackPieces().includes(boardClone[rowInx][colInx])) {
        if(rowInx === this.state.selPceRowInx - 1) {
          if(colInx === this.state.selPceColInx + 1) {
            if(boardClone[rowInx][colInx]) {
              boardClone[this.state.selPceRowInx][colInx - 1] = null;
            }
          }
          if(colInx === this.state.selPceColInx - 1) {
            if(boardClone[rowInx][colInx]) {
              boardClone[this.state.selPceRowInx][colInx + 1] = null;
            }
          }
        }
      }
      return boardClone;
    }
  
    setWhitePawn(rowInx, colInx) {
      let boardClone = this.state.board;
      if(!this.state.blackTeamsTurn && !this.whitePieces().includes(boardClone[rowInx][colInx])) {
        if(this.state.selPceRowInx === 1 && !this.state.board[2][colInx] && !this.state.board[3][colInx]) {
          if(rowInx === 3 && colInx === this.state.selPceColInx) {
            boardClone[rowInx][colInx] = '♙';
            this.setState({
              blackTeamsTurn: !this.state.blackTeamsTurn
            });
          }
        } 
        if(rowInx === this.state.selPceRowInx + 1 && colInx === this.state.selPceColInx) {
          if(!boardClone[rowInx][colInx]) {
            boardClone[rowInx][colInx] = '♙';
            this.setState({
              blackTeamsTurn: !this.state.blackTeamsTurn
            });
          }
        }
      }
      return boardClone;
    }
  
    removeOldWhitePawn(rowInx, colInx) {
      let boardClone = this.state.board;
      if(!this.state.blackTeamsTurn && !this.whitePieces().includes(boardClone[rowInx][colInx])) {
        if(this.state.selPceRowInx === 1 && !this.state.board[2][colInx] && !this.state.board[3][colInx]) {
          if(rowInx === 3 && colInx === this.state.selPceColInx) {
            boardClone[this.state.selPceRowInx][colInx] = null;
          }
        }
        if(rowInx === this.state.selPceRowInx + 1 && colInx === this.state.selPceColInx) {
          if(!boardClone[rowInx][colInx]) {
            boardClone[this.state.selPceRowInx][colInx] = null;
          }
        }
      }
      return boardClone;
    }
  
    whitePawnOvertakePiece(rowInx, colInx) {
      let boardClone = this.state.board;
      if(!this.state.blackTeamsTurn && !this.whitePieces().includes(boardClone[rowInx][colInx])) {
        if(rowInx === this.state.selPceRowInx + 1) {
          if(colInx === this.state.selPceColInx - 1 || colInx === this.state.selPceColInx + 1) {
            if(this.blackPieces().includes(boardClone[rowInx][colInx])) {
              boardClone[rowInx][colInx] = '♙';
              this.setState({
                blackTeamsTurn: !this.state.blackTeamsTurn
              });
            }
          }
        }
      }
      return boardClone;
    }
  
    removeOldWhitePawnForOvertakingPiece(rowInx, colInx) {
      let boardClone = this.state.board;
      if(!this.state.blackTeamsTurn && !this.whitePieces().includes(boardClone[rowInx][colInx])) {
        if(rowInx === this.state.selPceRowInx + 1) {
          if(colInx === this.state.selPceColInx + 1) {
            if(boardClone[rowInx][colInx]) {
              boardClone[this.state.selPceRowInx][colInx - 1] = null;
            }
          }
          if(colInx === this.state.selPceColInx - 1) {
            if(boardClone[rowInx][colInx]) {
              boardClone[this.state.selPceRowInx][colInx + 1] = null;
            }
          }
        }
      }
      return boardClone;
    }
  
    removeOldBishop(rowInx, colInx) {
      let boardClone = this.state.board;
      if(this.state.selPce === '♗') {
        if(!this.state.blackTeamsTurn && !this.whitePieces().includes(boardClone[rowInx][colInx])) {
          if(colInx === this.state.selPceColInx - (rowInx - this.state.selPceRowInx)) {
            if(rowInx < this.state.selPceRowInx) {
              if(this.checkNorthEastPath(rowInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
            if(rowInx > this.state.selPceRowInx) {
              if(this.checkSouthWestPath(rowInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
          }
          if(colInx === this.state.selPceColInx + (rowInx - this.state.selPceRowInx)) {
            if(rowInx < this.state.selPceRowInx) {
              if(this.checkNorthWestPath(rowInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
            if(rowInx > this.state.selPceRowInx) {
              if(this.checkSouthEastPath(rowInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
          }
        }
      }
      if(this.state.selPce === '♝') {
        if(this.state.blackTeamsTurn && !this.blackPieces().includes(boardClone[rowInx][colInx])) {
          if(colInx === this.state.selPceColInx - (rowInx - this.state.selPceRowInx)) {
            if(rowInx < this.state.selPceRowInx) {
              if(this.checkNorthEastPath(rowInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
            if(rowInx > this.state.selPceRowInx) {
              if(this.checkSouthWestPath(rowInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
          }
          if(colInx === this.state.selPceColInx + (rowInx - this.state.selPceRowInx)) {
            if(rowInx < this.state.selPceRowInx) {
              if(this.checkNorthWestPath(rowInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
            if(rowInx > this.state.selPceRowInx) {
              if(this.checkSouthEastPath(rowInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
          }
        }
      }
      return boardClone;
    }
  
    setBishop(rowInx, colInx) {
      let boardClone = this.state.board;
      if(this.state.selPce === '♗') {
        if(!this.state.blackTeamsTurn && !this.whitePieces().includes(boardClone[rowInx][colInx])) {
          if(colInx === this.state.selPceColInx - (rowInx - this.state.selPceRowInx)) {
            if(rowInx < this.state.selPceRowInx) {
              if(this.checkNorthEastPath(rowInx)) {
                boardClone[rowInx][colInx] = '♗';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
            if(rowInx > this.state.selPceRowInx) {
              if(this.checkSouthWestPath(rowInx)) {
                boardClone[rowInx][colInx] = '♗';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
          }
          if(colInx === this.state.selPceColInx + (rowInx - this.state.selPceRowInx)) {
            if(rowInx < this.state.selPceRowInx) {
              if(this.checkNorthWestPath(rowInx)) {
                boardClone[rowInx][colInx] = '♗';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
            if(rowInx > this.state.selPceRowInx) {
              if(this.checkSouthEastPath(rowInx)) {
                boardClone[rowInx][colInx] = '♗';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
          }
        }
      }
      if(this.state.selPce === '♝') {
        if(this.state.blackTeamsTurn && !this.blackPieces().includes(boardClone[rowInx][colInx])) {
          if(colInx === this.state.selPceColInx - (rowInx - this.state.selPceRowInx)) {
            if(rowInx < this.state.selPceRowInx) {
              if(this.checkNorthEastPath(rowInx)) {
                boardClone[rowInx][colInx] = '♝';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
            if(rowInx > this.state.selPceRowInx) {
              if(this.checkSouthWestPath(rowInx)) {
                boardClone[rowInx][colInx] = '♝';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
          }
          if(colInx === this.state.selPceColInx + (rowInx - this.state.selPceRowInx)) {
            if(rowInx < this.state.selPceRowInx) {
              if(this.checkNorthWestPath(rowInx)) {
                boardClone[rowInx][colInx] = '♝';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
            if(rowInx > this.state.selPceRowInx) {
              if(this.checkSouthEastPath(rowInx)) {
                boardClone[rowInx][colInx] = '♝';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
          }
        }
      }
      return boardClone;
    }
  
    removeOldQueen(rowInx, colInx) {
      let boardClone = this.state.board;
      if(this.state.selPce === '♛') {
        if(this.state.blackTeamsTurn && !this.blackPieces().includes(boardClone[rowInx][colInx])) {
          if(colInx === this.state.selPceColInx - (rowInx - this.state.selPceRowInx)) {
            if(rowInx < this.state.selPceRowInx) {
              if(this.checkNorthEastPath(rowInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
            if(rowInx > this.state.selPceRowInx) {
              if(this.checkSouthWestPath(rowInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
          }
          if(colInx === this.state.selPceColInx + (rowInx - this.state.selPceRowInx)) {
            if(rowInx < this.state.selPceRowInx) {
              if(this.checkNorthWestPath(rowInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
            if(rowInx > this.state.selPceRowInx) {
              if(this.checkSouthEastPath(rowInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
          }
          if(rowInx === this.state.selPceRowInx) {
            if(colInx < this.state.selPceColInx) {
              if(this.checkWestPath(colInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
            if(colInx > this.state.selPceColInx) {
              if(this.checkEastPath(colInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
          }
          if(colInx === this.state.selPceColInx) {
            if(rowInx < this.state.selPceRowInx) {
              if(this.checkNorthPath(rowInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
            if(rowInx > this.state.selPceRowInx) {
              if(this.checkSouthPath(rowInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
          }
        }
      }
      if(this.state.selPce === '♕') {
        if(!this.state.blackTeamsTurn && !this.whitePieces().includes(boardClone[rowInx][colInx])) {
          if(colInx === this.state.selPceColInx - (rowInx - this.state.selPceRowInx)) {
            if(rowInx < this.state.selPceRowInx) {
              if(this.checkNorthEastPath(rowInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
            if(rowInx > this.state.selPceRowInx) {
              if(this.checkSouthWestPath(rowInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
          }
          if(colInx === this.state.selPceColInx + (rowInx - this.state.selPceRowInx)) {
            if(rowInx < this.state.selPceRowInx) {
              if(this.checkNorthWestPath(rowInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
            if(rowInx > this.state.selPceRowInx) {
              if(this.checkSouthEastPath(rowInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
          }
          if(rowInx === this.state.selPceRowInx) {
            if(colInx < this.state.selPceColInx) {
              if(this.checkWestPath(colInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
            if(colInx > this.state.selPceColInx) {
              if(this.checkEastPath(colInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
          }
          if(colInx === this.state.selPceColInx) {
            if(rowInx < this.state.selPceRowInx) {
              if(this.checkNorthPath(rowInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
            if(rowInx > this.state.selPceRowInx) {
              if(this.checkSouthPath(rowInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
          }
        }
      }
      return boardClone;
    }
  
    setQueen(rowInx, colInx) {
      let boardClone = this.state.board;
      if(this.state.selPce === '♛') {
        if(this.state.blackTeamsTurn && !this.blackPieces().includes(boardClone[rowInx][colInx])) {
          if(colInx === this.state.selPceColInx - (rowInx - this.state.selPceRowInx)) {
            if(rowInx < this.state.selPceRowInx) {
              if(this.checkNorthEastPath(rowInx)) {
                boardClone[rowInx][colInx] = '♛';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
            if(rowInx > this.state.selPceRowInx) {
              if(this.checkSouthWestPath(rowInx)) {
                boardClone[rowInx][colInx] = '♛';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
          }
          if(colInx === this.state.selPceColInx + (rowInx - this.state.selPceRowInx)) {
            if(rowInx < this.state.selPceRowInx) {
              if(this.checkNorthWestPath(rowInx)) {
                boardClone[rowInx][colInx] = '♛';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
            if(rowInx > this.state.selPceRowInx) {
              if(this.checkSouthEastPath(rowInx)) {
                boardClone[rowInx][colInx] = '♛';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
          }
          if(rowInx === this.state.selPceRowInx) {
            if(colInx < this.state.selPceColInx) {
              if(this.checkWestPath(colInx)) {
                boardClone[rowInx][colInx] = '♛';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
            if(colInx > this.state.selPceColInx) {
              if(this.checkEastPath(colInx)) {
                boardClone[rowInx][colInx] = '♛';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
          }
          if(colInx === this.state.selPceColInx) {
            if(rowInx < this.state.selPceRowInx) {
              if(this.checkNorthPath(rowInx)) {
                boardClone[rowInx][colInx] = '♛';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
            if(rowInx > this.state.selPceRowInx) {
              if(this.checkSouthPath(rowInx)) {
                boardClone[rowInx][colInx] = '♛';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
          }
        }
      }
      if(this.state.selPce === '♕') {
        if(!this.state.blackTeamsTurn && !this.whitePieces().includes(boardClone[rowInx][colInx])) {
          if(colInx === this.state.selPceColInx - (rowInx - this.state.selPceRowInx)) {
            if(rowInx < this.state.selPceRowInx) {
              if(this.checkNorthEastPath(rowInx)) {
                boardClone[rowInx][colInx] = '♕';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
            if(rowInx > this.state.selPceRowInx) {
              if(this.checkSouthWestPath(rowInx)) {
                boardClone[rowInx][colInx] = '♕';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
          }
          if(colInx === this.state.selPceColInx + (rowInx - this.state.selPceRowInx)) {
            if(rowInx < this.state.selPceRowInx) {
              if(this.checkNorthWestPath(rowInx)) {
                boardClone[rowInx][colInx] = '♕';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
            if(rowInx > this.state.selPceRowInx) {
              if(this.checkSouthEastPath(rowInx)) {
                boardClone[rowInx][colInx] = '♕';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
          }
          if(rowInx === this.state.selPceRowInx) {
            if(colInx < this.state.selPceColInx) {
              if(this.checkWestPath(colInx)) {
                boardClone[rowInx][colInx] = '♕';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
            if(colInx > this.state.selPceColInx) {
              if(this.checkEastPath(colInx)) {
                boardClone[rowInx][colInx] = '♕';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
          }
          if(colInx === this.state.selPceColInx) {
            if(rowInx < this.state.selPceRowInx) {
              if(this.checkNorthPath(rowInx)) {
                boardClone[rowInx][colInx] = '♕';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
            if(rowInx > this.state.selPceRowInx) {
              if(this.checkSouthPath(rowInx)) {
                boardClone[rowInx][colInx] = '♕';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
          }
        }
      }
      return boardClone;
    }
  
    removeOldKnight(rowInx, colInx) {
      let boardClone = this.state.board;
        if(this.state.selPce === '♘') {
          if(!this.state.blackTeamsTurn && !this.whitePieces().includes(boardClone[rowInx][colInx])) {
            if(colInx === this.state.selPceColInx - 1 || colInx === this.state.selPceColInx + 1) {
              if(rowInx === this.state.selPceRowInx - 2 || rowInx === this.state.selPceRowInx + 2) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
            if(colInx === this.state.selPceColInx - 2 || colInx === this.state.selPceColInx + 2) {
              if(rowInx === this.state.selPceRowInx - 1 || rowInx === this.state.selPceRowInx + 1) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
          }
        }
        if(this.state.selPce === '♞') {
          if(this.state.blackTeamsTurn && !this.blackPieces().includes(boardClone[rowInx][colInx])) {
            if(colInx === this.state.selPceColInx - 1 || colInx === this.state.selPceColInx + 1) {
              if(rowInx === this.state.selPceRowInx - 2 || rowInx === this.state.selPceRowInx + 2) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
            if(colInx === this.state.selPceColInx - 2 || colInx === this.state.selPceColInx + 2) {
              if(rowInx === this.state.selPceRowInx - 1 || rowInx === this.state.selPceRowInx + 1) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
          }
        }
      return boardClone;
    }
  
    setKnight(rowInx, colInx) {
      let boardClone = this.state.board;
      if(this.state.selPce === '♘') {
        if(!this.state.blackTeamsTurn && !this.whitePieces().includes(boardClone[rowInx][colInx])) {
          if(colInx === this.state.selPceColInx - 1 || colInx === this.state.selPceColInx + 1) {
            if(rowInx === this.state.selPceRowInx - 2 || rowInx === this.state.selPceRowInx + 2) {
              boardClone[rowInx][colInx] = '♘';
              this.setState({
                blackTeamsTurn: !this.state.blackTeamsTurn
              });
            }
          } 
          if(colInx === this.state.selPceColInx - 2 || colInx === this.state.selPceColInx + 2) {
            if(rowInx === this.state.selPceRowInx - 1 || rowInx === this.state.selPceRowInx + 1) {
              boardClone[rowInx][colInx] = '♘';
              this.setState({
                blackTeamsTurn: !this.state.blackTeamsTurn
              });
            }
          }
        }
      }
      if(this.state.selPce === '♞') {
        if(this.state.blackTeamsTurn && !this.blackPieces().includes(boardClone[rowInx][colInx])) {
          if(colInx === this.state.selPceColInx - 1 || colInx === this.state.selPceColInx + 1) {
            if(rowInx === this.state.selPceRowInx - 2 || rowInx === this.state.selPceRowInx + 2) {
              boardClone[rowInx][colInx] = '♞';
              this.setState({
                blackTeamsTurn: !this.state.blackTeamsTurn
              });
            }
          } 
          if(colInx === this.state.selPceColInx - 2 || colInx === this.state.selPceColInx + 2) {
            if(rowInx === this.state.selPceRowInx - 1 || rowInx === this.state.selPceRowInx + 1) {
              boardClone[rowInx][colInx] = '♞';
              this.setState({
                blackTeamsTurn: !this.state.blackTeamsTurn
              });
            }
          }
        }
      }
      return boardClone;
    }
  
    removeOldKing(rowInx, colInx) {
      let boardClone = this.state.board;
      if(this.state.selPce === '♔') {
        if(!this.state.blackTeamsTurn && !this.whitePieces().includes(boardClone[rowInx][colInx])) {
          if(rowInx === this.state.selPceRowInx - 1 || rowInx === this.state.selPceRowInx + 1 || rowInx === this.state.selPceRowInx) {
            if(colInx === this.state.selPceColInx - 1 || colInx === this.state.selPceColInx + 1 || colInx === this.state.selPceColInx) {
              boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
            }
          }
        }
      }
      if(this.state.selPce === '♚') {
        if(this.state.blackTeamsTurn && !this.blackPieces().includes(boardClone[rowInx][colInx])) {
          if(rowInx === this.state.selPceRowInx - 1 || rowInx === this.state.selPceRowInx + 1 || rowInx === this.state.selPceRowInx) {
            if(colInx === this.state.selPceColInx - 1 || colInx === this.state.selPceColInx + 1 || colInx === this.state.selPceColInx) {
              boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
            }
          }
        }
      }
      return boardClone;
    }
  
    setKing(rowInx, colInx) {
      let boardClone = this.state.board;
      if(this.state.selPce === '♔') {
        if(!this.state.blackTeamsTurn && !this.whitePieces().includes(boardClone[rowInx][colInx])) {
          if(rowInx === this.state.selPceRowInx - 1 || rowInx === this.state.selPceRowInx + 1 || rowInx === this.state.selPceRowInx) {
            if(colInx === this.state.selPceColInx - 1 || colInx === this.state.selPceColInx + 1 || colInx === this.state.selPceColInx) {
              boardClone[rowInx][colInx] = '♔';
              this.setState({
                blackTeamsTurn: !this.state.blackTeamsTurn
              });
            }
          }
        }
      }
      if(this.state.selPce === '♚') {
        if(this.state.blackTeamsTurn && !this.blackPieces().includes(boardClone[rowInx][colInx])) {
          if(rowInx === this.state.selPceRowInx - 1 || rowInx === this.state.selPceRowInx + 1 || rowInx === this.state.selPceRowInx) {
            if(colInx === this.state.selPceColInx - 1 || colInx === this.state.selPceColInx + 1 || colInx === this.state.selPceColInx) {
              boardClone[rowInx][colInx] = '♚';
              this.setState({
                blackTeamsTurn: !this.state.blackTeamsTurn
              });
            }
          }
        }
      }
      return boardClone;
    }
  
    removeOldRook(rowInx, colInx) {
      let boardClone = this.state.board;
      if(this.state.selPce === '♖') {
        if(!this.state.blackTeamsTurn && !this.whitePieces().includes(boardClone[rowInx][colInx])) {
          if(rowInx === this.state.selPceRowInx) {
            if(colInx < this.state.selPceColInx) {
              if(this.checkWestPath(colInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
            if(colInx > this.state.selPceColInx) {
              if(this.checkEastPath(colInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
          }
          if(colInx === this.state.selPceColInx) {
            if(rowInx < this.state.selPceRowInx) {
              if(this.checkNorthPath(rowInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
            if(rowInx > this.state.selPceRowInx) {
              if(this.checkSouthPath(rowInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
          }
        }
      }
      if(this.state.selPce === '♜') {
        if(this.state.blackTeamsTurn && !this.blackPieces().includes(boardClone[rowInx][colInx])) {
          if(rowInx === this.state.selPceRowInx) {
            if(colInx < this.state.selPceColInx) {
              if(this.checkWestPath(colInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
            if(colInx > this.state.selPceColInx) {
              if(this.checkEastPath(colInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
          }
          if(colInx === this.state.selPceColInx) {
            if(rowInx < this.state.selPceRowInx) {
              if(this.checkNorthPath(rowInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
            if(rowInx > this.state.selPceRowInx) {
              if(this.checkSouthPath(rowInx)) {
                boardClone[this.state.selPceRowInx][this.state.selPceColInx] = null;
              }
            }
          }
        }
      }
      return boardClone;
    }
  
    setRook(rowInx, colInx) {
      let boardClone = this.state.board;
      if(this.state.selPce === '♖') {
        if(!this.state.blackTeamsTurn && !this.whitePieces().includes(boardClone[rowInx][colInx])) {
          if(rowInx === this.state.selPceRowInx) {
            if(colInx < this.state.selPceColInx) {
              if(this.checkWestPath(colInx)) {
                boardClone[rowInx][colInx] = '♖';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
            if(colInx > this.state.selPceColInx) {
              if(this.checkEastPath(colInx)) {
                boardClone[rowInx][colInx] = '♖';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
          }
          if(colInx === this.state.selPceColInx) {
            if(rowInx < this.state.selPceRowInx) {
              if(this.checkNorthPath(rowInx)) {
                boardClone[rowInx][colInx] = '♖';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
            if(rowInx > this.state.selPceRowInx) {
              if(this.checkSouthPath(rowInx)) {
                boardClone[rowInx][colInx] = '♖';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
          }
        }
      }
      if(this.state.selPce === '♜') {
        if(this.state.blackTeamsTurn && !this.blackPieces().includes(boardClone[rowInx][colInx])) {
          if(rowInx === this.state.selPceRowInx) {
            if(colInx < this.state.selPceColInx) {
              if(this.checkWestPath(colInx)) {
                boardClone[rowInx][colInx] = '♜';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
            if(colInx > this.state.selPceColInx) {
              if(this.checkEastPath(colInx)) {
                boardClone[rowInx][colInx] = '♜';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
          }
          if(colInx === this.state.selPceColInx) {
            if(rowInx < this.state.selPceRowInx) {
              if(this.checkNorthPath(rowInx)) {
                boardClone[rowInx][colInx] = '♜';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
            if(rowInx > this.state.selPceRowInx) {
              if(this.checkSouthPath(rowInx)) {
                boardClone[rowInx][colInx] = '♜';
                this.setState({
                  blackTeamsTurn: !this.state.blackTeamsTurn
                });
              }
            }
          }
        }
      }
      return boardClone;
    }
  
    movePiece(rowInx, colInx) {
      if(this.state.blackTeamWon === null) {
        if(!this.state.board[7].includes('♙') && !this.state.board[0].includes('♟')) {
          let boardClone = this.state.board;
          this.selectPiece(rowInx, colInx);
          this.setState({
            selPceRowInx: rowInx,
            selPceColInx: colInx
          });
          if(this.state.selPce === '♟') {
            boardClone = this.removeOldBlackPawn(rowInx, colInx);
            boardClone = this.setBlackPawn(rowInx, colInx);
            boardClone = this.removeOldBlackPawnForOvertakingPiece(rowInx, colInx);
            boardClone = this.blackPawnOvertakePiece(rowInx, colInx);
          }
          if(this.state.selPce === '♙') {
            boardClone = this.removeOldWhitePawn(rowInx, colInx);
            boardClone = this.setWhitePawn(rowInx, colInx);
            boardClone = this.removeOldWhitePawnForOvertakingPiece(rowInx, colInx);
            boardClone = this.whitePawnOvertakePiece(rowInx, colInx);
          }
          if(this.state.selPce === '♝' || this.state.selPce === '♗') {
            boardClone = this.removeOldBishop(rowInx, colInx);
            boardClone = this.setBishop(rowInx, colInx);
          }
          if(this.state.selPce === '♛' || this.state.selPce === '♕') {
            boardClone = this.removeOldQueen(rowInx, colInx);
            boardClone = this.setQueen(rowInx, colInx);
          }
          if(this.state.selPce === '♘' || this.state.selPce === '♞') {
            boardClone = this.removeOldKnight(rowInx, colInx);
            boardClone = this.setKnight(rowInx, colInx);
          }
          if(this.state.selPce === '♔' || this.state.selPce === '♚') {
            boardClone = this.removeOldKing(rowInx, colInx);
            boardClone = this.setKing(rowInx, colInx);
          }
          if(this.state.selPce === '♖' || this.state.selPce === '♜') {
            boardClone = this.removeOldRook(rowInx, colInx);
            boardClone = this.setRook(rowInx, colInx);
          }
          this.setState({ board: boardClone });
        }
      }
      this.gameIsOver(this.state.board);
    }
  
    // I plan on updating this function to detect checkmates at a later time
    gameIsOver(board) {
      let allPieces = [];
      for(let row = 0; row <= 7; row++) {
        for(let col = 0; col <= 7; col++) {
          allPieces.push(board[row][col]);
        }
      }
      if(allPieces.includes('♔')) {
        if(!allPieces.includes('♚')) {
          this.setState({
            blackTeamWon: false
          });
        }
      }
      if(allPieces.includes('♚')) {
        if(!allPieces.includes('♔')) {
          this.setState({
            blackTeamWon: true
          });
        }
      }
    }
  
    promoteToWhiteRook(rowInx, colInx) {
      let boardClone = this.state.board;
      boardClone[rowInx][colInx] = '♖';
      this.setState({
        board: boardClone
      });
    }
  
    promoteToWhiteBishop(rowInx, colInx) {
      let boardClone = this.state.board;
      boardClone[rowInx][colInx] = '♗';
      this.setState({
        board: boardClone
      });
    }
  
    promoteToWhiteKnight(rowInx, colInx) {
      let boardClone = this.state.board;
      boardClone[rowInx][colInx] = '♘';
      this.setState({
        board: boardClone
      });
    }
  
    promoteToWhiteQueen(rowInx, colInx) {
      let boardClone = this.state.board;
      boardClone[rowInx][colInx] = '♕';
      this.setState({
        board: boardClone
      });
    }
  
    promoteToBlackRook(rowInx, colInx) {
      let boardClone = this.state.board;
      boardClone[rowInx][colInx] = '♜';
      this.setState({
        board: boardClone
      });
    }
  
    promoteToBlackBishop(rowInx, colInx) {
      let boardClone = this.state.board;
      boardClone[rowInx][colInx] = '♝';
      this.setState({
        board: boardClone
      });
    }
  
    promoteToBlackKnight(rowInx, colInx) {
      let boardClone = this.state.board;
      boardClone[rowInx][colInx] = '♞';
      this.setState({
        board: boardClone
      });
    }
  
    promoteToBlackQueen(rowInx, colInx) {
      let boardClone = this.state.board;
      boardClone[rowInx][colInx] = '♛';
      this.setState({
        board: boardClone
      });
    }
  
    renderSquare(rowInx, colInx) {
      return (
        <Square
          value={this.state.board[rowInx][colInx]}
          onClick={() => this.movePiece(rowInx, colInx)}
        />
      );
    }

    renderCurrentTurn(currentTurn) {
      return(
        <CurrentTurn
          value={currentTurn}
        />
      );
    }

    renderSelectedPiece(selPce) {
      return (
        <SelectedPiece
          value={selPce}
        />
      );
    }

    renderWhitePawnPromotion() {
      if(this.state.board[7][this.state.selPceColInx] === '♙') {
        return (
          <div>
            <WhitePawnPromotion
              value={this.state.selPceColInx}
            />
            <PromoteToWhiteRook
              onClick={() => this.promoteToWhiteRook(7, this.state.selPceColInx)}
            />
            <PromoteToWhiteBishop
              onClick={() => this.promoteToWhiteBishop(7, this.state.selPceColInx)}
            />
            <PromoteToWhiteknight
              onClick={() => this.promoteToWhiteKnight(7, this.state.selPceColInx)}
            />
            <PromoteToWhiteQueen
              onClick={() => this.promoteToWhiteQueen(7, this.state.selPceColInx)}
            />
          </div>
        );
      }
    }

    renderBlackPawnPromotion() {
      if(this.state.board[0][this.state.selPceColInx] === '♟') {
        return(
          <div>
            <BlackPawnPromotion
              value={this.state.selPceColInx}
            />
            <PromoteToBlackRook
              onClick={() => this.promoteToBlackRook(0, this.state.selPceColInx)}
            />
            <PromoteToBlackBishop
              onClick={() => this.promoteToBlackBishop(0, this.state.selPceColInx)}
            />
            <PromoteToBlackKnight
              onClick={() => this.promoteToBlackKnight(0, this.state.selPceColInx)}
            />
            <PromoteToBlackQueen
              onClick={() => this.promoteToBlackQueen(0, this.state.selPceColInx)}
            />
          </div>
        );
      }
    }

    render() {
        return (
          <div>
    
          {this.renderCurrentTurn(this.state.blackTeamsTurn)}
          {this.renderSelectedPiece(this.state.selPce)}
          {this.renderWhitePawnPromotion()}
          {this.renderBlackPawnPromotion()}

            <div className="board-row">
              {this.renderSquare(0, 0)}
              {this.renderSquare(0, 1)}
              {this.renderSquare(0, 2)}
              {this.renderSquare(0, 3)}
              {this.renderSquare(0, 4)}
              {this.renderSquare(0, 5)}
              {this.renderSquare(0, 6)}
              {this.renderSquare(0, 7)}
            </div>
    
            <div className="board-row">
              {this.renderSquare(1, 0)}
              {this.renderSquare(1, 1)}
              {this.renderSquare(1, 2)}
              {this.renderSquare(1, 3)}
              {this.renderSquare(1, 4)}
              {this.renderSquare(1, 5)}
              {this.renderSquare(1, 6)}
              {this.renderSquare(1, 7)}
            </div>
    
            <div className="board-row">
              {this.renderSquare(2, 0)}
              {this.renderSquare(2, 1)}
              {this.renderSquare(2, 2)}
              {this.renderSquare(2, 3)}
              {this.renderSquare(2, 4)}
              {this.renderSquare(2, 5)}
              {this.renderSquare(2, 6)}
              {this.renderSquare(2, 7)}
            </div>
    
            <div className="board-row">
              {this.renderSquare(3, 0)}
              {this.renderSquare(3, 1)}
              {this.renderSquare(3, 2)}
              {this.renderSquare(3, 3)}
              {this.renderSquare(3, 4)}
              {this.renderSquare(3, 5)}
              {this.renderSquare(3, 6)}
              {this.renderSquare(3, 7)}
            </div>
    
            <div className="board-row">
              {this.renderSquare(4, 0)}
              {this.renderSquare(4, 1)}
              {this.renderSquare(4, 2)}
              {this.renderSquare(4, 3)}
              {this.renderSquare(4, 4)}
              {this.renderSquare(4, 5)}
              {this.renderSquare(4, 6)}
              {this.renderSquare(4, 7)}
            </div>
    
            <div className="board-row">
              {this.renderSquare(5, 0)}
              {this.renderSquare(5, 1)}
              {this.renderSquare(5, 2)}
              {this.renderSquare(5, 3)}
              {this.renderSquare(5, 4)}
              {this.renderSquare(5, 5)}
              {this.renderSquare(5, 6)}
              {this.renderSquare(5, 7)}
            </div>
    
            <div className="board-row">
              {this.renderSquare(6, 0)}
              {this.renderSquare(6, 1)}
              {this.renderSquare(6, 2)}
              {this.renderSquare(6, 3)}
              {this.renderSquare(6, 4)}
              {this.renderSquare(6, 5)}
              {this.renderSquare(6, 6)}
              {this.renderSquare(6, 7)}
            </div>
    
            <div className="board-row">
              {this.renderSquare(7, 0)}
              {this.renderSquare(7, 1)}
              {this.renderSquare(7, 2)}
              {this.renderSquare(7, 3)}
              {this.renderSquare(7, 4)}
              {this.renderSquare(7, 5)}
              {this.renderSquare(7, 6)}
              {this.renderSquare(7, 7)}
            </div>
          </div>
        );
      }
    
    }
