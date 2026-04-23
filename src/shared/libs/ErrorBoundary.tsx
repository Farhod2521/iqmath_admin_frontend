// ErrorBoundary.tsx
import React from "react";
import { Result, Button, Card, Collapse, Typography, Space } from "antd";

type FallbackRender = (args: {
  error: Error;
  reset: () => void;
}) => React.ReactNode;

export interface ErrorBoundaryProps {
  fallback?: React.ReactNode | FallbackRender;
  onError?: (error: Error, info: React.ErrorInfo) => void;
  onReset?: (details: {
    reason: "imperative-api" | "keys";
    prevError: Error | null;
  }) => void;
  resetKeys?: unknown[];
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

function arraysShallowEqual(a?: unknown[], b?: unknown[]) {
  if (a === b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (!Object.is(a[i], b[i])) return false;
  }
  return true;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.props.onError?.(error, info);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetKeys } = this.props;
    if (!arraysShallowEqual(prevProps.resetKeys, resetKeys)) {
      this.resetErrorBoundary("keys");
    }
  }

  resetErrorBoundary = (
    reason: "imperative-api" | "keys" = "imperative-api",
  ) => {
    const prevError = this.state.error;
    this.setState({ hasError: false, error: null }, () => {
      this.props.onReset?.({ reason, prevError });
    });
  };

  private renderFallback() {
    const { fallback } = this.props;
    const reset = () => this.resetErrorBoundary("imperative-api");
    const error = this.state.error ?? new Error("Unknown error");

    if (!fallback) {
      return <AntdErrorFallback error={error} reset={reset} />;
    }
    if (typeof fallback === "function") {
      return (fallback as FallbackRender)({ error, reset });
    }
    return fallback;
  }

  render() {
    if (this.state.hasError) return this.renderFallback();
    return this.props.children;
  }
}

/** Antd + Tailwind fallback */
export const AntdErrorFallback: React.FC<{
  error: Error;
  reset: () => void;
}> = ({ error, reset }) => {
  return (
    <div className="p-4 md:p-6">
      <Card className="shadow-sm rounded-2xl">
        <Result
          status="500"
          title="Xatolik yuz berdi"
          subTitle={error.message}
          extra={
            <Space>
              <Button type="primary" onClick={reset}>
                Qayta urinish
              </Button>
              <Button onClick={() => window.location.reload()}>
                Sahifani qayta yuklash
              </Button>
            </Space>
          }
        />
        <Collapse
          className="mt-2"
          items={[
            {
              key: "details",
              label: "Tafsilotlar (stack trace)",
              children: (
                <Typography.Paragraph className="mb-0!">
                  <pre className="whitespace-pre-wrap text-xs md:text-sm">
                    {error.stack || error.message}
                  </pre>
                </Typography.Paragraph>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
};

/** HOC: komponentni tezda o‘rash uchun */
export function withErrorBoundary<P extends object>(
  Wrapped: React.ComponentType<P>,
  boundaryProps?: Omit<ErrorBoundaryProps, "children">,
) {
  const ComponentWithBoundary: React.FC<P> = (props) => (
    <ErrorBoundary {...boundaryProps}>
      <Wrapped {...(props as P)} />
    </ErrorBoundary>
  );
  ComponentWithBoundary.displayName = `withErrorBoundary(${Wrapped.displayName || Wrapped.name || "Component"})`;
  return ComponentWithBoundary;
}

function CustomFallback({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-6">
      <Result
        status="error"
        title="Komponent xatosi"
        subTitle={error.message}
        extra={
          <Button type="primary" onClick={reset}>
            Qayta urinish
          </Button>
        }
      />
    </div>
  );
}
export { CustomFallback };
