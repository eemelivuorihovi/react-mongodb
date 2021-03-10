import {Flag} from "../../i18n/translate";

export default class Locale {

    public static readonly ENGLISH = new Locale("en", "English", Flag.UK);
    public static readonly FINNISH = new Locale("fi", "Suomi", Flag.FI);

    public static readonly LOCALES: Locale[] = [
        Locale.ENGLISH,
        Locale.FINNISH
    ];

    private constructor(
        public readonly key: string,
        public readonly display: string,
        public readonly flag: Flag
    ) {}
}