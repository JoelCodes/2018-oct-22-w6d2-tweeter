function TweetHeader({user:{name, handle, avatars:{small}}}){
  return (<header>
      <img src={small}/>
      <h2>{name}</h2>
      <p>{handle}</p>
    </header>);
}
function TweetFooter({created_at}){
  return (
    <footer>
      <span className="icon"><i className="fa fa-heart"></i></span>
      <span className="icon"><i className="fa fa-retweet"></i></span>
      <span className="icon"><i className="fa fa-flag"></i></span>
      <span>{created_at}</span>
    </footer>
    )
}
function Tweet({tweet: {user, content: {text}, created_at}}){
  return (
    <article className="tweet-container">
      <TweetHeader user={user}/>
      <content><p>{text}</p></content>
    <TweetFooter created_at={created_at}/>
  </article>
  )
}

function TweetSection({tweets}){
  const tweetComponents = tweets.map(tweet => <Tweet key={tweet._id} tweet={tweet}/>)
  return (      
    <section className="tweet-area">
      {tweetComponents}
    </section>
    );
}