class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      board: [
        ['♖', '♘', '♗', '♔', '♕', '♗', '♘', '♖'],
        ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
        ['♜', '♞', '♝', '♚', '♛', '♝', '♞', '♜']
      ],
      blackTeamsTurn: false,
      blackTeamWon: null,
      selPce: null,
      selPceRowInx: null,
      selPceColInx: null,
      history: [],
      player_1: null,
      player_2: null
    }
  }

  selectPiece(rowInx, colInx) {
    let pieceIsAlreadySelected = false;
    if(this.state.selPce) {
      pieceIsAlreadySelected = true;
    }
    if(!this.state.blackTeamsTurn && this.props.player === 'player_1') {
    //if(!this.state.blackTeamsTurn) {
      if(this.whitePieces().includes(this.state.board[rowInx][colInx])) {
        this.setState({
          selPce: this.state.board[rowInx][colInx]
        });
      }
    }
    if(this.state.blackTeamsTurn && this.props.player === 'player_2') {
    //if(this.state.blackTeamsTurn) {
      if(this.blackPieces().includes(this.state.board[rowInx][colInx])) {
        this.setState({
          selPce: this.state.board[rowInx][colInx]
        });
      }
    }
    if(!this.state.blackTeamsTurn || this.state.blackTeamsTurn) {
      if(this.state.board[rowInx][colInx] === '') {
        this.setState({
          selPce: this.state.board[rowInx][colInx]
        });
      }
    }
    if(pieceIsAlreadySelected && this.state.board[rowInx][colInx]) {
      this.setState({ selPce: null });
    }
  }

  setPiece(rowInx, colInx) {
    let boardClone = this.state.board;
    boardClone[rowInx][colInx] = this.state.selPce;
    let updatedHistory = this.state.history;
    updatedHistory.push(this.state.board);
    this.setState({
      selPce: null,
      history: updatedHistory,
      blackTeamsTurn: !this.state.blackTeamsTurn
    });
    return boardClone;
  }

  removePiece(selPceRowInx, selPceColInx) {
    let boardClone = this.state.board;
    boardClone[selPceRowInx][selPceColInx] = '';
    return boardClone;
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

  moveDiagonally(rowInx, colInx) {
    if(colInx === this.state.selPceColInx - (rowInx - this.state.selPceRowInx)) {
      if(rowInx < this.state.selPceRowInx) {
        if(this.checkNorthEastPath(rowInx)) {
          this.setPiece(rowInx, colInx);
          this.removePiece(this.state.selPceRowInx, this.state.selPceColInx);
          this.updateGameToDataBase();
        }
      }
      if(rowInx > this.state.selPceRowInx) {
        if(this.checkSouthWestPath(rowInx)) {
          this.setPiece(rowInx, colInx);
          this.removePiece(this.state.selPceRowInx, this.state.selPceColInx);
          this.updateGameToDataBase();
        }
      }
    }
    if(colInx === this.state.selPceColInx + (rowInx - this.state.selPceRowInx)) {
      if(rowInx < this.state.selPceRowInx) {
        if(this.checkNorthWestPath(rowInx)) {
          this.setPiece(rowInx, colInx);
          this.removePiece(this.state.selPceRowInx, this.state.selPceColInx);
          this.updateGameToDataBase();
        }
      }
      if(rowInx > this.state.selPceRowInx) {
        if(this.checkSouthEastPath(rowInx)) {
          this.setPiece(rowInx, colInx);
          this.removePiece(this.state.selPceRowInx, this.state.selPceColInx);
          this.updateGameToDataBase();
        }
      }
    }
  }

  moveNorthSouthEastWest(rowInx, colInx) {
    if(colInx === this.state.selPceColInx) {
      if(rowInx < this.state.selPceRowInx) {
        if(this.checkNorthPath(rowInx)) {
          this.setPiece(rowInx, colInx);
          this.removePiece(this.state.selPceRowInx, this.state.selPceColInx);
          this.updateGameToDataBase();
        }
      }
    }
    if(colInx === this.state.selPceColInx) {
      if(rowInx > this.state.selPceRowInx) {
        if(this.checkSouthPath(rowInx)) {
          this.setPiece(rowInx, colInx);
          this.removePiece(this.state.selPceRowInx, this.state.selPceColInx);
          this.updateGameToDataBase();
        }
      }
    }
    if(rowInx === this.state.selPceRowInx) {
      if(colInx > this.state.selPceColInx) {
        if(this.checkEastPath(colInx)) {
          this.setPiece(rowInx, colInx);
          this.removePiece(this.state.selPceRowInx, this.state.selPceColInx);
          this.updateGameToDataBase();
        }
      }
    }
    if(rowInx === this.state.selPceRowInx) {
      if(colInx < this.state.selPceColInx) {
        if(this.checkWestPath(colInx)) {
          this.setPiece(rowInx, colInx);
          this.removePiece(this.state.selPceRowInx, this.state.selPceColInx);
          this.updateGameToDataBase();
        }
      }
    }
  }

  legalMoveForWhitePiece(piece, tileToBeOccupied) {
    if(this.props.player === 'player_1') {
      if(this.whitePieces().includes(piece) && !this.state.blackTeamsTurn) {
        if(!this.whitePieces().includes(tileToBeOccupied)) {
          return true;
        }
      }
    }
    return false;
  }

  legalMoveForBlackPiece(piece, tileToBeOccupied) {
    if(this.props.player === 'player_2') {
      if(this.blackPieces().includes(piece) && this.state.blackTeamsTurn) {
        if(!this.blackPieces().includes(tileToBeOccupied)) {
          return true;
        }
      }
    }
    return false;
  }

  blackPieces() {
    return ['♟', '♝', '♛', '♞', '♚', '♜'];
  }

  whitePieces() {
    return ['♙', '♗', '♕', '♘', '♔', '♖'];
  }

  movementLogicForBlackPawns(rowInx, colInx) {
    let boardClone = this.state.board;
    if(this.state.selPceRowInx === 6 && !this.state.board[5][colInx] && !this.state.board[4][colInx]) {
      if(rowInx === 4 && colInx === this.state.selPceColInx) {
        this.setPiece(rowInx, colInx);
        this.removePiece(this.state.selPceRowInx, this.state.selPceColInx);
        this.updateGameToDataBase();
      }
    } 
    if(rowInx === this.state.selPceRowInx - 1 && colInx === this.state.selPceColInx) {
      if(!boardClone[rowInx][colInx]) {
        this.setPiece(rowInx, colInx);
        this.removePiece(this.state.selPceRowInx, this.state.selPceColInx);
        this.updateGameToDataBase();
      }
    }
    if(rowInx === this.state.selPceRowInx - 1) {
      if(colInx === this.state.selPceColInx - 1 || colInx === this.state.selPceColInx + 1) {
        if(this.whitePieces().includes(boardClone[rowInx][colInx])) {
          this.setPiece(rowInx, colInx);
          this.removePiece(this.state.selPceRowInx, this.state.selPceColInx);
          this.updateGameToDataBase();
        }
      }
    }
    return boardClone;
  }

  movementLogicForWhitePawns(rowInx, colInx) {
    let boardClone = this.state.board;
    if(this.state.selPceRowInx === 1 && !this.state.board[2][colInx] && !this.state.board[3][colInx]) {
      if(rowInx === 3 && colInx === this.state.selPceColInx) {
        this.setPiece(rowInx, colInx);
        this.removePiece(this.state.selPceRowInx, this.state.selPceColInx);
        this.updateGameToDataBase();
      }
    } 
    if(rowInx === this.state.selPceRowInx + 1 && colInx === this.state.selPceColInx) {
      if(!boardClone[rowInx][colInx]) {
        this.setPiece(rowInx, colInx);
        this.removePiece(this.state.selPceRowInx, this.state.selPceColInx);
        this.updateGameToDataBase();
      }
    }
    if(rowInx === this.state.selPceRowInx + 1) {
      if(colInx === this.state.selPceColInx - 1 || colInx === this.state.selPceColInx + 1) {
        if(this.blackPieces().includes(boardClone[rowInx][colInx])) {
          this.setPiece(rowInx, colInx);
          this.removePiece(this.state.selPceRowInx, this.state.selPceColInx);
          this.updateGameToDataBase();
        }
      }
    }
    return boardClone;
  }

  movementLogicForKnights(rowInx, colInx) {
    let boardClone = this.state.board;
    if(colInx === this.state.selPceColInx - 1 || colInx === this.state.selPceColInx + 1) {
      if(rowInx === this.state.selPceRowInx - 2 || rowInx === this.state.selPceRowInx + 2) {
        this.setPiece(rowInx, colInx);
        this.removePiece(this.state.selPceRowInx, this.state.selPceColInx);
        this.updateGameToDataBase();
      }
    } 
    if(colInx === this.state.selPceColInx - 2 || colInx === this.state.selPceColInx + 2) {
      if(rowInx === this.state.selPceRowInx - 1 || rowInx === this.state.selPceRowInx + 1) {
        this.setPiece(rowInx, colInx);
        this.removePiece(this.state.selPceRowInx, this.state.selPceColInx);
        this.updateGameToDataBase();
      }
    }
    return boardClone;
  }

  movementLogicForKings(rowInx, colInx) {
    let boardClone = this.state.board;
    if(rowInx === this.state.selPceRowInx - 1 || rowInx === this.state.selPceRowInx + 1 || rowInx === this.state.selPceRowInx) {
      if(colInx === this.state.selPceColInx - 1 || colInx === this.state.selPceColInx + 1 || colInx === this.state.selPceColInx) {
        this.setPiece(rowInx, colInx);
        this.removePiece(this.state.selPceRowInx, this.state.selPceColInx);
        this.updateGameToDataBase();
      }
    }
    return boardClone;
  }

  moveBlackPawn(rowInx, colInx) {
    let boardClone = this.state.board;
    if(this.legalMoveForBlackPiece(this.state.selPce, boardClone[rowInx][colInx])) {
      this.movementLogicForBlackPawns(rowInx, colInx);
    }
    return boardClone;
  }

  moveWhitePawn(rowInx, colInx) {
    let boardClone = this.state.board;
    if(this.legalMoveForWhitePiece(this.state.selPce, boardClone[rowInx][colInx])) {
      this.movementLogicForWhitePawns(rowInx, colInx);
    }
    return boardClone;
  }

  moveKnight(rowInx, colInx) {
    let boardClone = this.state.board;
    if(this.legalMoveForWhitePiece(this.state.selPce, boardClone[rowInx][colInx])) {
      this.movementLogicForKnights(rowInx, colInx);
    }
    if(this.legalMoveForBlackPiece(this.state.selPce, boardClone[rowInx][colInx])) {
      this.movementLogicForKnights(rowInx, colInx);
    }
    return boardClone;
  }

  moveKing(rowInx, colInx) {
    let boardClone = this.state.board;
    if(this.legalMoveForWhitePiece(this.state.selPce, boardClone[rowInx][colInx])) {
      this.movementLogicForKings(rowInx, colInx);
    }
    if(this.legalMoveForBlackPiece(this.state.selPce, boardClone[rowInx][colInx])) {
      this.movementLogicForKings(rowInx, colInx);
    }
    return boardClone;
  }

  moveQueen(rowInx, colInx) {
    let boardClone = this.state.board;
    if(this.legalMoveForWhitePiece(this.state.selPce, boardClone[rowInx][colInx])) {
      this.moveDiagonally(rowInx, colInx);
      this.moveNorthSouthEastWest(rowInx, colInx);
    }
    if(this.legalMoveForBlackPiece(this.state.selPce, boardClone[rowInx][colInx])) {
      this.moveDiagonally(rowInx, colInx);
      this.moveNorthSouthEastWest(rowInx, colInx);
    }
    return boardClone;
  }

  moveBishop(rowInx, colInx) {
    let boardClone = this.state.board;
    if(this.legalMoveForWhitePiece(this.state.selPce, boardClone[rowInx][colInx])) {
      this.moveDiagonally(rowInx, colInx);
    }
    if(this.legalMoveForBlackPiece(this.state.selPce, boardClone[rowInx][colInx])) {
      this.moveDiagonally(rowInx, colInx);
    }
    return boardClone;
  }

  moveRook(rowInx, colInx) {
    let boardClone = this.state.board;
    if(this.legalMoveForWhitePiece(this.state.selPce, boardClone[rowInx][colInx])) {
      this.moveNorthSouthEastWest(rowInx, colInx);
    }
    if(this.legalMoveForBlackPiece(this.state.selPce, boardClone[rowInx][colInx])) {
      this.moveNorthSouthEastWest(rowInx, colInx);
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
          this.moveBlackPawn(rowInx, colInx);
        }
        if(this.state.selPce === '♙') {
          this.moveWhitePawn(rowInx, colInx);
        }
        if(this.state.selPce === '♝' || this.state.selPce === '♗') {
          this.moveBishop(rowInx, colInx);
        }
        if(this.state.selPce === '♛' || this.state.selPce === '♕') {
          this.moveQueen(rowInx, colInx);
        }
        if(this.state.selPce === '♘' || this.state.selPce === '♞') {
          this.moveKnight(rowInx, colInx);
        }
        if(this.state.selPce === '♔' || this.state.selPce === '♚') {
          this.moveKing(rowInx, colInx);
        }
        if(this.state.selPce === '♖' || this.state.selPce === '♜') {
          this.moveRook(rowInx, colInx);
        }
        this.setState({ board: boardClone });
      }
    }
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
    this.updateGameToDataBase();
  }

  promoteToWhiteBishop(rowInx, colInx) {
    let boardClone = this.state.board;
    boardClone[rowInx][colInx] = '♗';
    this.setState({
      board: boardClone
    });
    this.updateGameToDataBase();
  }

  promoteToWhiteKnight(rowInx, colInx) {
    let boardClone = this.state.board;
    boardClone[rowInx][colInx] = '♘';
    this.setState({
      board: boardClone
    });
    this.updateGameToDataBase();
  }

  promoteToWhiteQueen(rowInx, colInx) {
    let boardClone = this.state.board;
    boardClone[rowInx][colInx] = '♕';
    this.setState({
      board: boardClone
    });
    this.updateGameToDataBase();
  }

  promoteToBlackRook(rowInx, colInx) {
    let boardClone = this.state.board;
    boardClone[rowInx][colInx] = '♜';
    this.setState({
      board: boardClone
    });
    this.updateGameToDataBase();
  }

  promoteToBlackBishop(rowInx, colInx) {
    let boardClone = this.state.board;
    boardClone[rowInx][colInx] = '♝';
    this.setState({
      board: boardClone
    });
    this.updateGameToDataBase();
  }

  promoteToBlackKnight(rowInx, colInx) {
    let boardClone = this.state.board;
    boardClone[rowInx][colInx] = '♞';
    this.setState({
      board: boardClone
    });
    this.updateGameToDataBase();
  }

  promoteToBlackQueen(rowInx, colInx) {
    let boardClone = this.state.board;
    boardClone[rowInx][colInx] = '♛';
    this.setState({
      board: boardClone
    });
    this.updateGameToDataBase();
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

  renderUpperLetterColumnSquare(letter) {
    return(
      <UpperLetterColumnSquare
        value={letter}
      />
    );
  }

  renderLowerLetterColumnSquare(letter) {
    return(
      <LowerLetterColumnSquare
        value={letter}
      />
    );
  }

  renderNumberColumnSquare(number) {
    return(
      <NumberColumnSquare
        value={number}
      />
    );
  }

  renderWinnerStatement(blackTeamWinStatus, player_1, player_2) {
    return(
      <WinnerStatement 
        value={blackTeamWinStatus}
        player_1={player_1}
        player_2={player_2}
      />
    );
  }

  renderWhoVsWho(player_1, player_2) {
    return(
      <WhoVsWho
        player_1={player_1}
        player_2={player_2}
      />
    );
  }

  renderPlayerTeamStatement(player) {
    return(
      <PlayerTeamStatement
        player={player}
      />
    );
  }

  updateGameToDataBase() {
    axios.patch('https://chess-app-rails-andy-strube.herokuapp.com/games/' + this.props.id, {
    //axios.patch('http://localhost:3000/games/' + this.props.id, {
      board: this.state.board
    })
    .catch((err) => console.log(err.response.data) );
  }

  vetUpdatesForGameData(res) {
    if(String(res.data.board) !== String(this.state.history[this.state.history.length - 2])) {
      this.setState({
        board: res.data.board,
        blackTeamsTurn: !this.state.blackTeamsTurn,
        player_1: res.data.player_1,
        player_2: res.data.player_2
      });
      this.gameIsOver(this.state.board);
    }
  }

  vetUpdatesForMoveHistory(res) {
    if(String(this.state.history[this.state.history.length - 1]) !== String(res.data.board)) {
      let updatedHistory = this.state.history;
      updatedHistory.push(res.data.board);
      this.setState({
        history: updatedHistory
      });
    }
  }

  maintainHistoryLength() {
    if(this.state.history.length >= 3) {
      let shortenedtHistory  = this.state.history;
      shortenedtHistory.shift();
      this.setState({
        history: shortenedtHistory
      });
    }
  }

  handleUpdates(res) {
    this.vetUpdatesForGameData(res);
    this.vetUpdatesForMoveHistory(res);
  }

  requestDataFromDataBase() {
    axios.get('https://chess-app-rails-andy-strube.herokuapp.com/games/' + this.props.id)
    //axios.get('http://localhost:3000/games/' + this.props.id)
    .then((res) =>
      this.handleUpdates(res)
    )
  }

  setupBeforeUnloadListener() {
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      this.deleteGameInstance();
    });
  };

  componentDidMount() {
    this.setupBeforeUnloadListener();
    this.interval = setInterval(() => {
      this.requestDataFromDataBase();
      this.maintainHistoryLength();
    }, 1500);
  }

  componentWillMount() {
    this.requestDataFromDataBase();
  }

  deleteGameInstance() {
    axios.delete('https://chess-app-rails-andy-strube.herokuapp.com/games/' + this.props.id)
    //axios.delete('http://localhost:3000/games/' + this.props.id)
    .catch((err) => console.log(err.response.data));
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.deleteGameInstance();
  }

  render() {
    return (
      <div>
        {this.renderWhoVsWho(this.state.player_1, this.state.player_2)}
        {this.renderPlayerTeamStatement(this.props.player)}
        {this.renderWinnerStatement(
          this.state.blackTeamWon,
          this.state.player_1,
          this.state.player_2
        )}
        {this.renderCurrentTurn(this.state.blackTeamsTurn)}
        <br />
        {this.renderSelectedPiece(this.state.selPce)}
        {this.renderWhitePawnPromotion()}
        {this.renderBlackPawnPromotion()}

        <div className="board-row letter-row">
          {this.renderUpperLetterColumnSquare('H')}
          {this.renderUpperLetterColumnSquare('G')}
          {this.renderUpperLetterColumnSquare('F')}
          {this.renderUpperLetterColumnSquare('E')}
          {this.renderUpperLetterColumnSquare('D')}
          {this.renderUpperLetterColumnSquare('C')}
          {this.renderUpperLetterColumnSquare('B')}
          {this.renderUpperLetterColumnSquare('A')}
        </div>

        <div className="board-row">
          {this.renderNumberColumnSquare('1')}
          {this.renderSquare(0, 0)}
          {this.renderSquare(0, 1)}
          {this.renderSquare(0, 2)}
          {this.renderSquare(0, 3)}
          {this.renderSquare(0, 4)}
          {this.renderSquare(0, 5)}
          {this.renderSquare(0, 6)}
          {this.renderSquare(0, 7)}
          {this.renderNumberColumnSquare('1')}
        </div>

        <div className="board-row">
        {this.renderNumberColumnSquare('2')}
          {this.renderSquare(1, 0)}
          {this.renderSquare(1, 1)}
          {this.renderSquare(1, 2)}
          {this.renderSquare(1, 3)}
          {this.renderSquare(1, 4)}
          {this.renderSquare(1, 5)}
          {this.renderSquare(1, 6)}
          {this.renderSquare(1, 7)}
          {this.renderNumberColumnSquare('2')}
        </div>

        <div className="board-row">
        {this.renderNumberColumnSquare('3')}
          {this.renderSquare(2, 0)}
          {this.renderSquare(2, 1)}
          {this.renderSquare(2, 2)}
          {this.renderSquare(2, 3)}
          {this.renderSquare(2, 4)}
          {this.renderSquare(2, 5)}
          {this.renderSquare(2, 6)}
          {this.renderSquare(2, 7)}
          {this.renderNumberColumnSquare('3')}
        </div>

        <div className="board-row">
        {this.renderNumberColumnSquare('4')}
          {this.renderSquare(3, 0)}
          {this.renderSquare(3, 1)}
          {this.renderSquare(3, 2)}
          {this.renderSquare(3, 3)}
          {this.renderSquare(3, 4)}
          {this.renderSquare(3, 5)}
          {this.renderSquare(3, 6)}
          {this.renderSquare(3, 7)}
          {this.renderNumberColumnSquare('4')}
        </div>

        <div className="board-row">
        {this.renderNumberColumnSquare('5')}
          {this.renderSquare(4, 0)}
          {this.renderSquare(4, 1)}
          {this.renderSquare(4, 2)}
          {this.renderSquare(4, 3)}
          {this.renderSquare(4, 4)}
          {this.renderSquare(4, 5)}
          {this.renderSquare(4, 6)}
          {this.renderSquare(4, 7)}
          {this.renderNumberColumnSquare('5')}
        </div>

        <div className="board-row">
        {this.renderNumberColumnSquare('6')}
          {this.renderSquare(5, 0)}
          {this.renderSquare(5, 1)}
          {this.renderSquare(5, 2)}
          {this.renderSquare(5, 3)}
          {this.renderSquare(5, 4)}
          {this.renderSquare(5, 5)}
          {this.renderSquare(5, 6)}
          {this.renderSquare(5, 7)}
          {this.renderNumberColumnSquare('6')}
        </div>

        <div className="board-row">
        {this.renderNumberColumnSquare('7')}
          {this.renderSquare(6, 0)}
          {this.renderSquare(6, 1)}
          {this.renderSquare(6, 2)}
          {this.renderSquare(6, 3)}
          {this.renderSquare(6, 4)}
          {this.renderSquare(6, 5)}
          {this.renderSquare(6, 6)}
          {this.renderSquare(6, 7)}
          {this.renderNumberColumnSquare('7')}
        </div>

        <div className="board-row">
        {this.renderNumberColumnSquare('8')}
          {this.renderSquare(7, 0)}
          {this.renderSquare(7, 1)}
          {this.renderSquare(7, 2)}
          {this.renderSquare(7, 3)}
          {this.renderSquare(7, 4)}
          {this.renderSquare(7, 5)}
          {this.renderSquare(7, 6)}
          {this.renderSquare(7, 7)}
          {this.renderNumberColumnSquare('8')}
        </div>

        <div className="board-row letter-row">
          {this.renderLowerLetterColumnSquare('H')}
          {this.renderLowerLetterColumnSquare('G')}
          {this.renderLowerLetterColumnSquare('F')}
          {this.renderLowerLetterColumnSquare('E')}
          {this.renderLowerLetterColumnSquare('D')}
          {this.renderLowerLetterColumnSquare('C')}
          {this.renderLowerLetterColumnSquare('B')}
          {this.renderLowerLetterColumnSquare('A')}
        </div>
      </div>
    );
  }

}
