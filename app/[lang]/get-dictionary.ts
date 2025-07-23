import "server-only"

const dictionaries = {
    en : () => import("./dictionaries/en.json").then((module) => module.default),
    th : () => import("./dictionaries/th.json").then((module) => module.default),
    de : () => import("./dictionaries/de.json").then((module) => module.default),
}

export const getDictionary = async (locale: string) => {
    const loader = dictionaries[locale as keyof typeof dictionaries]
    if(!loader){
        throw new Error(`No dictionary found for locale ${locale}` );
    }

    return loader();
}