import React, { ErrorInfo, ReactNode } from 'react';
import styles from './Error.module.css';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className={styles.boundaryContent}>
          <h1>Sorry... Something went wrong.</h1>
          <a className={styles.link} href="/">
            Try again
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
