const OPEN_DIALOG = 'OPEN_DIALOG';
const CLOSE_DIALOG = 'CLOSE_DIALOG';

const initialState = {
  openedDialog: '',
  dialogProps: {}
};

export default function dialogModule(state = initialState, action = {}) {
  switch (action.type) {
    case OPEN_DIALOG:
      return {
        ...state,
        openedDialog: action.payload.dialogName,
        dialogProps: action.payload.dialogProps || {}
      };
    case CLOSE_DIALOG:
      console.warn('CLOSE');
      return {
        ...state,
        openedDialog: '',
        dialogProps: {}
      };
    default:
      return state;
  }
}

export function openDialog({ name, props }) {
  return {
    type: OPEN_DIALOG,
    payload: { dialogName: name, dialogProps: props },
  };
}

export const closeDialog = () => ({ type: CLOSE_DIALOG });
