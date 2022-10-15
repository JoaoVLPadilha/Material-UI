import React from 'react';
import {
  Box,
  useTheme,
  Skeleton,
  Paper,
  Icon,
  Button,
  Divider,
} from '@mui/material';

interface IDetailToolsProps {
  buttonNewText?: string;

  showButtonNew?: boolean;
  showButtonBack?: boolean;
  showButtonDelete?: boolean;
  showButtonSave?: boolean;
  showButtonSaveGoBack?: boolean;

  showButtonNewLoading?: boolean;
  showButtonBackLoading?: boolean;
  showButtonDeleteLoading?: boolean;
  showButtonSaveLoading?: boolean;
  showButtonSaveGoBackLoading?: boolean;

  onClickSave?: () => void;
  onClickNew?: () => void;
  onClickDelete?: () => void;
  onClickSaveGoBack?: () => void;
  onClickBack?: () => void;
}
export const DetailTools: React.FC<IDetailToolsProps> = ({
  buttonNewText = 'Novo',

  showButtonSave = true,
  showButtonNew = true,
  showButtonDelete = true,
  showButtonSaveGoBack = false,
  showButtonBack = true,

  showButtonSaveLoading = false,
  showButtonNewLoading = false,
  showButtonBackLoading = false,
  showButtonDeleteLoading = false,
  showButtonSaveGoBackLoading = false,

  onClickSave,
  onClickNew,
  onClickDelete,
  onClickSaveGoBack,
  onClickBack,
}) => {
  const theme = useTheme();
  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
    >
      {/* Button Save Ínicio */}
      {showButtonSaveLoading ? (
        <Skeleton width={110} height={60}>
          {showButtonSave && (
            <Button
              color="primary"
              variant="contained"
              disableElevation
              startIcon={<Icon>save</Icon>}
              onClick={onClickSave}
            >
              Save
            </Button>
          )}
        </Skeleton>
      ) : (
        showButtonSave && (
          <Button
            color="primary"
            variant="contained"
            disableElevation
            startIcon={<Icon>save</Icon>}
            onClick={onClickSave}
          >
            Save
          </Button>
        )
      )}
      {/* Button Save Fim */}

      {/* Button Add Ínicio */}
      {showButtonNewLoading ? (
        <Skeleton>
          {showButtonNew && (
            <Button
              color="primary"
              variant="outlined"
              disableElevation
              startIcon={<Icon>add</Icon>}
              onClick={onClickNew}
            >
              {buttonNewText}
            </Button>
          )}
        </Skeleton>
      ) : (
        showButtonNew && (
          <Button
            color="primary"
            variant="outlined"
            disableElevation
            startIcon={<Icon>add</Icon>}
            onClick={onClickNew}
          >
            {buttonNewText}
          </Button>
        )
      )}
      {/* Button Add Fim */}

      {/* Button Delete Ínicio */}
      {showButtonDeleteLoading ? (
        <Skeleton>
          {showButtonDelete && (
            <Button
              color="primary"
              variant="outlined"
              disableElevation
              startIcon={<Icon>delete</Icon>}
              onClick={onClickDelete}
            >
              Delete
            </Button>
          )}
        </Skeleton>
      ) : (
        showButtonDelete && (
          <Button
            color="primary"
            variant="outlined"
            disableElevation
            startIcon={<Icon>delete</Icon>}
            onClick={onClickDelete}
          >
            Delete
          </Button>
        )
      )}

      {/* Button Delete Fim */}

      {/* Button Save and go Back Ínicio */}
      {showButtonSaveGoBackLoading ? (
        <Skeleton>
          {showButtonSaveGoBack && (
            <Button
              color="primary"
              variant="outlined"
              disableElevation
              startIcon={<Icon>save</Icon>}
              onClick={onClickSaveGoBack}
            >
              Save and go back
            </Button>
          )}
        </Skeleton>
      ) : (
        showButtonSaveGoBack && (
          <Button
            color="primary"
            variant="outlined"
            disableElevation
            startIcon={<Icon>save</Icon>}
            onClick={onClickSaveGoBack}
          >
            Save and go back
          </Button>
        )
      )}
      {/* Button Save and go Back Fim */}
      <Divider variant="middle" orientation="vertical" />
      {showButtonBackLoading ? (
        <Skeleton>
          {showButtonBack && (
            <Button
              color="primary"
              variant="outlined"
              disableElevation
              startIcon={<Icon>arrow_back</Icon>}
              onClick={onClickBack}
            >
              Go Back
            </Button>
          )}
        </Skeleton>
      ) : (
        showButtonBack && (
          <Button
            color="primary"
            variant="outlined"
            disableElevation
            startIcon={<Icon>arrow_back</Icon>}
            onClick={onClickBack}
          >
            Go Back
          </Button>
        )
      )}
    </Box>
  );
};
