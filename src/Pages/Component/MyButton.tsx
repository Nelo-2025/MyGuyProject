interface MyButtonProps {
  text: string;
  onClick: () => void;
}

const MyButton: React.FC<MyButtonProps> = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

export default MyButton;
