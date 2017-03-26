import React, { Component } from 'react'
import { Dialog } from 'material-ui'
import { Import } from '../../services/api'
import Dropzone from 'react-dropzone'
import Promise from 'bluebird'

const { libraryUpload } = Import

const styles = {
  modalTitle: {
    color: '#fff',
    backgroundColor: '#4669b1',
    padding: '10px 24px',
  },
  navItemLinks: {
    fontWeight: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

class ImportLibraryModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isContentImport: true,
      isContentHelp: false,
      isContentResult: false,
      importLibraryFileUpload: null,
      importResults: null,
      importSucessCount: null,
    }
  }
  importLibraryUpload = (file) => {
    this.setState({
      importLibraryFileUpload: file
    })
    this.getBase64AndUpdate(file[0], 'csv')
  }
  getBase64AndUpdate = (file, FileType) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(`Error in getBase64: ${error}`)
    })
      .then(res => libraryUpload({ file: res }))
      .then(res => this.displayResults(res.data))
      //.catch(err => )
  }
  displayResults = (results) => {
    const table = (
      <table className='display-results'>
        <th>
          ISBN
        </th>
        <th>
          Status
        </th>
        <th className='title-heading'>
          Title
        </th>
        {results.data.added.map(function (result, index) {
          return (
            <tr key={index} className='success'>
             <td>{result.isbn}</td>
             <td>Imported</td>
             <td>{result.title}</td>
            </tr>
          )
        })}
        {results.data.failed.map(function (result, index) {
          return (
            <tr key={index} className='failed'>
             <td>{result.isbn}</td>
             <td>Failed</td>
             <td>{result.title}</td>
            </tr>
          )
        })}
        {results.data.exists.map(function (result, index) {
          return (
            <tr key={index} className='exists'>
             <td>{result.isbn}</td>
             <td>Already added</td>
             <td>{result.title}</td>
            </tr>
          )
        })}
      </table>
    )
    if (results.data.exists.length > 0 ||
      results.data.added.length > 0 ||
      results.data.failed.length > 0
    ) {
      this.setState({
        isContentResult: true,
        importResults: table,
        importSucessCount: results.data.added.length,
      })
    }
  }
  loadSection = (section) => {
    if (section === 'import') {
      this.setState({
        isContentImport: true,
        isContentHelp: false,
      })
    } else if (section === 'help') {
      this.setState({
        isContentImport: false,
        isContentHelp: true,
      })
    }
  }
  importSection = () => {
    return (
      <div>
        <div className='upload'>
          <h3>
            Upload your file
          </h3>
          <div className='upload-library'>
            <Dropzone
              onDrop={this.importLibraryUpload}
              className='upload-library-dropzone'
            >
              <a
                className='upload-library-btn'
              >
                Upload your library
              </a>
            </Dropzone>
          </div>
        </div>
        <div className='help'>
          <h3>
            Help
          </h3>
          <div className='help-info'>
            <a
              style={styles.navItemLinks}
              className='info-link rf-nav-link'
              onClick={() => this.loadSection('help')}
            >
              How to export your goodreads data?
            </a>
          </div>
        </div>
      </div>
    )
  }
  helpSection = () => {
    return (
      <div>
        <div
          className='backspace-link'
          onClick={() => this.loadSection('import')}
        />
        <div className='help-content'>
          <h3>
          How to export the library from goodreads
          </h3>
          <p>
            Importing your Goodreads books into LibraryThing is quick and easy.
          </p>
          <strong>
            Step 1.
          </strong>
          <p>
            {'Go to Goodread '}
            <a href='https://www.goodreads.com/review/import'>
              My Books > Import page.
            </a>
            {' If you are not signed in, sign in and try it again'}
          </p>
          <strong>
            Step 2.
          </strong>
          <p>
            Click on "Export Library" on the top right of the page.
          </p>
          <img src='/image/import-library-help-1.png'/>
          <strong>
            Step 3.
          </strong>
          <p>
            Wait until Goodreads finishes generating your
            export. Then click the "Your export" link to
            download it to your computer.
          </p>
          <img src='/image/import-library-help-2.png'/>
          <strong>
            Step 4.
          </strong>
          <p>
            {'Now that you have the CSV file '}
            <a
              onClick={() => this.loadSection('import')}
            >
              click here
            </a>
            {' to import your books from goodreads.'}
          </p>
        </div>
      </div>
    )
  }
  resultSection = () => {
    return (
      <div className='results'>
        <h3>
          Result
        </h3>
        <div className='resultDisplay'>
          {this.state.importResults}
        </div>
      </div>
    )
  }
  render() {
    const { isContentHelp, isContentImport, isContentResult } = this.state
    const {
      handleImportLibraryClose,
      openImportLibraryModal,
    } = this.props
    return (
      <div>
        <Dialog
          className='import-library-modal'
          bodyClassName='import-library-content'
          titleClassName='import-library-title'
          title='Import Library'
          titleStyle={styles.modalTitle}
          modal={false}
          open={openImportLibraryModal}
          onRequestClose={handleImportLibraryClose}
          autoScrollBodyContent={true}
        >
          {isContentImport ? this.importSection() : null}
          {isContentHelp ? this.helpSection() : null}
          {isContentResult ? this.resultSection() : null}
        </Dialog>
      </div>
    )
  }
}

export default ImportLibraryModal
