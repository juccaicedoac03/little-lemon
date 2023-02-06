const Button = ({ value, label, isSelected, onClick }) => (
    <button
      style={isSelected ? { background: '#495E57', color: 'white' } : {}}
      onClick={() => onClick(value,isSelected)}
    >
      {label.replace(/-/g, ".  ")}
    </button>
  );

  export default Button;