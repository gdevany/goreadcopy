import * as Colors from 'material-ui/styles/colors'

// This is an example
const Theme = {
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.teal500,
    primary2Color: Colors.blue500,
    primary3Color: Colors.orange500,
    textColor: Colors.grey900,
    textColorSoft: Colors.grey600,
    graphLineColor: Colors.teal500,
    graphBarInactive: Colors.grey300,
    graphBarActive: Colors.teal500,
    activeTextColor: Colors.teal500,
    coloredBackgroundText: Colors.white,
    hoursWorkedTraveltime: Colors.blue500,
    hoursWorkedOnsite: Colors.indigo500,
    hoursWorkedOther: Colors.blueGrey100,
    'serv-med': Colors.teal400,
    'other': Colors.blueGrey100,
    'serv-quick': Colors.teal200,
    'install': Colors.amber400,
    'serv-long': Colors.teal700,
    'construct-up': Colors.deepOrange400
  },
}

exports.palette = Theme.palette
exports.fontFamily = Theme.fontFamily
exports.default = Theme
