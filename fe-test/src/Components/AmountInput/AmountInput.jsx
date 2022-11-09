import PropTypes from 'prop-types';

const AmountInput = (props) => {
    const containerStyle = {
        color: '#0b1a3f',
        fontFamily: 'Nunito Sans',
        maxWidth: '400px',
    };

    const inputStyle = {
        border: '1px solid #e5e5e5',
        borderRadius: '4px',
        boxSizing: 'border-box',
        fontSize: '16px',
        height: '48px',
        maxWidth: '400px',
        outline: 'none',
        padding: 0,
        paddingRight: '10px',
        textAlign: 'right',
        width: '400px',
    };

    return (
        <div style={containerStyle}>
            {props.label && <span>{props.label}</span>}
            <input
                data-testid='amount-input'
                min={0}
                onChange={props.setValue}
                style={inputStyle}
                type='number'
                value={props.value}
            />
        </div>
    );
};

AmountInput.propTypes = {
    label: PropTypes.string,
    setValue: PropTypes.func,
    value: PropTypes.number,
  };

export default AmountInput;
