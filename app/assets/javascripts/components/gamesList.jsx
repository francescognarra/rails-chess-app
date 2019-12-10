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
    }, 1000);
  }

  getGames() {
    axios.get('https://chess-app-rails-andy-strube.herokuapp.com/games_as_json/')
    //axios.get('http://localhost:3000/games_as_json')
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
      //let url = 'http://localhost:3000/games/';
      let url = 'https://chess-app-rails-andy-strube.herokuapp.com/games/';
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
      links: links
    });
  }

  render() {
    return(
      <div>
        {this.state.links.map(function(link) {
          return link;
        })}
      </div>
    );
  }
}
