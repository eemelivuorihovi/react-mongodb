import React, {useState} from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import {flattenMessages, LANG_KEY, messages} from "./i18n/translate";
import I18nContext from "./context/I18nContext";
import {IntlProvider} from 'react-intl';
import MainContainer from "./components/layout/MainContainer";
import Sidebar from "./components/layout/Sidebar";
import {Col, Row} from "react-bootstrap";

const App: React.FC = () => {
    let locale = localStorage.getItem(LANG_KEY);
    const [lang, setLang] = useState<string>(locale ? locale : "en");

    return (
        <Router>
            <body>
                <I18nContext.Provider value={{ lang, setLang }}>
                    <IntlProvider locale={lang} messages={flattenMessages(messages[lang])}>
                        <Navbar/>

                        <aside className="aside aside-fixed">
                            <Sidebar/>
                        </aside>

                        <Row className="flex-grow-1" style={{ marginLeft: 0, marginRight: 0 }}>
                            <Col style={{ padding: 0 }}>
                                <MainContainer />
                            </Col>
                        </Row>
                    </IntlProvider>
                </I18nContext.Provider>
            </body>
        </Router>
    );
}

export default App;
