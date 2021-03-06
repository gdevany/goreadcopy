import React, { Component } from 'react'
import { Dialog } from 'material-ui'
import { Import } from '../../services/api'
import Dropzone from 'react-dropzone'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import { Colors } from '../../constants/style'
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
      isContentLoading: false,
      importResults: null,
      importSucessCount: null,
    }
  }

  importLibraryUpload = (file) => {
    this.setState({ isContentLoading: true })
    this.getBase64AndUpdate(file[0], 'csv')
  }

  getFileJSON = (fileString) => {
    const header = 'data:text/csv;base64,'
    return header + btoa(unescape(encodeURIComponent(fileString)))
  }

  getBase64AndUpdate = (file, FileType) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      if (FileType !== 'csv') {
        throw new Error('Invalid Type')
      } else {
        reader.readAsText(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(`Error in getBase64: ${error}`)
      }
    })
      .then(res => libraryUpload({ file: this.getFileJSON(res) }))
      .then(res => this.displayResults(res.data))
      .catch(err => this.handleIncorrectType(err))
  }

  handlerTableRow = (result, index, value, description) => {
    return (
      <tr key={index} className={value}>
        <td data-th='ISBN'>{result.isbn}</td>
        <td data-th='Status'>{description}</td>
        <td data-th='Title'>{result.title}</td>
      </tr>
    )
  }

  displayResults = (results) => {
    if (results.status !== 'too_many_books') {
      const table = (
        <table className='display-results'>
          <tbody>
            <tr>
              <th>ISBN</th>
              <th>Status</th>
              <th className='title-heading'>
                Title
              </th>
            </tr>
            {results.data.added.map((result, index) => {
              return this.handlerTableRow(result, index, 'success', 'Imported')
            })}
            {results.data.failed.map((result, index) => {
              return this.handlerTableRow(result, index, 'failed', 'Failed')
            })}
            {results.data.exists.map((result, index) => {
              return this.handlerTableRow(result, index, 'exists', 'Already added')
            })}
          </tbody>
        </table>
      )
      results.data.exists.length > 0 ||
      results.data.added.length > 0 ||
      results.data.failed.length > 0 ?
        this.setState({
          isContentResult: true,
          isContentLoading: false,
          importResults: table,
          importSucessCount: results.data.added.length,
        }) : null
    } else {
      const error = (
        <div className='library-error'>
          <p>
            Your library has too many books, the import of your
            library is being processed you'll receive a
            confirmation on your email when it finishes.
          </p>
        </div>
      )
      this.setState({
        isContentResult: true,
        isContentLoading: false,
        importResults: error,
      })
    }
  }

  loadSection = (section) => {
    let isContentImport, isContentHelp, isContentResult
    const { importResults } = this.state
    section === 'import' ? (
      isContentImport = true,
      isContentHelp = false,
      isContentResult = importResults !== null
    ) : (
      isContentImport = false,
      isContentHelp = true,
      isContentResult = false
    )
    this.setState({
      isContentImport,
      isContentHelp,
      isContentResult,
    })
  }

  importSection = () => {
    return (
      <div className='import-library-container'>
        <div className='upload'>
          <h3 className='upload-title'>
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
          <img
            style={this.state.img1loaded ? {} : { display: 'none' }}
            src='/image/import-library-help-1.png'
            onLoad={() => this.setState({ img1loaded: true })}
          />
          <strong>
            Step 3.
          </strong>
          <p>
            Wait until Goodreads finishes generating your
            export. Then click the "Your export" link to
            download it to your computer.
          </p>
          <img
            style={this.state.img2loaded ? {} : { display: 'none' }}
            src='/image/import-library-help-2.png'
            onLoad={() => this.setState({ img2loaded: true })}
          />
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
    const { importResults } = this.state
    return (
      <div className='results'>
        <h3>
          Result
        </h3>
        <div className='resultDisplay'>
          {importResults}
        </div>
      </div>
    )
  }

  handleClose = () => {
    const { handleImportLibraryClose } = this.props
    this.setState({
      isContentImport: true,
      isContentHelp: false,
      isContentResult: false,
      importResults: null,
      importSucessCount: null,
    })
    handleImportLibraryClose()
  }

  handleIncorrectType = (msg) => {
    const error = (
      <div className='library-error'>
        <p>
          You selected an incorrect file to import.
          You must select your GoodReads Library Export .CSV File.
        </p>
      </div>
    )
    this.setState({
      isContentResult: true,
      isContentLoading: false,
      importResults: error,
    })
  }

  setLoading = (size) => {
    return (
      <RefreshIndicator
        size={size}
        left={0}
        top={0}
        loadingColor={Colors.blue}
        status='loading'
        style={styles.refresh}
      />
    )
  }

  render() {
    const {
      isContentHelp,
      isContentImport,
      isContentResult,
      isContentLoading,
    } = this.state
    const {
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
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          {isContentImport ? this.importSection() : null}
          {isContentHelp ? this.helpSection() : null}
          {isContentLoading ? this.setLoading(50) : null}
          {isContentResult ? this.resultSection() : null}
        </Dialog>
      </div>
    )
  }
}

export default ImportLibraryModal
