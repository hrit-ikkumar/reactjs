import React, {Component} from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle , Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,   Label, Collapse, Row, Col } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.toggleComment = this.toggleComment.bind(this);
        this.state = {
            isCommentOpen: true,
            isModalOpen: false,
                rating: '',
                author: '' ,
                comment: '',
                touched: {
                    author: false
                }
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleComment = this.handleComment.bind(this);

    }
    toggleComment(){
        this.setState({
            isCommentOpen: !this.state.isCommentOpen
        });
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleComment(values) {
        //this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        //event.preventDefault();
    }

    render() {
        const required = (val) => val && val.length;
        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);

        return (
            <div>
                <div className="container">
                    <Collapse isOpen = {this.state.isCommentOpen}>
                            <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span>  Comment</Button>
                    </Collapse>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Comment</ModalHeader>
                        <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleComment(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={2}>Rating</Label>
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
                                    <Label htmlFor="author" md={2}>Your Name</Label>
                                    <Col md={10}>
                                      <Control.text model=".author" id="author" name="author"
                                           placeholder="Your Name"
                                           className="form-control"
                                           validators = {{
                                            required, minLength: minLength(3), maxLength:maxLength(15)
                                        }} 
                                           />
                                           <Errors className="text-danger" model=".author" show="touched" 
                                           messages = {{
                                               required: 'Required',
                                               minLength: 'Must be 3 characters or more',
                                               maxLength: 'Must be 15 characters or less'
                                           }}
                                           />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor = "comment" md={2}>Comment</Label>
                                    <Col md={10}>
                                        <Control.textarea model=".comment" name="comment" rows="12" className="form-control" />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{size:10, offset: 2}}>
                                        <Button type="submit"  color="primary"> Submit</Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>  
            </div>
        );
    }
}

function RenderComments({comments, addComment, dishId}) {
    const coments = comments.map(comment => {
        return (
            <div key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author},
                &nbsp;
                {
                    new Intl.DateTimeFormat('en-US', {
                        year:'numeric',
                        month:'short',
                        day:'2-digit'
                    }).format(new Date(Date.parse(comment.date)))
                }
                </p>
            </div>
        );
    });
    return (
        <div className="col-12 col-md-5 m-1">
            <h4> Comments </h4>
            <ul className="list-unstyled">
                {coments}
            </ul>
            <CommentForm dishId={dishId} addComment={addComment} />
        </div>
    );
}

function RenderDish({dish}) {
if(dish != null) {
        return (
            <div className='col-12 col-md-5 m-1'>
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
    else {
        return (<div></div>)
    }
}

const DishDetail = props=> {
    if(props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if(props.errMess)
    {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }
    else if (props.dish != null)
    {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id} />
                </div>
            </div>
        );
    }
    else  {
        return (<div></div>)
    }
}

export default DishDetail;