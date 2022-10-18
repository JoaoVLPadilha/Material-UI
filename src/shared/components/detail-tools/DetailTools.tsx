import React from 'react';
import {
  Typography,
  Box,
  useTheme,
  Skeleton,
  Paper,
  Icon,
  Button,
  Divider,
  useMediaQuery,
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
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
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
        <Skeleton>
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
            <Typography
              variant="button"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              Save
            </Typography>
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
              <Typography
                variant="button"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                {buttonNewText}
              </Typography>
            </Button>
          )}
        </Skeleton>
      ) : (
        showButtonNew && !smDown && (
          <Button
            color="primary"
            variant="outlined"
            disableElevation
            startIcon={<Icon>add</Icon>}
            onClick={onClickNew}
          >
            <Typography
              variant="button"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              {buttonNewText}
            </Typography>
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
            <Typography
              variant="button"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              Delete
            </Typography>
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
              <Typography
                variant="button"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                Save and go back
              </Typography>
            </Button>
          )}
        </Skeleton>
      ) : (
        showButtonSaveGoBack && !smDown && !mdDown && (
          <Button
            color="primary"
            variant="outlined"
            disableElevation
            startIcon={<Icon>save</Icon>}
            onClick={onClickSaveGoBack}
          >
            <Typography
              variant="button"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              Save and go back
            </Typography>
          </Button>
        )
      )}
      {/* Button Save and go Back Fim */}
      {!smDown && <Divider variant="middle" orientation="vertical" />}
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
              <Typography
                variant="button"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                Go back
              </Typography>
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
              <Typography
                variant="button"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                Go back
              </Typography>
          </Button>
        )
      )}
    </Box>
  );
};
