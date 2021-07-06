import { Button } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const TestApp = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <Button
        onClick={() => {
          i18n.changeLanguage(i18n.language === 'zh-CN' ? 'en' : 'zh-CN');
        }}
      >
        切换中/英文
      </Button>
      <h1>{t('help')}</h1>
    </>
  );
};

export default TestApp;
