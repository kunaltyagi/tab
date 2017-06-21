import React from 'react';
import PropTypes from 'prop-types';

import RandomAppearAnimation from 'general/RandomAppearAnimation';

import DeleteIcon from 'material-ui/svg-icons/navigation/cancel';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

import appTheme from 'theme/default';

class Note extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hoveringDelete: false,
      editMode: false,
    };
  }

  removeStickyNote() {
    this.props.removeStickyNote(this.props.index);
  }

  onDeleteBtnMouseMove(enter) {
    this.setState({
      hoveringDelete: enter,
    })
  }

  render() {
    const { note } = this.props;

    const defaultPaper = {
      margin: 5,
      backgroundColor: 'rgba(0,0,0,.3)',
      borderRadius: 3,
    }

    const noteContent = {
      padding: '0 15px 5px 15px',
    }

    const chip = {
      style: {
        margin: 5,
      },
      labelColor: appTheme.textField.underlineColor,
      backgroundColor: 'rgba(0,0,0,0)',
    }

    const deleteIcon = {
      cursor: 'pointer',
      float: 'right',
      margin: '5px 5px 0px 0px',
      hoverColor: appTheme.fontIcon.color,
      color: 'rgba(255,255,255,0)',
      display: 'inline-block',
    };

    var deleteIconColor = (this.state.hoveringDelete)?
          deleteIcon.hoverColor: deleteIcon.color;

    const textStyle = {
      fontSize: 14,
      color: '#EEE',
      fontFamily: appTheme.fontFamily,
    };

    return (
      <RandomAppearAnimation
        delayRange={300}>
          <div
            key={'note_' + this.props.index}
            style={defaultPaper}
            onMouseEnter={this.onDeleteBtnMouseMove.bind(this, true)}
            onMouseLeave={this.onDeleteBtnMouseMove.bind(this, false)}>
              <div style={{display: 'inline-block'}}>
                <Chip
                  labelColor={chip.labelColor}
                  backgroundColor={chip.backgroundColor}
                  style={chip.style}>
                  <Avatar size={32} backgroundColor={note.color}/>
                  March, 13
                </Chip>
              </div>
              <DeleteIcon
                  color={deleteIconColor}
                  style={deleteIcon}
                  onClick={this.removeStickyNote.bind(this)}/>
              <div style={noteContent}>
                <p style={textStyle}>{note.content}</p>
              </div>
          </div>
      </RandomAppearAnimation>
    );
  }
}

Note.propTypes = {
  index: PropTypes.number.isRequired,
  removeStickyNote: PropTypes.func.isRequired,
  note: PropTypes.object.isRequired,
};

export default Note;