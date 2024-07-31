import React, { useEffect, useState } from 'react';
import useHttpReqClient from '../hooks/useHttpReqClient';
import LanguageSelector from './LanguageSelector';
import { LanguageIcon } from './Icons';

type Props = {
  languages: Record<string, string>;
  onLangSelect: (languages: Record<string, string>) => void;
  onError: (error: Error) => void;
};
interface ILanguageOption {
  name: string;
  value: string;
}

const SelectLanguages: React.FC<Props> = ({
  languages,
  onLangSelect,
  onError,
}): JSX.Element => {
  const [fromLang, setFromLang] = useState<string>('');
  const [toLang, setToLang] = useState<string>('');

  useEffect(() => {
    if (languages) {
      setFromLang(languages.from);
      setToLang(languages.to);
    }
  }, [languages]);

  const httpReqClient = useHttpReqClient();

  const { data, error } = httpReqClient({
    path: 'main/languages',
    method: 'GET',
    body: undefined,
    queryKey: ['languages'],
    enableFetch: true,
  });

  useEffect(() => {
    onLangSelect({ from: fromLang, to: toLang });
  }, [fromLang, toLang]);

  useEffect(() => {
    if (error) {
      onError(error);
    }
  }, [error]);

  /**
   * Filters out the language with the given value from the input data array.
   *
   * @param {ILanguageOption[]} data - The input data array containing language options.
   * @param {string} lang - The language value to be filtered out.
   * @return {ILanguageOption[]} - The filtered data array without the language with the given value.
   */
  const refineLangList = (data: ILanguageOption[], lang: string) => {
    if (lang) {
      return data.filter((item) => item.value !== lang);
    }
    return data;
  };

  return (
    <div>
      {data && data.data ? (
        <div className="flex ml-5">
          <div>
            <LanguageSelector
              id="fromLang"
              placeholder="Translate from"
              value={fromLang}
              onLangSelect={(val) => setFromLang(val)}
              options={refineLangList(data.data, toLang)}
            />
          </div>
          <div>
            <LanguageIcon size="size-6" class="opacity-60 mt-2 mx-2" />
          </div>
          <div>
            <LanguageSelector
              id="toLang"
              placeholder="to"
              value={toLang}
              onLangSelect={(val) => setToLang(val)}
              options={refineLangList(data.data, fromLang)}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SelectLanguages;
