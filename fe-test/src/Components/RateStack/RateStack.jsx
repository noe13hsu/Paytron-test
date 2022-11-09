import PropTypes from 'prop-types';

const RateStack = (props) => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'right',
    };

    return (
        <div style={containerStyle}>
            {props.label && <span>{props.label}</span>}
            <h3 data-testid={props.dataTestId}>{props.currency} {props.value}</h3>
        </div>
    );
};

RateStack.propTypes = {
    currency: PropTypes.string,
    dataTestId: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
};

export default RateStack;