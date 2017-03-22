import React, { PureComponent } from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Colors } from '../../constants/style'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  tab: {
    backgroundColor: Colors.white,
    color: Colors.black,
    borderBottom: `1px solid ${Colors.lightMedGrey}`,
    fontSize: 12,
    fontWeight: 200,
    textTransform: 'none',
  },
  tabContainer: {
    maxWidth: 800,
    margin: '0px auto 50px',
  },
  currentTab: {
    color: Colors.blue,
    borderBottom: `2px solid ${Colors.blue}`,
  },
}

class BooksSection extends PureComponent {
  render() {
    return (
      <div className='sidebar-books-container box'>
        <Tabs
          style={styles.tabContainer}
          inkBarStyle={styles.currentTab}
        >
          <Tab
            label='Library'
            style={styles.tab}
          >
            <div className='sidebar-books-tab-container'>
              <h2 style={styles.headline}>Library</h2>
              <p>
                This is an example tab.
              </p>
              <p>
                You can put any sort of HTML or react component in here.
                It even keeps the component state!
              </p>
            </div>
          </Tab>
          <Tab
            label='Now Reading'
            style={styles.tab}
          >
            <div className='sidebar-books-tab-container'>
              <h2 style={styles.headline}>Currently Reading</h2>
              <p>
                This is an example tab.
              </p>
              <p>
                You can put any sort of HTML or react component in here.
                It even keeps the component state!
              </p>
            </div>
          </Tab>
          <Tab
            label='Wish List'
            style={styles.tab}
          >
            <div className='sidebar-books-tab-container'>
              <h2 style={styles.headline}>Wish List</h2>
              <p>
                This is an example tab.
              </p>
              <p>
                You can put any sort of HTML or react component in here.
                It even keeps the component state!
              </p>
            </div>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default BooksSection
