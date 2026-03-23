import { useTranslation } from 'react-i18next';

interface LanguageToggleProps {
  variant?: 'nav' | 'dark';
}

const LanguageToggle = ({ variant = 'nav' }: LanguageToggleProps) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const isDark = variant === 'dark';

  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-1.5 py-0.5 rounded transition-colors ${
          i18n.language === 'en'
            ? 'text-white font-semibold'
            : isDark ? 'text-white/40 hover:text-white/70' : 'text-white/60 hover:text-white'
        }`}
      >
        EN
      </button>
      <span className={isDark ? 'text-white/30' : 'text-white/40'}>|</span>
      <button
        onClick={() => changeLanguage('es')}
        className={`px-1.5 py-0.5 rounded transition-colors ${
          i18n.language === 'es'
            ? 'text-white font-semibold'
            : isDark ? 'text-white/40 hover:text-white/70' : 'text-white/60 hover:text-white'
        }`}
      >
        ES
      </button>
    </div>
  );
};

export default LanguageToggle;
