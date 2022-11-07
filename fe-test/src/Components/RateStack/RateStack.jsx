import PropTypes from 'prop-types';

const RateStack = (props) => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'right',
        ...props.style,
    }

    return (
        <div style={containerStyle}>
            {props.label && <span>{props.label}</span>}
            <h3>{props.value}</h3>
        </div>
    )
}

RateStack.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
  };

export default RateStack;