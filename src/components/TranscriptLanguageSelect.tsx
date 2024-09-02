import ReactSelect from 'react-select'
import { translateLanguages } from './LanguageSelect'

type LanguageKey = keyof typeof translateLanguages;

export interface TranscriptLanguageSelectProps {
  defaultValue: string
  onChange: (newValue: string) => void
  id?: string
}

type Option = {
  value: LanguageKey
  label: string
}

export function TranscriptLanguageSelect({
  defaultValue,
  onChange,
  id,
}: TranscriptLanguageSelectProps) {
  const languageOptions: Option[] = Object.entries(translateLanguages).map(([key, value]) => ({
    value: key as LanguageKey,
    label: value[0],
  }))

  const defaultOption = {
    value: defaultValue as LanguageKey,
    label: translateLanguages[defaultValue as LanguageKey][0],
  }

  const handleChange = (newValue: Option | null) => {
    if (newValue) {
      onChange(newValue.value)
    }
  }

  return (
    <ReactSelect
      inputId={id}
      options={languageOptions}
      value={defaultOption}
      onChange={handleChange}
      isSearchable
      className="w-64"
    />
  )
}