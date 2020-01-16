/**
 * A component that renders an icon with math (via KaTeX).
 */

const React = require('react');
const ReactDOM = require('react-dom');
const {StyleSheet} = require('aphrodite');

const {View} = require('../fake-react-native-web');
const {row, centered} = require('./styles');
const {iconSizeHeightPx, iconSizeWidthPx} = require('./common-style');

const MathIcon = React.createClass({
    propTypes: {
        math: React.PropTypes.string.isRequired,
        style: React.PropTypes.any,
    },

    componentDidMount() {
        this._renderMath();
    },

    componentDidUpdate(prevProps) {
        if (prevProps.math !== this.props.math) {
            this._renderMath();
        }
    },
    componentWillUnmount(){
      this._renderMath();
    },

    _renderMath() {
        const {math} = this.props;

        if(typeof window.katex!== 'undefined') {
            window.katex.render(math, ReactDOM.findDOMNode(this),{
              displayMode: true,
            });
        }
    },

    render() {
        const {style, math} = this.props;

        const containerStyle = [
            row,
            centered,
            styles.size,
            styles.base,
            ...(Array.isArray(style) ? style : [style]),
        ];

        return (
            <View style={containerStyle}>
              {math.indexOf("circ") > 0 ? '°' : math.indexOf("pi") > 0 ? 'π' : ''}
            </View>
        );
    },
});

const styles = StyleSheet.create({
    size: {
        height: iconSizeHeightPx,
        width: iconSizeWidthPx,
    },

    base: {
        fontSize: 25,
    },
});

module.exports = MathIcon;
