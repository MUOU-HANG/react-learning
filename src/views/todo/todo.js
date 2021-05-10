import React from "react";
import "../../App.css";
import { Button, Input, List } from "antd";

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      data: [
        { id: 1, value: "坚持打卡1", done: false },
        { id: 2, value: "坚持打卡2", done: true },
        { id: 3, value: "坚持打卡3", done: false },
        { id: 4, value: "坚持打卡4", done: false },
      ],
    };
  }
  // 输入框动作
  handelInputChange(e) {
    this.setState({
      value: e.target.value,
    });
  }
  // 回车键动作
  handelPressEnter(e) {
    let data = this.state.data;
    // 获取原先数据数组中的数据条数
    const n = data.length;
    // 向数据数组中增加数据
    data.push({
      id: n + 1,
      value: e.target.value,
      done: false,
    });
    this.setState({
      // data: newData,
      value: "",
    });
  }
  render() {
    return (
      <div className="App">
        <h1>MY TODO LIST</h1>
        <Input
          placeholder="请输入代办事项，回车键入"
          value={this.state.value}
          onChange={this.handelInputChange.bind(this)}
          onPressEnter={this.handelPressEnter.bind(this)}
        />
        <TodoItem data={this.state.data} />
      </div>
    );
  }
}
class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: props.data };
  }
  // 删除操作
  handelDelete(id) {
    // 删除数据中的对应项
    const newData = this.state.data.filter((item) => item.id !== id);
    this.setState({
      data: newData,
    });
  }
  // 完成操作
  handelDone(id) {
    let data = this.state.data;
    data.map((item) => {
      if (item.id === id) item.done = true;
      return item;
    });
    const newData = data;
    this.setState({
      data: newData,
    });
  }
  render() {
    return (
      <div className="todo-item">
        <List
          bordered
          dataSource={this.state.data}
          renderItem={(item) => (
            <List.Item
              className={item.done ? "todo-done" : ""}
              actions={[
                <Button
                  type="text"
                  danger
                  onClick={(e) => this.handelDelete(item.id)}
                >
                  {" "}
                  delete{" "}
                </Button>,
                <Button type="text" onClick={(e) => this.handelDone(item.id)}>
                  {" "}
                  done
                </Button>,
              ]}
            >
              {item.value}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default TodoApp;
