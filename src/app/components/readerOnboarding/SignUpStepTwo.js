import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet'
import Radium from 'radium'
import R from 'ramda'
import S from 'underscore.string.fp'
import { connect } from 'react-redux'
import { Chip } from 'material-ui'
import { Genres, Litcoins } from '../../redux/actions'
import SignUpButtons from './SignUpButtons'
import { Colors, Breakpoints } from '../../constants/style'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import { LITCOIN_TYPES as L } from '../../constants/litcoins'

const { getOnboardingGenres, createChosenReaderGenres, updateGenreLitcoins } = Genres
const { updateLitcoinBalance, getLitcoinBalance } = Litcoins

const styles = {
  chip: {
    backgroundColor: Colors.white,
    border: `1px solid ${Colors.blue}`,
    borderRadius: 25,
    color: Colors.blue,
    display: 'inline-block',
    margin: '30px 15px 0px 0px',
    padding: 7,
  },

  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  container: {
    backgroundColor: Colors.white,
    height: '100%',
    padding: '50px 70px',
    marginTop: 10,
    marginBottom: 30,
    maxWidth: 950,

    [Breakpoints.mobile]: {
      padding: '50px 15px',
      marginTop: 0,
    },
  },

  chipText: {
    color: Colors.blue,
    fontSize: 16,
  },

  chosenChip: {
    color: Colors.white,
  },

  genreSection: {
    marginBottom: 100,
  },

  checkmark: {
    marginRight: 7,
    marginBottom: 3,
  },

  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
}

class SignUpStepTwo extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      chosenGenres: [],
      showDisabled: true,
      showLoader: false,
    }

    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  componentWillMount = () => {
    this.props.getOnboardingGenres('signup')
  }

  componentDidMount = () => {
    const { updateLitcoinBalance, getLitcoinBalance } = this.props
    getLitcoinBalance()
      .then(res => {
        const currentLitcoins = res.data.litcoinBalance
        if (currentLitcoins === 13000) {
          updateLitcoinBalance(L.CREATED_ACCOUNT_SOCIAL)
        }
      })
      .catch((err) => {console.log(`An error ocurred while loading the litcoinBalance ${err}`)})
  }

  componentDidUpdate = () => {
    if (this.state.chosenGenres.length) {
      this.props.updateGenreLitcoins({ genreIds: this.state.chosenGenres })
    }
  }

  handleButtonClick = (event) => {
    event.preventDefault()
    this.setState({ showLoader: true })
    const buttonText = event.target.value

    if (buttonText === 'Next') {
      if (this.state.chosenGenres.length > 0) {
        this.props.createChosenReaderGenres({
          genreIds: this.state.chosenGenres,
          context: this.props.context
        })
        this.props.handleNext()
      } else {
        this.setState({ showDisabled: true })
      }
      this.props.handleNext()
        .then(() => {
          this.setState({ showLoader: false })
        })
    } else if (buttonText === 'Back') {
      this.props.handlePrev()
    }

  }

  handleSelectGenre = () => {
    const { chosenGenres } = this.state
    const genreID = Number(document.activeElement.getAttribute('value'))
    const indexOfGenre = chosenGenres.indexOf(genreID)

    if (chosenGenres.length === 0) this.setState({ showDisabled: true })

    if (indexOfGenre >= 0) {
      const updatedGenres = R.reject(R.equals(genreID), chosenGenres)
      this.setState({ chosenGenres: [...updatedGenres] })
      if (chosenGenres.length === 1) {
        this.setState({ showDisabled: true })
        this.props.updateGenreLitcoins({ genreIds: [] })
      }
    } else {
      this.setState({ showDisabled: false })
      this.setState({ chosenGenres: [...chosenGenres, genreID] })
    }

  }

  handleGenreMap = (genres) => {
    return genres.map((genre, index) => {
      const { chosenGenres } = this.state
      const isChosen = chosenGenres.indexOf(genre.id) !== -1

      return (
        <Chip
          key={index}
          value={genre.id}
          className={isChosen ? 'chosenGenre' : null}
          labelStyle={styles.chipText}
          style={styles.chip}
          onClick={this.handleSelectGenre}
        >
          {
            isChosen ?
            <img style={styles.checkmark} src='/image/checkmark.png' /> :
            <img style={styles.checkmark} src='/image/plus.png' />
          }
            {S.titleize(genre.name)}
        </Chip>
      )
    })
  }

  render() {
    const {
      showLoader
    } = this.state

    const { genres, stepIndex } = this.props

    return (
      <div>
        <Helmet>
          <script>
            {`
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
              document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1680870645550873', {
              em: 'insert_email_variable'
              });
              fbq('track', 'Lead');
            `}
          </script>
        </Helmet>
        <Helmet>
          <noscript>
            {`
              <img
                height='1'
                width='1'
                style='display:none'
                src='https://www.facebook.com/tr?id=1680870645550873&ev=Lead&noscript=1'
              />
            `}
          </noscript>
        </Helmet>
        <div style={styles.container} className='card center-text front-card'>

          <h1>
            Add your favorite categories
          </h1>

          <p className='subheader-text'>
            {"We'll use this information to suggest new books and authors for you"}
          </p>

          {
            this.state.showError ? (
              <div>
                <p>Please select one genre</p>
              </div>
            ) : null
          }

          <div style={styles.genreSection}>
            { this.handleGenreMap(genres) }
          </div>

          <div>
            <div style={{ marginTop: 24, marginBottom: 12 }} className='center-text'>
              <SignUpButtons
                handleButtonClick={this.handleButtonClick}
                stepIndex={stepIndex}
                disabled={this.state.showDisabled}
              />
            </div>
          </div>
          {
            showLoader ? (
              <div className='form-input-wrapper center-text'>
                <RefreshIndicator
                  size={50}
                  left={0}
                  top={0}
                  loadingColor={Colors.blue}
                  status='loading'
                  style={styles.refresh}
                />
              </div>
            ) : null
          }
        </div>

        <div className='behind-card-container'>
          <div style={styles.container} className='card behind-card' />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ genres }) => {
  return { genres }
}

const mapDispatchToProps = {
  createChosenReaderGenres,
  getOnboardingGenres,
  updateGenreLitcoins,
  updateLitcoinBalance,
  getLitcoinBalance,
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(SignUpStepTwo))
