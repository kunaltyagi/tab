import React from 'react'
import PropTypes from 'prop-types'

import WidgetSharedSpace from 'js/components/General/WidgetSharedSpace'
import WidgetScrollSection from 'js/components/Widget/WidgetScrollSection'
import EmptyWidgetMsg from 'js/components/Widget/EmptyWidgetMsg'
import BookmarkChip from 'js/components/Widget/Widgets/Bookmarks/BookmarkChip'
import AddBookmarkForm from 'js/components/Widget/Widgets/Bookmarks/AddBookmarkForm'
import UpdateWidgetDataMutation from 'js/mutations/UpdateWidgetDataMutation'

class BookmarksWidget extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bookmarks: [],
      editMode: false,
    }
  }

  // FIXME
  // This is a temporary hack. Should pass unique ID
  // from the server.
  randomString(length) {
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var result = ''
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)]
    return result
  }

  componentDidMount() {
    const { widget } = this.props

    // TODO: have the server send obj, not string.
    const data = JSON.parse(widget.data)
    const bookmarks = data.bookmarks || []
    bookmarks.forEach(bookmark => {
      if (bookmark.id) {
        return
      }
      bookmark.id = this.randomString(6)
    })
    this.setState({
      bookmarks: bookmarks,
    })
  }

  getFavicon(link) {
    return 'https://www.google.com/s2/favicons?domain_url=' + encodeURI(link)
  }

  onSaveSuccess() {}

  onSaveError() {
    this.props.showError(
      'Oops, we are having trouble saving your widgets right now :('
    )
  }

  updateWidget(bookmarks) {
    const widgetData = {
      bookmarks: bookmarks,
    }
    const data = JSON.stringify(widgetData)
    UpdateWidgetDataMutation.commit(
      this.props.relay.environment,
      this.props.user,
      this.props.widget,
      data,
      this.onSaveSuccess.bind(this),
      this.onSaveError.bind(this)
    )
  }

  addBookmark(name, link) {
    const newBookmark = {
      id: this.randomString(6),
      name: name,
      link: link,
    }
    this.setState(
      {
        bookmarks: [newBookmark, ...this.state.bookmarks],
      },
      () => {
        this.updateWidget(this.state.bookmarks)
      }
    )
  }

  editBookmark(index, name, link, color = null) {
    const bookmarks = [...this.state.bookmarks]
    bookmarks[index].name = name
    bookmarks[index].link = link
    if (color) {
      bookmarks[index].color = color
    }
    this.setState(
      {
        bookmarks: bookmarks,
      },
      () => {
        this.updateWidget(this.state.bookmarks)
      }
    )
  }

  removeBookmark(index) {
    this.setState(
      {
        bookmarks: this.state.bookmarks.filter((_, i) => {
          return i !== index
        }),
      },
      () => {
        this.updateWidget(this.state.bookmarks)
      }
    )
  }

  onEditModeToggle(editModeEnabled) {
    this.setState({
      editMode: editModeEnabled,
    })
  }

  _moveItem(array, fromIndex, toIndex) {
    array.splice(toIndex, 0, array.splice(fromIndex, 1)[0])
  }

  onReorderMoveUp(index, spotsToMove = 1) {
    const newBookmarks = [...this.state.bookmarks]
    const destinationIndex = index === 0 ? 0 : index - spotsToMove
    this._moveItem(newBookmarks, index, destinationIndex)
    this.setState({
      bookmarks: newBookmarks,
    })
  }

  onReorderMoveDown(index, spotsToMove = 1) {
    const newBookmarks = [...this.state.bookmarks]
    const destinationIndex =
      index === newBookmarks.length - 1 ? index : index + spotsToMove
    this._moveItem(newBookmarks, index, destinationIndex)
    this.setState({
      bookmarks: newBookmarks,
    })
  }

  render() {
    const bookmarks = this.state.bookmarks || []

    const sharedSpaceStyle = {
      overflowX: 'visible',
      overflowY: 'visible',
      overflow: 'visible',
    }

    const wrapper = {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    }

    const bookmarksContainer = {
      display: 'flex',
      flexDirection: 'column',
      marginTop: 27,
    }

    var nodataMsg
    if (!bookmarks.length) {
      nodataMsg = <EmptyWidgetMsg widgetName={'Bookmarks'} />
    }

    return (
      <WidgetSharedSpace containerStyle={sharedSpaceStyle}>
        <div style={bookmarksContainer}>
          <AddBookmarkForm
            addBookmark={this.addBookmark.bind(this)}
            showEditButton={bookmarks.length > 0}
            editMode={this.state.editMode}
            onEditModeToggle={this.onEditModeToggle.bind(this)}
          />
          <WidgetScrollSection>
            <div style={wrapper}>
              {nodataMsg}
              {bookmarks.map((bookmark, index) => {
                return (
                  <BookmarkChip
                    key={bookmark.id}
                    index={index}
                    bookmark={bookmark}
                    editBookmark={this.editBookmark.bind(this)}
                    deleteBookmark={this.removeBookmark.bind(this)}
                    editMode={this.state.editMode}
                    onReorderMoveUp={this.onReorderMoveUp.bind(this)}
                    onReorderMoveDown={this.onReorderMoveDown.bind(this)}
                  />
                )
              })}
            </div>
          </WidgetScrollSection>
        </div>
      </WidgetSharedSpace>
    )
  }
}

BookmarksWidget.propTypes = {
  widget: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    data: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  showError: PropTypes.func.isRequired,
}

export default BookmarksWidget
