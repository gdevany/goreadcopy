import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet'
import { Auth } from '../../../../services'

class UserProof extends PureComponent {
  constructor(props) {
    super(props)
  }

  setIframeVisibility = (list, isUserLoggedIn) => {
    if (list) {
      list.map(frame => {
        frame.style.visibility = isUserLoggedIn ? 'hidden' : 'visible'
      })
    }
  }

  getProofIframe = () => {
    return [...document.querySelectorAll("body > iframe[id*='proof']")]
  }

  removeNode = (node) => {
    node.parentNode.removeChild(node)
  }

  componentWillUnmount() {
    const list = this.getProofIframe()
    this.setIframeVisibility(list, true)
  }

  render() {
    const list = this.getProofIframe()
    const isUserLoggedIn = Auth.currentUserExists()
    this.setIframeVisibility(list, isUserLoggedIn)
    return list.length === 0 ? (
      <Helmet>
        <script id='proof-script'>
          {`
            !function(){function b(){var a=(new Date).getTime(),
            b=document.createElement('script');
            b.type='text/javascript',b.async=!0,
            b.src='https://cdn.getmoreproof.com/embed/latest/proof.js?'+a;
            var c=document.getElementsByTagName('script')[0];c.parentNode.insertBefore(b,c)}
            var a=window;a.attachEvent?a.attachEvent('onload',b):a.addEventListener('load',b,!1),
            window.proof_config={acc:'GjbSn61NgrXSpzXkmaKLmwra6eC2', v:'1.1'}}()
          `}
        </script>
      </Helmet>
    ) : null
  }
}

export default UserProof

