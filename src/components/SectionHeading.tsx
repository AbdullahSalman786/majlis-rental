import { useReveal } from '../hooks/useScrollReveal';

interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
}

export default function SectionHeading({ eyebrow, title, description, align = 'center' }: Props) {
  const { ref, visible } = useReveal();
  const centered = align === 'center';

  return (
    <div
      ref={ref}
      className={`flex flex-col ${centered ? 'items-center text-center mx-auto' : 'items-start text-left'}
        transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ maxWidth: '1200px', marginBottom: '64px' }}
    >
      {/* Section Label */}
      <span className="lux-label" style={{ marginBottom: '16px' }}>
        {eyebrow}
      </span>

      {/* Section Heading */}
      <h2
        className="lux-h2"
        style={{
          marginBottom: description ? '24px' : '0',
          maxWidth: centered ? '640px' : undefined,
        }}
      >
        {title}
      </h2>

      {/* Divider accent */}
      {centered && (
        <div
          style={{
            width: '36px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
            marginBottom: description ? '24px' : '0',
          }}
        />
      )}

      {/* Description */}
      {description && (
        <p
          className="lux-body"
          style={{ maxWidth: centered ? '580px' : '560px' }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
