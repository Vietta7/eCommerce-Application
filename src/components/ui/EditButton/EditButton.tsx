import { Button } from '../Button/Button';
import styles from './EditButton.module.css';

interface EditButtonProps {
  onClick: () => void;
  className?: string;
}

export const EditButton: React.FC<EditButtonProps> = ({ onClick, className }) => {
  return (
    <Button className={`${styles.edit_button} ${className}`} onClick={onClick} type="button">
      Edit
    </Button>
  );
};
