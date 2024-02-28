import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        console.log(error);
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <div className="flex flex-col h-screen bg-gray-900 text-white items-center justify-center">
                <div className="animate-bounce text-4xl text-red-500">Error</div>
                <p className="text-2xl font-bold mb-4">Oops! Something went wrong.</p>
                <p className="text-gray-300">Please try again later.</p>
            </div>;
        }

        return this.props.children;
    }
}
export default ErrorBoundary;