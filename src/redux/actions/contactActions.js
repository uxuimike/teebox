import axios from "axios";

var config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

export function sendMessage(message) {

  return {
    type: 'SEND_MESSAGE',
    payload: axios.post('https://hooks.slack.com/services/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',
      {
        text: message
      },
      config
    )
  }
}

export function resetStatus() {
  return {
    type: 'RESET_STATUS'
  }
}
