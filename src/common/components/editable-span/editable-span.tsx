import { ChangeEvent, useState, useEffect } from "react";
import { TextField, Typography, Box } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

type Props = {
  maxWidth?: string;
  value: string;
  onChange: (newValue: string) => void;
  isAdmin?: boolean;
  disabled?: boolean;
}

export const EditableSpan = ({
                               maxWidth,
                               value,
                               onChange,
                               isAdmin = false,
                               disabled = false,
                             }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleEditStart = () => {
    if (!disabled && isAdmin) {
      setEditMode(true);
    }
  };

  const handleSave = () => {
    setEditMode(false);
    if (inputValue !== value) {
      onChange(inputValue);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setInputValue(value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const canEdit = isAdmin && !disabled;

  return (
    <Box
      sx={{
        maxWidth: `${maxWidth}`,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        position: 'relative',
        minHeight: 40
      }}
      onMouseEnter={() => canEdit && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {editMode ? (
        <>
          <TextField
            variant="standard"
            value={inputValue}
            onChange={handleChange}
            autoFocus
            sx={{
              flexGrow: 1,
              '& .MuiInputBase-root': {
                padding: 0,
                fontSize: 'inherit',
                '&:before, &:after': {
                  borderBottom: '2px solid'
                },
                '&:hover:not(.Mui-disabled):before': {
                  borderBottom: '2px solid'
                }
              }
            }}
          />
          <IconButton
            onClick={handleSave}
            color="primary"
            size="small"
          >
            <CheckIcon />
          </IconButton>
          <IconButton
            onClick={handleCancel}
            color="error"
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography
            onDoubleClick={handleEditStart}
            sx={{
              flexGrow: 1,
              cursor: canEdit ? 'pointer' : 'default',
              borderBottom: canEdit && isHovered ? '1px dashed' : 'none',
              borderColor: 'divider',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: canEdit ? 'action.hover' : 'transparent'
              }
            }}
          >
            {value || '—'}
          </Typography>

          {canEdit && isHovered && (
            <EditIcon
              color="action"
              sx={{
                position: 'absolute',
                right: 0,
                fontSize: 16,
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            />
          )}
        </>
      )}
    </Box>
  );
};