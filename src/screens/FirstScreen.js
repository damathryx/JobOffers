/**
 * Created by jrezan on 25/06/2017.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Easing,
    Text,
    TouchableWithoutFeedback,
    ScrollView,
    Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Interactable from 'react-native-interactable';
import DefaultMapStyle from '../data/mapStyleDefault.json';
import Styles from '../styles';

const RCTUIManager = require('NativeModules').UIManager;
const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height - 75
}

const ASPECT_RATIO = Screen.width / Screen.height;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const JOB_ITEM_SPACING = 5;
const JOB_ITEM_WIDTH = 200;
const JOB_ITEM_SNAP = JOB_ITEM_WIDTH + (JOB_ITEM_SPACING * 2);
const JOB_SCROLL_MAGRIN_HORIZONTAL = (
  (Screen.width
    - JOB_ITEM_SNAP
  ) / 2
);

import MapView, { PROVIDER_GOOGLE }  from 'react-native-maps';

class FirstScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
    this.interactableListLastSnapIndex = 0;
    this._deltaY = new Animated.Value(Screen.height-100);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'list') { // this is the same id field from the static navigatorButtons definition
        this.props.navigator.showLightBox({
          screen: 'example.ThirdScreen',
          title: '',
          passProps: {},
          style: {
            backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
            backgroundColor: "rgba(0,0,0,0)", // tint color for the background, you can specify alpha here (optional)
            tapBackgroundToDismiss: true // dismisses LightBox on background taps (optional)
          }
        });
      }
    }
  }

  _onListPress = () => {
    this.refs.interactableList.snapTo({ index: 0 });
    this.setState({
      interactableListLastSnapIndex: 0,
    });

  }

  _animateScroll = (markerID) => {
  const snapToX = markerID * JOB_ITEM_SNAP;
    RCTUIManager.measure(
      this._scrollView.getInnerViewNode(),
      () => {
        this._scrollView.scrollTo({
          x: (snapToX),
          animated: true,
        });
      }
    );
  }

  _snapToItem = (e) => {
    const x = e.nativeEvent.contentOffset.x;
    const posX = (x + (JOB_ITEM_SNAP / 2)) / JOB_ITEM_SNAP;
    const markerID = parseInt(posX);
    this._animateScroll(markerID);
  }

  _onPanDrag = () => {
    if (this.state.interactableListLastSnapIndex !== 1) {
      this.refs.interactableList.snapTo({ index: 1 });
      this.setState({
        interactableListLastSnapIndex: 1,
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={styles.mapView}
          provider={PROVIDER_GOOGLE}
          customMapStyle={DefaultMapStyle}
          onPanDrag={this._onPanDrag}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0421,
          }}
        />
        <LinearGradient colors={['transparent', '#17263c']} style={{ bottom: 0, position: 'absolute', height: 100, width: Screen.width }}/>
        <LinearGradient colors={['#17263c', 'transparent']} style={{ top: 0, position: 'absolute', height: 100, width: Screen.width }}/>
        <Animated.View
          style={
            [styles.userLocationButton,
              {
                transform: [{
                  translateY: this._deltaY.interpolate({
                    inputRange: [Screen.height - 330, Screen.height - 100],
                    outputRange: [Screen.height - 330, Screen.height - 100]
                  }),
                }]
              }
            ]
          }
        >
          <MaterialIcons size={25} color="#fff" name="my-location" />
        </Animated.View>
        <Interactable.View
          verticalOnly
          ref="interactableList"
          snapPoints={[{ y: Screen.height - 330 }, { y: Screen.height - 100 }]}
          boundaries={{top: Screen.height - 350}}
          initialPosition={{y: Screen.height - 100}}
          animatedValueY={this._deltaY}>
          <View style={styles.eventPanels}>
            <ScrollView
              onMomentumScrollEnd={this._snapToItem}
              ref={component => this._scrollView = component}
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={styles.scrollViewContainer}
            >
              <View
                style={[styles.item, { backgroundColor: '#fff' }]}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <View
                    style={{
                      padding: 10,
                      width: 45,
                      borderRadius: 5,
                      backgroundColor: "#fff",
                    }}
                  >
                    <Ionicons
                      color={'#fff'}
                      name="ios-pin"
                      size={20}
                    />
                  </View>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text
                      style={{
                        color: "#e8732a",
                        fontSize: 18,
                      }}
                    >
                      $30
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                    marginTop: 5,
                  }}
                >
                  <Ionicons color="#e8732a" name="ios-pin" size={18} />
                  <Text
                    numberOfLines={2}
                    style={{ fontSize: 10, paddingLeft: 5 }}
                  >
                    Little Changi
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                  }}
                >
                  <Ionicons color="#555" name="ios-calendar" size={18} />
                  <Text numberOfLines={2} style={{ fontSize: 12, paddingLeft: 5 }}>Aug 5, 2017</Text>
                </View>
              </View>
              <View
                style={[styles.item, { backgroundColor: '#fff' }]}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <View
                    style={{
                      padding: 10,
                      width: 45,
                      borderRadius: 5,
                      backgroundColor: "#fff",
                    }}
                  >
                    <Ionicons
                      color={'#fff'}
                      name="ios-pin"
                      size={20}
                    />
                  </View>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text
                      style={{
                        color: "#e8732a",
                        fontSize: 18,
                      }}
                    >
                      $30
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                    marginTop: 5,
                  }}
                >
                  <Ionicons color="#e8732a" name="ios-pin" size={18} />
                  <Text
                    numberOfLines={2}
                    style={{ fontSize: 10, paddingLeft: 5 }}
                  >
                    Little Changi
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                  }}
                >
                  <Ionicons color="#555" name="ios-calendar" size={18} />
                  <Text numberOfLines={2} style={{ fontSize: 12, paddingLeft: 5 }}>Aug 5, 2017</Text>
                </View>
              </View>
              <View
                style={[styles.item, { backgroundColor: '#fff' }]}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <View
                    style={{
                      padding: 10,
                      width: 45,
                      borderRadius: 5,
                      backgroundColor: "#fff",
                    }}
                  >
                    <Ionicons
                      color={'#fff'}
                      name="ios-pin"
                      size={20}
                    />
                  </View>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text
                      style={{
                        color: "#e8732a",
                        fontSize: 18,
                      }}
                    >
                      $30
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                    marginTop: 5,
                  }}
                >
                  <Ionicons color="#e8732a" name="ios-pin" size={18} />
                  <Text
                    numberOfLines={2}
                    style={{ fontSize: 10, paddingLeft: 5 }}
                  >
                    Little Changi
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                  }}
                >
                  <Ionicons color="#555" name="ios-calendar" size={18} />
                  <Text numberOfLines={2} style={{ fontSize: 12, paddingLeft: 5 }}>Aug 5, 2017</Text>
                </View>
              </View>
            </ScrollView>
            <View style={{ flex: 1, borderTopWidth: 0.7, borderTopColor: 'rgba(156,165,179,0.5)', marginHorizontal: 20, padding: 20, flexDirection: 'row' }}>
              <FontAwesome name="long-arrow-up" size={15} color="#fff" />
              <Text style={{ fontSize: 15, color: '#fff', flex: 1, textAlign: 'center' }}>All categories</Text>
            </View>
          </View>
          <TouchableWithoutFeedback onPress={this._onListPress}>
            <View style={{ width: Screen.width, height: 50, backgroundColor: 'transparent', position: 'absolute', top: 0 }}/>
          </TouchableWithoutFeedback>
        </Interactable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  eventPanels: {
    height: 300,
  },
  scrollViewContainer: {
    paddingHorizontal: JOB_SCROLL_MAGRIN_HORIZONTAL,
  },
  item: {
    height: 200,
    padding: 10,
    borderRadius: 5,
    width: JOB_ITEM_WIDTH,
    margin: JOB_ITEM_SPACING,
  },
  filterContainer: {
    backgroundColor: '#278485',
    paddingTop: 10
  },
  filterTop: {
    height: 36
  },
  filterUp: {
    marginLeft: 24,
    width: 26,
    height: 26
  },
  filterField: {
    height: 40,
    backgroundColor: '#3a969a',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 4,
    justifyContent: 'center'
  },
  filterFieldText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 30
  },
  panel: {
    height: 300,
    width: (Screen.width / 1.5) - 40,
    padding: 20,
    backgroundColor: '#f7f5eee8',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.4
  },
  userLocationButton: {
    backgroundColor: 'rgba(155,155,155, 0.2)',
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems:'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    margin: 20
  },
});

FirstScreen.propTypes = {};
FirstScreen.defaultProps = {};

export default FirstScreen;
