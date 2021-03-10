import React from "react";

const I18nContext = React.createContext({
    lang: "en",
    setLang: (l: string) => {}
});

export default I18nContext;