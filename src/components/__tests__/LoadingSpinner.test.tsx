import { render, screen } from '@testing-library/react';
import LoadingSpinner, { SkeletonLoader } from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-label', 'Loading');
  });

  it('renders with custom text', () => {
    const customText = 'Loading AI models...';
    render(<LoadingSpinner text={customText} />);

    expect(screen.getByText(customText)).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<LoadingSpinner size="sm" />);
    expect(screen.getByRole('status')).toHaveClass('w-4', 'h-4');

    rerender(<LoadingSpinner size="lg" />);
    expect(screen.getByRole('status')).toHaveClass('w-12', 'h-12');
  });

  it('applies custom className', () => {
    const customClass = 'custom-spinner';
    render(<LoadingSpinner className={customClass} />);

    expect(screen.getByRole('status')).toHaveClass(customClass);
  });
});

describe('SkeletonLoader', () => {
  it('renders with default props', () => {
    render(<SkeletonLoader />);

    const skeletons = screen.getAllByTestId('skeleton-line');
    expect(skeletons).toHaveLength(3); // default lines
  });

  it('renders correct number of lines', () => {
    const lines = 5;
    render(<SkeletonLoader lines={lines} />);

    const skeletons = screen.getAllByTestId('skeleton-line');
    expect(skeletons).toHaveLength(lines);
  });

  it('renders with avatar when specified', () => {
    render(<SkeletonLoader avatar />);

    expect(screen.getByTestId('skeleton-avatar')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-skeleton';
    render(<SkeletonLoader className={customClass} />);

    const container = screen.getByTestId('skeleton-container');
    expect(container).toHaveClass(customClass);
  });
});
