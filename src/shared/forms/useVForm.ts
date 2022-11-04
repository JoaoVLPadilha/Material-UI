import { FormHandles } from '@unform/core';
import React, { useCallback } from 'react';

export const useVForm = () => {
  const formRef = React.useRef<FormHandles>(null);

  const isSavingAndNew = React.useRef(false);
  const isSavingAndClose = React.useRef(false);

  const handleSave = useCallback(() => {
    isSavingAndClose.current = false
    isSavingAndNew.current = false
    formRef.current?.submitForm()
  }, []);
  const handleSaveAndNew = useCallback(() => {
    isSavingAndClose.current = false
    isSavingAndNew.current = true
    formRef.current?.submitForm()
  }, []);
  const handleSaveAndClose = useCallback(() => {
    isSavingAndClose.current = true
    isSavingAndNew.current = false
    formRef.current?.submitForm()
  }, []);
  const handleIsSaveAndNew = useCallback(() => {
    return isSavingAndNew.current
  }, []);
  const handleIsSaveAndClose = useCallback(() => {
    return isSavingAndClose.current
  }, []);
  return {
    formRef,

    save: handleSave,
    saveAndNew: handleSaveAndNew,
    saveAndClose: handleSaveAndClose,

    IsSaveAndNew: handleIsSaveAndNew,
    IsSaveAndClose: handleIsSaveAndClose,
  };
};
