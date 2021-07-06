import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import { IntlProvider, FormattedMessage } from 'react-intl';
import zh from '../../locales/zh_CN.json';
import en from '../../locales/en_US.json';
const messages = {
  zh,
  en,
};
function Home() {
  const [lang, setLang] = useState('en');
  const changeLanguage = (lang) => {
    //语言切换
    setLang(lang);
  };
  useEffect(() => {
    console.log(lang);
  }, [lang]);
  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
      <div>
        <Button
          onClick={() => {
            changeLanguage(lang === 'en' ? 'zh' : 'en');
          }}
        >
          切换中/英文
        </Button>
        <FormattedMessage id='help' />

        <h2>
          <Link to='/todo'>todo列表</Link>
        </h2>
        <h2>
          <Link to='/ticTacToe'>三字棋</Link>
        </h2>
        <h2>
          <Link to='/todo-hook'>todo列表(hooks版)</Link>
        </h2>
        <h2>
          <Link to='/practice'>练习页面</Link>
        </h2>
        <h2>
          <Link to='/context'>Context</Link>
        </h2>
        <h2>
          <Link to='/tdTable'>TD Table</Link>
        </h2>
        <h2>
          <Link to='/test'>测试页面</Link>
        </h2>
      </div>
    </IntlProvider>
  );
}

export default Home;
