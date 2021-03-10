import React, {useContext} from "react";
import I18nContext from "../../context/I18nContext";
import Locale from "./Locale";
import {Dropdown, Image} from "react-bootstrap";
import {changeLanguage} from "../../i18n/translate";
import "./LanguageSelector.css";

interface FlagProps {
    locale: Locale
}

const LocaleFlag: React.FC<FlagProps> = (props: FlagProps) => {
    return (
        <span className="lang-select"
              title={props.locale.display}>
            <div className="overlay"></div>
            <Image className="lang-select-flag"
                   src={props.locale.flag}
                   roundedCircle/>
        </span>
    );
};

const LanguageSelector: React.FC = () => {
    const {lang, setLang} = useContext(I18nContext);

    const getCurrentLanguage = () => {
        if (lang === "fi") {
            return <LocaleFlag locale={Locale.FINNISH} />;
        }
        else {
            return <LocaleFlag locale={Locale.ENGLISH} />;
        }
    };

    return (
        <Dropdown style={{paddingLeft: 15}}
                  onSelect={(key: string) => {
                      setLang(key);
                      changeLanguage(key);
                  }}>
            <Dropdown.Toggle id="language-selector"
                             variant="link"
                             as="div"
                             size="sm">
                {getCurrentLanguage()}
            </Dropdown.Toggle>
            <Dropdown.Menu className="mt-1"
                           alignRight={true}>
                {Locale.LOCALES.map((locale: Locale) => (
                    <Dropdown.Item eventKey={locale.key}
                                   active={lang === locale.key}
                                   title={locale.display}>
                        <LocaleFlag locale={locale}/>
                        <span className="language-label">
                            {locale.key}
                        </span>
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default LanguageSelector;