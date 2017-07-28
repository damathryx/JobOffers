/**
 * Created by jrezan on 25/06/2017.
 */
/**
 * Created by jrezan on 25/06/2017.
 */
import React, {Component} from 'react';
import {
    View,
    Easing,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import CircleTransition from 'react-native-expanding-circle-transition';

const POSITON = 'custom';
const ANIMATION_DURATION = 1200
const TRANSITION_BUFFER = 1;

class ThirdScreen extends Component {
    constructor(props) {
        super(props);

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

  componentDidMount() {
    const _this = this;
    this.circleTransition.start(() => {});
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'closeModal') { // this is the same id field from the static navigatorButtons definition
                this.props.navigator.dismissModal({
                    animationType: 'none' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
                });
            }
        }
    }
    render() {
        return (
            <View style={{ height: 500, width: 200, overflow: 'hidden', flexWrap: 'wrap' }}>
                <CircleTransition
                  ref={(circle) => { this.circleTransition = circle }}
                  color={'#29C5DB'}
                  expand
                  customTopMargin={0}
                  customLeftMargin={0}
                  transitionBuffer={TRANSITION_BUFFER}
                  duration={ANIMATION_DURATION}
                  easing={Easing.linear}
                  position={'topLeft'}
                />
                <Text>WEW</Text>
            </View>
        );
    }
}

ThirdScreen.propTypes = {};
ThirdScreen.defaultProps = {};

export default ThirdScreen;
