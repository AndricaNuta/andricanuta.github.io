import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Hook to update the HTML lang attribute based on the current i18n language
 */
export const useI18nLang = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Update the HTML lang attribute
    document.documentElement.lang = i18n.language;
    
    // Also update the dir attribute for RTL languages
    const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
    document.documentElement.dir = rtlLanguages.includes(i18n.language) ? 'rtl' : 'ltr';
  }, [i18n.language]);
};
