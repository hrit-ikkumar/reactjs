import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody,   Label, Collapse, Row, Col} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';

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
    handleComment(event) {
        //this.toggleModal();
        console.log(JSON.stringify(event));
        alert(JSON.stringify(event));
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

export default CommentForm;