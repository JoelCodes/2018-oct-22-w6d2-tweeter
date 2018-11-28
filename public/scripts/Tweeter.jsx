class Tweeter extends React.Component{
  constructor(props){
    super(props);
    this.state = {tweets: []}
    this.addTweet = this.addTweet.bind(this); // David.
  }
  componentDidMount(){
    this.loadTweets();
  }
  loadTweets(){
    axios.get('/tweets')
      .then((response) => {
        this.setState({tweets: response.data.reverse()});
      });
  }
  addTweet(text){
    let error = "";
    if(text.length === 0){
      error = "Too Short";
    } else if(text.length > 140){
      error = "Too Long";
    }
    if(error){
      this.setState({errorMessage: error});
      setTimeout(() => { 
        this.setState({errorMessage: undefined});
      }, 3000);
    } else {
      axios.post('/tweets', {text})
      .then(() => {
        this.loadTweets();
      });
    }
  }
  render(){
    return <div>
      <NewTweet addTweet={this.addTweet} errorMessage={this.state.errorMessage}/>
      <TweetSection tweets={this.state.tweets}/>
    </div>
  }
}