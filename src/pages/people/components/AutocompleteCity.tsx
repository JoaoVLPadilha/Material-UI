import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useField } from '@unform/core';
import React, { useEffect } from 'react';
import { useDebounce } from '../../../shared/hooks';
import { CityService } from '../../../shared/services/api/city/CityService';

type TAutocompleteOption = {
  id: number;
  label: string;
};
interface IAutocompleteCityProps {
  isExternalLoading?: boolean;
}
const AutocompleteCity: React.FC<IAutocompleteCityProps> = ({
  isExternalLoading = false,
}) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField('cityId');

  const { debounce } = useDebounce();

  const [selectedId, setSelectedId] = React.useState<number | undefined>();

  const [options, setOptions] = React.useState<TAutocompleteOption[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState('');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId)
    })
  }, [registerField,fieldName,selectedId]);

  React.useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      CityService.getAll(1, search, selectedId?.toString()).then((result) => {
        setIsLoading(false);
        console.log(result);

        if (result instanceof Error) alert(result.message);
        else {
          console.log(result.data);
          setOptions(
            result.data.map((item) => ({ id: item.id, label: item.name })),
          );
        }
      });
    });
  }, [search,selectedId]);

  const autoCompleteSelectedOption = React.useMemo(() => {
    if (!selectedId) return null;
    const selectedOptions = options.find((item) => item.id === selectedId);
    
    if (!selectedId) return null;
    return selectedOptions;
  }, [selectedId, options]);

  return (
    <Autocomplete
      options={options}
      loading={isLoading}
      // Atributos de Text exemplo: openText
      disablePortal
      disabled={isExternalLoading}
      value={autoCompleteSelectedOption}
      onInputChange={(e, newValue) => setSearch(newValue)}
      popupIcon={
        isExternalLoading || isLoading ? (
          <CircularProgress size={28} />
        ) : undefined
      }
      onChange={(e, newValue) => {
        setSelectedId(newValue?.id);
        setSearch('');
        clearError();
      }}
      renderInput={(params) => <TextField error={!!error} helperText={error} {...params} label={'City'} />}
    />
  );
};

export default AutocompleteCity;
