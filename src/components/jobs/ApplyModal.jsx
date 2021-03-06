import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../../styles/ApplyModal.css';
import Select from 'react-select';
import {Link} from 'react-router-dom';

let resumeoptions = [];
let coverletteroptions = [];

class ApplyModal extends Component {

  state = {
    resumeOption: {value: null, label: null},
    coverLetterOption: {value: null, label: null},
    resumeSelected: true,
    coverLetterSelected: true
  }

  componentDidMount() {
    resumeoptions = this.props.resumechoices;
    coverletteroptions = this.props.coverletterchoices;
  }


  resumeHandleChange  = (e) => {
    this.setState({resumeOption: e});
  }

  coverletterHandleChange = (e) => {
    this.setState({coverLetterOption: e});
  }

  submitApplication = () => {
    let resumeSelected = this.state.resumeOption.value;
    let coverLetterSelected = this.state.coverLetterOption.value;

    let newstate = this.state;

    if(resumeSelected === null){
      newstate.resumeSelected = false;
    }else{
      newstate.resumeSelected = true;
    }

    if(this.props.requirecoverletter && coverLetterSelected === null){
      newstate.coverLetterSelected = false;
    }else{
      newstate.coverLetterSelected = true;
    }

    if(!newstate.resumeSelected || !newstate.coverLetterSelected){
      this.setState(newstate);
    }else{
      newstate.resumeSelected = true;
      newstate.coverLetterSelected = true;
      this.props.apply(resumeSelected, coverLetterSelected);
    }
  }

  render() {

    return (
      <Modal id="apply-modal" show={this.props.showapply} onHide={this.props.closeapply}>
        <Modal.Header>
          <Modal.Title>Documents</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <h3>Resume</h3>
        {!this.state.resumeSelected && <div style={{'fontSize':'12px','color':'rgb(244, 67, 54)'}}>Required</div>}
        <Select
          className="resumeOption"
          value={this.state.resumeOption}
          onChange={this.resumeHandleChange.bind(this)}
          options={resumeoptions}
          placeholder="Select a document"
          isSearchable="true"
        />
        {this.props.requirecoverletter &&
        <div>
        <h3>Cover Letter</h3>
        {!this.state.coverLetterSelected && <div style={{'fontSize':'12px','color':'rgb(244, 67, 54)'}}>Required</div>}
          <Select
            className="coverLetterOption"
            value={this.state.coverLetterOption}
            onChange={this.coverletterHandleChange.bind(this)}
            options={coverletteroptions}
            placeholder="Select a document"
            isSearchable="true"
          />
          </div>
        }

        </Modal.Body>
        <Modal.Footer>
          <Link className="footerLink" to={`/documents/${this.props.username}`}>Need to upload some documents?</Link>
          <Button bsSize="large" bsStyle="success" onClick={this.submitApplication}>Apply</Button>
          <Button bsSize="large" onClick={this.props.closeapply}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ApplyModal;
