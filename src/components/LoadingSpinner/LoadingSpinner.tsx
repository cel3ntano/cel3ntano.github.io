import css from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

export default function LoadingSpinner({
  size = 'medium',
}: LoadingSpinnerProps) {
  return (
    <div className={css.wrapper}>
      <div className={`${css.spinner} ${css[size]}`} />
    </div>
  );
}
