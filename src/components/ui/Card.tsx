interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-bg-light rounded-xl p-5 ${className}`}>
      {children}
    </div>
  );
}
