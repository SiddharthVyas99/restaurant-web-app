import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem, Modal,ModalBody,ModalHeader, Button,
  // Form,Input, FormGroup,
  Col,Row, Label } from 'reactstrap';
import {Control,LocalForm,Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {Link} from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import {FadeTransform,Fade, Stagger} from 'react-animation-components';

// class Dishdetail extends Component{


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
// const isNumber = (val) => !isNaN(Number(val));
// const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);




  function RenderDish({dish}) {
    console.log(dish);
    // dish=dish[0];
    if (dish !== null)
        return(
          <div>
          <FadeTransform
          in
          transformProps={{
              exitTransform: 'scale(0.5) translateY(-50%)'
          }}>
            <Card>
                {/* <CardImg top src={dish.image} alt={dish.name} /> */}
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
            </div>
        );
    else
        return(
            <div></div>
        );
}

function RenderComments({comments,postComment,dishId}) {
  if (comments.length !== 0){
      return(
      <>
      <div>
        <h4>Comments</h4>
        <ul className="list-unstyled">
          <Stagger in>

            {comments.map((c) => {
            return (
              <Fade in>
                <li key={c.id}>
                  <p>{c.comment}</p>
                  <p>--{c.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(c.date)))}</p>
                </li>
              </Fade>
            );
            })}
        </Stagger>
        </ul>
      </div>
      <div>
        <CommentForm dishId={dishId} postComment={postComment} />
      </div>
      </>
      );
  }
  else
      return(
          <div></div>
      );
}

class CommentForm extends Component{


  constructor(props){
    super(props);
    this.state={
        isNavOpen: false,
        isModalOpen:false
    };
    this.toggleNav=this.toggleNav.bind(this);
    this.toggleModal=this.toggleModal.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
}

toggleNav(){
  this.setState({
      isNavOpen: !this.state.isNavOpen
  });
}


toggleModal(){
  this.setState({
      isModalOpen: !this.state.isModalOpen
  });
}

handleSubmit(values) {
  console.log('Current State is: ' + JSON.stringify(values));
  // alert('Current State is: ' + JSON.stringify(values));
  this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
  // event.preventDefault();
}


  render(){
    return (
      <>
      <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
      </Button>
      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                                <Label htmlFor="rating" md={6}>Rating</Label>
                                <Col md={10}>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                    <Label htmlFor="author" md={6}>Your Name</Label>
                                    <Col md={10}>
                                        <Control.text model=".author" id="author" name="author"
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                            />
                                        <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment" md={6}>Comment</Label>
                                    <Col md={10}>
                                        <Control.textarea model=".comment" id="comment" name="comment"
                                            rows="12"
                                            className="form-control" />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={6}>
                                        <Button type="submit" color="primary">
                                        Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>

                        
                    </ModalBody>
                </Modal>
    </>
    );
  }

}



    // render() {
      const  DishDetail = (props) => {
        // console.log(props.comments);
        if(props.isLoading) {
          return (
            <div className="container">
              <div className="row">
                <Loading /> 
              </div>
            </div>
          );
        }
        else if(props.errMess){
          return (
            <div className="container">
              <div className="row">
                <h4>{props.errMess}</h4>
              </div>
            </div>
          );
        }
       else if(props.dish != null)
          return (
                <div className="container">
                  <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                 </div>
                  <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                      <RenderDish dish={props.dish}/>
                    </div>
                    <div  className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments}
                    postComment={props.postComment}
                    dishId={props.dish.id}
                    />
                    </div>
                  </div>
                  <div>
                    {/* <RenderComments /> */}
                  </div>
                  
                </div>
        );
        else
            return (
              <div></div>
            );
      }
    // }


// }

export default DishDetail;