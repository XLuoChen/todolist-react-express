class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: []
    };
  }

  addList(value) {
    const lists = this.state.lists;
    lists.push({value, static: true});

    this.setState(lists);
  }

  render() {
    return <div>
      <AddList onAdd={this.addList.bind(this)}/>
      <ShowLists lists={this.state.lists}/>
    </div>
  }
}

class AddList extends React.Component {
  enterChange(e) {
    if (e.keyCode == 13) {
      let value = this.refs.input.value;
      if (!value) return false;

      this.props.onAdd(value);
      this.refs.input.value = '';
    }
  }

  render() {
    return (<div>
      <input type="text" ref="input" onKeyDown={this.enterChange.bind(this)}/>
    </div>)
  }
}

class ShowLists extends React.Component {
  render() {
    const lists = this.props.lists.map((item, index) => {
      return (<div key={index}>
        <input type="checkbox"/>
        <li className="list-item">{item.value}</li>
      </div>);
    });

    return <div>
      {lists}
    </div>
  }
}

ReactDOM.render(<App/>, document.getElementById('content'));