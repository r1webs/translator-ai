import SelectSearch from 'react-select-search';
import 'react-select-search/style.css';

interface ILanguageOption {
  name: string;
  value: string;
}
interface LangProps {
  id: string;
  placeholder: string;
  value: string;
  onLangSelect: (lang: string) => void;
  options: ILanguageOption[];
}

const LanguageSelector: React.FC<LangProps> = ({
  id,
  placeholder,
  value,
  onLangSelect,
  options,
}) => {
  return (
    <div className="flex align-center">
      <div className="rounded-lg">
        <SelectSearch
          id={id}
          autoComplete="on"
          options={options}
          search={true}
          value={value}
          placeholder={placeholder}
          onChange={(opt) => onLangSelect(opt as string)}
        />
      </div>
    </div>
  );
};

export default LanguageSelector;
