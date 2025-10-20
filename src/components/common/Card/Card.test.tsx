import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders card with content', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText(/card content/i)).toBeInTheDocument();
  });

  it('applies elevated variant styles', () => {
    const { container } = render(<Card variant="elevated">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveStyle({ borderRadius: 'var(--chakra-radii-lg)' });
  });

  it('applies outline variant', () => {
    render(<Card variant="outline">Content</Card>);
    expect(screen.getByText(/content/i)).toBeInTheDocument();
  });

  it('applies filled variant', () => {
    render(<Card variant="filled">Content</Card>);
    expect(screen.getByText(/content/i)).toBeInTheDocument();
  });

  it('accepts custom props', () => {
    render(<Card data-testid="custom-card" bg="red.500">Content</Card>);
    expect(screen.getByTestId('custom-card')).toBeInTheDocument();
  });
});
