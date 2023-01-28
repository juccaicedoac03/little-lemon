const Button = ({ value, label, isSelected, onClick }) => (
    <button
      style={isSelected ? { background: 'blue', color: 'white' } : {}}
      onClick={() => onClick(value,isSelected)}
    >
      {label}
    </button>
  );

  export default Button;