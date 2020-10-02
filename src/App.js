import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      count: 0,
      upvote: 0,
      downvote: 0,
      input: ''
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/boastroast/")
    .then((res) => res.json())
    .then((data) => this.setState({ post: data }));
  }

  handleBoasts = (event) => {
    fetch('http://127.0.0.1:8000/api/boastroast/boasts/')
    .then((res) => res.json())
    .then((data) => this.setState({post: data}));
  }
  
  handleRoasts = (event) => {
    fetch('http://127.0.0.1:8000/api/boastroast/roasts/')
    .then((res) => res.json())
    .then((data) => this.setState({post: data}));
  }

  // mySubmitHandler = (event) => {
  //   event.preventDefault();
  //   alert("You are submitting " + this.state.input);
  // }
  // myChangeHandler = (event) => {
  //   this.setState({username: event.target.value});
  // }

  totalvotes = (event) => {
    fetch('http://127.0.0.1:8000/api/boastroast/totalvotes/')
    .then((res) => res.json())
    .then((data) => this.setState({post: data}));
  }

  handleBoastsIncrement = (id) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
  };
    fetch('http://127.0.0.1:8000/api/boastroast/'+id+'/upvote/', requestOptions)
    .then((res) => res.json())
    .then((data) => window.location.reload());
  }

  handleRoastsDecrement = (id) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
  };
    fetch('http://127.0.0.1:8000/api/boastroast/'+id+'/downvote/', requestOptions)
    .then((res) => res.json())
    .then((data) => window.location.reload());
  }

  render() {
    return (
    <div>
      <h1>Ghost Post React Style</h1>
      <button onClick={this.handleBoasts}>Filter Boasts</button> 
      <button onClick={this.handleRoasts}>Filter Roasts</button>
      <button onClick={this.totalvotes}>Total Score</button>
      <h2>Input your Boast or Roast</h2>
      
      <form onSubmit={this.mySubmitHandler}>
        <select>
          <option value='Boast'>Boast</option>
          <option value='Roast'>Roast</option>
        </select>
          <input type='text' name="fname"/>
          <input type='submit' value='submit'/>
      </form>
      
      <ul>
      {this.state.post.map(br => (
        <div>
          <ul>
          <h2>User Input</h2>
          {br.user_input}
          <h2>Timestamp</h2>
          {br.timeposted}
          <h2>Upvotes</h2>
          {br.upvotes}
          <h2>Downvotes</h2>
          {br.downvotes}
          <h2>Total Score</h2>
          {br.score}
          <br></br>
          <button onClick={(e) => this.handleBoastsIncrement(br.id)}>Upvote</button>
          <button onClick={(e) => this.handleRoastsDecrement(br.id)}>Downvote</button>
          </ul>
          
          <hr></hr>
        </div>
      ))}
      </ul>
    </div>
    )
  }
}

export default App;
