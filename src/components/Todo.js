import Button from '@atlaskit/button'
import styled, {css} from 'styled-components'
import CheckIcon from '@atlaskit/icon/glyph/check'
import TrashIcon from '@atlaskit/icon/glyph/trash'
import EditIcon from '@atlaskit/icon/glyph/edit'
import { useState } from 'react'

const ButtonStyled = styled(Button)`
  margin-top: 5px;
  text-align: left;
  
  &, &:hover {
    ${(p => p.isCompleted && css`
        text-decoration: line-through;
    `)}
  }

  &:hover {
    .check-icon {
        display: inline-block;
    }   
  }

  .check-icon {
    display: none;

    &:hover {
        background-color: #e2e2e2;
        border-radius: 3px;
        }
    }
`

export default function Todo({ todo, onCheckBtnClick, onDeleteBtnClick, onEditBtnClick }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.name);

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(todo.name);
  };

  const handleSave = () => {
    if (editValue.trim() && editValue !== todo.name) {
      onEditBtnClick(todo.id, editValue);
    }
    setIsEditing(false);
  };

  return (
    <ButtonStyled 
    isCompleted={todo.isCompleted}
    shouldFitContainer 
    iconAfter={
      <>
        { !todo.isCompleted && (
          <span className='check-icon' onClick={() => onCheckBtnClick(todo.id)}>
            <CheckIcon primaryColor='green'/>
          </span>
        )}
        <span className='delete-icon' onClick={() => onDeleteBtnClick(todo.id)} style={{marginLeft: 8}}>
          <TrashIcon primaryColor='red' />
        </span>
        <span className='edit-icon' onClick={handleEdit} style={{marginLeft: 8}}>
          <EditIcon primaryColor='blue' />
        </span>
      </>
    }
    >
      {isEditing ? (
        <>
          <input 
            value={editValue} 
            onChange={e => setEditValue(e.target.value)} 
            style={{marginRight: 8}}
            onKeyDown={e => { if (e.key === 'Enter') handleSave(); }}
            autoFocus
          />
          <Button appearance="primary" spacing="compact" onClick={handleSave}>Lưu</Button>
          <Button appearance="default" spacing="compact" onClick={() => setIsEditing(false)}>Hủy</Button>
        </>
      ) : (
        todo.name
      )}
    </ButtonStyled>
  )
}
