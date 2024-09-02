import ReactSelect, { ActionMeta, SingleValue } from 'react-select'
import { useState } from 'react'

export type LanguageType = 'transcribe' | 'translate'

export interface LanguageSelectProps {
  defaultValue?: string[] // Change this to string[]
  languageType?: LanguageType
  id?: string
  onChange?: (newValue: string[]) => void // Update this to accept string[]
}

// Supported translate languages
// ref: https://cloud.google.com/translate/docs/languages
//
// Transcription languages
// ref: https://stackoverflow.com/questions/14257598
export const translateLanguages = {
  en: ['English', 'English'],
  ja: ['Japanese', '日本語'],
  ko: ['Korean', '한국어'],
  ar: ['Arabic', 'العربية'],
  zh: ['Chinese (Simplified)', '中文'],
  'zh-TW': ['Chinese (Traditional)', '中文(台灣)'],
  nl: ['Dutch', 'Nederlands'],
  de: ['German', 'Deutsch'],
  fi: ['Finnish', 'Suomi'],
  fr: ['French', 'Français'],
  id: ['Indonesian', 'Bahasa Indonesia'],
  it: ['Italian', 'Italiano'],
  pl: ['Polish', 'Polski'],
  pt: ['Portuguese', 'Português'],
  no: ['Norwegian', 'Norsk'],
  ru: ['Russian', 'Русский'],
  so: ['Somali', 'Soomaaliga'],
  es: ['Spanish', 'Español'],
  sv: ['Swedish', 'Svenska'],
  th: ['Thai', 'ไทย'],
  tr: ['Turkish', 'Türkçe'],
  uk: ['Ukrainian', 'Українська'],
  vi: ['Vietnamese', 'Tiếng Việt'],
}

// For simplicity, for now set languages to be the same subset for transcription/translation
const transcribeLanguages = translateLanguages

type Option = {
  value: string
  label: string
}

interface ArrayObjectSelectState {
  selectedOption: Option | null
}

// Extending react-select
// ref: https://stackoverflow.com/questions/66348283/
/*
export function LanguageSelect<
  OptionType,
  IsMulti extends boolean = false,
  GroupType extends GroupBase<OptionType> = GroupBase<OptionType>
>({
  languageType = 'translate',
  defaultVal = 'en',
  id,
  ...props
}: Props<OptionType, IsMulti, GroupType> & LanguageSelectProps) {
*/

// ref: https://stackoverflow.com/a/74143834
export function LanguageSelect({
  languageType = 'translate',
  defaultValue = ['en'],
  onChange,
  id,
  ...props
}: LanguageSelectProps) {
  const languages = languageType === 'translate' ? translateLanguages : transcribeLanguages
  const languageOptions: Option[] = Object.entries(languages).map(([key, value]) => ({
    value: key,
    label: value[0],
  }))

  const defaultOptions = defaultValue.map(lang => ({
    value: lang,
    label: (languages as Record<string, string[]>)[lang]?.[0] || lang,
  }))

  const handleChange = (newValue: readonly Option[], actionMeta: ActionMeta<Option>) => {
    const newLangs = newValue.map(option => option.value)
    onChange?.(newLangs)
  }

  return (
    <ReactSelect
      inputId={id}
      options={languageOptions}
      value={defaultOptions}
      onChange={handleChange}
      isMulti
      isSearchable
      className="w-64"
      {...props}
    />
  )
}