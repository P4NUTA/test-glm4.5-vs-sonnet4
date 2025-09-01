import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Tour Planner Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full card text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-senior-xl font-semibold text-gray-800 mb-4">
              Произошла ошибка
            </h2>
            <p className="text-senior-base text-gray-600 mb-6">
              К сожалению, что-то пошло не так. Пожалуйста, перезагрузите страницу или попробуйте позже.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary text-senior-base"
            >
              Перезагрузить страницу
            </button>
            {import.meta.env.DEV && this.state.error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-left">
                <pre className="text-xs text-red-800 overflow-auto">
                  {this.state.error.stack}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}