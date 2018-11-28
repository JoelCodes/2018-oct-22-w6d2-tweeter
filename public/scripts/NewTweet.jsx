class NewTweet extends React.Component{
  constructor(props){
    super(props);
    this.state = {value: ""};
  }
  changeValue = (value) => {
    this.setState({value});
  }
  render(){
    const {value} = this.state;
    const onChange = (event) => {
      this.changeValue(event.target.value)
    }
    const onSubmit = (event) => {
      event.preventDefault();
      this.props.addTweet(value);
      this.changeValue("");
    }

    const tooLong = value.length > 140;
    const counterColor = tooLong ? 'red' : 'black';
    return (
      <section className="new-tweet">
        <h2>Compose Tweet</h2>
        <form onSubmit={onSubmit}>
          <textarea name="text" placeholder="What are you humming about?" value={value} onChange={onChange}></textarea>
          <input type="submit" value="Tweet"/>
          <span className="counter" style={{color: counterColor}}>{this.props.errorMessage} {140 - value.length}</span>
        </form>
      </section>);
  }
}
