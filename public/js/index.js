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
    return (<div className="col-lg-6">
      <input type="text" ref="input" className="form-control" onKeyDown={this.enterChange.bind(this)}/>
    </div>)
  }
}

class ShowLists extends React.Component {
  render() {
    const lists = this.props.lists.map((item, index) => {
      return (
        <li key={index} className="list-group-item list-item">
          <input type="checkbox" className="form-check-input"/>
          <span className="item-text">{item.value}</span>
          <button type="button" className="btn btn-danger">delete</button>
        </li>
      );
    });

    return <ul className="col-lg-7 list-group">
      {lists}
    </ul>
  }
}

ReactDOM.render(<App/>, document.getElementById('content'));