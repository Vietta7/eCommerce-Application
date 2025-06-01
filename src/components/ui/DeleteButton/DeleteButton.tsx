import { Button } from '../Button/Button';
import styles from './DeleteButton.module.css';

interface DeleteButtonProps {
  onClick: () => void;
  className?: string;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, className }) => {
  return (
    <Button className={`${styles.delete_button} ${className}`} onClick={onClick} type="button">
      Delete
    </Button>
  );
};
