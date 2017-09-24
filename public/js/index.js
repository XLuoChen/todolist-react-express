class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: []
    };
  }

  componentDidMount() {
    $.get('/app/todolist', (lists) => {
      this.setState({lists});
    })
  }

  addList(value) {
    $.post('/app/todolist', {value}, (lists) => {
      this.setState({lists});
    }, 'json');
  }

  deleteListItem(index) {
    $.ajax({
      url: '/app/todolist/',
      type: 'DELETE',
      dataType: "json",
      data: {index: index},
      success: ((lists) => {
        this.setState({lists});
      })
    });
  }

  updateListItem(index) {
    $.ajax({
      url: '/app/todolist/',
      type: 'PUT',
      dataType: "json",
      data: {index: index},
      success: ((lists) => {
        this.setState({lists});
      })
    });
  }

  render() {
    return <div>
      <AddList onAdd={this.addList.bind(this)}/>
      <ShowLists lists={this.state.lists} completedLists={this.state.completedLists}
                 deleteListItem={this.deleteListItem.bind(this)} updateListItem={this.updateListItem.bind(this)}/>
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
  deleteListItem(index) {
    this.props.deleteListItem(index);
  }

  updateListItem(index) {
    this.props.updateListItem(index);
  }

  render() {
    const completedLists = this.props.lists.filter(item => item.static);
    const lists = this.props.lists.map((item, index) => {
      return item.static ? '' : (
        <li key={index} className="list-group-item list-item">
          <input type="checkbox" className="form-check-input" onChange={this.updateListItem.bind(this, item.index)}/>
          <span className="item-text">{item.value}</span>
          <button type="button" className="btn btn-danger" onClick={this.deleteListItem.bind(this, item.index)}>delete
          </button>
        </li>
      );
    });

    return (<div>
      <ul className="col-lg-7 list-group">
        {lists}
      </ul>
      <span>{completedLists.length} items have completed</span>
    </div>)
  }
}

ReactDOM.render(<App/>, document.getElementById('content'));