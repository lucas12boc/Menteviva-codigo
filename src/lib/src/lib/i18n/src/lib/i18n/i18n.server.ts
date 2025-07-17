import 'server-only'
import { cookies } from 'next/headers'
import { languages, type LanguageCode } from './languages'

const dictionaries: Record<LanguageCode, () => Promise<any>> = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  es: () => import('./dictionaries/es.json').then((module) => module.default),
  de: () => import('./dictionaries/de.json').then((module) => module.default),
  ar: () => import('./dictionaries/ar.json').then((module) => module.default),
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
  it: () => import('./dictionaries/it.json').then((module) => module.default),
  ja: () => import('./dictionaries/ja.json').then((module) => module.default),
  ko: () => import('./dictionaries/ko.json').then((module) => module.default),
  nl: () => import('./dictionaries/nl.json').then((module) => module.default),
  ru: () => import('./dictionaries/ru.json').then((module) => module.default),
  tr: () => import('./dictionaries/tr.json').then((module) => module.default),
  zh: () => import('./dictionaries/zh.json').then((module) => module.default),
}

export const getLanguage = (): LanguageCode => {
    const langCookie = cookies().get('menteviva-lang')?.value
    return languages.some(l => l.code === langCookie) ? langCookie as LanguageCode : 'es'
}

export const getDictionary = async (locale: LanguageCode) => {
    const lang = languages.some(l => l.code === locale) ? locale : 'es'
    return dictionaries[lang]()
}
