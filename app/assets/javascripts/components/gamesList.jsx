class GamesList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      links: []
    }
  }

  componentWillMount() {
    this.getGames();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.getGames();
    }, 3000);
  }

  getGames() {
    axios.get('https://chess-app-rails-andy-strube.herokuapp.com/games')
    //axios.get('http://localhost:3000/games')
    .then((res) =>
      this.linkGenerator(this.urlGenerator(this.dataScanner(res)))
    )
  }

  dataScanner(res) {
    return res.data.map((game) => {
      return [game.id, game.player_1, game.player_2];
    });
  }

  urlGenerator(gameInfo) {
    return gameInfo.map((playersAndId) => {
      const url = 'https://chess-app-rails-andy-strube.herokuapp.com/games/';
      //const url = 'http://localhost:3000/games/';
      return [url + playersAndId[0] + '/edit', playersAndId[1], playersAndId[2]];
    });
  }

  linkGenerator(urlAndUserList) {
    const links = urlAndUserList.map((urlAndUsers) => {
      if(urlAndUsers[2] === '') {
        return <div><span><a href={urlAndUsers[0]}>Hosted by {urlAndUsers[1]}</a></span></div>;
      }
    });
    this.setState({
      links,
    });
  }

  render() {
    return(
      <div className="game-links">
        {this.state.links.map((link) => {
          return link;
        })}
      </div>
    );
  }
}
