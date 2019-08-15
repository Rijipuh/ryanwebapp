import React from "react";
import { Button, Input, Image, List } from "semantic-ui-react";

import moment from "moment";

import "./App.css";
import ryanPic from "./ryan.jpg";
import stw from "./sum ting wong.png";
import { db } from "./firebase";

function sayHi() {
  alert(moment().format("MMMM Do Y k:m:s.SS z"));
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "RJP",
      time: 0,
      timeDifference: 0,
      comment: "",
      commentList: [],
      commentTime: "",
      currentPicture: ryanPic,
      like: 0,
      dl: 1000,
      bs: 99999
    };
  }

  enlistNewComment = newComment => {
    db.collection("comments")
      .add({
        comment: this.state.comment,
        time: moment().format("x")
      })
      .then(
        db
          .collection("comments")
          .get()
          .then(querySnapshot => {
            let commentArr = [];
            querySnapshot.forEach(doc => {
              commentArr.push({
                comment: doc.data().comment,
                time: doc.data().time,
                id: doc.id
              });
            });

            this.setState({
              commentList: commentArr.sort(function(a, b) {
                return b.time - a.time;
              })
            });
          })
      );

    // let currentList = this.state.commentList;
    // currentList.push({
    //   comment: newComment,
    //   time: moment()
    // });
    // this.setState({
    //   commentList: currentList
    // });
  };

  deleteComment = id => {
    db.collection("comments")
      .doc(id)
      .delete()
      .then(
        db
          .collection("comments")
          .get()
          .then(querySnapshot => {
            let commentArr = [];
            querySnapshot.forEach(doc => {
              commentArr.push({
                comment: doc.data().comment,
                time: doc.data().time,
                id: doc.id
              });
            });

            this.setState({
              commentList: commentArr.sort(function(a, b) {
                return b.time - a.time;
              })
            });
          })
      );

    // let currentList = this.state.commentList;
    // currentList.map((comment, index) => {
    //   if (comment.time.format("x") === timeStamp) {
    //     currentList.splice(index, 1);
    //   }
    // });
    // this.setState({
    //   commentList: currentList
    // });
  };

  like = () => {
    db.collection("otherstuff")
      .doc("likedislike")
      .set(
        {
          like: Number(this.state.like) + 1
        },
        { merge: true }
      )
      .then(
        db
          .collection("otherstuff")
          .doc("likedislike")
          .get()
          .then(doc => {
            this.setState({
              like: doc.data().like,
              bs: doc.data().bs,
              dl: doc.data().dl
            });
          })
      );
  };

  dislike = () => {
    db.collection("otherstuff")
      .doc("likedislike")
      .set(
        {
          dl: Number(this.state.dl) + 1
        },
        { merge: true }
      )
      .then(
        db
          .collection("otherstuff")
          .doc("likedislike")
          .get()
          .then(doc => {
            this.setState({
              like: doc.data().like,
              bs: doc.data().bs,
              dl: doc.data().dl
            });
          })
      );
  };

  Bullshit = () => {
    db.collection("otherstuff")
      .doc("likedislike")
      .set(
        {
          bs: Number(this.state.bs) + 1
        },
        { merge: true }
      )
      .then(
        db
          .collection("otherstuff")
          .doc("likedislike")
          .get()
          .then(doc => {
            this.setState({
              like: doc.data().like,
              bs: doc.data().bs,
              dl: doc.data().dl
            });
          })
      );
  };

  componentDidMount() {
    db.collection("comments")
      .get()
      .then(querySnapshot => {
        let commentArr = [];
        querySnapshot.forEach(doc => {
          commentArr.push({
            comment: doc.data().comment,
            time: doc.data().time,
            id: doc.id
          });
        });

        this.setState({
          commentList: commentArr.sort(function(a, b) {
            return b.time - a.time;
          })
        });
      });
    db.collection("otherstuff")
      .doc("likedislike")
      .get()
      .then(doc => {
        this.setState({
          like: doc.data().like,
          bs: doc.data().bs,
          dl: doc.data().dl
        });
      });
  }

  render() {
    return (
      <div>
        <Image
          style={profile}
          src={this.state.currentPicture}
          onMouseEnter={() => this.setState({ currentPicture: stw })}
          onMouseLeave={() => this.setState({ currentPicture: ryanPic })}
        />
        <br />{" "}
        <div style={{ textAlign: "center" }}>
          <Button
            color="blue"
            content="Like"
            icon="heart"
            label={{
              basic: true,
              color: "blue",
              pointing: "left",
              content: this.state.like
            }}
            onClick={() => this.like()}
          />
          <Button
            basic
            color="blue"
            content="Dislike"
            icon="fork"
            label={{
              basic: true,
              color: "blue",
              pointing: "left",
              content: this.state.dl
            }}
            onClick={() => this.dislike()}
          />{" "}
          <Button
            color="red"
            content="Bullshit"
            icon="heart"
            label={{
              basic: true,
              color: "red",
              pointing: "left",
              content: this.state.bs
            }}
            onClick={() => this.Bullshit()}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <Input
            style={{ width: 300 }}
            focus
            placeholder="Leave Comments unless you are Heech"
            onChange={event => {
              this.setState({ comment: event.target.value });
            }}
            onKeyPress={event => {
              if (event.key === "Enter") {
                this.enlistNewComment(this.state.comment);
              }
            }}
            value={this.state.comment}
          />
          <Button
            color="yellow"
            onClick={() => this.enlistNewComment(this.state.comment)}
          >
            Make Comment! ＼(≧▽≦)／{" "}
          </Button>
        </div>
        <List divided relaxed>
          {this.state.commentList.map(comment => (
            <List.Item
              style={{
                marginLeft: 100,
                marginRight: 100
              }}
            >
              <List.Icon
                name="blind"
                size="large"
                verticalAlign="middle"
                onClick={() => {
                  this.deleteComment(comment.id);
                }}
              />
              <List.Content>
                <List.Header as="a">
                  {"Anon  -   " +
                    moment(Number(comment.time)).format(
                      "MMMM Do Y k:m:s.SS z"
                    )}{" "}
                </List.Header>
                <List.Description as="a">{comment.comment}</List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
        <br />
      </div>
    );
  }
}

const profile = {
  height: "400px",
  opacity: 1,
  marginLeft: "auto",
  marginRight: "auto"
};

export default App;

// function App() {
//   // console.log("Zarya");
//   return (
//     <div>
//       {moment().format("MMMM Do Y k:m:s.SS z")}
//       <button style={{ cursor: "pointer" }} onClick={sayHi}>
//         Press me!
//       </button>
//       <br />
//       <input placeholder="How to Spell R" />
//     </div>
//   );
// }

// {moment().format("MMMM Do Y k:m:s.SS z")}
// <br />
// <Button style={{ cursor: "pointer" }} onClick={this.changeName}>
//   Press me Now!
// </Button>
// <br />
// {this.state.timeDifference}
// <p>{this.state.name}</p>

// changeName = () => {
//   let name = "";
//   let time = moment().format("x");
//   if (this.state.name === "Ryan") {
//     name = "RJP";
//   } else if (this.state.name === "RJP") {
//     name = "Ryan";
//   }
//   this.setState(prevState => ({
//     name: name,
//     time: time,
//     timeDifference: time - prevState.time
//   }));
// };
