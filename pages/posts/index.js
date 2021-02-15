import React, { useEffect, useState } from "react";
import data from "../../services/data.json";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost, editPost } from "../../redux/actions/postActions";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { TextField, TextareaAutosize } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {useRouter} from 'next/router'

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 20,
    alignItems: 'center', justifyContent: 'center'
  },
  heading:{
    marginBottom: 40
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  actions:{
    justifyContent: "center"
  },
  table: {
    minWidth: 650,
  },
});



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Posts() {
  const classes = useStyles();
  //const [posts , setPosts] = useState([]);
  const [editOpen, setEditOpen] = React.useState(false);
  const [delOpen, setDelOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [post , setPost] = useState({});
  const router = useRouter();

  const handleDeleteOpen = (id) => {
    console.log("ID>>>", id);
    setId(id);
    setDelOpen(true);
  };

  const handleDeleteClose = () => {
    setDelOpen(false);
  };

  const handleEditOpen = (post) => {
    const {id , title , body} = post;
    setPost(post);
    console.log("ID>>>", id);
    setTitle(title);
    setBody(body);
    setId(id);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const deletePostAndClose = () => {
    dispatch(deletePost(id));
    console.log("MODIFIED....", posts);
    handleDeleteClose();
  };

  const handleTitle = (e) => {
    e.preventDefault();
    console.log("LOG...:", e.target.value);
    setTitle(e.target.value);
  };

  const handleBody = (e) => {
    e.preventDefault();
    setBody(e.target.value);
  };

  const editPostAndClose = (e) => {
    console.log("CALLING");
    e.preventDefault();
    dispatch(editPost({...post , "title": title , "body":body}));
    handleEditClose();
  
  }

  useEffect(() => {
    async function getPosts() {
      // if (data.length > 0 || data != null){
      //     const posts = [...data];
      //     setPosts(posts);
      //     console.log("LOG...:" , posts);
      // }
      dispatch(fetchPosts());
    }
    getPosts();
  }, []);

  const renderDeleteModal = () => {
    return (
      <div>
        <Dialog
          open={delOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleDeleteClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Delete Post?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Do you really want to delete ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose} color="primary">
              Disagree
            </Button>
            <Button onClick={() => deletePostAndClose()} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  const renderEditModal = (post) => {
    return (
      <div>
        {console.log("POST...:", post)}
        <Dialog
          open={editOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleEditClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Edit Post?"}
          </DialogTitle>
          <DialogContent>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography
                  className={classes.heading}
                  variant="h4"
                  component="h4"
                >
                  Edit Post
                </Typography>

                <form noValidate autoComplete="off">
                  <TextField
                    id="title"
                    label="Title"
                    value={title}
                    variant="outlined"
                    color="primary"
                    onChange={handleTitle}
                    style={{ width: "100%" }}
                  />

                  <br></br>
                  <br></br>

                  <TextareaAutosize
                    rowsMin={4}
                    aria-label="maximum height"
                    placeholder="Maximum 4 rows"
                    value={body}
                    onChange={handleBody}
                    style={{ width: "100%" }}
                  />
                </form>
                <CardActions className={classes.actions}>
                  <Button
                    style={{ width: "70%" }}
                    onClick={editPostAndClose}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Edit
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Body</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {posts &&
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell component="th" scope="row">
                    {post.id}
                  </TableCell>
                  <TableCell align="right">{post.title}</TableCell>
                  <TableCell align="right">{post.body}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => handleEditOpen(post)}
                      variant="contained"
                      color="primary"
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => handleDeleteOpen(post.id)}
                      variant="contained"
                      color="secondary"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {renderEditModal()}
      {renderDeleteModal()}
    </>
  );
}

export default Posts;
