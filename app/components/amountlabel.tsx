const AmountLabel = ({ value }) => (
    <span>₹{(value || 0).toLocaleString()}</span>
);

export default AmountLabel;
