import PropTypes from 'prop-types';

const RateStack = (props) => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '40px',
        textAlign: 'right',
    };

    return (
        <div style={containerStyle}>
            {props.label && <span>{props.label}</span>}
            <h3 data-testid={props.dataTestId}>{props.value}</h3>
        </div>
    );
};

RateStack.propTypes = {
    dataTestId: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
};

export default RateStack;