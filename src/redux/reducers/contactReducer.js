const initialState = {
  status: '',
  statusMessage: 'Send me a message',
  style: ''
};

export default function reducer(state = initialState, action){
    switch (action.type) {
        case 'RESET_STATUS':{
            state = {...state, status: '', statusMessage: 'Send me a message', style: ''};
            break;
        }
        case 'SEND_MESSAGE_PENDING':{
            state = {...state, status: 'Pending', statusMessage: 'Your message is being sent', style: 'Contact-Sending'};
            break;
        }
        case 'SEND_MESSAGE_FULFILLED':{
            state = {...state, status: 'Fulfilled', statusMessage: 'Thanks, your message has been sent!', style: 'Contact-Sent'};
            break;
        }
        case 'SEND_MESSAGE_REJECTED':{
            state = {...state, status: 'Error', statusMessage: 'Oops, looks like there was an Error', style: 'Contact-Sent'};
            break;
        }
        default:
    }
    return state;
}
