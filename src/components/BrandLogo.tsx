interface Props {
  variant?: 'master' | 'miami' | 'orlando';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/* Minimal abstract hookah vessel mark — geometric, refined */
function Mark({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="3.5" r="1.5" fill="#C6A145" />
      <line x1="16" y1="5" x2="16" y2="11" stroke="#C6A145" strokeWidth="1.2" />
      <path d="M12 11h8l1.5 5c.5 2-.5 5-2.5 7-1.2 1.2-2 1.8-3 2.2-1-.4-1.8-1-3-2.2-2-2-3-5-2.5-7L12 11z" stroke="#C6A145" strokeWidth="1.1" fill="none" />
      <line x1="12.5" y1="28" x2="19.5" y2="28" stroke="#C6A145" strokeWidth="1.1" />
    </svg>
  );
}

const sizes = {
  sm: { mark: 20, name: 'text-sm', loc: 'text-[9px]' },
  md: { mark: 24, name: 'text-base', loc: 'text-[10px]' },
  lg: { mark: 32, name: 'text-xl', loc: 'text-xs' },
};

export default function BrandLogo({ variant = 'master', size = 'md', className = '' }: Props) {
  const s = sizes[size];
  const loc = variant === 'miami' ? 'MIAMI' : variant === 'orlando' ? 'ORLANDO' : null;

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <Mark s={s.mark} />
      <div className="flex flex-col leading-tight">
        {loc && (
          <span className={`${s.loc} font-sans font-semibold tracking-[0.2em] text-primary`}>
            {loc}
          </span>
        )}
        <span className={`font-display font-medium ${s.name} tracking-[0.06em] text-text-primary`}>
          Hookah Rental
        </span>
      </div>
    </div>
  );
}
