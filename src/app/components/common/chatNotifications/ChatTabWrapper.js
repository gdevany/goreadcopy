import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { ChatTab, ContactsPopupWindow } from './'
import R from 'ramda'

const ready = (list) => {return list && list.length > 0}

class ChatTabWrapper extends PureComponent {
  constructor(props) {
    super(props)
  }

  getContactById(id) {
    return R.find(R.propEq('pk', id))(this.props.contacts)
  }

  renderConversations({ id, history, isOpen }, idx) {
    return (
      <ChatTab
        key={idx}
        id={id}
        history={history}
        isOpen={isOpen}
        user={this.getContactById(id)}
      />
    )
  }

  render() {
    const { conversations, contacts, isUserLoggedIn } = this.props
    return isUserLoggedIn ? (
      <div className='main-conversation-container'>
        {
          ready(conversations) && ready(contacts) ?
            conversations.map((el, idx)=>this.renderConversations(el, idx)) :
            null
        }
        <ContactsPopupWindow />
      </div>
    ) : null
  }
}

const mapStateToProps = ({
  chat: {
    conversations,
    contacts,
  }
}) => {
  return {
    conversations,
    contacts
  }
}

export default connect(mapStateToProps, null)(ChatTabWrapper)
