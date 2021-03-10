import {createIntl, createIntlCache} from "react-intl";
import messages_en from "./messages_en";
import messages_fi from "./messages_fi";

export const LANG_KEY = "lang";

export enum Flag {
    UK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 30'%3E %3CclipPath id='t'%3E %3Cpath d='M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z'/%3E %3C/clipPath%3E %3Cpath d='M0,0 v30 h60 v-30 z' fill='%2300247d'/%3E %3Cpath d='M0,0 L60,30 M60,0 L0,30' stroke='%23fff' stroke-width='6'/%3E %3Cpath d='M0,0 L60,30 M60,0 L0,30' clip-path='url(%23t)' stroke='%23cf142b' stroke-width='4'/%3E %3Cpath d='M30,0 v30 M0,15 h60' stroke='%23fff' stroke-width='10'/%3E %3Cpath d='M30,0 v30 M0,15 h60' stroke='%23cf142b' stroke-width='6'/%3E %3C/svg%3E",
    FI = "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Finland.svg"
}

export const messages: any = {
    en: messages_en,
    fi: messages_fi
};

export const flattenMessages = ((nestedMessages: any, prefix = '') => {
    if (nestedMessages === null) {
        return {}
    }
    return Object.keys(nestedMessages).reduce((messages, key) => {
        const value       = nestedMessages[key]
        const prefixedKey = prefix ? `${prefix}.${key}` : key

        if (typeof value === 'string') {
            Object.assign(messages, { [prefixedKey]: value })
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey))
        }

        return messages
    }, {})
});

const cache = createIntlCache();

let locale = localStorage.getItem(LANG_KEY);
export const userLanguage = locale ? locale : "en";
let intl = createIntl(
    {
        locale: userLanguage,
        messages: flattenMessages(messages[userLanguage])
    },
    cache
);


export const changeLanguage = (lang: string) => {
    const newIntl = createIntl(
        {
            locale: lang,
            messages: flattenMessages(messages[lang])
        },
        cache
    );

    intl = newIntl;
    localStorage.setItem(LANG_KEY, lang);
};

const i18n = (id: any, values?: {}) => {
    return intl.formatMessage({id}, values);
};

export default i18n;