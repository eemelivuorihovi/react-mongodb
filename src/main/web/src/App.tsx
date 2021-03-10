import React, {useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Merchants from "./components/merchant/Merchants";
import CreateMerchant from "./components/merchant/CreateMerchant";
import {flattenMessages, LANG_KEY, messages} from "./i18n/translate";
import I18nContext from "./context/I18nContext";
import {IntlProvider} from 'react-intl';

const App: React.FC = () => {
    let locale = localStorage.getItem(LANG_KEY);
    const [lang, setLang] = useState<string>(locale ? locale : "en");

    return (
        <Router>
            <I18nContext.Provider value={{ lang, setLang }}>
                <IntlProvider locale={lang} messages={flattenMessages(messages[lang])}>
                    <Navbar/>

                    <Switch>
                        <Route exact path="/" component={Merchants}/>
                        <Route path="/add" component={CreateMerchant}/>
                    </Switch>
                </IntlProvider>
            </I18nContext.Provider>
        </Router>
    );
}

export default App;
